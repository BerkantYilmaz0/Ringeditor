<?php
declare(strict_types=1);

namespace App\Application\Actions\RingTypes;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;

final class GetRingTypesAction extends Action
{
    public function __construct(private PDO $pdo, LoggerInterface $logger)
    { parent::__construct($logger); }

    protected function action(): Response
    {
        $stmt = $this->pdo->query("
            SELECT id, name, color, default_first_stop, default_last_stop
            FROM ring_types
            WHERE is_deleted = 0
            ORDER BY name
        ");
        $rows =$stmt !==false ? $stmt ->fetchAll(PDO::FETCH_ASSOC) : [];

        return $this->respondWithData($rows);
    }
}
