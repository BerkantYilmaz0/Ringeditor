<?php

declare(strict_types=1);

use App\Application\Middleware\SessionMiddleware;
use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;


return function (App $app) {

    $app->addBodyParsingMiddleware();
    $app->add(SessionMiddleware::class);

    $app->add(function (Request $request, RequestHandler $handler) {
        $origin = $request->getHeaderLine('Origin');
        $allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://planner.ring.com' // Ornek production domain
        ];

        // Eger origin allowed listesindiyse veya gelistirme ortamindaysak (dikkatli kullanilmali)
        // Simdilik genis izin veriyoruz ama kontrollu:
        // $isAllowed = in_array($origin, $allowedOrigins);
        // Pratiklik icin: Eger origin varsa ona izin ver, yoksa * (fakat credentials ile * olmaz)

        $response = $handler->handle($request);

        if (!empty($origin)) {
            return $response
                ->withHeader('Access-Control-Allow-Origin', $origin)
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                ->withHeader('Access-Control-Allow-Credentials', 'true');
        }

        // Fallback for non-browser or no-origin requests

        // Guvenlik Basliklari (Security Headers)
        $response = $response
            ->withHeader('X-Content-Type-Options', 'nosniff')
            ->withHeader('X-Frame-Options', 'SAMEORIGIN')
            ->withHeader('X-XSS-Protection', '1; mode=block')
            // CSP: Simdilik report-only veya genis izinli basliyoruz, MapLibre ivin worker/blob/style izinleri gerekebilir
            ->withHeader('Content-Security-Policy', "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval';");

        // HTTPS ise HSTS ekle
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
            $response = $response->withHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        return $response;
    });
};
