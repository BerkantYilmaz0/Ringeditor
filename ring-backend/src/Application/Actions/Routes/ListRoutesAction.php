<?php
declare(strict_types=1);

namespace App\Application\Actions\Routes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use App\Infrastructure\Persistence\Route\RouteRepository;

class ListRoutesAction extends Action
{
    public function __construct(
        private RouteRepository $routeRepository,
        \Psr\Log\LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $routes = $this->routeRepository->findAllWithStops();

        return $this->respondWithData($routes);
    }
}
