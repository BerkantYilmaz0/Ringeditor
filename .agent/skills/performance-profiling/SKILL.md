---
name: performance-profiling
description: Performance profiling principles. Measurement, analysis, and optimization techniques.
allowed-tools: Read, Glob, Grep, Bash
---

# Performans Profili Oluşturma

> Ölç, analiz et, optimize et - bu sırayla.

## 🔧 Çalışma Zamanı Scriptleri

**Otomatik profil oluşturma için bunları çalıştırın:**

| Script | Amaç | Kullanım |
|--------|---------|-------|
| `scripts/lighthouse_audit.py` | Lighthouse performans denetimi | `python scripts/lighthouse_audit.py https://example.com` |

---

## 1. Temel Web Verileri (Core Web Vitals)

### Hedefler

| Metrik | İyi | Zayıf | Neyi Ölçer |
|--------|------|------|----------|
| **LCP** | < 2.5s | > 4.0s | Yükleme |
| **INP** | < 200ms | > 500ms | Etkileşim |
| **CLS** | < 0.1 | > 0.25 | Kararlılık |

### Ne Zaman Ölçülmeli

| Aşama | Araç |
|-------|------|
| Geliştirme | Yerel Lighthouse |
| CI/CD | Lighthouse CI |
| Üretim | RUM (Gerçek Kullanıcı İzleme) |

---

## 2. Profil Oluşturma İş Akışı

### 4 Adımlı Süreç

```
1. TABAN HATTI (BASELINE) → Mevcut durumu ölç
2. TANIMLA (IDENTIFY) → Darboğazı bul
3. DÜZELT (FIX) → Hedefli değişiklik yap
4. DOĞRULA (VALIDATE) → İyileştirmeyi onayla
```

### Profil Oluşturma Aracı Seçimi

| Sorun | Araç |
|---------|------|
| Sayfa yükleme | Lighthouse |
| Paket boyutu | Paket analizcisi (Bundle analyzer) |
| Çalışma Zamanı | DevTools Performance |
| Bellek | DevTools Memory |
| Ağ | DevTools Network |

---

## 3. Paket Analizi

### Nelere Bakılmalı

| Sorun | Gösterge |
|-------|-----------|
| Büyük bağımlılıklar | Paketin en tepesinde |
| Yinelenen kod | Çoklu parçalar (chunks) |
| Kullanılmayan kod | Düşük kapsama oranı |
| Eksik bölmeler | Tek büyük parça |

### Optimizasyon Eylemleri

| Bulgu | Eylem |
|---------|--------|
| Büyük kütüphane | Belirli modülleri içe aktar |
| Yinelenen bağımlılıklar | Tekilleştir (Dedupe), sürümleri güncelle |
| Ana dosyadaki rota | Kod bölme (Code split) |
| Kullanılmayan dışa aktarmalar | Tree shake |

---

## 4. Çalışma Zamanı Profili Oluşturma

### Performans Sekmesi Analizi

| Desen | Anlamı |
|---------|---------|
| Uzun görevler (>50ms) | UI bloklama |
| Çok sayıda küçük görev | Olası toplu işlem (batching) fırsatı |
| Düzen/boyama (Layout/paint) | Render darboğazı |
| Script | JavaScript yürütme |

### Bellek Sekmesi Analizi

| Desen | Anlamı |
|---------|---------|
| Büyüyen yığın (heap) | Olası sızıntı |
| Büyük tutulan (retained) | Referansları kontrol et |
| Ayrılmış (Detached) DOM | Temizlenmemiş |

---

## 5. Yaygın Darboğazlar

### Belirtiye Göre

| Belirti | Olası Neden |
|---------|--------------|
| Yavaş ilk yükleme | Büyük JS, render engelleyici |
| Yavaş etkileşimler | Ağır olay işleyicileri |
| Kaydırma sırasında takılma (jank) | Düzen sarsıntısı (Layout thrashing) |
| Büyüyen bellek | Sızıntılar, tutulan referanslar |

---

## 6. Hızlı Kazanım Öncelikleri

| Öncelik | Eylem | Etki |
|----------|--------|--------|
| 1 | Sıkıştırmayı etkinleştir | Yüksek |
| 2 | Resimleri tembel yükle (Lazy load) | Yüksek |
| 3 | Rotaları kodlara böl | Yüksek |
| 4 | Statik varlıkları önbelleğe al | Orta |
| 5 | Resimleri optimize et | Orta |

---

## 7. Anti-Desenler

| ❌ Yapma | ✅ Yap |
|----------|-------|
| Sorunları tahmin etme | Önce profil oluştur |
| Mikro-optimize etme | En büyük sorunu düzelt |
| Erken optimize etme | Gerektiğinde optimize et |
| Gerçek kullanıcıları görmezden gelme | RUM verilerini kullan |

---

> **Unutmayın:** En hızlı kod, çalışmayan koddur. Optimize etmeden önce kaldırın.
