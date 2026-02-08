# PLAN - Durak ve Güzergah Yönetimi Revizyonu

Bu plan, `docs/artifacts/brainstorm_stops_page.md` belgesindeki kararlar doğrultusunda, Durak ve Güzergah yönetiminin tek bir sayfada birleştirilmesini ve kullanıcı deneyiminin iyileştirilmesini hedefler.

## 🎯 Hedef
`src/app/(DashboardLayout)/stops/page.tsx` sayfasını, hem Nokta Durakları (Stops) hem de Çizgi Güzergahları (Routes) yönetecek şekilde evrimleştirmek.

## 🏗️ Mimari Kararlar
1.  **Tek Sayfa Yapısı:** Sayfa sol üstte bir "Switch/Toggle" (`Duraklar | Güzergahlar`) ile mod değiştirecek.
2.  **Veritabanı:** Güzergah verileri için yeni bir `routes` tablosu oluşturulacak.
3.  **Zen Modu:** Güzergah çizimi sırasında yan paneller gizlenip harita tam ekran olacak.
4.  **Varsayılan Konum:** Harita açılışı Ankara Pursaklar (`40.0381, 32.9034`) merkezli olacak.

---

## 📅 Uygulama Planı

### Faz 1: Backend ve Veritabanı (@backend-specialist)
Güzergah verilerini saklamak için altyapının hazırlanması.

- [ ] **Tablo Oluşturma (`routes`)**
    - `id` (int, PK)
    - `name` (varchar)
    - `ring_type_id` (int, FK -> ring_types)
    - `geometry` (longtext/json) - GeoJSON LineString verisi
    - `color` (varchar) - Opsiyonel, RingTipinden override etmek için
    - `description` (text)
- [ ] **API Endpointleri**
    - `POST /routes`: Yeni güzergah oluşturma.
    - `GET /routes`: Tüm güzergahları listeleme.
    - `GET /routes/{id}`: Tekil güzergah detayı.
    - `PUT /routes/{id}`: Güzergah güncelleme (Geometri dahil).
    - `DELETE /routes/{id}`: Güzergah silme.
- [ ] **Mevcut API Güncellemeleri**
    - `RingTypes` ile `Routes` arasındaki ilişkiyi entegre et.
- [ ] Authorization
    - Sadece admin mi yoksa belirli roller mi?
    - API'de middleware kontrolü
    - Frontend'de buton görünürlüğü

### Faz 2: Frontend Arayüz İskeleti (@frontend-specialist)
Mevcut durak sayfasının "Modlu" yapıya dönüştürülmesi.

- [ ] **Toggle Bileşeni**
    - Sayfa başına `ToggleButtonGroup` (Duraklar | Güzergahlar) ekle.
    - State yönetimi: `viewMode: 'stops' | 'routes'`.
- [ ] **Panel Ayrımı**
    - Mevcut listeyi `<StopsPanel />` bileşenine taşı.
    - Yeni `<RoutesPanel />` bileşeni oluştur (Şimdilik boş).
- [ ] **MapLibreBoard Güncellemesi**
    - `mode` prop'u ekle.
    - Mod değişiminde marker/line görünürlüklerini ayarla.
    - Varsayılan merkezi Ankara Pursaklar yap.
- [ ] Harita Başlangıç Ayarları
    - Eğer duraklar varsa: Tüm durakları içine alan bounds
    - Durak yoksa: Ankara Pursaklar
    - Zoom seviyesi: 12-14 arası

### Faz 3: Güzergah Yönetimi ve Çizim (@frontend-specialist)
Güzergah oluşturma ve harita etkileşimleri.

- [ ] **Güzergah Listesi (RoutesPanel)**
    - Veritabanından çekilen rotaları listele.
    - "Yeni Güzergah Ekle" butonu.
- [ ] **Güzergah Ekleme Modalı**
    - Ad girme.
    - Bağlı olduğu Ring Tipini seçme (Select input).
    - Renk seçimi (Otomatik Ring rengi veya manuel).
- [ ] **Zen Modu ve Çizim**
    - Modalda "Çizime Başla" denince sidebar gizlenir.
    - Haritada `DrawLineString` modu aktif olur.
    - "Kaydet" ve "İptal" butonları harita üzerinde belirir.
- [ ] **Düzenleme/Silme**
    - Listeden seçilen rotayı haritada odakla.
    - Düzenle butonu ile geometriyi tekrar edilebilir yap.

### Faz 4: Durak Etkileşim İyileştirmeleri (@frontend-specialist)
Kullanıcının özel istekleri.

- [ ] **Çift Tıklama ile Düzenle**
    - Haritadaki durak markerına çift tıklayınca (doubleClick) düzenleme modalını aç.
    - Haritanın varsayılan `doubleClickZoom` özelliğini kapat.
- [ ] **Listeden Haritaya Git**
    - Listede durağa tıklayınca haritada o noktaya `flyTo` yap.

---

## ✅ Doğrulama Kriterleri
- [ ] `/routes` API'si GeoJSON verisini doğru kaydedip okuyabiliyor mu?
- [ ] Toggle ile geçiş yaparken harita titriyor mu? (Yeniden yüklenmemeli).
- [ ] Zen modunda çizim yapıp kaydedince haritaya yeşil/mavi çizgi geliyor mu?
- [ ] Duraklar listesinden birine tıklayınca kamera oraya uçuyor mu?
