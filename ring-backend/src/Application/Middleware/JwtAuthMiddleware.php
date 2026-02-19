<?php

declare(strict_types=1);

namespace App\Application\Middleware;

use App\Application\Services\JwtService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface as Middleware;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Exception\HttpUnauthorizedException;
use Slim\Routing\RouteContext;

class JwtAuthMiddleware implements Middleware
{
    public function __construct(private JwtService $jwtService)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function process(Request $request, RequestHandler $handler): Response
    {
        // 1. OPTIONS İsteklerini Geçir (CORS Preflight)
        if ($request->getMethod() === 'OPTIONS') {
            return $handler->handle($request);
        }

        // 2. Route Whitelist Kontrolü (Login ve Public endpointler)
        $routeContext = RouteContext::fromRequest($request);
        $route = $routeContext->getRoute();

        // Eğer route henüz eşleşmediyse (404 vb) geç
        if (!$route) {
            return $handler->handle($request);
        }

        $pattern = $route->getPattern();

        // Public route'lar (tam eşleşme)
        $publicRoutes = [
            '/login',
            '/logout',
            '/',
            '/docs',
            '/db-test'
        ];

        // Public prefix'ler
        $publicPrefixes = [
            '/api/public'
        ];

        // Tam eşleşme kontrolü
        if (in_array($pattern, $publicRoutes, true)) {
            return $handler->handle($request);
        }

        // Prefix kontrolü
        foreach ($publicPrefixes as $prefix) {
            if (str_starts_with($pattern, $prefix)) {
                return $handler->handle($request);
            }
        }

        // 3. JWT Token Doğrulama
        $authHeader = $request->getHeaderLine('Authorization');

        if (empty($authHeader)) {
            throw new HttpUnauthorizedException($request, "Oturum açmanız gerekiyor.");
        }

        // "Bearer <token>" formatını kontrol et
        if (!preg_match('/^Bearer\s+(.+)$/i', $authHeader, $matches)) {
            throw new HttpUnauthorizedException($request, "Geçersiz Authorization header formatı.");
        }

        $token = $matches[1];

        try {
            $userData = $this->jwtService->validateToken($token);
        } catch (\RuntimeException $e) {
            throw new HttpUnauthorizedException($request, $e->getMessage());
        }

        // 4. User Bilgisini Request Attribute Olarak Ekle
        // Controller'larda $request->getAttribute('user') ile erişilebilir
        $request = $request->withAttribute('user', $userData);

        return $handler->handle($request);
    }
}
