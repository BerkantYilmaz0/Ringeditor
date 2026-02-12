<?php
declare(strict_types=1);

namespace App\Application\Actions\Jobs;

use App\Application\Actions\Action;
use App\Application\Repositories\JobsRepository;
use App\Application\Repositories\TemplateJobsRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;

final class CheckJobConflictAction extends Action
{
    public function __construct(
        private JobsRepository $jobsRepository,
        private TemplateJobsRepository $templateJobsRepository,
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $data = $this->getFormData();

        // 🔹 Toplu şablon kontrolü (snake_case parametreler)
        if (!empty($data['template_id'])) {
            $templateId = (int) $data['template_id'];
            $startDate = $data['start_date'] ?? null;
            $endDate = $data['end_date'] ?? null;
            $daysOfWeek = $data['days_of_week'] ?? [];

            if (!$startDate || !$endDate) {
                return $this->respondWithData([
                    'conflicts' => [],
                    'error' => 'template_id, start_date ve end_date zorunludur'
                ], 400);
            }

            $startTs = strtotime($startDate . ' 00:00:00');
            $endTs = strtotime($endDate . ' 23:59:59');

            // Şablona ait seferleri al
            $templateJobs = $this->templateJobsRepository->getByTemplateId($templateId);

            $conflicts = [];
            foreach ($templateJobs as $tj) {
                $timeOfDay = date('H:i:s', (int) $tj['duetime']);

                for ($ts = $startTs; $ts <= $endTs; $ts += 86400) {
                    $wday = (int) date('N', $ts); // ✅ 1=Mon ... 7=Sun
                    if (!in_array($wday, $daysOfWeek)) {
                        continue;
                    }

                    $datePart = date('Y-m-d', $ts);
                    $duetime = strtotime($datePart . ' ' . $timeOfDay);

                    $deviceid = (int) ($tj['deviceid'] ?? 0);

                    if ($deviceid && $this->jobsRepository->hasConflict($deviceid, $duetime)) {
                        $conflicts[] = [
                            'duetime' => $duetime,
                            'deviceid' => $deviceid,
                            'device_name' => $tj['displayName'] ?? null,
                            'route_name' => $tj['route_name'] ?? null,
                        ];
                    }
                }
            }


            return $this->respondWithData([
                'conflicts' => $conflicts,
                'count' => count($conflicts),
            ]);
        }
        // 🔹 Eski tekli kontrol (duetime + deviceid)
        $duetime = (int) ($data['duetime'] ?? 0);
        $deviceid = (int) ($data['deviceid'] ?? 0);
        $excludeId = isset($data['excludeId']) ? (int) $data['excludeId'] : null;

        if (!$duetime || !$deviceid) {
            return $this->respondWithData([
                'conflict' => false,
                'error' => 'duetime ve deviceid zorunludur'
            ], 400);
        }

        $conflict = $this->jobsRepository->hasConflict($deviceid, $duetime, $excludeId);

        return $this->respondWithData([
            'conflict' => $conflict
        ]);
    }
}
