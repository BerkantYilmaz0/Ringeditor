<?php

declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
// Şablonlar için route işlemleri
use App\Application\Actions\Templates\GetTemplateAction;
use App\Application\Actions\Templates\CreateTemplateAction;
use App\Application\Actions\Templates\UpdateTemplateAction;
use App\Application\Actions\Templates\DeleteTemplateAction;
// Şablon jobları için route işlemleri
use App\Application\Actions\TemplateJobs\GetTemplateJobsAction;
use App\Application\Actions\TemplateJobs\CreateTemplateJobsAction;
use App\Application\Actions\TemplateJobs\UpdateTemplateJobsAction;
use App\Application\Actions\TemplateJobs\DeleteTemplateJobAction;
use App\Application\Actions\TemplateJobs\ApplyTemplateJobsAction;

//Birden Fazla jobs kaydı eklemek için route işlemi
use App\Application\Actions\TemplateJobs\BulkCreateAction;
//Ring Tipleri için route işlemleri
use App\Application\Actions\RingTypes\GetRingTypesAction;
use App\Application\Actions\RingTypes\CreateRingTypesAction;
use App\Application\Actions\RingTypes\UpdateRingTypesAction;
use App\Application\Actions\RingTypes\DeleteRingTypesAction;
//Devices için route işlemleri
use App\Application\Actions\Devices\GetDevicesAction;
// Ring Durakları
use App\Application\Actions\RingStops\ListRingStopsAction;
use App\Application\Actions\RingStops\CreateRingStopAction;
use App\Application\Actions\RingStops\UpdateRingStopAction;
use App\Application\Actions\RingStops\DeleteRingStopAction;
use App\Application\Actions\RingStops\ReorderRingStopsAction;

// Duraklar
use App\Application\Actions\Stops\ListStopsAction;
use App\Application\Actions\Stops\CreateStopAction;
use App\Application\Actions\Stops\UpdateStopAction;
use App\Application\Actions\Stops\DeleteStopAction;

use App\Application\Actions\Routes\ListRoutesAction;
use App\Application\Actions\Routes\CreateRouteAction;
use App\Application\Actions\Routes\UpdateRouteAction;
use App\Application\Actions\Routes\DeleteRouteAction;

use App\Application\Actions\Jobs\{
    GetJobsAction,
    CreateJobAction,
    UpdateJobAction,
    DeleteJobAction,
    CheckJobConflictAction,
    ApplyTemplateAction
};
use App\Application\Actions\Auth\LoginAction;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->post('/login', LoginAction::class);

    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });
    $app->get('/db-test', function (Request $request, Response $response, array $args) use ($app) {
        $container = $app->getContainer();
        if ($container === null) {
            throw new InvalidArgumentException('Container not available');
        }

        /** @var PDO $pdo */
        $pdo = $container->get(\PDO::class);

        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt !== false ? $stmt->fetchAll(\PDO::FETCH_ASSOC) : [];

        $json = json_encode($tables);
        $response->getBody()->write($json === false ? '[]' : $json);
        return $response->withHeader('Content-Type', 'application/json');

    });

    //Templates Yönlendirme işlemleri
    $app->group('/templates', function (Group $g) {
        $g->get('', GetTemplateAction::class);
        $g->post('', CreateTemplateAction::class);
        $g->put('/{id}', UpdateTemplateAction::class);
        $g->delete('/{id}', DeleteTemplateAction::class);
    });
    // Template Jobs
    $app->group('/template-jobs', function (Group $g) {
        $g->get('/{templateId}', GetTemplateJobsAction::class);
        $g->post('', CreateTemplateJobsAction::class);
        $g->put('/{jobId}', UpdateTemplateJobsAction::class);
        $g->delete('/{jobId}', DeleteTemplateJobAction::class);
        $g->post('/apply', ApplyTemplateJobsAction::class);

    });
    $app->post('/template-jobs/bulk', BulkCreateAction::class);
    //Ring Tipleri
    $app->group('/ring-types', function (Group $g) {
        $g->get('', GetRingTypesAction::class);
        $g->post('', CreateRingTypesAction::class);
        $g->put('/{id}', UpdateRingTypesAction::class);
        $g->delete('/{id}', DeleteRingTypesAction::class);
    });
    //Devices
    $app->get('/device', GetDevicesAction::class);

    // Ring Stops (Pivot)
    $app->group('/ring-stops', function (Group $g) {
        $g->get('/{id}', ListRingStopsAction::class); // {id} = ringTypeId
        $g->post('', CreateRingStopAction::class);
        $g->post('/reorder', ReorderRingStopsAction::class);
        $g->put('/{id}', UpdateRingStopAction::class);
        $g->delete('/{id}', DeleteRingStopAction::class);
    });

    // Universal Stops
    $app->group('/stops', function (Group $g) {
        $g->get('', ListStopsAction::class);
        $g->post('', CreateStopAction::class);
        $g->put('/{id}', UpdateStopAction::class);
        $g->delete('/{id}', DeleteStopAction::class);
    });

    // Routes
    $app->group('/routes', function (Group $g) {
        $g->get('', ListRoutesAction::class);
        $g->post('', CreateRouteAction::class);
        $g->put('/{id}', UpdateRouteAction::class);
        $g->delete('/{id}', DeleteRouteAction::class);
    });

    // Dashboard
    $app->get('/dashboard/stats', \App\Application\Actions\Dashboard\GetDashboardStatsAction::class);

    // Jobs
    $app->group('/jobs', function (Group $g) {
        $g->get('', GetJobsAction::class);
        $g->post('', CreateJobAction::class);
        $g->put('/{id}', UpdateJobAction::class);
        $g->delete('/{id}', DeleteJobAction::class);
        $g->post('/apply-template', ApplyTemplateAction::class);
    });
    $app->post('/jobs/check-conflict', CheckJobConflictAction::class);
};
