<?php

declare(strict_types=1);

namespace App\Application\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Log\LoggerInterface;

/**
 * Her isteğe benzersiz bir Request-ID atar.
 * Hata takibi ve loglama için kullanılır.
 * Response header'ına da eklenir — frontend/debug tarafında izlenebilir.
 */
final class RequestIdMiddleware implements MiddlewareInterface
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function process(Request $request, RequestHandler $handler): Response
    {
        // Gelen request'te varsa onu kullan (proxy zinciri), yoksa üret
        $requestId = $request->getHeaderLine('X-Request-ID');
        if ($requestId === '') {
            $requestId = $this->generateId();
        }

        // Request attribute olarak ekle (action'larda erişilebilir)
        $request = $request->withAttribute('request_id', $requestId);

        // İsteği logla
        $method = $request->getMethod();
        $path = $request->getUri()->getPath();
        $ip = $this->getClientIp($request);

        $this->logger->info("→ {$method} {$path}", [
            'request_id' => $requestId,
            'ip' => $ip,
        ]);

        // İşle
        $response = $handler->handle($request);

        // Response'a da ekle
        $statusCode = $response->getStatusCode();
        $this->logger->info("← {$statusCode} {$method} {$path}", [
            'request_id' => $requestId,
        ]);

        return $response->withHeader('X-Request-ID', $requestId);
    }

    private function generateId(): string
    {
        return bin2hex(random_bytes(8)); // 16 karakter hex
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
}
