<?php
declare(strict_types=1);

namespace App\Application\Actions\TemplateJobs;

use App\Application\Actions\Action;
use App\Application\Actions\ActionError;
use App\Application\Actions\ActionPayload;
use App\Application\Repositories\TemplateJobsRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;
use InvalidArgumentException;

final class CreateTemplateJobsAction extends Action
{
    public function __construct(
        private PDO $pdo,
        LoggerInterface $logger,
        private TemplateJobsRepository $repo
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $body = (array) $this->getFormData();
        $templateId = (int) ($body['template_id'] ?? 0);
        $jobs = $body['jobs'] ?? null;

        try {
            if ($templateId <= 0)
                throw new InvalidArgumentException('template_id geçersiz.');
            if (!is_array($jobs) || count($jobs) === 0)
                throw new InvalidArgumentException('jobs listesi boş.');

            $tz = new \DateTimeZone('Europe/Istanbul');
            $errors = [];
            $normalized = [];

            foreach ($jobs as $i => $job) {
                $e = [];
                $duetime = $job['duetime'] ?? null;
                $ts = 0;

                if (is_numeric($duetime)) {
                    $ts = (int) $duetime;
                    if ($ts <= 0)
                        $e['duetime'] = 'duetime geçersiz.';
                } elseif (is_string($duetime) && $duetime !== '') {
                    $dt = \DateTime::createFromFormat('H:i', $duetime, $tz);
                    if ($dt === false) {
                        $e['duetime'] = 'duetime formatı H:i olmalı (örn: 08:30).';
                    } else {
                        $ts = $dt->getTimestamp();
                    }
                } else {
                    $e['duetime'] = 'duetime zorunludur.';
                }

                $typeId = (int) ($job['type_id'] ?? 0);
                if ($typeId <= 0)
                    $e['type_id'] = 'Tip seçmek zorunludur !!.';

                $deviceId = (int) ($job['deviceid'] ?? 0);
                if ($deviceId <= 0)
                    $e['deviceid'] = 'Plaka seçmek zorunludur.';

                $status = (int) ($job['status'] ?? 1);
                if (!in_array($status, [1, 2, 3], true))
                    $status = 1;

                if (!empty($e)) {
                    $errors[$i] = $e;
                } else {
                    $normalized[] = [
                        'template_id' => $templateId,
                        'duetime' => $ts,
                        'type_id' => $typeId,
                        'deviceid' => $deviceId,
                        'route_id' => isset($job['route_id']) ? (int) $job['route_id'] : null,
                        'status' => $status,
                    ];
                }
            }

            if (!empty($errors)) {
                $payload = new ActionPayload(400, null, new ActionError(ActionError::BAD_REQUEST, 'Validasyon hatası.'));
                $resp = $this->respond($payload)->withStatus(400);
                $json = json_encode(['errors' => $errors], JSON_UNESCAPED_UNICODE);
                $resp->getBody()->write($json === false ? '{}' : $json);
                return $resp->withHeader('Content-Type', 'application/json');
            }

            // Verileri DB'ye ekle
            $result = $this->repo->insertMany($normalized);

            return $this->respondWithData([
                'success' => true,
                'insertedCount' => $result['insertedCount'] ?? 0,
            ], 201);

        } catch (InvalidArgumentException $e) {
            $payload = new ActionPayload(400, null, new ActionError(ActionError::BAD_REQUEST, $e->getMessage()));
            return $this->respond($payload)->withStatus(400);
        } catch (\PDOException $e) {
            // Örn. UNIQUE ihlali (opsiyonel)
            $this->logger->error('CreateTemplateJobsAction PDO error: ' . $e->getMessage());
            $payload = new ActionPayload(409, null, new ActionError(ActionError::CONFLICT, 'Çakışan kayıt(lar) mevcut olabilir.'));
            return $this->respond($payload)->withStatus(409);
        } catch (\Throwable $e) {
            $this->logger->error('CreateTemplateJobsAction error: ' . $e->getMessage());
            $payload = new ActionPayload(500, null, new ActionError(ActionError::SERVER_ERROR, 'Kayıt başarısız.'));
            return $this->respond($payload)->withStatus(500);
        }
    }
}
