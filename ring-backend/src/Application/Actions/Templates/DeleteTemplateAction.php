<?php
declare(strict_types=1);

namespace App\Application\Actions\Templates;


use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;

final class DeleteTemplateAction extends Action
{
    public function __construct(
        private PDO $pdo,
        LoggerInterface $logger
    ) { parent::__construct($logger); }

    protected function action(): Response
    {
        $id = (int)$this->resolveArg('id');

        // templates soft delete
        $stmt = $this->pdo->prepare("UPDATE templates SET is_deleted = 1 WHERE id = :id");
        $stmt->execute([':id'=>$id]);

        // (Varsa) template_jobs soft delete
        try {
            $stmt2 = $this->pdo->prepare("UPDATE template_jobs SET is_deleted = 1 WHERE template_id = :id");
            $stmt2->execute([':id'=>$id]);
        } catch (\Throwable $ignore) {
            // template_jobs tablosunda is_deleted yoksa sessiz geç
            // template_jobs tablosu kısmına geçince hata eklenicek.
        }

        return $this->respondWithData(['status' => 'deleted']);
    }
}