<?php
declare(strict_types=1);

namespace App\Application\Actions\Stops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

final class UpdateStopAction extends Action
{
    public function __construct(private PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $id = (int) $this->resolveArg('id');
        $data = (array) $this->getFormData();

        $name = trim((string) ($data['name'] ?? ''));
        $lat = !empty($data['lat']) ? (float) $data['lat'] : null;
        $lng = !empty($data['lng']) ? (float) $data['lng'] : null;
        $description = trim((string) ($data['description'] ?? ''));

        if ($name === '') {
            return $this->respondWithData(['error' => 'Durak ismi zorunludur.'], 400);
        }

        // Güncellenen isim başka bir durakta var mı?
        $stmtDup = $this->pdo->prepare("SELECT COUNT(*) FROM stops WHERE name = :name AND id != :id");
        $stmtDup->execute([':name' => $name, ':id' => $id]);
        if ($stmtDup->fetchColumn() > 0) {
            return $this->respondWithData(['error' => 'Bu isimde başka bir durak zaten var.'], 409);
        }

        $stmt = $this->pdo->prepare("
            UPDATE stops 
            SET name = :name, lat = :lat, lng = :lng, description = :desc
            WHERE id = :id
        ");

        $stmt->execute([
            ':name' => $name,
            ':lat' => $lat,
            ':lng' => $lng,
            ':desc' => $description,
            ':id' => $id
        ]);

        return $this->respondWithData(['message' => 'Durak güncellendi.']);
    }
}
