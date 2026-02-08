---
name: database-design
description: Veritabanı tasarım ilkeleri ve karar verme. Şema tasarımı, indeksleme stratejisi, ORM seçimi, sunucusuz veritabanları (Dahil: Supabase).
allowed-tools: Read, Glob, Grep
---

# Veritabanı Tasarımı

> Şema, depolama ve erişim desenleri için mimari kararlar.

---

## 🎯 Seçici Okuma Kuralı

**SADECE istekle ilgili dosyaları okuyun!**

| Dosya | Açıklama | Ne Zaman Okunmalı |
|------|-------------|--------------|
| `schema-design.md` | Normalizasyon, ilişkiler, türler | Tablo/koleksiyon oluştururken |
| `indexing.md` | B-Tree, GIN, GiST, bileşik indeksler | Performans sorunlarını çözerken |
| `orm-selection.md` | Prisma vs TypeORM vs Drizzle vs Supabase | Teknoloji yığını seçerken |
| `database-selection.md` | SQL vs NoSQL vs Vektör | DB motoru seçerken |
| `migrations.md` | Sürümleme, güvenli değişiklikler | Şemayı güncellerken |
| `optimization.md` | Sorgu analizi, havuzlama, önbellekleme | Yavaş sorguları düzeltirken |

---

## 💾 Karar Matrisi: Motor Seçimi

```
VERİNİZİN ŞEKLİ NEDİR?

┌─ Yapılandırılmış & İlişkisel? (Kullanıcılar, Siparişler, Envanter)
│  ├─ EVET → SQL (PostgreSQL)
│  │  DEPOLAMA İHTİYACI?
│  │  ├─ Sunucusuz/Hızlı Başlangıç? → Supabase / Neon
│  │  └─ Tam Kontrol? → AWS RDS / Self-Hosted
│  │
│  └─ HAYIR → Belge veya Anahtar/Değer?
│     ├─ Belge (JSON, esnek şema) → MongoDB / DynamoDB
│     └─ Anahtar/Değer (Önbellek, Oturum) → Redis
```

---

## ⚡ Supabase (PostgreSQL + Servisler)

Supabase, PostgreSQL üzerine kurulu açık kaynaklı bir Firebase alternatifidir.

### Ne Zaman Kullanılır?
- **Hızlı Başlangıç:** Backend yazmadan veritabanı, auth ve API'ye ihtiyacınız varsa.
- **Gerçek Zamanlı:** Veritabanı değişikliklerini istemcide anlık dinlemeniz gerekiyorsa.
- **Postgres Gücü:** Standart PostgreSQL özelliklerini (Triggers, Functions, Extensions) kullanmak istiyorsanız.
- **Edge Functions:** Sunucusuz fonksiyonlar çalıştırmak istiyorsanız.

### Supabase için En İyi Uygulamalar
1.  **RLS (Row Level Security):** VERİ GÜVENLİĞİ İÇİN ZORUNLUDUR. İstemci tarafı erişimini veritabanı seviyesinde kısıtlayın.
2.  **Types:** TypeScript tiplerini veritabanı şemasından otomatik oluşturun (`supabase gen types`).
3.  **İlişkiler:** Yabancı anahtarları (Foreign Keys) doğru tanımlayın, Supabase UI bunları otomatik algılar.
4.  **Depolama:** Dosya yüklemeleri için Supabase Storage kullanın ve RLS politikalarıyla koruyun.

---

## 🔍 Şema Tasarımı Kontrol Listesi

- [ ] **Birincil Anahtarlar:** Her tablonun bir `id`si var mı? (UUID v7 veya CUID2 önerilir, artan tamsayı yerine)
- [ ] **Yabancı Anahtarlar:** İlişkiler açıkça tanımlanmış ve kısıtlamalar (constraints) eklenmiş mi?
- [ ] **Zaman Damgaları:** `created_at` ve `updated_at` (otomatik güncellenen) var mı?
- [ ] **İndeksler:** Filtreleme (WHERE) ve sıralama (ORDER BY) alanları indekslendi mi?
- [ ] **Nullability:** `NOT NULL` kısıtlamaları doğru ayarlandı mı? (Varsayılan olarak zorunlu yapın)
- [ ] **Enumlar:** Sabit değer listeleri (Durumlar, Roller) için Enum veya referans tabloları kullanıldı mı?

---

## ❌ Anti-Desenler

| Yapma | Yap |
|-------|-----|
| Milyonlarca satıra `SELECT *` | Sayfalandırma (Pagination) ve `SELECT field` |
| İş mantığında döngü içinde sorgu (N+1) | İlişkisel yükleme (Eager loading) veya JOIN |
| JSON sütunlarına aşırı güven (SQL'de) | İlişkisel tablolar (gerektiğinde JSONB) |
| İndekssiz metin arama | Full-Text Search (tsvector) veya ElasticSearch |
| Veri silmek (Hard delete) | `deleted_at` ile Soft delete (İş ihtiyacına göre) |
| Şifreleri düz metin saklamak | Hash (Argon2, bcrypt) veya Auth servisi (Supabase Auth, Clerk) |

---

## 📈 Performans İpuçları

1.  **İndeksleme:** Sıklıkla sorgulanan sütunları indeksleyin, ancak aşırıya kaçmayın (yazma hızını düşürür).
2.  **Bağlantı Havuzlama (Pooling):** Sunucusuz ortamlarda (Lambda, Vercel) PgBouncer veya Supabase Pooler kullanın.
3.  **Önbellekleme:** Sık okunan, az değişen veriler için Redis kullanın.
4.  **Analiz:** Yavaş sorguları bulmak için `EXPLAIN ANALYZE` kullanın.
