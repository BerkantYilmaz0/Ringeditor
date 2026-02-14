# Demo Yayını İçin Rehber

Bu proje, frontend (Next.js) ve backend (PHP Slim) olmak üzere iki ana parçadan oluşmaktadır. Demo yayını yapmak için her iki parçayı da uygun sunuculara yüklemeniz gerekmektedir.

## Önerilen Ücretsiz/Ucuz Servisler

Demo yayını için aşağıdaki servisleri kullanabilirsiniz:

### Frontend (Next.js)
*   **Vercel:** Next.js'in yaratıcılarından. En iyi uyumluluk ve performans. Ücretsiz hobi planı mevcuttur.
*   **Netlify:** Statik ve dinamik siteler için popüler bir alternatif. Github entegrasyonu ile kolay dağıtım.

### Backend (PHP) & Veritabanı (MySQL)
*   **Railway:** Hem PHP uygulamasını hem de MySQL veritabanını barındırabilirsiniz. Kullanımı çok kolaydır. (Deneme süresi veya düşük ücretli planları olabilir)
*   **Render:** Web servisleri (PHP Docker container ile) ve veritabanı sunar. Ücretsiz planları mevcuttur (ancak uyku modu olabilir).
*   **Heroku:** PHP için klasik bir seçenek. Artık tam ücretsiz planı olmayabilir ancak "Eco" planları uygundur.
*   **InfinityFree:** Ücretsiz PHP ve MySQL hosting sağlayan klasik bir hosting firması. Kurulumu FTP ile yapmanız gerekebilir.

---

## Adım Adım Kurulum Rehberi

### 1. Hazırlık
Projenin GitHub deposunda `aa.sql` (tam veritabanı) **yer almamaktadır**. Güvenlik nedeniyle sadece tablo yapılarını içeren `schema.sql` dosyası bulunmaktadır.
Demo ortamı kurarken veritabanınızı oluşturmak için `schema.sql` dosyasını kullanın ve ardından demo için gerekli örnek verileri (kullanıcılar, rotalar vb.) manuel olarak veya kendi oluşturduğunuz bir SQL scripti ile ekleyin.

### 2. Frontend Dağıtımı (Vercel Örneği)
1.  GitHub deponuzu Vercel'e bağlayın.
2.  Yeni proje oluştururken `package` klasörünü (frontend'in bulunduğu dizin) "Root Directory" olarak seçin.
3.  Çevresel Değişkenler (Environment Variables):
    *   Backend API adresini belirtmek için gerekli environment değişkenlerini ekleyin (örn. `NEXT_PUBLIC_API_URL`).

### 3. Backend Dağıtımı (Render/Railway Örneği)
1.  GitHub deponuzu servise bağlayın.
2.  `ring-backend` klasörünü root olarak ayarlayın veya Dockerfile kullanarak tüm projeyi build edin.
3.  Environment Variables:
    *   Veritabanı bağlantı bilgilerini (Host, User, Pass, DB Name) servis sağlayıcınızın paneline girin.
    *   Bu bilgiler `.env` dosyasında **tutulmamalı**, sunucu panelinden girilmelidir.

### 4. Bağlantı Kontrolü
Frontend uygulamanızın, Backend API adresine doğru istek attığından ve Backend'in veritabanına bağlanabildiğinden emin olun.

## Önemli Notlar
*   **Güvenlik:** Canlı ortamda `.env` dosyalarını asla sunucuda herkese açık bırakmayın.
*   **Lisans:** Bu proje CC BY-NC 4.0 ile lisanslanmıştır. Demo yayınınızın ticari amaç gütmediğinden emin olun.
