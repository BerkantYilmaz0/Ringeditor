<?php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

$container = new \DI\Container();
$settings = require __DIR__ . '/../app/settings.php';
$settings($container);

$dbSettings = $container->get('settings')['db'];
$dsn = "sqlite:" . $dbSettings['database'];

try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Veritabani baglantisi basarili.\n";

    // Ring Types Table - Adding route_data column
    $pdo->exec("CREATE TABLE IF NOT EXISTS ring_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type_id INTEGER DEFAULT 0,
        color TEXT DEFAULT '#000000',
        route_data TEXT DEFAULT NULL
    )");

    try {
        $pdo->exec("ALTER TABLE ring_types ADD COLUMN route_data TEXT DEFAULT NULL");
        echo "route_data kolonu eklendi.\n";
    } catch (PDOException $e) {
        // Column likely exists
    }

    echo "Semalar guncellendi.\n";

} catch (PDOException $e) {
    die("Veritabani hatasi: " . $e->getMessage() . "\n");
}
