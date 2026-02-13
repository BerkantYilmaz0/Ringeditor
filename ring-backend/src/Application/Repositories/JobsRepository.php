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
                INSERT INTO jobs (deviceid, duetime, type, route_id, status)
                VALUES (:deviceid, :duetime, :type, :route_id, :status)
            ");

            $stmt->execute([
                ':deviceid' => (int) $data['deviceid'],
                ':duetime' => (int) $data['duetime'],
                ':type' => (int) $data['type'],
                ':route_id' => isset($data['route_id']) ? (int) $data['route_id'] : null,
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

        // 0) Şablon içi duplicate'leri temizle (aynı deviceid+duetime)
        $uniqueRows = [];
        $seen = [];
        $internalDuplicates = [];

        foreach ($rows as $r) {
            $key = $r['deviceid'] . '_' . $r['duetime'];
            if (!isset($seen[$key])) {
                $uniqueRows[] = $r;
                $seen[$key] = true;
            } else {
                $internalDuplicates[] = "Device: {$r['deviceid']}, Time: " . date('Y-m-d H:i', $r['duetime']);
            }
        }

        // Eğer şablon içinde duplicate varsa, bilgilendirici mesaj ile devam et
        $warningMessage = '';
        if (!empty($internalDuplicates)) {
            $warningMessage = "Not: Şablonda " . count($internalDuplicates) . " adet tekrarlayan kayıt atlandı.";
        }

        $this->pdo->beginTransaction();
        try {
            // 1) Tüm çakışmaları tek sorguda kontrol et (N sorgu yerine 1 sorgu)
            $conflicts = $this->checkBulkConflicts($uniqueRows);

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

            foreach ($uniqueRows as $idx => $r) {
                $placeholders[] = "(:deviceid_{$idx}, :duetime_{$idx}, :type_{$idx}, :route_id_{$idx}, :status_{$idx})";

                $params[":deviceid_{$idx}"] = (int) $r['deviceid'];
                $params[":duetime_{$idx}"] = (int) $r['duetime'];
                $params[":type_{$idx}"] = (int) $r['type'];
                $params[":route_id_{$idx}"] = isset($r['route_id']) ? (int) $r['route_id'] : null;
                $params[":status_{$idx}"] = $r['status'] ?? 1;
            }

            $sql = "
                INSERT INTO jobs (deviceid, duetime, type, route_id, status)
                VALUES " . implode(', ', $placeholders);

            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);

            $this->pdo->commit();

            return [
                'insertedCount' => count($uniqueRows),
                'duplicates' => $internalDuplicates,
                'total' => count($rows),
                'warning' => $warningMessage
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
                    route_id = :route_id,
                    status = :status
                WHERE id = :id
            ");

            $stmt->execute([
                ':id' => $id,
                ':deviceid' => (int) $data['deviceid'],
                ':duetime' => (int) $data['duetime'],
                ':type' => (int) $data['type'],
                ':route_id' => isset($data['route_id']) ? (int) $data['route_id'] : null,
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
                r.name AS route_name,
                r.id AS route_id
            FROM jobs j
            LEFT JOIN device d ON d.deviceID = j.deviceid
            LEFT JOIN ring_types rt ON rt.id = j.type
            LEFT JOIN routes r ON r.id = j.route_id
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
            SELECT tj.id, tj.template_id, tj.duetime, tj.type_id, tj.deviceid, tj.route_id, r.name as route_name
            FROM template_jobs tj
            LEFT JOIN routes r ON r.id = tj.route_id
            WHERE tj.template_id = :templateId
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
    public function getDashboardStats(): array
    {
        $todayStart = strtotime('today midnight');
        $todayEnd = strtotime('tomorrow midnight') - 1;
        $now = time();

        // 1. Günlük İstatistikler
        $stats = [
            'total' => 0,
            'completed' => 0,
            'remaining' => 0,
            'active_vehicles' => 0,
            'conflict_count' => 0
        ];

        // Bugünün seferleri
        $sql = "SELECT count(*) as total,
                SUM(CASE WHEN duetime < :now THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN duetime >= :now THEN 1 ELSE 0 END) as remaining,
                COUNT(DISTINCT route_id) as active_vehicles
                FROM jobs 
                WHERE duetime BETWEEN :start AND :end";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['start' => $todayStart, 'end' => $todayEnd, 'now' => $now]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $stats['total'] = (int) $row['total'];
            $stats['completed'] = (int) $row['completed'];
            $stats['remaining'] = (int) $row['remaining'];
            $stats['active_vehicles'] = (int) $row['active_vehicles'];
        }

        // 2. Yaklaşan Seferler (Gelecek 2 saat)
        $twoHoursLater = $now + (2 * 3600);
        $sqlUpcoming = "SELECT j.*, r.name as route_name, rt.name as ring_type_name, rt.color as ring_color, d.displayName as device_name
                        FROM jobs j
                        LEFT JOIN routes r ON j.route_id = r.id
                        LEFT JOIN ring_types rt ON j.type = rt.id
                        LEFT JOIN device d ON j.deviceid = d.deviceID
                        WHERE j.duetime BETWEEN :now AND :end
                        ORDER BY j.duetime ASC
                        LIMIT 5";

        $stmtUpcoming = $this->pdo->prepare($sqlUpcoming);
        $stmtUpcoming->execute(['now' => $now, 'end' => $twoHoursLater]);
        $upcomingJobs = $stmtUpcoming->fetchAll(PDO::FETCH_ASSOC);

        // 3. Son İşlemler (Son eklenen 5 sefer)
        $sqlRecent = "SELECT j.*, r.name as route_name
                      FROM jobs j
                      LEFT JOIN routes r ON j.route_id = r.id
                      ORDER BY j.id DESC
                      LIMIT 5";
        $stmtRecent = $this->pdo->query($sqlRecent);
        $recentActivity = $stmtRecent->fetchAll(PDO::FETCH_ASSOC);

        return [
            'stats' => $stats,
            'upcoming' => $upcomingJobs,
            'recent' => $recentActivity,
            'meta' => [
                'timestamp' => $now
            ]
        ];
    }
}