<?php
declare(strict_types=1);

namespace App\Application\Actions\Routes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

class DeleteRouteAction extends Action
{
    private PDO $pdo;

    public function __construct(PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
        $this->pdo = $pdo;
    }

    protected function action(): Response
    {
        $id = (int) $this->resolveArg('id');

        $sql = "DELETE FROM routes WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $id]);

        return $this->respondWithData(['message' => 'Route deleted successfully']);
    }
}
