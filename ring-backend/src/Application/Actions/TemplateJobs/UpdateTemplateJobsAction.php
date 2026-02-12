<?php
declare(strict_types=1);

namespace App\Application\Actions\TemplateJobs;

use App\Application\Actions\Action;
use App\Application\Actions\ActionError;
use App\Application\Actions\ActionPayload;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;
use DateTime;
use DateTimeZone;

final class UpdateTemplateJobsAction extends Action
{
    public function __construct(
        private PDO $pdo,
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $jobId = (int) $this->resolveArg('jobId');
        $data = (array) $this->getFormData();

        if ($jobId <= 0) {
            $payload = new ActionPayload(400, null, new ActionError(ActionError::BAD_REQUEST, 'jobId geçersiz.'));
            return $this->respond($payload)->withStatus(400);
        }

        $duetime = $data['duetime'] ?? null;
        $ts = null;
        $tz = new DateTimeZone('Europe/Istanbul');

        if (is_numeric($duetime)) {
            $ts = (int) $duetime;
        } elseif (is_string($duetime) && $duetime !== '') {
            $dt = DateTime::createFromFormat('H:i', $duetime, $tz);
            $ts = $dt ? $dt->getTimestamp() : null;
        }

        $sql = "UPDATE template_jobs
                SET duetime = :duetime,
                    type_id = :type_id,
                    deviceid = :deviceid,
                    route_id = :route_id,
                    first_stop = :first_stop,
                    last_stop = :last_stop,
                    status = :status
                WHERE id = :id AND (is_deleted = 0 OR is_deleted IS NULL)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':duetime' => $ts,
            ':type_id' => (int) ($data['type_id'] ?? 0),
            ':deviceid' => (int) ($data['deviceid'] ?? 0),
            ':route_id' => isset($data['route_id']) ? (int) ($data['route_id']) : null,
            ':first_stop' => (string) ($data['first_stop'] ?? ''),
            ':last_stop' => (string) ($data['last_stop'] ?? ''),
            ':status' => (int) ($data['status'] ?? 1),
            ':id' => $jobId,
        ]);

        return $this->respondWithData(['success' => true]);
    }
}
