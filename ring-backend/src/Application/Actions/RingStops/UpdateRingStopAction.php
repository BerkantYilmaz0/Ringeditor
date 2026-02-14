<?php
declare(strict_types=1);

namespace App\Application\Actions\RingStops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

final class UpdateRingStopAction extends Action
{
    public function __construct(private PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $id = (int) $this->resolveArg('id');
        $data = (array) $this->getFormData();

        $stopName = trim((string) ($data['stop_name'] ?? ''));
        $lat = !empty($data['lat']) ? (float) $data['lat'] : null;
        $lng = !empty($data['lng']) ? (float) $data['lng'] : null;

        if ($stopName === '') {
            return $this->respondWithData(['error' => 'Durak adı boş olamaz.'], 400);
        }

        $stmt = $this->pdo->prepare("
            UPDATE stops 
            SET name = :name, lat = :lat, lng = :lng
            WHERE id = :id
        ");
        $stmt->execute([
            ':name' => $stopName,
            ':lat' => $lat,
            ':lng' => $lng,
            ':id' => $id
        ]);

        return $this->respondWithData(['status' => 'updated']);
    }
}
