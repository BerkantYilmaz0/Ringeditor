<?php
// Remote Database Setup Helper
// Bu betik, schema.sql dosyasını uzaktaki veritabanına yükler.

echo "--- Ring Planner Remote DB Setup ---\n";
echo "Bu araç 'schema.sql' dosyasını uzaktaki veritabanına yükler.\n";
echo "Lütfen Railway (veya diğer servis) MySQL bağlantı adresini (Connection URL) yapıştırın.\n";
echo "Örnek format: mysql://root:password@containers-us-west-1.railway.app:3306/railway\n\n";
echo "MySQL URL: ";

$handle = fopen("php://stdin", "r");
$url = trim(fgets($handle));

if (empty($url)) {
    die("Hata: URL boş olamaz.\n");
}

$parts = parse_url($url);

if ($parts === false || !isset($parts['host'])) {
    die("Hata: Geçersiz URL formatı.\n");
}

$host = $parts['host'];
$port = $parts['port'] ?? 3306;
$user = $parts['user'] ?? 'root';
$pass = $parts['pass'] ?? '';
$db = isset($parts['path']) ? ltrim($parts['path'], '/') : 'railway';

echo "\nBağlanılıyor: $host:$port (DB: $db)...\n";

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        // SSL gerekirse diye:
        PDO::MYSQL_ATTR_SSL_CA => true,
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
    ];

    // Bazı ortamlar SSL gerektirmez veya sertifika yolu ister, basit deneme:
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        // SSL hatası olursa SSL'siz dene
        echo "SSL ile bağlanılamadı, SSL'siz deneniyor...\n";
        $dsnNoSSL = "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4";
        $pdo = new PDO($dsnNoSSL, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
    }

    echo "Bağlantı Başarılı!\n";

    $schemaFile = __DIR__ . '/schema.sql';
    if (!file_exists($schemaFile)) {
        die("Hata: schema.sql dosyası bulunamadı ($schemaFile).\n");
    }

    echo "schema.sql dosyası okunuyor...\n";
    $sql = file_get_contents($schemaFile);

    echo "Tablolar oluşturuluyor...\n";

    // Çoklu sorguları desteklemek için
    $pdo->exec($sql);

    echo "\n[BAŞARILI] Veritabanı kurulumu tamamlandı!\n";
    echo "Artık active user eklemek isterseniz 'INSERT INTO user ...' komutlarını manuel çalıştırabilirsiniz.\n";

} catch (PDOException $e) {
    echo "\n[HATA] Veritabanı hatası:\n";
    echo $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "\n[HATA]:\n";
    echo $e->getMessage() . "\n";
}
