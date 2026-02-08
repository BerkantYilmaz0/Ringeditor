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

        $sql = "INSERT INTO routes (name, ring_type_id, geometry, color, description) VALUES (:name, :ring_type_id, :geometry, :color, :description)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':name' => $name,
            ':ring_type_id' => $ringTypeId,
            ':geometry' => $geometry,
            ':color' => $color,
            ':description' => $description
        ]);

        $id = $this->pdo->lastInsertId();

        return $this->respondWithData([
            'id' => $id,
            'message' => 'Route created successfully'
        ], 201);
    }
}
