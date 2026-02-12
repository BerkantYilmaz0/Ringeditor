<?php
require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$db = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    echo "Connecting to database...\n";
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Add route_id to template_jobs
    echo "Checking template_jobs table...\n";
    try {
        $pdo->query("SELECT route_id FROM template_jobs LIMIT 1");
        echo "Column 'route_id' already exists in 'template_jobs'.\n";
    } catch (PDOException $e) {
        echo "Adding 'route_id' to 'template_jobs'...\n";
        $pdo->exec("ALTER TABLE template_jobs ADD COLUMN route_id INT NULL DEFAULT NULL AFTER type_id");
        echo "Column added successfully.\n";
    }

    // Add route_id to jobs
    echo "Checking jobs table...\n";
    try {
        $pdo->query("SELECT route_id FROM jobs LIMIT 1");
        echo "Column 'route_id' already exists in 'jobs'.\n";
    } catch (PDOException $e) {
        echo "Adding 'route_id' to 'jobs'...\n";
        $pdo->exec("ALTER TABLE jobs ADD COLUMN route_id INT NULL DEFAULT NULL AFTER type");
        echo "Column added successfully.\n";
    }

    echo "Database update completed.\n";

} catch (\PDOException $e) {
    echo "Database Error: " . $e->getMessage() . "\n";
    exit(1);
}
