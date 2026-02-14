# Ring Planner (RingEditor)

Otobüs ve servis güzergahlarını, durakları ve ring hatlarını harita üzerinde görsel olarak planlamak ve yönetmek için geliştirilmiş web tabanlı bir araçtır.

## Özellikler

*   **Görsel Harita Yönetimi:** MapLibre & OpenStreetMap altyapısı ile güzergah çizimi.
*   **Akıllı Rota Sihirbazı:** Başlangıç ve bitiş noktaları arasında otomatik en kısa yol bulma (OSRM).
*   **Durak ve Hat Yönetimi:** Durakların ve ring hatlarının anlık düzenlenmesi.
*   **Modern Arayüz:** Next.js ve Material UI ile hızlı ve duyarlı kullanıcı deneyimi.

## Demo Yayını ve Dokümantasyon

Demo yayını yapmak, ücretsiz hosting servislerini kullanmak ve veritabanı kurulumu hakkında detaylı bilgi için **[DEMO.md](DEMO.md)** dosyasını inceleyebilirsiniz.

> **Not:** Veritabanı kurulumu için `aa.sql` (hassas veriler içerir) yerine, GitHub deposunda bulunan ve sadece tablo yapılarını içeren **`schema.sql`** dosyasını kullanmalısınız.


---

## Kurulum ve Çalıştırma

Projeyi çalıştırmak için iki yöntem mevcuttur: **Docker (Önerilen)** veya **Manuel Kurulum**.

### Yöntem 1: Docker ile Kurulum (Önerilen 🚀)

Bilgisayarınızda Docker ve Docker Compose yüklü olmalıdır.

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
    *   **Uygulama:** [http://localhost:3000](http://localhost:3000)
    *   **API:** [http://localhost:8080](http://localhost:8080)

*Not: Veritabanı (`aa.sql`) ilk kurulumda otomatik olarak içeri aktarılır.*

---

### Yöntem 2: Manuel Kurulum

Eğer Docker kullanmıyorsanız, her parçayı ayrı ayrı kurabilirsiniz.

#### Gereksinimler
*   Node.js (v18+)
*   PHP (v8.0+)
*   MySQL (v8.0)
*   Composer

#### 1. Veritabanı
*   MySQL'de `aa` adında boş bir veritabanı oluşturun.
*   Ana dizindeki `aa.sql` dosyasını bu veritabanına içe aktarın.

#### 2. Backend (PHP Slim)
```bash
cd ring-backend
composer install
cp .env.example .env
# .env dosyasını veritabanı bilgilerinizle düzenleyin
php -S localhost:8080 -t public
```

#### 3. Frontend (Next.js)
```bash
cd package
npm install
npm run dev
```
Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.
