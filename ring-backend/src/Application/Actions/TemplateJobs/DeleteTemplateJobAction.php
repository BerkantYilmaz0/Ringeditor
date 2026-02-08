<?php
declare(strict_types=1);

namespace App\Application\Actions\TemplateJobs;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;
use Throwable;

final class DeleteTemplateJobAction extends Action
{
    public function __construct(
        private PDO $pdo,
        LoggerInterface $logger
    ) { parent::__construct($logger); }

    protected function action(): Response
    {
        $jobId = (int)$this->resolveArg('jobId');

        try {
            $stmt = $this->pdo->prepare("UPDATE template_jobs SET is_deleted = 1 WHERE id = :id");
            $stmt->execute([':id' => $jobId]);
        } catch (Throwable $e) {
            $this->logger->warning('template_jobs soft delete başarısız: '.$e->getMessage());
        }

        return $this->respondWithData(['success' => true]);
    }
}
