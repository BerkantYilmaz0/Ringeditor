<?php
declare(strict_types=1);

namespace App\Application\Actions\TemplateJobs;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;

final class GetTemplateJobsAction extends Action
{
    public function __construct(
        private PDO $pdo,
        LoggerInterface $logger
    ) { parent::__construct($logger); }

    protected function action(): Response
    {
        $templateId= (int)$this->resolveArg('templateId');

         $sql = "SELECT id, template_id, duetime, type_id, deviceid, first_stop, last_stop, status
                FROM template_jobs
                WHERE template_id = :tid AND (is_deleted = 0 OR is_deleted IS NULL)
                ORDER BY type_id ASC, duetime ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':tid' => $templateId]);

        return $this->respondWithData($stmt->fetchAll(PDO::FETCH_ASSOC) ?: []);
    }
}
