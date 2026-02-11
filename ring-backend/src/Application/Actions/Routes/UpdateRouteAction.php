<?php
declare(strict_types=1);

namespace App\Application\Actions\Routes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

class UpdateRouteAction extends Action
{
    private PDO $pdo;

    public function __construct(PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
        $this->pdo = $pdo;
    }

    protected function action(): Response
    {
        $id = (int) $this->resolveArg('id');
        $data = $this->getFormData();

        // Build dynamic update query
        $fields = [];
        $params = [':id' => $id];

        if (isset($data['name'])) {
            $fields[] = "name = :name";
            $params[':name'] = $data['name'];
        }
        if (isset($data['ring_type_id'])) {
            $fields[] = "ring_type_id = :ring_type_id";
            $params[':ring_type_id'] = $data['ring_type_id'];
        }
        if (isset($data['geometry'])) {
            $fields[] = "geometry = :geometry";
            $params[':geometry'] = json_encode($data['geometry']);
        }
        if (isset($data['color'])) {
            $fields[] = "color = :color";
            $params[':color'] = $data['color'];
        }
        if (isset($data['description'])) {
            $fields[] = "description = :description";
            $params[':description'] = $data['description'];
        }

        if (empty($fields)) {
            return $this->respondWithData(['message' => 'No changes provided'], 200);
        }

        try {
            $this->pdo->beginTransaction();

            $sql = "UPDATE routes SET " . implode(', ', $fields) . " WHERE id = :id";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);

            // Handle Stops Update
            if (isset($data['stops']) && is_array($data['stops'])) {
                $stops = $data['stops'];

                // 1. Clear existing link stops for this route
                $deleteStmt = $this->pdo->prepare("DELETE FROM route_stops WHERE route_id = :route_id");
                $deleteStmt->execute([':route_id' => $id]);

                // 2. Insert new stops/links
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
                        // Create new stop if no ID provided
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
                            ':route_id' => $id,
                            ':stop_id' => $stopId,
                            ':sequence' => $seq++
                        ]);
                    }
                }
            }

            $this->pdo->commit();
            return $this->respondWithData(['message' => 'Route updated successfully']);

        } catch (\Exception $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            return $this->respondWithData(['error' => 'Failed to update route: ' . $e->getMessage()], 500);
        }
    }
}
