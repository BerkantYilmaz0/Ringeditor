<?php
declare(strict_types=1);

namespace App\Application\Actions\Jobs;

use App\Application\Repositories\JobsRepository;
use Psr\Log\LoggerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class GetJobsAction
{
    public function __construct(
        private JobsRepository $repo,
        private LoggerInterface $logger,
    ) {
    }

    public function __invoke(Request $request, Response $response, array $args): Response
    {
        $q = $request->getQueryParams();
        $from = $q['from'] ?? null;
        $to = $q['to'] ?? null;

        if (!$from || !$to) {
            $response->getBody()->write(json_encode([
                'error' => 'Missing required query params: from, to'
            ], JSON_UNESCAPED_UNICODE));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $fromEpoch = $this->toEpoch($from);
        $toEpoch = $this->toEpoch($to);
        if ($fromEpoch === null || $toEpoch === null) {
            $response->getBody()->write(json_encode([
                'error' => 'Invalid date format. Use ISO 8601 or epoch seconds.'
            ], JSON_UNESCAPED_UNICODE));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $deviceId = isset($q['deviceId']) ? (int) $q['deviceId'] : null;
        $type = isset($q['type']) ? (int) $q['type'] : null;

        try {
            $items = $this->repo->getBetween($fromEpoch, $toEpoch, $deviceId, $type);
        } catch (\Throwable $e) {
            $response->getBody()->write(json_encode([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], JSON_UNESCAPED_UNICODE));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode([
            'items' => $items,
            'meta' => [
                'from' => $from,
                'to' => $to,
                'deviceId' => $deviceId,
                'type' => $type,
            ]
        ], JSON_UNESCAPED_UNICODE));

        return $response->withHeader('Content-Type', 'application/json');
    }

    private function toEpoch(string|int $v): ?int
    {
        if (is_numeric($v)) {
            $n = (int) $v;
            return $n > 2_000_000_000_000 ? intdiv($n, 1000) : $n;
        }
        try {
            $dt = new \DateTimeImmutable($v);
            return $dt->getTimestamp();
        } catch (\Throwable) {
            return null;
        }
    }
}
