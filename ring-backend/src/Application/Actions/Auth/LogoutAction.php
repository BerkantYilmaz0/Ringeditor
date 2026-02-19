<?php

declare(strict_types=1);

namespace App\Application\Actions\Auth;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;

class LogoutAction extends Action
{
    public function __construct(LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        // JWT stateless olduğu için backend'de token'ı geçersiz kılma mekanizması yok.
        // Gerçek logout işlemi frontend'de token'ın localStorage'dan silinmesiyle yapılır.
        $this->logger->info("User logged out (client-side token removal).");

        return $this->respondWithData([
            'message' => 'Çıkış başarılı'
        ]);
    }
}
