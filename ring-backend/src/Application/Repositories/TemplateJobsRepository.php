<?php
declare(strict_types=1);

namespace App\Application\Repositories;

use PDO;
use PDOException;

final class TemplateJobsRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    /**
     * $rows => her eleman şu alanları içerir:
     * template_id, duetime, type_id, deviceid, first_stop, last_stop, status
     */
    public function insertMany(array $rows): array
    {
        if (empty($rows)) {
            return ['insertedCount' => 0];
        }

        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO template_jobs
                    (template_id, duetime, type_id, deviceid, route_id, first_stop, last_stop, status)
                VALUES
                    (:template_id, :duetime, :type_id, :deviceid, :route_id, :first_stop, :last_stop, :status)
            ");

            $count = 0;
            foreach ($rows as $r) {
                $stmt->execute([
                    ':template_id' => (int) $r['template_id'],
                    ':duetime' => (int) $r['duetime'],
                    ':type_id' => (int) $r['type_id'],
                    ':deviceid' => (int) $r['deviceid'],
                    ':route_id' => isset($r['route_id']) ? (int) $r['route_id'] : null,
                    ':first_stop' => (string) $r['first_stop'],
                    ':last_stop' => (string) $r['last_stop'],
                    ':status' => (int) $r['status'],
                ]);
                $count++;
            }

            $this->pdo->commit();
            return ['insertedCount' => $count];
        } catch (PDOException $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            throw $e;
        }
    }
    /**
     * Bir şablona ait tüm satırları getirir.
     *
     * @return array<int, array<string,mixed>>
     */
    public function getByTemplateId(int $templateId): array
    {
        $sql = "SELECT id, template_id, duetime, type_id, deviceid, route_id, first_stop, last_stop, status
                FROM template_jobs
                WHERE template_id = :tid AND is_deleted = 0
                ORDER BY duetime ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':tid' => $templateId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}
