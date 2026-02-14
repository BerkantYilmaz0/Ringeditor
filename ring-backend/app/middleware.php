<?php

declare(strict_types=1);

use App\Application\Middleware\SessionMiddleware;
use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;


return function (App $app) {

    $app->addBodyParsingMiddleware();

    // ⭐ CORS MIDDLEWARE ÖNCE ÇALIŞMALI (SessionMiddleware'den önce)
    $app->add(function (Request $request, RequestHandler $handler) {
        $origin = $request->getHeaderLine('Origin');
        $allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://planner.ring.com',
            'https://ring-editor.vercel.app'
        ];

        // ⭐ PREFLIGHT (OPTIONS) İsteğini hemen ele al
        if ($request->getMethod() === 'OPTIONS') {
            $response = new Response();

            if (in_array($origin, $allowedOrigins, true)) {
                $response = $response
                    ->withHeader('Access-Control-Allow-Origin', $origin)
                    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                    ->withHeader('Access-Control-Allow-Credentials', 'true')
                    ->withHeader('Access-Control-Max-Age', '86400');
            }

            return $response->withStatus(200);
        }

        // Normal istekler için handler'a git
        $response = $handler->handle($request);

        // CORS header'larını ekle
        if (in_array($origin, $allowedOrigins, true)) {
            $response = $response
                ->withHeader('Access-Control-Allow-Origin', $origin)
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                ->withHeader('Access-Control-Allow-Credentials', 'true');
        }

        // Guvenlik Basliklari
        $response = $response
            ->withHeader('X-Content-Type-Options', 'nosniff')
            ->withHeader('X-Frame-Options', 'SAMEORIGIN')
            ->withHeader('X-XSS-Protection', '1; mode=block')
            ->withHeader('Content-Security-Policy', "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval';");

        // HTTPS ise HSTS ekle
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
            $response = $response->withHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        return $response;
    });

    // ⭐ SESSION MIDDLEWARE SONRA ÇALIŞMALI
    $app->add(SessionMiddleware::class);
};