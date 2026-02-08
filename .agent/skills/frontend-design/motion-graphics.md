# Hareketli Grafikler Referansı

> Premium web deneyimleri için gelişmiş animasyon teknikleri - Lottie, GSAP, SVG, 3D, Parçacıklar.
> **Prensipleri öğrenin, WOW efektleri yaratın.**

---

## 1. Lottie Animasyonları

### Lottie Nedir?

```
JSON tabanlı vektör animasyonları:
├── Bodymovin aracılığıyla After Effects'ten dışa aktarılır
├── Hafif (GIF/videodan daha küçük)
├── Ölçeklenebilir (vektör tabanlı, pikselleşme yok)
├── Etkileşimli (oynatmayı kontrol et, segmentler)
└── Çapraz platform (web, iOS, Android, React Native)
```

### Lottie Ne Zaman Kullanılır

| Kullanım Durumu | Neden Lottie? |
|----------|-------------|
| **Yükleme animasyonları** | Markalı, pürüzsüz, hafif |
| **Boş durumlar** | İlgi çekici illüstrasyonlar |
| **İşe alıştırma (Onboarding) akışları** | Karmaşık çok adımlı animasyonlar |
| **Başarı/Hata geri bildirimi** | Hoş mikro etkileşimler |
| **Animasyonlu ikonlar** | Tutarlı çapraz platform |

### Prensipler

- Performans için dosya boyutunu 100KB altında tutun
- Döngüyü (loop) idareli kullanın (dikkat dağıtmasından kaçının)
- Azaltılmış hareket (reduced-motion) için statik yedek sağlayın
- Mümkün olduğunda animasyon dosyalarını tembel yükleyin (lazy load)

### Kaynaklar

- LottieFiles.com (ücretsiz kütüphane)
- After Effects + Bodymovin (özel)
- Figma eklentileri (tasarımdan dışa aktarma)

---

## 2. GSAP (GreenSock)

### GSAP'ı Farklı Kılan Nedir

```
Profesyonel zaman çizelgesi (timeline) tabanlı animasyon:
├── Diziler üzerinde hassas kontrol
├── Kaydırma güdümlü animasyonlar için ScrollTrigger
├── Şekil geçişleri için MorphSVG
├── Fizik tabanlı yumuşatma (easing)
└── Herhangi bir DOM öğesiyle çalışır
```

### Temel Kavramlar

| Kavram | Amaç |
|---------|---------|
| **Tween** | Tek A→B animasyonu |
| **Timeline** | Sıralı/örtüşen animasyonlar |
| **ScrollTrigger** | Kaydırma pozisyonu oynatmayı kontrol eder |
| **Stagger** | Öğeler arasında basamaklı efekt |

### GSAP Ne Zaman Kullanılır

- ✅ Karmaşık sıralı animasyonlar
- ✅ Kaydırma ile tetiklenen ortaya çıkarmalar
- ✅ Hassas zamanlama kontrolü gerektiğinde
- ✅ SVG morfoloji (morphing) efektleri
- ❌ Basit hover/focus efektleri (CSS kullanın)
- ❌ Performans kritik mobil (daha ağır)

### Prensipler

- Orkestrasyon için timeline kullanın (bireysel tweenler değil)
- Stagger gecikmesi: Öğeler arasında 0.05-0.15s
- ScrollTrigger: Görüntü alanı girişinin %70-80'inde başlatın
- Unmount işleminde animasyonları sonlandırın (bellek sızıntılarını önleyin)

---

## 3. SVG Animasyonları

### SVG Animasyon Türleri

| Tür | Teknik | Kullanım Durumu |
|------|-----------|----------|
| **Çizgi Çizimi** | stroke-dashoffset | Logo ortaya çıkışı, imzalar |
| **Morfoz (Morph)** | Yol (path) interpolasyonu | İkon geçişleri |
| **Dönüşüm (Transform)** | rotate, scale, translate | Etkileşimli ikonlar |
| **Renk** | fill/stroke geçişi | Durum değişiklikleri |

### Çizgi Çizimi Prensipleri

```
stroke-dashoffset çizimi nasıl çalışır:
├── dasharray'i yol uzunluğuna ayarla
├── dashoffset'i dasharray'e eşit ayarla (gizli)
├── dashoffset'i 0'a canlandır (ortaya çıkar)
└── "Çizim" efekti yarat
```

### SVG Animasyonları Ne Zaman Kullanılır

- ✅ Logo ortaya çıkışı, marka anları
- ✅ İkon durum geçişleri (hamburger ↔ X)
- ✅ İnfografikler, veri görselleştirme
- ✅ Etkileşimli illüstrasyonlar
- ❌ Foto-gerçekçi içerik (video kullanın)
- ❌ Çok karmaşık sahneler (performans)

### Prensipler

- Doğruluk için yol uzunluğunu dinamik olarak alın
- Süre: Tam çizimler için 1-3s
- Yumuşatma (Easing): Doğal his için ease-out
- Basit dolgular (fills) tamamlar, rekabet etmez

---

## 4. 3D CSS Dönüşümleri

### Temel Özellikler

```
CSS 3D Uzayı:
├── perspective: 3D alan derinliği (500-1500px tipik)
├── transform-style: preserve-3d (çocukların 3D'sini etkinleştir)
├── rotateX/Y/Z: eksen başına dönüş
├── translateZ: izleyiciye doğru/uzaklaştır
└── backface-visibility: arka yüzü göster/gizle
```

### Yaygın 3D Desenler

| Desen | Kullanım Durumu |
|---------|----------|
| **Kart çevirme** | Ortaya çıkarma, bilgi kartları, ürün görünümleri |
| **Hover ile eğilme** | Etkileşimli kartlar, 3D derinlik |
| **Paralaks katmanlar** | Kahraman bölümleri, sürükleyici kaydırma |
| **3D atlıkarınca** | Resim galerileri, kaydırıcılar |

### Prensipler

- Perspektif: İnce için 800-1200px, dramatik için 400-600px
- Dönüşümleri basit tutun (döndür + taşı)
- Backface-visibility sağlayın: çevirmeler için hidden
- Safari'de test edin (farklı renderlama)

---

## 5. Parçacık (Particle) Efektleri

### Parçacık Sistemi Türleri

| Tür | Hissiyat | Kullanım Durumu |
|------|------|----------|
| **Geometrik** | Teknoloji, ağ | SaaS, teknoloji siteleri |
| **Konfeti** | Kutlama | Başarı anları |
| **Kar/Yağmur** | Atmosferik | Mevsimsel, ruh hali |
| **Toz/Bokeh** | Rüya gibi | Fotoğrafçılık, lüks |
| **Ateş böcekleri** | Büyülü | Oyunlar, fantezi |

### Kütüphaneler

| Kütüphane | En İyisi |
|---------|----------|
| **tsParticles** | Yapılandırılabilir, hafif |
| **particles.js** | Basit arka planlar |
| **Canvas API** | Özel, maksimum kontrol |
| **Three.js** | Karmaşık 3D parçacıklar |

### Prensipler

- Varsayılan: 30-50 parçacık (bunaltıcı değil)
- Hareket: yavaş, organik (hız 0.5-2)
- Opaklık: 0.3-0.6 (içerikle rekabet etmesin)
- Bağlantılar: "ağ" hissi için ince çizgiler
- ⚠️ Mobilde devre dışı bırakın veya azaltın

### Ne Zaman Kullanılır

- ✅ Kahraman arka planları (atmosferik)
- ✅ Başarı kutlamaları (konfeti patlaması)
- ✅ Teknoloji görselleştirme (bağlı düğümler)
- ❌ İçerik yoğun sayfalar (dikkat dağıtıcı)
- ❌ Düşük güçlü cihazlar (pil tüketimi)

---

## 6. Kaydırma Güdümlü (Scroll-Driven) Animasyonlar

### Native CSS (Modern)

```
CSS Scroll Timelines:
├── animation-timeline: scroll() - belge kaydırma
├── animation-timeline: view() - öğe görüntü alanında
├── animation-range: giriş/çıkış eşikleri
└── JavaScript gerekmez
```

### Prensipler

| Tetikleme Noktası | Kullanım Durumu |
|---------------|----------|
| **Giriş %0** | Öğe girmeye başladığında |
| **Giriş %50** | Yarısı görünür olduğunda |
| **Kapsama (Cover) %50** | Görüntü alanında ortalandığında |
| **Çıkış %100** | Tamamen çıktığında |

### En İyi Uygulamalar

- Ortaya çıkarma animasyonları: ~%25 girişte başlatın
- Paralaks: sürekli kaydırma ilerlemesi
- Yapışkan (Sticky) öğeler: cover aralığını kullanın
- Her zaman kaydırma performansını test edin

---

## 7. Performans Prensipleri

### GPU vs CPU Animasyonu

```
UCUZ (GPU-hızlandırmalı):
├── transform (translate, scale, rotate)
├── opacity
└── filter (idareli kullanın)

PAHALI (yeniden akışı -reflow- tetikler):
├── width, height
├── top, left, right, bottom
├── padding, margin
└── karmaşık box-shadow (kutu gölgesi)
```

### Optimizasyon Kontrol Listesi

- [ ] Sadece transform/opacity canlandırın
- [ ] Ağır animasyonlardan önce `will-change` kullanın (sonra kaldırın)
- [ ] Düşük donanımlı cihazlarda test edin
- [ ] `prefers-reduced-motion` uygulayın
- [ ] Animasyon kütüphanelerini tembel yükleyin (lazy load)
- [ ] Kaydırma tabanlı hesaplamaları kısıtlayın (throttle)

---

## 8. Hareketli Grafikler Karar Ağacı

```
Hangi animasyona ihtiyacınız var?
│
├── Karmaşık markalı animasyon?
│   └── Lottie (After Effects çıktısı)
│
├── Sıralı kaydırma tetiklemeli?
│   └── GSAP + ScrollTrigger
│
├── Logo/ikon animasyonu?
│   └── SVG animasyonu (stroke veya morph)
│
├── Etkileşimli 3D efekti?
│   └── CSS 3D Dönüşümleri (basit) veya Three.js (karmaşık)
│
├── Atmosferik arka plan?
│   └── tsParticles veya Canvas
│
└── Basit giriş/hover?
    └── CSS @keyframes veya Framer Motion
```

---

## 9. Anti-Desenler

| ❌ Yapma | ✅ Yap |
|----------|-------|
| Her şeyi aynı anda canlandır | Basamakla ve sırala |
| Basit efektler için ağır kütüphaneler kullan | CSS ile başla |
| Azaltılmış hareketi görmezden gel | Her zaman yedek sağla |
| Ana iş parçacığını engelle | 60fps için optimize et |
| Her projede aynı parçacıklar | Marka/bağlamla eşleştir |
| Mobilde karmaşık efektler | Özellik tespiti yap |

---

## 10. Hızlı Referans

| Efekt | Araç | Performans |
|--------|------|-------------|
| Yükleme döndürücü | CSS/Lottie | Hafif |
| Basamaklı ortaya çıkma | GSAP/Framer | Orta |
| SVG yol çizimi | CSS stroke | Hafif |
| 3D kart çevirme | CSS transforms | Hafif |
| Parçacık arka planı | tsParticles | Ağır |
| Kaydırma paralaksı | GSAP ScrollTrigger | Orta |
| Şekil morfozu | GSAP MorphSVG | Orta |

---

> **Unutmayın**: Hareketli grafikler geliştirmeli, dikkat dağıtmamalıdır. Her animasyon bir AMACA hizmet etmelidir—geri bildirim, rehberlik, haz veya hikaye anlatımı.
