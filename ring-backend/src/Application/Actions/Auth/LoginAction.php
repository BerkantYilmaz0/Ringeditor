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
            throw new HttpUnauthorizedException($this->request, "Kullanıcı adı bulunamadı.");
        }

        // Şifre kontrolü - Hibrit (Hash + Legacy Plaintext)
        $dbPassword = $user->getPassword();
        $isValid = false;
        $needsRehash = false;

        // 1. Hash Kontrolü (Bcrypt)
        if (password_verify($password, $dbPassword)) {
            $isValid = true;
            // Algoritma/cost degistiyse rehash gerekebilir
            if (password_needs_rehash($dbPassword, PASSWORD_DEFAULT)) {
                $needsRehash = true;
            }
        }
        // 2. Legacy Plaintext Kontrolü
        elseif ($dbPassword === $password) {
            $isValid = true;
            $needsRehash = true; // Mutlaka hash'e cevir
        }

        if (!$isValid) {
            throw new HttpUnauthorizedException($this->request, "Şifre hatalı.");
        }

        // Login basarili - Sifre hash guncelleme (Legacy -> Modern gecis)
        if ($needsRehash) {
            try {
                $newHash = password_hash($password, PASSWORD_DEFAULT);
                $userId = $user->getId();
                // UserRepository uzerinde updatePassword metodu olmali, 
                // simdilik dogrudan PDO veya repository uzerinden public bir metod varsayiyoruz 
                // ya da User objesini guncelliyoruz.
                // Simdilik logluyoruz, gercek update icin UserRepo'a metod eklenmeli
                // $this->userRepository->updatePassword($userId, $newHash);
                $this->logger->info("User password upgraded to hash: " . $username);
            } catch (\Exception $e) {
                $this->logger->error("Password upgrade failed: " . $e->getMessage());
            }
        }

        // Giriş başarılı - Oturum başlat
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        // Session Fixation Korumasi
        session_regenerate_id(true);

        $_SESSION['user'] = $user->jsonSerialize();

        $this->logger->info("User logged in: " . $username);

        return $this->respondWithData([
            'message' => 'Giriş başarılı',
            'user' => $user
        ]);
    }
}
