<?php
declare(strict_types=1);

namespace App\Application\Actions\TemplateJobs;

use App\Application\Repositories\TemplateJobsRepository;
use App\Application\Repositories\JobsRepository;
use DateTimeImmutable;
use PDO;
use Psr\Log\LoggerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class ApplyTemplateJobsAction
{
    public function __construct(
        private PDO $pdo,
        private LoggerInterface $logger,
        private TemplateJobsRepository $templateRepo,
        private JobsRepository $jobsRepo,
    ) {
    }

    public function __invoke(Request $request, Response $response, array $args): Response
    {
        $body = (string) $request->getBody();
        $data = json_decode($body, true);

        if (!is_array($data)) {
            return $this->json($response, ['error' => 'Invalid JSON'], 400);
        }

        $templateId = (int) ($data['template_id'] ?? 0);
        $dateStart = $data['date_start'] ?? null;
        $dateEnd = $data['date_end'] ?? null;
        $weekdays = $data['weekdays'] ?? [];
        $policy = $data['conflict_policy'] ?? 'skip';

        if ($templateId <= 0 || !$dateStart || !$dateEnd) {
            return $this->json($response, ['error' => 'Missing required fields'], 400);
        }

        $tplRows = $this->templateRepo->getByTemplateId($templateId);
        if (!$tplRows) {
            return $this->json($response, ['error' => 'Template not found or empty'], 404);
        }

        $applied = $skipped = $overwritten = 0;

        $this->pdo->beginTransaction();
        try {
            $period = new \DatePeriod(
                new DateTimeImmutable($dateStart),
                new \DateInterval('P1D'),
                (new DateTimeImmutable($dateEnd))->modify('+1 day')
            );

            foreach ($period as $day) {
                $dow = $day->format('D'); // Mon, Tue, Wed...
                if ($weekdays && !in_array($dow, $weekdays, true)) {
                    continue;
                }

                foreach ($tplRows as $tpl) {
                    // şablondaki duetime = epoch (günsüz, saat+dk)
                    $tplTime = (int) $tpl['duetime'];
                    $h = (int) date('H', $tplTime);
                    $m = (int) date('i', $tplTime);

                    $duetime = $day->setTime($h, $m)->getTimestamp();

                    $deviceid = (int) $tpl['deviceid'];

                    if ($this->jobsRepo->hasConflict($deviceid, $duetime)) {
                        if ($policy === 'overwrite') {
                            $this->jobsRepo->deleteByDeviceAndTime($deviceid, $duetime);
                            $this->jobsRepo->insert([
                                'duetime' => $duetime,
                                'deviceid' => $deviceid,
                                'type' => (int) $tpl['type_id'],
                                'route_id' => isset($tpl['route_id']) ? (int) $tpl['route_id'] : null,
                                'first_stop' => $tpl['first_stop'],
                                'last_stop' => $tpl['last_stop'],
                                'status' => (int) $tpl['status'],
                            ]);
                            $overwritten++;
                        } else {
                            $skipped++;
                        }
                    } else {
                        $this->jobsRepo->insert([
                            'duetime' => $duetime,
                            'deviceid' => $deviceid,
                            'type' => (int) $tpl['type_id'],
                            'route_id' => isset($tpl['route_id']) ? (int) $tpl['route_id'] : null,
                            'first_stop' => $tpl['first_stop'],
                            'last_stop' => $tpl['last_stop'],
                            'status' => (int) $tpl['status'],
                        ]);
                        $applied++;
                    }
                }
            }

            $this->pdo->commit();

            return $this->json($response, [
                'applied' => $applied,
                'skipped' => $skipped,
                'overwritten' => $overwritten
            ]);
        } catch (\Throwable $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            $this->logger->error('ApplyTemplateJobsAction error', ['error' => $e->getMessage()]);
            return $this->json($response, ['error' => 'Apply failed'], 500);
        }
    }

    private function json(Response $r, array $data, int $status = 200): Response
    {
        $r->getBody()->write(json_encode($data, JSON_UNESCAPED_UNICODE));
        return $r->withStatus($status)->withHeader('Content-Type', 'application/json');
    }
}
