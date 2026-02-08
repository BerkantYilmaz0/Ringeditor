# Şema Tasarım Prensipleri

> Normalizasyon, birincil anahtarlar, zaman damgaları, ilişkiler.

## Normalizasyon Kararı

```
Ne zaman normalize edilmeli (ayrı tablolar):
├── Veri satırlar arasında tekrarlanıyorsa
├── Güncellemeler birden fazla değişiklik gerektiriyorsa
├── İlişkiler netse
├── Sorgu desenleri faydalanıyorsa

Ne zaman denormalize edilmeli (gömülü/tekrarlı):
├── Okuma performansı kritikse
├── Veri nadiren değişiyorsa
├── Her zaman birlikte çekiliyorsa
├── Daha basit sorgular gerekiyorsa
```

## Birincil Anahtar Seçimi

| Tip | Ne Zaman Kullanılır |
|------|----------|
| **UUID** | Dağıtık sistemler, güvenlik |
| **ULID** | UUID + zamana göre sıralanabilir |
| **Auto-increment** | Basit uygulamalar, tek veritabanı |
| **Natural key** | Nadiren (iş anlamı varsa) |

## Zaman Damgası Stratejisi

```
Her tablo için:
├── created_at → Oluşturulma zamanı
├── updated_at → Son değişiklik
└── deleted_at → Soft delete (gerekirse)

TIMESTAMP yerine TIMESTAMPTZ (zaman dilimi ile) kullanın
```

## İlişki Tipleri

| Tip | Ne Zaman | Uygulama |
|------|------|----------------|
| **Bire-Bir** | Uzantı verisi | FK ile ayrı tablo |
| **Bire-Çok** | Ebeveyn-çocuk | Çocuk tabloda FK |
| **Çoka-Çok** | İki taraf da çoklu | Kavşak (Junction) tablosu |

## Yabancı Anahtar ON DELETE

```
├── CASCADE → Ebeveynle birlikte çocukları sil
├── SET NULL → Çocuklar yetim kalır (orphan)
├── RESTRICT → Çocuklar varsa silmeyi engelle
└── SET DEFAULT → Çocuklar varsayılan değeri alır
```
