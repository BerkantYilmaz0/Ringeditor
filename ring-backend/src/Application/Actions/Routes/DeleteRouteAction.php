<?php
declare(strict_types=1);

namespace App\Application\Actions\Routes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

class DeleteRouteAction extends Action
{
    public function __construct(
        private \App\Infrastructure\Persistence\Route\RouteRepository $routeRepository,
        \Psr\Log\LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $id = (int) $this->resolveArg('id');

        $this->routeRepository->delete($id);

        return $this->respondWithData(['message' => 'Route deleted successfully']);
    }
}
