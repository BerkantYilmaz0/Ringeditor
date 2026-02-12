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
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $templateId = (int) $this->resolveArg('templateId');

        $sql = "SELECT tj.id, tj.template_id, tj.duetime, tj.type_id, tj.deviceid, tj.route_id, tj.status, r.name AS route_name
                FROM template_jobs tj
                LEFT JOIN routes r ON r.id = tj.route_id
                WHERE tj.template_id = :tid AND (tj.is_deleted = 0 OR tj.is_deleted IS NULL)
                ORDER BY tj.type_id ASC, tj.duetime ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':tid' => $templateId]);

        return $this->respondWithData($stmt->fetchAll(PDO::FETCH_ASSOC) ?: []);
    }
}
