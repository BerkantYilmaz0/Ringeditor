---
description: Hata ayıklama komutu. Sistematik sorun incelemesi için DEBUG modunu etkinleştirir.
---

# /debug - Sistematik Sorun İncelemesi

$ARGUMENTS

---

## Amaç

Bu komut, sorunların, hataların veya beklenmeyen davranışların sistematik olarak incelenmesi için DEBUG (HATA AYIKLAMA) modunu etkinleştirir.

---

## Davranış

`/debug` tetiklendiğinde:

1. **Bilgi topla**
   - Hata mesajı
   - Yeniden oluşturma adımları
   - Beklenen vs gerçekleşen davranış
   - Son değişiklikler

2. **Hipotezler oluştur**
   - Olası nedenleri listele
   - Olasılığa göre sırala

3. **Sistematik olarak incele**
   - Her hipotezi test et
   - Logları, veri akışını kontrol et
   - Eliminasyon yöntemini kullan

4. **Düzelt ve önle**
   - Düzeltmeyi uygula
   - Kök nedeni açıkla
   - Önleme tedbirleri ekle

---

## Çıktı Formatı

```markdown
## 🔍 Hata Ayıklama: [Sorun]

### 1. Belirti
[Ne oluyor]

### 2. Toplanan Bilgiler
- Hata: `[hata mesajı]`
- Dosya: `[dosya yolu]`
- Satır: [satır numarası]

### 3. Hipotezler
1. ❓ [En olası neden]
2. ❓ [İkinci olasılık]
3. ❓ [Daha az olası neden]

### 4. İnceleme

**Hipotez 1 testi:**
[Kontrol ettiğim şey] → [Sonuç]

**Hipotez 2 testi:**
[Kontrol ettiğim şey] → [Sonuç]

### 5. Kök Neden
🎯 **[Bunun neden olduğunun açıklaması]**

### 6. Düzeltme
```[dil]
// Önce
[bozuk kod]

// Sonra
[düzeltilmiş kod]
\```

### 7. Önleme
🛡️ [Gelecekte bunun nasıl önleneceği]
```

---

## Örnekler

```
/debug giriş çalışmıyor
/debug API 500 döndürüyor
/debug form gönderilmiyor
/debug veri kaydedilmiyor
```

---

## Temel Prensipler

- **Varsaymadan önce sor** - tam hata bağlamını al
- **Hipotezleri test et** - rastgele tahmin etme
- **Nedenini açıkla** - sadece neyin düzeltileceğini değil
- **Tekrarı önle** - testler, doğrulama ekle
