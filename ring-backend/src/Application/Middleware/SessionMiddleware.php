<?php

declare(strict_types=1);

namespace App\Application\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface as Middleware;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

use Slim\Exception\HttpUnauthorizedException;
use Slim\Routing\RouteContext;

class SessionMiddleware implements Middleware
{
    /**
     * {@inheritdoc}
     */
    public function process(Request $request, RequestHandler $handler): Response
    {
        // 1. Session Başlatma
        if (session_status() !== PHP_SESSION_ACTIVE) {
            // HTTPS kontrolü (Load Balancer arkasında)
            $isSecure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on';
            if (!$isSecure && isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
                $isSecure = true;
            }

            // Cookie ayarları
            session_set_cookie_params([
                'lifetime' => 3600, // 1 saat
                'path' => '/',
                'domain' => '',
                'secure' => $isSecure,
                'httponly' => true,
                'samesite' => $isSecure ? 'None' : 'Lax' // Cross-site (Vercel->Railway) icin None sart
            ]);
            session_start();
        }

        $session = $_SESSION ?? [];
        $request = $request->withAttribute('session', $session);

        // 2. OPTIONS İsteklerini Geçir (CORS Preflight) - Check and return 200 OK immediately
        if ($request->getMethod() === 'OPTIONS') {
            return new \Slim\Psr7\Response();
        }

        // 3. Route Whitelist Kontrolü (Login ve Public endpointler)
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
            '/docs'
        ];

        // Public prefix'ler
        $publicPrefixes = [
            '/api/public'
            // '/device' kaldirildi: Guvenlik analizi istegi uzerine
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

        // 4. Authentication Kontrolü
        // LoginAction'da $_SESSION['user'] set ediyoruz.
        if (empty($session['user'])) {
            // Exception uzantisini degistirdik: Throw yerine Response donuyoruz ki CORS middleware calissin.
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Unauthorized', 'message' => 'Oturum acmaniz gerekiyor.']));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401);
        }

        // 5. Session Hijacking Koruması (Opsiyonel - Production için önerilir)
        // Uncomment etmek için aşağıdaki satırların başındaki // işaretini kaldırın

        $currentFingerprint = md5(
            ($request->getServerParams()['REMOTE_ADDR'] ?? '') .
            ($request->getHeaderLine('User-Agent') ?? '')
        );

        if (!isset($session['fingerprint'])) {
            $_SESSION['fingerprint'] = $currentFingerprint;
        } elseif ($session['fingerprint'] !== $currentFingerprint) {
            session_destroy();
            $response = new \Slim\Psr7\Response();
            $response->getBody()->write(json_encode(['error' => 'Unauthorized', 'message' => 'Gecersiz oturum.']));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(401);
        }


        // 6. User Bilgisini Request Attribute Olarak Ekle
        // Controller'larda $request->getAttribute('user') ile erişilebilir
        $request = $request->withAttribute('user', $session['user']);

        return $handler->handle($request);
    }
}