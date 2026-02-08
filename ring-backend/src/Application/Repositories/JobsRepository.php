<?php
declare(strict_types=1);

namespace App\Application\Repositories;
use PDO;

final class JobsRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    /**
     * Çakışma kontrolü: aynı device + aynı duetime var mı?
     * $excludeId → update sırasında kendi kaydını hariç tutmak için
     */
    public function hasConflict(int $deviceId, int $duetime, ?int $excludeId = null): bool
    {
        $sql = "SELECT COUNT(*) FROM jobs WHERE deviceid = :deviceid AND duetime = :duetime";
        if ($excludeId !== null) {
            $sql .= " AND id <> :id";
        }

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':deviceid', $deviceId, PDO::PARAM_INT);
        $stmt->bindValue(':duetime', $duetime, PDO::PARAM_INT);
        if ($excludeId !== null) {
            $stmt->bindValue(':id', $excludeId, PDO::PARAM_INT);
        }
        $stmt->execute();

        return (bool) $stmt->fetchColumn();
    }

    /**
     * Job ekleme (tekli)
     */
    public function insert(array $data): int
    {
        // Transaction başlat - race condition önlemi
        $this->pdo->beginTransaction();

        try {
            // SELECT FOR UPDATE ile kilitle - race condition önlemi
            $stmt = $this->pdo->prepare("
                SELECT id FROM jobs 
                WHERE deviceid = :deviceid AND duetime = :duetime
                FOR UPDATE
            ");
            $stmt->execute([
                ':deviceid' => (int) $data['deviceid'],
                ':duetime' => (int) $data['duetime']
            ]);

            if ($stmt->fetch()) {
                $this->pdo->rollBack();
                throw new \RuntimeException("Bu plaka belirtilen saatte zaten görevli.");
            }

            $stmt = $this->pdo->prepare("
                INSERT INTO jobs (deviceid, duetime, type, first_stop, last_stop, status)
                VALUES (:deviceid, :duetime, :type, :first_stop, :last_stop, :status)
            ");

            $stmt->execute([
                ':deviceid' => (int) $data['deviceid'],
                ':duetime' => (int) $data['duetime'],
                ':type' => (int) $data['type'],
                ':first_stop' => !empty($data['first_stop']) ? $data['first_stop'] : null,
                ':last_stop' => !empty($data['last_stop']) ? $data['last_stop'] : null,
                ':status' => $data['status'] ?? 1,
            ]);

            $insertId = (int) $this->pdo->lastInsertId();
            $this->pdo->commit();

            return $insertId;

        } catch (\PDOException $e) {
            $this->pdo->rollBack();
            if ($e->getCode() === '23000') {
                throw new \RuntimeException("Bu plaka belirtilen saatte zaten görevli (DB).");
            }
            throw $e;
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Toplu çakışma kontrolü - Tek sorguda tüm çakışmaları kontrol eder
     */
    private function checkBulkConflicts(array $rows): array
    {
        if (empty($rows)) {
            return [];
        }

        $conditions = [];
        $params = [];

        foreach ($rows as $idx => $r) {
            $conditions[] = "(deviceid = :deviceid_{$idx} AND duetime = :duetime_{$idx})";
            $params[":deviceid_{$idx}"] = (int) $r['deviceid'];
            $params[":duetime_{$idx}"] = (int) $r['duetime'];
        }

        $sql = "SELECT deviceid, duetime FROM jobs WHERE " . implode(' OR ', $conditions) . " FOR UPDATE";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Toplu job ekleme - ÇOK DAHA HIZLI VERSİYON
     */
    public function insertMany(array $rows): array
    {
        if (empty($rows)) {
            return ['insertedCount' => 0, 'duplicates' => [], 'total' => 0];
        }

        $this->pdo->beginTransaction();
        try {
            // 1) Tüm çakışmaları tek sorguda kontrol et (N sorgu yerine 1 sorgu)
            $conflicts = $this->checkBulkConflicts($rows);

            if (!empty($conflicts)) {
                $this->pdo->rollBack();

                $conflictList = array_map(function ($c) {
                    return "Device: {$c['deviceid']}, Time: " . date('Y-m-d H:i', $c['duetime']);
                }, $conflicts);

                throw new \RuntimeException(
                    "Çakışmalar bulundu:\n" . implode("\n", $conflictList)
                );
            }

            // 2) Toplu INSERT - Tek sorguda tüm kayıtlar (N sorgu yerine 1 sorgu)
            $placeholders = [];
            $params = [];

            foreach ($rows as $idx => $r) {
                $placeholders[] = "(:deviceid_{$idx}, :duetime_{$idx}, :type_{$idx}, :first_stop_{$idx}, :last_stop_{$idx}, :status_{$idx})";

                $params[":deviceid_{$idx}"] = (int) $r['deviceid'];
                $params[":duetime_{$idx}"] = (int) $r['duetime'];
                $params[":type_{$idx}"] = (int) $r['type'];
                $params[":first_stop_{$idx}"] = !empty($r['first_stop']) ? $r['first_stop'] : null;
                $params[":last_stop_{$idx}"] = !empty($r['last_stop']) ? $r['last_stop'] : null;
                $params[":status_{$idx}"] = $r['status'] ?? 1;
            }

            $sql = "
                INSERT INTO jobs (deviceid, duetime, type, first_stop, last_stop, status)
                VALUES " . implode(', ', $placeholders);

            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);

            $this->pdo->commit();

            return [
                'insertedCount' => count($rows),
                'duplicates' => [],
                'total' => count($rows)
            ];

        } catch (\PDOException $e) {
            $this->pdo->rollBack();
            if ($e->getCode() === '23000') {
                throw new \RuntimeException("Toplu eklemede duplicate hata: Aynı plaka ve saatte tekrar ekleme yapılamaz.");
            }
            throw $e;
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Job güncelleme
     */
    public function update(int $id, array $data): void
    {
        // Transaction başlat - race condition önlemi
        $this->pdo->beginTransaction();

        try {
            // Çakışma kontrolü (kendi kaydı hariç) + kilitleme
            $stmt = $this->pdo->prepare("
                SELECT id FROM jobs 
                WHERE deviceid = :deviceid 
                  AND duetime = :duetime 
                  AND id <> :id
                FOR UPDATE
            ");
            $stmt->execute([
                ':deviceid' => (int) $data['deviceid'],
                ':duetime' => (int) $data['duetime'],
                ':id' => $id
            ]);

            if ($stmt->fetch()) {
                $this->pdo->rollBack();
                throw new \RuntimeException("Bu plaka belirtilen saatte zaten görevli.");
            }

            $stmt = $this->pdo->prepare("
                UPDATE jobs
                SET deviceid = :deviceid,
                    duetime = :duetime,
                    type = :type,
                    first_stop = :first_stop,
                    last_stop = :last_stop,
                    status = :status
                WHERE id = :id
            ");

            $stmt->execute([
                ':id' => $id,
                ':deviceid' => (int) $data['deviceid'],
                ':duetime' => (int) $data['duetime'],
                ':type' => (int) $data['type'],
                ':first_stop' => !empty($data['first_stop']) ? $data['first_stop'] : null,
                ':last_stop' => !empty($data['last_stop']) ? $data['last_stop'] : null,
                ':status' => $data['status'] ?? 1,
            ]);

            $this->pdo->commit();

        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Belirli tarih aralığında job listesi
     */
    public function getBetween(int $from, int $to, ?int $deviceId = null, ?int $type = null): array
    {
        $sql = "
            SELECT 
                j.*,
                d.displayName AS device_plate,
                rt.name AS type_name,
                rt.color AS color,
                rt.default_first_stop,
                rt.default_last_stop
            FROM jobs j
            LEFT JOIN Device d ON d.deviceID = j.deviceid
            LEFT JOIN ring_types rt ON rt.id = j.type
            WHERE j.duetime BETWEEN :from AND :to
        ";

        $params = [
            ':from' => $from,
            ':to' => $to,
        ];

        if ($deviceId !== null) {
            $sql .= " AND j.deviceid = :deviceId";
            $params[':deviceId'] = $deviceId;
        }
        if ($type !== null) {
            $sql .= " AND j.type = :type";
            $params[':type'] = $type;
        }

        $sql .= " ORDER BY j.duetime ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Job silme
     */
    public function deleteById(int $id): int
    {
        $stmt = $this->pdo->prepare("DELETE FROM jobs WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount();
    }

    /**
     * Belirli bir templateId'ye ait template_jobs kayıtlarını getirir
     */
    public function getTemplateJobs(int $templateId): array
    {
        $stmt = $this->pdo->prepare("
            SELECT id, template_id, duetime, type_id, deviceid, first_stop, last_stop
            FROM template_jobs
            WHERE template_id = :templateId
              AND is_deleted = 0
        ");
        $stmt->execute([':templateId' => $templateId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    /**
     * Belirli device + duetime kaydını siler
     */
    public function deleteByDeviceAndTime(int $deviceId, int $duetime): int
    {
        $stmt = $this->pdo->prepare("
            DELETE FROM jobs
            WHERE deviceid = :deviceid
              AND duetime  = :duetime
        ");
        $stmt->execute([
            ':deviceid' => $deviceId,
            ':duetime' => $duetime,
        ]);

        return $stmt->rowCount();
    }
}