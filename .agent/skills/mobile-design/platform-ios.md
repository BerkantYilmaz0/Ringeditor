# iOS Platform Kılavuzları

> Human Interface Guidelines (HIG) esasları, iOS tasarım gelenekleri, SF Pro tipografisi ve yerel desenler.
> **iPhone/iPad için geliştirme yaparken bu dosyayı okuyun.**

---

## 1. Human Interface Guidelines Felsefesi

### Temel Apple Tasarım Prensipleri

```
NETLİK (CLARITY):
├── Metin her boyutta okunaklı
├── İkonlar hassas ve anlaşılır
├── Süslemeler ince ve uygun
└── İşlevselliğe odaklanmak tasarımı yönlendirir

HÜRMET (DEFERENCE):
├── UI, insanların anlamasına ve etkileşime girmesine yardımcı olur
├── İçerik ekranı doldurur
├── UI asla içerikle rekabet etmez
└── Yarı saydamlık daha fazla içeriği ima eder

DERİNLİK (DEPTH):
├── Belirgin görsel katmanlar hiyerarşiyi iletir
├── Geçişler derinlik hissi sağlar
├── Dokunma işlevselliği ortaya çıkarır
└── İçerik UI'ın üzerine yükseltilir
```

### iOS Tasarım Değerleri

| Değer | Uygulama |
|-------|----------------|
| **Estetik Bütünlük** | Tasarım işlevle eşleşir (oyun ≠ üretkenlik) |
| **Tutarlılık** | Sistem kontrollerini kullan, tanıdık desenler |
| **Doğrudan Manipülasyon** | Dokunma içeriği doğrudan etkiler |
| **Geri Bildirim** | Eylemler onaylanır |
| **Metaforlar** | Gerçek dünya karşılaştırmaları anlamaya yardımcı olur |
| **Kullanıcı Kontrolü** | Kullanıcı eylemleri başlatır, iptal edebilir |

---

## 2. iOS Tipografisi

### SF Pro Font Ailesi

```
iOS Sistem Fontları:
├── SF Pro Text: Gövde metni (< 20pt)
├── SF Pro Display: Büyük başlıklar (≥ 20pt)
├── SF Pro Rounded: Dost canlısı bağlamlar
├── SF Mono: Kod, tablosal veriler
└── SF Compact: Apple Watch, daha küçük ekranlar
```

### iOS Tip Ölçeği (Dinamik Tip)

| Stil | Varsayılan Boyut | Ağırlık | Kullanım |
|-------|--------------|--------|-------|
| **Large Title** | 34pt | Bold | Navigasyon çubuğu (kaydırmada daralan) |
| **Title 1** | 28pt | Bold | Sayfa başlıkları |
| **Title 2** | 22pt | Bold | Bölüm başlıkları |
| **Title 3** | 20pt | Semibold | Alt bölüm başlıkları |
| **Headline** | 17pt | Semibold | Vurgulanan gövde |
| **Body** | 17pt | Regular | Birincil içerik |
| **Callout** | 16pt | Regular | İkincil içerik |
| **Subhead** | 15pt | Regular | Üçüncül içerik |
| **Footnote** | 13pt | Regular | Altyazı, zaman damgaları |
| **Caption 1** | 12pt | Regular | Ek açıklamalar |
| **Caption 2** | 11pt | Regular | Küçük yazılar |

### Dinamik Tip Desteği (ZORUNLU)

```swift
// ❌ YANLIŞ: Sabit font boyutu
Text("Merhaba")
    .font(.system(size: 17))

// ✅ DOĞRU: Dinamik Tip
Text("Merhaba")
    .font(.body) // Kullanıcı ayarlarıyla ölçeklenir

// React Native eşdeğeri
<Text style={{ fontSize: 17 }}> // ❌ Sabit
<Text style={styles.body}> // Dinamik bir ölçek sistemi kullanın
```

### Font Ağırlığı Kullanımı

| Ağırlık | iOS Sabiti | Kullanım Durumu |
|--------|--------------|----------|
| Regular (400) | `.regular` | Gövde metni |
| Medium (500) | `.medium` | Butonlar, vurgu |
| Semibold (600) | `.semibold` | Alt başlıklar |
| Bold (700) | `.bold` | Başlıklar, anahtar bilgi |
| Heavy (800) | `.heavy` | Nadiren, pazarlama |

---

## 3. iOS Renk Sistemi

### Sistem Renkleri (Semantik)

```
Otomatik koyu mod için semantik renkleri kullanın:

Birincil:
├── .label → Birincil metin
├── .secondaryLabel → İkincil metin
├── .tertiaryLabel → Üçüncül metin
├── .quaternaryLabel → Filigranlar

Arka Planlar:
├── .systemBackground → Ana arka plan
├── .secondarySystemBackground → Gruplanmış içerik
├── .tertiarySystemBackground → Yükseltilmiş içerik

Dolgular:
├── .systemFill → Büyük şekiller
├── .secondarySystemFill → Orta şekiller
├── .tertiarySystemFill → Küçük şekiller
├── .quaternarySystemFill → İnce şekiller
```

### Sistem Aksan Renkleri

| Renk | Açık Mod | Koyu Mod | Kullanım |
|-------|------------|-----------|-------|
| Blue | #007AFF | #0A84FF | Linkler, vurgular, varsayılan ton |
| Green | #34C759 | #30D158 | Başarı, olumlu |
| Red | #FF3B30 | #FF453A | Hatalar, yıkıcı |
| Orange | #FF9500 | #FF9F0A | Uyarılar |
| Yellow | #FFCC00 | #FFD60A | Dikkat |
| Purple | #AF52DE | #BF5AF2 | Özel özellikler |
| Pink | #FF2D55 | #FF375F | Sevgi, favoriler |
| Teal | #5AC8FA | #64D2FF | Bilgi |

### Koyu Mod Hususları

```
iOS Koyu Mod, ters çevrilmiş açık mod değildir:

AÇIK MOD:                KOYU MOD:
├── Beyaz arka planlar   ├── Gerçek siyah (#000) veya siyaha yakın
├── Yüksek doygunluk     ├── Doygunluğu azaltılmış renkler
├── Siyah metin          ├── Beyaz/açık gri metin
└── Alt gölgeler         └── Parlamalar veya gölge yok

KURAL: Otomatik adaptasyon için her zaman semantik renkleri kullanın.
```

---

## 4. iOS Düzen (Layout) & Aralıklandırma

### Güvenli Alanlar

```
┌─────────────────────────────────────┐
│░░░░░░░░░░░ Durum Çubuğu ░░░░░░░░░░░░│ ← Üst güvenli alan boşluğu
├─────────────────────────────────────┤
│                                     │
│                                     │
│         Güvenli İçerik Alanı        │
│                                     │
│                                     │
├─────────────────────────────────────┤
│░░░░░░░░░ Ana Ekran Göst. ░░░░░░░░░░░│ ← Alt güvenli alan boşluğu
└─────────────────────────────────────┘

KURAL: Etkileşimli içeriği asla güvenli olmayan alanlara koymayın.
```

### Standart Marginler & Dolgu

| Öğe | Margin | Notlar |
|---------|--------|-------|
| Ekran kenarı → içerik | 16pt | Standart yatay margin |
| Gruplanmış tablo bölümleri | 16pt üst/alt | Nefes alma alanı |
| Liste öğesi dolgusu | 16pt yatay | Standart hücre dolgusu |
| Kart iç dolgusu | 16pt | Kart içi içerik |
| Buton iç dolgusu | 12pt dikey, 16pt yatay | Minimum |

### iOS Izgara Sistemi

```
iPhone Izgarası (Standart):
├── 16pt marginler (sol/sağ)
├── 8pt minimum aralık
├── 8pt katlarında içerik

iPhone Izgarası (Kompakt):
├── 8pt marginler (gerektiğinde)
├── 4pt minimum aralık

iPad Izgarası:
├── 20pt marginler (veya daha fazla)
├── Çok sütunlu düzenleri düşünün
```

---

## 5. iOS Navigasyon Desenleri

### Navigasyon Türleri

| Desen | Kullanım Durumu | Uygulama |
|---------|----------|----------------|
| **Tab Bar** | 3-5 üst düzey bölüm | Alt, her zaman görünür |
| **Navigation Controller** | Hiyerarşik derinleşme | Yığın (Stack) tabanlı, geri butonu |
| **Modal** | Odaklanmış görev, kesinti | Sayfa veya tam ekran |
| **Sidebar** | iPad, çok sütunlu | Sol kenar çubuğu (iPad) |

### Tab Bar Kılavuzları

```
┌─────────────────────────────────────┐
│                                     │
│         İçerik Alanı                │
│                                     │
├─────────────────────────────────────┤
│  🏠     🔍     ➕     ❤️     👤    │ ← Tab bar (49pt yükseklik)
│ Ana S. Arama  Yeni   Kayıt  Profil │
└─────────────────────────────────────┘

Kurallar:
├── Maksimum 3-5 öğe
├── İkonlar: SF Symbols veya özel (25×25pt)
├── Etiketler: Her zaman dahil et (erişilebilirlik)
├── Aktif durum: Dolu ikon + renk tonu
└── Tab bar her zaman görünür (kaydırmada gizleme)
```

### Navigasyon Çubuğu Kılavuzları

```
┌─────────────────────────────────────┐
│ < Geri     Sayfa Başlığı   Düzenle  │ ← Navigasyon çubuğu (44pt)
├─────────────────────────────────────┤
│                                     │
│         İçerik Alanı                │
│                                     │
└─────────────────────────────────────┘

Kurallar:
├── Geri butonu: Sistem oku + önceki başlık (veya "Geri")
├── Başlık: Ortalanmış, dinamik font
├── Sağ eylemler: Maks 2 öğe
├── Büyük başlık: Kaydırmada daralır (isteğe bağlı)
└── İkonlar yerine metin butonlarını tercih et (netlik)
```

### Modal Sunumlar

| Stil | Kullanım Durumu | Görünüm |
|-------|----------|------------|
| **Sheet (varsayılan)** | İkincil görevler | Kart yukarı kayar, ebeveyn görünür |
| **Full Screen** | Kapsayıcı görevler | Tüm ekranı kaplar |
| **Popover** | iPad, hızlı bilgi | Ok işaretli baloncuk |
| **Alert** | Kritik kesinti | Ortalanmış diyalog |
| **Action Sheet** | Bağlamdan seçenekler | Seçenekli alt sayfa |

### Jestler

| Jest | iOS Geleneği |
|---------|----------------|
| **Kenar kaydırma (sol)** | Geri git |
| **Aşağı çek (sheet)** | Modalı kapat |
| **Uzun basma** | Bağlam menüsü |
| **Derin basma** | Peek/Pop (eski) |
| **İki parmakla kaydırma** | İç içe kaydırmada kaydırma |

---

## 6. iOS Bileşenleri

### Butonlar

```
Buton Stilleri (UIKit/SwiftUI):

┌──────────────────────────────┐
│         Tinted               │ ← Birincil eylem (dolu)
├──────────────────────────────┤
│         Bordered             │ ← İkincil eylem (anahat)
├──────────────────────────────┤
│         Plain                │ ← Üçüncül eylem (sadece metin)
└──────────────────────────────┘

Boyutlar:
├── Mini: Dar alanlar
├── Small: Kompakt UI
├── Medium: Satır içi eylemler
├── Large: Birincil CTA'lar (44pt minimum yükseklik)
```

### Listeler & Tablolar

```
Liste Stilleri:

.plain         → Ayırıcı yok, kenardan kenara
.insetGrouped  → Yuvarlatılmış kartlar (varsayılan iOS 14+)
.grouped       → Tam genişlik bölümler
.sidebar       → iPad kenar çubuğu navigasyonu

Hücre Aksesuarları:
├── Açıklama göstergesi (>) → Detaya gider
├── Detay butonu (i) → Navigasyon olmadan bilgi gösterir
├── Onay işareti (✓) → Seçim
├── Yeniden sırala (≡) → Sıralamak için sürükle
└── Sil (-) → Kaydırma/düzenleme modu sil
```

### Metin Alanları

```
iOS Metin Alanı Anatomisi:

┌─────────────────────────────────────┐
│ 🔍 Ara...                       ✕  │
└─────────────────────────────────────┘
  ↑                               ↑
  Öndeki ikon                    Temizle butonu

Kenarlıklar: Yuvarlatılmış dikdörtgen
Yükseklik: 36pt minimum
Yer tutucu: İkincil metin rengi
Temizle butonu: Metin olduğunda görünür
```

### Bölümlenmiş Kontroller (Segmented Controls)

```
Ne Zaman Kullanılır:
├── 2-5 ilişkili seçenek
├── İçeriği filtreleme
├── Görünümleri değiştirme

┌───────┬───────┬───────┐
│ Tümü  │ Aktif │ Bitti │
└───────┴───────┴───────┘

Kurallar:
├── Eşit genişlikte bölümler
├── Metin veya ikon (ikisi karışık değil)
├── Maks 5 bölüm
└── Daha karmaşıksa sekmeleri düşün
```

---

## 7. iOS'e Özgü Desenler

### Çek-Yenile

```
Yerel UIRefreshControl davranışı:
├── Eşiğin ötesine çek → Çark görünür
├── Bırak → Yenileme eylemi tetiklenir
├── Yükleme durumu → Çark döner
├── Tamamlandı → Çark kaybolur

KURAL: Her zaman yerel UIRefreshControl kullanın (özel yapmayın).
```

### Kaydırma Eylemleri (Swipe Actions)

```
iOS kaydırma eylemleri:

← Sola Kaydır (Yıkıcı)          Sağa Kaydır (Yapıcı) →
┌─────────────────────────────────────────────────────────────┐
│                    Liste Öğesi İçeriği                      │
└─────────────────────────────────────────────────────────────┘

Sola kaydırma gösterir: Arşivle, Sil, Bayrakla
Sağa kaydırma gösterir: İğnele, Yıldızla, Okundu İşaretle

Tam kaydırma: İlk eylemi tetikler
```

### Bağlam Menüleri

```
Uzun basma → Bağlam menüsü görünür

┌─────────────────────────────┐
│       Önizleme Kartı        │
├─────────────────────────────┤
│  📋 Kopyala                 │
│  📤 Paylaş                  │
│  ➕ Şuraya ekle...          │
├─────────────────────────────┤
│  🗑️ Sil             (Kırmızı)│
└─────────────────────────────┘

Kurallar:
├── Önizleme: Büyütülmüş içeriği göster
├── Eylemler: İçerikle ilişkili
├── Yıkıcı: Sonuncu, kırmızı renkte
└── Maks ~8 eylem (fazlaysa kaydırılabilir)
```

### Sayfalar (Sheets) & Yarım Sayfalar

```
iOS 15+ Sayfalar:

┌─────────────────────────────────────┐
│                                     │
│        Ebeveyn Görünümü (karartılmış)│
│                                     │
├─────────────────────────────────────┤
│  ═══  (Tutacak)                     │ ← Boyutlandırmak için sürükle
│                                     │
│        Sayfa İçeriği                │
│                                     │
│                                     │
└─────────────────────────────────────┘

Detentler:
├── .medium → Yarım ekran
├── .large → Tam ekran (güvenli alanla)
├── Custom → Belirli yükseklik
```

---

## 8. SF Sembolleri

### Kullanım Kılavuzları

```
SF Sembolleri: Apple'ın ikon kütüphanesi (5000+ ikon)

Ağırlıklar: Metin ağırlığıyla eşleşir
├── Ultralight / Thin / Light
├── Regular / Medium / Semibold
├── Bold / Heavy / Black

Ölçekler:
├── .small → Küçük metinle satır içi
├── .medium → Standart UI
├── .large → Vurgu, tek başına
```

### Sembol Yapılandırmaları

```swift
// SwiftUI
Image(systemName: "star.fill")
    .font(.title2)
    .foregroundStyle(.yellow)

// Render modu ile
Image(systemName: "heart.fill")
    .symbolRenderingMode(.multicolor)

// Animasyonlu (iOS 17+)
Image(systemName: "checkmark.circle")
    .symbolEffect(.bounce)
```

### Sembol En İyi Uygulamaları

| Kılavuz | Uygulama |
|-----------|----------------|
| Metin ağırlığını eşleştir | Sembol ağırlığı = font ağırlığı |
| Standart sembolleri kullan | Kullanıcılar tanır |
| Anlamlıysa çok renkli | Sadece süsleme değil |
| Eski iOS için geri dönüş | Uygunluğu kontrol et |

---

## 9. iOS Erişilebilirliği

### VoiceOver Gereksinimleri

```
Her etkileşimli öğenin şunlara ihtiyacı vardır:
├── Erişilebilirlik etiketi (ne olduğu)
├── Erişilebilirlik ipucu (ne yaptığı) - isteğe bağlı
├── Erişilebilirlik özellikleri (buton, link, vb.)
└── Erişilebilirlik değeri (mevcut durum)

SwiftUI:
.accessibilityLabel("Oynat")
.accessibilityHint("Seçilen parçayı oynatır")

React Native:
accessibilityLabel="Oynat"
accessibilityHint="Seçilen parçayı oynatır"
accessibilityRole="button"
```

### Dinamik Tip Ölçekleme

```
ZORUNLU: Dinamik Tip Desteği

Kullanıcılar metin boyutunu şuradan ayarlayabilir:
├── xSmall → 14pt gövde
├── Small → 15pt gövde
├── Medium → 16pt gövde
├── Large (Varsayılan) → 17pt gövde
├── xLarge → 19pt gövde
├── xxLarge → 21pt gövde
├── xxxLarge → 23pt gövde
├── Erişilebilirlik boyutları → 53pt'ye kadar

Uygulamanız tüm boyutlarda düzgün ölçeklenmelidir.
```

### Hareketi Azalt

```
Hareket tercihlerine saygı duyun:

@Environment(\.accessibilityReduceMotion) var reduceMotion

if reduceMotion {
    // Anlık geçişleri kullan
} else {
    // Animasyonları kullan
}

React Native:
import { AccessibilityInfo } from 'react-native';
AccessibilityInfo.isReduceMotionEnabled()
```

---

## 10. iOS Kontrol Listesi

### Her iOS Ekranından Önce

- [ ] SF Pro veya SF Sembolleri kullanılıyor
- [ ] Dinamik Tip destekleniyor
- [ ] Güvenli alanlara saygı duyuluyor
- [ ] Navigasyon HIG'i takip ediyor (geri jesti çalışıyor)
- [ ] Tab bar öğeleri ≤ 5
- [ ] Dokunma hedefleri ≥ 44pt

### iOS Yayını Öncesi

- [ ] Koyu mod test edildi
- [ ] Tüm metin boyutları test edildi (Erişilebilirlik Denetçisi)
- [ ] VoiceOver test edildi
- [ ] Kenar kaydırma geri her yerde çalışıyor
- [ ] Klavyeden kaçınma uygulandı
- [ ] Çentik/Dinamik Ada yönetildi
- [ ] Ana ekran göstergesi alanına saygı duyuldu
- [ ] Mümkün olan yerlerde yerel bileşenler kullanıldı

---

> **Unutmayın:** iOS kullanıcılarının diğer iOS uygulamalarından gelen güçlü beklentileri vardır. HIG desenlerinden sapmak onlara "bozuk" hissettirir. Şüpheye düştüğünüzde, yerel bileşeni kullanın.
