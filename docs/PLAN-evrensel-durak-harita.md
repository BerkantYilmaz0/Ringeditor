# PLAN: Evrensel Durak ve MapLibre Harita Entegrasyonu

> **Amaç:** Google Maps benzeri bir deneyim için Leaflet'ten MapLibre GL'e geçiş yapmak ve durakları ringlerden ayırarak "Evrensel Durak" yapısına dönüştürmek.

## 1. Bağlam ve Hedef
Mevcut sistemde duraklar doğrudan bir Ring'e bağlıdır (`ring_type_id` ile). Kullanıcı, durakların bağımsız varlıklar olmasını ve Ringlerin bu duraklar üzerinden geçen rotalar olarak tanımlanmasını istemektedir. Ayrıca harita teknolojisi olarak vektör tabanlı **MapLibre GL** kullanılacaktır.

## 2. Kullanıcı İncelemesi Gerektirenler
> [!IMPORTANT]
> **Veri Göçü:** Mevcut duraklarınız korunacak, ancak aynı isimdeki/konumdaki duraklar birleştirilerek "Evrensel Durak" haline gelecektir.

> [!WARNING]
> **Harita Provider:** MapLibre ücretsizdir ancak kaliteli harita (Tile) sağlayıcısı için bir stil URL'sine (örn: CartoDB veya Stadia Maps) ihtiyacımız olacak. Varsayılan olarak ücretsiz CartoDB Dark Matter/Positron kullanacağım.

## 3. Önerilen Değişiklikler

### A. Veritabanı ve Backend (PHP/Slim)
Mevcut `ring_stops` tablosu parçalanarak normalize edilecek.

#### [MODIFY] `ring-backend/bin/setup_db_schema.php`
- [NEW] `stops` tablosu: `id, name, lat, lng, description`
- [NEW] `ring_stop_pivot` tablosu: `ring_id, stop_id, sequence_order`
- [MIGRATION] Eski verileri yeni yapıya taşıyan bir SQL betiği.

#### [MODIFY] `ring-backend/src/Application/Actions/RingStops/`
- `CreateRingStopAction.php`: Artık yeni durak oluşturma VE ringe bağlama işlemini yönetecek.
- `ListRingStopsAction.php`: Join sorgusu ile verileri getirecek.
- [NEW] `Actions/Stops/`: Sadece evrensel durakları yöneten API endpointleri (`CreateStop`, `ListStops`, `UpdateStop`).

### B. Frontend (Next.js)

#### [NEW] Harita Altyapısı
- `package.json`: `maplibre-gl`, `react-map-gl` eklenmesi.
- `src/components/map/MapLibreBoard.tsx`: Yeni ana harita bileşeni.
- `src/components/map/RouteDrawer.tsx`: Çizim ve rota düzenleme aracı.

#### [MODIFY] Sayfa Yapısı
- **Ring Tipleri Sayfası:** Harita kaldırılacak. Sadece Ad, Renk, Tip seçimi kalacak.
- **[NEW] Durak Yönetimi Sayfası (`/stops`):**
  - Tam ekran (veya geniş) MapLibre haritası.
  - Sol/Alt panelde Ring seçimi.
  - "Yeni Durak Ekle" ve "Ringe Durak Ekle" modları.

## 4. Görev Adımları (Task Breakdown)

### Aşama 1: Altyapı ve Veritabanı
- [ ] Backend: `stops` ve pivot tabloları oluştur.
- [ ] Backend: Mevcut veriyi göç (migrate) ettir.
- [ ] Backend: `Stops` CRUD API'lerini yaz.
- [ ] Backend: `RingStops` mantığını "Link" mantığına çevir.

### Aşama 2: Frontend Harita Kurulumu
- [ ] Frontend: MapLibre kütüphanelerini kur.
- [ ] Frontend: `MapLibreBoard` bileşenini oluştur (Temel harita render).
- [ ] Frontend: `RingTypes` sayfasından eski haritayı kaldır.

### Aşama 3: Etkileşim ve Özellikler
- [ ] Frontend: Durakları haritada "Marker" olarak göster (Evrensel).
- [ ] Frontend: Rota çizim aracı (LineString) ekle.
- [ ] Frontend: "Ringe Durak Ekleme" akışını yap (Haritadan durak seç -> Ringe bağla).

## 5. Doğrulama Planı (Verification)

### Otomatik Testler
Backend API testleri `phpunit` ile (eğer test klasörü varsa) veya manuel `curl` istekleriyle:
- `POST /stops` -> Yeni evrensel durak oluşturuyor mu?
- `POST /rings/{id}/stops` -> Durağı ringe bağlıyor mu?

### Manuel Doğrulama
1. **Veri Kontrolü:** SQLite tarayıcısı ile tabloların ayrıldığını doğrula.
2. **Harita:** Haritanın yüklendiğini, zoom/pan yapıldığını gör.
3. **Senaryo:**
   - Yeni bir durak ekle ("Kütüphane").
   - Kırmızı Ring oluştur.
   - Kırmızı Ring'e "Kütüphane" durağını ekle.
   - Mavi Ring oluştur.
   - Mavi Ring'e de aynı "Kütüphane" durağını ekle.
   - Durak ismini değiştir -> İki ringde de değiştiğini gör.
