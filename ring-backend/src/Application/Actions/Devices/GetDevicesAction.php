<?php
declare(strict_types=1);

namespace App\Application\Actions\Devices;

use App\Application\Actions\Action;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use PDO;

final class GetDevicesAction extends Action
{
    public function __construct(private PDO $pdo, LoggerInterface $logger)
    {
        parent::__construct($logger);
    }

    protected function action(): Response
    {
        $stmt = $this->pdo->query("
    SELECT d.deviceID AS id, d.displayName, d.notes, d.description
        FROM devicelist dl, device d
        WHERE d.deviceID = dl.deviceID
        AND dl.groupID = 'test'
        AND d.displayName <> d.deviceID
         ORDER BY displayName
    ");


        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Eski kodun customName ekleme mantığı
        foreach ($rows as &$row) {
            $arr = explode(' ', $row['description']);
            $row['customName'] = $arr[count($arr) - 1] ?? '';
            // Not: str_replace eski kodda parametreler karışmıştı, burda mantıklı şekilde düzeltiyoruz
            $row['notes'] = str_replace('�', 'i', $row['notes']);
        }

        return $this->respondWithData($rows);
    }

}
