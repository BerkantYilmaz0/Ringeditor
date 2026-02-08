---
name: clean-code
description: Pragmatik kodlama standartları - kısa, doğrudan, aşırı mühendislik yok, gereksiz yorum yok
allowed-tools: Read, Write, Edit
version: 2.0
priority: CRITICAL
---

# Temiz Kod - Pragmatik AI Kodlama Standartları

> **KRİTİK YETENEK** - **Kısa, doğrudan ve çözüm odaklı** olun.

---

## Temel Prensipler

| Prensip | Kural |
|-----------|------|
| **SRP** | Tek Sorumluluk (Single Responsibility) - her fonksiyon/sınıf TEK bir şey yapar |
| **DRY** | Kendini Tekrar Etme (Don't Repeat Yourself) - kopyaları çıkar, yeniden kullan |
| **KISS** | Basit Tut (Keep It Simple) - çalışan en basit çözüm |
| **YAGNI** | Buna İhtiyacın Olmayacak (You Aren't Gonna Need It) - kullanılmayan özellikleri inşa etme |
| **Boy Scout** | Kodu bulduğundan daha temiz bırak |

---

## İsimlendirme Kuralları

| Öğe | Kural |
|---------|------------|
| **Değişkenler** | Niyeti ortaya koy: `n` değil `userCount` |
| **Fonksiyonlar** | Fiil + isim: `user()` değil `getUserById()` |
| **Booleanlar** | Soru formu: `isActive`, `hasPermission`, `canEdit` |
| **Sabitler** | SCREAMING_SNAKE: `MAX_RETRY_COUNT` |

> **Kural:** Bir ismi açıklamak için yoruma ihtiyacınız varsa, yeniden adlandırın.

---

## Fonksiyon Kuralları

| Kural | Açıklama |
|------|-------------|
| **Küçük** | Maks 20 satır, ideal olan 5-10 |
| **Tek Şey** | Tek bir şey yapar, onu iyi yapar |
| **Tek Seviye** | Fonksiyon başına bir soyutlama seviyesi |
| **Az Argüman** | Maks 3 argüman, 0-2 tercih edilir |
| **Yan Etki Yok** | Girdileri beklenmedik şekilde değiştirme (mutate etme) |

---

## Kod Yapısı

| Desen | Uygula |
|---------|-------|
| **Koruma İfadeleri (Guard Clauses)** | Uç durumlar için erken dönüşler |
| **Düz > İç İçe** | Derin iç içe geçmeden kaçın (maks 2 seviye) |
| **Kompozisyon** | Birlikte oluşturulan küçük fonksiyonlar |
| **Birlikte Konumlandırma (Colocation)** | İlgili kodu yakın tut |

---

## AI Kodlama Stili

| Durum | Eylem |
|-----------|--------|
| Kullanıcı özellik istiyor | Doğrudan yaz |
| Kullanıcı hata bildiriyor | Düzelt, açıklama |
| Net gereksinim yok | Sor, varsayma |

---

## Anti-Desenler (YAPMA)

| ❌ Desen | ✅ Düzeltme |
|-----------|-------|
| Her satırı yorumla | Bariz yorumları sil |
| Tek satırlık yardımcı (helper) | Kodu satır içine (inline) al |
| 2 nesne için Fabrika (Factory) | Doğrudan örnekleme (instantiation) |
| 1 fonksiyonlu utils.ts | Kodu kullanıldığı yere koy |
| "Önce import ediyoruz..." | Sadece kodu yaz |
| Derin iç içe geçme | Koruma ifadeleri (Guard clauses) |
| Sihirli sayılar | İsimlendirilmiş sabitler |
| Tanrı (God) fonksiyonlar | Sorumluluğa göre böl |

---

## 🔴 HERHANGİ Bir Dosyayı Düzenlemeden Önce (ÖNCE DÜŞÜN!)

**Bir dosyayı değiştirmeden önce kendinize sorun:**

| Soru | Neden |
|----------|-----|
| **Bu dosyayı kim import ediyor?** | Bozulabilirler |
| **Bu dosya neyi import ediyor?** | Arayüz değişiklikleri |
| **Bunu hangi testler kapsıyor?** | Testler başarısız olabilir |
| **Bu paylaşılan bir bileşen mi?** | Birden çok yer etkilenir |

**Hızlı Kontrol:**
```
Düzenlenecek dosya: UserService.ts
└── Bunu kim import ediyor? → UserController.ts, AuthController.ts
└── Onların da değişikliğe ihtiyacı var mı? → Fonksiyon imzalarını kontrol et
```

> 🔴 **Kural:** Dosyayı + tüm bağımlı dosyaları AYNI görevde düzenle.
> 🔴 **Asla bozuk importlar veya eksik güncellemeler bırakma.**

---

## Özet

| Yap | Yapma |
|----|-------|
| Kodu doğrudan yaz | Öğretici yaz (tutorials) |
| Kodun kendini belgelemesine izin ver | Bariz yorumlar ekle |
| Hataları hemen düzelt | Önce düzeltmeyi açıkla |
| Küçük şeyleri satır içine al | Gereksiz dosyalar oluştur |
| Şeyleri net isimlendir | Kısaltmalar kullan |
| Fonksiyonları küçük tut | 100+ satırlık fonksiyonlar yaz |

> **Unutmayın: Kullanıcı programlama dersi değil, çalışan kod istiyor.**

---

## 🔴 Tamamlamadan Önce Kendi Kendini Kontrol (ZORUNLU)

**"Görev tamamlandı" demeden önce doğrulayın:**

| Kontrol | Soru |
|-------|----------|
| ✅ **Hedef tuttu mu?** | Kullanıcının istediğini tam olarak yaptım mı? |
| ✅ **Dosyalar düzenlendi mi?** | Gerekli tüm dosyaları değiştirdim mi? |
| ✅ **Kod çalışıyor mu?** | Değişikliği test ettim/doğruladım mı? |
| ✅ **Hata yok mu?** | Lint ve TypeScript geçiyor mu? |
| ✅ **Unutulan bir şey yok mu?** | Herhangi bir uç durum kaçırıldı mı? |

> 🔴 **Kural:** HERHANGİ bir kontrol başarısızsa, tamamlamadan önce düzeltin.

---

## Doğrulama Scriptleri (ZORUNLU)

> 🔴 **KRİTİK:** Her ajan işi tamamladıktan sonra SADECE kendi yeteneğinin scriptlerini çalıştırır.

### Ajan → Script Eşleşmesi

| Ajan | Script | Komut |
|-------|--------|---------|
| **frontend-specialist** | UX Denetimi | `python .agent/skills/frontend-design/scripts/ux_audit.py .` |
| **frontend-specialist** | A11y Kontrolü | `python .agent/skills/frontend-design/scripts/accessibility_checker.py .` |
| **backend-specialist** | API Doğrulayıcı | `python .agent/skills/api-patterns/scripts/api_validator.py .` |
| **mobile-developer** | Mobil Denetim | `python .agent/skills/mobile-design/scripts/mobile_audit.py .` |
| **database-architect** | Şema Doğrulama | `python .agent/skills/database-design/scripts/schema_validator.py .` |
| **security-auditor** | Güvenlik Taraması | `python .agent/skills/vulnerability-scanner/scripts/security_scan.py .` |
| **seo-specialist** | SEO Kontrolü | `python .agent/skills/seo-fundamentals/scripts/seo_checker.py .` |
| **seo-specialist** | GEO Kontrolü | `python .agent/skills/geo-fundamentals/scripts/geo_checker.py .` |
| **performance-optimizer** | Lighthouse | `python .agent/skills/performance-profiling/scripts/lighthouse_audit.py <url>` |
| **test-engineer** | Test Çalıştırıcı | `python .agent/skills/testing-patterns/scripts/test_runner.py .` |
| **test-engineer** | Playwright | `python .agent/skills/webapp-testing/scripts/playwright_runner.py <url>` |
| **Herhangi bir ajan** | Lint Kontrolü | `python .agent/skills/lint-and-validate/scripts/lint_runner.py .` |
| **Herhangi bir ajan** | Tip Kapsamı | `python .agent/skills/lint-and-validate/scripts/type_coverage.py .` |
| **Herhangi bir ajan** | i18n Kontrolü | `python .agent/skills/i18n-localization/scripts/i18n_checker.py .` |

> ❌ **YANLIŞ:** `test-engineer` ajanı `ux_audit.py` çalıştırıyor
> ✅ **DOĞRU:** `frontend-specialist` ajanı `ux_audit.py` çalıştırıyor

---

### 🔴 Script Çıktısı İşleme (OKU → ÖZETLE → SOR)

**Bir doğrulama scripti çalıştırırken şunları yapmalısınız:**

1. **Scripti çalıştırın** ve TÜM çıktıyı yakalayın
2. **Çıktıyı ayrıştırın** - hataları, uyarıları ve geçenleri belirleyin
3. **Kullanıcıya özetleyin** bu formatta:

```markdown
## Script Sonuçları: [script_name.py]

### ❌ Bulunan Hatalar (X öğe)
- [Dosya:Satır] Hata açıklaması 1
- [Dosya:Satır] Hata açıklaması 2

### ⚠️ Uyarılar (Y öğe)
- [Dosya:Satır] Uyarı açıklaması

### ✅ Geçti (Z öğe)
- Kontrol 1 geçti
- Kontrol 2 geçti

**X hatayı düzeltmeli miyim?**
```

4. Düzeltmeden önce **kullanıcı onayı bekleyin**
5. **Düzelttikten sonra** → Onaylamak için scripti yeniden çalıştırın

> 🔴 **İHLAL:** Scripti çalıştırıp çıktıyı görmezden gelmek = BAŞARISIZ görev.
> 🔴 **İHLAL:** Sormadan otomatik düzeltme = İzin verilmez.
> 🔴 **Kural:** Her zaman çıktıyı OKU → ÖZETLE → SOR → sonra düzelt.
