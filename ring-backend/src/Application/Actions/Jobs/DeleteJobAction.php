<?php
declare(strict_types=1);

namespace App\Application\Actions\Jobs;

use App\Application\Repositories\JobsRepository;
use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpNotFoundException;

final class DeleteJobAction extends Action
{
    public function __construct(
        private JobsRepository $repository,
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $id = (int)$this->resolveArg('id');
        if ($id <= 0) {
            throw new HttpBadRequestException($this->request, "Hatalı plan id");
        }

        $deleted = $this->repository->deleteById($id);

        if ($deleted === 0) {
            throw new HttpNotFoundException($this->request, "Plan Bulunamadı");
        }

        return $this->respondWithData([
            'message'      => 'Plan başarıyla silindi',
            'deletedCount' => $deleted,
            'id'           => $id,
        ]);
    }
}
