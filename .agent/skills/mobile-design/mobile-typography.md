# Mobil Tipografi Referansı

> Tip ölçeği, sistem fontları, dinamik tip, erişilebilirlik ve koyu mod tipografisi.
> **Tipografi hataları, okunamayan mobil uygulamaların 1 numaralı nedenidir.**

---

## 1. Mobil Tipografi Temelleri

### Mobil Tip Neden Farklıdır

```
MASAÜSTÜ:                       MOBİL:
├── 50-75 cm izleme mesafesi    ├── 30-40 cm izleme mesafesi
├── Büyük görüntü alanı         ├── Küçük, dar görüntü alanı
├── Detaylar için fareyle gel   ├── Detaylar için dokun/kaydır
├── Kontrollü ışıklandırma      ├── Değişken (dış mekan, vb.)
├── Sabit font boyutu           ├── Kullanıcı kontrollü boyutlandırma
└── Uzun okuma oturumları       └── Hızlı tarama
```

### Mobil Tip Kuralları

| Kural | Masaüstü | Mobil |
|-------|----------|-------|
| **Minimum gövde boyutu** | 14px | 16px (14pt/14sp) |
| **Maksimum satır uzunluğu** | 75 karakter | 40-60 karakter |
| **Satır yüksekliği** | 1.4-1.5 | 1.4-1.6 (daha cömert) |
| **Font ağırlığı** | Değişken | Regular baskın, bold az |
| **Kontrast** | AA (4.5:1) | AA minimum, AAA tercih edilen |

---

## 2. Sistem Fontları

### iOS: SF Pro Ailesi

```
San Francisco (SF) Ailesi:
├── SF Pro Display: Büyük metin (≥ 20pt)
├── SF Pro Text: Gövde metni (< 20pt)
├── SF Pro Rounded: Dost canlısı bağlamlar
├── SF Mono: Eş aralıklı (Monospace)
└── SF Compact: Apple Watch, kompakt UI

Özellikler:
├── Optik boyutlandırma (otomatik ayarlanır)
├── Dinamik izleme (aralıklandırma - tracking)
├── Tablosal/orantılı rakamlar
├── Mükemmel okunabilirlik
```

### Android: Roboto Ailesi

```
Roboto Ailesi:
├── Roboto: Varsayılan sans-serif
├── Roboto Flex: Değişken font
├── Roboto Serif: Serif seçeneği
├── Roboto Mono: Eş aralıklı (Monospace)
├── Roboto Condensed: Dar alanlar

Özellikler:
├── Ekranlar için optimize edilmiş
├── Geniş dil desteği
├── Çoklu ağırlıklar
├── Küçük boyutlarda iyi
```

### Ne Zaman Sistem Fontları Kullanılmalı

```
✅ Şunlar olduğunda sistem fontlarını KULLAN:
├── Marka özel font zorunlu kılmadığında
├── Okuma verimliliği öncelikliyse
├── Uygulamanın yerel/bütünleşik hissetmesi önemliyse
├── Performans kritikse
├── Geniş dil desteği gerekiyorsa

❌ Şunlar olduğunda sistem fontlarından KAÇIN:
├── Marka kimliği özel gerektiriyorsa
├── Tasarım farklılaşması gerekiyorsa
├── Editoryal/dergi stili hedefleniyorsa
└── (Ama yine de erişilebilirliği destekle)
```

### Özel Font Hususları

```
Eğer özel font kullanıyorsan:
├── Gereken tüm ağırlıkları dahil et
├── Dosya boyutu için alt kümele (subset)
├── Tüm Dinamik Tip boyutlarında test et
├── Sisteme geri dönüş (fallback) sağla
├── Render kalitesini test et
└── Dil desteğini kontrol et
```

---

## 3. Tip Ölçeği

### iOS Tip Ölçeği (Yerleşik)

| Stil | Boyut | Ağırlık | Satır Yüksekliği |
|-------|------|--------|-------------|
| Large Title | 34pt | Bold | 41pt |
| Title 1 | 28pt | Bold | 34pt |
| Title 2 | 22pt | Bold | 28pt |
| Title 3 | 20pt | Semibold | 25pt |
| Headline | 17pt | Semibold | 22pt |
| Body | 17pt | Regular | 22pt |
| Callout | 16pt | Regular | 21pt |
| Subhead | 15pt | Regular | 20pt |
| Footnote | 13pt | Regular | 18pt |
| Caption 1 | 12pt | Regular | 16pt |
| Caption 2 | 11pt | Regular | 13pt |

### Android Tip Ölçeği (Material 3)

| Rol | Boyut | Ağırlık | Satır Yüksekliği |
|------|------|--------|-------------|
| Display Large | 57sp | 400 | 64sp |
| Display Medium | 45sp | 400 | 52sp |
| Display Small | 36sp | 400 | 44sp |
| Headline Large | 32sp | 400 | 40sp |
| Headline Medium | 28sp | 400 | 36sp |
| Headline Small | 24sp | 400 | 32sp |
| Title Large | 22sp | 400 | 28sp |
| Title Medium | 16sp | 500 | 24sp |
| Title Small | 14sp | 500 | 20sp |
| Body Large | 16sp | 400 | 24sp |
| Body Medium | 14sp | 400 | 20sp |
| Body Small | 12sp | 400 | 16sp |
| Label Large | 14sp | 500 | 20sp |
| Label Medium | 12sp | 500 | 16sp |
| Label Small | 11sp | 500 | 16sp |

### Özel Ölçek Oluşturma

```
Özel ölçek oluştururken, modüler oran kullanın:

Önerilen oranlar:
├── 1.125 (Major second): Yoğun UI
├── 1.200 (Minor third): Kompakt
├── 1.250 (Major third): Dengeli (yaygın)
├── 1.333 (Perfect fourth): Geniş
└── 1.500 (Perfect fifth): Dramatik

1.25 oran ve 16px taban ile örnek:
├── xs: 10px (16 ÷ 1.25 ÷ 1.25)
├── sm: 13px (16 ÷ 1.25)
├── base: 16px
├── lg: 20px (16 × 1.25)
├── xl: 25px (16 × 1.25 × 1.25)
├── 2xl: 31px
├── 3xl: 39px
└── 4xl: 49px
```

---

## 4. Dinamik Tip / Metin Ölçekleme

### iOS Dinamik Tip (ZORUNLU)

```swift
// ❌ YANLIŞ: Sabit boyut (ölçeklenmez)
Text("Merhaba")
    .font(.system(size: 17))

// ✅ DOĞRU: Dinamik Tip
Text("Merhaba")
    .font(.body) // Kullanıcı ayarı ile ölçeklenir

// Ölçeklemeli özel font
Text("Merhaba")
    .font(.custom("MyFont", size: 17, relativeTo: .body))
```

### Android Metin Ölçekleme (ZORUNLU)

```
Metin için HER ZAMAN sp kullanın:
├── sp = Scale-independent pixels (Ölçekten bağımsız piksel)
├── Kullanıcı font tercihi ile ölçeklenir
├── dp ölçeklenmez (metin için kullanmayın)

Kullanıcı %85'ten %200'e kadar ölçekleyebilir:
├── Varsayılan (%100): 14sp = 14dp
├── En Büyük (%200): 14sp = 28dp

%200'de test edin!
```

### Ölçekleme Zorlukları

```
Büyük metin boyutlarında sorunlar:
├── Metin konteynerlerden taşar
├── Butonlar çok uzun olur
├── İkonlar metne göre küçük kalır
├── Düzenler (layout) bozulur

Çözümler:
├── Esnek konteynerler kullanın (sabit yükseklik değil)
├── Metin sarmaya (wrap) izin verin
├── İkonları metinle ölçekleyin
├── Geliştirme sırasında uç noktalarda test edin
├── Uzun metinler için kaydırılabilir (scrollable) alanlar kullanın
```

---

## 5. Tipografi Erişilebilirliği

### Minimum Boyutlar

| Öğe | Minimum | Önerilen |
|---------|---------|-------------|
| Gövde metni | 14px/pt/sp | 16px/pt/sp |
| İkincil metin | 12px/pt/sp | 13-14px/pt/sp |
| Altyazılar | 11px/pt/sp | 12px/pt/sp |
| Butonlar | 14px/pt/sp | 14-16px/pt/sp |
| **Bundan küçük olamaz** | 11px | - |

### Kontrast Gereksinimleri (WCAG)

```
Normal metin (< 18pt veya < 14pt bold):
├── AA: 4.5:1 oran minimum
├── AAA: 7:1 oran önerilen

Büyük metin (≥ 18pt veya ≥ 14pt bold):
├── AA: 3:1 oran minimum
├── AAA: 4.5:1 oran önerilen

Logolar/dekoratif: Gereksinim yok
```

### Erişilebilirlik İçin Satır Yüksekliği

```
WCAG Başarı Kriteri 1.4.12:

Satır yüksekliği (satır aralığı): ≥ 1.5×
Paragraf aralığı: ≥ 2× font boyutu
Harf aralığı: ≥ 0.12× font boyutu
Kelime aralığı: ≥ 0.16× font boyutu

Mobil önerisi:
├── Gövde: 1.4-1.6 satır yüksekliği
├── Başlıklar: 1.2-1.3 satır yüksekliği
├── Asla 1.2'nin altına düşmeyin
```

---

## 6. Koyu Mod Tipografisi

### Renk Ayarlamaları

```
Açık Mod:                 Koyu Mod:
├── Siyah metin (#000)    ├── Beyaz/açık gri (#E0E0E0)
├── Yüksek kontrast       ├── Hafifçe azaltılmış kontrast
├── Tam doygunluk         ├── Doygunluğu azaltılmış renkler
└── Koyu = vurgu          └── Açık = vurgu

KURAL: Koyu üzerinde saf beyaz (#FFF) kullanmayın.
Göz yorgunluğunu azaltmak için kirli beyaz (#E0E0E0 - #F0F0F0) kullanın.
```

### Koyu Mod Hiyerarşisi

| Seviye | Açık Mod | Koyu Mod |
|-------|------------|-----------|
| Birincil metin | #000000 | #E8E8E8 |
| İkincil metin | #666666 | #A0A0A0 |
| Üçüncül metin | #999999 | #707070 |
| Devre dışı metin | #CCCCCC | #505050 |

### Koyu Modda Ağırlık

```
Koyu mod metni, halasyon (ışığın karanlık arka plana sızması)
nedeniyle daha ince görünür.

Düşünün:
├── Gövde için orta (medium) ağırlık kullanmayı (normal yerine)
├── Harf aralığını hafifçe artırmayı
├── Gerçek OLED ekranlarda test etmeyi
├── Açık moddan biraz daha kalın ağırlık kullanmayı
```

---

## 7. Tipografi Anti-Desenleri

### ❌ Yaygın Hatalar

| Hata | Sorun | Düzeltme |
|---------|---------|-----|
| **Sabit font boyutları** | Erişilebilirliği yok sayar | Dinamik boyutlandırma kullan |
| **Çok küçük metin** | Okunamaz | Min 14pt/sp |
| **Düşük kontrast** | Güneş ışığında görünmez | Min 4.5:1 |
| **Uzun satırlar** | Takibi zor | Maks 60 karakter |
| **Sıkışık satır yüksekliği** | Sıkışık, okuması zor | Min 1.4× |
| **Çok fazla boyut** | Görsel kaos | Maks 5-7 boyut |
| **Tamamı büyük harf gövde** | Okuması zor | Sadece başlıklarda |
| **Beyaz üzerine açık gri** | Parlak ışıkta imkansız | Daha yüksek kontrast |

### ❌ AI Tipografi Hataları

```
AI şunlara meyillidir:
├── pt/sp yerine sabit px değerleri kullanmak
├── Dinamik Tip desteğini atlamak
├── Çok küçük metin kullanmak (12-14px gövde)
├── Satır yüksekliği ayarlarını yoksaymak
├── Düşük kontrastlı "estetik" griler kullanmak
├── Masaüstü ile aynı ölçeği mobile uygulamak
└── Büyük metin boyutlarında testi atlamak

KURAL: Tipografi ÖLÇEKLENMELİDİR.
En küçük ve en büyük ayarlarda test edin.
```

---

## 8. Font Yükleme ve Performans

### Font Dosyası Optimizasyonu

```
Mobilde font dosya boyutları önemlidir:
├── Tam font: Ağırlık başına 100-300KB
├── Alt küme (Latin): Ağırlık başına 15-40KB
├── Değişken font: 100-200KB (tüm ağırlıklar)

Öneriler:
├── Gereken karakterlere alt kümele (subset)
├── WOFF2 formatı kullan
├── Maks 2-3 font dosyası
├── Değişken fontları düşün
├── Fontları uygun şekilde önbellekle
```

### Yükleme Stratejisi

```
1. SİSTEM FONTUNA GERİ DÖNÜŞ (SYSTEM FONT FALLBACK)
   Sistem fontunu göster → özel font yüklendiğinde değiştir
   
2. FONT DISPLAY SWAP
   font-display: swap (CSS)
   
3. KRİTİK FONTLARI ÖN YÜKLE (PRELOAD)
   Ekranın üst kısmında (above fold) gereken fontları ön yükle
   
4. RENDER'I ENGELLEME
   İçeriği göstermek için fontları bekleme
```

---

## 9. Tipografi Kontrol Listesi

### Herhangi Bir Metin Tasarımından Önce

- [ ] Gövde metni ≥ 16px/pt/sp mi?
- [ ] Satır yüksekliği ≥ 1.4 mü?
- [ ] Satır uzunluğu ≤ 60 karakter mi?
- [ ] Tip ölçeği tanımlı mı (maks 5-7 boyut)?
- [ ] pt (iOS) veya sp (Android) kullanılıyor mu?

### Yayından Önce

- [ ] Dinamik Tip test edildi mi (iOS)?
- [ ] Font ölçekleme, %200'de test edildi mi (Android)?
- [ ] Koyu mod kontrastı kontrol edildi mi?
- [ ] Güneş ışığında okunabilirlik test edildi mi?
- [ ] Tüm metnin uygun hiyerarşisi var mı?
- [ ] Özel fontların geri dönüşleri (fallbacks) var mı?
- [ ] Uzun metin düzgün kaydırılıyor mu?

---

## 10. Hızlı Referans

### Tipografi Tokenları

```
// iOS
.largeTitle  // 34pt, Bold
.title       // 28pt, Bold
.title2      // 22pt, Bold
.title3      // 20pt, Semibold
.headline    // 17pt, Semibold
.body        // 17pt, Regular
.subheadline // 15pt, Regular
.footnote    // 13pt, Regular
.caption     // 12pt, Regular

// Android (Material 3)
displayLarge   // 57sp
headlineLarge  // 32sp
titleLarge     // 22sp
bodyLarge      // 16sp
labelLarge     // 14sp
```

### Minimum Boyutlar

```
Gövde:      14-16pt/sp (16 tercih edilen)
İkincil:    12-13pt/sp
Altyazı:    11-12pt/sp
Hiçbir şey: < 11pt/sp
```

### Satır Yüksekliği

```
Başlıklar: 1.1-1.3
Gövde:     1.4-1.6
Uzun metin: 1.5-1.75
```

---

> **Unutmayın:** Kullanıcılar metninizi okuyamazsa, uygulamanız bozuktur. Tipografi dekorasyon değildir—birincil arayüzdür. Gerçek cihazlarda, gerçek koşullarda, erişilebilirlik ayarları etkinleştirilmiş olarak test edin.
