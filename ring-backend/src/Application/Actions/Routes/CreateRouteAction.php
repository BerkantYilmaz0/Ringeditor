<?php
declare(strict_types=1);

namespace App\Application\Actions\Routes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

use App\Domain\Route\RouteService;
use App\Infrastructure\Persistence\Route\RouteRepository;

class CreateRouteAction extends Action
{
    public function __construct(
        private PDO $pdo,
        private RouteRepository $routeRepository,
        private RouteService $routeService,
        \Psr\Log\LoggerInterface $logger
    ) {
        parent::__construct($logger);
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

            $this->pdo->beginTransaction();

            // Prepare data for repository
            $routeData = [
                'name' => $name,
                'ring_type_id' => $ringTypeId,
                'geometry' => isset($data['geometry']) ? $data['geometry'] : null, // Pass raw array/object, repository handles encoding
                'color' => $color,
                'description' => $description
            ];

            $routeId = $this->routeRepository->create($routeData);

            if (isset($data['stops']) && is_array($data['stops'])) {
                $this->routeService->processRouteStops($routeId, $data['stops']);
            }

            $this->pdo->commit();

            return $this->respondWithData([
                'id' => $routeId,
                'message' => 'Route created successfully with stops'
            ], 201);

        } catch (\Exception $e) {
            $this->pdo->rollBack();
            $this->logger->error("CreateRouteAction: " . $e->getMessage());
            throw $e;
        }
    }
}
