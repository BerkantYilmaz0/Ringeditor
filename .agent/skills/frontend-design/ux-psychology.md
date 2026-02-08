# UX Psikolojisi Referansı

> UX yasalarına, duygusal tasarıma, güven inşasına ve davranışsal psikolojiye derinlemesine bakış.

---

## 1. Temel UX Yasaları

### Hick Yasası

**Prensip:** Karar verme süresi, seçenek sayısıyla logaritmik olarak artar.

```
Karar Süresi = a + b × log₂(n + 1)
n = seçenek sayısı
```

**Uygulama:**
- Navigasyon: Maksimum 5-7 üst düzey öğe
- Formlar: Adımlara bölün (aşamalı açıklama - progressive disclosure)
- Seçenekler: Mümkün olduğunda varsayılan seçimler
- Filtreler: En çok kullanılanları önceliklendir, gelişmişleri gizle

**Örnek:**
```
❌ Kötü: Bir menüde 15 öğe
✅ İyi: 5 ana kategori + "Daha Fazla"

❌ Kötü: Bir kerede 20 form alanı
✅ İyi: Her biri 5-7 alanlı 3 adımlı sihirbaz
```

---

### Fitts Yasası

**Prensip:** Bir hedefe ulaşma süresi = mesafe ve boyutun bir fonksiyonudur.

```
MT = a + b × log₂(1 + D/W)
D = mesafe, W = genişlik
```

**Uygulama:**
- CTA'lar: Birincil butonları daha büyük yapın (min 44px yükseklik)
- Dokunma hedefleri: Mobilde minimum 44×44px
- Yerleşim: Önemli eylemleri doğal imleç konumuna yakın koyun
- Köşeler: "Sihirli köşeler (Magic corners)" (sonsuz kenar = vurması kolay)

**Buton Boyutlandırma:**
```css
/* Öneme göre boyut */
.btn-primary { height: 48px; padding: 0 24px; }
.btn-secondary { height: 40px; padding: 0 16px; }
.btn-tertiary { height: 36px; padding: 0 12px; }

/* Mobil dokunma hedefleri */
@media (hover: none) {
  .btn { min-height: 44px; min-width: 44px; }
}
```

---

### Miller Yasası

**Prensip:** Ortalama bir insan çalışan belleğinde 7±2 parça (chunk) tutabilir.

**Uygulama:**
- Listeler: 5-7 öğelik gruplara ayırın
- Navigasyon: Maksimum 7 menü öğesi
- İçerik: Uzun içeriği başlıklarla bölün
- Telefon numaraları: 555-123-4567 (parçalı)

**Parçalamaya (Chunking) Örnek:**
```
❌ 5551234567
✅ 555-123-4567

❌ Aralar olmadan uzun metin paragrafı
✅ Kısa paragraflar
   Madde işaretleri ile
   Ve alt başlıklar
```

---

### Von Restorff Etkisi (İzolasyon Etkisi)

**Prensip:** Öne çıkan bir öğenin hatırlanma olasılığı daha yüksektir.

**Uygulama:**
- CTA butonları: Diğer öğelerden farklı renk
- Fiyatlandırma: Önerilen planı vurgulayın
- Önemli bilgi: Görsel ayrıştırma
- Yeni özellikler: Rozet veya belirtme çizgisi (callout)

**Örnek:**
```css
/* Tüm butonlar gri, birincil öne çıkar */
.btn { background: #E5E7EB; }
.btn-primary { background: #3B82F6; }

/* Önerilen plan vurgulanır */
.pricing-card { border: 1px solid #E5E7EB; }
.pricing-card.popular { 
  border: 2px solid #3B82F6;
  box-shadow: var(--shadow-lg);
}
```

---

### Seri Konum Etkisi (Serial Position Effect)

**Prensip:** Bir listenin başındaki (öncelik) ve sonundaki (sonralık) öğeler en iyi hatırlanır.

**Uygulama:**
- Navigasyon: En önemli öğeler ilk ve son
- Listeler: Anahtar bilgi üstte ve altta
- Formlar: En kritik alanlar başlangıçta
- CTA'lar: Uzun sayfaların üstünde ve altında tekrar edin

**Örnek:**
```
Navigasyon: Ana Sayfa | [anahtar öğeler] | İletişim

Uzun açılış sayfası:
- Kahramanda (üst) CTA
- İçerik bölümleri
- CTA altta tekrarlandı
```

---

## 2. Duygusal Tasarım (Don Norman)

### İşlemenin Üç Seviyesi

```
┌─────────────────────────────────────────────────────────────┐
│  İÇGÜDÜSEL - VISCERAL (Sürüngen Beyin)                      │
│  ─────────────────────                                      │
│  • Anında, otomatik tepki                                   │
│  • İlk izlenimler (ilk 50ms)                                │
│  • Estetik: renkler, şekiller, görseller                    │
│  • "Vay canına, bu güzel görünüyor!"                        │
├─────────────────────────────────────────────────────────────┤
│  DAVRANIŞSAL - BEHAVIORAL (Fonksiyonel Beyin)               │
│  ─────────────────────────────                              │
│  • Kullanılabilirlik ve fonksiyon                           │
│  • Etkili kullanımdan gelen zevk                            │
│  • Performans, güvenilirlik, kolaylık                       │
│  • "Bu tam olarak beklediğim gibi çalışıyor!"               │
├─────────────────────────────────────────────────────────────┤
│  YANSITICI - REFLECTIVE (Bilinçli Beyin)                    │
│  ─────────────────────────────                              │
│  • Bilinçli düşünce ve anlam                                │
│  • Kişisel kimlik ve değerler                               │
│  • Uzun süreli hafıza ve sadakat                            │
│  • "Bu marka benim kim olduğumu temsil ediyor"              │
└─────────────────────────────────────────────────────────────┘
```

### Her Seviye İçin Tasarım

**İçgüdüsel (Visceral):**
```css
/* Güzel ilk izlenim */
.hero {
  background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
  color: white;
}

/* Hoş mikro etkileşimler */
.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

**Davranışsal (Behavioral):**
```javascript
// Anında geri bildirim
button.onclick = () => {
  button.disabled = true;
  button.textContent = 'Kaydediliyor...';
  
  save().then(() => {
    showSuccess('Kaydedildi!');  // Anında onay
  });
};
```

**Yansıtıcı (Reflective):**
```html
<!-- Marka hikayesi ve değerleri -->
<section class="about">
  <h2>Neden Varız</h2>
  <p>Teknolojinin güçlendirmesi gerektiğine inanıyoruz, karmaşıklaştırması değil...</p>
</section>

<!-- Kimliğe bağlanan sosyal kanıt -->
<blockquote>
  "Bu araç olmak istediğim tasarımcı olmama yardım etti."
</blockquote>
```

---

## 3. Güven İnşa Sistemi

### Güven Sinyali Kategorileri

| Kategori | Öğeler | Uygulama |
|----------|----------|----------------|
| **Güvenlik** | SSL, rozetler, şifreleme | Görünür asma kilit, formlarda güvenlik logoları |
| **Sosyal Kanıt** | Yorumlar, referanslar, logolar | Yıldız puanları, müşteri fotoğrafları, marka logoları |
| **Şeffaflık** | Politikalar, fiyatlandırma, iletişim | Net linkler, gizli ücret yok, gerçek adres |
| **Profesyonel** | Tasarım kalitesi, tutarlılık | Kırık öğe yok, tutarlı markalama |
| **Otorite** | Sertifikalar, ödüller, medya | "Şurada görüldüğü gibi...", endüstri sertifikaları |

### Güven Sinyali Yerleşimi

```
┌────────────────────────────────────────────────────┐
│  ÜST BİLGİ: Güven banner'ı ("Ücretsiz kargo | 30  │
│             gün iade | Güvenli ödeme")              │
├────────────────────────────────────────────────────┤
│  KAHRAMAN: Sosyal kanıt ("10,000+ kişi güvendi")  │
├────────────────────────────────────────────────────┤
│  ÜRÜN: Görünür yorumlar, güvenlik rozetleri        │
├────────────────────────────────────────────────────┤
│  ÖDEME: Ödeme ikonları, SSL rozeti, garanti        │
├────────────────────────────────────────────────────┤
│  ALT BİLGİ: İletişim, politikalar, sertifikalar    │
└────────────────────────────────────────────────────┘
```

### Güven İnşa Eden CSS Desenleri

```css
/* Güven rozeti stili */
.trust-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #F0FDF4;  /* Açık yeşil = güvenlik */
  border-radius: 2px; /* Güven için keskin = hassasiyet hissi */
  font-size: 14px;
  color: #166534;
}

/* Güvenli form göstergesi */
.secure-form::before {
  content: '🔒 Güvenli form';
  display: block;
  font-size: 12px;
  color: #166534;
  margin-bottom: 8px;
}

/* Referans kartı */
.testimonial {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: white;
  border-radius: 16px; /* Dostça = daha büyük yarıçap */
  box-shadow: var(--shadow-sm);
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;  /* Gerçek fotoğraflar > baş harfler */
}
```

---

## 4. Bilişsel Yük Yönetimi

### Üç Tür Bilişsel Yük

| Tür | Tanım | Tasarımcının Rolü |
|------|------------|-----------------|
| **İçsel (Intrinsic)** | Görevin doğasında var olan karmaşıklık | Küçük adımlara bölün |
| **Dışsal (Extraneous)** | Kötü tasarımdan kaynaklanan yük | Bunu ortadan kaldırın! |
| **Etkili (Germane)** | Öğrenme çabası | Destekleyin ve teşvik edin |

### Azaltma Stratejileri

**1. Basitleştir (Dışsal Olanı Azalt)**
```css
/* Görsel gürültü → Temiz */
.card-busy {
  border: 2px solid red;
  background: linear-gradient(...);
  box-shadow: 0 0 20px ...;
  /* Çok fazla! */
}

.card-clean {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
  /* Sakin, odaklanmış */
}
```

**2. Bilgiyi Parçala (Chunk Information)**
```html
<!-- Bunaltıcı -->
<form>
  <!-- Bir kerede 15 alan -->
</form>

<!-- Parçalanmış -->
<form>
  <fieldset>
    <legend>Adım 1: Kişisel Bilgi</legend>
    <!-- 3-4 alan -->
  </fieldset>
  <fieldset>
    <legend>Adım 2: Kargo</legend>
    <!-- 3-4 alan -->
  </fieldset>
</form>
```

**3. Aşamalı Açıklama (Progressive Disclosure)**
```html
<!-- İhtiyaç duyulana kadar karmaşıklığı gizle -->
<div class="filters">
  <div class="filters-basic">
    <!-- Yaygın filtreler görünür -->
  </div>
  <button onclick="toggleAdvanced()">
    Gelişmiş Seçenekler ▼
  </button>
  <div class="filters-advanced" hidden>
    <!-- Karmaşık filtreler gizli -->
  </div>
</div>
```

**4. Tanıdık Desenler Kullan**
```
✅ Standart navigasyon yerleşimi
✅ Beklenen ikon anlamları (🔍 = arama)
✅ Geleneksel form düzenleri
✅ Yaygın jest desenleri (kaydırma, kıstırma)
```

**5. Bilgiyi Yükle**
```html
<!-- Kullanıcıları hatırlamak zorunda bırakmayın -->
<label>
  Kart Numarası
  <input type="text" inputmode="numeric" 
         autocomplete="cc-number" 
         placeholder="1234 5678 9012 3456">
</label>

<!-- Girdiklerini göster -->
<div class="order-summary">
  <p>Şuraya gönderiliyor: <strong>John Doe, 123 Main St...</strong></p>
  <a href="#">Düzenle</a>
</div>
```

---

## 5. İkna Edici Tasarım (Etik)

### Etik İkna Teknikleri

| Teknik | Etik Kullanım | Karanlık Desen (Kaçın) |
|-----------|-------------|----------------------|
| **Kıtlık** | Gerçek stok seviyeleri | Sahte geri sayım sayaçları |
| **Sosyal Kanıt** | Hakiki yorumlar | Sahte referanslar |
| **Otorite** | Gerçek yeterlilik belgeleri | Yanıltıcı rozetler |
| **Aciliyet** | Gerçek son tarihler | Üretilmiş FOMO |
| **Bağlılık** | İlerleme kaydetme | Suçluluk hissettirme |

### Dürtme (Nudge) Desenleri

**Akıllı Varsayılanlar:**
```html
<!-- Önerilen seçeneği önceden seç -->
<input type="radio" name="plan" value="monthly">
<input type="radio" name="plan" value="annual" checked>
  Yıllık (%20 Tasarruf)
```

**Çıpalama (Anchoring):**
```html
<!-- İndirimi çerçevelemek için orijinal fiyatı göster -->
<div class="price">
  <span class="original">$99</span>
  <span class="current">$79</span>
  <span class="savings">%20 Tasarruf</span>
</div>
```

**Sosyal Kanıt:**
```html
<!-- Gerçek zamanlı aktivite -->
<div class="activity">
  <span class="avatar">👤</span>
  <span>NYC'den Sarah az önce satın aldı</span>
</div>

<!-- Toplu kanıt -->
<p>Aracımızı kullanan 50,000+ tasarımcıya katılın</p>
```

**İlerleme & Bağlılık:**
```html
<!-- Tamamlamayı teşvik etmek için ilerlemeyi göster -->
<div class="progress">
  <div class="progress-bar" style="width: 60%"></div>
  <span>%60 tamamlandı - neredeyse bitti!</span>
</div>
```

---

## 6. Kullanıcı Personası Hızlı Referansı

### Z Kuşağı (Doğum 1997-2012)

```
ÖZELLİKLER:
- Dijital yerliler, mobil öncelikli
- Otantikliğe, çeşitliliğe değer verir
- Kısa dikkat süreleri
- Görsel öğrenenler

TASARIM YAKLAŞIMI:
├── Renkler: Canlı, hiper renkler, cesur gradyanlar
├── Tipografi: Büyük, değişken, deneysel
├── Düzen: Dikey kaydırma, mobil yerel
├── Etkileşimler: Hızlı, oyunlaştırılmış, jest tabanlı
├── İçerik: Kısa video, memler, hikayeler
└── Güven: Akran yorumları > otorite
```

### Y Kuşağı / Millennials (Doğum 1981-1996)

```
ÖZELLİKLER:
- Şeyler yerine deneyimlere değer verir
- Satın almadan önce araştırır
- Sosyal bilinçli
- Fiyat duyarlı ama kalite farkında

TASARIM YAKLAŞIMI:
├── Renkler: Sönük pasteller, toprak tonları
├── Tipografi: Temiz, okunabilir sans-serif
├── Düzen: Duyarlı, kart tabanlı
├── Etkileşimler: Pürüzsüz, amaçlı animasyonlar
├── İçerik: Değer odaklı, şeffaf
└── Güven: Yorumlar, sürdürülebilirlik, değerler
```

### X Kuşağı (Doğum 1965-1980)

```
ÖZELLİKLER:
- Bağımsız, kendine yeten
- Verimliliğe değer verir
- Pazarlamaya şüpheci
- Dengeli teknoloji rahatlığı

TASARIM YAKLAŞIMI:
├── Renkler: Profesyonel, güvenilir
├── Tipografi: Tanıdık, muhafazakar
├── Düzen: Net hiyerarşi, geleneksel
├── Etkileşimler: Fonksiyonel, gösterişli değil
├── İçerik: Doğrudan, olgu tabanlı
└── Güven: Uzmanlık, geçmiş performans
```

### Baby Boomerlar (Doğum 1946-1964)

```
ÖZELLİKLER:
- Detay odaklı
- Güvenildiğinde sadık
- Kişisel hizmete değer verir
- Teknolojiye daha az güvenen

TASARIM YAKLAŞIMI:
├── Renkler: Yüksek kontrast, basit palet
├── Tipografi: Büyük (18px+), yüksek kontrast
├── Düzen: Basit, doğrusal, ferah
├── Etkileşimler: Minimal, net geri bildirim
├── İçerik: Kapsamlı, ayrıntılı
└── Güven: Telefon numaraları, gerçek insanlar
```

---

## 7. Duygu Renk Eşleştirmesi

```
┌────────────────────────────────────────────────────┐
│  DUYGU            │  RENKLER          │  KULLANIM  │
├───────────────────┼───────────────────┼────────────┤
│  Güven            │  Mavi, Yeşil      │  Finans    │
│  Heyecan          │  Kırmızı, Turuncu │  Satış     │
│  Sakin            │  Mavi, Yumuşak yeşil │ Wellness  │
│  Lüks             │  Siyah, Altın     │  Premium   │
│  Yaratıcılık      │  Turkuaz, Pembe   │  Sanat     │
│  Enerji           │  Sarı, Turuncu    │  Spor      │
│  Doğa             │  Yeşil, Kahve     │  Eko       │
│  Mutluluk         │  Sarı, Turuncu    │  Çocuk     │
│  Sofistike        │  Gri, Lacivert    │  Kurumsal  │
│  Aciliyet         │  Kırmızı          │  Hatalar   │
└───────────────────┴───────────────────┴────────────┘
```

---

## 8. Psikoloji Kontrol Listesi

### Lansmandan Önce

- [ ] **Hick Yasası:** Navigasyonda 7'den fazla seçenek yok
- [ ] **Fitts Yasası:** Birincil CTA'lar büyük ve ulaşılabilir
- [ ] **Miller Yasası:** İçerik uygun şekilde parçalanmış
- [ ] **Von Restorff:** CTA'lar çevreden ayrışıyor
- [ ] **Güven:** Güvenlik rozetleri, yorumlar, politikalar görünür
- [ ] **Duygusal:** Tasarım amaçlanan duyguyu uyandırıyor
- [ ] **Bilişsel Yük:** Arayüz temiz, bunaltıcı değil
- [ ] **Tanıdık Desenler:** Standart kurallar kullanılmış
- [ ] **Geri Bildirim:** Tüm eylemlerin net yanıtları var
- [ ] **Erişilebilirlik:** Tüm kullanıcılar için kapsayıcı
