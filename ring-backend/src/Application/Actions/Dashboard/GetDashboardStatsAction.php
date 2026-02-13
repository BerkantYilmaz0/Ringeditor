<?php

declare(strict_types=1);

namespace App\Application\Actions\Dashboard;

use App\Application\Actions\Action;
use App\Application\Repositories\JobsRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;

class GetDashboardStatsAction extends Action
{
    private JobsRepository $repo;

    public function __construct(LoggerInterface $logger, JobsRepository $repo)
    {
        parent::__construct($logger);
        $this->repo = $repo;
    }

    protected function action(): Response
    {
        $data = $this->repo->getDashboardStats();
        return $this->respondWithData($data);
    }
}
