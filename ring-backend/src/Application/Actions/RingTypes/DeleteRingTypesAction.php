<?php
declare(strict_types=1);

namespace App\Application\Actions\RingTypes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;

final class DeleteRingTypesAction extends Action
{
    public function __construct(
        private PDO $pdo,
        LoggerInterface $logger
    ) { parent::__construct($logger); }

    protected function action(): Response
    {
        $id = (int)$this->resolveArg('id');

        $stmt = $this->pdo->prepare("UPDATE ring_types SET is_deleted = 1 WHERE id = :id");
        $stmt->execute([':id' => $id]);

        return $this->respondWithData(['status' => 'deleted']);
    }
}
