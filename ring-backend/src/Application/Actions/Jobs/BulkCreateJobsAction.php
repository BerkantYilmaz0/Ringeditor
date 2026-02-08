<?php
declare(strict_types=1);

namespace App\Application\Actions\Jobs;

use App\Application\Repositories\JobsRepository;
use App\Application\Actions\Action;
use App\Application\Validation\JobsValidator;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;
use App\Application\Validation\ValidationException;

final class BulkCreateJobsAction extends Action
{
    public function __construct(
        private JobsRepository $repository,
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $rows = $this->getFormData();

        try {
            JobsValidator::validateBulk($rows);

            $result = $this->repository->insertMany($rows);

            return $this->respondWithData([
                'message' => 'Plan Başarıyla Oluşturuldu',
                'insertedCount' => $result['insertedCount']
            ]);
        } catch (ValidationException $e) {
            throw new HttpBadRequestException($this->request, $e->getMessage());
        } catch (\RuntimeException $e) {
            throw new HttpBadRequestException($this->request, $e->getMessage());
        }
    }
}
