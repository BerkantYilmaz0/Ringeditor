---
name: mobile-design
description: iOS ve Android uygulamaları için mobil öncelikli tasarım düşüncesi ve karar verme. Dokunma etkileşimi, performans desenleri, platform gelenekleri. Sabit değerleri değil, ilkeleri öğretir. React Native, Flutter veya native mobil uygulamalar geliştirirken kullanın.
allowed-tools: Read, Glob, Grep, Bash
---

# Mobil Tasarım Sistemi

> **Felsefe:** Önce dokunmatik (Touch-first). Pil bilincine sahip. Platforma saygılı. Çevrimdışı çalışabilir.
> **Temel Prensip:** Mobil, küçük bir masaüstü DEĞİLDİR. Mobil kısıtlamaları DÜŞÜN, platform seçimini SOR.

---

## 🔧 Çalışma Zamanı Scriptleri

**Doğrulama için bunları çalıştırın (okumayın, sadece çalıştırın):**

| Script | Amaç | Kullanım |
|--------|---------|-------|
| `scripts/mobile_audit.py` | Mobil UX & Dokunmatik Denetimi | `python scripts/mobile_audit.py <project_path>` |

---

## 🔴 ZORUNLU: Çalışmadan Önce Referans Dosyalarını Okuyun!

**⛔ İlgili dosyaları okuyana kadar geliştirmeye BAŞLAMAYIN:**

### Evrensel (Her Zaman Oku)

| Dosya | İçerik | Durum |
|------|---------|--------|
| **[mobile-design-thinking.md](mobile-design-thinking.md)** | **⚠️ EZBER KARŞITI: Düşünmeye zorlar, AI varsayılanlarını engeller** | **⬜ İLK KRİTİK** |
| **[touch-psychology.md](touch-psychology.md)** | **Fitts Yasası, jestler, haptikler, başparmak bölgesi** | **⬜ KRİTİK** |
| **[mobile-performance.md](mobile-performance.md)** | **RN/Flutter performansı, 60fps, bellek** | **⬜ KRİTİK** |
| **[mobile-backend.md](mobile-backend.md)** | **Push bildirimleri, çevrimdışı senkronizasyon, mobil API** | **⬜ KRİTİK** |
| **[mobile-testing.md](mobile-testing.md)** | **Test piramidi, E2E, platforma özgü** | **⬜ KRİTİK** |
| **[mobile-debugging.md](mobile-debugging.md)** | **Native vs JS hata ayıklama, Flipper, Logcat** | **⬜ KRİTİK** |
| [mobile-navigation.md](mobile-navigation.md) | Tab/Stack/Drawer, derin bağlantı (deep linking) | ⬜ Oku |
| [mobile-typography.md](mobile-typography.md) | Sistem fontları, Dinamik Tip, erişilebilirlik | ⬜ Oku |
| [mobile-color-system.md](mobile-color-system.md) | OLED, koyu mod, pil dostu | ⬜ Oku |
| [decision-trees.md](decision-trees.md) | Framework/durum/depolama seçimi | ⬜ Oku |

> 🧠 **mobile-design-thinking.md ÖNCELİKTİR!** Bu dosya, AI'nın ezberlenmiş kalıpları kullanmak yerine düşünmesini sağlar.

### Platforma Özgü (Hedefe Göre Oku)

| Platform | Dosya | İçerik | Ne Zaman Okunmalı |
|----------|------|---------|--------------|
| **iOS** | [platform-ios.md](platform-ios.md) | İnsan Arayüzü Yönergeleri, SF Pro, SwiftUI desenleri | iPhone/iPad için geliştirirken |
| **Android** | [platform-android.md](platform-android.md) | Material Design 3, Roboto, Compose desenleri | Android için geliştirirken |
| **Çapraz Platform** | Yukarıdakilerin ikisi de | Platform ayrışma noktaları | React Native / Flutter |

> 🔴 **iOS için geliştiriyorsanız → ÖNCE platform-ios.md okuyun!**
> 🔴 **Android için geliştiriyorsanız → ÖNCE platform-android.md okuyun!**
> 🔴 **Çapraz platform ise → İKİSİNİ DE okuyun ve koşullu platform mantığı uygulayın!**

---

## ⚠️ KRİTİK: VARSAYMADAN ÖNCE SORUNA (ZORUNLU)

> **DUR! Kullanıcının isteği açık uçluysa, favorilerini varsayılan yapma.**

### Belirtilmemişse Sormanız ZORUNLUDUR:

| Yön | Sor | Neden |
|------|-----|-----|
| **Platform** | "iOS, Android veya her ikisi mi?" | HER tasarım kararını etkiler |
| **Framework** | "React Native, Flutter veya native mi?" | Desenleri ve araçları belirler |
| **Navigasyon** | "Tab bar, çekmece (drawer) veya yığın (stack) tabanlı mı?" | Temel UX kararı |
| **Durum (State)** | "Hangi durum yönetimi? (Zustand/Redux/Riverpod/BLoC?)" | Mimari temeli |
| **Çevrimdışı** | "Bunun çevrimdışı çalışması gerekiyor mu?" | Veri stratejisini etkiler |
| **Hedef cihazlar** | "Sadece telefon mu, yoksa tablet desteği var mı?" | Düzen karmaşıklığı |

### ⛔ AI MOBİL ANTİ-DESENLERİ (YASAK LİSTESİ)

> 🚫 **Bunlar kaçınılması GEREKEN AI varsayılan eğilimleridir!**

#### Performans Günahları

| ❌ ASLA YAPMA | Neden Yanlış | ✅ HER ZAMAN YAP |
|-------------|----------------|--------------|
| **Uzun listeler için ScrollView** | TÜM öğeleri render eder, bellek patlar | `FlatList` / `FlashList` / `ListView.builder` kullan |
| **Satır içi renderItem fonksiyonu** | Her renderda yeni fonksiyon, tüm öğeler yeniden render edilir | `useCallback` + `React.memo` |
| **keyExtractor eksik** | İndeks tabanlı anahtarlar yeniden sıralamada hatalara neden olur | Veriden benzersiz, kararlı ID |
| **getItemLayout'u atla** | Asenkron düzen = titrek kaydırma | Öğelerin sabit yüksekliği varsa sağla |
| **Her yerde setState()** | Gereksiz widget yeniden inşası | Hedefli durum, `const` yapıcılar |
| **Native driver: false** | JS iş parçacığı tarafından engellenen animasyonlar | Her zaman `useNativeDriver: true` |
| **Üretimde console.log** | JS iş parçacığını ciddi şekilde engeller | Sürüm derlemesinden önce kaldır |
| **React.memo/const atla** | Herhangi bir değişiklikte her öğe yeniden render edilir | Liste öğelerini HER ZAMAN önbelleğe al (memoize) |

#### Dokunmatik/UX Günahları

| ❌ ASLA YAPMA | Neden Yanlış | ✅ HER ZAMAN YAP |
|-------------|----------------|--------------|
| **Dokunma hedefi < 44px** | İsabetli dokunmak imkansız, sinir bozucu | Minimum 44pt (iOS) / 48dp (Android) |
| **Hedefler arası boşluk < 8px** | Komşulara yanlışlıkla dokunma | Minimum 8-12px boşluk |
| **Sadece jest etkileşimleri** | Motor engelli kullanıcılar dışlanır | Her zaman buton alternatifi sağla |
| **Yükleme durumu yok** | Kullanıcı uygulamanın çöktüğünü düşünür | HER ZAMAN yükleme geri bildirimi göster |
| **Hata durumu yok** | Kullanıcı sıkışır, kurtarma yolu yok | Yeniden deneme seçeneği ile hata göster |
| **Çevrimdışı işleme yok** | Ağ kesildiğinde çökme/bloklama | Zarif bozulma (graceful degradation), önbelleğe alınmış veri |
| **Platform kurallarını görmezden gel** | Kullanıcıların kafası karışır, kas hafızası bozulur | iOS iOS gibi hissettirir, Android Android gibi |

#### Güvenlik Günahları

| ❌ ASLA YAPMA | Neden Yanlış | ✅ HER ZAMAN YAP |
|-------------|----------------|--------------|
| **AsyncStorage'da Token** | Kolayca erişilebilir, rootlu cihazda çalınır | `SecureStore` / `Keychain` / `EncryptedSharedPreferences` |
| **API anahtarlarını sabit kodla** | APK/IPA'dan tersine mühendislikle alınır | Ortam değişkenleri, güvenli depolama |
| **SSL sabitlemeyi (pinning) atla** | MITM saldırıları mümkün | Üretimde sertifikaları sabitle |
| **Hassas verileri logla** | Loglar çıkartılabilir | Tokenları, şifreleri, PII'yı asla loglama |

#### Mimari Günahları

| ❌ ASLA YAPMA | Neden Yanlış | ✅ HER ZAMAN YAP |
|-------------|----------------|--------------|
| **UI içinde iş mantığı** | Test edilemez, bakımı yapılamaz | Servis katmanı ayrımı |
| **Her şey için global durum** | Gereksiz yeniden renderlar, karmaşıklık | Varsayılan yerel durum, gerektiğinde yukarı taşı |
| **Sonradan düşünülen derin bağlantı** | Bildirimler, paylaşımlar bozuk | Derin bağlantıları ilk günden planla |
| **dispose/cleanup atla** | Bellek sızıntıları, zombi dinleyiciler | Abonelikleri, zamanlayıcıları temizle |

---

## 📱 Platform Karar Matrisi

### Ne Zaman Birleştirilmeli vs Ayrışmalı

```
                    BİRLEŞTİR (ikisinde de aynı)          AYRIŞ (platforma özgü)
                    ───────────────────                   ──────────────────────────
İş Mantığı          ✅ Her Zaman                          -
Veri Katmanı        ✅ Her Zaman                          -
Çekirdek Özellikler ✅ Her Zaman                          -
                    
Navigasyon          -                                     ✅ iOS: kenar kaydırma, Android: geri butonu
Jestler             -                                     ✅ Platforma özgü his
İkonlar             -                                     ✅ SF Symbols vs Material Icons
Tarih Seçiciler     -                                     ✅ Yerel seçiciler doğru hissettirir
Modallar/Sayfalar   -                                     ✅ iOS: bottom sheet vs Android: dialog
Tipografi           -                                     ✅ SF Pro vs Roboto (veya özel)
Hata Diyalogları    -                                     ✅ Uyarılar için platform kuralları
```

### Hızlı Referans: Platform Varsayılanları

| Öğe | iOS | Android |
|-----|-----|---------|
| **Birincil Font** | SF Pro / SF Compact | Roboto |
| **Min Dokunma Hedefi** | 44pt × 44pt | 48dp × 48dp |
| **Geri Navigasyon** | Kenar sola kaydırma | Sistem geri butonu/jesti |
| **Alt Sekme İkonları** | SF Symbols | Material Symbols |
| **Eylem Sayfası** | Alttan UIActionSheet | Bottom Sheet / Dialog |
| **İlerleme** | Spinner | Doğrusal ilerleme (Material) |
| **Yenilemek için Çek** | Yerel UIRefreshControl | SwipeRefreshLayout |

---

## 🧠 Mobil UX Psikolojisi (Hızlı Referans)

### Dokunmatik için Fitts Yasası

```
Masaüstü: İmleç hassastır (1px)
Mobil:  Parmak hassas değildir (~7mm temas alanı)

→ Dokunma hedefleri minimum 44-48px OLMALIDIR
→ Önemli eylemler BAŞPARMAK BÖLGESİNDE (ekranın altı)
→ Yıkıcı eylemler kolay erişimden UZAKTA
```

### Başparmak Bölgesi (Tek Elle Kullanım)

```
┌─────────────────────────────┐
│    ERİŞİLMESİ ZOR           │ ← Navigasyon, menü, geri
│       (uzanma)              │
├─────────────────────────────┤
│     ERİŞİLMESİ OK           │ ← İkincil eylemler
│       (doğal)               │
├─────────────────────────────┤
│    ERİŞİLMESİ KOLAY         │ ← BİRİNCİL CTA'lar, sekme çubuğu
│ (başparmağın doğal yayı)    │ ← Ana içerik etkileşimi
└─────────────────────────────┘
        [  ANA EKRAN  ]
```

### Mobile Özgü Bilişsel Yük

| Masaüstü | Mobil Farkı |
|---------|-------------------|
| Çoklu pencereler | Tek seferde TEK görev |
| Klavye kısayolları | Dokunmatik jestler |
| Hover durumları | Hover YOK (dokun veya hiç) |
| Geniş görüntüleme alanı | Sınırlı alan, dikey kaydırma |
| İstikrarlı dikkat | Sürekli kesintiye uğrar |

Derinlemesine inceleme için: [touch-psychology.md](touch-psychology.md)

---

## ⚡ Performans Prensipleri (Hızlı Referans)

### React Native Kritik Kuralları

```typescript
// ✅ DOĞRU: Memoize edilmiş renderItem + React.memo sarmalayıcı
const ListItem = React.memo(({ item }: { item: Item }) => (
  <View style={styles.item}>
    <Text>{item.title}</Text>
  </View>
));

const renderItem = useCallback(
  ({ item }: { item: Item }) => <ListItem item={item} />,
  []
);

// ✅ DOĞRU: Tüm optimizasyonlarla FlatList
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}  // Kararlı ID, indeks DEĞİL
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### Flutter Kritik Kuralları

```dart
// ✅ DOĞRU: const yapıcılar yeniden inşaları önler
class MyWidget extends StatelessWidget {
  const MyWidget({super.key}); // CONST!

  @override
  Widget build(BuildContext context) {
    return const Column( // CONST!
      children: [
        Text('Static content'),
        MyConstantWidget(),
      ],
    );
  }
}

// ✅ DOĞRU: ValueListenableBuilder ile hedeflenmiş durum
ValueListenableBuilder<int>(
  valueListenable: counter,
  builder: (context, value, child) => Text('$value'),
  child: const ExpensiveWidget(), // Yeniden inşa edilmez!
)
```

### Animasyon Performansı

```
GPU-hızlandırmalı (HIZLI):  CPU-sınırlı (YAVAŞ):
├── transform               ├── width, height
├── opacity                 ├── top, left, right, bottom
└── (SADECE bunları kullan) ├── margin, padding
                            └── (bunları canlandırmaktan KAÇIN)
```

Tam kılavuz için: [mobile-performance.md](mobile-performance.md)

---

## 📝 KONTROL NOKTASI (Herhangi Bir Mobil Çalışmadan Önce ZORUNLU)

> **HERHANGİ bir mobil kod yazmadan önce, bu kontrol noktasını tamamlamanız GEREKİR:**

```
🧠 KONTROL NOKTASI:

Platform:   [ iOS / Android / Her İkisi ]
Framework:  [ React Native / Flutter / SwiftUI / Kotlin ]
Okunan Dosyalar: [ Okuduğunuz yetenek dosyalarını listeleyin ]

Uygulayacağım 3 Prensip:
1. _______________
2. _______________
3. _______________

Kaçınacağım Anti-Desenler:
1. _______________
2. _______________
```

**Örnek:**
```
🧠 KONTROL NOKTASI:

Platform:   iOS + Android (Çapraz platform)
Framework:  React Native + Expo
Okunan Dosyalar: touch-psychology.md, mobile-performance.md, platform-ios.md, platform-android.md

Uygulayacağım 3 Prensip:
1. Tüm listeler için React.memo + useCallback ile FlatList
2. 48px dokunma hedefleri, birincil CTA'lar için başparmak bölgesi
3. Platforma özgü navigasyon (kenar kaydırma iOS, geri butonu Android)

Kaçınacağım Anti-Desenler:
1. Listeler için ScrollView → FlatList
2. Satır içi renderItem → Memoize edilmiş
3. Tokenlar için AsyncStorage → SecureStore
```

> 🔴 **Kontrol noktasını dolduramıyor musunuz? → GERİ DÖNÜN VE YETENEK DOSYALARINI OKUYUN.**

---

## 🔧 Framework Karar Ağacı

```
NE İNŞA EDİYORSUNUZ?
        │
        ├── OTA güncellemelerine + hızlı iterasyona + web ekibine ihtiyaç var
        │   └── ✅ React Native + Expo
        │
        ├── Piksel piksel özel UI + performans kritik
        │   └── ✅ Flutter
        │
        ├── Derin native özellikler + tek platform odağı
        │   ├── Sadece iOS → SwiftUI
        │   └── Sadece Android → Kotlin + Jetpack Compose
        │
        ├── Mevcut RN kod tabanı + yeni özellikler
        │   └── ✅ React Native (bare workflow)
        │
        └── Kurumsal + mevcut Flutter kod tabanı
            └── ✅ Flutter
```

Tam karar ağaçları için: [decision-trees.md](decision-trees.md)

---

## 📋 Geliştirme Öncesi Kontrol Listesi

### HERHANGİ BİR Mobil Projeye Başlamadan Önce

- [ ] **Platform onaylandı mı?** (iOS / Android / Her İkisi)
- [ ] **Framework seçildi mi?** (RN / Flutter / Native)
- [ ] **Navigasyon desenine karar verildi mi?** (Tabs / Yığın / Çekmece)
- [ ] **Durum yönetimi seçildi mi?** (Zustand / Redux / Riverpod / BLoC)
- [ ] **Çevrimdışı gereksinimler biliniyor mu?**
- [ ] **Derin bağlantı ilk günden planlandı mı?**
- [ ] **Hedef cihazlar tanımlandı mı?** (Telefon / Tablet / Her İkisi)

### Her Ekrandan Önce

- [ ] **Dokunma hedefleri ≥ 44-48px mi?**
- [ ] **Birincil CTA başparmak bölgesinde mi?**
- [ ] **Yükleme durumu var mı?**
- [ ] **Yeniden denemeli hata durumu var mı?**
- [ ] **Çevrimdışı işleme düşünüldü mü?**
- [ ] **Platform kurallarına uyuldu mu?**

### Yayından Önce

- [ ] **console.log kaldırıldı mı?**
- [ ] **Hassas veriler için SecureStore mu?**
- [ ] **SSL sabitleme etkin mi?**
- [ ] **Listeler optimize edildi mi (memo, keyExtractor)?**
- [ ] **Unmount işleminde bellek temizliği?**
- [ ] **Düşük özellikli cihazlarda test edildi mi?**
- [ ] **Tüm etkileşimli öğeler üzerinde erişilebilirlik etiketleri?**

---

## 📚 Referans Dosyalar

Belirli alanlarda daha derin rehberlik için:

| Dosya | Ne Zaman Kullanılır |
|------|-------------|
| [mobile-design-thinking.md](mobile-design-thinking.md) | **İLK! Ezber karşıtı, bağlam tabanlı düşünmeye zorlar** |
| [touch-psychology.md](touch-psychology.md) | Dokunmatik etkileşimi, Fitts Yasasını, jest tasarımını anlama |
| [mobile-performance.md](mobile-performance.md) | RN/Flutter optimizasyonu, 60fps, bellek/pil |
| [platform-ios.md](platform-ios.md) | iOS'a özgü tasarım, HIG uyumluluğu |
| [platform-android.md](platform-android.md) | Android'e özgü tasarım, Material Design 3 |
| [mobile-navigation.md](mobile-navigation.md) | Navigasyon desenleri, derin bağlantı |
| [mobile-typography.md](mobile-typography.md) | Tip ölçeği, sistem fontları, erişilebilirlik |
| [mobile-color-system.md](mobile-color-system.md) | OLED optimizasyonu, koyu mod, pil |
| [decision-trees.md](decision-trees.md) | Framework, durum, depolama kararları |

---

> **Unutmayın:** Mobil kullanıcılar sabırsızdır, kesintiye uğrar ve küçük ekranlarda hassas olmayan parmaklar kullanırlar. EN KÖTÜ koşullar için tasarlayın: kötü ağ, tek el, parlak güneş, düşük pil. Orada çalışıyorsa, her yerde çalışır.
