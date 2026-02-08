# Animasyon Yönergeleri Referansı

> Animasyon prensipleri ve zamanlama psikolojisi - kopyalamayı değil, karar vermeyi öğrenin.
> **Ezberlenecek sabit süreler yok - zamanlamayı neyin etkilediğini anlayın.**

---

## 1. Süre Prensipleri

### Zamanlamayı Etkileyen Faktörler

```
Animasyon hızını belirleyen faktörler:
├── MESAFE: Daha uzak mesafe = daha uzun süre
├── BOYUT: Daha büyük öğeler = daha yavaş animasyonlar
├── KARMAŞIKLIK: Karmaşık = işlemesi daha yavaş
├── ÖNEM: Kritik eylemler = net geri bildirim
└── BAĞLAM: Acil = hızlı, lüks = yavaş
```

### Amaca Göre Süre Aralıkları

| Amaç | Aralık | Neden |
|------|-------|-----|
| Anında geri bildirim | 50-100ms | Algı eşiğinin altında |
| Mikro etkileşimler | 100-200ms | Hızlı ama fark edilir |
| Standart geçişler | 200-300ms | Rahat hız |
| Karmaşık animasyonlar | 300-500ms | Takip etme zamanı |
| Sayfa geçişleri | 400-600ms | Pürüzsüz devir teslim |
| **Wow/Premium Efektler** | 800ms+ | Dramatik, organik yay tabanlı, katmanlı |

### Süre Seçimi

Kendinize sorun:
1. Öğe ne kadar uzağa hareket ediyor?
2. Bu değişikliği fark etmek ne kadar önemli?
3. Kullanıcı bekliyor mu, yoksa bu arka plan mı?

---

## 2. Yumuşatma (Easing) Prensipleri

### Yumuşatma Ne Yapar

```
Easing = hızın zamanla değişimi
├── Linear: sabit hız (mekanik, robotik)
├── Ease-out: hızlı başlangıç, yavaş bitiş (doğal giriş)
├── Ease-in: yavaş başlangıç, hızlı bitiş (doğal çıkış)
└── Ease-in-out: her iki uçta yavaş (pürüzsüz, kasıtlı)
```

### Her Birini Ne Zaman Kullanmalı

| Yumuşatma | En İyi Kullanım | Hissiyat |
|-----------|-----------------|----------|
| **Ease-out** | Giren öğeler | Varış, yerleşme |
| **Ease-in** | Çıkan öğeler | Ayrılış, çıkış |
| **Ease-in-out** | Vurgu, döngüler | Kasıtlı, pürüzsüz |
| **Linear** | Sürekli hareket | Mekanik, sabit |
| **Bounce/Elastic** | Eğlenceli UI | Eğlenceli, enerjik |

### Desen

```css
/* Görüntüye giriş = ease-out (yavaşla) */
.enter {
  animation-timing-function: ease-out;
}

/* Görüntüden çıkış = ease-in (hızlan) */
.exit {
  animation-timing-function: ease-in;
}

/* Sürekli = ease-in-out */
.continuous {
  animation-timing-function: ease-in-out;
}
```

---

## 3. Mikro Etkileşim Prensipleri

### İyi Mikro Etkileşimler Nasıl Olur

```
Mikro etkileşimlerin amacı:
├── GERİ BİLDİRİM: Eylemin gerçekleştiğini onayla
├── REHBERLİK: Neyin mümkün olduğunu göster
├── DURUM: Mevcut durumu belirt
└── HAZ: Küçük neşe anları
```

### Buton Durumları

```
Hover → hafif görsel değişim (kalkma, renk, ölçek)
Active → basılma hissi (küçülme, gölge değişimi)
Focus → net belirteç (dış hat, halka)
Loading → ilerleme göstergesi (döndürücü, iskelet)
Success → onay (tik, renk)
```

### Prensipler

1. **Hemen yanıt ver** (100ms algı altı)
2. **Eylemle eşleş** (basmak = `scale(0.95)`, üzerine gelmek = `translateY(-4px) + parıltı`)
3. **Cesur ama pürüzsüz ol** (Usta işi hissettir)
4. **Tutarlı ol** (aynı eylemler = aynı geri bildirim)

---

## 4. Yükleme Durumları Prensipleri

### Bağlama Göre Türler

| Durum | Yaklaşım |
|-------|----------|
| Hızlı yükleme (<1s) | Göstergeye gerek yok |
| Orta (1-3s) | Döndürücü veya basit animasyon |
| Uzun (3s+) | İlerleme çubuğu veya iskelet |
| Bilinmeyen süre | Belirsiz (indeterminate) gösterge |

### İskelet Ekranlar (Skeleton Screens)

```
Amaç: Algılanan bekleme süresini azalt
├── Düzen şeklini hemen göster
├── Hafifçe canlandır (kıpraşma, nabız)
├── Hazır olduğunda içerikle değiştir
└── Döndürücüden daha hızlı hissettirir
```

### İlerleme Göstergeleri

```
İlerleme ne zaman gösterilmeli:
├── Kullanıcı tarafından başlatılan eylem
├── Dosya yüklemeleri/indirmeleri
├── Çok adımlı süreçler
└── Uzun operasyonlar

Ne zaman GEREKMEZ:
├── Çok hızlı operasyonlar
├── Arka plan görevleri
└── İlk sayfa yüklemeleri (iskelet daha iyi)
```

---

## 5. Sayfa Geçişleri Prensipleri

### Geçiş Stratejisi

```
Basit kural: hızlı çik, daha yavaş gir
├── Giden içerik hızlıca solar
├── Gelen içerik canlanarak girer
└── "Her şeyin aynı anda hareket etmesini" önler
```

### Yaygın Desenler

| Desen | Ne Zaman Kullanılır |
|-------|---------------------|
| **Fade** | Güvenli varsayılan, her yerde çalışır |
| **Slide** | Sıralı navigasyon (önceki/sonraki) |
| **Scale** | Modalları açma/kapatma |
| **Shared element** | Görsel sürekliliği koruma |

### Yön Eşleştirme

```
Navigasyon yönü = animasyon yönü
├── İleri → sağdan kayarak gir
├── Geri → soldan kayarak gir
├── Derinleşme → merkezden büyüyerek (scale up)
└── Yukarı çıkma → küçülerek (scale down)
```

---

## 6. Kaydırma (Scroll) Animasyon Prensipleri

### Aşamalı Ortaya Çıkarma (Progressive Reveal)

```
Kullanıcı kaydırdıkça içerik belirir:
├── İlk bilişsel yükü azaltır
├── Keşfetmeyi ödüllendirir
├── Hantal hissettirmemeli
└── Devre dışı bırakma seçeneği (erişilebilirlik)
```

### Tetikleme Noktaları

| Ne Zaman Tetiklenmeli | Efekt |
|-----------------------|-------|
| Görüntü alanına yeni girerken | Standart ortaya çıkarma |
| Görüntü alanında ortalandığında | Vurgu için |
| Kısmen görünür | Daha erken ortaya çıkarma |
| Tamamen görünür | Geç tetikleme |

### Animasyon Özellikleri

- Fade in (opaklık)
- Slide up (dönüşüm)
- Scale (dönüşüm)
- Yukarıdakilerin kombinasyonu

### Performans

- Intersection Observer kullanın
- Sadece transform/opacity canlandırın
- Gerekirse mobilde azaltın

---

## 7. Hover Efektleri Prensipleri

### Efekti Eylemle Eşleştirme

| Öğe | Efekt | Niyet |
|-----|-------|-------|
| **Tıklanabilir kart** | Kalkma + gölge | "Bu etkileşimli" |
| **Buton** | Renk/parlaklık değişimi | "Bana bas" |
| **Resim** | Yakınlaştırma/ölçekleme | "Daha yakından bak" |
| **Link** | Altı çizili/renk | "Buraya git" |

### Prensipler

1. **Etkileşimi sinyalle** - hover tıklanabilir olduğunu gösterir
2. **Aşırıya kaçma** - ince değişiklikler işe yarar
3. **Önemle eşleştir** - daha büyük değişim = daha önemli
4. **Dokunmatik alternatifleri** - hover mobilde çalışmaz

---

## 8. Geri Bildirim Animasyon Prensipleri

### Başarı Durumları

```
Uygun şekilde kutlayın:
├── Küçük eylem → ince tik/renk
├── Büyük eylem → daha belirgin animasyon
├── Tamamlama → tatmin edici animasyon
└── Marka kişiliğiyle eşleş
```

### Hata Durumları

```
Panik yaratmadan dikkat çekin:
├── Renk değişimi (anlamsal kırmızı)
├── Sallama animasyonu (kısa!)
├── Hata alanına odaklanma
└── Net mesajlaşma
```

### Zamanlama

- Başarı: biraz daha uzun (anın tadını çıkar)
- Hata: hızlı (eylemi geciktirme)
- Yükleme: tamamlanana kadar sürekli

---

## 9. Performans Prensipleri

### Canlandırması Ucuz Olanlar

```
GPU-hızlandırmalı (HIZLI):
├── transform: translate, scale, rotate
└── opacity: 0 ila 1

CPU-yoğun (YAVAŞ):
├── width, height
├── top, left, right, bottom
├── margin, padding
├── border-radius değişimleri
└── box-shadow değişimleri
```

### Optimizasyon Stratejileri

1. Mümkün olduğunda **transform/opacity canlandırın**
2. **Düzen (layout) tetikleyicilerden kaçının** (boyut/konum değişiklikleri)
3. **will-change'i idareli kullanın** (tarayıcıya ipuçları)
4. **Düşük donanımlı cihazlarda test edin** (sadece geliştirici makinesinde değil)

### Kullanıcı Tercihlerine Saygı

```css
@media (prefers-reduced-motion: reduce) {
  /* Bu tercihe saygı göster */
  /* Sadece temel animasyonlar */
  /* Dekoratif hareketi azalt veya kaldır */
}
```

---

## 10. Animasyon Karar Kontrol Listesi

Animasyon eklemeden önce:

- [ ] **Bir amacı var mı?** (geri bildirim/rehberlik/haz)
- [ ] **Zamanlama uygun mu?** (çok hızlı/yavaş değil)
- [ ] **Doğru yumuşatmayı (easing) seçtiniz mi?** (giriş/çıkış/vurgu)
- [ ] **Performanslı mı?** (sadece transform/opacity)
- [ ] **Azaltılmış hareket test edildi mi?** (erişilebilirlik)
- [ ] **Diğer animasyonlarla tutarlı mı?** (aynı zamanlama hissi)
- [ ] **Varsayılan ayarlarınız değil mi?** (çeşitlilik kontrolü)
- [ ] **Belirsizse kullanıcıya stil hakkında sordunuz mu?**

### Anti-Desenler

- ❌ Her projede aynı zamanlama değerleri
- ❌ Sadece animasyon olsun diye animasyon
- ❌ Azaltılmış hareket tercihini görmezden gelmek
- ❌ Pahalı özellikleri canlandırmak
- ❌ Aynı anda çok fazla şeyin hareket etmesi
- ❌ Kullanıcıları hayal kırıklığına uğratan gecikmeler

---

> **Unutmayın**: Animasyon iletişimdir. Her hareketin bir anlamı olmalı ve kullanıcı deneyimine hizmet etmelidir.
