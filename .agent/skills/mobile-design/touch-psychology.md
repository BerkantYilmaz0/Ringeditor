# Dokunma Psikolojisi Referansı

> Mobil dokunma etkileşimi, dokunma için Fitts Yasası, başparmak bölgesi anatomisi, jest psikolojisi ve dokunsal geri bildirim üzerine derinlemesine bir bakış.
> **Bu, ux-psychology.md'nin mobil eşdeğeridir - tüm mobil işler için KRİTİKTİR.**

---

## 1. Dokunma İçin Fitts Yasası

### Temel Fark

```
MASAÜSTÜ (Fare/İzleme Dörtgeni):
├── İmleç boyutu: 1 piksel (hassas)
├── Görsel geri bildirim: Hover (üzerine gelme) durumları
├── Hata maliyeti: Düşük (yeniden denemek kolay)
└── Hedef edinimi: Hızlı, hassas

MOBİL (Parmak):
├── Temas alanı: ~7mm çap (hassas değil)
├── Görsel geri bildirim: Hover yok, sadece dokunma
├── Hata maliyeti: Yüksek (sinir bozucu yeniden denemeler)
├── Kapanma: Parmak hedefi kapatır
└── Hedef edinimi: Daha yavaş, daha büyük hedefler gerektirir
```

### Uyarlanmış Fitts Yasası Formülü

```
Dokunma edinme süresi = a + b × log₂(1 + D/W)

Burada:
├── D = Hedefe olan mesafe
├── W = Hedefin genişliği
└── Dokunma için: W masaüstünden ÇOK daha büyük olmalıdır
```

### Minimum Dokunma Hedefi Boyutları

| Platform | Minimum | Önerilen | Kullanım Yeri |
|----------|---------|-------------|---------|
| **iOS (HIG)** | 44pt × 44pt | 48pt+ | Tüm dokunulabilir öğeler |
| **Android (Material)** | 48dp × 48dp | 56dp+ | Tüm dokunulabilir öğeler |
| **WCAG 2.2** | 44px × 44px | - | Erişilebilirlik uyumluluğu |
| **Kritik Eylemler** | - | 56-64px | Birincil CTA'lar, yıkıcı eylemler |

### Görsel Boyut vs Vuruş Alanı

```
┌─────────────────────────────────────┐
│                                     │
│    ┌─────────────────────────┐      │
│    │                         │      │
│    │    [  BUTON   ]         │ ← Görsel: 36px
│    │                         │      │
│    └─────────────────────────┘      │
│                                     │ ← Vuruş alanı: 48px (dolgu uzanır)
└─────────────────────────────────────┘

✅ DOĞRU: Vuruş alanı minimum 44-48px ise görsel daha küçük olabilir
❌ YANLIŞ: Vuruş alanını küçük görsel öğeyle aynı yapmak
```

### Uygulama Kuralları

| Öğe | Görsel Boyut | Vuruş Alanı |
|---------|-------------|----------|
| İkon butonlar | 24-32px | 44-48px (dolgu) |
| Metin linkleri | Herhangi | 44px yükseklik minimum |
| Liste öğeleri | Tam genişlik | 48-56px yükseklik |
| Checkbox/Radio | 20-24px | 44-48px dokunma alanı |
| Kapat/X butonları | 24px | 44px minimum |
| Tab bar öğeleri | İkon 24-28px | Tam tab genişliği, 49px yükseklik (iOS) |

---

## 2. Başparmak Bölgesi Anatomisi

### Tek Elle Telefon Kullanımı

```
Araştırmalar gösteriyor: Kullanıcıların %49'u telefonu tek elle tutuyor.

┌─────────────────────────────────────┐
│                                     │
│  ┌─────────────────────────────┐    │
│  │       ULAŞMASI ZOR          │    │ ← Durum çubuğu, üst nav
│  │      (uzanma gerektirir)    │    │    Koy: Geri, menü, ayarlar
│  │                             │    │
│  ├─────────────────────────────┤    │
│  │                             │    │
│  │       ULAŞMASI TAMAM        │    │ ← İçerik alanı
│  │      (rahat)                │    │    Koy: İkincil eylemler, içerik
│  │                             │    │
│  ├─────────────────────────────┤    │
│  │                             │    │
│  │       ULAŞMASI KOLAY        │    │ ← Tab bar, FAB bölgesi
│  │      (başparmak yayı)       │    │    Koy: BİRİNCİL CTA'lar!
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│          [    ANA EKRAN    ]        │
└─────────────────────────────────────┘
```

### Başparmak Yayı (Sağlak Kullanıcı)

```
Telefonu tutan sağ el:

┌───────────────────────────────┐
│  UZANMA       UZANMA     TM   │
│                               │
│  UZANMA         TM       KOLAY│
│                               │
│    TM          KOLAY     KOLAY│
│                               │
│   KOLAY        KOLAY     KOLAY│
│                               │
└───────────────────────────────┘

Sol el aynalanmıştır.
→ HER İKİ el için tasarlayın veya sağ baskın varsayın
```

### Yerleşim Kılavuzları

| Öğe Türü | İdeal Konum | Neden |
|--------------|----------------|--------|
| **Birincil CTA** | Alt orta/sağ | Kolay başparmak erişimi |
| **Tab bar** | Alt | Doğal başparmak konumu |
| **FAB** | Sağ alt | Sağ el için kolay |
| **Navigasyon** | Üst (uzanma) | Daha az sık kullanım |
| **Yıkıcı eylemler** | Sol üst | Ulaşması zor = yanlışlıkla dokunması zor |
| **Kapat/İptal** | Sol üst | Gelenek + güvenlik |
| **Onayla/Bitti** | Sağ üst veya alt | Gelenek |

### Büyük Telefon Hususları (>6")

```
Büyük telefonlarda, üst %40 tek elle kullanım için "ölü bölge" olur.

Çözümler:
├── Ulaşılabilirlik özellikleri (iOS)
├── Aşağı çeken arayüzler (drawer içeriği aşağı çeker)
├── Alt sayfa (bottom sheet) navigasyonu
├── Kayan eylem butonları (FAB)
└── Üst eylemler için jest tabanlı alternatifler
```

---

## 3. Dokunma vs Tıklama Psikolojisi

### Beklenti Farklılıkları

| Yön | Tıklama (Masaüstü) | Dokunma (Mobil) |
|--------|-----------------|----------------|
| **Geri bildirim zamanlaması** | 100ms bekleyebilir | Anında (<50ms) bekler |
| **Görsel geri bildirim** | Hover → Tıkla | Anında dokunma yanıtı |
| **Hata toleransı** | Kolay yeniden deneme | Sinir bozucu, bozuk hissettirir |
| **Hassasiyet** | Yüksek | Düşük |
| **Bağlam menüsü** | Sağ tık | Uzun basma |
| **İptal eylemi** | ESC tuşu | Uzağa kaydır, dışarı dokun |

### Dokunma Geri Bildirim Gereksinimleri

```
Dokun → Anında görsel değişiklik (< 50ms)
├── Vurgu durumu (arka plan rengi değişimi)
├── Hafifçe küçülme (0.95-0.98)
├── Dalga efekti (Android Material)
├── Onay için dokunsal (haptic) geri bildirim
└── Asla hiçbir şey değil!

Yükleniyor → 100ms içinde göster
├── Eylem > 100ms sürerse
├── Çark/ilerleme göster
├── Butonu devre dışı bırak (çift dokunmayı önle)
└── Mümkünse iyimser (optimistic) UI
```

### "Şişman Parmak" Sorunu

```
Sorun: Parmak dokunma sırasında hedefi kapatır
├── Kullanıcı tam olarak nereye dokunduğunu göremez
├── Görsel geri bildirim parmağın ALTINDA görünür
└── Hata oranını artırır

Çözümler:
├── Geri bildirimi dokunma noktasının ÜZERİNDE göster (ipuçları)
├── Hassas görevler için imleç benzeri ofset kullan
├── Metin seçimi için büyütme merceği kullan
├── Hassasiyetin önemli olmadığı kadar büyük hedefler
```

---

## 4. Jest Psikolojisi

### Jest Keşfedilebilirlik Sorunu

```
Sorun: Jestler GÖRÜNMEZDİR.
├── Kullanıcı onları keşfetmeli/hatırlamalı
├── Hover/görsel ipucu yok
├── Dokunmadan farklı zihinsel model
└── Birçok kullanıcı jestleri asla keşfetmez

Çözüm: Her zaman görünür alternatif sağlayın
├── Silmek için kaydır → Ayrıca sil butonu veya menüsü göster
├── Yenilemek için çek → Ayrıca yenile butonu göster
├── Yakınlaştırmak için çimdikle → Ayrıca yakınlaştırma kontrolleri göster
└── Jestler sadece kısayoldur, tek yol değil
```

### Yaygın Jest Gelenekleri

| Jest | Evrensel Anlam | Kullanım |
|---------|-------------------|-------|
| **Dokunma** | Seç, etkinleştir | Birincil eylem |
| **Çift dokunma** | Yakınlaştır, beğen/favorile | Hızlı eylem |
| **Uzun basma** | Bağlam menüsü, seçim modu | İkincil seçenekler |
| **Yatay kaydırma** | Navigasyon, sil, eylemler | Liste eylemleri |
| **Aşağı kaydırma** | Yenile, kapat | Çek-yenile |
| **Çimdikleme** | Yakınlaştır/uzaklaştır | Haritalar, resimler |
| **İki parmakla kaydırma** | Kaydırma içinde kaydırma | İç içe kaydırmalar |

### Jest İşlerlik (Affordance) Tasarımı

```
Kaydırma eylemleri görsel ipuçlarına ihtiyaç duyar:

┌─────────────────────────────────────────┐
│  ┌───┐                                  │
│  │ ≡ │  Gizli eylemli öğe...          → │ ← Kenar ipucu (kısmi renk)
│  └───┘                                  │
└─────────────────────────────────────────┘

✅ İyi: Kenarda kaydırmayı öneren hafif renk gösterimi
✅ İyi: Sürükleme kulpu ikonu ( ≡ ) yeniden sıralamayı önerir
✅ İyi: İşe alıştırma ipucu jesti açıklar
❌ Kötü: Görsel işlerliği olmayan gizli jestler
```

### Platform Jest Farklılıkları

| Jest | iOS | Android |
|---------|-----|---------|
| **Geri** | Soldan kenar kaydırma | Sistem geri butonu/jesti |
| **Paylaş** | Eylem sayfası | Paylaşım sayfası |
| **Bağlam menüsü** | Uzun basma / Force touch | Uzun basma |
| **Modalı kapat** | Aşağı kaydır | Geri butonu veya kaydırma |
| **Listede sil** | Sola kaydır, sil'e dokun | Sola kaydır, hemen veya geri al |

---

## 5. Dokunsal Geri Bildirim Desenleri

### Haptikler Neden Önemlidir

```
Haptikler şunları sağlar:
├── Bakmadan onay
├── Daha zengin, daha premium his
├── Erişilebilirlik (görme engelli kullanıcılar)
├── Azaltılmış hata oranı
└── Duygusal tatmin

Haptiksiz:
├── "Ucuz" veya web benzeri hissedilir
├── Kullanıcı eylemin kayıt edilip edilmediğinden emin olamaz
└── Zevk fırsatı kaçırılır
```

### iOS Haptik Türleri

| Tür | Yoğunluk | Kullanım Durumu |
|------|-----------|----------|
| `selection` | Hafif | Seçici kaydırma, geçiş, seçim |
| `light` | Hafif | Küçük eylemler, hover eşdeğeri |
| `medium` | Orta | Standart dokunma onayı |
| `heavy` | Güçlü | Önemli tamamlandı, bırak |
| `success` | Desen | Görev başarıyla tamamlandı |
| `warning` | Desen | Uyarı, dikkat gerekli |
| `error` | Desen | Hata oluştu |

### Android Haptik Türleri

| Tür | Kullanım Durumu |
|------|----------|
| `CLICK` | Standart dokunma geri bildirimi |
| `HEAVY_CLICK` | Önemli eylemler |
| `DOUBLE_CLICK` | Eylemleri onayla |
| `TICK` | Kaydırma/sürtme geri bildirimi |
| `LONG_PRESS` | Uzun basma aktivasyonu |
| `REJECT` | Hata/geçersiz eylem |

### Haptik Kullanım Kılavuzları

```
✅ Şunlar için haptik KULLAN:
├── Buton dokunuşları
├── Geçiş anahtarları
├── Seçici/kaydırıcı değerleri
├── Çek-yenile tetikleyici
├── Başarılı eylem tamamlama
├── Hatalar ve uyarılar
├── Kaydırma eylemi eşikleri
└── Önemli durum değişiklikleri

❌ Şunlar için haptik KULLANMA:
├── Her kaydırma konumu
├── Her liste öğesi
├── Arka plan olayları
├── Pasif gösterimler
└── Çok sık (haptik yorgunluğu)
```

### Haptik Yoğunluk Eşlemesi

| Eylem Önemi | Haptik Seviyesi | Örnek |
|-------------------|--------------|---------|
| Küçük/Gezinme | Hafif / Yok | Kaydırma, gezinme |
| Standart Eylem | Orta / Seçim | Dokunma, geçiş |
| Önemli Eylem | Ağır / Başarı | Tamamla, onayla |
| Kritik/Yıkıcı | Ağır / Uyarı | Sil, ödeme |
| Hata | Hata deseni | Başarısız eylem |

---

## 6. Mobil Bilişsel Yük

### Mobilin Masaüstünden Farkı

| Faktör | Masaüstü | Mobil | Çıkarım |
|--------|---------|--------|-------------|
| **Dikkat** | Odaklanmış oturumlar | Sürekli kesintiye uğrar | Mikro oturumlar için tasarla |
| **Bağlam** | Kontrollü ortam | Her yerde, her koşulda | Kötü ışıklandırmayı, gürültüyü yönet |
| **Çoklu Görev** | Çoklu pencereler | Tek uygulama görünür | Görevi uygulama içinde tamamla |
| **Giriş hızı** | Hızlı (klavye) | Yavaş (dokunmatik yazma) | Girişi minimize et, akıllı varsayılanlar |
| **Hata kurtarma** | Kolay (geri al, geri) | Daha zor (kısayol yok) | Hataları önle, kolay kurtarma |

### Mobil Bilişsel Yükü Azaltma

```
1. EKRAN BAŞINA BİR BİRİNCİL EYLEM
   └── Sonra ne yapılacağı net olsun
   
2. AŞAMALI AÇIKLAMA (PROGRESSIVE DISCLOSURE)
   └── Sadece şu an gerekeni göster
   
3. AKILLI VARSAYILANLAR
   └── Yapabildiğini önceden doldur
   
4. PARÇALAMA (CHUNKING)
   └── Uzun formları adımlara böl
   
5. HATIRLAMA yerine TANIMA
   └── Seçenekleri göster, kullanıcının hatırlamasını bekleme
   
6. BAĞLAM KALICILIĞI
   └── Kesinti/arka plan durumunda durumu kaydet
```

### Mobil İçin Miller Yasası

```
Masaüstü: Çalışan bellekte 7±2 öğe
Mobil: 5±1'e düşür (daha fazla dikkat dağıtıcı)

Navigasyon: Maks 5 tab bar öğesi
Seçenekler: Menü seviyesi başına maks 5
Adımlar: İlerlemede maks 5 görünür adım
```

### Mobil İçin Hick Yasası

```
Daha fazla seçenek = daha yavaş kararlar

Mobil etkisi: Masaüstünden daha kötü
├── Daha küçük ekran = daha az genel bakış
├── Kaydırma gerekli = öğeler unutulur
├── Kesintiler = bağlam kaybı
└── Karar yorgunluğu daha hızlı

Çözüm: Aşamalı açıklama
├── 3-5 seçenekle başla
├── Ekstralar için "Daha fazla"
├── Akıllı sıralama (en çok kullanılan ilk)
└── Önceki seçimler hatırlandı
```

---

## 7. Dokunma Erişilebilirliği

### Motor Bozukluğu Hususları

```
Motor bozukluğu olan kullanıcılar şunları yaşayabilir:
├── Titremeler (daha büyük hedeflere ihtiyaç duyar)
├── Yardımcı cihazlar kullanır (farklı giriş yöntemi)
├── Sınırlı uzanma (tek elle kullanım gerekliliği)
├── Daha fazla zamana ihtiyaç duyar (zaman aşımlarından kaçın)
└── Yanlışlıkla dokunmalar (onay gerektirir)

Tasarım yanıtları:
├── Cömert dokunma hedefleri (48dp+)
├── Jestler için ayarlanabilir zamanlama
├── Yıkıcı eylemler için geri al
├── Anahtar kontrolü (Switch control) desteği
└── Ses kontrolü desteği
```

### Dokunma Hedefi Aralığı (A11y)

```
WCAG 2.2 Başarı Kriteri 2.5.8:

Dokunma hedefleri şunlara sahip OLMALIDIR:
├── Genişlik: ≥ 44px
├── Yükseklik: ≥ 44px
├── Aralık: Bitişik hedeflerden ≥ 8px

VEYA hedef şudur:
├── Satır içi (metin içinde)
├── Kullanıcı kontrollü (kullanıcı yeniden boyutlandırabilir)
├── Esaslı (alternatif tasarım yok)
```

### Erişilebilir Dokunma Desenleri

| Desen | Erişilebilir Uygulama |
|---------|---------------------------|
| Kaydırma eylemleri | Menü alternatifi sağla |
| Sürükle ve bırak | Seç + taşı seçeneği sağla |
| Çimdikle yakınlaştır | Yakınlaştırma butonları sağla |
| Force touch | Uzun basma alternatifi sağla |
| Sallama jesti | Buton alternatifi sağla |

---

## 8. Dokunmada Duygu

### Premium His

```
Dokunmayı "premium" hissettiren şey:
├── Anında tepki (< 50ms)
├── Uygun dokunsal geri bildirim
├── Pürüzsüz 60fps animasyonlar
├── Doğru direnç/fizik
├── Ses geri bildirimi (uygun olduğunda)
└── Yay (spring) fiziğine dikkat
```

### Duygusal Dokunma Geri Bildirimi

| Duygu | Dokunma Yanıtı |
|---------|----------------|
| Başarı | Haptik başarı + konfeti/tik |
| Hata | Haptik hata + sallanma animasyonu |
| Uyarı | Haptik uyarı + dikkat rengi |
| Zevk/Haz | Beklenmedik pürüzsüz animasyon |
| Güç | Önemli eylemde güçlü haptik |

### Dokunma Yoluyla Güven İnşası

```
Dokunma etkileşimlerinde güven sinyalleri:
├── Tutarlı davranış (aynı eylem = aynı yanıt)
├── Güvenilir geri bildirim (asla sessizce başarısız olmaz)
├── Hassas eylemler için güvenli his
├── Profesyonel animasyonlar (sarsıntılı değil)
└── Yanlışlıkla eylem yok (yıkıcı için onay)
```

---

## 9. Dokunma Psikolojisi Kontrol Listesi

### Her Ekrandan Önce

- [ ] **Tüm dokunma hedefleri ≥ 44-48px mi?**
- [ ] **Birincil CTA başparmak bölgesinde mi?**
- [ ] **Yıkıcı eylemler onay gerektiriyor mu?**
- [ ] **Jest alternatifleri var mı (görünür butonlar)?**
- [ ] **Önemli eylemlerde dokunsal geri bildirim var mı?**
- [ ] **Dokunmada anında görsel geri bildirim var mı?**
- [ ] **> 100ms eylemler için yükleme durumları var mı?**

### Yayından Önce

- [ ] **Desteklenen en küçük cihazda test edildi mi?**
- [ ] **Büyük telefonda tek elle test edildi mi?**
- [ ] **Tüm jestlerin görünür alternatifleri var mı?**
- [ ] **Haptikler doğru çalışıyor mu (cihazda test et)?**
- [ ] **Dokunma hedefleri erişilebilirlik ayarlarıyla test edildi mi?**
- [ ] **Minik kapatma butonları veya ikonlar yok mu?**

---

## 10. Hızlı Referans Kartı

### Dokunma Hedefi Boyutları

```
                     iOS        Android     WCAG
Minimum:           44pt       48dp       44px
Önerilen:          48pt+      56dp+      -
Aralık:            8pt+       8dp+       8px+
```

### Başparmak Bölgesi Eylemleri

```
ÜST:      Navigasyon, ayarlar, geri (seyrek)
ORTA:     İçerik, ikincil eylemler
ALT:      Birincil CTA, tab bar, FAB (sık)
```

### Haptik Seçimi

```
Hafif:    Seçim, geçiş, küçük
Orta:     Dokunma, standart eylem
Ağır:     Onayla, tamamla, bırak
Başarı:   Görev yapıldı
Hata:     Başarısız eylem
Uyarı:    Dikkat gerekli
```

---

> **Unutmayın:** Her dokunuş, kullanıcı ve cihaz arasında bir konuşmadır. Onu doğal, duyarlı ve insan parmaklarına saygılı hissettirin—hassas imleç noktalarına değil.
