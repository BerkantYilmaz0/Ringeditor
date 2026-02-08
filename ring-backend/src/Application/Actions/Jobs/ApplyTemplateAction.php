<?php
declare(strict_types=1);

namespace App\Application\Actions\Jobs;

use App\Application\Repositories\JobsRepository;
use App\Application\Repositories\TemplateJobsRepository;
use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;

final class ApplyTemplateAction extends Action
{
    public function __construct(
        private JobsRepository $jobsRepo,
        private TemplateJobsRepository $templateJobsRepo,
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $data = $this->getFormData();

        $templateId  = (int)($data['template_id'] ?? 0);
        $startDate   = $data['start_date'] ?? null;
        $endDate     = $data['end_date'] ?? null;
        $daysOfWeek  = $data['days_of_week'] ?? [];   // [1..7] → Pazartesi=1
        $conflict    = $data['conflict'] ?? 'skip';   // skip | overwrite

        if ($templateId <= 0 || !$startDate || !$endDate) {
            throw new HttpBadRequestException($this->request, "template_id, start_date, end_date zorunlu.");
        }

        $start = new \DateTimeImmutable($startDate);
        $end   = new \DateTimeImmutable($endDate);

        if ($end < $start) {
            throw new HttpBadRequestException($this->request, "Bitiş tarihi başlangıçtan önce olamaz.");
        }
        $today = new \DateTimeImmutable('today');
        if($start<$today)
        {
            throw new HttpBadRequestException($this->request,"Geçmiş Tarihlere Sefer Eklenemez");
        }

        // Şablondaki satırları al
        $templateJobs = $this->templateJobsRepo->getByTemplateId($templateId);

        $rowsToInsert = [];
        $conflicts = [];

        // Tarihlerde döngü
        for ($d = $start; $d <= $end; $d = $d->modify('+1 day')) {
            $dow = (int)$d->format('N'); // 1=Mon ... 7=Sun
            if (!in_array($dow, $daysOfWeek)) {
                continue; // seçilmeyen gün → atla
            }

            foreach ($templateJobs as $tj) {
                // template_jobs içindeki duetime epoch → günü baz alarak güncelle
                $timePart = date('H:i', (int)$tj['duetime']);
                $duetime  = strtotime($d->format('Y-m-d') . ' ' . $timePart);

                // Çakışma kontrolü
                if ($this->jobsRepo->hasConflict((int)$tj['deviceid'], $duetime)) {
                    if ($conflict === 'overwrite') {
                        // aynı device + duetime sil, sonra ekle
                        $this->jobsRepo->deleteByDeviceAndTime((int)$tj['deviceid'], $duetime);
                    } else {
                        // skip modunda sadece rapora ekle
                        $conflicts[] = [
                            'date'     => $d->format('Y-m-d'),
                            'time'     => $timePart,
                            'deviceid' => $tj['deviceid']
                        ];
                        continue;
                    }
                }

                $rowsToInsert[] = [
                    'deviceid'   => (int)$tj['deviceid'],
                    'duetime'    => $duetime,
                    'type'       => (int)$tj['type_id'],
                    'first_stop' => $tj['first_stop'],
                    'last_stop'  => $tj['last_stop'],
                    'status'     => 1,
                ];
            }
        }

        $result = $this->jobsRepo->insertMany($rowsToInsert);

        return $this->respondWithData([
                 'success'       => true,
                 'message'       => 'Şablondan ekleme başarılı',
                 'inserted'      => $result['insertedCount'] ?? 0,
                 'skipped'       => count($conflicts),
                 'data'          => $rowsToInsert,
                'conflicts'     => $conflicts
        ]);
    }
}
