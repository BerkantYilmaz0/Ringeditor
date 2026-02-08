---
trigger: always_on
---

# GEMINI.md - Antigravity Kit

> Bu dosya, AI'nın bu çalışma alanında nasıl davranacağını tanımlar.

---

## KRİTİK: AJAN & YETENEK PROTOKOLÜ (BURADAN BAŞLAYIN)

> **ZORUNLU:** Herhangi bir uygulama yapmadan ÖNCE ilgili ajan dosyasını ve yeteneklerini OKUMALISINIZ. Bu en yüksek öncelikli kuraldır.

### 1. Modüler Yetenek Yükleme Protokolü
```
Ajan aktifleşti → Ön madde (frontmatter) "skills:" alanını kontrol et
    │
    └── HER yetenek için:
        ├── SKILL.md (Sadece ENDEKS) oku
        ├── İçerik haritasından ilgili bölümleri bul
        └── SADECE o bölüm dosyalarını oku
```

- **Seçici Okuma:** Bir yetenek klasöründeki TÜM dosyaları OKUMAYIN. Önce `SKILL.md` okuyun, sonra sadece kullanıcının isteğiyle eşleşen bölümleri okuyun.
- **Kural Önceliği:** P0 (GEMINI.md) > P1 (Ajan .md) > P2 (SKILL.md). Tüm kurallar bağlayıcıdır.

### 2. Uygulama Protokolü
1. **Ajan aktifleştiğinde:**
   - ✅ Ajan dosyasındaki tüm kuralları OKU.
   - ✅ Ön madde `skills:` listesini KONTROL ET.
   - ✅ Her yeteneğin `SKILL.md` dosyasını YÜKLE.
   - ✅ Ajan VE yeteneklerden gelen tüm kuralları UYGULA.
2. **Yasak:** Ajan kurallarını veya yetenek talimatlarını okumayı asla atlama. "Oku → Anla → Uygula" zorunludur.

---

## 📥 İSTEK SINIFLANDIRICI (ADIM 2)

**HERHANGİ bir işlemden önce, isteği sınıflandırın:**

| İstek Tipi | Tetikleyici Anahtar Kelimeler | Aktif Seviyeler | Sonuç |
|--------------|------------------|--------------|--------|
| **SORU** | "nedir", "nasıl", "açıkla" | Sadece SEVİYE 0 | Metin Yanıtı |
| **ARAŞTIRMA/İSTİHBARAT**| "analiz et", "dosyaları listele", "genel bakış" | SEVİYE 0 + Explorer | Oturum İstihbaratı (Dosya Yok) |
| **BASİT KOD** | "düzelt", "ekle", "değiştir" (tek dosya) | SEVİYE 0 + SEVİYE 1 (hafif) | Satır İçi Düzenleme |
| **KARMAŞIK KOD**| "inşa et", "oluştur", "uygula", "refactor" | SEVİYE 0 + SEVİYE 1 (tam) + Ajan | **{task-slug}.md Zorunlu** |
| **TASARIM/UI** | "tasarım", "UI", "sayfa", "panel" | SEVİYE 0 + SEVİYE 1 + Ajan | **{task-slug}.md Zorunlu** |
| **SLASH KOMUTU** | /create, /orchestrate, /debug | Komuta özel akış | Değişken |

---

## SEVİYE 0: EVRENSEL KURALLAR (Her Zaman Aktif)

### 🌐 Dil Yönetimi

Kullanıcının istemi İngilizce DEĞİLSE:
1. **Dahili olarak çevir** daha iyi kavrama için
2. **Kullanıcının dilinde yanıt ver** - iletişimlerine uyum sağla
3. **Kod yorumları/değişkenler** İngilizce kalır

### 🧹 Temiz Kod (Global Zorunlu)

**TÜM kodlar `@[skills/clean-code]` kurallarına uymalıdır. İstisna yok.**

- Özlü, doğrudan, çözüm odaklı
- Gereksiz açıklamalar yok
- Aşırı yorumlama yok
- Aşırı mühendislik yok
- **Kendi Kendini Belgeleme:** Her ajan, ilgili `.md` dosyalarında kendi değişikliklerini belgelemekten sorumludur.
- **Global Test Zorunluluğu:** Her ajan, değişiklikleri için test yazmaktan ve çalıştırmaktan sorumludur. "Test Piramidi"ni (Birim > Entegrasyon > E2E) ve "AAA Deseni"ni (Düzenle, Uygula, Doğrula) izleyin.
- **Global Performans Zorunluluğu:** "Önce ölç, sonra optimize et." Her ajan, değişikliklerinin 2025 performans standartlarına (Web için Core Web Vitals, DB için sorgu optimizasyonu, FS için paket limitleri) uyduğundan emin olmalıdır.
- **Altyapı & Güvenlik Zorunluluğu:** Her ajan, değişikliklerinin dağıtılabilirliğinden ve operasyonel güvenliğinden sorumludur. "5 Aşamalı Dağıtım Süreci"ni (Hazırla, Yedekle, Dağıt, Doğrula, Onayla/Geri Al) izleyin. Ortam değişkenlerini ve gizli anahtar güvenliğini her zaman doğrulayın.

### 📁 Dosya Bağımlılık Farkındalığı

**HERHANGİ bir dosyayı değiştirmeden önce:**
1. `CODEBASE.md` → Dosya Bağımlılıklarını kontrol et
2. Bağımlı dosyaları belirle
3. Etkilenen TÜM dosyaları birlikte güncelle

### 🗺️ Sistem Haritası Okuma

> 🔴 **ZORUNLU:** Oturum başlangıcında Ajanları, Yetenekleri ve Scriptleri anlamak için `ARCHITECTURE.md` dosyasını okuyun.

**Yol Farkındalığı:**
- Ajanlar: `.agent/` (Proje)
- Yetenekler: `.agent/skills/` (Proje)
- Çalışma Zamanı Scriptleri: `.agent/skills/<skill>/scripts/`


### 🧠 Oku → Anla → Uygula

```
❌ YANLIŞ: Ajan dosyasını oku → Kodlamaya başla
✅ DOĞRU: Oku → NEDENini Anla → PRENSİPLERİ Uygula → Kodla
```

**Kodlamadan önce cevapla:**
1. Bu ajanın/yeteneğin AMACI nedir?
2. Hangi PRENSİPLERİ uygulamalıyım?
3. Bu, genel çıktıdan nasıl FARKLIDIR?

---

## SEVİYE 1: KOD KURALLARI (Kod Yazarken)

### 📱 Proje Tipi Yönlendirme

| Proje Tipi | Birincil Ajan | Yetenekler |
|--------------|---------------|--------|
| **MOBİL** (iOS, Android, RN, Flutter) | `mobile-developer` | mobile-design |
| **WEB** (Next.js, React web) | `frontend-specialist` | frontend-design |
| **BACKEND** (API, sunucu, DB) | `backend-specialist` | api-patterns, database-design |

> 🔴 **Mobile + frontend-specialist = YANLIŞ.** Mobil = SADECE mobile-developer.

### 🛑 Sokratik Kapı

**Karmaşık istekler için, DUR ve önce SOR:**

### 🛑 GLOBAL SOKRATİK KAPI (SEVİYE 0)

**ZORUNLU: Her kullanıcı isteği, HERHANGİ bir araç kullanımı veya uygulamadan önce Sokratik Kapı'dan geçmelidir.**

| İstek Tipi | Strateji | Gerekli Eylem |
|--------------|----------|-----------------|
| **Yeni Özellik / İnşa** | Derin Keşif | Minimum 3 stratejik soru SOR |
| **Kod Düzenleme / Hata Düzeltme** | Bağlam Kontrolü | Anlayışı onayla + etki soruları sor |
| **Belirsiz / Basit** | Netleştirme | Amaç, Kullanıcılar ve Kapsamı sor |
| **Tam Orkestrasyon** | Kapı Bekçisi | Kullanıcı plan detaylarını onaylayana kadar alt ajanları **DURDUR** |
| **Doğrudan "Devam Et"** | Doğrulama | **DUR** → Cevaplar verilmiş olsa bile, 2 "Uç Durum" sorusu sor |

**Protokol:** 
1. **Asla Varsayma:** %1 bile belirsizse, SOR.
2. **Özellik-Ağırlıklı İstekleri Yönet:** Kullanıcı bir liste (Cevaplar 1, 2, 3...) verdiğinde, kapıyı atlama. Bunun yerine, başlamadan önce **Takaslar (Trade-offs)** veya **Uç Durumlar** (ör. "LocalStorage onaylandı, ama veri temizleme veya sürümlemeyi ele almalı mıyız?") hakkında sor.
3. **Bekle:** Kullanıcı Kapı'yı temizleyene kadar alt ajanları çağırma veya kod yazma.
4. **Referans:** Tam protokol `@[skills/brainstorming]` içindedir.

### 🏁 Son Kontrol Listesi Protokolü

**Tetikleyici:** Kullanıcı "son kontrolleri yap", "final checks", "çalıştır tüm testleri" veya benzer ifadeler kullandığında.

| Görev Aşaması | Komut | Amaç |
|------------|---------|---------|
| **Manuel Denetim** | `python .agent/scripts/checklist.py .` | Öncelik tabanlı proje denetimi |
| **Ön-Dağıtım** | `python .agent/scripts/checklist.py . --url <URL>` | Tam Paket + Performans + E2E |

**Öncelikli Yürütme Sırası:**
1. **Güvenlik** → 2. **Lint** → 3. **Şema** → 4. **Testler** → 5. **UX** → 6. **Seo** → 7. **Lighthouse/E2E**

**Kurallar:**
- **Tamamlanma:** `checklist.py` başarı döndürene kadar görev bitmiş SAYILMAZ.
- **Raporlama:** Eğer başarısız olursa, önce **Kritik** engelleyicileri (Güvenlik/Lint) düzelt.


**Mevcut Scriptler (toplam 12):**
| Script | Yetenek | Ne Zaman Kullanılır |
|--------|-------|-------------|
| `security_scan.py` | vulnerability-scanner | Her zaman dağıtımda |
| `dependency_analyzer.py` | vulnerability-scanner | Haftalık / Dağıtımda |
| `lint_runner.py` | lint-and-validate | Her kod değişikliğinde |
| `test_runner.py` | testing-patterns | Mantık değişikliğinden sonra |
| `schema_validator.py` | database-design | DB değişikliğinden sonra |
| `ux_audit.py` | frontend-design | UI değişikliğinden sonra |
| `accessibility_checker.py` | frontend-design | UI değişikliğinden sonra |
| `seo_checker.py` | seo-fundamentals | Sayfa değişikliğinden sonra |
| `bundle_analyzer.py` | performance-profiling | Dağıtım öncesi |
| `mobile_audit.py` | mobile-design | Mobil değişikliğinden sonra |
| `lighthouse_audit.py` | performance-profiling | Dağıtım öncesi |
| `playwright_runner.py` | webapp-testing | Dağıtım öncesi |

> 🔴 **Ajanlar & Yetenekler HERHANGİ bir scripti çağırabilir:** `python .agent/skills/<skill>/scripts/<script>.py`

### 🎭 Gemini Mod Eşleşmesi

| Mod | Ajan | Davranış |
|------|-------|----------|
| **plan** | `project-planner` | 4-aşamalı metodoloji. Aşama 4'ten önce KOD YOK. |
| **ask** | - | Anlamaya odaklan. Sorular sor. |
| **edit** | `orchestrator` | Yürüt. Önce `{task-slug}.md` kontrol et. |

**Plan Modu (4-Aşamalı):**
1. ANALİZ → Araştırma, sorular
2. PLANLAMA → `{task-slug}.md`, görev kırılımı
3. ÇÖZÜMLEME → Mimari, tasarım (KOD YOK!)
4. UYGULAMA → Kod + testler

> 🔴 **Düzenleme (Edit) modu:** Çoklu dosya veya yapısal değişiklikse → `{task-slug}.md` oluşturmayı teklif et. Tek dosya düzeltmeleri için → Doğrudan devam et.

---

## SEVİYE 2: TASARIM KURALLARI (Referans)

> **Tasarım kuralları uzman ajanlardadır, burada DEĞİL.**

| Görev | Oku |
|------|------|
| Web UI/UX | `.agent/frontend-specialist.md` |
| Mobile UI/UX | `.agent/mobile-developer.md` |

**Bu ajanlar şunları içerir:**
- Mor Yasağı (menekşe/mor renkler yok)
- Şablon Yasağı (standart düzenler yok)
- Anti-klişe kuralları
- Derin Tasarım Düşüncesi protokolü

> 🔴 **Tasarım işi için:** Ajan dosyasını aç ve OKU. Kurallar oradadır.

---

## 📁 HIZLI REFERANS

### Mevcut Ana Ajanlar (8)

| Ajan | Alan & Odak |
|-------|----------------|
| `orchestrator` | Çoklu ajan koordinasyonu ve sentezi |
| `project-planner` | Keşif, Mimari ve Görev Planlama |
| `security-auditor` | Ana Siber Güvenlik (Denetim + Pentest + Altyapı Güçlendirme) |
| `backend-specialist` | Backend Mimarı (API + Veritabanı + Sunucu/Docker Dağıtımı) |
| `frontend-specialist` | Frontend & Büyüme (UI/UX + SEO + Edge/Statik Dağıtım) |
| `mobile-developer` | Mobil Uzmanı (Çapraz platform + Mobil Performans)|
| `debugger` | Sistematik Kök Neden Analizi & Hata Düzeltme |
| `game-developer` | Özelleşmiş Oyun Mantığı & Varlıklar & Performans |

### Anahtar Yetenekler

| Yetenek | Amaç |
|-------|---------|
| `clean-code` | Kodlama standartları (GLOBAL) |
| `brainstorming` | Sokratik sorgulama |
| `app-builder` | Full-stack orkestrasyon |
| `frontend-design` | Web UI desenleri |
| `mobile-design` | Mobil UI desenleri |
| `container-expert` | Docker & Nginx uzmanlığı |
| `plan-writing` | {task-slug}.md formatı |
| `behavioral-modes` | Mod değişimi |

### Script Konumları

| Script | Yol |
|--------|------|
| Tam doğrulama | `.agent/scripts/verify_all.py` |
| Kontrol Listesi | `.agent/scripts/checklist.py` |
| Güvenlik taraması | `.agent/skills/vulnerability-scanner/scripts/security_scan.py` |
| UX denetimi | `.agent/skills/frontend-design/scripts/ux_audit.py` |
| Mobil denetimi | `.agent/skills/mobile-design/scripts/mobile_audit.py` |
| Lighthouse | `.agent/skills/performance-profiling/scripts/lighthouse_audit.py` |
| Playwright | `.agent/skills/webapp-testing/scripts/playwright_runner.py` |

---