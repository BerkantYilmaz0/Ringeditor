<?php

declare(strict_types=1);

namespace App\Application\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface as Middleware;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Exception\HttpUnauthorizedException;
use Slim\Routing\RouteContext;

final class JwtAuthMiddleware implements Middleware
{
    public function process(Request $request, RequestHandler $handler): Response
    {
        // OPTIONS her zaman serbest (CORS preflight)
        if ($request->getMethod() === 'OPTIONS') {
            return $handler->handle($request);
        }

        // Route bulunamazsa geç (404 vs)
        $routeContext = RouteContext::fromRequest($request);
        $route = $routeContext->getRoute();
        if (!$route) {
            return $handler->handle($request);
        }

        $pattern = $route->getPattern();

        // Public route'lar
        $publicRoutes = [
            '/login',
            '/',
            '/docs',
            '/db-test',
        ];

        if (in_array($pattern, $publicRoutes, true)) {
            return $handler->handle($request);
        }

        // Bearer token zorunlu
        $auth = $request->getHeaderLine('Authorization');
        if (!preg_match('/Bearer\s+(.*)$/i', $auth, $m)) {
            throw new HttpUnauthorizedException($request, 'Oturum açmanız gerekiyor.');
        }

        try {
            $decoded = JWT::decode($m[1], new Key($_ENV['JWT_SECRET'], 'HS256'));
        } catch (\Throwable $e) {
            throw new HttpUnauthorizedException($request, 'Geçersiz token.');
        }

        // user bilgisini request'e ekle
        $request = $request->withAttribute('user', (array)$decoded);

        return $handler->handle($request);
    }
}
