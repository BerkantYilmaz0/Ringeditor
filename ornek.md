# 🔍 Plan A+ — Kapsamlı Güvenlik ve Kalite Denetimi (Genişletilmiş)

## 🛠️ Teknoloji Stack
- **Frontend:** Next.js 15 (React 19)
- **Backend:** Slim PHP Framework
- **Dil:** TypeScript (Frontend) / PHP (Backend)

---

## 🔴 Faz 1: Kritik Güvenlik Katmanı

### 1. Backend Güvenlik Taraması (Slim PHP)
- **Slim Framework Güvenlik**
  - Middleware sıralaması ve route protection
  - Route grupları ve auth middleware kullanımı
  - Container dependency injection güvenliği
  - Error handler ve error middleware yapılandırması
- **Oturum yönetimi**
  # Plan A — Kapsamli Guvenlik ve Kalite Denetimi (Sade)

  ## Kapsam ve Amac
  - Backend ve frontend guvenlik aciklarini bulmak.
  - SQL aciklari ve riskli sorgulari tespit etmek.
  - Login olmadan erisim olmamasi gereken endpointleri dogrulamak.
  - TypeScript tarafinda `any` kullanimlarini kaldirmak ve dogru tipleri netlestirmek.
  - Kod tekrari ve gereksiz yorumlari temizlemek.

  ---

  ## 1) Hedef Liste ve Cikti
  - Kritik riskler (guvenlik, SQL, yetkilendirme) icin bulgu listesi
  - Orta/dusuk riskli noktalar (kod kalitesi, yorum, tekrar) icin backlog listesi
  - Onceliklendirilmis duzeltme oneri listesi

  ---

  ## 2) Backend Guvenlik ve Auth
  - Session middleware ve route koruma sirasi
  - Public ve protected route ayrimi (login disinda erisilemez politikasi)
  - CORS konfigurasyonu (origin, credentials, preflight)
  - Error handler ve debug cikti riskleri
  - Guvenlik basliklari (CSP, HSTS, X-Frame-Options, nosniff)

  ---

  ## 3) SQL Guvenligi
  - Dinamik SQL ve string birlestirme kontrolu
  - Prepared statement kullanimi ve placeholder dogrulugu
  - Input validation ve tip casting kontrolu

  ---

  ## 4) API Erisim Politikasi
  - Disaridan erisilemeyecek API route listesi
  - Zorunlu public endpoint listesi (login, health vb.)
  - Route whitelisting ve auth middleware kapsam kontrolu

  ---

  ## 5) TypeScript Tip Guvenligi
  - `any` kullanim envanteri ve kaldirma plani
  - Route ve DTO tiplerinin netlestirilmesi
  - Event handler ve third-party tip iyilestirmeleri

  ---

  ## 6) Kod Tekrari ve Yorumlar
  - Tekrarlanan islev ve yapilarin listesi
  - Gereksiz/yanlis yorumlarin kaldirilmasi
  - Ingilizce yorumlarin Turkceye cevrilmesi (gerekliyse)

  ---

  ## 7) Sonraki Adimlar
  - Bulgu raporu ciktisi
  - Kucuk refactor ve tip duzeltmeleri icin hizli PR listesi
  - Buyuk refactorlar icin fazli plan

  ---

  **Son Guncelleme:** 2026-02-11
  **Durum:** Inceleme Bekliyor