<?php
declare(strict_types=1);

namespace App\Application\Actions\Stops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use PDO;

final class CreateStopAction extends Action
{
    public function __construct(private PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $data = (array) $this->getFormData();

        $name = trim((string) ($data['name'] ?? ''));
        $lat = !empty($data['lat']) ? (float) $data['lat'] : null;
        $lng = !empty($data['lng']) ? (float) $data['lng'] : null;
        $description = trim((string) ($data['description'] ?? ''));

        if ($name === '') {
            return $this->respondWithData(['error' => 'Durak ismi zorunludur.'], 400);
        }

        // Aynı isimde durak var mı kontrol et (Evrensel olduğu için isim unique olabilir veya konum kontrolü yapılabilir)
        // Şimdilik isim kontrolü yapalım
        $stmtDup = $this->pdo->prepare("SELECT COUNT(*) FROM stops WHERE name = :name");
        $stmtDup->execute([':name' => $name]);
        if ($stmtDup->fetchColumn() > 0) {
            return $this->respondWithData(['error' => 'Bu isimde bir durak zaten var.'], 409);
        }

        $stmt = $this->pdo->prepare("
            INSERT INTO stops (name, lat, lng, description)
            VALUES (:name, :lat, :lng, :desc)
        ");

        $stmt->execute([
            ':name' => $name,
            ':lat' => $lat,
            ':lng' => $lng,
            ':desc' => $description
        ]);

        return $this->respondWithData(['id' => (int) $this->pdo->lastInsertId()], 201);
    }
}
