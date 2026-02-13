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
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        $username = $_SESSION['user']['username'] ?? 'unknown';

        // Session verilerini temizle
        $_SESSION = [];

        // Session cookie'sini sil
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }

        // Session'ı yok et
        session_destroy();

        $this->logger->info("User logged out: " . $username);

        return $this->respondWithData([
            'message' => 'Çıkış başarılı'
        ]);
    }
}
