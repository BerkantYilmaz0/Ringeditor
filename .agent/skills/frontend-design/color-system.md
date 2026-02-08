# Renk Sistemi Referansı

> Renk teorisi prensipleri, seçim süreci ve karar verme yönergeleri.
> **Ezberlenmiş hex kodları yok - renk hakkında DÜŞÜNMEYİ öğrenin.**

---

## 1. Renk Teorisi Temelleri

### Renk Çarkı

```
                    SARI
                      │
           Sarı-      │    Sarı-
           Yeşil      │    Turuncu
              ╲       │       ╱
               ╲      │      ╱
     YEŞİL ─────────── ● ─────────── TURUNCU
               ╱      │      ╲
              ╱       │       ╲
           Mavi-      │    Kırmızı-
           Yeşil      │    Turuncu
                      │
                   KIRMIZI
                      │
                     MOR
                  ╱       ╲
             Mavi-         Kırmızı-
             Mor           Mor
                  ╲       ╱
                    MAVİ
```

### Renk İlişkileri

| Şema | Nasıl Oluşturulur | Ne Zaman Kullanılır |
|--------|-------------------|-------------|
| **Monokromatik** | TEK renk tonu seç, sadece açıklığı/doygunluğu değiştir | Minimal, profesyonel, uyumlu |
| **Analog** | Çarkta YAN YANA 2-3 renk tonu seç | Uyumlu, sakin, doğadan ilham alan |
| **Tamamlayıcı** | Çarkta KARŞIT renk tonlarını seç | Yüksek kontrast, canlı, dikkat çekici |
| **Bölünmüş-Tamamlayıcı** | Baz + tamamlayıcının yanındaki 2 renk | Dinamik ama dengeli |
| **Üçlü (Triadic)** | Çarkta EŞİT UZAKLIKTA 3 renk tonu | Canlı, oyuncu, yaratıcı |

### Şema Nasıl Seçilir:
1. **Projenin ruh hali nedir?** Sakin → Analog. Cesur → Tamamlayıcı.
2. **Kaç renk lazım?** Minimal → Monokromatik. Karmaşık → Üçlü.
3. **Hedef kitle kim?** Muhafazakar → Monokromatik. Genç → Üçlü.

---

## 2. 60-30-10 Kuralı

### Dağıtım Prensibi
```
┌─────────────────────────────────────────────────┐
│                                                 │
│     %60 BİRİNCİL (Arka plan, geniş alanlar)     │
│     → Nötr veya sakinleştirici olmalı           │
│     → Genel tonu taşır                          │
│                                                 │
├────────────────────────────────────┬────────────┤
│                                    │            │
│   %30 İKİNCİL                      │ %10 VURGU  │
│   (Kartlar, bölümler, başlıklar)   │ (CTA'lar,  │
│   → Baskın olmadan destekler       │ öne çıkan) │
│                                    │ → Dikkat   │
│                                    │   çeker    │
│                                    │            │
└────────────────────────────────────┴────────────┘
```

### Uygulama Deseni
```css
:root {
  /* %60 - Açık/koyu mod ve ruh haline göre seç */
  --color-bg: /* nötr: beyaz, kirli beyaz veya koyu gri */
  --color-surface: /* bg'den biraz farklı */
  
  /* %30 - Marka veya bağlama göre seç */
  --color-secondary: /* birincilin sönük versiyonu veya nötr */
  
  /* %10 - İstenen eylem/duyguya göre seç */
  --color-accent: /* canlı, dikkat çekici */
}
```

---

## 3. Renk Psikolojisi - Anlam ve Seçim

### Bağlama Göre Nasıl Seçilir

| Proje Türü... | Bu Tonları Düşün | Neden |
|------------------|---------------------|-----|
| **Finans, Teknoloji, Sağlık** | Maviler, Turkuazlar | Güven, istikrar, sakinlik |
| **Ekoloji, Wellness, Doğa** | Yeşiller, Toprak tonları | Büyüme, sağlık, organik |
| **Yemek, Enerji, Gençlik** | Turuncu, Sarı, Sıcak | İştah, heyecan, sıcaklık |
| **Lüks, Güzellik, Yaratıcı** | Derin Turkuaz, Altın, Siyah | Sofistike, premium |
| **Aciliyet, Satış, Uyarılar** | Kırmızı, Turuncu | Eylem, dikkat, tutku |

### Duygusal Çağrışımlar (Karar Verme İçin)

| Ton Ailesi | Olumlu Çağrışımlar | Uyarılar |
|------------|----------------------|----------|
| **Mavi** | Güven, sakin, profesyonel | Soğuk, kurumsal hissedebilir |
| **Yeşil** | Büyüme, doğa, başarı | Aşırı kullanılırsa sıkıcı olabilir |
| **Kırmızı** | Tutku, aciliyet, enerji | Yüksek uyarılma, idareli kullan |
| **Turuncu** | Sıcaklık, dostça, yaratıcı | Doygunsa ucuz hissedebilir |
| **Mor** | ⚠️ **YASAK** - AI bunu aşırı kullanıyor! | Yerine Derin Turkuaz/Bordo/Zümrüt kullan |
| **Sarı** | İyimserlik, dikkat, mutlu | Okunması zor, vurgu olarak kullan |
| **Siyah** | Zarafet, güç, modern | Ağır hissedebilir |
| **Beyaz** | Temiz, minimal, açık | Steril hissedebilir |

### Seçim Süreci:
1. **Hangi endüstri?** → 2-3 ton ailesine daralt
2. **Hangi duygu?** → Birincil tonu seç
3. **Hangi kontrast?** → Açık vs koyu moda karar ver
4. **KULLANICIYA SOR** → İlerlemeden önce onayla

---

## 4. Palet Oluşturma Prensipleri

### Tek Bir Renkten (HSL Yöntemi)

Hex kodlarını ezberlemek yerine, **HSL manipülasyonunu** öğrenin:

```
HSL = Hue (Ton), Saturation (Doygunluk), Lightness (Açıklık)

Hue (0-360): Renk ailesi
  0/360 = Kırmızı
  60 = Sarı
  120 = Yeşil
  180 = Camgöbeği (Cyan)
  240 = Mavi
  300 = Mor

Saturation (%0-100): Renk yoğunluğu
  Düşük = Sönük, sofistike
  Yüksek = Canlı, enerjik

Lightness (%0-100): Parlaklık
  %0 = Siyah
  %50 = Saf renk
  %100 = Beyaz
```

### Tam Palet Oluşturma

HERHANGİ bir baz renk verildiğinde, bir ölçek oluşturun:

```
Açıklık Ölçeği:
  50  (en açık)  → L: %97
  100            → L: %94
  200            → L: %86
  300            → L: %74
  400            → L: %66
  500 (baz)      → L: %50-60
  600            → L: %48
  700            → L: %38
  800            → L: %30
  900 (en koyu)  → L: %20
```

### Doygunluk Ayarlamaları

| Bağlam | Doygunluk Seviyesi |
|---------|-----------------|
| **Profesyonel/Kurumsal** | Düşük (%40-60) |
| **Oyuncu/Genç** | Yüksek (%70-90) |
| **Koyu Mod** | %10-20 azalt |
| **Erişilebilirlik** | Kontrastı sağla, ayarlama gerekebilir |

---

## 5. Bağlam Tabanlı Seçim Rehberi

### Paletleri Kopyalamak Yerine, Bu Süreci İzleyin:

**Adım 1: Bağlamı Tanımla**
```
Proje ne türde?
├── E-ticaret → Güven + aciliyet dengesi lazım
├── SaaS/Dashboard → Düşük yorgunluk, veri odağı lazım
├── Sağlık/Wellness → Sakinleştirici, doğal his lazım
├── Lüks/Premium → Abartısız zarafet lazım
├── Yaratıcı/Portföy → Kişilik, akılda kalıcılık lazım
└── Diğer → Kullanıcıya SOR
```

**Adım 2: Birincil Ton Ailesini Seç**
```
Bağlama göre, BİRİNİ seç:
- Mavi ailesi (güven)
- Yeşil ailesi (büyüme)
- Sıcak aile (enerji)
- Nötr aile (zarif)
- VEYA kullanıcı tercihini sor
```

**Adım 3: Açık/Koyu Moda Karar Ver**
```
Düşün:
- Kullanıcı tercihi?
- Endüstri standardı?
- İçerik türü? (yazı yoğun = açık tercih edilir)
- Kullanım zamanı? (akşam uygulaması = koyu seçenek)
```

**Adım 4: Prensipleri Kullanarak Palet Oluştur**
- HSL manipülasyonu kullan
- 60-30-10 kuralını izle
- Kontrastı kontrol et (WCAG)
- Gerçek içerikle test et

---

## 6. Koyu Mod Prensipleri

### Temel Kurallar (Sabit Kodlar Yok)

1. **Asla saf siyah değil** → Hafif tonlu çok koyu gri kullan
2. **Asla saf beyaz metin değil** → %87-92 açıklık kullan
3. **Doygunluğu azalt** → Canlı renkler koyu modda gözü yorar
4. **Yükseklik = parlaklık** → Daha yüksek öğeler biraz daha açık

### Koyu Modda Kontrast

```
Arka plan katmanları (yükseklik arttıkça koyudan → açığa):
Katman 0 (baz)    → En koyu
Katman 1 (kartlar)   → Biraz daha açık
Katman 2 (modallar)  → Daha da açık
Katman 3 (pop-uplar)  → En açık koyu
```

### Renkleri Koyu Moda Uyarlama

| Açık Mod | Koyu Mod Ayarı |
|------------|---------------------|
| Yüksek doygunluklu vurgu | Doygunluğu %10-20 azalt |
| Saf beyaz arka plan | Marka tonuyla renklendirilmiş koyu gri |
| Siyah metin | Açık gri (saf beyaz değil) |
| Renkli arka planlar | Doygunluğu azaltılmış, daha koyu versiyonlar |

---

## 7. Erişilebilirlik Yönergeleri

### Kontrast Gereksinimleri (WCAG)

| Seviye | Normal Metin | Büyük Metin |
|-------|-------------|------------|
| AA (minimum) | 4.5:1 | 3:1 |
| AAA (gelişmiş) | 7:1 | 4.5:1 |

### Kontrast Nasıl Kontrol Edilir

1. **Renkleri parlaklığa (luminance) dönüştür**
2. **Oranı hesapla**: (daha açık + 0.05) / (daha koyu + 0.05)
3. **Oran gereksinimi karşılayana kadar ayarla**

### Güvenli Desenler

| Kullanım Durumu | Yönerge |
|----------|-----------|
| **Açık bg'de metin** | %35 veya daha az açıklık kullan |
| **Koyu bg'de metin** | %85 veya daha fazla açıklık kullan |
| **Beyaz üzerinde birincil** | Yeterince koyu varyant olduğundan emin ol |
| **Butonlar** | Bg ve metin arasında yüksek kontrast |

---

## 8. Renk Seçim Kontrol Listesi

Herhangi bir renk seçimini kesinleştirmeden önce, doğrulayın:

- [ ] **Kullanıcı tercihi soruldu mu?** (belirtilmemişse)
- [ ] **Proje bağlamıyla eşleşiyor mu?** (endüstri, kitle)
- [ ] **60-30-10 izleniyor mu?** (uygun dağıtım)
- [ ] **WCAG uyumlu mu?** (kontrast kontrol edildi)
- [ ] **Her iki modda da çalışıyor mu?** (koyu mod gerekliyse)
- [ ] **Sizin varsayılanınız/favoriniz DEĞİL mi?** (çeşitlilik kontrolü)
- [ ] **Son projeden farklı mı?** (tekrardan kaçın)

---

## 9. Kaçınılması Gereken Anti-Desenler

### ❌ YAPMA:
- Her projede aynı hex kodlarını kopyalama
- Mura/menekşe rengine (AI eğilimi) varsayılan olarak gitme
- Koyu mod + neona (AI eğilimi) varsayılan olarak gitme
- Saf siyah (#000000) arka planlar kullanma
- Koyu üzerinde saf beyaz (#FFFFFF) metin kullanma
- Kullanıcının endüstri bağlamını görmezden gelme
- Kullanıcı tercihini sormayı atlama

### ✅ YAP:
- Proje başına taze palet oluştur
- Kullanıcıya renk tercihleri hakkında sor
- Endüstriyi ve kitleyi düşün
- Esnek manipülasyon için HSL kullan
- Kontrastı ve erişilebilirliği test et
- Açık VE koyu seçenekler sun

---

> **Unutmayın**: Renkler varsayılanlar değil, kararlardır. Her proje, benzersiz bağlamına dayalı düşünceli seçimi hak eder.
