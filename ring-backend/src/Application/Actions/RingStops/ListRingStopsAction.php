<?php
declare(strict_types=1);

namespace App\Application\Actions\RingStops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

final class ListRingStopsAction extends Action
{
    public function __construct(private PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $ringTypeId = (int) $this->resolveArg('id');

        $stmt = $this->pdo->prepare("
            SELECT 
                rsp.id as pivot_id,
                rsp.sequence_order,
                s.id as stop_id,
                s.name as stop_name,
                s.lat,
                s.lng,
                s.description
            FROM ring_stop_pivot rsp
            JOIN stops s ON s.id = rsp.stop_id
            WHERE rsp.ring_type_id = :rid
            ORDER BY rsp.sequence_order ASC
        ");

        $stmt->execute([':rid' => $ringTypeId]);
        $stops = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $this->respondWithData($stops);
    }
}
