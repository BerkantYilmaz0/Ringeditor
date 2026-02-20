# Ring Planner (RingEditor)

> **Bu proje ticari amaçla kullanılmak üzere geliştirilmemiştir.** Kişisel gelişim ve öğrenme amacıyla oluşturulmuş bir portföy projesidir.Ticari amaçla kullanılamaz.

**[Canlı Demo](http://byilmaz.tech/)** · Demo giriş: `admin` / `1234`

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![PHP](https://img.shields.io/badge/PHP-8.3-purple?style=flat-square&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Kampüs veya şehir içi ring hatlarını, güzergahları ve durakları harita üzerinde planlamak ve yönetmek için geliştirilmiş full-stack bir web uygulaması. Harita üzerinde interaktif olarak güzergah çizip, durakları sürükle-bırak ile yönetebilir, OSRM ile otomatik en kısa yolu hesaplayabilirsiniz.

---

## Proje ne yapar?

- **Güzergah Çizimi** — MapLibre ve OpenStreetMap üzerinde interaktif harita ile doğrudan güzergah oluşturma
- **Otomatik Rota Hesaplama** — OSRM entegrasyonu sayesinde iki nokta arasında en kısa yolu otomatik bulma
- **Durak Yönetimi** — Durakları harita üzerinde oluşturma, sürükle-bırak ile sıralama, hatlara atama
- **Şablon Sistemi** — Tekrarlayan sefer planlarını şablon olarak kaydetme ve uygulama
- **Sefer (Job) Planlama** — Hat bazlı sefer oluşturma, çakışma kontrolü, toplu atama
- **Dashboard** — Genel istatistikleri ve özet bilgileri gösteren yönetim paneli
- **Araç Takibi** — Hangi aracın hangi hatta görevli olduğunu yönetme


---

## Teknoloji Stack

| Katman | Teknolojiler |
|--------|-------------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Material UI, MapLibre GL JS |
| **Backend** | PHP 8.3, Slim Framework 4, JWT Auth (firebase/php-jwt) |
| **Veritabanı** | MySQL 8.0 |
| **Harita** | MapLibre GL JS, OpenStreetMap, OSRM |
| **DevOps** | Docker & Docker Compose, Railway |

---

## Proje Yapısı

```
ring-planner/
├── package/              # Next.js frontend
│   ├── src/
│   │   ├── app/          # Sayfalar (App Router)
│   │   ├── lib/          # API client, yardımcı fonksiyonlar
│   │   └── ...
│
├── ring-backend/         # PHP Slim backend
│   ├── app/              # Ayarlar, route'lar, middleware, DI
│   ├── src/
│   │   ├── Application/  # Action'lar, Middleware, Service'ler
│   │   ├── Domain/       # Entity'ler, Repository interface'leri
│   │   └── Infrastructure/ # Repository implementasyonları
│
├── database/
│   └── schema.sql        # Veritabanı şeması
```

---

## Kurulum

### Docker ile (Önerilen)

En hızlı yol. Docker ve Docker Compose yüklü olması yeterli.

```bash
# 1. Klonla
git clone https://github.com/BerkantYilmaz0/RingEditor.git
cd RingEditor

# 2. Ortam değişkenlerini ayarla
cp .env.example .env
# .env dosyasını aç, JWT_SECRET'ı güçlü bir değerle değiştir

# 3. Çalıştır
docker-compose up --build -d
```

İlk çalıştırmada `database/schema.sql` otomatik olarak veritabanına yüklenir (tablolar + örnek veriler).

| Servis | Adres |
|--------|-------|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |
| phpMyAdmin | http://localhost:8081 |

---

### Manuel Kurulum

Docker kullanmadan her parçayı ayrı ayrı kurabilirsiniz.

**Gereksinimler:** Node.js v18+, PHP 8.0+ (pdo_mysql, json), MySQL 8.0, Composer

#### Veritabanı

```bash
# MySQL'de veritabanı oluşturup schema'yı import edin
mysql -u root -p -e "CREATE DATABASE ringeditor;"
mysql -u root -p ringeditor < database/schema.sql
```

#### Backend

```bash
cd ring-backend
composer install
cp .env.example .env
# .env dosyasını düzenle: DB bilgileri, JWT_SECRET
php -S localhost:8080 -t public
```

#### Frontend

```bash
cd package
npm install
# .env.local oluştur (isteğe bağlı, varsayılan API adresi zaten ayarlı)
npm run dev
```

Uygulama http://localhost:3000 adresinde açılacaktır.

---
---

## API Yapısı

Tüm endpoint'ler `/login` ve `/logout` dışında JWT token gerektirir.

| Yöntem | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/login` | Giriş yap, JWT token al |
| POST | `/logout` | Çıkış yap |
| GET | `/stops` | Tüm durakları listele |
| POST | `/stops` | Yeni durak oluştur |
| GET | `/routes` | Tüm güzergahları listele |
| POST | `/routes` | Yeni güzergah oluştur |
| GET | `/ring-types` | Ring tiplerini listele |
| GET | `/ring-stops/{id}` | Bir ringin duraklarını listele |
| GET | `/jobs` | Seferleri listele |
| GET | `/templates` | Şablonları listele |
| GET | `/device` | Araçları listele |
| GET | `/dashboard/stats` | Dashboard istatistikleri |

---

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.
