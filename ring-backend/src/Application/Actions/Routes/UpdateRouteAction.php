<?php
declare(strict_types=1);

namespace App\Application\Actions\Routes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

use App\Domain\Route\RouteService;
use App\Infrastructure\Persistence\Route\RouteRepository;

class UpdateRouteAction extends Action
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
        $id = (int) $this->resolveArg('id');
        $data = $this->getFormData();

        try {
            $this->pdo->beginTransaction();

            $this->routeRepository->update($id, $data);

            // Handle Stops Update
            if (isset($data['stops']) && is_array($data['stops'])) {
                $this->routeService->processRouteStops($id, $data['stops']);
            }

            $this->pdo->commit();
            return $this->respondWithData(['message' => 'Route updated successfully']);

        } catch (\Exception $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            $this->logger->error("UpdateRouteAction: " . $e->getMessage());
            throw $e;
        }
    }
}
