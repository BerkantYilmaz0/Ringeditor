<?php
declare(strict_types=1);

namespace App\Application\Actions\Routes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

class ListRoutesAction extends Action
{
    private PDO $pdo;

    public function __construct(PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
        $this->pdo = $pdo;
    }

    protected function action(): Response
    {
        $stmt = $this->pdo->query("SELECT * FROM routes ORDER BY name ASC");
        $routes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Parse geometry JSON if stored as string
        foreach ($routes as &$route) {
            if (isset($route['geometry']) && is_string($route['geometry'])) {
                $route['geometry'] = json_decode($route['geometry'], true);
            }

            // Fetch stops
            $stmtStops = $this->pdo->prepare("
                SELECT s.* 
                FROM stops s
                JOIN route_stops rs ON rs.stop_id = s.id
                WHERE rs.route_id = :route_id
                ORDER BY rs.sequence ASC
            ");
            $stmtStops->execute([':route_id' => $route['id']]);
            $route['stops'] = $stmtStops->fetchAll(PDO::FETCH_ASSOC);
        }

        return $this->respondWithData($routes);
    }
}
