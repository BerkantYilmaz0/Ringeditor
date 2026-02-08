---
name: brainstorming
description: Sokratik sorgulama protokolü + kullanıcı iletişimi. Karmaşık istekler, yeni özellikler veya belirsiz gereksinimler için ZORUNLUDUR. İlerleme raporlaması ve hata yönetimini içerir.
allowed-tools: Read, Glob, Grep
---

# Beyin Fırtınası & İletişim Protokolü

> **ZORUNLU:** Karmaşık/belirsiz istekler, yeni özellikler, güncellemeler için kullanın.

---

## 🛑 SOKRATİK KAPI (UYGULAMA)

### Ne Zaman Tetiklenir

| Desen | Eylem |
|---------|--------|
| Ayrıntı olmadan "[şey] İnşa et/Oluştur/Yap" | 🛑 3 soru SOR |
| Karmaşık özellik veya mimari | 🛑 Uygulamadan önce netleştir |
| Güncelleme/değişiklik isteği | 🛑 Kapsamı onayla |
| Belirsiz gereksinimler | 🛑 Amaç, kullanıcılar, kısıtlamalar sor |

### 🚫 ZORUNLU: Uygulamadan Önce 3 Soru

1. **DUR (STOP)** - Kodlamaya BAŞLAMA
2. **SOR (ASK)** - Minimum 3 soru:
   - 🎯 Amaç: Hangi sorunu çözüyorsun?
   - 👥 Kullanıcılar: Bunu kim kullanacak?
   - 📦 Kapsam: Olmazsa olmazlar vs olsa iyi olurlar?
3. **BEKLE (WAIT)** - Devam etmeden önce yanıt al

---

## 🧠 Dinamik Soru Oluşturma

**⛔ ASLA statik şablonlar kullanmayın.** Prensipler için `dynamic-questioning.md` okuyun.

### Temel Prensipler

| Prensip | Anlamı |
|-----------|---------|
| **Sorular Sonuçları Ortaya Çıkarır** | Her soru bir mimari karara bağlanır |
| **İçerikten Önce Bağlam** | Önce greenfield/özellik/refactor/debug bağlamını anla |
| **Minimum Uygulanabilir Sorular** | Her soru uygulama yollarını elemeli |
| **Varsayım Değil, Veri Üret** | Tahmin etme—takaslarla (trade-offs) sor |

### Soru Oluşturma Süreci

```
1. İsteği ayrıştır → Alanı, özellikleri, ölçek göstergelerini çıkar
2. Karar noktalarını belirle → Engelleyici vs. ertelenebilir
3. Sorular üret → Öncelik: P0 (engelleyici) > P1 (yüksek kaldıraç) > P2 (olsa iyi olur)
4. Takaslarla biçimlendir → Ne, Neden, Seçenekler, Varsayılan
```

### Soru Formatı (ZORUNLU)

```markdown
### [ÖNCELİK] **[KARAR NOKTASI]**

**Soru:** [Net soru]

**Bu Neden Önemli:**
- [Mimari sonuç]
- [Etkiler: maliyet/karmaşıklık/zaman çizelgesi/ölçek]

**Seçenekler:**
| Seçenek | Artılar | Eksiler | En İyisi İçin |
|--------|------|------|----------|
| A | [+] | [-] | [Kullanım durumu] |

**Belirtilmemişse:** [Varsayılan + mantık]
```

**Ayrıntılı alana özgü soru bankaları ve algoritmalar için**, bkz: `dynamic-questioning.md`

---

## İlerleme Raporlama (PRENSİP TABANLI)

**PRENSİP:** Şeffaflık güven oluşturur. Durum görünür ve eyleme geçirilebilir olmalıdır.

### Durum Panosu Formatı

| Ajan | Durum | Mevcut Görev | İlerleme |
|-------|--------|--------------|----------|
| [Ajan Adı] | ✅🔄⏳❌⚠️ | [Görev açıklaması] | [% veya sayı] |

### Durum İkonları

| İkon | Anlamı | Kullanım |
|------|---------|-------|
| ✅ | Tamamlandı | Görev başarıyla bitti |
| 🔄 | Çalışıyor | Şu anda yürütülüyor |
| ⏳ | Bekliyor | Bloklandı, bağımlılık bekliyor |
| ❌ | Hata | Başarısız oldu, ilgi gerekiyor |
| ⚠️ | Uyarı | Potansiyel sorun, engelleyici değil |

---

## Hata Yönetimi (PRENSİP TABANLI)

**PRENSİP:** Hatalar net iletişim için fırsatlardır.

### Hata Yanıt Deseni

```
1. Hatayı kabul et
2. Ne olduğunu açıkla (kullanıcı dostu)
3. Takaslarla birlikte belirli çözümler sun
4. Kullanıcıdan seçim yapmasını veya alternatif sunmasını iste
```

### Hata Kategorileri

| Kategori | Yanıt Stratejisi |
|----------|-------------------|
| **Port Çatışması** | Alternatif port sun veya mevcut olanı kapat |
| **Bağımlılık Eksik** | Otomatik yükle veya izin iste |
| **Derleme Hatası** | Belirli hatayı + önerilen düzeltmeyi göster |
| **Belirsiz Hata** | Ayrıntı iste: ekran görüntüsü, konsol çıktısı |

---

## Tamamlama Mesajı (PRENSİP TABANLI)

**PRENSİP:** Başarıyı kutla, sonraki adımlara rehberlik et.

### Tamamlama Yapısı

```
1. Başarı onayı (kısaca kutla)
2. Yapılanların özeti (somut)
3. Nasıl doğrulanır/test edilir (eyleme geçirilebilir)
4. Sonraki adımlar önerisi (proaktif)
```

---

## İletişim Prensipleri

| Prensip | Uygulama |
|-----------|----------------|
| **Kısa** | Gereksiz ayrıntı yok, sadede gel |
| **Görsel** | Hızlı tarama için emojiler (✅🔄⏳❌) kullan |
| **Belirli** | "biraz bekle" değil "~2 dakika" |
| **Alternatifler** | Sıkıştığında birden fazla yol sun |
| **Proaktif** | Tamamlandıktan sonra sonraki adımı öner |

---

## Anti-Desenler (KAÇININ)

| Anti-Desen | Neden |
|--------------|-----|
| Anlamadan önce çözümlere atlamak | Yanlış problemde zaman harcar |
| Sormadan gereksinimleri varsaymak | Yanlış çıktı oluşturur |
| İlk sürümü aşırı mühendislik yapmak | Değer teslimini geciktirir |
| Kısıtlamaları görmezden gelmek | Kullanılamaz çözümler oluşturur |
| "Sanırım" (I think) ifadeleri | Belirsizlik → Bunun yerine sor |
