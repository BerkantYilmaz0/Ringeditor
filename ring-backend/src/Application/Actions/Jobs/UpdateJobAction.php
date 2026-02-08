<?php
declare(strict_types=1);

namespace App\Application\Actions\Jobs;

use App\Application\Repositories\JobsRepository;
use App\Application\Validation\JobsValidator;
use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;
use App\Application\Validation\ValidationException;

final class UpdateJobAction extends Action
{
    public function __construct(
        private JobsRepository $repository,
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }



    protected function action(): Response
    {
        $jobId = (int) $this->resolveArg('id');
        $data = $this->getFormData();

        try {
            // Ortak validasyon
            JobsValidator::validate($data);
            $this->repository->update($jobId, $data);

            return $this->respondWithData([
                'message' => 'Sefer başarıyla güncellendi',
                'id' => $jobId
            ]);
        } catch (ValidationException $e) {
            throw new HttpBadRequestException($this->request, $e->getMessage());
        } catch (\RuntimeException $e) {
            throw new HttpBadRequestException($this->request, $e->getMessage());
        }
    }

}
