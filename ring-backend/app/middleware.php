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
        if (empty($origin)) {
            $origin = '*';
        }

        // Handle preflight OPTIONS request
        if ($request->getMethod() === 'OPTIONS') {
            $response = new Response();
        } else {
            $response = $handler->handle($request);
        }

        return $response
            ->withHeader('Access-Control-Allow-Origin', $origin)
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
    });
};
