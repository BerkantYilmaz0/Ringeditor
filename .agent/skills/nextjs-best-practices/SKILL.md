---
name: nextjs-best-practices
description: Next.js Uygulama Yönlendiricisi (App Router) prensipleri. Sunucu Bileşenleri, veri getirme, yönlendirme desenleri.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Next.js En İyi Uygulamalar

> Next.js App Router geliştirmesi için prensipler.

---

## 1. Sunucu vs İstemci Bileşenleri

### Karar Ağacı

```
Şuna ihtiyacı var mı...?
│
├── useState, useEffect, olay işleyicileri (event handlers)
│   └── İstemci Bileşeni (Client Component) ('use client')
│
├── Doğrudan veri getirme, etkileşim yok
│   └── Sunucu Bileşeni (Server Component) (varsayılan)
│
└── İkisi de? 
    └── Böl: Sunucu ebeveyn + İstemci çocuk
```

### Varsayılan Olarak

| Tür | Kullanım |
|------|-----|
| **Sunucu** | Veri getirme, düzen, statik içerik |
| **İstemci** | Formlar, butonlar, etkileşimli UI |

---

## 2. Veri Getirme Desenleri

### Getirme Stratejisi

| Desen | Kullanım |
|---------|-----|
| **Varsayılan** | Statik (derlemede önbelleğe alınır) |
| **Yeniden Doğrulama** | ISR (zaman tabanlı yenileme) |
| **Önbellek Yok** | Dinamik (her istekte) |

### Veri Akışı

| Kaynak | Desen |
|--------|---------|
| Veritabanı | Sunucu Bileşeni getirme (fetch) |
| API | önbellekleme ile fetch |
| Kullanıcı girdisi | İstemci durumu + sunucu eylemi (server action) |

---

## 3. Yönlendirme (Routing) Prensipleri

### Dosya Kuralları

| Dosya | Amaç |
|------|---------|
| `page.tsx` | Rota UI |
| `layout.tsx` | Paylaşılan düzen |
| `loading.tsx` | Yükleme durumu |
| `error.tsx` | Hata sınırı (boundary) |
| `not-found.tsx` | 404 sayfası |

### Rota Organizasyonu

| Desen | Kullanım |
|---------|-----|
| Rota grupları `(name)` | URL olmadan organize et |
| Paralel rotalar `@slot` | Çoklu aynı seviye sayfalar |
| Kesişen (Intercepting) `(.)` | Modal katmanları |

---

## 4. API Rotaları

### Rota İşleyicileri (Route Handlers)

| Yöntem | Kullanım |
|--------|-----|
| GET | Veri oku |
| POST | Veri oluştur |
| PUT/PATCH | Veri güncelle |
| DELETE | Veri kaldır |

### En İyi Uygulamalar

- Girdiyi Zod ile doğrula
- Uygun durum kodları döndür
- Hataları zarifçe işle
- Mümkünse Edge çalışma zamanı kullan

---

## 5. Performans Prensipleri

### Görüntü Optimizasyonu

- next/image bileşeni kullan
- Ekranın üstü (above-fold) için öncelik ayarla
- Bulanık yer tutucu sağla
- Duyarlı boyutlar kullan

### Paket Optimizasyonu

- Ağır bileşenler için dinamik içe aktarmalar
- Rota tabanlı kod bölme (otomatik)
- Paket analizcisi ile analiz et

---

## 6. Metadata

### Statik vs Dinamik

| Tür | Kullanım |
|------|-----|
| Statik dışa aktarma | Sabit metadata |
| generateMetadata | Rota başına dinamik |

### Temel Etiketler

- title (50-60 karakter)
- description (150-160 karakter)
- Open Graph görüntüleri
- Canonical URL

---

## 7. Önbellekleme Stratejisi

### Önbellek Katmanları

| Katman | Kontrol |
|-------|---------|
| İstek | fetch seçenekleri |
| Veri | revalidate/tags |
| Tam rota | rota yapılandırması |

### Yeniden Doğrulama

| Yöntem | Kullanım |
|--------|-----|
| Zaman tabanlı | `revalidate: 60` |
| İsteğe bağlı | `revalidatePath/Tag` |
| Önbellek yok | `no-store` |

---

## 8. Sunucu Eylemleri (Server Actions)

### Kullanım Durumları

- Form gönderimleri
- Veri mutasyonları
- Yeniden doğrulama tetikleyicileri

### En İyi Uygulamalar

- 'use server' ile işaretle
- Tüm girdileri doğrula
- Tipli yanıtlar döndür
- Hataları işle

---

## 9. Anti-Desenler

| ❌ Yapma | ✅ Yap |
|----------|-------|
| Her yerde 'use client' | Varsayılan olarak Sunucu |
| İstemci bileşenlerinde fetch | Sunucuda fetch |
| Yükleme durumlarını atla | loading.tsx kullan |
| Hata sınırlarını görmezden gel | error.tsx kullan |
| Büyük istemci paketleri | Dinamik içe aktarmalar |

---

## 10. Proje Yapısı

```
app/
├── (marketing)/     # Rota grubu
│   └── page.tsx
├── (dashboard)/
│   ├── layout.tsx   # Dashboard düzeni
│   └── page.tsx
├── api/
│   └── [resource]/
│       └── route.ts
└── components/
    └── ui/
```

---

> **Unutmayın:** Sunucu Bileşenlerinin varsayılan olmasının bir nedeni var. Oradan başlayın, sadece gerektiğinde istemci ekleyin.
