<?php
declare(strict_types=1);

namespace App\Application\Actions\RingStops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

final class CreateRingStopAction extends Action
{
    public function __construct(private PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $data = (array) $this->getFormData();

        $ringTypeId = (int) ($data['ring_type_id'] ?? 0);
        $stopId = (int) ($data['stop_id'] ?? 0); // Artık stop_name değil stop_id bekliyoruz

        if ($ringTypeId <= 0 || $stopId <= 0) {
            return $this->respondWithData(['error' => 'Geçersiz veri. Ring ID ve Stop ID gereklidir.'], 400);
        }

        // Bu durak bu ringde zaten ekli mi?
        $stmtDup = $this->pdo->prepare("SELECT COUNT(*) FROM ring_stop_pivot WHERE ring_type_id = :rid AND stop_id = :sid");
        $stmtDup->execute([':rid' => $ringTypeId, ':sid' => $stopId]);
        if ($stmtDup->fetchColumn() > 0) {
            return $this->respondWithData(['error' => 'Bu durak bu ringe zaten ekli.'], 409);
        }

        // Otomatik sıra belirleme (en sona ekle)
        $stmtCheck = $this->pdo->prepare("SELECT MAX(sequence_order) FROM ring_stop_pivot WHERE ring_type_id = :rid");
        $stmtCheck->execute([':rid' => $ringTypeId]);
        $maxOrder = (int) $stmtCheck->fetchColumn();
        $newOrder = $maxOrder + 1;

        $stmt = $this->pdo->prepare("
            INSERT INTO ring_stop_pivot (ring_type_id, stop_id, sequence_order)
            VALUES (:rid, :sid, :seq)
        ");
        $stmt->execute([
            ':rid' => $ringTypeId,
            ':sid' => $stopId,
            ':seq' => $newOrder
        ]);

        return $this->respondWithData(['id' => (int) $this->pdo->lastInsertId()], 201);
    }
}
