<?php

declare(strict_types=1);

namespace App\Application\Actions\Auth;

use App\Application\Actions\Action;
use App\Application\Services\JwtService;
use App\Domain\User\UserNotFoundException;
use App\Domain\User\UserRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpUnauthorizedException;

class LoginAction extends Action
{
    public function __construct(
        LoggerInterface $logger,
        private UserRepository $userRepository,
        private JwtService $jwtService
    ) {
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
            throw new HttpUnauthorizedException($this->request, "Geçersiz kullanıcı adı veya şifre.");
        }

        // Şifre kontrolü - Hibrit (Hash + Legacy Plaintext)
        $dbPassword = $user->getPassword();
        $isValid = false;
        $needsRehash = false;

        // 1. Hash Kontrolü (Bcrypt)
        if (password_verify($password, $dbPassword)) {
            $isValid = true;
            if (password_needs_rehash($dbPassword, PASSWORD_DEFAULT)) {
                $needsRehash = true;
            }
        }
        // 2. Legacy Plaintext Kontrolü
        elseif ($dbPassword === $password) {
            $isValid = true;
            $needsRehash = true;
        }

        if (!$isValid) {
            throw new HttpUnauthorizedException($this->request, "Geçersiz kullanıcı adı veya şifre.");
        }

        // Login başarılı - Şifre hash güncelleme (Legacy -> Modern geçiş)
        if ($needsRehash) {
            try {
                $newHash = password_hash($password, PASSWORD_DEFAULT);
                $this->logger->info("User password upgraded to hash: " . $username);
            } catch (\Exception $e) {
                $this->logger->error("Password upgrade failed: " . $e->getMessage());
            }
        }

        // JWT Token oluştur
        $userData = $user->jsonSerialize();
        $token = $this->jwtService->createToken($userData);

        $this->logger->info("User logged in: " . $username);

        return $this->respondWithData([
            'message' => 'Giriş başarılı',
            'token' => $token,
            'user' => $user
        ]);
    }
}
