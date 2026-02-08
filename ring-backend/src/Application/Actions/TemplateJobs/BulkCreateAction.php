<?php
declare(strict_types=1);

namespace App\Application\Actions\TemplateJobs;

use App\Application\Repositories\TemplateJobsRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PDO;
use Psr\Log\LoggerInterface;

final class BulkCreateAction
{
    public function __construct(
        private PDO $pdo,
        private LoggerInterface $logger,
        private TemplateJobsRepository $repo
    ) {
    }

    public function __invoke(Request $request, Response $response): Response
    {
        try {
            $body = (array) json_decode((string) $request->getBody(), true);

            $baseJobId = (int) ($body['base_job_id'] ?? 0);
            $startStr = (string) ($body['start'] ?? '');
            $endStr = (string) ($body['end'] ?? '');
            $intervalMin = (int) ($body['intervalMinutes'] ?? 0);
            $skipConflicts = (bool) ($body['skip_conflicts'] ?? true);

            // --- 1) Temel validasyonlar ---
            if ($baseJobId <= 0) {
                return $this->json($response, 422, ['message' => 'base_job_id zorunlu']);
            }
            if ($startStr === '' || $endStr === '') {
                return $this->json($response, 422, ['message' => 'start ve end zorunlu (H:i)']);
            }
            if ($intervalMin <= 0 || $intervalMin > 1440) {
                return $this->json($response, 422, ['message' => 'intervalMinutes 1..1440 arasında olmalı']);
            }

            $tz = new \DateTimeZone('Europe/Istanbul');
            $start = \DateTime::createFromFormat('H:i', $startStr, $tz);
            $end = \DateTime::createFromFormat('H:i', $endStr, $tz);

            if ($start === false || $end === false) {
                return $this->json($response, 422, ['message' => 'Saat formatı H:i olmalı (örn: 08:30)']);
            }
            if ($end <= $start) {
                return $this->json($response, 422, ['message' => 'end, start saatinden büyük olmalı']);
            }

            // --- 2) Referans job kaydını çek ---
            $stmt = $this->pdo->prepare("
                SELECT template_id, type_id, deviceid, first_stop, last_stop
                FROM template_jobs
                WHERE id = :id
                LIMIT 1
            ");
            $stmt->execute([':id' => $baseJobId]);
            $job = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$job) {
                return $this->json($response, 404, ['message' => "Kayıt bulunamadı. (id: {$baseJobId})"]);
            }

            // --- 3) Mevcut saatleri çek (duplicate kontrolü sadece duetime) ---
            $existingTimes = $this->getExistingTimes((int) $job['template_id'], (int) $job['type_id']); // timestamp array

            // --- 4) Slot üretimi ---
            $slots = [];
            $cur = clone $start;
            for ($i = 0; $i < 200; $i++) {
                if ($cur > $end)
                    break;
                $slots[] = $cur->getTimestamp();
                $cur->modify("+{$intervalMin} minutes");
            }
            if (empty($slots)) {
                return $this->json($response, 422, ['message' => 'Üretilecek saat bulunamadı']);
            }

            // --- 5) Yeni eklenebilecek satırları filtrele ---
            $toInsert = [];
            $created = [];
            $skipped = [];

            foreach ($slots as $ts) {
                if (in_array($ts, $existingTimes, true)) {
                    if ($skipConflicts) {
                        $skipped[] = date('H:i', $ts);
                        continue;
                    } else {
                        return $this->json($response, 409, ['message' => 'Saat zaten var: ' . date('H:i', $ts)]);
                    }
                }
                $toInsert[] = [
                    'template_id' => (int) $job['template_id'],
                    'duetime' => $ts,
                    'type_id' => (int) $job['type_id'],
                    'deviceid' => (int) $job['deviceid'],
                    'first_stop' => (string) $job['first_stop'],
                    'last_stop' => (string) $job['last_stop'],
                    'status' => 1
                ];
                $created[] = date('H:i', $ts);
            }

            if (empty($toInsert)) {
                return $this->json($response, 200, [
                    'message' => 'Eklenecek yeni saat yok',
                    'created' => [],
                    'skipped' => $skipped
                ]);
            }

            // --- 6) Repository den fonksiyon çağırıp ekleme ---
            $result = $this->repo->insertMany($toInsert);

            return $this->json($response, 201, [
                'message' => 'Kayıtlar başarıyla eklendi',
                'created' => $created,
                'skipped' => $skipped,
                'insertedCount' => $result['insertedCount'] ?? 0
            ]);

        } catch (\PDOException $e) {
            $this->logger->error('BulkCreateAction PDO error: ' . $e->getMessage());
            return $this->json($response, 409, [
                'message' => 'Çakışan kayıt(lar) olabilir veya veri eklenemedi'
            ]);
        } catch (\Throwable $e) {
            $this->logger->error('BulkCreateAction error: ' . $e->getMessage());
            return $this->json($response, 500, ['message' => 'İşlem başarısız']);
        }
    }

    private function getExistingTimes(int $templateId, int $typeId): array
    {
        $stmt = $this->pdo->prepare("SELECT duetime FROM template_jobs WHERE template_id = :tid AND type_id= :typeId");
        $stmt->execute([':tid' => $templateId, ':typeId' => $typeId]);
        return $stmt->fetchAll(PDO::FETCH_COLUMN, 0) ?: [];
    }

    private function json(Response $response, int $status, array $data): Response
    {
        $payload = json_encode($data, JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload === false ? '{}' : $payload);
        return $response->withHeader('Content-Type', 'application/json')->withStatus($status);
    }
}
