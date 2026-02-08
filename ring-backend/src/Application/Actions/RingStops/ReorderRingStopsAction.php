<?php
declare(strict_types=1);

namespace App\Application\Actions\RingStops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

final class ReorderRingStopsAction extends Action
{
    public function __construct(private PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $data = (array) $this->getFormData();
        $orderedIds = $data['orderedIds'] ?? []; // [id1, id2, id3...]

        if (!is_array($orderedIds) || empty($orderedIds)) {
            return $this->respondWithData(['error' => 'Liste boş.'], 400);
        }

        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("UPDATE ring_stops SET sequence_order = :seq WHERE id = :id");
            foreach ($orderedIds as $index => $id) {
                $stmt->execute([
                    ':seq' => $index + 1,
                    ':id' => $id
                ]);
            }
            $this->pdo->commit();
            return $this->respondWithData(['status' => 'reordered']);
        } catch (\Exception $e) {
            $this->pdo->rollBack();
            return $this->respondWithData(['error' => $e->getMessage()], 500);
        }
    }
}
