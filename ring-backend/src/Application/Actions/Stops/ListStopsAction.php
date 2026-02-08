<?php
declare(strict_types=1);

namespace App\Application\Actions\Stops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

final class ListStopsAction extends Action
{
    public function __construct(private PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $stmt = $this->pdo->query("SELECT * FROM stops ORDER BY name ASC");
        $stops = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $this->respondWithData($stops);
    }
}
