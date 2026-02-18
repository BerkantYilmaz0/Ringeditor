# 🗺️ Ring Planner (RingEditor)

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![PHP](https://img.shields.io/badge/PHP-8.3-purple?style=flat-square&logo=php)
![Slim](https://img.shields.io/badge/Slim-4-green?style=flat-square&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)
![MapLibre](https://img.shields.io/badge/MapLibre-GL-blue?style=flat-square&logo=maplibre)

**Ring Planner**, kampüs veya şehir içi otobüs/servis güzergahlarını, durakları ve ring hatlarını harita üzerinde görsel olarak planlamak ve yönetmek için geliştirilmiş web tabanlı bir araçtır.

##  Özellikler

*   **🗺️ Görsel Harita Yönetimi:** MapLibre & OpenStreetMap altyapısı ile interaktif güzergah çizimi.
*   **📍 Akıllı Rota Sihirbazı:** OSRM entegrasyonu ile başlangıç ve bitiş noktaları arasında otomatik en kısa yol bulma.
*   **🚏 Durak ve Hat Yönetimi:** Durakların sürükle-bırak yöntemiyle düzenlenmesi ve hatlara atanması.
*   **⚡ Modern Arayüz:** Next.js ve Material UI ile geliştirilmiş, hızlı, duyarlı (responsive) ve kullanıcı dostu arayüz.
*   **🔒 Güvenli Altyapı:** PHP Slim Framework ile geliştirilmiş RESTful API ve güvenli veritabanı yapısı.

## 🛠️ Teknolojiler

Bu proje güncel ve performanslı teknolojiler kullanılarak geliştirilmiştir:

*   **Frontend:**
    *   [Next.js 14](https://nextjs.org/) (App Router)
    *   [React 18](https://react.dev/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Material UI (MUI)](https://mui.com/)
    *   [MapLibre GL JS](https://maplibre.org/)

*   **Backend:**
    *   [PHP 8.3](https://www.php.net/)
    *   [Slim Framework 4](https://www.slimframework.com/)
    *   [MySQL 8.0](https://www.mysql.com/)

*   **DevOps:**
    *   [Docker](https://www.docker.com/) & Docker Compose

## 📂 Proje Yapısı

```
RingEditor/
├── package/          # Next.js Frontend Uygulaması
├── ring-backend/     # PHP Slim Backend API Servisi
├── database/         # Veritabanı Şemaları (Schema & Seed)
├── docker-compose.yml # Docker Konfigürasyonu
```

## Kurulum ve Çalıştırma

Projeyi çalıştırmak için iki yöntem mevcuttur: **Docker (Önerilen)** veya **Manuel Kurulum**.

Satır satır detaylı kurulum, demo yayını ve Git'e yükleme adımları için lütfen aşağıdaki rehberleri inceleyin:

### Hızlı Kurulum

Bilgisayarınızda Docker ve Docker Compose yüklü ise:

1.  Projeyi klonlayın:
    ```bash
    git clone https://github.com/BerkantYilmaz0/RingEditor.git
    cd RingEditor
    ```

2.  Uygulamayı başlatın:
    ```bash
    docker-compose up --build -d
    ```

3.  Tarayıcıdan erişin:
    *   **Frontend:** [http://localhost:3000](http://localhost:3000)
    *   **Backend API:** [http://localhost:8080](http://localhost:8080)

*Not: `database/schema.sql` dosyası ilk kurulumda otomatik olarak veritabanına işlenir.*

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.
