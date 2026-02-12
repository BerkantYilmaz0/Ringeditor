<?php
declare(strict_types=1);

namespace App\Application\Actions\RingTypes;

use App\Application\Actions\Action;
use App\Application\Actions\ActionError;
use App\Application\Actions\ActionPayload;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;
use InvalidArgumentException;

final class CreateRingTypesAction extends Action
{
    public function __construct(
        private PDO $pdo,
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $data = (array) $this->getFormData();

        $name = trim((string) ($data['name'] ?? ''));
        $type_id = (int) ($data['type_id'] ?? 0);
        $colorRaw = trim((string) ($data['color'] ?? ''));


        try {
            if ($name === '')
                throw new InvalidArgumentException('Ad boş olamaz.');
            if (mb_strlen($name) < 2)
                throw new InvalidArgumentException('Ad en az 2 karakter olmalıdır.');
            if (mb_strlen($name) > 64)
                throw new InvalidArgumentException('Ad en fazla 64 karakter olabilir.');

            if ($type_id <= 0) {
                $stmtMax = $this->pdo->query("SELECT MAX(type_id) FROM ring_types");
                $max = (int) $stmtMax->fetchColumn();
                $type_id = $max + 1;
            }

            if ($colorRaw === '')
                throw new InvalidArgumentException('Renk boş olamaz.');
            $hex = ltrim($colorRaw, '#');
            if (!preg_match('/^[0-9A-Fa-f]{6}$/', $hex)) {
                throw new InvalidArgumentException('Renk #RRGGBB formatında olmalıdır.');
            }
            $color = '#' . strtoupper($hex);

            $stmt = $this->pdo->prepare("
                INSERT INTO ring_types (name, type_id, color)
                VALUES (:name, :type_id, :color)
            ");
            $stmt->execute([
                ':name' => $name,
                ':type_id' => $type_id,
                ':color' => $color
            ]);

            return $this->respondWithData([
                'id' => (int) $this->pdo->lastInsertId()
            ], 201);

        } catch (InvalidArgumentException $e) {
            $payload = new ActionPayload(400, null, new ActionError(ActionError::BAD_REQUEST, $e->getMessage()));
            return $this->respond($payload)->withStatus(400);
        }
    }
}
