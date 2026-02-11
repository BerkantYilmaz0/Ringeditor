<?php
declare(strict_types=1);

namespace App\Application\Actions\Routes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

class CreateRouteAction extends Action
{
    private PDO $pdo;

    public function __construct(PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
        $this->pdo = $pdo;
    }

    protected function action(): Response
    {
        $data = $this->getFormData();

        // Basic validation
        if (!isset($data['name']) || empty($data['name'])) {
            return $this->respondWithData(['error' => 'Route name is required'], 400);
        }
        if (!isset($data['ring_type_id'])) {
            return $this->respondWithData(['error' => 'Ring Type ID is required'], 400);
        }

        $name = $data['name'];
        $ringTypeId = (int) $data['ring_type_id'];
        $geometry = isset($data['geometry']) ? json_encode($data['geometry']) : null;
        $color = $data['color'] ?? null;
        $description = $data['description'] ?? null;

        try {
            $this->pdo->beginTransaction();

            $sql = "INSERT INTO routes (name, ring_type_id, geometry, color, description) VALUES (:name, :ring_type_id, :geometry, :color, :description)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':name' => $name,
                ':ring_type_id' => $ringTypeId,
                ':geometry' => $geometry,
                ':color' => $color,
                ':description' => $description
            ]);

            $routeId = $this->pdo->lastInsertId();

            if (isset($data['stops']) && is_array($data['stops'])) {
                $stops = $data['stops'];
                $seq = 1;
                $insertStopSql = "INSERT INTO stops (name, lat, lng, description) VALUES (:name, :lat, :lng, :description)";
                $linkStopSql = "INSERT INTO route_stops (route_id, stop_id, sequence) VALUES (:route_id, :stop_id, :sequence)";
                
                $stmtInsertStop = $this->pdo->prepare($insertStopSql);
                $stmtLinkStop = $this->pdo->prepare($linkStopSql);

                foreach ($stops as $stop) {
                    $stopId = null;
                    if (isset($stop['id']) && !empty($stop['id'])) {
                        $stopId = $stop['id'];
                    } else {
                        // Create new stop
                        $stmtInsertStop->execute([
                            ':name' => $stop['name'] ?? 'New Stop',
                            ':lat' => $stop['lat'] ?? 0,
                            ':lng' => $stop['lng'] ?? 0,
                            ':description' => $stop['description'] ?? ''
                        ]);
                        $stopId = $this->pdo->lastInsertId();
                    }

                    if ($stopId) {
                        $stmtLinkStop->execute([
                            ':route_id' => $routeId,
                            ':stop_id' => $stopId,
                            ':sequence' => $seq++
                        ]);
                    }
                }
            }

            $this->pdo->commit();

            return $this->respondWithData([
                'id' => $routeId,
                'message' => 'Route created successfully with stops'
            ], 201);

        } catch (\Exception $e) {
            $this->pdo->rollBack();
            return $this->respondWithData(['error' => 'Failed to create route: ' . $e->getMessage()], 500);
        }
    }
}
