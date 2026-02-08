<?php
declare(strict_types=1);

namespace App\Application\Actions\Templates;

use App\Application\Actions\Action;
use App\Application\Actions\ActionError;
use App\Application\Actions\ActionPayload;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;
use InvalidArgumentException;

final class UpdateTemplateAction extends Action
{
    public function __construct(
        private PDO $pdo,
        LoggerInterface $logger
    ) { parent::__construct($logger); }

    protected function action(): Response
    {
        $id   = (int)$this->resolveArg('id');
        $data = (array)$this->getFormData();

        $name = trim((string)($data['name'] ?? ''));
        $description = isset($data['description']) ? (string)$data['description'] : null;

        try {
            if ($name === '') {
                throw new InvalidArgumentException('Şablon adı boş olamaz.');
            }
            if (mb_strlen($name) < 2) {
                throw new InvalidArgumentException('Şablon adı en az 2 karakter olmalıdır.');
            }
            if (mb_strlen($name) > 64) {
                throw new InvalidArgumentException('Şablon adı en fazla 64 karakter olmalıdır.');
            }
            $description = array_key_exists('description',$data)
            ? trim((string)$data['description'])
            : null;
            if ($description !== null && mb_strlen($description) > 255) {
                throw new InvalidArgumentException('Açıklama en fazla 255 karakter olmalıdır.');
            }

            $stmt = $this->pdo->prepare(
                "UPDATE templates
                 SET name = :name, description = :description, updated_at = NOW()
                 WHERE id = :id AND is_deleted = 0"
            );
            $stmt->execute([':name'=>$name, ':description'=>$description, ':id'=>$id]);

            return $this->respondWithData(['status' => 'success']);
        } catch (InvalidArgumentException $e) {
            $payload = new ActionPayload(400, null, new ActionError(ActionError::BAD_REQUEST, $e->getMessage()));
            return $this->respond($payload)->withStatus(400);
        }
    }
}
