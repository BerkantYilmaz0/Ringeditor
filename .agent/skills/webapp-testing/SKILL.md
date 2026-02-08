---
name: webapp-testing
description: Web application testing principles. E2E, Playwright, deep audit strategies.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Web Uygulaması Testi

> Her şeyi keşfet ve test et. Test edilmemiş hiçbir rota bırakma.

## 🔧 Çalışma Zamanı Scriptleri

**Otomatik tarayıcı testi için bunları çalıştırın:**

| Script | Amaç | Kullanım |
|--------|---------|-------|
| `scripts/playwright_runner.py` | Temel tarayıcı testi | `python scripts/playwright_runner.py https://example.com` |
| | Ekran görüntüsü ile | `python scripts/playwright_runner.py <url> --screenshot` |
| | Erişilebilirlik kontrolü | `python scripts/playwright_runner.py <url> --a11y` |

**Gereksinim:** `pip install playwright && playwright install chromium`

---

## 1. Derin Denetim Yaklaşımı

### Önce Keşif

| Hedef | Nasıl Bulunur |
|--------|-------------|
| Rotalar | app/, pages/, router dosyalarını tara |
| API uç noktaları | HTTP metodları için Grep yap |
| Bileşenler | Bileşen dizinlerini bul |
| Özellikler | Dokümantasyonu oku |

### Sistematik Test Etme

1. **Haritala (Map)** - Tüm rotaları/API'leri listele
2. **Tara (Scan)** - Yanıt verdiklerini doğrula
3. **Test Et (Test)** - Kritik yolları kapsa

---

## 2. Web İçin Test Piramidi

```
        /\          E2E (Az)
       /  \         Kritik kullanıcı akışları
      /----\
     /      \       Entegrasyon (Bazı)
    /--------\      API, veri akışı
   /          \
  /------------\    Bileşen (Çok)
                    Bireysel UI parçaları
```

---

## 3. E2E Test Prensipleri

### Ne Test Edilmeli

| Öncelik | Testler |
|----------|-------|
| 1 | Mutlu yol kullanıcı akışları |
| 2 | Kimlik doğrulama akışları |
| 3 | Kritik iş eylemleri |
| 4 | Hata yönetimi |

### E2E En İyi Uygulamalar

| Uygulama | Neden |
|----------|-----|
| data-testid kullan | Kararlı seçiciler |
| Öğeleri bekle | Titrek testlerden kaçın |
| Temiz durum | Bağımsız testler |
| Uygulama detaylarından kaçın | Kullanıcı davranışını test et |

---

## 4. Playwright Prensipleri

### Temel Kavramlar

| Kavram | Kullanım |
|---------|-----|
| Page Object Model | Sayfa mantığını kapsülle |
| Fikstürler (Fixtures) | Yeniden kullanılabilir test kurulumu |
| Doğrulamalar (Assertions) | Yerleşik otomatik bekleme |
| Trace Viewer | Hataları ayıkla |

### Yapılandırma

| Ayar | Öneri |
|---------|----------------|
| Yeniden Denemeler | CI üzerinde 2 |
| Trace | on-first-retry |
| Ekran Görüntüleri | on-failure |
| Video | retain-on-failure |

---

## 5. Görsel Test Etme

### Ne Zaman Kullanılır

| Senaryo | Değer |
|----------|-------|
| Tasarım sistemi | Yüksek |
| Pazarlama sayfaları | Yüksek |
| Bileşen kütüphanesi | Orta |
| Dinamik içerik | Daha Düşük |

### Strateji

- Taban çizgisi (baseline) ekran görüntüleri
- Değişikliklerde karşılaştır
- Görsel farkları incele
- Kasıtlı değişiklikleri güncelle

---

## 6. API Test Prensipleri

### Kapsama Alanları

| Alan | Testler |
|------|-------|
| Durum kodları | 200, 400, 404, 500 |
| Yanıt şekli | Şemayla eşleşiyor |
| Hata mesajları | Kullanıcı dostu |
| Uç durumlar | Boş, büyük, özel karakterler |

---

## 7. Test Organizasyonu

### Dosya Yapısı

```
tests/
├── e2e/           # Tam kullanıcı akışları
├── integration/   # API, veri
├── component/     # UI birimleri
└── fixtures/      # Paylaşılan veriler
```

### İsimlendirme Kuralı

| Desen | Örnek |
|---------|---------|
| Özellik tabanlı | `login.spec.ts` |
| Açıklayıcı | `user-can-checkout.spec.ts` |

---

## 8. CI Entegrasyonu

### Boru Hattı (Pipeline) Adımları

1. Bağımlılıkları yükle
2. Tarayıcıları yükle
3. Testleri çalıştır
4. Eserleri (artifacts) yükle (izler, ekran görüntüleri)

### Paralelleştirme

| Strateji | Kullanım |
|----------|-----|
| Dosya başına | Playwright varsayılanı |
| Parçalama (Sharding) | Büyük takımlar (suites) |
| İşçiler (Workers) | Çoklu tarayıcılar |

---

## 9. Anti-Desenler

| ❌ Yapma | ✅ Yap |
|----------|-------|
| Uygulamayı test et | Davranışı test et |
| Beklemeleri sabit kodla | Otomatik bekleme kullan |
| Temizlemeyi atla | Testleri izole et |
| Titrek testleri görmezden gel | Kök nedeni düzelt |

---

> **Unutmayın:** E2E testleri pahalıdır. Bunları sadece kritik yollar için kullanın.
