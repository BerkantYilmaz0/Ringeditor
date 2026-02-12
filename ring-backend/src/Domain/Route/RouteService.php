<?php
declare(strict_types=1);

namespace App\Domain\Route;

use PDO;
use Psr\Log\LoggerInterface;

class RouteService
{
    private PDO $pdo;
    private LoggerInterface $logger;

    public function __construct(PDO $pdo, LoggerInterface $logger)
    {
        $this->pdo = $pdo;
        $this->logger = $logger;
    }

    /**
     * Processes and saves stops for a given route.
     * 
     * @param int $routeId The ID of the route
     * @param array $stops Array of stop data
     * @return void
     */
    public function processRouteStops(int $routeId, array $stops): void
    {
        if (empty($stops)) {
            return;
        }

        // 1. Clear existing link stops for this route (if updating)
        // Note: For Create action, this deletes nothing but is safe. 
        // Efficient way to handle both create (idempotent) and update.
        $deleteStmt = $this->pdo->prepare("DELETE FROM route_stops WHERE route_id = :route_id");
        $deleteStmt->execute([':route_id' => $routeId]);

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
                    ':route_id' => $routeId,
                    ':stop_id' => $stopId,
                    ':sequence' => $seq++
                ]);
            }
        }
    }
}
