# Migrasyon Prensipleri

> Sıfır kesinti süreli değişiklikler için güvenli migrasyon stratejisi.

## Güvenli Migrasyon Stratejisi

```
Sıfır kesinti süreli değişiklikler için:
│
├── Sütun ekleme
│   └── Nullable olarak ekle → veriyi doldur (backfill) → NOT NULL yap
│
├── Sütun kaldırma
│   └── Kullanımı durdur → dağıt (deploy) → sütunu kaldır
│
├── İndeks ekleme
│   └── CREATE INDEX CONCURRENTLY (bloklamayan)
│
└── Sütun yeniden adlandırma
    └── Yeni ekle → veriyi taşı → dağıt → eskiyi sil
```

## Migrasyon Felsefesi

- Asla tek adımda kırıcı değişiklik (breaking change) yapma
- Migrasyonları önce veri kopyasında test et
- Geri alma (rollback) planın olsun
- Mümkünse işlem (transaction) içinde çalıştır

## Sunucusuz Veritabanları

### Neon (Sunucusuz PostgreSQL)

| Özellik | Fayda |
|---------|---------|
| Sıfıra ölçekleme | Maliyet tasarrufu |
| Anında dallanma (branching) | Geliştirme/önizleme |
| Tam PostgreSQL | Uyumluluk |
| Otomatik ölçekleme | Trafik yönetimi |

### Turso (Edge SQLite)

| Özellik | Fayda |
|---------|---------|
| Uç konumlar | Ultra düşük gecikme |
| SQLite uyumlu | Basit |
| Cömert ücretsiz katman | Maliyet |
| Küresel dağıtım | Performans |
