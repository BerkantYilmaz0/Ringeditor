<?php
declare(strict_types=1);

namespace App\Application\Validation;

use App\Application\Validation\ValidationException;

final class JobsValidator
{
    private const MAX_BULK_ROWS = 100;
    private const DEFAULT_TIMEZONE = 'Europe/Istanbul';

    /**
     * Tek bir sefer için validasyon
     * @throws ValidationException
     */
    public static function validate(array $data, string $timezone = self::DEFAULT_TIMEZONE): void
    {
        // 1. Duetime kontrolü
        if (empty($data['duetime']) || !is_numeric($data['duetime'])) {
            throw new ValidationException("Geçerli bir saat seçilmedi.");
        }

        // 2. Geçmiş tarih/saat kontrolü
        $ts = (int) $data['duetime'];
        $tz = new \DateTimeZone($timezone);
        $jobDateTime = (new \DateTimeImmutable("@$ts"))->setTimezone($tz);
        $now = new \DateTimeImmutable('now', $tz);

        $jobDay = $jobDateTime->format('Y-m-d');
        $today = $now->format('Y-m-d');

        if ($jobDay < $today) {
            throw new ValidationException("Geçmiş tarihe sefer eklenemez.");
        }

        if ($jobDay === $today && $ts < $now->getTimestamp()) {
            throw new ValidationException("Geçmiş saate sefer eklenemez veya güncellenemez.");
        }

        // 3. Device kontrolü
        if (empty($data['deviceid']) || !is_numeric($data['deviceid'])) {
            throw new ValidationException("Geçerli bir plaka seçilmedi.");
        }

        // 4. Ring tipi kontrolü
        if (empty($data['type']) || !is_numeric($data['type'])) {
            throw new ValidationException("Geçerli bir ring tipi seçilmedi.");
        }

        // 5. Rota kontrolü
        if (empty($data['route_id']) || !is_numeric($data['route_id'])) {
            throw new ValidationException("Bir Rota seçilmelidir.");
        }
    }

    /**
     * Toplu ekleme için validasyon
     * @throws ValidationException
     */
    public static function validateBulk(array $rows, string $timezone = self::DEFAULT_TIMEZONE): void
    {
        if (empty($rows) || !is_array($rows)) {
            throw new ValidationException("Geçerli bir sefer listesi gönderilmedi.");
        }

        if (count($rows) > self::MAX_BULK_ROWS) {
            throw new ValidationException(
                sprintf("Tek seferde en fazla %d sefer eklenebilir.", self::MAX_BULK_ROWS)
            );
        }

        foreach ($rows as $index => $row) {
            if (!is_array($row)) {
                throw new ValidationException(
                    sprintf("Satır %d geçersiz format.", $index + 1)
                );
            }

            try {
                self::validate($row, $timezone);
            } catch (ValidationException $e) {
                throw new ValidationException(
                    sprintf("Satır %d hatalı: %s", $index + 1, $e->getMessage())
                );
            }
        }
    }
}