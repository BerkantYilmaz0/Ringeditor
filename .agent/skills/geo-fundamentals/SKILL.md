---
name: geo-fundamentals
description: AI arama motorları (ChatGPT, Claude, Perplexity) için Generative Engine Optimization.
allowed-tools: Read, Glob, Grep
---

# GEO Temelleri

> AI destekli arama motorları için optimizasyon.

---

## 1. GEO Nedir?

**GEO** = Üretken Motor Optimizasyonu (Generative Engine Optimization)

| Hedef | Platform |
|------|----------|
| AI yanıtlarında alıntılanmak | ChatGPT, Claude, Perplexity, Gemini |

### SEO vs GEO

| Yön | SEO | GEO |
|--------|-----|-----|
| Hedef | #1 sıralama | AI alıntıları |
| Platform | Google | AI motorları |
| Metrikler | Sıralamalar, TO (CTR) | Alıntılanma oranı |
| Odak | Anahtar kelimeler | Varlıklar (Entities), veri |

---

## 2. AI Motoru Manzarası

| Motor | Alıntı Stili | Fırsat |
|--------|----------------|-------------|
| **Perplexity** | Numaralandırılmış [1][2] | En yüksek alıntılanma oranı |
| **ChatGPT** | Satır içi/dipnotlar | Özel GPT'ler |
| **Claude** | Bağlamsal | Uzun formlu içerik |
| **Gemini** | Kaynaklar bölümü | SEO geçişi |

---

## 3. RAG Erişim Faktörleri

AI motorları alıntılanacak içeriği nasıl seçer:

| Faktör | Ağırlık |
|--------|--------|
| Anlamsal alaka düzeyi | ~%40 |
| Anahtar kelime eşleşmesi | ~%20 |
| Otorite sinyalleri | ~%15 |
| Tazelik | ~%10 |
| Kaynak çeşitliliği | ~%15 |

---

## 4. Alıntılanan İçerik

| Öğe | Neden Çalışır |
|---------|--------------|
| **Orijinal istatistikler** | Benzersiz, alıntılanabilir veri |
| **Uzman alıntıları** | Otorite transferi |
| **Net tanımlar** | Çıkarılması kolay |
| **Adım adım rehberler** | Eyleme geçirilebilir değer |
| **Karşılaştırma tabloları** | Yapılandırılmış bilgi |
| **SSS bölümleri** | Doğrudan yanıtlar |

---

## 5. GEO İçerik Kontrol Listesi

### İçerik Öğeleri

- [ ] Soru bazlı başlıklar
- [ ] Üstte Özet/TL;DR
- [ ] Kaynaklı orijinal veriler
- [ ] Uzman alıntıları (isim, unvan)
- [ ] SSS bölümü (3-5 Soru-Cevap)
- [ ] Net tanımlar
- [ ] "Son güncelleme" zaman damgası
- [ ] Kimlik bilgileriyle yazar

### Teknik Öğeler

- [ ] Tarihli makale şeması
- [ ] Yazar için kişi şeması
- [ ] FAQPage şeması
- [ ] Hızlı yükleme (< 2.5s)
- [ ] Temiz HTML yapısı

---

## 6. Varlık Oluşturma

| Eylem | Amaç |
|--------|---------|
| Google Bilgi Paneli | Varlık tanıma |
| Wikipedia (eğer dikkate değerse) | Otorite kaynağı |
| Web genelinde tutarlı bilgi | Varlık konsolidasyonu |
| Endüstri bahsedilmeleri | Otorite sinyalleri |

---

## 7. AI Tarayıcı Erişimi

### Anahtar AI Kullanıcı Aracıları (User-Agents)

| Tarayıcı | Motor |
|---------|--------|
| GPTBot | ChatGPT/OpenAI |
| Claude-Web | Claude |
| PerplexityBot | Perplexity |
| Googlebot | Gemini (paylaşılan) |

### Erişim Kararı

| Strateji | Ne Zaman |
|----------|------|
| Hepsine izin ver | AI alıntıları isteniyorsa |
| GPTBot'u engelle | OpenAI eğitimi istenmiyorsa |
| Seçici | Bazılarına izin ver, diğerlerini engelle |

---

## 8. Ölçüm

| Metrik | Nasıl Takip Edilir |
|--------|--------------|
| AI alıntıları | Manuel izleme |
| "[Marka]'ya göre" ibareleri | AI içinde arama |
| Rakip alıntıları | Payı karşılaştır |
| AI kaynaklı trafik | UTM parametreleri |

---

## 9. Anti-Desenler

| ❌ Yapma | ✅ Yap |
|----------|-------|
| Tarihsiz yayınla | Zaman damgaları ekle |
| Belirsiz atıflar | Kaynakları isimlendir |
| Yazar bilgisini atla | Kimlik bilgilerini göster |
| Zayıf içerik | Kapsamlı kapsama |

---

> **Unutmayın:** AI; net, otoriter ve çıkarılması kolay içeriği alıntılar. En iyi cevap olun.

---

## Script

| Script | Amaç | Komut |
|--------|---------|---------|
| `scripts/geo_checker.py` | GEO denetimi (AI alıntı hazır olma durumu) | `python scripts/geo_checker.py <project_path>` |
