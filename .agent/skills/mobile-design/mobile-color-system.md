# Mobil Renk Sistemi Referansı

> OLED optimizasyonu, koyu mod, pil dostu renkler ve dış mekan görünürlüğü.
> **Mobilde renk sadece estetik değildir—pil ömrü ve kullanılabilirliktir.**

---

## 1. Mobil Renk Temelleri

### Mobil Renk Neden Farklıdır

```
MASAÜSTÜ:                          MOBİL:
├── LCD ekranlar (arkadan aydınlatmalı) ├── OLED yaygın (kendinden yayılan)
├── Kontrollü aydınlatma           ├── Dış mekan, parlak güneş
├── Kararlı güç                    ├── Pil önemli
├── Kişisel tercih                 ├── Sistem geneli koyu mod
└── Statik görüntüleme             └── Değişken açılar, hareket
```

### Mobil Renk Öncelikleri

| Öncelik | Neden |
|----------|-----|
| **1. Okunabilirlik** | Dış mekan, değişken aydınlatma |
| **2. Pil verimliliği** | OLED = koyu mod güç tasarrufu sağlar |
| **3. Sistem entegrasyonu** | Koyu/açık mod desteği |
| **4. Semantik** | Hata, başarı, uyarı renkleri |
| **5. Marka** | Fonksiyonel gereksinimlerden sonra |

---

## 2. OLED Hususları

### OLED Nasıl Farklılaşır

```
LCD (Sıvı Kristal Ekran):
├── Arka ışık her zaman açık
├── Siyah = karanlık filtreden geçen arka ışık
├── Enerji kullanımı = sabit
└── Koyu mod = pil tasarrufu yok

OLED (Organik LED):
├── Her piksel kendi ışığını yayar
├── Siyah = piksel KAPALI (sıfır güç)
├── Enerji kullanımı = daha parlak pikseller daha fazla kullanır
└── Koyu mod = önemli pil tasarrufu
```

### OLED ile Pil Tasarrufu

```
Renk enerji tüketimi (göreceli):

#000000 (Gerçek Siyah)  ████░░░░░░  %0
#1A1A1A (Siyaha Yakın)  █████░░░░░  ~%15
#333333 (Koyu Gri)      ██████░░░░  ~%30
#666666 (Orta Gri)      ███████░░░  ~%50
#FFFFFF (Beyaz)         ██████████  %100

Doygun renkler de önemli güç kullanır:
├── Mavi pikseller: En verimli
├── Yeşil pikseller: Orta
├── Kırmızı pikseller: En az verimli
└── Doygunluğu azaltılmış renkler daha fazla tasarruf sağlar
```

### Gerçek Siyah vs Siyaha Yakın

```
#000000 (Gerçek Siyah):
├── Maksimum pil tasarrufu
├── Kaydırmada "siyah lekelenmeye" (black smear) neden olabilir
├── Keskin kontrast (sert olabilir)
└── Apple tarafından saf koyu modda kullanılır

#121212 veya #1A1A1A (Siyaha Yakın):
├── Hala iyi pil tasarrufu
├── Daha pürüzsüz kaydırma (lekelenme yok)
├── Gözler için biraz daha yumuşak
└── Material Design önerisi

ÖNERİ: Arka planlar için #000000, yüzeyler için #0D0D0D-#1A1A1A
```

---

## 3. Koyu Mod Tasarımı

### Koyu Mod Faydaları

```
Kullanıcılar koyu modu şunlar için etkinleştirir:
├── Pil tasarrufu (OLED)
├── Azaltılmış göz yorgunluğu (düşük ışık)
├── Kişisel tercih
├── AMOLED estetiği
└── Erişilebilirlik (ışık hassasiyeti)
```

### Koyu Mod Renk Stratejisi

```
AÇIK MOD                      KOYU MOD
──────────                      ─────────
Arka Plan:  #FFFFFF      →      #000000 veya #121212
Yüzey:      #F5F5F5      →      #1E1E1E
Yüzey 2:    #EEEEEE      →      #2C2C2C

Birincil:   #1976D2      →      #90CAF9 (daha açık)
Metin:      #212121      →      #E0E0E0 (saf beyaz değil)
İkincil:    #757575      →      #9E9E9E

Koyu modda yükselti (elevation):
├── Daha yüksek = biraz daha açık yüzey
├── 0dp →  %0 bindirme
├── 4dp →  %9 bindirme
├── 8dp →  %12 bindirme
└── Gölgeler olmadan derinlik yaratır
```

### Koyu Modda Metin Renkleri

| Rol | Açık Mod | Koyu Mod |
|------|------------|-----------|
| Birincil | #000000 (Siyah) | #E8E8E8 (Saf beyaz değil) |
| İkincil | #666666 | #B0B0B0 |
| Devre Dışı | #9E9E9E | #6E6E6E |
| Linkler | #1976D2 | #8AB4F8 |

### Renk Ters Çevirme Kuralları

```
Sadece renkleri ters çevirmeyin:
├── Doygun renkler göz yakıcı olur
├── Semantik renkler anlamını yitirir
├── Marka renkleri bozulabilir
└── Kontrast oranları öngörülemez şekilde değişir

Bilinçli bir koyu palet OLUŞTURUN:
├── Birincil renklerin doygunluğunu azaltın
├── Vurgu için daha açık tonlar kullanın
├── Semantik renk anlamlarını koruyun
├── Kontrast oranlarını bağımsız olarak kontrol edin
```

---

## 4. Dış Mekan Görünürlüğü

### Güneş Işığı Sorunu

```
Dış mekanda ekran görünürlüğü:
├── Parlak güneş düşük kontrastı yıkar
├── Parlama okunabilirliği azaltır
├── Polarize güneş gözlükleri etkiler
└── Kullanıcılar elleriyle ekrana gölge yapar

Etkilenen öğeler:
├── Beyaz üzerinde açık gri metin
├── İnce renk farklılıkları
├── Düşük opaklıklı bindirmeler
└── Pastel renkler
```

### Yüksek Kontrast Stratejileri

```
Dış mekan görünürlüğü için:

MİNİMUM KONTRAST ORANLARI:
├── Normal metin: 4.5:1 (WCAG AA)
├── Büyük metin: 3:1 (WCAG AA)
├── Önerilen: 7:1+ (AAA)

KAÇININ:
├── #FFF üzerinde #999 (AA başarısız)
├── #FFF üzerinde #BBB (başarısız)
├── Açık arka planlarda soluk renkler
└── Kritik bilgi için ince gradyanlar

YAPIN:
├── Sistem semantik renklerini kullanın
├── Parlak ortamda test edin
├── Yüksek kontrast modu sağlayın
└── Kritik UI için düz (solid) renkler kullanın
```

---

## 5. Semantik Renkler

### Tutarlı Anlam

| Semantik | Anlam | iOS Varsayılan | Android Varsayılan |
|----------|---------|-------------|-----------------|
| Hata | Sorunlar, yıkım | #FF3B30 | #B3261E |
| Başarı | Tamamlanma, olumlu | #34C759 | #4CAF50 |
| Uyarı | Dikkat, uyarı | #FF9500 | #FFC107 |
| Bilgi | Bilgilendirme | #007AFF | #2196F3 |

### Semantik Renk Kuralları

```
Semantik renkleri şunlar için ASLA kullanmayın:
├── Markalama (anlamı karıştırır)
├── Dekorasyon (etkiyi azaltır)
├── Keyfi stillendirme
└── Durum göstergeleri (ikonları da kullanın)

HER ZAMAN:
├── İkonlarla eşleştirin (renk körü kullanıcılar)
├── Açık/koyu modlarda koruyun
├── Uygulama genelinde tutarlı tutun
└── Platform kurallarına uyun
```

### Hata Durumu Renkleri

```
Hata durumları şunlara ihtiyaç duyar:
├── Kırmızımsı renk (semantik)
├── Arka plana karşı yüksek kontrast
├── İkon takviyesi
├── Net metin açıklaması

iOS:
├── Açık: #FF3B30
├── Koyu: #FF453A

Android:
├── Açık: #B3261E
├── Koyu: #F2B8B5 (hata kapsayıcısı üzerinde)
```

---

## 6. Dinamik Renk (Android)

### Material You

```
Android 12+ Dinamik Renk:

Kullanıcının duvar kağıdı → Renk çıkarma → Uygulama teması

Uygulamanız otomatik olarak şunları alır:
├── Birincil (duvar kağıdı baskın renginden)
├── İkincil (tamamlayıcı)
├── Üçüncül (vurgu)
├── Yüzey renkleri (nötr, türetilmiş)
├── On-renkler (her birinin üzerindeki metin)
```

### Dinamik Renk Desteği

```kotlin
// Jetpack Compose
MaterialTheme(
    colorScheme = dynamicColorScheme()
        ?: staticColorScheme() // Eski Android için yedek
)

// React Native
// Sınırlı destek - react-native-material-you düşünün
```

### Yedek (Fallback) Renkler

```
Dinamik renk kullanılamadığında:
├── Android < 12
├── Kullanıcı devre dışı bıraktı
├── Desteklemeyen başlatıcılar

Statik renk şeması sağlayın:
├── Marka renklerinizi tanımlayın
├── Her iki modda test edin
├── Dinamik renk rollerini eşleştirin
└── Açık + koyu desteği verin
```

---

## 7. Renk Erişilebilirliği

### Renk Körlüğü Hususları

```
Erkeklerin ~%8'i, kadınların ~%0.5'i renk körüdür

Türler:
├── Protanopia (kırmızı zayıflığı)
├── Deuteranopia (yeşil zayıflığı)
├── Tritanopia (mavi zayıflığı)
├── Monokromasi (nadir, renk yok)

Tasarım kuralları:
├── Asla sadece renge güvenmeyin
├── Desenler, ikonlar, metin kullanın
├── Simülasyon araçlarıyla test edin
├── Sadece kırmızı/yeşil ayrımlarından kaçının
```

### Kontrast Test Araçları

```
Doğrulamak için bunları kullanın:
├── Yerleşik erişilebilirlik denetçisi (Xcode)
├── Accessibility Scanner (Android)
├── Kontrast oranı hesaplayıcıları
├── Renk körlüğü simülasyonu
└── Güneş ışığında gerçek cihazlarda test
```

### Yeterli Kontrast

```
WCAG Yönergeleri:

AA (Minimum)
├── Normal metin: 4.5:1
├── Büyük metin (18pt+): 3:1
├── UI bileşenleri: 3:1

AAA (Gelişmiş)
├── Normal metin: 7:1
├── Büyük metin: 4.5:1

Mobil önerisi: AA'yı karşılayın, AAA'yı hedefleyin
```

---

## 8. Renk Anti-Desenleri

### ❌ Yaygın Hatalar

| Hata | Sorun | Düzeltme |
|---------|---------|-----|
| **Beyaz üzerinde açık gri** | Dış mekanda görünmez | Min 4.5:1 kontrast |
| **Koyu modda saf beyaz** | Göz yorgunluğu | #E0E0E0-#F0F0F0 kullanın |
| **Aynı doygunlukta koyu mod** | Göz alıcı, parlayan | Renklerin doygunluğunu azaltın |
| **Sadece kırmızı/yeşil gösterge** | Renk körü kullanıcılar göremez | İkon ekleyin |
| **Marka için semantik renkler** | Anlam karmaşası | Marka için nötr kullanın |
| **Sistem koyu modunu yok sayma** | Sarsıcı deneyim | Her iki modu destekleyin |

### ❌ AI Renk Hataları

```
AI şunlara meyillidir:
├── Açık/koyu için aynı renkleri kullanmak
├── OLED pil etkilerini görmezden gelmek
├── Kontrast hesaplamalarını atlamak
├── Varsayılan olarak mor/eflatun kullanmak (YASAKLI)
├── Düşük kontrastlı "estetik" griler kullanmak
├── Dış mekan koşullarında test etmemek
└── Renk körü kullanıcıları unutmak

KURAL: En kötü durum için tasarlayın.
Parlak güneş ışığında, renk körlüğü simülasyonu ile test edin.
```

---

## 9. Renk Sistemi Kontrol Listesi

### Renkleri Seçmeden Önce

- [ ] Açık ve koyu mod varyantları tanımlandı mı?
- [ ] Kontrast oranları kontrol edildi mi (4.5:1+)?
- [ ] OLED pil düşünüldü mü (koyu mod)?
- [ ] Semantik renkler kurallara uyuyor mu?
- [ ] Renk körü güvenli mi (sadece renk göstergeleri değil)?

### Yayınlamadan Önce

- [ ] Parlak güneş ışığında test edildi mi?
- [ ] OLED cihazda koyu mod test edildi mi?
- [ ] Sistem koyu moduna saygı duyuluyor mu?
- [ ] Dinamik renk destekleniyor mu (Android)?
- [ ] Hata/başarı/uyarı tutarlı mı?
- [ ] Tüm metinler kontrast gereksinimlerini karşılıyor mu?

---

## 10. Hızlı Referans

### Koyu Mod Arka Planları

```
Gerçek siyah (OLED maks tasarruf): #000000
Siyaha yakın (Material):           #121212
Yüzey 1:                           #1E1E1E
Yüzey 2:                           #2C2C2C
Yüzey 3:                           #3C3C3C
```

### Koyu Üzerinde Metin

```
Birincil:   #E0E0E0 - #ECECEC
İkincil:    #A0A0A0 - #B0B0B0
Devre Dışı: #606060 - #707070
```

### Kontrast Oranları

```
Küçük metin:  4.5:1 (minimum)
Büyük metin:  3:1 (minimum)
UI öğeleri:   3:1 (minimum)
İdeal:        7:1 (AAA)
```

---

> **Unutmayın:** Mobilde renk en kötü koşullarda çalışmalıdır—parlak güneş, yorgun gözler, renk körlüğü, düşük pil. Bu testleri geçemeyen güzel renkler işe yaramaz renklerdir.
