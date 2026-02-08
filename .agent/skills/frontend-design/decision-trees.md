# Karar Ağaçları & Bağlam Şablonları

> Sabit çözümler değil, bağlam tabanlı tasarım DÜŞÜNCESİ.
> **Bunlar karar REHBERLERİDİR, kopyala-yapıştır şablonları değil.**
> **UX psikolojisi prensipleri için (Hick, Fitts vb. yasalar):** [ux-psychology.md](ux-psychology.md)

---

## ⚠️ Bu Dosya Nasıl Kullanılır

Bu dosya kopyalamanıza değil, KARAR VERMENİZE yardımcı olur.

- Karar ağaçları → Seçenekler üzerinden DÜŞÜNMENİZE yardımcı olur
- Şablonlar → Kesin değerleri değil, YAPIYI ve PRENSİPLERİ gösterir
- Uygulamadan önce **her zaman kullanıcı tercihlerini sorun**
- Bağlama göre **taze paletler oluşturun**, hex kodlarını kopyalamayın
- Kararları doğrulamak için ux-psychology.md'den **UX yasalarını uygulayın**

---

## 1. Ana Karar Ağacı

```
┌─────────────────────────────────────────────────────────────┐
│                   NE İNŞA EDİYORSUNUZ?                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   E-TİCARET             SaaS/UYGULAMA           İÇERİK
   - Ürün sayfaları      - Dashboard             - Blog
   - Ödeme (Checkout)    - Araçlar               - Portföy
   - Katalog             - Yönetici Paneli       - Açılış Sayfası
        │                     │                     │
        ▼                     ▼                     ▼
   PRENSİPLER:           PRENSİPLER:           PRENSİPLER:
   - Güven               - İşlevsellik         - Hikaye Anlatımı
   - Eylem               - Netlik              - Duygu
   - Aciliyet            - Verimlilik          - Yaratıcılık
```

---

## 2. Hedef Kitle Karar Ağacı

### Hedef kullanıcınız kim?

```
HEDEF KİTLE
      │
      ├── Z Kuşağı (18-25)
      │   ├── Renkler: Cesur, canlı, beklenmedik kombinasyonlar
      │   ├── Tip: Büyük, etkileyici, değişken
      │   ├── Düzen: Önce mobil, dikey, atıştırmalık (snackable)
      │   ├── Efektler: Hareket, oyunlaştırma, etkileşimli
      │   └── Yaklaşım: Otantik, hızlı, kurumsal his yok
      │
      ├── Y Kuşağı / Millennials (26-41)
      │   ├── Renkler: Sönük, topraksı, sofistike
      │   ├── Tip: Temiz, okunabilir, fonksiyonel
      │   ├── Düzen: Duyarlı, kart tabanlı, organize
      │   ├── Efektler: İnce, sadece amaçlı
      │   └── Yaklaşım: Değer odaklı, şeffaf, sürdürülebilir
      │
      ├── X Kuşağı (42-57)
      │   ├── Renkler: Profesyonel, güvenilir, muhafazakar
      │   ├── Tip: Tanıdık, net, saçmalık yok
      │   ├── Düzen: Geleneksel hiyerarşi, öngörülebilir
      │   ├── Efektler: Minimal, fonksiyonel geri bildirim
      │   └── Yaklaşım: Doğrudan, verimli, güvenilir
      │
      ├── Boomerlar (58+)
      │   ├── Renkler: Yüksek kontrast, basit, net
      │   ├── Tip: Büyük boyutlar, yüksek okunabilirlik
      │   ├── Düzen: Basit, doğrusal, karmaşık olmayan
      │   ├── Efektler: Yok veya çok minimal
      │   └── Yaklaşım: Net, ayrıntılı, güvenilir
      │
      └── B2B / Kurumsal
          ├── Renkler: Profesyonel palet, sönük
          ├── Tip: Temiz, veri dostu, taranabilir
          ├── Düzen: Izgara tabanlı, organize, verimli
          ├── Efektler: Profesyonel, ince
          └── Yaklaşım: Uzman, çözüm odaklı, ROI odaklı
```

---

## 3. Renk Seçimi Karar Ağacı

### Sabit hex kodları yerine, bu süreci kullanın:

```
HANGİ DUYGUYU/EYLEMİ İSTİYORSUNUZ?
            │
            ├── Güven & Güvenlik
            │   └── Düşün: Mavi ailesi, profesyonel nötrler
            │       → Kullanıcıya belirli ton tercihlerini SORUN
            │
            ├── Büyüme & Sağlık
            │   └── Düşün: Yeşil ailesi, doğal tonlar
            │       → Kullanıcıya eko/doğa/wellness odağını SORUN
            │
            ├── Aciliyet & Eylem
            │   └── Düşün: VURGU olarak sıcak renkler (turuncu/kırmızı)
            │       → İdareli kullanın, uygunluğunu SORUN
            │
            ├── Lüks & Premium
            │   └── Düşün: Derin koyular, metalikler, kısıtlı palet
            │       → Marka konumlandırmasını SORUN
            │
            ├── Yaratıcı & Oyuncu
            │   └── Düşün: Çok renkli, beklenmedik kombinasyonlar
            │       → Marka kişiliğini SORUN
            │
            └── Sakin & Minimal
                └── Düşün: Tek vurgulu nötrler
                    → Hangi vurgu renginin markaya uyduğunu SORUN
```

### Süreç:
1. İhtiyaç duyulan duyguyu tanımla
2. Renk AİLESİNE daralt
3. Aile içinde tercih için kullanıcıya SOR
4. HSL prensiplerini kullanarak taze palet oluştur

---

## 4. Tipografi Karar Ağacı

```
İÇERİK TÜRÜ NEDİR?
          │
          ├── Veri-Yoğun (Dashboard, SaaS)
          │   ├── Stil: Sans-serif, net, kompakt
          │   ├── Ölçek: Daha sıkı oran (1.125-1.2)
          │   └── Öncelik: Taranabilirlik, yoğunluk
          │
          ├── Editoryal (Blog, Dergi)
          │   ├── Stil: Serif başlık + Sans gövde iyi çalışır
          │   ├── Ölçek: Daha dramatik (1.333+)
          │   └── Öncelik: Okuma konforu, hiyerarşi
          │
          ├── Modern Teknoloji (Girişim, SaaS Pazarlama)
          │   ├── Stil: Geometrik veya hümanist sans
          │   ├── Ölçek: Dengeli (1.25)
          │   └── Öncelik: Modern his, netlik
          │
          ├── Lüks (Moda, Premium)
          │   ├── Stil: Zarif serif veya ince sans
          │   ├── Ölçek: Dramatik (1.5-1.618)
          │   └── Öncelik: Sofistike, beyaz boşluk
          │
          └── Oyuncu (Çocuklar, Oyunlar, Gündelik)
              ├── Stil: Yuvarlak, dostça fontlar
              ├── Ölçek: Değişken, etkileyici
              └── Öncelik: Eğlenceli, ulaşılabilir, okunabilir
```

### Seçim Süreci:
1. İçerik türünü tanımla
2. Stil YÖNÜNÜ seç
3. Kullanıcıya marka fontları olup olmadığını SOR
4. Yöne uyan fontları seç

---

## 5. E-ticaret Yönergeleri {#e-commerce}

### Temel Prensipler (Sabit Kurallar Değil)
- **Önce güven:** Güvenliği nasıl göstereceksiniz?
- **Eylem odaklı:** CTA'lar nerede?
- **Taranabilir:** Kullanıcılar hızlıca karşılaştırabilir mi?

### Renk Düşüncesi:
```
E-ticaret tipik olarak şunlara ihtiyaç duyar:
├── Güven rengi (genellikle mavi ailesi) → tercihi SOR
├── Temiz arka plan (beyaz/nötr) → markaya bağlı
├── Eylem vurgusu (CTA'lar, indirimler için) → aciliyet seviyesine bağlı
├── Başarı/hata semantiği → standart kurallar çalışır
└── Marka entegrasyonu → mevcut renkleri SOR
```

### Düzen Prensipleri:
```
┌────────────────────────────────────────────────────┐
│  ÜST BİLGİ: Marka + Arama + Sepet                   │
│  (Temel eylemleri görünür tut)                      │
├────────────────────────────────────────────────────┤
│  GÜVEN BÖLGESİ: Neden bu siteye güvenmeliyim?       │
│  (Kargo, iade, güvenlik - varsa)                    │
├────────────────────────────────────────────────────┤
│  KAHRAMAN (HERO): Birincil mesaj veya teklif        │
│  (Net CTA, tek odak)                                │
├────────────────────────────────────────────────────┤
│  KATEGORİLER: Kolay navigasyon                      │
│  (Görsel, filtrelenebilir, taranabilir)             │
├────────────────────────────────────────────────────┤
│  ÜRÜNLER: Kolay karşılaştırma                       │
│  (Fiyat, derecelendirme, hızlı eylemler görünür)    │
├────────────────────────────────────────────────────┤
│  SOSYAL KANIT: Başkaları neden güveniyor            │
│  (Yorumlar, referanslar - mevcutsa)                 │
├────────────────────────────────────────────────────┤
│  ALT BİLGİ: Tüm detaylar                            │
│  (Politikalar, iletişim, güven rozetleri)           │
└────────────────────────────────────────────────────┘
```

### Uygulanacak Psikoloji:
- Hick Yasası: Navigasyon seçimlerini sınırla
- Fitts Yasası: CTA'ları uygun boyutta yap
- Sosyal kanıt: İlgili yerlerde göster
- Kıtlık: Eğer varsa dürüstçe kullan

---

## 6. SaaS Dashboard Yönergeleri {#saas}

### Temel Prensipler
- **Önce işlevsellik:** Veri netliği, süslemenin önündedir
- **Sakin UI:** Bilişsel yükü azalt
- **Tutarlı:** Öngörülebilir desenler

### Renk Düşüncesi:
```
Dashboard tipik olarak şunlara ihtiyaç duyar:
├── Arka plan: Açık VEYA koyu (tercihi SOR)
├── Yüzey: Arka plandan hafif kontrast
├── Birincil vurgu: Anahtar eylemler için
├── Veri renkleri: Başarı/uyarı/tehlike semantiği
└── Sönük: İkincil bilgiler için
```

### Düzen Prensipleri:
```
Bu desenleri düşünün (zorunlu değil):

SEÇENEK A: Kenar Çubuğu + İçerik
├── Navigasyon için sabit kenar çubuğu
└── İçerik için ana alan

SEÇENEK B: Üst Navigasyon + İçerik
├── Yatay navigasyon
└── Daha fazla yatay içerik alanı

SEÇENEK C: Daraltılmış + Genişletilebilir
├── Sadece ikonlu kenar çubuğu genişler
└── Maksimum içerik alanı

→ Kullanıcıya navigasyon tercihini SOR
```

### Uygulanacak Psikoloji:
- Hick Yasası: Navigasyon öğelerini grupla
- Miller Yasası: Bilgiyi parçalara ayır (Chunking)
- Bilişsel Yük: Beyaz boşluk, tutarlılık

---

## 7. Açılış Sayfası (Landing Page) Yönergeleri {#landing-page}

### Temel Prensipler
- **Kahraman-merkezli:** İlk izlenim en önemlisidir
- **Tek odak:** Bir birincil CTA
- **Duygusal:** Satmadan önce bağ kur

### Renk Düşüncesi:
```
Açılış sayfası tipik olarak şunlara ihtiyaç duyar:
├── Marka birincili: Kahraman arka planı veya vurgusu
├── Temiz ikincil: Sayfanın çoğu
├── CTA rengi: Her şeyden öne çıkar
├── Destekleyici: Bölümler, referanslar için
└── Önce marka renklerini SORUN!
```

### Yapı Prensipleri:
```
┌────────────────────────────────────────────────────┐
│  Navigasyon: Minimal, CTA görünür                   │
├────────────────────────────────────────────────────┤
│  KAHRAMAN: Kanca + Değer + CTA                      │
│  (En önemli bölüm, en büyük etki)                   │
├────────────────────────────────────────────────────┤
│  PROBLEM: Hangi acıya sahipler?                     │
├────────────────────────────────────────────────────┤
│  ÇÖZÜM: Bunu nasıl çözüyorsunuz                     │
├────────────────────────────────────────────────────┤
│  KANIT: Neden size inansınlar?                      │
│  (Referanslar, logolar, istatistikler)              │
├────────────────────────────────────────────────────┤
│  NASIL: Sürecin basit açıklaması                    │
├────────────────────────────────────────────────────┤
│  FİYATLANDIRMA: Varsa                               │
├────────────────────────────────────────────────────┤
│  SSS: İtirazları ele al                             │
├────────────────────────────────────────────────────┤
│  SON CTA: Ana eylemi tekrarla                       │
└────────────────────────────────────────────────────┘
```

### Uygulanacak Psikoloji:
- İçgüdüsel (Visceral): Güzel kahraman izlenimi
- Seri Konum: Anahtar bilgi üstte/altta
- Sosyal Kanıt: Referanslar işe yarar

---

## 8. Portföy Yönergeleri {#portfolio}

### Temel Prensipler
- **Kişilik:** Kim olduğunuzu gösterin
- **İş-odaklı:** Projelerin konuşmasına izin verin
- **Akılda kalıcı:** Şablonlardan sıyrılın

### Renk Düşüncesi:
```
Portföy kişiseldir - birçok seçenek var:
├── Minimal: Nötrler + tek imza vurgusu
├── Cesur: Beklenmedik renk seçimleri
├── Koyu: Karamsar, sanatsal his
├── Açık: Temiz, profesyonel his
└── Kişisel marka kimliğini SORUN!
```

### Yapı Prensipleri:
```
┌────────────────────────────────────────────────────┐
│  Navigasyon: Kişiliğinize özgü                      │
├────────────────────────────────────────────────────┤
│  GİRİŞ: Kimsiniz, ne yapıyorsunuz                   │
│  (Akılda kalıcı yapın, jenerik değil)               │
├────────────────────────────────────────────────────┤
│  İŞ: Öne çıkan projeler                             │
│  (Büyük, görsel, etkileşimli)                       │
├────────────────────────────────────────────────────┤
│  HAKKINDA: Kişisel hikaye                           │
│  (Bağlantı kurar)                                   │
├────────────────────────────────────────────────────┤
│  İLETİŞİM: Ulaşması kolay                           │
│  (Net, doğrudan)                                    │
└────────────────────────────────────────────────────┘
```

### Uygulanacak Psikoloji:
- Von Restorff: Benzersiz şekilde akılda kalıcı olun
- Yansıtıcı (Reflective): Kişisel hikaye bağlantı kurar
- Duygusal: Profesyonellikten ziyade kişilik

---

## 9. Tasarım Öncesi Kontrol Listeleri

### HERHANGİ Bir Tasarıma Başlamadan Önce

- [ ] **Kitle tanımlandı mı?** (tam olarak kim)
- [ ] **Birincil hedef belirlendi mi?** (hangi eylem)
- [ ] **Kısıtlamalar biliniyor mu?** (zaman, marka, teknoloji)
- [ ] **İçerik mevcut mu?** (veya yer tutucular mı lazım)
- [ ] **Kullanıcı tercihleri soruldu mu?** (renkler, stil, düzen)

### Renkleri Seçmeden Önce

- [ ] **Kullanıcı tercihi soruldu mu?**
- [ ] **Bağlam düşünüldü mü?** (endüstri, duygu)
- [ ] **Varsayılanınızdan farklı mı?**
- [ ] **Erişilebilirlik kontrol edildi mi?**

### Düzeni Kesinleştirmeden Önce

- [ ] **Hiyerarşi net mi?**
- [ ] **Birincil CTA belirgin mi?**
- [ ] **Mobil düşünüldü mü?**
- [ ] **İçerik yapıya uyuyor mu?**

### Teslimattan Önce

- [ ] **Jenerik değil, premium görünüyor mu?**
- [ ] **Bununla gurur duyar mısınız?**
- [ ] **Son projeden farklı mı?**

---

## 10. Karmaşıklık Tahmini

### Hızlı Projeler (Saatler)
```
Basit açılış sayfası
Küçük portföy
Basit form
Tek bileşen
```
→ Yaklaşım: Minimal kararlar, odaklanmış uygulama

### Orta Projeler (Günler)
```
Çok sayfalı site
Modüllü dashboard
E-ticaret kategorisi
Karmaşık formlar
```
→ Yaklaşım: Tokenlar oluştur, özel bileşenler

### Büyük Projeler (Haftalar)
```
Tam SaaS uygulaması
E-ticaret platformu
Özel tasarım sistemi
Karmaşık iş akışları
```
→ Yaklaşım: Tam tasarım sistemi, dokümantasyon, test etme

---

> **Unutmayın**: Bu şablonlar YAPIYI ve DÜŞÜNME sürecini gösterir. Her proje, benzersiz bağlamına dayalı taze renk, tipografi ve stil kararlarına ihtiyaç duyar. Belirsizse SORUN.
