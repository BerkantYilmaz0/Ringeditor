<?php

declare(strict_types=1);

namespace App\Application\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;

class JwtService
{
    private string $secret;
    private int $expiry;

    public function __construct(string $secret, int $expiry = 3600)
    {
        $this->secret = $secret;
        $this->expiry = $expiry;
    }

    /**
     * Kullanıcı bilgilerinden JWT token oluşturur.
     *
     * @param array $userData Kullanıcı bilgileri (id, username, vb.)
     * @return string JWT token
     */
    public function createToken(array $userData): string
    {
        $now = time();

        $payload = [
            'iss' => 'ring-planner',       // Token'ı oluşturan
            'iat' => $now,                  // Oluşturulma zamanı
            'exp' => $now + $this->expiry,  // Son kullanım zamanı
            'sub' => $userData['username'] ?? '', // Konu (kullanıcı adı)
            'user' => $userData,            // Kullanıcı verileri
        ];

        return JWT::encode($payload, $this->secret, 'HS256');
    }

    /**
     * JWT token'ı doğrular ve decode eder.
     *
     * @param string $token JWT token
     * @return array Decoded user verileri
     * @throws \RuntimeException Token geçersizse
     */
    public function validateToken(string $token): array
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secret, 'HS256'));
            return (array) $decoded->user;
        } catch (ExpiredException $e) {
            throw new \RuntimeException('Oturum süresi doldu. Lütfen tekrar giriş yapın.', 401);
        } catch (SignatureInvalidException $e) {
            throw new \RuntimeException('Geçersiz token.', 401);
        } catch (\Exception $e) {
            throw new \RuntimeException('Token doğrulaması başarısız: ' . $e->getMessage(), 401);
        }
    }
}
