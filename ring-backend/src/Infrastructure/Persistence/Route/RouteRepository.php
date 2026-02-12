<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Route;

use PDO;
use InvalidArgumentException;

class RouteRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    public function findAll(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM routes ORDER BY name ASC");
        $routes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // JSON parsing for geometry
        foreach ($routes as &$route) {
            if (isset($route['geometry']) && is_string($route['geometry'])) {
                $route['geometry'] = json_decode($route['geometry'], true);
            }
        }

        return $routes;
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->pdo->prepare("SELECT * FROM routes WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $route = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($route && isset($route['geometry']) && is_string($route['geometry'])) {
            $route['geometry'] = json_decode($route['geometry'], true);
        }

        return $route ?: null;
    }

    public function create(array $data): int
    {
        $sql = "INSERT INTO routes (name, ring_type_id, geometry, color, description) 
                VALUES (:name, :ring_type_id, :geometry, :color, :description)";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':name' => $data['name'],
            ':ring_type_id' => $data['ring_type_id'],
            ':geometry' => isset($data['geometry']) ? json_encode($data['geometry']) : null,
            ':color' => $data['color'] ?? null,
            ':description' => $data['description'] ?? null
        ]);

        return (int) $this->pdo->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [':id' => $id];

        if (array_key_exists('name', $data)) {
            $fields[] = "name = :name";
            $params[':name'] = $data['name'];
        }
        if (array_key_exists('ring_type_id', $data)) {
            $fields[] = "ring_type_id = :ring_type_id";
            $params[':ring_type_id'] = $data['ring_type_id'];
        }
        if (array_key_exists('geometry', $data)) {
            $fields[] = "geometry = :geometry";
            $params[':geometry'] = json_encode($data['geometry']);
        }
        if (array_key_exists('color', $data)) {
            $fields[] = "color = :color";
            $params[':color'] = $data['color'];
        }
        if (array_key_exists('description', $data)) {
            $fields[] = "description = :description";
            $params[':description'] = $data['description'];
        }

        if (empty($fields)) {
            return false;
        }

        $sql = "UPDATE routes SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->pdo->prepare("DELETE FROM routes WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    public function findAllWithStops(): array
    {
        $routes = $this->findAll();

        $routeIds = array_column($routes, 'id');

        if (empty($routeIds)) {
            return [];
        }

        // Initialize stops array for all routes
        foreach ($routes as &$route) {
            $route['stops'] = [];
        }
        unset($route);

        $placeholders = implode(',', array_fill(0, count($routeIds), '?'));

        $sql = "
            SELECT s.*, rs.route_id, rs.sequence
            FROM stops s
            JOIN route_stops rs ON rs.stop_id = s.id
            WHERE rs.route_id IN ($placeholders)
            ORDER BY rs.route_id, rs.sequence ASC
        ";

        $stmtStops = $this->pdo->prepare($sql);
        $stmtStops->execute($routeIds);
        $allStops = $stmtStops->fetchAll(PDO::FETCH_ASSOC);

        $stopsByRoute = [];
        foreach ($allStops as $stop) {
            $rId = $stop['route_id'];
            if (!isset($stopsByRoute[$rId])) {
                $stopsByRoute[$rId] = [];
            }
            $stopsByRoute[$rId][] = $stop;
        }

        foreach ($routes as &$route) {
            if (isset($stopsByRoute[$route['id']])) {
                $route['stops'] = $stopsByRoute[$route['id']];
            }
        }

        return $routes;
    }
}
