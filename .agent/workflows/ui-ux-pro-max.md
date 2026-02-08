---
description: UI planlama ve uygulama
---

---
description: 50+ stil, 95+ renk paleti ve otomatik tasarım sistemi oluşturma ile AI destekli tasarım zekası
---

# ui-ux-pro-max

Web ve mobil uygulamalar için kapsamlı tasarım rehberi. 9 teknoloji yığınında 50+ stil, 97 renk paleti, 57 font eşleşmesi, 99 UX kılavuzu ve 25 grafik türü içerir. Öncelik tabanlı önerilere sahip aranabilir veritabanı.

## Ön Koşullar

Python'un yüklü olup olmadığını kontrol edin:

```bash
python3 --version || python --version
```

Python yüklü değilse, kullanıcının işletim sistemine göre yükleyin:

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

**Windows:**
```powershell
winget install Python.Python.3.12
```

---

## Bu İş Akışı Nasıl Kullanılır

Kullanıcı UI/UX çalışması (tasarım, inşa, oluşturma, uygulama, inceleme, düzeltme, iyileştirme) talep ettiğinde, bu iş akışını izleyin:

### Adım 1: Kullanıcı Gereksinimlerini Analiz Et

Kullanıcı isteğinden temel bilgileri çıkarın:
- **Ürün türü**: SaaS, e-ticaret, portföy, panel (dashboard), açılış sayfası, vb.
- **Stil anahtar kelimeleri**: minimal, oyuncu, profesyonel, zarif, karanlık mod, vb.
- **Endüstri**: sağlık, fintech, oyun, eğitim, vb.
- **Yığın (Stack)**: React, Vue, Next.js veya varsayılan `html-tailwind`

### Adım 2: Tasarım Sistemi Oluştur (ZORUNLU)

Gerekçeli kapsamlı öneriler almak için **her zaman `--design-system` ile başlayın**:

```bash
python3 .shared/ui-ux-pro-max/scripts/search.py "<ürün_türü> <endüstri> <anahtar_kelimeler>" --design-system [-p "Proje Adı"]
```

Bu komut:
1. 5 alanı paralel olarak arar (ürün, stil, renk, açılış sayfası, tipografi)
2. En iyi eşleşmeleri seçmek için `ui-reasoning.csv`'deki mantık kurallarını uygular
3. Tam tasarım sistemini döndürür: desen, stil, renkler, tipografi, efektler
4. Kaçınılması gereken anti-desenleri içerir

**Örnek:**
```bash
python3 .shared/ui-ux-pro-max/scripts/search.py "güzellik spa sağlık hizmeti" --design-system -p "Serenity Spa"
```

### Adım 2b: Tasarım Sistemini Kalıcı Hale Getir (Master + Overrides Deseni)

Tasarım sistemini oturumlar arasında hiyerarşik geri çağırma için kaydetmek üzere `--persist` ekleyin:

```bash
python3 .shared/ui-ux-pro-max/scripts/search.py "<sorgu>" --design-system --persist -p "Proje Adı"
```

Bu şunları oluşturur:
- `design-system/MASTER.md` — Tüm tasarım kuralları ile Küresel Hakikat Kaynağı
- `design-system/pages/` — Sayfaya özgü geçersiz kılmalar için klasör

**Sayfaya özgü geçersiz kılma ile:**
```bash
python3 .shared/ui-ux-pro-max/scripts/search.py "<sorgu>" --design-system --persist -p "Proje Adı" --page "dashboard"
```

Bu ayrıca şunu oluşturur:
- `design-system/pages/dashboard.md` — Master'dan sayfaya özgü sapmalar

**Hiyerarşik geri çağırma nasıl çalışır:**
1. Belirli bir sayfa oluştururken (ör. "Ödeme"), önce `design-system/pages/checkout.md` dosyasını kontrol edin
2. Sayfa dosyası varsa, kuralları Master dosyasını **geçersiz kılar**
3. Yoksa, sadece `design-system/MASTER.md` dosyasını kullanın

### Adım 3: Detaylı Aramalarla Destekleyin (gerekirse)

Tasarım sistemini aldıktan sonra, ek ayrıntılar almak için alan aramalarını kullanın:

```bash
python3 .shared/ui-ux-pro-max/scripts/search.py "<anahtar_kelime>" --domain <alan> [-n <maks_sonuc>]
```

**Detaylı aramalar ne zaman kullanılır:**

| İhtiyaç | Alan | Örnek |
|------|--------|---------|
| Daha fazla stil seçeneği | `style` | `--domain style "glassmorphism dark"` |
| Grafik önerileri | `chart` | `--domain chart "real-time dashboard"` |
| UX en iyi uygulamaları | `ux` | `--domain ux "animation accessibility"` |
| Alternatif fontlar | `typography` | `--domain typography "elegant luxury"` |
| Açılış sayfası yapısı | `landing` | `--domain landing "hero social-proof"` |

### Adım 4: Yığın Yönergeleri (Varsayılan: html-tailwind)

Uygulamaya özgü en iyi uygulamaları alın. Kullanıcı bir yığın belirtmezse, **`html-tailwind` varsayılanını kullanın**.

```bash
python3 .shared/ui-ux-pro-max/scripts/search.py "<anahtar_kelime>" --stack html-tailwind
```

Mevcut yığınlar: `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`

---

## Arama Referansı

### Mevcut Alanlar

| Alan | Şunun İçin Kullanın | Örnek Anahtar Kelimeler |
|--------|---------|------------------|
| `product` | Ürün türü önerileri | SaaS, e-ticaret, portföy, sağlık, güzellik, hizmet |
| `style` | UI stilleri, renkler, efektler | glassmorphism, minimalizm, karanlık mod, brutalizm |
| `typography` | Font eşleşmeleri, Google Fonts | zarif, oyuncu, profesyonel, modern |
| `color` | Ürün türüne göre renk paletleri | saas, ecommerce, healthcare, beauty, fintech, service |
| `landing` | Sayfa yapısı, CTA stratejileri | hero, hero-centric, testimonial, pricing, social-proof |
| `chart` | Grafik türleri, kütüphane önerileri | trend, comparison, timeline, funnel, pie |
| `ux` | En iyi uygulamalar, anti-desenler | animation, accessibility, z-index, loading |
| `react` | React/Next.js performansı | waterfall, bundle, suspense, memo, rerender, cache |
| `web` | Web arayüzü yönergeleri | aria, focus, keyboard, semantic, virtualize |
| `prompt` | AI istemleri, CSS anahtar kelimeleri | (stil adı) |

### Mevcut Yığınlar

| Yığın | Odak |
|-------|-------|
| `html-tailwind` | Tailwind yardımcı sınıfları, responsive, a11y (VARSAYILAN) |
| `react` | State, hook'lar, performans, desenler |
| `nextjs` | SSR, yönlendirme, görseller, API rotaları |
| `vue` | Composition API, Pinia, Vue Router |
| `svelte` | Runes, stores, SvelteKit |
| `swiftui` | Görünümler (Views), State, Navigasyon, Animasyon |
| `react-native` | Bileşenler, Navigasyon, Listeler |
| `flutter` | Widget'lar, State, Düzen (Layout), Tema |
| `shadcn` | shadcn/ui bileşenleri, tema, formlar, desenler |
| `jetpack-compose` | Composable'lar, Modifier'lar, State Hoisting, Recomposition |

---

## Örnek İş Akışı

**Kullanıcı isteği:** "Làm landing page cho dịch vụ chăm sóc da chuyên nghiệp" (Profesyonel cilt bakımı hizmeti için açılış sayfası yap)

### Adım 1: Gereksinimleri Analiz Et
- Ürün türü: Güzellik/Spa hizmeti
- Stil anahtar kelimeleri: zarif, profesyonel, yumuşak
- Endüstri: Güzellik/Sağlık
- Yığın: html-tailwind (varsayılan)

### Adım 2: Tasarım Sistemini Oluştur (ZORUNLU)

```bash
python3 .shared/ui-ux-pro-max/scripts/search.py "beauty spa wellness service elegant" --design-system -p "Serenity Spa"
```

**Çıktı:** Desen, stil, renkler, tipografi, efektler ve anti-desenler içeren tam tasarım sistemi.

### Adım 3: Detaylı Aramalarla Destekle (gerekirse)

```bash
# Animasyon ve erişilebilirlik için UX yönergelerini al
python3 .shared/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# Gerekirse alternatif tipografi seçeneklerini al
python3 .shared/ui-ux-pro-max/scripts/search.py "elegant luxury serif" --domain typography
```

### Adım 4: Yığın Yönergeleri

```bash
python3 .shared/ui-ux-pro-max/scripts/search.py "layout responsive form" --stack html-tailwind
```

**Sonra:** Tasarım sistemi + detaylı aramaları sentezleyin ve tasarımı uygulayın.

---

## Çıktı Formatları

`--design-system` bayrağı iki çıktı formatını destekler:

```bash
# ASCII kutusu (varsayılan) - terminal ekranı için en iyisi
python3 .shared/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system

# Markdown - dokümantasyon için en iyisi
python3 .shared/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system -f markdown
```

---

## Daha İyi Sonuçlar İçin İpuçları

1. **Anahtar kelimelerde spesifik olun** - "sağlık SaaS paneli" > "uygulama"
2. **Birden çok kez arayın** - Farklı anahtar kelimeler farklı içgörüler ortaya çıkarır
3. **Alanları birleştirin** - Stil + Tipografi + Renk = Tam tasarım sistemi
4. **Her zaman UX'i kontrol edin** - Yaygın sorunlar için "animasyon", "z-index", "erişilebilirlik" araması yapın
5. **Yığın bayrağını kullanın** - Uygulamaya özgü en iyi pratikleri alın
6. **Yineleyin** - İlk arama eşleşmezse, farklı anahtar kelimeler deneyin

---

## Profesyonel UI İçin Ortak Kurallar

Bunlar, UI'ın amatör görünmesine neden olan ve sıkça gözden kaçan sorunlardır:

### İkonlar & Görsel Öğeler

| Kural | Yap | Yapma |
|------|----|----- |
| **Emoji ikonu yok** | SVG ikonları kullan (Heroicons, Lucide, Simple Icons) | UI ikonu olarak 🎨 🚀 ⚙️ gibi emojiler kullanma |
| **Kararlı hover durumları** | Hover'da renk/opaklık geçişleri kullan | Düzeni kaydıran ölçek dönüşümleri kullanma |
| **Doğru marka logoları** | Simple Icons'dan resmi SVG'yi araştır | Tahmin etme veya yanlış logo yolları kullanma |
| **Tutarlı ikon boyutlandırma** | w-6 h-6 ile sabit viewBox (24x24) kullan | Farklı ikon boyutlarını rastgele karıştırma |

### Etkileşim & İmleç

| Kural | Yap | Yapma |
|------|----|----- |
| **İmleç işaretçisi** | Tüm tıklanabilir/üzerine gelinebilir kartlara `cursor-pointer` ekle | Etkileşimli öğelerde varsayılan imleci bırakma |
| **Hover geri bildirimi** | Görsel geri bildirim sağla (renk, gölge, kenarlık) | Öğenin etkileşimli olduğuna dair hiç belirti vermeme |
| **Yumuşak geçişler** | `transition-colors duration-200` kullan | Anlık durum değişiklikleri veya çok yavaş (>500ms) |

### Açık/Koyu Mod Kontrastı

| Kural | Yap | Yapma |
|------|----|----- |
| **Cam kart açık mod** | `bg-white/80` veya daha yüksek opaklık kullan | `bg-white/10` kullanma (çok şeffaf) |
| **Metin kontrastı açık** | Metin için `#0F172A` (slate-900) kullan | Gövde metni için `#94A3B8` (slate-400) kullanma |
| **Sönük metin açık** | Minimum `#475569` (slate-600) kullan | gray-400 veya daha açığını kullanma |
| **Kenarlık görünürlüğü** | Açık modda `border-gray-200` kullan | `border-white/10` kullanma (görünmez) |

### Düzen & Boşluklar

| Kural | Yap | Yapma |
|------|----|----- |
| **Yüzen navigasyon çubuğu** | `top-4 left-4 right-4` boşluğu ekle | Navigasyon çubuğunu `top-0 left-0 right-0`a yapıştırma |
| **İçerik dolgusu** | Sabit navigasyon çubuğu yüksekliğini hesaba kat | İçeriğin sabit öğelerin arkasında saklanmasına izin verme |
| **Tutarlı maks-genişlik** | Aynı `max-w-6xl` veya `max-w-7xl` kullan | Farklı kapsayıcı genişliklerini karıştırma |

---

## Teslim Öncesi Kontrol Listesi

UI kodunu teslim etmeden önce şu maddeleri doğrulayın:

### Görsel Kalite
- [ ] İkon olarak emoji kullanılmamış (yerine SVG kullanın)
- [ ] Tüm ikonlar tutarlı ikon setinden (Heroicons/Lucide)
- [ ] Marka logoları doğru (Simple Icons'dan doğrulanmış)
- [ ] Hover durumları düzen kaymasına neden olmuyor
- [ ] Tema renkleri var() sarmalayıcısı olmadan doğrudan kullanılmış (bg-primary)

### Etkileşim
- [ ] Tüm tıklanabilir öğelerde `cursor-pointer` var
- [ ] Hover durumları net görsel geri bildirim sağlıyor
- [ ] Geçişler yumuşak (150-300ms)
- [ ] Odak durumları klavye navigasyonu için görünür

### Açık/Koyu Mod
- [ ] Açık mod metni yeterli kontrasta sahip (minimum 4.5:1)
- [ ] Cam/şeffaf öğeler açık modda görünür
- [ ] Kenarlıklar her iki modda da görünür
- [ ] Teslimden önce her iki modu da test edin

### Düzen
- [ ] Yüzen öğelerin kenarlardan uygun boşluğu var
- [ ] Sabit navigasyon çubuklarının arkasında içerik gizli değil
- [ ] 375px, 768px, 1024px, 1440px'de responsive
- [ ] Mobilde yatay kaydırma yok

### Erişilebilirlik
- [ ] Tüm görsellerde alt metni var
- [ ] Form girdilerinin etiketleri var
- [ ] Renk tek gösterge değil
- [ ] `prefers-reduced-motion`a saygı duyuluyor