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
            // HTTPS kontrolü
            $isSecure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on';

            // Cookie ayarları
            session_set_cookie_params([
                'lifetime' => 3600, // 1 saat
                'path' => '/',
                'domain' => '',
                'secure' => $isSecure, // Sadece HTTPS ise true
                'httponly' => true, // XSS koruması
                'samesite' => 'None' // CSRF koruması
            ]);
            session_start();
        }

        $session = $_SESSION ?? [];
        $request = $request->withAttribute('session', $session);

        // 2. OPTIONS İsteklerini Geçir (CORS Preflight)
        if ($request->getMethod() === 'OPTIONS') {
            return $handler->handle($request);
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
            throw new HttpUnauthorizedException($request, "Oturum açmanız gerekiyor.");
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
            throw new HttpUnauthorizedException($request, "Geçersiz oturum. Lütfen tekrar giriş yapın.");
        }


        // 6. User Bilgisini Request Attribute Olarak Ekle
        // Controller'larda $request->getAttribute('user') ile erişilebilir
        $request = $request->withAttribute('user', $session['user']);

        return $handler->handle($request);
    }
}