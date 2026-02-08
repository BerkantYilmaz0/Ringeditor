# Mobil Performans Referansı

> React Native ve Flutter performans optimizasyonu, 60fps animasyonlar, bellek yönetimi ve pil hususlarına derinlemesine bakış.
> **Bu dosya, AI tarafından oluşturulan kodun BAŞARISIZ olduğu 1 numaralı alanı kapsar.**

---

## 1. Mobil Performans Zihniyeti

### Mobil Performans Neden Farklıdır

```
MASAÜSTÜ:                          MOBİL:
├── Sınırsız güç                  ├── Pil önemlidir
├── Bol RAM                       ├── RAM paylaşılır, sınırlıdır
├── Kararlı ağ                    ├── Ağ güvenilmezdir
├── CPU her zaman kullanılabilir  ├── Isındığında CPU yavaşlar
└── Kullanıcı zaten hızlı bekler  └── Kullanıcı ANINDA bekler
```

### Performans Bütçesi Kavramı

```
Her kare şu sürede tamamlanmalıdır:
├── 60fps → kare başına 16.67ms
├── 120fps (ProMotion) → kare başına 8.33ms

Kodunuz daha uzun sürerse:
├── Kare düşmeleri → Sarsıntılı kaydırma/animasyon
├── Kullanıcı "yavaş" veya "bozuk" olarak algılar
└── Uygulamanızı KESİNLİKLE kaldırırlar
```

---

## 2. React Native Performansı

### 🚫 1 Numaralı AI Hatası: Listeler için ScrollView

```javascript
// ❌ BUNU ASLA YAPMAYIN - AI'ın favori hatası
<ScrollView>
  {items.map(item => (
    <ItemComponent key={item.id} item={item} />
  ))}
</ScrollView>

// Neden felaket:
// ├── TÜM öğeleri hemen render eder (1000 öğe = 1000 render)
// ├── Bellek patlar
// ├── İlk render saniyeler sürer
// └── Kaydırma sarsıntılı olur

// ✅ HER ZAMAN FlatList KULLANIN
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
/>
```

### FlatList Optimizasyon Kontrol Listesi

```javascript
// ✅ DOĞRU: Tüm optimizasyonlar uygulandı

// 1. Öğe bileşenini memoize et
const ListItem = React.memo(({ item }: { item: Item }) => {
  return (
    <Pressable style={styles.item}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});

// 2. renderItem'ı useCallback ile memoize et
const renderItem = useCallback(
  ({ item }: { item: Item }) => <ListItem item={item} />,
  [] // Boş bağımlılıklar = asla yeniden oluşturulmaz
);

// 3. Kararlı keyExtractor (ASLA index kullanmayın!)
const keyExtractor = useCallback((item: Item) => item.id, []);

// 4. Sabit yükseklikteki öğeler için getItemLayout sağlayın
const getItemLayout = useCallback(
  (data: Item[] | null, index: number) => ({
    length: ITEM_HEIGHT, // Sabit yükseklik
    offset: ITEM_HEIGHT * index,
    index,
  }),
  []
);

// 5. FlatList'e uygula
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  getItemLayout={getItemLayout}
  // Performans propları
  removeClippedSubviews={true} // Android: ekran dışını ayır
  maxToRenderPerBatch={10} // Parti başına öğe (batch)
  windowSize={5} // Render penceresi (5 = her iki yanda 2 ekran)
  initialNumToRender={10} // Başlangıç öğeleri
  updateCellsBatchingPeriod={50} // Toplu işlem gecikmesi
/>
```

### Her Optimizasyon Neden Önemli

| Optimizasyon | Neyi Önler | Etki |
|--------------|------------------|--------|
| `React.memo` | Ebeveyn değişikliğinde yeniden render | 🔴 Kritik |
| `useCallback renderItem` | Her renderda yeni fonksiyon | 🔴 Kritik |
| Kararlı `keyExtractor` | Yanlış öğe geri dönüşümü | 🔴 Kritik |
| `getItemLayout` | Asenkron düzen hesaplaması | 🟡 Yüksek |
| `removeClippedSubviews` | Ekran dışı bellek | 🟡 Yüksek |
| `maxToRenderPerBatch` | Ana iş parçacığını engelleme | 🟢 Orta |
| `windowSize` | Bellek kullanımı | 🟢 Orta |

### FlashList: Daha İyi Seçenek

```javascript
// Daha iyi performans için FlashList'i düşünün
import { FlashList } from "@shopify/flash-list";

<FlashList
  data={items}
  renderItem={renderItem}
  estimatedItemSize={ITEM_HEIGHT}
  keyExtractor={keyExtractor}
/>

// FlatList'e göre faydaları:
// ├── Daha hızlı geri dönüşüm
// ├── Daha iyi bellek yönetimi
// ├── Daha basit API
// └── Daha az optimizasyon propu gerekir
```

### Animasyon Performansı

```javascript
// ❌ JS güdümlü animasyon (JS iş parçacığını bloklar)
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: false, // KÖTÜ!
}).start();

// ✅ Native-driver animasyonu (UI iş parçacığında çalışır)
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true, // İYİ!
}).start();

// Native driver SADECE şunları destekler:
// ├── transform (translate, scale, rotate)
// └── opacity
// 
// Şunları DESTEKLEMEZ:
// ├── width, height
// ├── backgroundColor
// ├── borderRadius değişiklikleri
// └── margin, padding
```

### Karmaşık Animasyonlar İçin Reanimated

```javascript
// Native driver'ın işleyemediği animasyonlar için Reanimated 3 kullanın

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Component = () => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(offset.value) }],
  }));

  return <Animated.View style={animatedStyles} />;
};

// Faydaları:
// ├── UI iş parçacığında çalışır (60fps garantili)
// ├── Herhangi bir özelliği canlandırabilir
// ├── Jest güdümlü animasyonlar
// └── Karmaşık mantık için workletler
```

### Bellek Sızıntısı Önleme

```javascript
// ❌ Bellek sızıntısı: temizlenmemiş aralık
useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 5000);
  // Temizlik eksik!
}, []);

// ✅ Düzgün temizlik
useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 5000);
  
  return () => clearInterval(interval); // TEMİZLİK!
}, []);

// Yaygın bellek sızıntısı kaynakları:
// ├── Zamanlayıcılar (setInterval, setTimeout)
// ├── Olay dinleyicileri (Event listeners)
// ├── Abonelikler (WebSocket, PubSub)
// ├── Unmount sonrası durumu güncelleyen asenkron işlemler
// └── Sınırsız resim önbellekleme
```

### React Native Performans Kontrol Listesi

```markdown
## Her Listeden Önce
- [ ] FlatList veya FlashList kullanılıyor (ScrollView DEĞİL)
- [ ] renderItem useCallback ile memoize edildi
- [ ] Liste öğeleri React.memo ile sarmalandı
- [ ] keyExtractor kararlı ID kullanıyor (index DEĞİL)
- [ ] getItemLayout sağlandı (sabit yükseklik ise)

## Her Animasyondan Önce
- [ ] useNativeDriver: true (mümkünse)
- [ ] Karmaşık animasyonlar için Reanimated kullanılıyor
- [ ] Sadece transform/opacity canlandırılıyor
- [ ] Düşük seviye Android cihazda test edildi

## Her Yayından Önce
- [ ] console.log ifadeleri kaldırıldı
- [ ] Tüm useEffect'lerde temizlik fonksiyonları
- [ ] Bellek sızıntısı yok (profiler ile test et)
- [ ] Release build'de test edildi (dev değil)
```

---

## 3. Flutter Performansı

### 🚫 1 Numaralı AI Hatası: setState Aşırı Kullanımı

```dart
// ❌ YANLIŞ: setState TÜM widget ağacını yeniden kurar
class BadCounter extends StatefulWidget {
  @override
  State<BadCounter> createState() => _BadCounterState();
}

class _BadCounterState extends State<BadCounter> {
  int _counter = 0;
  
  void _increment() {
    setState(() {
      _counter++; // Bu altındaki HER ŞEYİ yeniden kurar!
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Counter: $_counter'),
        ExpensiveWidget(), // Gereksiz yere yeniden kurulur!
        AnotherExpensiveWidget(), // Gereksiz yere yeniden kurulur!
      ],
    );
  }
}
```

### `const` Constructor Devrimi

```dart
// ✅ DOĞRU: const yeniden kurulumları önler

class GoodCounter extends StatefulWidget {
  const GoodCounter({super.key}); // CONST constructor!
  
  @override
  State<GoodCounter> createState() => _GoodCounterState();
}

class _GoodCounterState extends State<GoodCounter> {
  int _counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Counter: $_counter'),
        const ExpensiveWidget(), // Yeniden kurulmaz!
        const AnotherExpensiveWidget(), // Yeniden kurulmaz!
      ],
    );
  }
}

// KURAL: Duruma bağlı olmayan HER widget'a `const` ekleyin
```

### Hedefli Durum Yönetimi

```dart
// ❌ setState tüm ağacı yeniden kurar
setState(() => _value = newValue);

// ✅ ValueListenableBuilder: cerrahi yeniden kurulumlar
class TargetedState extends StatelessWidget {
  final ValueNotifier<int> counter = ValueNotifier(0);
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Sadece bu sayaç değiştiğinde yeniden kurulur
        ValueListenableBuilder<int>(
          valueListenable: counter,
          builder: (context, value, child) => Text('$value'),
          child: const Icon(Icons.star), // Yeniden kurulmaz!
        ),
        const ExpensiveWidget(), // Asla yeniden kurulmaz
      ],
    );
  }
}
```

### Riverpod/Provider En İyi Uygulamaları

```dart
// ❌ YANLIŞ: Tüm provider'ı build içinde okumak
Widget build(BuildContext context) {
  final state = ref.watch(myProvider); // HERHANGİ bir değişiklikte yeniden kurar
  return Text(state.name);
}

// ✅ DOĞRU: Sadece ihtiyacınız olanı seçin
Widget build(BuildContext context) {
  final name = ref.watch(myProvider.select((s) => s.name));
  return Text(name); // Sadece isim değiştiğinde yeniden kurar
}
```

### ListView Optimizasyonu

```dart
// ❌ YANLIŞ: builder olmayan ListView (hepsini render eder)
ListView(
  children: items.map((item) => ItemWidget(item)).toList(),
)

// ✅ DOĞRU: ListView.builder (tembel renderlama - lazy)
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(items[index]),
  // Ek optimizasyonlar:
  itemExtent: 56, // Sabit yükseklik = daha hızlı yerleşim
  cacheExtent: 100, // Ön render mesafesi
)

// ✅ DAHA DA İYİSİ: Ayırıcılar için ListView.separated
ListView.separated(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(items[index]),
  separatorBuilder: (context, index) => const Divider(),
)
```

### Resim Optimizasyonu

```dart
// ❌ YANLIŞ: Önbellekleme yok, tam çözünürlük
Image.network(url)

// ✅ DOĞRU: Uygun boyutlandırma ile önbelleğe alınmış
CachedNetworkImage(
  imageUrl: url,
  width: 100,
  height: 100,
  fit: BoxFit.cover,
  memCacheWidth: 200, // Retina için 2x önbellek
  memCacheHeight: 200,
  placeholder: (context, url) => const Skeleton(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
)
```

### Dispose Deseni

```dart
class MyWidget extends StatefulWidget {
  @override
  State<MyWidget> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  late final StreamSubscription _subscription;
  late final AnimationController _controller;
  late final TextEditingController _textController;
  
  @override
  void initState() {
    super.initState();
    _subscription = stream.listen((_) {});
    _controller = AnimationController(vsync: this);
    _textController = TextEditingController();
  }
  
  @override
  void dispose() {
    // HER ZAMAN oluşturma sırasının tersine dispose edin
    _textController.dispose();
    _controller.dispose();
    _subscription.cancel();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) => Container();
}
```

### Flutter Performans Kontrol Listesi

```markdown
## Her Widget'tan Önce
- [ ] const constructor eklendi (runtime argümanı yoksa)
- [ ] Statik çocuklara const anahtar kelimeleri
- [ ] Minimal setState kapsamı
- [ ] Provider izlemeleri için selector kullanılıyor

## Her Listeden Önce
- [ ] ListView.builder kullanılıyor (çocuklu ListView DEĞİL)
- [ ] itemExtent sağlandı (sabit yükseklik ise)
- [ ] Boyut sınırları ile resim önbellekleme

## Her Animasyondan Önce
- [ ] Impeller kullanılıyor (Flutter 3.16+)
- [ ] Opacity widget'ından kaçınılıyor (FadeTransition kullanın)
- [ ] AnimationController için TickerProviderStateMixin

## Her Yayından Önce
- [ ] Tüm dispose() yöntemleri uygulandı
- [ ] Üretimde print() yok
- [ ] Profil/release modunda test edildi
- [ ] DevTools performans katmanı kontrol edildi
```

---

## 4. Animasyon Performansı (Her İki Platform)

### 60fps Zorunluluğu

```
İnsan gözü şunları algılar:
├── < 24 fps → "Slayt gösterisi" (bozuk)
├── 24-30 fps → "Kesik kesik" (rahatsız edici)
├── 30-45 fps → "Belirgin şekilde pürüzsüz değil"
├── 45-60 fps → "Pürüzsüz" (hedef)
├── 60 fps → "Yağ gibi" (hedef)
└── 120 fps → "Premium" (ProMotion cihazlar)

ASLA < 60fps animasyon yayınlamayın.
```

### GPU vs CPU Animasyonu

```
GPU-HIZLANDIRMALI (HIZLI):       CPU-BAĞLI (YAVAŞ):
├── transform: translate          ├── width, height
├── transform: scale              ├── top, left, right, bottom
├── transform: rotate             ├── margin, padding
├── opacity                       ├── border-radius (animasyonlu)
└── (Composited, ana dışı)        └── box-shadow (animasyonlu)

KURAL: Sadece transform ve opacity'yi canlandırın.
Diğer her şey düzen yeniden hesaplamasına neden olur.
```

---

## 5. Bellek Yönetimi

### Yaygın Bellek Sızıntıları

| Kaynak | Platform | Çözüm |
|--------|----------|----------|
| Zamanlayıcılar | Her İkisi | Cleanup/dispose içinde temizle |
| Olay dinleyicileri | Her İkisi | Cleanup/dispose içinde kaldır |
| Abonelikler | Her İkisi | Cleanup/dispose içinde iptal et |
| Büyük resimler | Her İkisi | Önbelleği sınırla, yeniden boyutlandır |
| Unmount sonrası asenkron | RN | isMounted kontrolü veya AbortController |
| Animasyon denetleyicileri | Flutter | Denetleyicileri dispose et |

---

## 6. Pil Optimizasyonu

### Pil Tüketim Kaynakları

| Kaynak | Etki | Azaltma |
|--------|--------|------------|
| **Ekran açık** | 🔴 En Yüksek | OLED'de koyu mod |
| **Sürekli GPS** | 🔴 Çok yüksek | Önemli değişikliği kullan |
| **Ağ istekleri** | 🟡 Yüksek | Toplu işlem, agresif önbellekleme |
| **Animasyonlar** | 🟡 Orta | Düşük pilde azalt |
| **Arka plan işi** | 🟡 Orta | Kritik olmayanı ertele |
| **CPU hesaplama** | 🟢 Daha Düşük | Backend'e yükle |

---

## 7. Ağ Performansı

### Offline-First Mimari

```
                    ┌──────────────┐
                    │     UI       │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   Önbellek   │ ← ÖNCE önbellekten oku
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │      Ağ      │ ← Önbelleği ağdan güncelle
                    └──────────────┘

Faydaları:
├── Anında UI (önbelleğe alınmış veri için yükleme çarkı yok)
├── Çevrimdışı çalışır
├── Veri kullanımını azaltır
└── Yavaş ağlarda daha iyi UX
```

### İstek Optimizasyonu

```
TOPLU İŞLEM (BATCH): Birden fazla isteği bire birleştirin
├── 10 küçük istek → 1 toplu istek
├── Bağlantı yükünü azaltır
└── Pil için daha iyidir (radyo bir kez açılır)

ÖNBELLEK (CACHE): Değişmemiş veriyi yeniden getirmeyin
├── ETag/If-None-Match başlıkları
├── Cache-Control başlıkları
└── Stale-while-revalidate deseni

SIKIŞTIR (COMPRESS): Yük boyutunu azaltın
├── gzip/brotli sıkıştırma
├── Sadece gerekli alanları isteyin (GraphQL)
└── Büyük listeleri sayfalandırın
```

---

## 8. Performans Testi

### Neyi Test Etmeli

| Metrik | Hedef | Araç |
|--------|--------|------|
| **Kare hızı (Frame rate)** | ≥ 60fps | Performans katmanı |
| **Bellek** | Kararlı, büyüme yok | Profiler |
| **Soğuk başlangıç** | < 2s | Manuel zamanlama |
| **TTI (Etkileşim Süresi)** | < 3s | Lighthouse |
| **Liste kaydırma** | Sarsıntı yok | Manuel his |
| **Animasyon akıcılığı** | Düşme yok | Performans monitörü |

### Gerçek Cihazlarda Test Edin

```
⚠️ ASLA sadece şunlara güvenmeyin:
├── Simülatör/emülatör (gerçekten daha hızlı)
├── Dev modu (release'den daha yavaş)
├── Sadece üst düzey cihazlar

✅ HER ZAMAN şunlarda test edin:
├── Düşük seviye Android (< $200 telefon)
├── Eski iOS cihazı (iPhone 8 veya SE)
├── Release/profile yapısı
└── Gerçek verilerle (10 öğe değil)
```

---

## 9. Hızlı Referans Kartı

### React Native Temelleri

```javascript
// Liste: Her zaman kullan
<FlatList
  data={data}
  renderItem={useCallback(({item}) => <MemoItem item={item} />, [])}
  keyExtractor={useCallback(item => item.id, [])}
  getItemLayout={useCallback((_, i) => ({length: H, offset: H*i, index: i}), [])}
/>

// Animasyon: Her zaman native
useNativeDriver: true

// Temizlik: Her zaman mevcut
useEffect(() => {
  return () => cleanup();
}, []);
```

### Flutter Temelleri

```dart
// Widgetlar: Her zaman const
const MyWidget()

// Listeler: Her zaman builder
ListView.builder(itemBuilder: ...)

// Durum: Her zaman hedefli
ValueListenableBuilder() veya ref.watch(provider.select(...))

// Dispose: Her zaman temizlik
@override
void dispose() {
  controller.dispose();
  super.dispose();
}
```

---

> **Unutmayın:** Performans optimizasyon değildir—temel kalitedir. Yavaş bir uygulama bozuk bir uygulamadır. Sahip olduğunuz en iyi cihazda değil, kullanıcılarınızın sahip olduğu en kötü cihazda test edin.
