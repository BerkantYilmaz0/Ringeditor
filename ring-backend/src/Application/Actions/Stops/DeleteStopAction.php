<?php

declare(strict_types=1);

namespace App\Application\Actions\Stops;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;

final class DeleteStopAction extends Action
{
    public function __construct(private \PDO $pdo, \Psr\Log\LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $stopId = (int) $this->resolveArg('id');

        // Durak var mi kontrol et
        $stmt = $this->pdo->prepare("SELECT id FROM stops WHERE id = :id");
        $stmt->execute([':id' => $stopId]);
        if (!$stmt->fetch()) {
            return $this->respondWithData(['message' => 'Stop not found'], 404);
        }

        // Bagimliliklari kontrol et (orn. ring_stops)
        // Kullanilmasina ragmen silmeye izin vermek istiyorsak cascade veya uyari gerekebilir.
        // Simdilik basit silmeye izin verildigini veya DB kisitlamalarinin hallettigini varsayiyoruz.
        // Eger cascade olmadan FK kisitlamalari varsa, bu islem basarisiz olacaktir.

        $stmt = $this->pdo->prepare("DELETE FROM stops WHERE id = :id");
        $stmt->execute([':id' => $stopId]);

        return $this->respondWithData(['message' => 'Stop deleted successfully']);
    }
}
