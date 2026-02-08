---
name: frontend-design
description: Design thinking and decision-making for web UI. Use when designing components, layouts, color schemes, typography, or creating aesthetic interfaces. Teaches principles, not fixed values.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Frontend Tasarım Sistemi

> **Felsefe:** Her pikselin bir amacı vardır. Kısıtlama lükstür. Kullanıcı psikolojisi kararları yönlendirir.
> **Temel Prensip:** DÜŞÜN, ezberleme. SOR, varsayma.

---

## 🎯 Seçici Okuma Kuralı (ZORUNLU)

**HER ZAMAN GEREKLİ dosyaları okuyun, İSTEĞE BAĞLI olanları sadece gerektiğinde:**

| Dosya | Durum | Ne Zaman Okunmalı |
|------|--------|--------------|
| [ux-psychology.md](ux-psychology.md) | 🔴 **GEREKLİ** | Her zaman önce oku! |
| [color-system.md](color-system.md) | ⚪ İsteğe Bağlı | Renk/palet kararları |
| [typography-system.md](typography-system.md) | ⚪ İsteğe Bağlı | Yazı tipi seçimi/eşleştirme |
| [visual-effects.md](visual-effects.md) | ⚪ İsteğe Bağlı | Glassmorphism, gölgeler, gradyanlar |
| [animation-guide.md](animation-guide.md) | ⚪ İsteğe Bağlı | Animasyon gerektiğinde |
| [motion-graphics.md](motion-graphics.md) | ⚪ İsteğe Bağlı | Lottie, GSAP, 3D |
| [decision-trees.md](decision-trees.md) | ⚪ İsteğe Bağlı | Bağlam şablonları |

> 🔴 **ux-psychology.md = HER ZAMAN OKU. Diğerleri = sadece ilgiliyse.**

---

## 🔧 Çalışma Zamanı Scriptleri

**Bunları denetimler için çalıştırın (okumayın, sadece çalıştırın):**

| Script | Amaç | Kullanım |
|--------|---------|-------|
| `scripts/ux_audit.py` | UX Psikolojisi & Erişilebilirlik Denetimi | `python scripts/ux_audit.py <project_path>` |

---

## ⚠️ KRİTİK: VARSAYMADAN ÖNCE SORUNA (ZORUNLU)

> **DUR! Kullanıcının isteği açık uçluysa, favorilerini varsayılan yapma.**

### Kullanıcı İstemi Belirsiz Olduğunda, SOR:

**Renk belirtilmemiş mi?** Sor:
> "Hangi renk paletini tercih edersiniz? (mavi/yeşil/turuncu/nötr/diğer?)"

**Stil belirtilmemiş mi?** Sor:
> "Hangi stili hedefliyorsunuz? (minimal/kalın/retro/fütüristik/organik?)"

**Düzen belirtilmemiş mi?** Sor:
> "Bir düzen tercihiniz var mı? (tek sütun/ızgara/asimetrik/tam genişlik?)"

### ⛔ KAÇINILMASI GEREKEN VARSAYILAN EĞİLİMLER (GÜVENLİ LİMAN KARŞITI):

| AI Varsayılan Eğilimi | Neden Kötü | Bunun Yerine Düşün |
|---------------------|--------------|---------------|
| **Bento Izgaraları (Modern Klişe)** | Her AI tasarımında kullanılıyor | Bu içerik neden bir ızgaraya İHTİYAÇ duyuyor? |
| **Hero Bölme (Sol/Sağ)** | Tahmin edilebilir & Sıkıcı | Peki ya Devasa Tipografi veya Dikey Anlatım? |
| **Mesh/Aurora Gradyanları** | "Yeni" tembel arka plan | Radikal bir renk eşleşmesi nasıl olur? |
| **Glassmorphism** | AI'nın "premium" fikri | Peki ya katı, yüksek kontrastlı düz tasarım? |
| **Derin Camgöbeği (Cyan) / Fintech Mavisi** | Mor yasağından güvenli liman | Neden Kırmızı, Siyah veya Neon Yeşil değil? |
| **"Orkestre et / Güçlendir"** | AI tarafından oluşturulan metin yazarlığı | Bir insan bunu nasıl söylerdi? |
| Koyu arka plan + neon parıltı | Aşırı kullanılmış, "AI görünümü" | MARKANIN aslında neye ihtiyacı var? |
| **Her şey yuvarlatılmış** | Genel/Güvenli | Keskin, brütalist kenarları nerede kullanabilirim? |

> 🔴 **"Seçtiğiniz her 'güvenli' yapı sizi genel bir şablona bir adım daha yaklaştırır. RİSK ALIN."**

---

## 1. Kısıtlama Analizi (HER ZAMAN İLK)

Herhangi bir tasarım çalışmasından önce, BUNLARI CEVAPLAYIN veya KULLANICIYA SORUN:

| Kısıtlama | Soru | Neden Önemli |
|------------|----------|----------------|
| **Zaman Çizelgesi** | Ne kadar zaman? | Karmaşıklığı belirler |
| **İçerik** | Hazır mı yoksa yer tutucu mu? | Düzen esnekliğini etkiler |
| **Marka** | Mevcut yönergeler? | Renkleri/yazı tiplerini dikte edebilir |
| **Teknoloji** | Hangi yığın? | Yetenekleri etkiler |
| **Hedef Kitle** | Tam olarak kim? | Tüm görsel kararları yönlendirir |

### Hedef Kitle → Tasarım Yaklaşımı

| Hedef Kitle | Hakkında Düşün |
|----------|-------------|
| **Gen Z** | Cesur, hızlı, mobil öncelikli, otantik |
| **Y kuşağı (Millennials)** | Temiz, minimal, değer odaklı |
| **X kuşağı (Gen X)** | Tanıdık, güvenilir, net |
| **Boomers** | Okunabilir, yüksek kontrast, basit |
| **B2B** | Profesyonel, veri odaklı, güven |
| **Lüks** | Ölçülü zarafet, beyaz boşluk |

---

## 2. UX Psikolojisi Prensipleri

### Temel Yasalar (Bunları İçselleştirin)

| Yasa | Prensip | Uygulama |
|-----|-----------|-------------|
| **Hick Yasası** | Daha fazla seçenek = daha yavaş kararlar | Seçenekleri sınırla, aşamalı ifşa kullan |
| **Fitts Yasası** | Daha büyük + daha yakın = tıklaması daha kolay | CTA'ları uygun şekilde boyutlandır |
| **Miller Yasası** | Çalışma belleğinde ~7 öğe | İçeriği gruplara ayır (chunking) |
| **Von Restorff** | Farklı = akılda kalıcı | CTA'ları görsel olarak belirgin yap |
| **Seri Konum** | İlk/son en çok hatırlanan | Anahtar bilgileri başlangıçta/sonda ver |

### Duygusal Tasarım Seviyeleri

```
VISCERAL (anlık)  → İlk izlenim: renkler, görüntüler, genel his
BEHAVIORAL (kullanım)    → Kullanırken: hız, geri bildirim, verimlilik
REFLECTIVE (hatıra) → Sonra: "Bunun benim hakkımda söylediklerini seviyorum"
```

### Güven İnşası

- Hassas işlemlerde güvenlik göstergeleri
- İlgili yerlerde sosyal kanıt
- Net iletişim/destek erişimi
- Tutarlı, profesyonel tasarım
- Şeffaf politikalar

---

## 3. Düzen Prensipleri

### Altın Oran (φ = 1.618)

```
Orantısal uyum için kullanın:
├── İçerik : Kenar Çubuğu = kabaca %62 : %38
├── Her başlık boyutu = önceki × 1.618 (dramatik ölçek için)
├── Boşluklandırma izleyebilir: sm → md → lg (her biri × 1.618)
```

### 8-Nokta Izgara Kavramı

```
Tüm boşluklar ve boyutlandırmalar 8'in katları:
├── Sıkı: 4px (mikro için yarım adım)
├── Küçük: 8px
├── Orta: 16px
├── Büyük: 24px, 32px
├── XL: 48px, 64px, 80px
└── İçerik yoğunluğuna göre ayarla
```

### Temel Boyutlandırma Prensipleri

| Öğe | Husus |
|---------|---------------|
| **Dokunma hedefleri** | Minimum rahat dokunma boyutu |
| **Butonlar** | Önem hiyerarşisine göre yükseklik |
| **Girdiler** | Hizalama için buton yüksekliğiyle eşleştir |
| **Kartlar** | Tutarlı dolgu (padding), nefes alabilir |
| **Okuma genişliği** | 45-75 karakter optimal |

---

## 4. Renk Prensipleri

### 60-30-10 Kuralı

```
%60 → Birincil/Arka Plan (sakin, nötr taban)
%30 → İkincil (destekleyici alanlar)
%10 → Vurgu (CTA'lar, vurgular, dikkat)
```

### Renk Psikolojisi (Karar Verme İçin)

| İhtiyacınız Varsa... | Tonları Düşünün | Kaçının |
|----------------|---------------|-------|
| Güven, sakinlik | Mavi ailesi | Agresif kırmızılar |
| Büyüme, doğa | Yeşil ailesi | Endüstriyel griler |
| Enerji, aciliyet | Turuncu, kırmızı | Pasif maviler |
| Lüks, yaratıcılık | Derin Deniz Mavisi (Teal), Altın, Zümrüt | Ucuz hissettiren parlaklar |
| Temiz, minimal | Nötrler | Bunaltıcı renk |

### Seçim Süreci

1. **Endüstri nedir?** (seçenekleri daraltır)
2. **Duygu nedir?** (birincili seçer)
3. **Açık mı koyu mod mu?** (temeli ayarlar)
4. **Belirtilmemişse KULLANICIYA SOR**

Ayrıntılı renk teorisi için: [color-system.md](color-system.md)

---

## 5. Tipografi Prensipleri

### Ölçek Seçimi

| İçerik Türü | Ölçek Oranı | His |
|--------------|-------------|------|
| Yoğun UI | 1.125-1.2 | Kompakt, verimli |
| Genel web | 1.25 | Dengeli (en yaygın) |
| Editoryal | 1.333 | Okunabilir, ferah |
| Hero/ekran | 1.5-1.618 | Dramatik etki |

### Eşleştirme Kavramı

```
Kontrast + Uyum:
├── Hiyerarşi için yeterince FARKLI
├── Bütünlük için yeterince BENZER
└── Genellikle: display + nötr, veya serif + sans
```

### Okunabilirlik Kuralları

- **Satır uzunluğu**: 45-75 karakter optimal
- **Satır yüksekliği**: Gövde metni için 1.4-1.6
- **Kontrast**: WCAG gereksinimlerini kontrol et
- **Boyut**: Web'de gövde için 16px+

Ayrıntılı tipografi için: [typography-system.md](typography-system.md)

---

## 6. Görsel Efekt Prensipleri

### Glassmorphism (Uygun Olduğunda)

```
Ana özellikler:
├── Yarı saydam arka plan
├── Arka plan bulanıklığı (backdrop blur)
├── Tanım için ince kenarlık
└── ⚠️ **UYARI:** Standart mavi/beyaz glassmorphism modern bir klişedir. Radikal kullanın ya da hiç kullanmayın.
```

### Gölge Hiyerarşisi

```
Yükselti kavramı:
├── Daha yüksek öğeler = daha büyük gölgeler
├── Y-öteleme > X-öteleme (ışık yukarıdan)
├── Çoklu katmanlar = daha gerçekçi
└── Koyu mod: bunun yerine parıltıya (glow) ihtiyaç duyabilir
```

### Gradyan Kullanımı

```
Uyumlu gradyanlar:
├── Çarkta bitişik renkler (analog)
├── VEYA aynı ton, farklı açıklık
├── Sert tamamlayıcı (complementary) çiftlerden kaçının
├── 🚫 **Mesh/Aurora Gradyanları YOK** (yüzen damlalar)
└── Projeden projeye radikal bir şekilde ÇEŞİTLENDİRİN
```

Tam efekt kılavuzu için: [visual-effects.md](visual-effects.md)

---

## 7. Animasyon Prensipleri

### Zamanlama Kavramı

```
Süre şuna bağlıdır:
├── Mesafe (daha uzak = daha uzun)
├── Boyut (daha büyük = daha yavaş)
├── Önem (kritik = net)
└── Bağlam (acil = hızlı, lüks = yavaş)
```

### Easing (Yumuşatma) Seçimi

| Eylem | Easing | Neden |
|--------|--------|-----|
| Giriş | Ease-out | Yavaşla, yerleş |
| Çıkış | Ease-in | Hızlan, çık |
| Vurgu | Ease-in-out | Pürüzsüz, kasıtlı |
| Oyuncu | Bounce | Eğlenceli, enerjik |

### Performans

- Sadece transform ve opacity özelliklerini canlandırın
- Azaltılmış hareket (reduced-motion) tercihine saygı gösterin
- Düşük özellikli cihazlarda test edin

Animasyon desenleri için: [animation-guide.md](animation-guide.md), ileri düzey için: [motion-graphics.md](motion-graphics.md)

---

## 8. "Wow Faktörü" Kontrol Listesi

### Premium Göstergeler

- [ ] Cömert beyaz boşluk (lüks = nefes alma alanı)
- [ ] İnce derinlik ve boyut
- [ ] Pürüzsüz, amaçlı animasyonlar
- [ ] Detaylara dikkat (hizalama, tutarlılık)
- [ ] Bütünleşik görsel ritim
- [ ] Özel öğeler (hepsi varsayılan değil)

### Güven İnşası

- [ ] Uygun yerlerde güvenlik ipuçları
- [ ] Sosyal kanıt / referanslar
- [ ] Net değer önerisi
- [ ] Profesyonel görseller
- [ ] Tutarlı tasarım dili

### Duygusal Tetikleyiciler

- [ ] Hedeflenen duyguyu uyandıran Hero alanı
- [ ] İnsan unsurları (yüzler, hikayeler)
- [ ] İlerleme/başarı göstergeleri
- [ ] Haz anları (Moments of delight)

---

## 9. Anti-Desenler (Ne Yapılmamalı)

### ❌ Tembel Tasarım Göstergeleri

- Düşünülmeden kullanılan varsayılan sistem yazı tipleri
- Uymayan stok görselleri
- Tutarsız boşluklandırma
- Çok fazla yarışan renk
- Hiyerarşisi olmayan metin duvarları
- Erişilemez kontrast

### ❌ AI Eğilimi Desenleri (KAÇININ!)

- **Her projede aynı renkler**
- **Varsayılan olarak koyu + neon**
- **Her şey mor/menekşe (MOR YASAĞI ✅)**
- **Basit açılış sayfaları için Bento ızgaraları**
- **Mesh Gradyanları & Parıltı Efektleri**
- **Aynı düzen yapısı / Vercel klonu**
- **Kullanıcı tercihlerini sormamak**

### ❌ Karanlık Desenler (Etik Dışı)

- Gizli maliyetler
- Sahte aciliyet
- Zorunlu eylemler
- Aldatıcı UI
- Onay utandırma (Confirmshaming)

---

## 10. Karar Verme Süreci Özeti

```
HER tasarım görevi için:

1. KISITLAMALAR
   └── Zaman çizelgesi, marka, teknoloji, hedef kitle nedir?
   └── Belirsizse → SOR

2. İÇERİK
   └── Hangi içerik var?
   └── Hiyerarşi nedir?

3. STİL YÖNÜ
   └── Bağlam için ne uygundur?
   └── Belirsizse → SOR (varsayılan yapma!)

4. YÜRÜTME
   └── Yukarıdaki prensipleri uygula
   └── Anti-desenlere karşı kontrol et

5. İNCELEME
   └── "Bu kullanıcıya hizmet ediyor mu?"
   └── "Bu benim varsayılanlarımdan farklı mı?"
   └── "Bununla gurur duyar mıydım?"
```

---

## Referans Dosyalar

Belirli alanlarda daha derin rehberlik için:

- [color-system.md](color-system.md) - Renk teorisi ve seçim süreci
- [typography-system.md](typography-system.md) - Yazı tipi eşleştirme ve ölçek kararları
- [visual-effects.md](visual-effects.md) - Efekt prensipleri ve teknikleri
- [animation-guide.md](animation-guide.md) - Hareket tasarım prensipleri
- [motion-graphics.md](motion-graphics.md) - İleri Düzey: Lottie, GSAP, SVG, 3D, Parçacıklar
- [decision-trees.md](decision-trees.md) - Bağlama özel şablonlar
- [ux-psychology.md](ux-psychology.md) - Kullanıcı psikolojisi derinlemesine inceleme

---

> **Unutmayın:** Tasarım DÜŞÜNMEKTİR, kopyalamak değil. Her proje, benzersiz bağlamına ve kullanıcılarına dayalı olarak taze bir değerlendirmeyi hak eder. **Modern SaaS Güvenli Limanından Kaçının!**
