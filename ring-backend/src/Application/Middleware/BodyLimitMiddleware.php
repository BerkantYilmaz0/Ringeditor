<?php

declare(strict_types=1);

namespace App\Application\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response as SlimResponse;

/**
 * Request body boyut limiti.
 * JSON API olduğu için htmlspecialchars uygulanmaz — XSS zaten vektör değil.
 * SQL injection koruması prepared statements ile sağlanıyor.
 */
final class BodyLimitMiddleware implements MiddlewareInterface
{
    private int $maxBodySizeBytes;

    /**
     * @param int $maxBodySizeBytes Max body boyutu (varsayılan 1MB)
     */
    public function __construct(int $maxBodySizeBytes = 1_048_576)
    {
        $this->maxBodySizeBytes = $maxBodySizeBytes;
    }

    public function process(Request $request, RequestHandler $handler): Response
    {
        $method = $request->getMethod();

        if (in_array($method, ['POST', 'PUT', 'PATCH'], true)) {
            $contentLength = (int) $request->getHeaderLine('Content-Length');
            $bodySize = $request->getBody()->getSize();
            $size = max($contentLength, $bodySize ?? 0);

            if ($size > $this->maxBodySizeBytes) {
                $response = new SlimResponse();
                $sizeMB = round($this->maxBodySizeBytes / 1_048_576, 1);
                $payload = json_encode([
                    'statusCode' => 413,
                    'error' => [
                        'type' => 'PAYLOAD_TOO_LARGE',
                        'description' => "İstek gövdesi çok büyük. Maksimum {$sizeMB} MB izin veriliyor."
                    ]
                ], JSON_UNESCAPED_UNICODE);

                $response->getBody()->write($payload ?: '{}');
                return $response
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(413);
            }
        }

        return $handler->handle($request);
    }
}
