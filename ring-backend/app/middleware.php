<?php

declare(strict_types=1);

use App\Application\Middleware\SessionMiddleware;
use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;

return function (App $app) {

    $app->addBodyParsingMiddleware();

    $app->add(function (Request $request, RequestHandler $handler) {

        $origin = $request->getHeaderLine('Origin');

        $allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://ring-editor.up.railway.app',
        ];

        $isAllowed = $origin !== '' && in_array($origin, $allowedOrigins, true);

        // Preflight (OPTIONS)
        if ($request->getMethod() === 'OPTIONS') {
            $response = new Response();

            if ($isAllowed) {
                $response = $response
                    ->withHeader('Access-Control-Allow-Origin', $origin)
                    ->withHeader('Vary', 'Origin')
                    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                    ->withHeader('Access-Control-Allow-Credentials', 'true')
                    ->withHeader('Access-Control-Max-Age', '86400');
            }

            return $response->withStatus(200);
        }

        // Normal istekler
        $response = $handler->handle($request);

        if ($isAllowed) {
            $response = $response
                ->withHeader('Access-Control-Allow-Origin', $origin)
                ->withHeader('Vary', 'Origin')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
                ->withHeader('Access-Control-Allow-Credentials', 'true');
        }

        // Güvenlik başlıkları (istersen sonra sadeleştiririz)
        $response = $response
            ->withHeader('X-Content-Type-Options', 'nosniff')
            ->withHeader('X-Frame-Options', 'SAMEORIGIN')
            ->withHeader('X-XSS-Protection', '1; mode=block')
            ->withHeader('Content-Security-Policy', "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval';");

        return $response;
    });

    $app->add(SessionMiddleware::class);
};
