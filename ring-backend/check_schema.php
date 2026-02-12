<?php
require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Load .env
try {
    if (file_exists(__DIR__ . '/.env')) {
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        echo "loaded .env\n";
    } else {
        echo ".env not found\n";
    }
} catch (Exception $e) {
    echo "Dotenv error: " . $e->getMessage() . "\n";
}

$host = $_ENV['DB_HOST'] ?? 'localhost';
$db = $_ENV['DB_NAME'] ?? 'aa';
$user = $_ENV['DB_USER'] ?? 'root';
$pass = $_ENV['DB_PASS'] ?? '';

echo "Connecting to $db at $host as $user...\n";
if (empty($pass))
    echo "Using empty password.\n";
else
    echo "Using password (length=" . strlen($pass) . ")\n";


try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    echo "Connected successfully.\n";

    echo "\n--- ROUTES TABLE ---\n";
    try {
        $stmt = $pdo->query("DESCRIBE routes");
        print_r($stmt->fetchAll());
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }

    echo "\n--- JOBS TABLE ---\n";
    try {
        $stmt = $pdo->query("DESCRIBE jobs");
        $cols = $stmt->fetchAll();
        print_r($cols);
        $hasRouteId = false;
        foreach ($cols as $col) {
            if ($col['Field'] === 'route_id')
                $hasRouteId = true;
        }
        echo "jobs table has route_id: " . ($hasRouteId ? "YES" : "NO") . "\n";
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
