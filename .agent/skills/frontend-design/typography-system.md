# Tipografi Sistemi Referansı

> Tipografi prensipleri ve karar verme - ezberlemeyi değil, düşünmeyi öğrenin.
> **Sabit yazı tipi adları veya boyutları yok - sistemi anlayın.**

---

## 1. Modüler Ölçek (Modular Scale) Prensipleri

### Modüler Ölçek Nedir?

```
Yazı tipi boyutları arasında matematiksel bir ilişki:
├── Bir TEMEL (BASE) boyut seçin (genellikle gövde metni)
├── Bir ORAN (RATIO) seçin (çarpan)
└── Tüm boyutları şunu kullanarak oluşturun: base × ratio^n
```

### Yaygın Oranlar ve Kullanım Alanları

| Oran | Değer | Hissiyat | En İyi Kullanım |
|-------|-------|---------|----------|
| Minor Second | 1.067 | Çok ince | Yoğun UI, küçük ekranlar |
| Major Second | 1.125 | İnce | Kompakt arayüzler |
| Minor Third | 1.2 | Rahat | Mobil uygulamalar, kartlar |
| Major Third | 1.25 | Dengeli | Genel web (en yaygın) |
| Perfect Fourth | 1.333 | Dikkat çekici | Editoryal, bloglar |
| Perfect Fifth | 1.5 | Dramatik | Başlıklar, pazarlama |
| Golden Ratio | 1.618 | Maksimum etki | Kahraman bölümleri, ekran (display) |

### Ölçeğinizi Oluşturun

```
Verilen: base = TEMEL_BOYUT, ratio = ORANINIZ

Ölçek:
├── xs:  base ÷ ratio²
├── sm:  base ÷ ratio
├── base: TEMEL_BOYUT
├── lg:  base × ratio
├── xl:  base × ratio²
├── 2xl: base × ratio³
├── 3xl: base × ratio⁴
└── ... gerektiği gibi devam edin
```

### Temel Boyut Seçimi

| Bağlam | Temel Boyut Aralığı | Neden |
|---------|-----------------|-----|
| Mobil öncelikli | 16-18px | Küçük ekranlarda okunabilirlik |
| Masaüstü uygulama | 14-16px | Bilgi yoğunluğu |
| Editoryal | 18-21px | Uzun okuma konforu |
| Erişilebilirlik odağı | 18px+ | Okunması daha kolay |

---

## 2. Yazı Tipi Eşleştirme Prensipleri

### Yazı Tiplerini Bir Arada Çalıştıran Nedir

```
Kontrast + Uyum:
├── Hiyerarşi yaratacak kadar YETERİNCE farklı
├── Tutarlı hissettirecek kadar YETERİNCE benzer
└── Genellikle: serif + sans, veya display + nötr
```

### Eşleştirme Stratejileri

| Strateji | Nasıl | Sonuç |
|----------|-----|--------|
| **Kontrast** | Serif başlık + Sans gövde | Klasik, editoryal his |
| **Aynı Aile** | Tek değişkenli font, farklı ağırlıklar | Tutarlı, modern |
| **Aynı Tasarımcı** | Aynı dökümhane (foundry) fontları | Genellikle uyumlu orantılar |
| **Dönem Eşleşmesi** | Aynı zaman diliminden fontlar | Tarihsel tutarlılık |

### Neye Bakmalı

```
Eşleştirirken karşılaştırın:
├── x-yüksekliği (küçük harflerin yüksekliği)
├── Harf genişliği (dar vs geniş)
├── Çizgi kontrastı (ince/kalın varyasyonu)
└── Genel ruh hali (resmi vs gündelik)
```

### Güvenli Eşleştirme Desenleri

| Başlık Stili | Gövde Stili | Ruh Hali |
|---------------|------------|------|
| Geometrik sans | Hümanist sans | Modern, dostça |
| Display serif | Temiz sans | Editoryal, sofistike |
| Nötr sans | Aynı sans | Minimal, teknoloji |
| Kalın geometrik | İnce geometrik | Çağdaş |

### Kaçınılması Gerekenler

- ❌ İki dekoratif font bir arada
- ❌ Çatışan benzer fontlar
- ❌ 2-3 font ailesinden fazlası
- ❌ Çok farklı x-yüksekliklerine sahip fontlar

---

## 3. Satır Yüksekliği (Line Height) Prensipleri

### İlişki

```
Satır yüksekliği şuna bağlıdır:
├── Yazı tipi boyutu (daha büyük metin = daha az satır yüksekliği gerekir)
├── Satır uzunluğu (daha uzun satırlar = daha fazla satır yüksekliği)
├── Yazı tipi tasarımı (bazı fontlar daha fazla alana ihtiyaç duyar)
└── İçerik türü (başlıklar vs gövde)
```

### Bağlama Göre Yönergeler

| İçerik Türü | Satır Yüksekliği Aralığı | Neden |
|--------------|-------------------|-----|
| **Başlıklar** | 1.1 - 1.3 | Kısa satırlar, kompakt istenir |
| **Gövde metni** | 1.4 - 1.6 | Rahat okuma |
| **Uzun form** | 1.6 - 1.8 | Maksimum okunabilirlik |
| **UI öğeleri** | 1.2 - 1.4 | Alan verimliliği |

### Ayarlama Faktörleri

- **Daha uzun satır uzunluğu** → Satır yüksekliğini artır
- **Daha büyük yazı tipi boyutu** → Satır yüksekliği oranını azalt
- **Tümü büyük harf (All caps)** → Daha fazla satır yüksekliğine ihtiyaç duyabilir
- **Sıkı izleme (tracking)** → Daha fazla satır yüksekliğine ihtiyaç duyabilir

---

## 4. Satır Uzunluğu Prensipleri

### Optimal Okuma Genişliği

```
Tatlı nokta: Satır başına 45-75 karakter
├── < 45: Çok kesik, akışı bozar
├── 45-75: Rahat okuma
├── > 75: Göz takip yorgunluğu
```

### Nasıl Ölçülür

```css
/* Karakter tabanlı (önerilen) */
max-width: 65ch; /* ch = "0" karakterinin genişliği */

/* Bu, yazı tipi boyutuna otomatik olarak uyum sağlar */
```

### Bağlam Ayarlamaları

| Bağlam | Karakter Aralığı |
|---------|-----------------|
| Masaüstü makale | 60-75 karakter |
| Mobil | 35-50 karakter |
| Kenar çubuğu metni | 30-45 karakter |
| Geniş monitörler | Yine de ~75ch ile sınırla |

---

## 5. Duyarlı Tipografi Prensipleri

### Sorun

```
Sabit boyutlar iyi ölçeklenmez:
├── Masaüstü boyutu mobilde çok büyük
├── Mobil boyutu masaüstünde çok küçük
└── Kırılma noktası (breakpoint) sıçramaları sarsıcı hissettirir
```

### Akışkan Tipografi (clamp)

```css
/* Sözdizimi: clamp(MIN, TERCİH EDİLEN, MAX) */
font-size: clamp(
  MINIMUM_SIZE,
  AKISKAN_HESAPLAMA,
  MAXIMUM_SIZE
);

/* AKISKAN_HESAPLAMA tipik olarak: 
   base + viewport-relatif-birim */
```

### Ölçekleme Stratejisi

| Öğe | Ölçekleme Davranışı |
|---------|-----------------|
| Gövde metni | Hafif ölçekleme (1rem → 1.125rem) |
| Alt başlıklar | Orta ölçekleme |
| Başlıklar | Daha dramatik ölçekleme |
| Display (Ekran) metni | En dramatik ölçekleme |

---

## 6. Ağırlık ve Vurgu Prensipleri

### Semantik Ağırlık Kullanımı

| Ağırlık Aralığı | İsim | Kullanım Yeri |
|--------------|------|---------|
| 300-400 | Light/Normal | Gövde metni, paragraflar |
| 500 | Medium | İnce vurgu |
| 600 | Semibold | Alt başlıklar, etiketler |
| 700 | Bold | Başlıklar, güçlü vurgu |
| 800-900 | Heavy/Black | Display, kahraman metni |

### Kontrast Yaratma

```
İyi kontrast = en az 2 ağırlık seviyesi atla
├── 400 gövde + 700 başlık = iyi
├── 400 gövde + 500 vurgu = ince
├── 600 başlık + 700 alt başlık = çok benzer
```

### Kaçınılması Gerekenler

- ❌ Çok fazla ağırlık (sayfa başına maksimum 3-4)
- ❌ Hiyerarşi için bitişik ağırlıklar (400/500)
- ❌ Uzun metinler için ağır ağırlıklar

---

## 7. Harf Aralığı (Tracking)

### Prensipler

```
Büyük metin (başlıklar): daha sıkı izleme (tighter tracking)
├── Harfler büyüktür, boşluklar daha büyük hissedilir
└── Hafif negatif izleme daha iyi görünür

Küçük metin (gövde): normal veya biraz daha geniş
├── Küçük boyutlarda okunabilirliği artırır
└── Gövde metni için asla negatif değil

TÜMÜ BÜYÜK (ALL CAPS): her zaman daha geniş izleme
├── Büyük harflerde üst/alt çıkıntılar (ascenders/descenders) yoktur
└── Doğru hissettirmek için daha fazla alana ihtiyaç duyar
```

### Ayarlama Yönergeleri

| Bağlam | İzleme Ayarı |
|---------|---------------------|
| Display/Hero | -%2 ila -%4 |
| Başlıklar | -%1 ila -%2 |
| Gövde metni | %0 (normal) |
| Küçük metin | +%1 ila +%2 |
| TÜMÜ BÜYÜK | +%5 ila +%10 |

---

## 8. Hiyerarşi Prensipleri

### Tipografi Yoluyla Görsel Hiyerarşi

```
Hiyerarşi yaratmanın yolları:
├── BOYUT (en belirgin)
├── AĞIRLIK (kalın öne çıkar)
├── RENK (kontrast seviyeleri)
├── BOŞLUK (kenar boşlukları bölümleri ayırır)
└── KONUM (üst = önemli)
```

### Tipik Hiyerarşi

| Seviye | Özellikler |
|-------|-----------------|
| Birincil (H1) | En büyük, en kalın, en belirgin |
| İkincil (H2) | Belirgin şekilde daha küçük ama hala kalın |
| Üçüncül (H3) | Orta boyut, sadece ağırlık kullanabilir |
| Gövde | Standart boyut ve ağırlık |
| Altyazı/Meta | Daha küçük, genellikle daha açık renk |

### Hiyerarşiyi Test Etme

Sorun: "Bir bakışta neyin en önemli olduğunu söyleyebilir miyim?"

Sayfaya gözlerinizi kısarak baktığınızda, hiyerarşi hala net olmalıdır.

---

## 9. Okunabilirlik Psikolojisi

### F-Deseni Okuma

```
Kullanıcılar F-deseninde tarar:
├── Üst boyunca (ilk satır)
├── Sol taraf aşağı
├── Tekrar çapraz (alt başlık)
└── Sol aşağı devam et
```

**Sonuç**: Anahtar bilgi solda ve başlıklarda

### Anlama İçin Parçalara Ayırma (Chunking)

- Kısa paragraflar (maksimum 3-4 satır)
- Net alt başlıklar
- Listeler için madde işaretleri
- Bölümler arasında beyaz boşluk

### Bilişsel Kolaylık

- Tanıdık fontlar = daha kolay okuma
- Yüksek kontrast = daha az zorlanma
- Tutarlı desenler = öngörülebilir

---

## 10. Tipografi Seçim Kontrol Listesi

Tipografiyi kesinleştirmeden önce:

- [ ] **Kullanıcıya font tercihleri soruldu mu?**
- [ ] **Marka/bağlam düşünüldü mü?**
- [ ] **Uygun ölçek oranı seçildi mi?**
- [ ] **2-3 font ailesiyle sınırlandı mı?**
- [ ] **Tüm boyutlarda okunabilirlik test edildi mi?**
- [ ] **Satır uzunluğu kontrol edildi mi (45-75ch)?**
- [ ] **Erişilebilirlik için kontrast doğrulandı mı?**
- [ ] **Son projenizden farklı mı?**

### Anti-Desenler

- ❌ Her projede aynı fontlar
- ❌ Çok fazla font ailesi
- ❌ Stil için okunabilirliği görmezden gelmek
- ❌ Duyarlılık (responsiveness) olmadan sabit boyutlar
- ❌ Gövde metni için dekoratif fontlar

---

> **Unutmayın**: Tipografi iletişim netliği ile ilgilidir. Kişisel tercihe göre değil, içerik ihtiyaçlarına ve kitleye göre seçim yapın.
