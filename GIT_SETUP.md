# Git Hazırlık ve Kurulum Rehberi

Bu proje Git'e yüklenmeye hazır hale getirilmiştir. Hassas verilerin (veritabanı, şifreler) sızmasını önlemek için aşağıdaki adımlar uygulanmıştır.

## 1. Hassas Dosyaların İzolasyonu

Aşağıdaki dosyalar `.gitignore` dosyasına eklenerek Git takibinden çıkarılmıştır:
- `aa.sql` (Gerçek müşteri/araç verilerini içerir)
- `.env` (Veritabanı şifreleri ve API anahtarlarını içerir)
- `vendor/` ve `node_modules/` (Bağımlılık kütüphaneleri)

## 2. Test Edecekler İçin Kurulum (Geliştirici Rehberi)

Projeyi indiren bir kişinin sistemi çalıştırabilmesi için aşağıdakiler hazırlanmıştır:

### A. Veritabanı Kurulumu
Gerçek veritabanı yerine, sadece tablo yapısını içeren güvenli bir şema dosyası oluşturuldu:
`database/schema.sql`

Kurulum için:
1. Yerel veritabanında `aa` isminde boş bir veritabanı oluşturun.
2. `database/schema.sql` dosyasını içe aktarın.
3. (Opsiyonel) Test için `database/seed.sql` dosyasındaki sahte verileri yükleyin.

### B. Konfigürasyon
Projeyi ayağa kaldırmak için `.env` dosyasının bir kopyasını oluşturun:

**Backend için:**
`ring-backend/.env.example` dosyasını `ring-backend/.env` olarak kopyalayın ve içini doldurun:
```ini
DB_HOST=localhost
DB_NAME=aa
DB_USER=root
DB_PASS=
```

## 3. Git'e Yükleme Adımları

Terminalden şu komutları çalıştırarak projeyi güvenle yükleyebilirsiniz:

```bash
# 1. Git'i başlat (eğer başlatılmadıysa)
git init

# 2. Dosyaları ekle (gitignore kurallarına uyarak)
git add .

# 3. İlk commit'i oluştur
git commit -m "Proje başlangıç kurulumu - Hassas veriler temizlendi"

# 4. Uzak sunucuya (GitHub/GitLab) gönder
git remote add origin https://github.com/KULLANICI_ADI/ring-planner.git
git push -u origin master
```
