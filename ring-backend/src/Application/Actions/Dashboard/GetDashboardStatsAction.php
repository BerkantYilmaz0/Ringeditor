<?php
declare(strict_types=1);

namespace App\Application\Actions\Dashboard;

use App\Application\Repositories\JobsRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class GetDashboardStatsAction
{
    public function __construct(
        private JobsRepository $repo
    ) {
    }

    public function __invoke(Request $request, Response $response): Response
    {
        $data = $this->repo->getDashboardStats();

        $response->getBody()->write(json_encode([
            'data' => $data
        ], JSON_UNESCAPED_UNICODE));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
