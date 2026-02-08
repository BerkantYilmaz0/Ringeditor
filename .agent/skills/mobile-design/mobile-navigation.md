# Mobil Navigasyon Referansı

> Navigasyon desenleri, derin linkleme (deep linking), geri işleme ve tab/stack/drawer kararları.
> **Navigasyon uygulamanızın iskeletidir—yanlış yaparsanız her şey bozuk hissedilir.**

---

## 1. Navigasyon Seçimi Karar Ağacı

```
NE TÜR UYGULAMA?
        │
        ├── 3-5 üst düzey bölüm (eşit önemde)
        │   └── ✅ Tab Bar / Alt Navigasyon
        │       Örnekler: Sosyal, E-ticaret, Yardımcı Araç
        │
        ├── Derin hiyerarşik içerik (aşağı inme - drill down)
        │   └── ✅ Stack Navigasyonu
        │       Örnekler: Ayarlar, E-posta klasörleri
        │
        ├── Çok sayıda hedef (>5 üst düzey)
        │   └── ✅ Drawer (Çekmece) Navigasyonu
        │       Örnekler: Gmail, karmaşık kurumsal
        │
        ├── Tek doğrusal akış
        │   └── ✅ Sadece Stack (sihirbaz/işe alıştırma)
        │       Örnekler: Ödeme, Kurulum akışı
        │
        └── Tablet/Katlanabilir
            └── ✅ Navigasyon Rayı (Rail) + Liste-Detay
                Örnekler: Mail, iPad'de Notlar
```

---

## 2. Tab Bar Navigasyonu

### Ne Zaman Kullanılır

```
✅ Tab Bar KULLAN:
├── 3-5 üst düzey hedef olduğunda
├── Hedefler eşit önemde olduğunda
├── Kullanıcı bunlar arasında sık sık geçiş yaptığında
├── Her sekmenin bağımsız navigasyon yığını (stack) olduğunda
└── Uygulama kısa oturumlarda kullanıldığında

❌ Tab Bar KULLANMA:
├── 5'ten fazla hedef olduğunda
├── Hedeflerin net bir hiyerarşisi olduğunda
├── Sekmeler çok eşit olmayan şekilde kullanılacaksa
└── İçerik bir sıra halinde akıyorsa
```

### Tab Bar En İyi Uygulamaları

```
iOS Tab Bar:
├── Yükseklik: 49pt (ana ekran göstergesi ile 83pt)
├── Maks öğe: 5
├── İkonlar: SF Symbols, 25×25pt
├── Etiketler: Her zaman göster (erişilebilirlik)
├── Aktif göstergesi: Renk tonu (tint color)

Android Alt Navigasyon:
├── Yükseklik: 80dp
├── Maks öğe: 5 (3-5 ideal)
├── İkonlar: Material Symbols, 24dp
├── Etiketler: Her zaman göster
├── Aktif göstergesi: Hap şekli + dolu ikon
```

### Tab Durumu Koruma

```
KURAL: Her sekme kendi navigasyon yığınını korur.

Kullanıcı yolculuğu:
1. Ana Sayfa sekmesi → Öğeye gir → Sepete ekle
2. Profil sekmesine geç
3. Ana Sayfa sekmesine geri dön
→ "Sepete ekle" ekranına dönmeli, ana sayfa köküne DEĞİL

Uygulama:
├── React Navigation: Her sekmenin kendi navigator'ı vardır
├── Flutter: Durum koruma için IndexedStack
└── Geçişte asla sekme yığınını sıfırlama
```

---

## 3. Stack Navigasyonu

### Temel Kavramlar

```
Stack metaforu: Üst üste yığılmış kartlar

Push: Üste ekran ekle
Pop: Üstteki ekranı kaldır (geri)
Replace: Mevcut ekranı değiştir
Reset: Yığını temizle, yeni kök ayarla

Görsel: Yeni ekran sağdan kayarak gelir (LTR)
Geri: Ekran sağa kayarak çıkar
```

### Stack Navigasyon Desenleri

| Desen | Kullanım Durumu | Uygulama |
|---------|----------|----------------|
| **Basit Stack** | Doğrusal akış | Her adımı push et |
| **İç İçe (Nested) Stack** | Alt navigasyonlu bölümler | Tab içinde Stack |
| **Modal Stack** | Odaklanmış görevler | Modal olarak sun |
| **Auth Stack** | Giriş vs Ana | Koşullu kök |

### Geri Butonu İşleme

```
iOS:
├── Soldan kenar kaydırma (sistem)
├── Nav barda geri butonu (isteğe bağlı)
├── Etkileşimli pop jesti
└── Geçerli bir neden olmadan asla geri kaydırmayı geçersiz kılma

Android:
├── Sistem geri butonu/jesti
├── Araç çubuğunda Yukarı butonu (isteğe bağlı, aşağı inmek için)
├── Tahmini geri animasyonu (Android 14+)
└── Geriyi doğru şekilde işlemeli (Activity/Fragment)

Çapraz Platform Kuralı:
├── Geri HER ZAMAN yığında yukarı gider
├── Geriyi başka amaçlar için asla gasp etme (hijack)
├── Kaydedilmemiş verileri atmadan önce onayla
└── Derin linkler tam geri geçişe izin vermelidir
```

---

## 4. Drawer (Çekmece) Navigasyonu

### Ne Zaman Kullanılır

```
✅ Drawer KULLAN:
├── 5'ten fazla üst düzey hedef olduğunda
├── Daha az erişilen hedefler olduğunda
├── Çok özellikli karmaşık uygulama olduğunda
├── Navigasyonda markalama/kullanıcı bilgisi ihtiyacı olduğunda
└── Kalıcı çekmeceye sahip tablet/büyük ekran olduğunda

❌ Drawer KULLANMA:
├── 5 veya daha az hedef olduğunda (sekmeleri kullan)
├── Tüm hedefler eşit derecede önemli olduğunda
├── Mobil öncelikli basit uygulama olduğunda
└── Keşfedilebilirlik kritik olduğunda (çekmece gizlidir)
```

### Drawer Desenleri

```
Modal Drawer:
├── İçeriğin üzerinde açılır (arkada perde/scrim)
├── Kenardan kaydırarak açılır
├── Hamburger ikonu ( ☰ ) tetikler
└── Mobilde en yaygın olanı

Kalıcı (Permanent) Drawer:
├── Her zaman görünür (büyük ekranlar)
├── İçerik yana kayar
├── Üretkenlik uygulamaları için iyi
└── Tabletler, masaüstleri

Navigasyon Rayı (Android):
├── Dar dikey şerit
├── İkonlar + isteğe bağlı etiketler
├── Portre modunda tabletler için
└── 80dp genişlik
```

---

## 5. Modal Navigasyonu

### Modal vs Push

```
PUSH (Stack):                    MODAL:
├── Yatay kayma                  ├── Dikey yukarı kayma (sheet)
├── Hiyerarşinin parçası         ├── Ayrı görev
├── Geri (Back) döndürür         ├── Kapat (X) döndürür (Dismiss)
├── Aynı navigasyon bağlamı      ├── Kendi navigasyon bağlamı
└── "İçine gir" (Drill in)       └── "Göreve odaklan"

MODAL KULLAN:
├── Yeni içerik oluşturma
├── Ayarlar/tercihler
├── Bir işlemi tamamlama
├── Kendi kendine yeten iş akışları
├── Hızlı eylemler
```

### Modal Türleri

| Tür | iOS | Android | Kullanım Durumu |
|------|-----|---------|----------|
| **Sheet** | `.sheet` | Bottom Sheet | Hızlı görevler |
| **Tam Ekran** | `.fullScreenCover` | Full Activity | Karmaşık formlar |
| **Alert** | Alert | Dialog | Onaylar |
| **Eylem Sayfası** | Action Sheet | Menu/Bottom Sheet | Seçeneklerden seçme |

### Modal Kapatma

```
Kullanıcılar modalları şöyle kapatmayı bekler:
├── X / Kapat butonuna dokunarak
├── Aşağı kaydırarak (sheet)
├── Perdeye (scrim) dokunarak (kritik olmayan)
├── Sistem geri (Android)
├── Donanım geri (eski Android)

KURAL: Sadece kaydedilmemiş veriler için kapatmayı engelle.
```

---

## 6. Derin Linkleme (Deep Linking)

### Neden İlk Günden İtibaren Derin Linkler

```
Derin linkler şunları sağlar:
├── Push bildirimi navigasyonu
├── İçerik paylaşma
├── Pazarlama kampanyaları
├── Spotlight/Arama entegrasyonu
├── Widget navigasyonu
├── Harici uygulama entegrasyonu

Sonradan inşa etmek ZORDUR:
├── Navigasyonun yeniden düzenlenmesini gerektirir
├── Ekran bağımlılıkları belirsizdir
├── Parametre geçişi karmaşıktır
└── Her zaman başlangıçta derin linkleri planlayın
```

### URL Yapısı

```
Şema://host/yol?parametreler

Örnekler:
├── myapp://product/123
├── https://myapp.com/product/123 (Evrensel/Uygulama Linki)
├── myapp://checkout?promo=SAVE20
├── myapp://tab/profile/settings

Hiyerarşi navigasyonla eşleşmelidir:
├── myapp://home
├── myapp://home/product/123
├── myapp://home/product/123/reviews
└── URL yolu = navigasyon yolu
```

### Derin Link Navigasyon Kuralları

```
1. TAM YIĞIN İNŞASI
   myapp://product/123 derin linki şunları yapmalı:
   ├── Yığının köküne Ana Sayfayı koymalı
   ├── Ürün ekranını en üste push etmeli
   └── Geri butonu Ana Sayfaya dönmeli

2. KİMLİK DOĞRULAMA FARKINDALIĞI
   Derin link auth gerektiriyorsa:
   ├── Amaçlanan hedefi kaydet
   ├── Girişe yönlendir
   ├── Girişten sonra hedefe yönlendir

3. GEÇERSİZ LİNKLER
   Derin link hedefi yoksa:
   ├── Yedeğe (ana sayfa) yönlendir
   ├── Hata mesajı göster
   └── Asla çökme veya boş ekran gösterme

4. DURUMLU NAVİGASYON
   Aktif oturum sırasında derin link:
   ├── Mevcut yığını yok etme
   ├── En üste push et VEYA
   ├── Kullanıcıya ayrılıp ayrılmayacağını sor
```

---

## 7. Navigasyon Durumu Kalıcılığı

### Neyi Kalıcı Yapmalı

```
Kalıcı YAPILMALI:
├── Mevcut sekme seçimi
├── Listelerdeki kaydırma konumu
├── Form taslak verileri
├── Son navigasyon yığını
└── Kullanıcı tercihleri

Kalıcı YAPILMAMALI:
├── Modal durumları (diyaloglar)
├── Geçici UI durumları
├── Bayat veriler (dönüşte yenile)
├── Kimlik doğrulama durumu (güvenli depolama kullan)
```

### Uygulama

```javascript
// React Navigation - Durum Kalıcılığı
const [isReady, setIsReady] = useState(false);
const [initialState, setInitialState] = useState();

useEffect(() => {
  const loadState = async () => {
    const savedState = await AsyncStorage.getItem('NAV_STATE');
    if (savedState) setInitialState(JSON.parse(savedState));
    setIsReady(true);
  };
  loadState();
}, []);

const handleStateChange = (state) => {
  AsyncStorage.setItem('NAV_STATE', JSON.stringify(state));
};

<NavigationContainer
  initialState={initialState}
  onStateChange={handleStateChange}
>
```

---

## 8. Geçiş Animasyonları

### Platform Varsayılanları

```
iOS Geçişleri:
├── Push: Sağdan kayma
├── Modal: Alttan kayma (sheet) veya fade
├── Sekme geçişi: Cross-fade
├── Etkileşimli: Geri gitmek için kaydır

Android Geçişleri:
├── Push: Fade + sağdan kayma
├── Modal: Alttan kayma
├── Sekme geçişi: Cross-fade veya yok
├── Paylaşılan öğe: Hero animasyonları
```

### Özel Geçişler

```
Ne zaman özelleştirilmeli:
├── Marka kimliği gerektirdiğinde
├── Paylaşılan öğe bağlantılarında
├── Özel ortaya çıkma efektlerinde
└── İnce tutun, <300ms

Ne zaman varsayılan kullanılmalı:
├── Çoğu zaman
├── Standart aşağı inme (drill-down)
├── Platform tutarlılığı
└── Performans kritik yollarda
```

### Paylaşılan Öğe Geçişleri

```
Ekranlar arasındaki öğeleri bağla:

Ekran A: Resimli ürün kartı
            ↓ (dokunma)
Ekran B: Aynı resimli ürün detayı (genişletilmiş)

Resim kart konumundan detay konumuna animasyonla geçer.

Uygulama:
├── React Navigation: shared element kütüphanesi
├── Flutter: Hero widget
├── SwiftUI: matchedGeometryEffect
└── Compose: Shared element transitions
```

---

## 9. Navigasyon Anti-Desenleri

### ❌ Navigasyon Günahları

| Anti-Desen | Sorun | Çözüm |
|--------------|---------|----------|
| **Tutarsız geri** | Kullanıcı kafası karışır, tahmin edemez | Her zaman yığını pop et |
| **Gizli navigasyon** | Özellikler keşfedilemez | Görünür sekmeler/drawer tetikleyici |
| **Derin iç içe geçme** | Kullanıcı kaybolur | Maks 3-4 seviye, ekmek kırıntıları (breadcrumbs) |
| **Geri kaydırmayı bozma** | iOS kullanıcıları hayal kırıklığına uğrar | Asla jesti geçersiz kılma |
| **Derin link yok** | Paylaşılamaz, kötü bildirimler | Baştan planla |
| **Sekme yığını sıfırlama** | Geçişte iş kaybı | Sekme durumlarını koru |
| **Birincil akış için modal** | Geri izlenemez | Stack navigasyonu kullan |

---

## 10. Navigasyon Kontrol Listesi

### Navigasyon Mimarisinden Önce

- [ ] Uygulama türü belirlendi (tabs/drawer/stack)
- [ ] Üst düzey hedef sayısı sayıldı
- [ ] Derin link URL şeması planlandı
- [ ] Auth akışı navigasyonla entegre edildi
- [ ] Tablet/büyük ekran düşünüldü

### Her Ekrandan Önce

- [ ] Kullanıcı geri gidebilir mi? (çıkmaz sokak değil)
- [ ] Bu ekrana derin link planlandı
- [ ] Ayrılma/geri dönme durumunda durum korundu
- [ ] İlişki için uygun geçiş
- [ ] Auth gerekli mi? İlgilenildi mi?

### Yayınlamadan Önce

- [ ] Tüm derin linkler test edildi
- [ ] Geri butonu her yerde çalışıyor
- [ ] Sekme durumları doğru korunuyor
- [ ] Kenar kaydırma geri çalışıyor (iOS)
- [ ] Tahmini geri çalışıyor (Android 14+)
- [ ] Evrensel/Uygulama linkleri yapılandırıldı
- [ ] Push bildirimi derin linkleri çalışıyor

---

> **Unutmayın:** Doğru yapıldığında navigasyon görünmezdir. Kullanıcılar bir yere NASIL gideceklerini düşünmemeli—sadece oraya gitmeli. Navigasyonu fark ederlerse, bir şeyler yanlıştır.
