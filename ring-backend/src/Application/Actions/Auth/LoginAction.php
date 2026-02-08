<?php
declare(strict_types=1);

namespace App\Application\Actions\Auth;

use App\Application\Actions\Action;
use App\Domain\User\UserNotFoundException;
use App\Domain\User\UserRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpUnauthorizedException;

class LoginAction extends Action
{
    public function __construct(LoggerInterface $logger, private UserRepository $userRepository)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $data = $this->getFormData();

        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (empty($username) || empty($password)) {
            throw new HttpBadRequestException($this->request, "Kullanıcı adı ve şifre gereklidir.");
        }

        try {
            $user = $this->userRepository->findByUsername($username);
        } catch (UserNotFoundException $e) {
            // Güvenlik için "Kullanıcı bulunamadı" demek yerine genel hata fırlatabiliriz veya direk 401.
            throw new HttpUnauthorizedException($this->request, "Geçersiz kullanıcı adı veya şifre.");
        }

        // Şifre kontrolü - Legacy veritabanı (2wsxzaq1) için plaintext kontrolü.
        // MD5 desteği de eklenebilir.
        // NOT: varchar(32) olduğu için bcrypt (60+) sığmaz.
        $dbPassword = $user->getPassword(); // User sınıfına getPassword eklemiştik

        $isValid = false;

        // 1. Plaintext kontrolü
        if ($dbPassword === $password) {
            $isValid = true;
        }

        if (!$isValid) {
            throw new HttpUnauthorizedException($this->request, "Geçersiz kullanıcı adı veya şifre.");
        }

        // Giriş başarılı - Oturum başlat
        // SessionMiddleware session_start() yapmış olabilir veya biz yapacağız.
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        $_SESSION['user'] = $user->jsonSerialize();

        $this->logger->info("User logged in: " . $username);

        return $this->respondWithData([
            'message' => 'Giriş başarılı',
            'user' => $user
        ]);
    }
}
