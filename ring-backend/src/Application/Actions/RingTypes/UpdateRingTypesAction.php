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
    ) { parent::__construct($logger); }

    protected function action(): Response
    {
        $id = (int)$this->resolveArg('id');
        $data = (array)$this->getFormData();

        $name = trim((string)($data['name'] ?? ''));
        $type_id = (int)($data['type_id'] ?? 0);
        $color = trim((string)($data['color'] ?? ''));
        $first_stop = trim((string)($data['default_first_stop'] ?? ''));
        $last_stop = trim((string)($data['default_last_stop'] ?? ''));

        try {
            // Boş alan kontrolü
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
            if(!preg_match('/^[0-9A-Fa-f]{6}$/',$hex))
            {
                throw new InvalidArgumentException('Renk #RRGGBB formatında olmalıdır.');
            }
            $color = '#'.strtoupper($hex);
            if ($first_stop === '') {
                throw new InvalidArgumentException('İlk durak boş olamaz.');
            }
            if($first_stop !==''&& mb_strlen($first_stop)>32)
            {
                throw new InvalidArgumentException('İlk Durak en fazla 32 karakter olmalıdır.');
            }
            if ($last_stop === '') {
                throw new InvalidArgumentException('Son durak boş olamaz.');
            }
            if($last_stop !==''&& mb_strlen($last_stop)>32)
            {
                throw new InvalidArgumentException('Son Durak en fazla 32 karakter olmalıdır.');
            }
         

            // Güncelleme sorgusu
            $stmt = $this->pdo->prepare("
                UPDATE ring_types
                SET name = :name,
                    type_id = :type_id,
                    color = :color,
                    default_first_stop = :first_stop,
                    default_last_stop = :last_stop
                WHERE id = :id AND is_deleted = 0
            ");
            $stmt->execute([
                ':name' => $name,
                ':type_id' => $type_id,
                ':color' => $color,
                ':first_stop' => $first_stop,
                ':last_stop' => $last_stop,
                ':id' => $id
            ]);

            return $this->respondWithData(['status' => 'success']);
        } catch (InvalidArgumentException $e) {
            $payload = new ActionPayload(400, null, new ActionError(ActionError::BAD_REQUEST, $e->getMessage()));
            return $this->respond($payload)->withStatus(400);
        }
    }
}
