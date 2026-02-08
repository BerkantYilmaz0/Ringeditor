<?php

declare(strict_types=1);

namespace App\Application\Actions\Stops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

final class DeleteStopAction extends Action
{
    public function __construct(private \PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $stopId = (int) $this->resolveArg('id');

        // Check if stop exists
        $stmt = $this->pdo->prepare("SELECT id FROM stops WHERE id = :id");
        $stmt->execute([':id' => $stopId]);
        if (!$stmt->fetch()) {
            return $this->respondWithData(['message' => 'Stop not found'], 404);
        }

        // Check dependencies (e.g. ring_stops)
        // If we want to allow deleting even if used, we might need to cascade or warn.
        // For now, let's assume simple delete is allowed or DB constraints handle it.
        // If there are FK constraints without cascade, this will fail.

        $stmt = $this->pdo->prepare("DELETE FROM stops WHERE id = :id");
        $stmt->execute([':id' => $stopId]);

        return $this->respondWithData(['message' => 'Stop deleted successfully']);
    }
}
