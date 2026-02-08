<?php

declare(strict_types=1);

namespace App\Application\Actions\Templates;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LoggerInterface;
use PDO;

final class GetTemplateAction extends Action
{
        public function __construct(
        private PDO $pdo,
        LoggerInterface $logger
    ) { parent::__construct($logger); }

    protected function action(): Response
    {
       
        $stmt = $this->pdo->query(
            "SELECT * FROM templates
             WHERE is_deleted = 0
             ORDER BY updated_at DESC"
        );
        $rows = $stmt !== false ? $stmt->fetchAll(PDO::FETCH_ASSOC) : [];
        return $this->respondWithData($rows);
    }
}