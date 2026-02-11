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
        $first_stop = trim((string) ($data['default_first_stop'] ?? ''));
        $last_stop = trim((string) ($data['default_last_stop'] ?? ''));

        $active_route_id = isset($data['active_route_id']) ? (int) $data['active_route_id'] : null;
        if ($active_route_id === 0)
            $active_route_id = null;

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

            if ($first_stop !== '' && mb_strlen($first_stop) > 32) {
                throw new InvalidArgumentException('default_first_stop en fazla 32 karakter olabilir.');
            }
            if ($last_stop !== '' && mb_strlen($last_stop) > 32) {
                throw new InvalidArgumentException('default_last_stop en fazla 32 karakter olabilir.');
            }

            $stmt = $this->pdo->prepare("
                INSERT INTO ring_types (name, type_id, color, default_first_stop, default_last_stop, active_route_id)
                VALUES (:name, :type_id, :color, :first_stop, :last_stop, :active_route_id)
            ");
            $stmt->execute([
                ':name' => $name,
                ':type_id' => $type_id,
                ':color' => $color,
                ':first_stop' => $first_stop === '' ? null : $first_stop,
                ':last_stop' => $last_stop === '' ? null : $last_stop,
                ':active_route_id' => $active_route_id
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
