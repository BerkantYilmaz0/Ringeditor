---
name: testing-patterns
description: Testing patterns and principles. Unit, integration, mocking strategies.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Test Desenleri

> Güvenilir test takımları için prensipler.

---

## 1. Test Piramidi

```
        /\          E2E (Az)
       /  \         Kritik akışlar
      /----\
     /      \       Entegrasyon (Bazı)
    /--------\      API, DB sorguları
   /          \
  /------------\    Birim (Çok)
                    Fonksiyonlar, sınıflar
```

---

## 2. AAA Deseni

| Adım | Amaç |
|------|---------|
| **Düzenle (Arrange)** | Test verilerini ayarla |
| **Etki Et (Act)** | Test edilen kodu çalıştır |
| **Doğrula (Assert)** | Sonucu doğrula |

---

## 3. Test Türü Seçimi

### Her Birini Ne Zaman Kullanmalı

| Tür | En İyisi | Hız |
|------|----------|-------|
| **Birim (Unit)** | Saf fonksiyonlar, mantık | Hızlı (<50ms) |
| **Entegrasyon** | API, DB, servisler | Orta |
| **E2E** | Kritik kullanıcı akışları | Yavaş |

---

## 4. Birim Test Prensipleri

### İyi Birim Testleri

| Prensip | Anlamı |
|-----------|---------|
| Hızlı | Her biri < 100ms |
| İzole | Harici bağımlılık yok |
| Tekrarlanabilir | Her zaman aynı sonuç |
| Kendi kendini kontrol eden | Manuel doğrulama yok |
| Zamanında | Kodla birlikte yazılmış |

### Neler Birim Test Edilmeli

| Test Et | Test Etme |
|------|------------|
| İş mantığı | Çerçeve kodu |
| Uç durumlar | Üçüncü taraf kütüphaneler |
| Hata yönetimi | Basit getter'lar |

---

## 5. Entegrasyon Testi Prensipleri

### Ne Test Edilmeli

| Alan | Odak |
|------|-------|
| API uç noktaları | İstek/yanıt |
| Veritabanı | Sorgular, işlemler (transactions) |
| Harici servisler | Sözleşmeler (Contracts) |

### Kurulum/Kaldırma (Setup/Teardown)

| Aşama | Eylem |
|-------|--------|
| Hepsinden Önce | Kaynakları bağla |
| Her Birinden Önce | Durumu sıfırla |
| Her Birinden Sonra | Temizle |
| Hepsinden Sonra | Bağlantıyı kes |

---

## 6. Mocking Prensipleri

### Ne Zaman Mocklanmalı

| Mockla | Mocklama |
|------|------------|
| Harici API'ler | Test edilen kod |
| Veritabanı (birim) | Basit bağımlılıklar |
| Zaman/rastgele | Saf fonksiyonlar |
| Ağ | Bellek içi depolar |

### Mock Türleri

| Tür | Kullanım |
|------|-----|
| Stub | Sabit değerler döndür |
| Spy | Çağrıları izle |
| Mock | Beklentileri belirle |
| Fake | Basitleştirilmiş uygulama |

---

## 7. Test Organizasyonu

### İsimlendirme

| Desen | Örnek |
|---------|---------|
| Should davranış | "should return error when..." |
| When koşul | "when user not found..." |
| Given-when-then | "given X, when Y, then Z" |

### Gruplama

| Seviye | Kullanım |
|-------|-----|
| describe | İlgili testleri grupla |
| it/test | Bireysel durum |
| beforeEach | Ortak kurulum |

---

## 8. Test Verileri

### Stratejiler

| Yaklaşım | Kullanım |
|----------|-----|
| Fabrikalar (Factories) | Test verisi oluştur |
| Fikstürler (Fixtures) | Önceden tanımlanmış veri setleri |
| İnşa Ediciler (Builders) | Akıcı nesne oluşturma |

### Prensipler

- Gerçekçi veriler kullan
- Gerekli olmayan değerleri rastgeleliştir (faker)
- Ortak fikstürleri paylaş
- Verileri minimal tut

---

## 9. En İyi Uygulamalar

| Uygulama | Neden |
|----------|-----|
| Test başına bir doğrulama | Net başarısızlık nedeni |
| Bağımsız testler | Sıra bağımlılığı yok |
| Hızlı testler | Sık sık çalıştır |
| Açıklayıcı isimler | Kendi kendini belgeleyen |
| Temizle | Yan etkilerden kaçın |

---

## 10. Anti-Desenler

| ❌ Yapma | ✅ Yap |
|----------|-------|
| Uygulamayı test et | Davranışı test et |
| Test kodunu yinele | Fabrikalar kullan |
| Karmaşık test kurulumu | Basitleştir veya böl |
| Titrek (flaky) testleri görmezden gel | Kök nedeni düzelt |
| Temizlemeyi atla | Durumu sıfırla |

---

> **Unutmayın:** Testler belge niteliğindedir. Birisi testlerden kodun ne yaptığını anlayamıyorsa, testleri yeniden yazın.
