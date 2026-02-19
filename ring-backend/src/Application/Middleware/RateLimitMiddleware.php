<?php

declare(strict_types=1);

namespace App\Application\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Log\LoggerInterface;
use Slim\Psr7\Response as SlimResponse;

/**
 * Login endpoint'i için IP bazlı rate limiting + progresif blok.
 *
 * - İlk aşama: 10 deneme / 60 saniye → 429 + 1 dk bekleme
 * - İkinci aşama: 30 toplam başarısız deneme → IP 15 dakika bloklanır
 *
 * Dosya tabanlı (Redis gerektirmez).
 * Not: Container restart'ta sayaçlar sıfırlanır — production'da kabul edilebilir trade-off.
 */
final class RateLimitMiddleware implements MiddlewareInterface
{
    private string $storageDir;
    private int $maxAttempts;
    private int $windowSeconds;
    private int $blockThreshold;
    private int $blockDurationSeconds;
    private LoggerInterface $logger;

    public function __construct(
        LoggerInterface $logger,
        int $maxAttempts = 10,
        int $windowSeconds = 60,
        int $blockThreshold = 30,
        int $blockDurationSeconds = 900
    ) {
        $this->logger = $logger;
        $this->maxAttempts = $maxAttempts;
        $this->windowSeconds = $windowSeconds;
        $this->blockThreshold = $blockThreshold;
        $this->blockDurationSeconds = $blockDurationSeconds;
        $this->storageDir = sys_get_temp_dir() . '/ring_rate_limit';

        if (!is_dir($this->storageDir)) {
            mkdir($this->storageDir, 0755, true);
        }
    }

    public function process(Request $request, RequestHandler $handler): Response
    {
        $path = $request->getUri()->getPath();

        // Sadece /login endpoint'ine uygula
        if ($path !== '/login' || $request->getMethod() !== 'POST') {
            return $handler->handle($request);
        }

        $ip = $this->getClientIp($request);
        $key = md5($ip);

        // --- IP blok kontrolü ---
        $blockFile = $this->storageDir . '/' . $key . '.blocked';
        if (file_exists($blockFile)) {
            $blockData = json_decode((string) file_get_contents($blockFile), true);
            $blockedUntil = ($blockData['until'] ?? 0);

            if (time() < $blockedUntil) {
                $remaining = $blockedUntil - time();
                $this->logger->warning("Bloklanmış IP login denemesi", [
                    'ip' => $ip,
                    'remaining_seconds' => $remaining,
                ]);

                return $this->jsonResponse(429, [
                    'type' => 'IP_BLOCKED',
                    'description' => "IP adresiniz çok fazla başarısız deneme nedeniyle bloklandı. {$remaining} saniye sonra tekrar deneyin.",
                    'retry_after' => $remaining,
                ]);
            }

            // Blok süresi doldu, temizle
            @unlink($blockFile);
        }

        // --- Normal rate limit kontrolü ---
        $file = $this->storageDir . '/' . $key . '.json';
        $data = $this->getData($file);

        if ($data['window_count'] >= $this->maxAttempts) {
            // Toplam başarısız sayıyı kontrol et — blok eşiğine ulaştıysa IP'yi blokla
            $totalFailed = $data['total_failed'];

            if ($totalFailed >= $this->blockThreshold) {
                $blockedUntil = time() + $this->blockDurationSeconds;
                file_put_contents($blockFile, json_encode([
                    'ip' => $ip,
                    'until' => $blockedUntil,
                    'reason' => "{$totalFailed} başarısız deneme",
                ]), LOCK_EX);

                $this->logger->error("IP bloklandı — çok fazla başarısız login", [
                    'ip' => $ip,
                    'total_failed' => $totalFailed,
                    'block_minutes' => $this->blockDurationSeconds / 60,
                ]);

                return $this->jsonResponse(429, [
                    'type' => 'IP_BLOCKED',
                    'description' => "Çok fazla başarısız deneme. IP adresiniz " . ($this->blockDurationSeconds / 60) . " dakika bloklandı.",
                    'retry_after' => $this->blockDurationSeconds,
                ]);
            }

            $this->logger->warning("Rate limit aşıldı", ['ip' => $ip, 'window_count' => $data['window_count']]);

            return $this->jsonResponse(429, [
                'type' => 'TOO_MANY_REQUESTS',
                'description' => 'Çok fazla deneme yaptınız. Lütfen bir dakika bekleyin.',
                'retry_after' => $this->windowSeconds,
            ]);
        }

        // Deneme sayısını artır
        $this->increment($file, $data);

        return $handler->handle($request);
    }

    private function getClientIp(Request $request): string
    {
        $forwarded = $request->getHeaderLine('X-Forwarded-For');
        if ($forwarded !== '') {
            $ips = explode(',', $forwarded);
            return trim($ips[0]);
        }

        $params = $request->getServerParams();
        return (string) ($params['REMOTE_ADDR'] ?? '127.0.0.1');
    }

    /**
     * @return array{window_count: int, window_start: int, total_failed: int}
     */
    private function getData(string $file): array
    {
        $default = ['window_count' => 0, 'window_start' => time(), 'total_failed' => 0];

        if (!file_exists($file)) {
            return $default;
        }

        $raw = json_decode((string) file_get_contents($file), true);
        if (!is_array($raw)) {
            return $default;
        }

        // Pencere süresi dolmuşsa window sayacını sıfırla (ama total_failed kalır)
        if (($raw['window_start'] ?? 0) < time() - $this->windowSeconds) {
            return [
                'window_count' => 0,
                'window_start' => time(),
                'total_failed' => (int) ($raw['total_failed'] ?? 0),
            ];
        }

        return [
            'window_count' => (int) ($raw['window_count'] ?? 0),
            'window_start' => (int) ($raw['window_start'] ?? time()),
            'total_failed' => (int) ($raw['total_failed'] ?? 0),
        ];
    }

    private function increment(string $file, array $data): void
    {
        $data['window_count']++;
        $data['total_failed']++;

        if ($data['window_start'] === 0) {
            $data['window_start'] = time();
        }

        file_put_contents($file, json_encode($data), LOCK_EX);
    }

    private function jsonResponse(int $status, array $error): Response
    {
        $response = new SlimResponse();
        $payload = json_encode([
            'statusCode' => $status,
            'error' => $error,
        ], JSON_UNESCAPED_UNICODE);

        $response->getBody()->write($payload ?: '{}');

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withHeader('Retry-After', (string) ($error['retry_after'] ?? $this->windowSeconds))
            ->withStatus($status);
    }
}
