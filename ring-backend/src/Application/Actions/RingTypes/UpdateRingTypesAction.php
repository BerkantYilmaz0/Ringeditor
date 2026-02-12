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

final class UpdateRingTypesAction extends Action
{
    public function __construct(
        private PDO $pdo,
        LoggerInterface $logger
    ) {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $id = (int) $this->resolveArg('id');
        $data = (array) $this->getFormData();

        $name = trim((string) ($data['name'] ?? ''));
        $type_id = (int) ($data['type_id'] ?? 0);
        $color = trim((string) ($data['color'] ?? ''));

        try {
            if ($name === '') {
                throw new InvalidArgumentException('Ring tipi adı boş olamaz.');
            }
            if ($type_id <= 0) {
                throw new InvalidArgumentException('Type ID geçerli bir sayı olmalıdır.');
            }
            if ($color === '') {
                throw new InvalidArgumentException('Renk değeri boş olamaz.');
            }
            $hex = ltrim($color, '#');
            if (!preg_match('/^[0-9A-Fa-f]{6}$/', $hex)) {
                throw new InvalidArgumentException('Renk #RRGGBB formatında olmalıdır.');
            }
            $color = '#' . strtoupper($hex);

            $stmt = $this->pdo->prepare("
                UPDATE ring_types
                SET name = :name,
                    type_id = :type_id,
                    color = :color
                WHERE id = :id AND is_deleted = 0
            ");
            $stmt->execute([
                ':name' => $name,
                ':type_id' => $type_id,
                ':color' => $color,
                ':id' => $id
            ]);

            return $this->respondWithData(['status' => 'success']);
        } catch (InvalidArgumentException $e) {
            $payload = new ActionPayload(400, null, new ActionError(ActionError::BAD_REQUEST, $e->getMessage()));
            return $this->respond($payload)->withStatus(400);
        }
    }
}
