## 🧠 Beyin Fırtınası: Durak ve Güzergah Yönetimi (Tek Sayfa vs Çok Sayfa)

### Bağlam
Kullanıcı, "Güzergahlar" için ayrı bir sayfa yerine, mevcut `Stops` sayfasında sol üstte bir **Toggle/Switch** ile mod değişimi (Duraklar <-> Güzergahlar) yapılmasını önerdi.

---

### Konu: Sayfa Yapısı

#### Seçenek A: Ayrı Sayfalar (Stops Page & Routes Page)
`stops/page.tsx` ve `routes/page.tsx`.
✅ **Avantajlar:** Kod ayrımı temizdir.
❌ **Dezavantajlar:** Sayfa geçişinde harita yeniden yüklenir (UX kaybı).

#### Seçenek B: Tek Sayfa + Toggle (Modlu Yapı) - **Kullanıcı Önerisi**
`stops/page.tsx` içinde bir `state` tutulur: `viewMode: 'stops' | 'routes'`.

✅ **Avantajlar:**
- **Harita Sürekliliği:** Mod değiştirirken harita yeniden yüklenmez (sadece katmanlar/layerlar değişir).
- **Bütünleşik Deneyim:** Kullanıcı durak ekleyip hemen güzergah moduna geçip o durağı bağlayabilir.
- **Hız:** Çok daha seri bir kullanım sunar.

❌ **Dezavantajlar:**
- **Kod Karmaşıklığı:** `page.tsx` içindeki state yönetimi artar. (Bunu komponentlere bölerek çözeriz: `StopsSidebar`, `RoutesSidebar`).

---

### Veri Yapısı (Yinelendi)
Arayüz tek sayfa olsa bile, **Veritabanı** hala ayrı olmalıdır.
1.  **`stops` tablosu:** Nokta verileri (ad, lat, lng).
2.  **`routes` tablosu (veya `ring_types` içinde):** Çizgi verileri (GeoJSON).

---

### Yeni Akış Tasarımı (Toggle Modu)

1.  **Varsayılan Görünüm (Duraklar Modu):**
    *   Sol Panel: Durak Listesi, "Yeni Durak Ekle" butonu.
    *   Harita: Sadece durak pinleri (marker) görünür, tıklayınca durak detayı/düzenleme açılır.

2.  **Mod Değişimi:**
    *   Sol üstteki "Segmented Control" (iPhone tarzı switch) veya Tab ile **"Güzergahlar"** seçilir.

3.  **Güzergahlar Modu:**
    *   Sol Panel: Tanımlı Güzergahlar/Ring Tipleri listesi.
    *   Harita: Çizilmiş güzergahlar (LineString) görünür. Durak pinleri "pasif" veya "yardımcı" olarak görünür kalabilir.
    *   **Yeni Güzergah:** "Yeni Ekle" -> Modal (Ad, Renk seç) -> **Zen Modu Çizim** (Sidebar kapanır, çizim başlar).

---

## 💡 Güncellenmiş Öneri

**Seçenek B (Tek Sayfa + Toggle)** kesinlikle daha modern ve kullanıcı dostu bir deneyim sunar.

**Uygulama Adımları:**
1.  **Veritabanı:** `routes` tablosunu oluşturacağım (Ring Tiplerine esneklik sağlamak için ayrı tablo daha iyi, her Ring Tipine 1 veya N rota bağlanabilir).
2.  **UI:** `stops/page.tsx`'e bir `ToggleButtonGroup` ekleyeceğim.
3.  **State:**
    *   `mode`: 'stops' | 'routes'
    *   `StopsPanel`: Mevcut liste bileşeni.
    *   `RoutesPanel`: Yeni bileşen. Ring/Güzergah listesi.
4.  **Harita:** `MapLibreBoard` bileşenine `mode` prop'u geçeceğim. Mod'a göre tıklama davranışları (`onClick`) ve gösterilen katmanlar değişecek.

Bu yapıyı onaylıyor musunuz? Onaylarsanız `routes` tablosunu oluşturup sayfayı bu "Toggle" yapısına çevireceğim.
