# Android Platform Kılavuzları

> Material Design 3 esasları, Android tasarım gelenekleri, Roboto tipografisi ve yerel desenler.
> **Android cihazlar için geliştirme yaparken bu dosyayı okuyun.**

---

## 1. Material Design 3 Felsefesi

### Temel Material Prensipleri

```
METAFOR OLARAK MATERIAL:
├── Yüzeyler 3B uzayda var olur
├── Işık ve gölge hiyerarşiyi tanımlar
├── Hareket süreklilik sağlar
└── Cesur, grafik, kasıtlı tasarım

UYARLANABİLİR TASARIM:
├── Cihaz yeteneklerine yanıt verir
├── Tüm form faktörleri için tek UI
├── Duvar kağıdından dinamik renk
└── Kullanıcı başına kişiselleştirilmiş

VARSAYILAN OLARAK ERİŞİLEBİLİR:
├── Büyük dokunma hedefleri
├── Net görsel hiyerarşi
├── Semantik renkler
└── Hareket tercihlere saygı duyar
```

### Material Tasarım Değerleri

| Değer | Uygulama |
|-------|----------------|
| **Dinamik Renk** | Renkler duvar kağıdına/kullanıcı tercihine uyum sağlar |
| **Kişiselleştirme** | Kullanıcıya özel temalar |
| **Erişilebilirlik** | Her bileşene yerleşik |
| **Duyarlılık** | Tüm ekran boyutlarında çalışır |
| **Tutarlılık** | Birleşik tasarım dili |

---

## 2. Android Tipografisi

### Roboto Font Ailesi

```
Android Sistem Fontları:
├── Roboto: Varsayılan sans-serif
├── Roboto Flex: Değişken font (API 33+)
├── Roboto Serif: Serif alternatifi
├── Roboto Mono: Eş aralıklı (Monospace)
└── Google Sans: Google ürünleri (özel lisans)
```

### Material Tip Ölçeği

| Rol | Boyut | Ağırlık | Satır Yüksekliği | Kullanım |
|------|------|--------|-------------|-------|
| **Display Large** | 57sp | Regular | 64sp | Kahraman metin, splash |
| **Display Medium** | 45sp | Regular | 52sp | Büyük başlıklar |
| **Display Small** | 36sp | Regular | 44sp | Orta başlıklar |
| **Headline Large** | 32sp | Regular | 40sp | Sayfa başlıkları |
| **Headline Medium** | 28sp | Regular | 36sp | Bölüm başlıkları |
| **Headline Small** | 24sp | Regular | 32sp | Alt bölümler |
| **Title Large** | 22sp | Regular | 28sp | Diyaloglar, kartlar |
| **Title Medium** | 16sp | Medium | 24sp | Listeler, navigasyon |
| **Title Small** | 14sp | Medium | 20sp | Sekmeler, ikincil |
| **Body Large** | 16sp | Regular | 24sp | Birincil içerik |
| **Body Medium** | 14sp | Regular | 20sp | İkincil içerik |
| **Body Small** | 12sp | Regular | 16sp | Altyazılar |
| **Label Large** | 14sp | Medium | 20sp | Butonlar, FAB |
| **Label Medium** | 12sp | Medium | 16sp | Navigasyon |
| **Label Small** | 11sp | Medium | 16sp | Çipler, rozetler |

### Ölçeklenebilir Pikseller (sp)

```
sp = Scale-independent pixels (Ölçekten bağımsız piksel)

sp şunlarla otomatik olarak ölçeklenir:
├── Kullanıcı font boyutu tercihi
├── Ekran yoğunluğu
└── Erişilebilirlik ayarları

KURAL: Metin için HER ZAMAN sp, diğer her şey için dp kullanın.
```

### Font Ağırlığı Kullanımı

| Ağırlık | Kullanım Durumu |
|--------|----------|
| Regular (400) | Gövde metni, display |
| Medium (500) | Butonlar, etiketler, vurgu |
| Bold (700) | Nadiren, sadece güçlü vurgu |

---

## 3. Material Renk Sistemi

### Dinamik Renk (Material You)

```
Android 12+ Dinamik Renk:

Kullanıcının duvar kağıdı → Renk çıkarma → Uygulama teması

Uygulamanız otomatik olarak şunlara uyum sağlar:
├── Birincil renk (duvar kağıdından)
├── İkincil renk (tamamlayıcı)
├── Üçüncül renk (aksan)
├── Yüzey renkleri (türetilmiş)
└── Tüm semantik renkler ayarlanır

KURAL: Kişiselleştirilmiş his için dinamik rengi uygulayın.
```

### Semantik Renk Rolleri

```
Yüzey Renkleri:
├── Surface → Ana arka plan
├── SurfaceVariant → Kartlar, kaplar (containers)
├── SurfaceTint → Yükselti kaplaması
├── InverseSurface → Snackbarlar, ipuçları

Yüzey-Üzeri Renkleri:
├── OnSurface → Birincil metin
├── OnSurfaceVariant → İkincil metin
├── Outline → Kenarlıklar, bölücüler
├── OutlineVariant → İnce bölücüler

Birincil Renkler:
├── Primary → Ana eylemler, FAB
├── OnPrimary → Birincil üzerindeki metin
├── PrimaryContainer → Daha az vurgu
├── OnPrimaryContainer → Kap üzerindeki metin

İkincil/Üçüncül: Benzer desen
```

### Hata, Uyarı, Başarı Renkleri

| Rol | Açık | Koyu | Kullanım |
|------|-------|------|-------|
| Error | #B3261E | #F2B8B5 | Hatalar, yıkıcı |
| OnError | #FFFFFF | #601410 | Hata üzerindeki metin |
| ErrorContainer | #F9DEDC | #8C1D18 | Hata arka planları |

### Koyu Tema

```
Material Koyu Tema:

├── Arka plan: #121212 (varsayılan olarak saf siyah değil)
├── Yüzey: #1E1E1E, #232323, vb. (yükselti)
├── Yükselti: Daha yüksek = daha açık kaplama
├── Renklerde doygunluğu azalt
└── Kontrast oranlarını kontrol et

Yükselti kaplamaları (koyu mod):
├── 0dp → %0 kaplama
├── 1dp → %5 kaplama
├── 3dp → %8 kaplama
├── 6dp → %11 kaplama
├── 8dp → %12 kaplama
├── 12dp → %14 kaplama
```

---

## 4. Android Düzen (Layout) & Aralıklandırma

### Düzen Izgarası (Grid)

```
Android 8dp taban çizgisi ızgarası kullanır:

Tüm aralıklar 8dp'nin katlarıdır:
├── 4dp: Bileşen içi (yarım adım)
├── 8dp: Minimum boşluk
├── 16dp: Standart boşluk
├── 24dp: Bölüm boşluğu
├── 32dp: Büyük boşluk

Marginler:
├── Kompakt (telefon): 16dp
├── Orta (küçük tablet): 24dp
├── Geniş (büyük): 24dp+ veya sütunlar
```

### Duyarlı Düzen

```
Pencere Boyut Sınıfları:

KOMPAKT (COMPACT) (< 600dp genişlik):
├── Portre modunda telefonlar
├── Tek sütunlu düzen
├── Alt navigasyon

ORTA (MEDIUM) (600-840dp genişlik):
├── Tabletler, katlanabilirler
├── 2 sütunu düşün
├── Navigasyon rayı seçeneği

GENİŞ (EXPANDED) (> 840dp genişlik):
├── Büyük tabletler, masaüstü
├── Çok sütunlu düzenler
├── Navigasyon çekmecesi (drawer)
```

### Kurumsal Düzenler

| Düzen | Kullanım Durumu | Pencere Sınıfı |
|--------|----------|--------------|
| **Liste-Detay** | E-posta, mesajlar | Orta, Geniş |
| **Akış (Feed)** | Sosyal, haberler | Hepsi |
| **Destekleyen Panel** | Referans içerik | Orta, Geniş |

---

## 5. Android Navigasyon Desenleri

### Navigasyon Bileşenleri

| Bileşen | Kullanım Durumu | Konum |
|-----------|----------|----------|
| **Alt Navigasyon** | 3-5 üst düzey hedef | Alt |
| **Navigasyon Rayı** | Tabletler, katlanabilirler | Sol taraf, dikey |
| **Navigasyon Çekmecesi** | Çok fazla hedef, büyük ekranlar | Sol taraf, gizli/görünür |
| **Üst Uygulama Çubuğu** | Mevcut bağlam, eylemler | Üst |

### Alt Navigasyon

```
┌─────────────────────────────────────┐
│                                     │
│         İçerik Alanı                │
│                                     │
├─────────────────────────────────────┤
│  🏠     🔍     ➕     ❤️     👤    │ ← 80dp yükseklik
│ Ana S.  Arama  FAB   Kayıt  Profil │
└─────────────────────────────────────┘

Kurallar:
├── 3-5 hedef
├── İkonlar: Material Sembolleri (24dp)
├── Etiketler: Her zaman görünür (erişilebilirlik)
├── Aktif: Dolu ikon + gösterge hapı
├── Rozet: Bildirimler için
├── FAB entegre edilebilir (isteğe bağlı)
```

### Üst Uygulama Çubuğu

```
Türler:
├── Ortalanmış: Logo uygulamaları, basit
├── Küçük: Kompakt, kaydırınca gider
├── Orta: Başlık + eylemler, daralır
├── Büyük: Görünen başlık, küçüğe daralır

┌─────────────────────────────────────┐
│  ☰   Uygulama Başlığı       🔔 ⋮  │ ← 64dp (küçük)
├─────────────────────────────────────┤
│                                     │
│         İçerik Alanı                │
│                                     │
└─────────────────────────────────────┘

Eylemler: Maks 3 ikon, daha fazlası için taşma menüsü ( ⋮ )
```

### Navigasyon Rayı (Tabletler)

```
┌───────┬─────────────────────────────┐
│  ≡    │                             │
│       │                             │
│  🏠   │                             │
│ Ana S.│       İçerik Alanı          │
│       │                             │
│  🔍   │                             │
│Arama  │                             │
│       │                             │
│  👤   │                             │
│Profil │                             │
└───────┴─────────────────────────────┘

Genişlik: 80dp
İkonlar: 24dp
Etiketler: İkonun altında
FAB: En üstte olabilir
```

### Geri Navigasyonu

```
Android sistem geri özelliği sağlar:
├── Geri butonu (3 butonlu navigasyon)
├── Geri jesti (kenardan kaydırma)
├── Tahmini geri (Android 14+)

Uygulamanız şunları yapmalıdır:
├── Geriyi doğru şekilde işlemeli (yığını pop et)
├── Tahmini geri animasyonunu desteklemeli
├── Geriyi beklenmedik şekilde asla gasp etmemeli/geçersiz kılmamalı
└── Kaydedilmemiş çalışmayı atmadan önce onaylamalı
```

---

## 6. Material Bileşenler

### Butonlar

```
Buton Türleri:

┌──────────────────────┐
│    Dolu Buton        │  ← Birincil eylem
└──────────────────────┘

┌──────────────────────┐
│    Tonal Buton       │  ← İkincil, daha az vurgu
└──────────────────────┘

┌──────────────────────┐
│   Anahatlı Buton     │  ← Üçüncül, daha düşük vurgu
└──────────────────────┘

    Metin Butonu          ← En düşük vurgu

Yükseklikler:
├── Küçük: 40dp (kısıtlı olduğunda)
├── Standart: 40dp
├── Büyük: 56dp (gerektiğinde FAB boyutu)

Min dokunma hedefi: 48dp (görsel daha küçük olsa bile)
```

### Kayan Eylem Butonu (FAB)

```
FAB Türleri:
├── Standart: 56dp çap
├── Küçük: 40dp çap
├── Büyük: 96dp çap
├── Genişletilmiş: İkon + metin, değişken genişlik

Konum: Sağ alt, kenarlardan 16dp
Yükselti: İçeriğin üzerinde süzülür

┌─────────────────────────────────────┐
│                                     │
│         İçerik                      │
│                                     │
│                              ┌────┐ │
│                              │ ➕ │ │ ← FAB
│                              └────┘ │
├─────────────────────────────────────┤
│       Alt Navigasyon                │
└─────────────────────────────────────┘
```

### Kartlar

```
Kart Türleri:
├── Yükseltilmiş: Gölge, durma durumu
├── Dolu: Arka plan rengi, gölge yok
├── Anahatlı: Kenarlık, gölge yok

Kart Anatomisi:
┌─────────────────────────────────────┐
│           Başlık Resmi              │ ← İsteğe bağlı
├─────────────────────────────────────┤
│  Başlık / Manşet                    │
│  Alt başlık / Destekleyici metin    │
├─────────────────────────────────────┤
│      [ Eylem ]    [ Eylem ]         │ ← İsteğe bağlı eylemler
└─────────────────────────────────────┘

Köşe yarıçapı: 12dp (M3 varsayılan)
Dolgu (Padding): 16dp
```

### Metin Alanları

```
Türler:
├── Dolu: Arka plan dolgulu, altı çizili
├── Anahatlı: Her tarafı kenarlıklı

┌─────────────────────────────────────┐
│  Etiket                             │ ← Odaklanınca yukarı kayar
│  ________________________________________________
│  │     Giriş metni buraya...       │ ← Öndeki/sondaki ikonlar
│  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
│  Destekleyen metin veya hata        │
└─────────────────────────────────────┘

Yükseklik: 56dp
Etiket: Yer tutucudan yukarıya animasyonla geçer
Hata: Kırmızı renk + ikon + mesaj
```

### Çipler

```
Türler:
├── Asistan: Akıllı eylemler (yol tarifi, arama)
├── Filtre: Filtreleri aç/kapa
├── Giriş: Varlıkları temsil et (etiketler, kişiler)
├── Öneri: Dinamik öneriler

┌───────────────┐
│  🏷️ Filtre   │  ← 32dp yükseklik, 8dp köşe yarıçapı
└───────────────┘

Durumlar: Seçilmemiş, Seçili, Devre Dışı
```

---

## 7. Android'e Özgü Desenler

### Snackbarlar

```
Konum: Alt, navigasyonun üstünde
Süre: 4-10 saniye
Eylem: Bir isteğe bağlı metin eylemi

┌─────────────────────────────────────────────────┐
│  Arşivlendi 1 öğe                 [ GERİ AL ]   │
└─────────────────────────────────────────────────┘

Kurallar:
├── Kısa mesaj, mümkünse tek satır
├── Maks 2 satır
├── Bir eylem (metin, ikon değil)
├── Kaydırarak kapatılabilir
└── Üst üste yığma, sıraya koy
```

### Alt Sayfalar (Bottom Sheets)

```
Türler:
├── Standart: Etkileşimli içerik
├── Modal: Arka planı engeller (perde ile - scrim)

Modal Alt Sayfa:
┌─────────────────────────────────────┐
│                                     │
│        (İçerik üzeri perde)         │
│                                     │
├═════════════════════════════════════┤
│  ─────  (Sürükleme kulpu, isteğe bağlı)
│                                     │
│        Sayfa İçeriği                │
│                                     │
│        Eylemler / Seçenekler        │
│                                     │
└─────────────────────────────────────┘

Köşe yarıçapı: 28dp (üst köşeler)
```

### Diyaloglar

```
Türler:
├── Temel: Başlık + içerik + eylemler
├── Tam ekran: Karmaşık düzenleme (mobil)
├── Tarih/Saat seçici
├── Onay diyaloğu

┌─────────────────────────────────────┐
│              Başlık                 │
│                                     │
│       Diyaloğu açıklayan            │
│       destekleyici metin            │
│                                     │
│           [ İptal ]  [ Onayla ]     │
└─────────────────────────────────────┘

Kurallar:
├── Ekranda ortalanmış
├── Arkada perde (karartılmış arka plan)
├── Maks 2 eylem sağa hizalı
├── Yıkıcı eylem solda olabilir
```

### Çek-Yenile

```
Android SwipeRefreshLayout desenini kullanır:

┌─────────────────────────────────────┐
│         ○ (Dönen Çark)              │ ← Dairesel ilerleme
├─────────────────────────────────────┤
│                                     │
│         İçerik                      │
│                                     │
└─────────────────────────────────────┘

Dönen Çark: Material dairesel gösterge
Konum: Üst orta, içerikle birlikte aşağı çekilir
```

### Dalga Efekti (Ripple)

```
Her dokunulabilir öğe dalgaya ihtiyaç duyar:

Dokunma basılı → Dalga dokunma noktasından genişler
Dokunma bırakıldı → Dalga tamamlanır ve söner

Renk: 
├── Açık üzerinde: ~%12 opaklıkta siyah
├── Koyu üzerinde: ~%12 opaklıkta beyaz
├── Renkli üzerinde: Uygun kontrast

Bu, Android hissi için ZORUNLUDUR.
```

---

## 8. Material Sembolleri

### Kullanım Kılavuzları

```
Material Sembolleri: Google'ın ikon kütüphanesi

Stiller:
├── Outlined: Varsayılan, en yaygın
├── Rounded: Daha yumuşak, dost canlısı
├── Sharp: Köşeli, hassas

Değişken font eksenleri:
├── FILL: 0 (anahat) - 1 (dolu)
├── wght: 100-700 (ağırlık)
├── GRAD: -25 - 200 (vurgu)
├── opsz: 20, 24, 40, 48 (optik boyut)
```

### İkon Boyutları

| Boyut | Kullanım |
|------|-------|
| 20dp | Yoğun UI, satır içi |
| 24dp | Standart (en yaygın) |
| 40dp | Daha büyük dokunma hedefleri |
| 48dp | Vurgu, tek başına |

### Durumlar

```
İkon Durumları:
├── Varsayılan: Tam opaklık
├── Devre Dışı: %38 opaklık
├── Hover/Odak: Kap vurgusu
├── Seçili: Dolu varyant + renk tonu

Aktif vs İnaktif:
├── İnaktif: Anahatlı (Outlined)
├── Aktif: Dolu + gösterge
```

---

## 9. Android Erişilebilirliği

### TalkBack Gereksinimleri

```
Her etkileşimli öğenin şunlara ihtiyacı vardır:
├── contentDescription (ne olduğu)
├── Doğru semantik (buton, onay kutusu, vb.)
├── Durum duyuruları (seçildi, devre dışı)
└── Mantıklıysa gruplama

Jetpack Compose:
Modifier.semantics {
    contentDescription = "Oynat butonu"
    role = Role.Button
}

React Native:
accessibilityLabel="Oynat butonu"
accessibilityRole="button"
accessibilityState={{ disabled: false }}
```

### Dokunma Hedefi Boyutu

```
ZORUNLU: 48dp × 48dp minimum

Görsel öğe daha küçük olsa bile:
├── İkon: 24dp görsel, 48dp dokunma alanı
├── Onay kutusu: 20dp görsel, 48dp dokunma alanı
└── 48dp'ye ulaşmak için dolgu ekle

Hedefler arasındaki boşluk: 8dp minimum
```

### Font Ölçekleme

```
Android font ölçeklemeyi destekler:
├── %85 (daha küçük)
├── %100 (varsayılan)
├── %115, %130, %145...
├── %200'e kadar (en büyük)

KURAL: UI'ınızı %200 font ölçeğinde test edin.
sp birimlerini kullanın ve sabit yüksekliklerden kaçının.
```

### Hareketi Azalt

```kotlin
// Hareket tercihini kontrol et
val reduceMotion = Settings.Global.getFloat(
    contentResolver,
    Settings.Global.ANIMATOR_DURATION_SCALE,
    1f
) == 0f

if (reduceMotion) {
    // Animasyonları atla veya azalt
}
```

---

## 10. Android Kontrol Listesi

### Her Android Ekranından Önce

- [ ] Material 3 bileşenleri kullanılıyor
- [ ] Dokunma hedefleri ≥ 48dp
- [ ] Tüm dokunulabilirlerde dalga efekti var
- [ ] Roboto veya Material tip ölçeği
- [ ] Semantik renkler (dinamik renk desteği)
- [ ] Geri navigasyonu doğru çalışıyor

### Android Yayını Öncesi

- [ ] Koyu tema test edildi
- [ ] Dinamik renk test edildi (destekleniyorsa)
- [ ] Tüm font boyutları test edildi (%200 ölçek)
- [ ] TalkBack test edildi
- [ ] Tahmini geri uygulandı (Android 14+)
- [ ] Kenardan kenara ekran (Android 15+)
- [ ] Farklı ekran boyutları test edildi (telefonlar, tabletler)
- [ ] Navigasyon desenleri platformla eşleşiyor (geri, jestler)

---

> **Unutmayın:** Android kullanıcıları Material Design bekler. Material desenlerini görmezden gelen özel tasarımlar yabancı ve bozuk hissettirir. Temeliniz olarak Material bileşenleri kullanın, düşünceli bir şekilde özelleştirin.
