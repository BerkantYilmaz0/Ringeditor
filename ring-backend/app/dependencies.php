<?php

declare(strict_types=1);

use App\Application\Settings\SettingsInterface;
use DI\ContainerBuilder;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;
use App\Application\Actions\Templates\{
    CreateTemplateAction,
    UpdateTemplateAction,
    DeleteTemplateAction,
    GetTemplateAction
};

use App\Application\Actions\TemplateJobs\{
    GetTemplateJobsAction,
    CreateTemplateJobsAction,
    UpdateTemplateJobsAction,
    DeleteTemplateJobAction,
    BulkCreateAction,
    ApplyTemplateJobsAction
};

use App\Application\Actions\RingTypes\
{
    GetRingTypesAction,
    CreateRingTypesAction,
    UpdateRingTypesAction,
    DeleteRingTypesAction
};

use App\Application\Repositories\TemplateJobsRepository;

use App\Application\Actions\Devices\GetDevicesAction;

use App\Application\Actions\Jobs\{
    GetJobsAction,
    CreateJobAction,
    UpdateJobAction,
    DeleteJobAction,
    CheckJobConflictAction,
    ApplyTemplateAction
};
use App\Application\Repositories\JobsRepository;
use App\Infrastructure\Persistence\Route\RouteRepository;



return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        LoggerInterface::class => function (ContainerInterface $c) {
            $settings = $c->get(SettingsInterface::class);

            $loggerSettings = $settings->get('logger');
            $logger = new Logger($loggerSettings['name']);

            $processor = new UidProcessor();
            $logger->pushProcessor($processor);

            try {
                $handler = new StreamHandler($loggerSettings['path'], $loggerSettings['level']);
                $logger->pushHandler($handler);
            } catch (\Exception $e) {
                // Fallback to stderr if file is not writable
                $fallbackHandler = new StreamHandler('php://stderr', $loggerSettings['level']);
                $logger->pushHandler($fallbackHandler);
                $logger->error("Failed to open log file: " . $e->getMessage());
            }

            return $logger;
        },

        PDO::class => function () {
            $host = $_ENV['DB_HOST'];
            $db = $_ENV['DB_NAME'];
            $user = $_ENV['DB_USER'];
            $pass = $_ENV['DB_PASS'];
            $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";

            return new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        },


            // Şablonlar için action tanımlamaları
        GetTemplateAction::class => fn($c) => new GetTemplateAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
        CreateTemplateAction::class => fn($c) => new CreateTemplateAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
        UpdateTemplateAction::class => fn($c) => new UpdateTemplateAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
        DeleteTemplateAction::class => fn($c) => new DeleteTemplateAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
            // Şablon jobları için action tanımlamaları
        GetTemplateJobsAction::class => fn($c) => new GetTemplateJobsAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
        CreateTemplateJobsAction::class => fn($c) => new CreateTemplateJobsAction($c->get(PDO::class), $c->get(LoggerInterface::class), $c->get(TemplateJobsRepository::class)),
        UpdateTemplateJobsAction::class => fn($c) => new UpdateTemplateJobsAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
        DeleteTemplateJobAction::class => fn($c) => new DeleteTemplateJobAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
        BulkCreateAction::class => fn($c) => new BulkCreateAction($c->get(PDO::class), $c->get(LoggerInterface::class), $c->get(TemplateJobsRepository::class)),
        ApplyTemplateJobsAction::class => fn($c) => new ApplyTemplateJobsAction($c->get(PDO::class), $c->get(LoggerInterface::class), $c->get(App\Application\Repositories\TemplateJobsRepository::class), $c->get(App\Application\Repositories\JobsRepository::class)),

            // Ring Tipleri için action tanımlaması
        GetRingTypesAction::class => fn($c) => new GetRingTypesAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
        CreateRingTypesAction::class => fn($c) => new CreateRingTypesAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
        UpdateRingTypesAction::class => fn($c) => new UpdateRingTypesAction($c->get(PDO::class), $c->get(LoggerInterface::class)),
        DeleteRingTypesAction::class => fn($c) => new DeleteRingTypesAction($c->get(PDO::class), $c->get(LoggerInterface::class)),

            // Devices için action tanımlaması
        GetDevicesAction::class => fn($c) => new GetDevicesAction($c->get(PDO::class), $c->get(LoggerInterface::class)),

        TemplateJobsRepository::class => function (ContainerInterface $c) {
            return new TemplateJobsRepository($c->get(PDO::class));
        },
            // Jobs Actions
        JobsRepository::class => fn($c) => new JobsRepository($c->get(PDO::class)),
        GetJobsAction::class => fn($c) => new GetJobsAction($c->get(JobsRepository::class), $c->get(LoggerInterface::class)),
        UpdateJobAction::class => fn($c) => new UpdateJobAction($c->get(JobsRepository::class), $c->get(LoggerInterface::class)),
        DeleteJobAction::class => fn($c) => new DeleteJobAction($c->get(JobsRepository::class), $c->get(LoggerInterface::class)),
        CreateJobAction::class => fn($c) => new CreateJobAction($c->get(JobsRepository::class), $c->get(LoggerInterface::class)),
        CheckJobConflictAction::class => fn($c) => new CheckJobConflictAction($c->get(JobsRepository::class), $c->get(TemplateJobsRepository::class), $c->get(LoggerInterface::class)),
        ApplyTemplateAction::class => fn($c) => new ApplyTemplateAction($c->get(JobsRepository::class), $c->get(TemplateJobsRepository::class), $c->get(LoggerInterface::class)),

        // Route Service
        App\Domain\Route\RouteService::class => fn($c) => new App\Domain\Route\RouteService($c->get(PDO::class), $c->get(LoggerInterface::class)),

        RouteRepository::class => function (ContainerInterface $c) {
            return new RouteRepository($c->get(PDO::class));
        },
    ]);
};
