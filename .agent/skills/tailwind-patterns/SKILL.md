---
name: tailwind-patterns
description: Tailwind CSS v4 principles. CSS-first configuration, container queries, modern patterns, design token architecture.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Tailwind CSS Desenleri (v4 - 2025)

> CSS-tabanlı yapılandırma ile modern utility-first CSS.

---

## 1. Tailwind v4 Mimarisi

### v3'ten Ne Değişti

| v3 (Eski) | v4 (Mevcut) |
|-----------|-------------|
| `tailwind.config.js` | CSS-tabanlı `@theme` direktifi |
| PostCSS eklentisi | Oxide motoru (10x daha hızlı) |
| JIT modu | Yerel (Native), her zaman açık |
| Eklenti sistemi | CSS-yerel özellikler |
| `@apply` direktifi | Hala çalışıyor, önerilmiyor |

### v4 Temel Kavramlar

| Kavram | Açıklama |
|--------|-------------|
| **CSS-öncelikli** | JavaScript değil, CSS içinde yapılandırma |
| **Oxide Motoru** | Rust-tabanlı derleyici, çok daha hızlı |
| **Yerel İç İçe Geçme (Nesting)** | PostCSS olmadan CSS nesting |
| **CSS Değişkenleri** | Tüm tokenlar `--*` değişkenleri olarak sunulur |

---

## 2. CSS-Tabanlı Yapılandırma

### Tema Tanımı

```
@theme {
  /* Renkler - anlamsal isimler kullanın */
  --color-primary: oklch(0.7 0.15 250);
  --color-surface: oklch(0.98 0 0);
  --color-surface-dark: oklch(0.15 0 0);
  
  /* Boşluk ölçeği */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  
  /* Tipografi */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Ne Zaman Genişletmeli vs Geçersiz Kılmalı

| Eylem | Ne Zaman Kullanılır |
|-------|----------|
| **Genişlet (Extend)** | Varsayılanların yanına yeni değerler ekleme |
| **Geçersiz Kıl (Override)** | Varsayılan ölçeği tamamen değiştirme |
| **Anlamsal tokenlar** | Projeye özel isimlendirme (primary, surface) |

---

## 3. Konteyner Sorguları (v4 Yerel)

### Breakpoint vs Konteyner

| Tür | Şuna Yanıt Verir |
|------|-------------|
| **Breakpoint** (`md:`) | Viewport genişliği |
| **Konteyner** (`@container`) | Ebeveyn eleman genişliği |

### Konteyner Sorgusu Kullanımı

| Desen | Sınıflar |
|---------|---------|
| Konteyner tanımla | Ebeveynde `@container` |
| Konteyner breakpoint | Çocuklarda `@sm:`, `@md:`, `@lg:` |
| İsimlendirilmiş konteynerler | Özgüllük (specificity) için `@container/card` |

### Ne Zaman Kullanılır

| Senaryo | Kullanım |
|----------|-----|
| Sayfa seviyesi düzenler | Viewport breakpointleri |
| Bileşen seviyesi duyarlı | Konteyner sorguları |
| Yeniden kullanılabilir bileşenler | Konteyner sorguları (bağlamdan bağımsız) |

---

## 4. Duyarlı (Responsive) Tasarım

### Breakpoint Sistemi

| Önek | Min Genişlik | Hedef |
|--------|-----------|--------|
| (yok) | 0px | Mobil-öncelikli temel |
| `sm:` | 640px | Büyük telefon / küçük tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Masaüstü |
| `2xl:` | 1536px | Büyük masaüstü |

### Mobil-Öncelikli Prensibi

1. Önce mobil stilleri yazın (önek yok)
2. Daha büyük ekran geçersiz kılmalarını öneklerle ekleyin
3. Örnek: `w-full md:w-1/2 lg:w-1/3`

---

## 5. Koyu Mod (Dark Mode)

### Yapılandırma Stratejileri

| Yöntem | Davranış | Ne Zaman Kullanılır |
|--------|----------|----------|
| `class` | `.dark` sınıfı değiştirir | Manuel tema değiştirici |
| `media` | Sistem tercihini izler | Kullanıcı kontrolü yok |
| `selector` | Özel seçici (v4) | Karmaşık temalandırma |

### Koyu Mod Deseni

| Öğe | Açık (Light) | Koyu (Dark) |
|---------|-------|------|
| Arka plan | `bg-white` | `dark:bg-zinc-900` |
| Metin | `text-zinc-900` | `dark:text-zinc-100` |
| Kenarlıklar | `border-zinc-200` | `dark:border-zinc-700` |

---

## 6. Modern Düzen Desenleri

### Flexbox Desenleri

| Desen | Sınıflar |
|---------|---------|
| Ortala (her iki eksen) | `flex items-center justify-center` |
| Dikey yığın | `flex flex-col gap-4` |
| Yatay satır | `flex gap-4` |
| Aralıklı (Space between) | `flex justify-between items-center` |
| Izgara sarma (Wrap grid) | `flex flex-wrap gap-4` |

### Grid Desenleri

| Desen | Sınıflar |
|---------|---------|
| Otomatik sığdır duyarlı | `grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]` |
| Asimetrik (Bento) | `grid grid-cols-3 grid-rows-2` (span ile) |
| Kenar çubuğu düzeni | `grid grid-cols-[auto_1fr]` |

> **Not:** Simetrik 3 sütunlu ızgaralar yerine asimetrik/Bento düzenleri tercih edin.

---

## 7. Modern Renk Sistemi

### OKLCH vs RGB/HSL

| Format | Avantaj |
|--------|-----------|
| **OKLCH** | Algısal olarak tekdüze, tasarım için daha iyi |
| **HSL** | Sezgisel ton/doygunluk |
| **RGB** | Eski uyumluluk |

### Renk Token Mimarisi

| Katman | Örnek | Amaç |
|-------|---------|---------|
| **Primitive** | `--blue-500` | Ham renk değerleri |
| **Semantic** | `--color-primary` | Amaç tabanlı isimlendirme |
| **Component** | `--button-bg` | Bileşene özel |

---

## 8. Tipografi Sistemi

### Font Yığını Deseni

| Tür | Önerilen |
|------|-------------|
| Sans | `'Inter', 'SF Pro', system-ui, sans-serif` |
| Mono | `'JetBrains Mono', 'Fira Code', monospace` |
| Display | `'Outfit', 'Poppins', sans-serif` |

### Tip Ölçeği

| Sınıf | Boyut | Kullanım |
|-------|------|-----|
| `text-xs` | 0.75rem | Etiketler, altyazılar |
| `text-sm` | 0.875rem | İkincil metin |
| `text-base` | 1rem | Gövde metni |
| `text-lg` | 1.125rem | Giriş metni |
| `text-xl`+ | 1.25rem+ | Başlıklar |

---

## 9. Animasyon & Geçişler

### Yerleşik Animasyonlar

| Sınıf | Efekt |
|-------|--------|
| `animate-spin` | Sürekli dönme |
| `animate-ping` | Dikkat darbesi |
| `animate-pulse` | İnce opaklık darbesi |
| `animate-bounce` | Zıplama efekti |

### Geçiş Desenleri

| Desen | Sınıflar |
|---------|---------|
| Tüm özellikler | `transition-all duration-200` |
| Belirli | `transition-colors duration-150` |
| Easing ile | `ease-out` veya `ease-in-out` |
| Hover efekti | `hover:scale-105 transition-transform` |

---

## 10. Bileşen Çıkarma (Extraction)

### Ne Zaman Çıkarılmalı

| Sinyal | Eylem |
|--------|--------|
| Aynı sınıf kombinasyonu 3+ kez | Bileşeni çıkar |
| Karmaşık durum varyantları | Bileşeni çıkar |
| Tasarım sistemi öğesi | Çıkar + belgele |

### Çıkarma Yöntemleri

| Yöntem | Ne Zaman Kullanılır |
|--------|----------|
| **React/Vue bileşeni** | Dinamik, JS gerekli |
| **CSS içinde @apply** | Statik, JS gerekmez |
| **Tasarım tokenları** | Yeniden kullanılabilir değerler |

---

## 11. Anti-Desenler

| Yapma | Yap |
|-------|-----|
| Her yerde keyfi değerler | Tasarım sistemi ölçeğini kullan |
| `!important` | Özgüllüğü (specificity) düzgün ayarla |
| Satır içi `style=` | Utility'leri kullan |
| Yinelenen uzun sınıf listeleri | Bileşeni çıkar |
| v3 yapılandırmasını v4 ile karıştırma | Tamamen CSS-öncelikli yapıya geç |
| `@apply`'ı aşırı kullanma | Bileşenleri tercih et |

---

## 12. Performans Prensipleri

| Prensip | Uygulama |
|-----------|----------------|
| **Kullanılmayanı temizle** | v4'te otomatik |
| **Dinamizmden kaçın** | Şablon dizesi sınıfları yok |
| **Oxide kullan** | v4'te varsayılan, 10x daha hızlı |
| **Derlemeleri önbelleğe al** | CI/CD önbellekleme |

---

> **Unutmayın:** Tailwind v4, CSS-önceliklidir. CSS değişkenlerini, konteyner sorgularını ve yerel özellikleri benimseyin. Yapılandırma dosyası artık isteğe bağlıdır.
