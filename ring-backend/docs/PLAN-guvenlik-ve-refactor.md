# 🛡️ PLAN: Ring Backend Güvenlik ve İyileştirme

**Hedef:** Mevcut Slim Framework + PDO mimarisini **bozmadan**, tespit edilen kritik güvenlik açıklarını kapatmak ve kod kalitesini (Type Safety) artırmak.

**Strateji:** "Önce Güvenlik, Sonra Kalite" sırasıyla ilerlenecek.

---

## 🚨 Risk Analizi ve Öncelik Sıralaması

| Risk Seviyesi | Kategori | Sorun | Çözüm |
| :--- | :--- | :--- | :--- |
| **P0 (Kritik)** | 🔓 Güvenlik | `.env` dosyası Git'e açık | `.gitignore` güncellenecek |
| **P0 (Kritik)** | 💉 Güvenlik | `getBetween` metodunda SQL Injection riski | Manuel string birleştirme yerine `Build-Query` mantığı veya tamamen parametrik yapı |
| **P1 (Yüksek)** | 🔑 Auth | Auth kontrolü yetersiz (Herkes erişebilir) | DB tabanlı `User` doğrulaması ve JWT/Session yapısı entegrasyonu |
| **P2 (Orta)** | 🛡️ Validasyon | `JobsValidator` manuel ve gevşek kontrol | Katı tip (Strict Type) kontrolleri ve `Assert` kütüphanesi kullanımı |
| **P3 (Düşük)** | 🧹 Kod Kalitesi | Eksik Return Type ve Property Type tanımları | Tüm sınıflara PHP 7.4+ Tip Tanımlamaları eklenmesi |

---

## 🗺️ Uygulama Planı

### Aşama 1: Sızıntıların Kapatılması (Acil)
*Görevli Ajan: `security-auditor` (Ben)*

1.  **Git Temizliği:**
    *   `.gitignore` dosyasına `.env` ve hassas klasörler eklenecek.
    *   Geçmişten gelen hassas veriler varsa temizlenecek (Best effort).
2.  **SQL Enjeksiyon Fix:**
    *   `JobsRepository::getBetween` metodu refactor edilecek.
    *   `$sql .= " AND ..."` şeklindeki dinamik sorgular güvenli parametre bağlama yöntemine çevrilecek.

### Aşama 2: Kimlik Doğrulama (Authentication)
*Görevli Ajan: `backend-specialist` (Ben)*

1.  **User Entity Aktivasyonu:**
    *   `InMemoryUserRepository` yerine gerçek veritabanı tablosu (`users`) kullanılacak.
    *   Şifreleme (`password_hash`) ile `User` oluşturma scripti hazırlanacak.
2.  **Login Endpoint:**
    *   `POST /login` endpoint'i yazılacak.
    *   Başarılı girişte Token (veya güvenli Session ID) dönecek.
3.  **Middleware Güncellemesi:**
    *   `SessionMiddleware` yeniden yazılarak, gelen isteğin Token/Session geçerliliğini **User tablosundan** veya **JWT imzasından** doğrulaması sağlanacak.

### Aşama 3: Tip Güvenliği ve Validasyon (Refactor)
*Görevli Ajan: `clean-code` & `backend-specialist` (Ben)*

1.  **Strict Typing:**
    *   Tüm kritik dosyalara (`Actions`, `Repositories`) `declare(strict_types=1);` eklenecek.
    *   Metotlara eksik olan `int`, `string`, `array`, `void` tip tanımları (Type Hints) eklenecek.
2.  **Güçlü Validasyon:**
    *   `JobsValidator` sınıfındaki manuel `if` blokları revize edilecek.
    *   Gelen verilerin tipleri (`ctype_digit`, `is_numeric` yerine `(int)$val === $val`) kesin olarak kontrol edilecek.
    *   "Typescript-like" güvenilirlik için Request verilerini karşılayan basit DTO (Data Transfer Object) sınıfları veya array shape tanımları kullanılacak.

---

## 🛠️ Ajan Atamaları

Bu planı hayata geçirmek için aşağıdaki yetenek setlerini kullanacağım:

1.  **`security-auditor`**: Açıkları kapatma (Aşama 1).
2.  **`backend-specialist`**: Auth ve DB işlemleri (Aşama 2).
3.  **`clean-code`**: Refactoring ve Tipleme (Aşama 3).

## 🚀 Başlama Komutu

Planı onaylıyorsanız, **Aşama 1**'den başlamak için talimat verin.
