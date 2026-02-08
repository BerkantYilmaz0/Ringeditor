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

        $sql = "UPDATE routes SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);

        return $this->respondWithData(['message' => 'Route updated successfully']);
    }
}
