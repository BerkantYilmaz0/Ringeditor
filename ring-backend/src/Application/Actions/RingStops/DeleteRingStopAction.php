<?php
declare(strict_types=1);

namespace App\Application\Actions\RingStops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

final class DeleteRingStopAction extends Action
{
    public function __construct(private PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $id = (int) $this->resolveArg('id');

        $stmt = $this->pdo->prepare("DELETE FROM ring_stop_pivot WHERE id = :id");
        $stmt->execute([':id' => $id]);

        return $this->respondWithData(['status' => 'deleted']);
    }
}
