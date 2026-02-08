---
name: react-patterns
description: Modern React patterns and principles. Hooks, composition, performance, TypeScript best practices.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# React Desenleri

> Üretime hazır React uygulamaları oluşturmak için prensipler.

---

## 1. Bileşen Tasarım Prensipleri

### Bileşen Türleri

| Tür | Kullanım | Durum (State) |
|------|-----|-------|
| **Sunucu** | Veri getirme, statik | Yok |
| **İstemci** | Etkileşim | useState, effects |
| **Sunumsal** | UI gösterimi | Sadece Props |
| **Konteyner** | Mantık/durum | Ağır durum |

### Tasarım Kuralları

- Bileşen başına tek sorumluluk
- Props aşağı, olaylar (events) yukarı
- Kalıtım yerine kompozisyon
- Küçük, odaklanmış bileşenleri tercih et

---

## 2. Hook Desenleri

### Hooklar Ne Zaman Çıkarılmalı (Extract)

| Desen | Ne Zaman Çıkarılır |
|---------|-------------|
| **useLocalStorage** | Aynı depolama mantığı gerektiğinde |
| **useDebounce** | Çoklu debounce edilmiş değerler |
| **useFetch** | Tekrarlanan getirme desenleri |
| **useForm** | Karmaşık form durumu |

### Hook Kuralları

- Hooklar sadece en üst seviyede
- Her renderda aynı sıra
- Özel hooklar "use" ile başlar
- Unmount işleminde efektleri temizle

---

## 3. Durum Yönetimi Seçimi

| Karmaşıklık | Çözüm |
|------------|----------|
| Basit | useState, useReducer |
| Paylaşılan yerel | Context |
| Sunucu durumu | React Query, SWR |
| Karmaşık global | Zustand, Redux Toolkit |

### Durum Yerleşimi

| Kapsam | Nerede |
|-------|-------|
| Tek bileşen | useState |
| Ebeveyn-çocuk | Durumu yukarı taşı (Lift state up) |
| Alt ağaç | Context |
| Uygulama geneli | Global store |

---

## 4. React 19 Desenleri

### Yeni Hooklar

| Hook | Amaç |
|------|---------|
| **useActionState** | Form gönderim durumu |
| **useOptimistic** | İyimser UI güncellemeleri |
| **use** | Render sırasında kaynakları oku |

### Derleyici (Compiler) Faydaları

- Otomatik memoization
- Daha az manuel useMemo/useCallback
- Saf bileşenlere odaklanma

---

## 5. Kompozisyon Desenleri

### Bileşik (Compound) Bileşenler

- Ebeveyn bağlam (context) sağlar
- Çocuklar bağlamı tüketir
- Esnek slot tabanlı kompozisyon
- Örnek: Tabs, Accordion, Dropdown

### Render Props vs Hooklar

| Kullanım Durumu | Tercih Et |
|----------|--------|
| Yeniden kullanılabilir mantık | Özel hook |
| Render esnekliği | Render props |
| Kesişen (Cross-cutting) | Üst düzey bileşen (Higher-order component) |

---

## 6. Performans Prensipleri

### Ne Zaman Optimize Edilmeli

| Sinyal | Eylem |
|--------|--------|
| Yavaş renderlar | Önce profil oluştur |
| Büyük listeler | Sanallaştır (Virtualize) |
| Pahalı hesaplama | useMemo |
| Kararlı geri çağrılar (callbacks) | useCallback |

### Optimizasyon Sırası

1. Gerçekten yavaş olup olmadığını kontrol et
2. DevTools ile profil oluştur
3. Darboğazı belirle
4. Hedefli düzeltme uygula

---

## 7. Hata Yönetimi

### Hata Sınırı (Error Boundary) Kullanımı

| Kapsam | Yerleşim |
|-------|-----------|
| Uygulama geneli | Kök seviyesi |
| Özellik | Rota/özellik seviyesi |
| Bileşen | Riskli bileşen etrafında |

### Hata Kurtarma

- Geri dönüş (fallback) UI göster
- Hatayı logla
- Yeniden deneme seçeneği sun
- Kullanıcı verilerini koru

---

## 8. TypeScript Desenleri

### Props Tipleme

| Desen | Kullanım |
|---------|-----|
| Interface | Bileşen props |
| Type | Unionlar, karmaşık |
| Generic | Yeniden kullanılabilir bileşenler |

### Yaygın Tipler

| İhtiyaç | Tip |
|------|------|
| Çocuklar (Children) | ReactNode |
| Olay işleyici | MouseEventHandler |
| Ref | RefObject<Element> |

---

## 9. Test Prensipleri

| Seviye | Odak |
|-------|-------|
| Birim | Saf fonksiyonlar, hooklar |
| Entegrasyon | Bileşen davranışı |
| E2E | Kullanıcı akışları |

### Test Öncelikleri

- Kullanıcı tarafından görülebilir davranış
- Uç durumlar
- Hata durumları
- Erişilebilirlik

---

## 10. Anti-Desenler

| ❌ Yapma | ✅ Yap |
|----------|-------|
| Derin prop geçirme (drilling) | Context kullan |
| Dev bileşenler | Daha küçük parçalara böl |
| Her şey için useEffect | Sunucu bileşenleri |
| Erken optimizasyon | Önce profil oluştur |
| Anahtar (key) olarak indeks | Kararlı benzersiz ID |

---

> **Unutmayın:** React kompozisyonla ilgilidir. Küçük inşa edin, düşünceli bir şekilde birleştirin.
