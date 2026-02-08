---
description: Projeler ve özellikler için yapılandırılmış beyin fırtınası. Uygulamayı hayata geçirmeden önce birden çok seçeneği değerlendirir.
---

# /brainstorm - Yapılandırılmış Fikir Üretimi

$ARGUMENTS

---

## Amaç

Bu komut, fikirleri yapılandırılmış bir şekilde keşfetmek için BEYİN FIRTINASI modunu başlatır. Bir çözüme karar vermeden önce farklı seçenekleri değerlendirmeniz gerektiğinde kullanın.

---

## İşleyiş

`/brainstorm` komutu tetiklendiğinde:

1. **Hedefi Anla**
   - Hangi sorunu çözüyoruz?
   - Kullanıcı kim?
   - Hangi kısıtlamalar mevcut?

2. **Seçenekler Üret**
   - En az 3 farklı yaklaşım sun
   - Her birinin avantaj ve dezavantajlarını belirt
   - Alışılmadık ve yaratıcı çözümleri de dikkate al

3. **Karşılaştır ve Öner**
   - Seçeneklerin artılarını ve eksilerini özetle
   - Gerekçeleriyle birlikte net bir öneri sun

---

## Çıktı Formatı

```markdown
## 🧠 Beyin Fırtınası: [Konu]

### Bağlam
[Sorunun kısa tanımı]

---

### Seçenek A: [İsim]
[Açıklama]

✅ **Avantajlar:**
- [fayda 1]
- [fayda 2]

❌ **Dezavantajlar:**
- [dezavantaj 1]

📊 **Efor:** Düşük | Orta | Yüksek

---

### Seçenek B: [İsim]
[Açıklama]

✅ **Avantajlar:**
- [fayda 1]

❌ **Dezavantajlar:**
- [dezavantaj 1]
- [dezavantaj 2]

📊 **Efor:** Düşük | Orta | Yüksek

---

### Seçenek C: [İsim]
[Açıklama]

✅ **Avantajlar:**
- [fayda 1]

❌ **Dezavantajlar:**
- [dezavantaj 1]

📊 **Efor:** Düşük | Orta | Yüksek

---

## 💡 Öneri

**Seçenek [X]** çünkü [gerekçe].

Hangi yaklaşımı seçmek istersiniz?
```

---

## Örnekler

```
/brainstorm kimlik doğrulama sistemi
/brainstorm karmaşık formlar için durum (state) yönetimi
/brainstorm sosyal medya uygulaması için veritabanı şeması
/brainstorm önbellekleme (caching) stratejisi
```

---

## Temel İlkeler

- **Kod yok** - odak noktası uygulama (implementasyon) değil, fikirlerdir
- **Görsellik** - mimari açıklamalar için gerektiğinde diyagram kullanın
- **Dürüstlük** - karmaşıklığı veya zorlukları gizlemeyin
- **Karar kullanıcıda** - seçenekleri sunun, kararı kullanıcıya bırakın
