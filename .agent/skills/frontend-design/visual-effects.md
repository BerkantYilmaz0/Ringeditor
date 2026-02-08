# Görsel Efektler Referansı

> Modern CSS efekt prensipleri ve teknikleri - kavramları öğrenin, varyasyonlar yaratın.
> **Kopyalanacak sabit değerler yok - desenleri anlayın.**

---

## 1. Glassmorphism (Buzlu Cam) Prensipleri

### Glassmorphism'i Çalıştıran Nedir

```
Anahtar Özellikler:
├── Yarı saydam arka plan (katı değil)
├── Arka plan bulanıklığı (buzlu cam efekti)
├── İnce kenarlık (tanım için)
└── Genellikle: derinlik için hafif gölge
```

### Desen (Değerleri Özelleştirin)

```css
.glass {
  /* Saydamlık: içerik okunabilirliğine göre opaklığı ayarlayın */
  background: rgba(R, G, B, OPACITY);
  /* OPACITY: koyu bg için 0.1-0.3, açık bg için 0.5-0.8 */
  
  /* Bulanıklık: daha yüksek = daha buzlu */
  backdrop-filter: blur(AMOUNT);
  /* AMOUNT: 8-12px ince, 16-24px güçlü */
  
  /* Kenarlık: kenarları tanımlar */
  border: 1px solid rgba(255, 255, 255, OPACITY);
  /* OPACITY: tipik olarak 0.1-0.3 */
  
  /* Yarıçap: tasarım sisteminize uyun */
  border-radius: YARICAPINIZ;
}
```

### Glassmorphism Ne Zaman Kullanılır
- ✅ Renkli/resimli arka planlar üzerinde
- ✅ Modallar, bindirmeler (overlays), kartlar
- ✅ Arkasında kayan içerik olan navigasyon çubukları
- ❌ Metin yoğun içerik (okunabilirlik sorunları)
- ❌ Basit katı arka planlar (anlamsız)

### Ne Zaman KULLANILMAZ
- Düşük kontrast durumları
- Erişilebilirlik açısından kritik içerik
- Performans kısıtlı cihazlar

---

## 2. Neomorphism Prensipleri

### Neomorphism'i Çalıştıran Nedir

```
Anahtar Kavram: İKİLİ gölgeler kullanan yumuşak, ekstrüde (kabartma) öğeler
├── Açık gölge (ışık kaynağı yönünden)
├── Koyu gölge (zıt yönden)
└── Arka plan çevreyle eşleşir (aynı renk)
```

### Desen

```css
.neo-raised {
  /* Arka plan ebeveynle EŞLEŞMELİDİR */
  background: EBEVEYN_ILE_AYNI;
  
  /* İki gölge: ışık yönü + karanlık yön */
  box-shadow: 
    OFFSET OFFSET BLUR rgba(light-color),
    -OFFSET -OFFSET BLUR rgba(dark-color);
  
  /* OFFSET: tipik olarak 6-12px */
  /* BLUR: tipik olarak 12-20px */
}

.neo-pressed {
  /* Inset "içe basılmış" efekti yaratır */
  box-shadow: 
    inset OFFSET OFFSET BLUR rgba(dark-color),
    inset -OFFSET -OFFSET BLUR rgba(light-color);
}
```

### Erişilebilirlik Uyarısı
⚠️ **Düşük kontrast** - idareli kullanın, net sınırlar sağlayın

### Ne Zaman Kullanılır
- Dekoratif öğeler
- İnce etkileşimli durumlar
- Düz renkli minimalist UI

---

## 3. Gölge Hiyerarşisi Prensipleri

### Kavram: Gölgeler Yüksekliği Belirtir

```
Daha yüksek irtifa = daha büyük gölge
├── Seviye 0: Gölge yok (yüzeyde düz)
├── Seviye 1: İnce gölge (hafifçe yükseltilmiş)
├── Seviye 2: Orta gölge (kartlar, butonlar)
├── Seviye 3: Büyük gölge (modallar, açılır menüler)
└── Seviye 4: Derin gölge (yüzen öğeler)
```

### Ayarlanacak Gölge Özellikleri

```css
box-shadow: OFFSET-X OFFSET-Y BLUR SPREAD COLOR;

/* Offset: gölgenin yönü */
/* Blur: yumuşaklık (daha büyük = daha yumuşak) */
/* Spread: boyut genişlemesi */
/* Color: tipik olarak düşük opaklıklı siyah */
```

### Doğal Gölgeler İçin Prensipler

1. **Y-offset X'ten büyük** (ışık yukarıdan gelir)
2. **Düşük opaklık** (ince için %5-15, belirgin için %15-25)
3. **Çoklu katmanlar** gerçekçilik için (ortam + doğrudan)
4. **Bulanıklık offset ile ölçeklenir** (daha büyük offset = daha büyük bulanıklık)

### Koyu Mod Gölgeleri
- Gölgeler koyu arka planlarda daha az görünür
- Opaklığı artırmanız gerekebilir
- Veya bunun yerine parıltı/vurgu kullanın

---

## 4. Gradyan Prensipleri

### Türler ve Ne Zaman Kullanılır

| Tür | Desen | Kullanım Durumu |
|------|---------|----------|
| **Lineer** | Çizgi boyunca Renk A → Renk B | Arka planlar, butonlar, başlıklar |
| **Radyal** | Merkez → dışa doğru | Spot ışıkları, odak noktaları |
| **Konik** | Merkez etrafında | Pasta grafikler, yaratıcı efektler |

### Uyumlu Gradyanlar Yaratma

```
İyi Gradyan Kuralları:
├── Çarkta YAN YANA renkleri kullanın (analog)
├── Veya farklı açıklıkta aynı renk tonu
├── Tamamlayıcıdan kaçının (sert görünebilir)
└── Daha pürüzsüz geçişler için ara duraklar ekleyin
```

### Gradyan Sözdizimi Deseni

```css
.gradient {
  background: linear-gradient(
    YON,                 /* açı veya to-keyword */
    RENK-DURAGI-1,       /* renk + isteğe bağlı konum */
    RENK-DURAGI-2,
    /* ... daha fazla durak */
  );
}

/* YON örnekleri: */
/* 90deg, 135deg, to right, to bottom right */
```

### Mesh (Ağ) Gradyanlar

```
Örtüşen çoklu radyal gradyanlar:
├── Her biri farklı konumda
├── Her biri şeffaf düşüşlü (falloff)
├── **Hero bölümlerinde "Wow" faktörü için zorunlu**
└── Organik, renkli efekt yaratır (Ara: "Aurora Gradient CSS")
```

---

## 5. Kenarlık Efektleri Prensipleri

### Gradyan Kenarlıklar

```
Teknik: Gradyan arka planlı sözde öğe (pseudo-element)
├── Öğenin padding'i = kenarlık genişliği
├── Sözde öğe gradyanla dolar
└── Maske veya clip kenarlık efekti yaratır
```

### Animasyonlu Kenarlıklar

```
Teknik: Dönen gradyan veya konik süpürme
├── İçerikten daha büyük sözde öğe
├── Animasyon gradyanı döndürür
└── Overflow hidden şekle göre kırpar
```

### Parıltılı (Glow) Kenarlıklar

```css
/* Çoklu box-shadow parıltı yaratır */
box-shadow:
  0 0 KUCUK-BLUR RENK,
  0 0 ORTA-BLUR RENK,
  0 0 BUYUK-BLUR RENK;

/* Her katman parıltıya eklenir */
```

---

## 6. Parıltı (Glow) Efektleri Prensipleri

### Metin Parıltısı

```css
text-shadow: 
  0 0 BLUR-1 RENK,
  0 0 BLUR-2 RENK,
  0 0 BLUR-3 RENK;

/* Çoklu katmanlar = daha güçlü parıltı */
/* Daha büyük bulanıklık = daha yumuşak yayılma */
```

### Öğe Parıltısı

```css
box-shadow:
  0 0 BLUR-1 RENK,
  0 0 BLUR-2 RENK;

/* Gerçekçi parıltı için öğe ile eşleşen renk kullanın */
/* İnce için düşük opaklık, neon için yüksek */
```

### Nabız Gibi Atan Parıltı Animasyonu

```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 KUCUK-BLUR RENK; }
  50% { box-shadow: 0 0 BUYUK-BLUR RENK; }
}

/* Yumuşatma ve süre hissi etkiler */
```

---

## 7. Bindirme (Overlay) Teknikleri

### Resimler Üzerinde Gradyan Bindirme

```
Amaç: Resimler üzerindeki metin okunabilirliğini artırmak
Desen: Şeffaftan opağa gradyan
Konum: Metnin görüneceği yer
```

```css
.overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    YON,
    transparent YUZDE,
    rgba(0,0,0,OPAKLIK) 100%
  );
}
```

### Renkli Bindirme

```css
/* Karışım modu veya katmanlı gradyan */
background: 
  linear-gradient(OPAKLIKLI-RENGINIZ),
  url('image.jpg');
```

---

## 8. Modern CSS Teknikleri

### Kapsayıcı Sorguları (Container Queries) (Kavram)

```
Görüntü alanı kırılma noktaları yerine:
├── Bileşen KENDİ kapsayıcısına yanıt verir
├── Gerçekten modüler, yeniden kullanılabilir bileşenler
└── Sözdizimi: @container (condition) { }
```

### :has() Seçicisi (Kavram)

```
Çocuklara dayalı ebeveyn stillendirme:
├── "X çocuğuna sahip ebeveyn"
├── Önceden imkansız olan desenleri mümkün kılar
└── Aşamalı geliştirme yaklaşımı
```

### Kaydırma Güdümlü Animasyonlar (Scroll-Driven Animations) (Kavram)

```
Animasyon ilerlemesi kaydırmaya bağlı:
├── Kaydırmada giriş/çıkış animasyonları
├── Paralaks efektleri
├── İlerleme göstergeleri
└── Görünüm tabanlı veya kaydırma tabanlı zaman çizelgesi
```

---

## 9. Performans Prensipleri

### GPU-Hızlandırmalı Özellikler

```
Canlandırması UCUZ (GPU):
├── transform (translate, scale, rotate)
└── opacity

Canlandırması PAHALI (CPU):
├── width, height
├── top, left, right, bottom
├── margin, padding
└── box-shadow (yeniden hesaplar)
```

### will-change Kullanımı

```css
/* İdareli kullanın, sadece ağır animasyonlar için */
.heavy-animation {
  will-change: transform;
}

/* Mümkünse animasyondan sonra kaldırın */
```

### Azaltılmış Hareket

```css
@media (prefers-reduced-motion: reduce) {
  /* Animasyonları devre dışı bırakın veya en aza indirin */
  /* Kullanıcı tercihine saygı gösterin */
}
```

---

## 10. Efekt Seçim Kontrol Listesi

Herhangi bir efekti uygulamadan önce:

- [ ] **Bir amaca hizmet ediyor mu?** (sadece dekorasyon değil)
- [ ] **Bağlam için uygun mu?** (marka, kitle)
- [ ] **Önceki projelerden farklılaştı mı?** (tekrardan kaçın)
- [ ] **Erişilebilir mi?** (kontrast, hareket hassasiyeti)
- [ ] **Performanslı mı?** (özellikle mobilde)
- [ ] **Kullanıcı tercihi sordunuz mu?** (stil ucu açıksa)

### Anti-Desenler

- ❌ Her öğede Glassmorphism (kitsch)
- ❌ Varsayılan olarak Koyu + neon (tembel AI görünümü)
- ❌ **Derinliği olmayan Statik/Düz tasarımlar (BAŞARISIZ)**
- ❌ Okunabilirliğe zarar veren efektler
- ❌ Amacı olmayan animasyonlar

---

> **Unutmayın**: Efektler anlamı güçlendirir. "Havalı göründüğü" için değil, amaç ve bağlama göre seçim yapın.
