<?php
declare(strict_types=1);

namespace App\Application\Actions\Jobs;

use App\Application\Validation\JobsValidator;
use App\Application\Repositories\JobsRepository;
use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;
use App\Application\Validation\ValidationException;

final class CreateJobAction extends Action
{
    public function __construct(
        private JobsRepository $repository,
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $data = $this->getFormData();

        try {
            JobsValidator::validate($data);
            $id = $this->repository->insert($data);

            return $this->respondWithData([
                'message' => 'Plan Başarıyla Oluşturuldu',
                'id' => $id
            ]);
        } catch (ValidationException $e) {
            throw new HttpBadRequestException($this->request, $e->getMessage());
        } catch (\RuntimeException $e) {
            throw new HttpBadRequestException($this->request, $e->getMessage());
        }
    }

}
