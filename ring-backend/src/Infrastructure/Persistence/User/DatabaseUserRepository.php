<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\User;

use App\Domain\User\User;
use App\Domain\User\UserNotFoundException;
use App\Domain\User\UserRepository;
use PDO;

class DatabaseUserRepository implements UserRepository
{
    public function __construct(private PDO $pdo)
    {
    }

    public function findAll(): array
    {
        $stmt = $this->pdo->query("SELECT * FROM account");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(function ($row) {
            return $this->mapRowToUser($row);
        }, $results);
    }

    public function findUserOfId(int $id): User
    {
        // Compatibility: 'account' table uses 'accountID' (string) as PK.
        // We cannot search by int ID efficiently/correctly if IDs are 'admin'.
        // For compatibility, we'll try to fallback or just return UserNotFound.
        throw new UserNotFoundException("Legacy 'account' table does not support integer definition.");
    }

    public function findByUsername(string $username): User
    {
        // 'user' tablosundan sorgula
        $stmt = $this->pdo->prepare("SELECT * FROM user WHERE userID = :username LIMIT 1");
        $stmt->execute([':username' => $username]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            throw new UserNotFoundException();
        }

        return $this->mapRowToUser($row);
    }

    private function mapRowToUser(array $row): User
    {
        // 'contactName' (örn: "Metin Aktuğ")
        $fullName = trim($row['contactName'] ?? '');
        $parts = explode(' ', $fullName, 2);
        $firstName = $parts[0] ?? '';
        $lastName = $parts[1] ?? '';

        return new User(
            0, // Fake ID
            $row['userID'], // username = userID column in `user` table
            $firstName,
            $lastName,
            $row['password'] ?? ''
        );
    }
}
