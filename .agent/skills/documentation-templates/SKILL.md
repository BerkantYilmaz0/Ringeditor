---
name: documentation-templates
description: Documentation templates and structure guidelines. README, API docs, code comments, and AI-friendly documentation.
allowed-tools: Read, Glob, Grep
---

# Dokümantasyon Şablonları

> Yaygın dokümantasyon türleri için şablonlar ve yapı kılavuzları.

---

## 1. README Yapısı

### Temel Bölümler (Öncelik Sırası)

| Bölüm | Amaç |
|---------|---------|
| **Başlık + Tek satırlık açıklama** | Bu nedir? |
| **Hızlı Başlangıç** | <5 dakikada çalıştırma |
| **Özellikler** | Ne yapabilirim? |
| **Yapılandırma** | Nasıl özelleştirilir |
| **API Referansı** | Ayrıntılı belgelere bağlantı |
| **Katkıda Bulunma** | Nasıl yardım edilir |
| **Lisans** | Yasal |

### README Şablonu

```markdown
# Proje Adı

Kısa tek satırlık açıklama.

## Hızlı Başlangıç

[Çalıştırmak için minimum adımlar]

## Özellikler

- Özellik 1
- Özellik 2

## Yapılandırma

| Değişken | Açıklama | Varsayılan |
|----------|-------------|---------|
| PORT | Sunucu portu | 3000 |

## Dokümantasyon

- [API Referansı](./docs/api.md)
- [Mimari](./docs/architecture.md)

## Lisans

MIT
```

---

## 2. API Dokümantasyon Yapısı

### Uç Nokta Başına Şablon

```markdown
## GET /users/:id
7
Kullanıcıyı ID ile getir.

**Parametreler:**
| İsim | Tip | Zorunlu | Açıklama |
|------|------|----------|-------------|
| id | string | Evet | Kullanıcı ID |

**Yanıt:**
- 200: Kullanıcı nesnesi
- 404: Kullanıcı bulunamadı

**Örnek:**
[İstek ve yanıt örneği]
```

---

## 3. Kod Yorumlama Kuralları

### JSDoc/TSDoc Şablonu

```typescript
/**
 * Fonksiyonun ne yaptığının kısa açıklaması.
 * 
 * @param paramName - Parametre açıklaması
 * @returns Dönüş değeri açıklaması
 * @throws ErrorType - Bu hata oluştuğunda
 * 
 * @example
 * const result = functionName(input);
 */
```

### Ne Zaman Yorum Yapmalı

| ✅ Yorum Yap | ❌ Yorum Yapma |
|-----------|-----------------|
| Neden (iş mantığı) | Ne (bariz) |
| Karmaşık algoritmalar | Her satır |
| Bariz olmayan davranış | Kendini açıklayan kod |
| API sözleşmeleri | Uygulama detayları |

---

## 4. Değişiklik Günlüğü (Changelog) Şablonu (Keep a Changelog)

```markdown
# Değişiklik Günlüğü

## [Yayınlanmamış]
### Eklendi
- Yeni özellik

## [1.0.0] - 2025-01-01
### Eklendi
- İlk sürüm
### Değişti
- Bağımlılık güncellendi
### Düzeltildi
- Hata düzeltmesi
```

---

## 5. Mimari Karar Kaydı (ADR)

```markdown
# ADR-001: [Başlık]

## Durum
Kabul Edildi / Kullanımdan Kaldırıldı / Yerini Aldı

## Bağlam
Bu kararı neden alıyoruz?

## Karar
Ne karar verdik?

## Sonuçlar
Takaslar (Trade-offs) nelerdir?
```

---

## 6. AI-Dostu Dokümantasyon (2025)

### llms.txt Şablonu

AI tarayıcıları ve ajanları için:

```markdown
# Proje Adı
> Tek satırlık hedef.

## Çekirdek Dosyalar
- [src/index.ts]: Ana giriş
- [src/api/]: API rotaları
- [docs/]: Dokümantasyon

## Anahtar Kavramlar
- Kavram 1: Kısa açıklama
- Kavram 2: Kısa açıklama
```

### MCP-Hazır Dokümantasyon

RAG indeksleme için:
- Net H1-H3 hiyerarşisi
- Veri yapıları için JSON/YAML örnekleri
- Akışlar için Mermaid diyagramları
- Kendi kendine yeten bölümler

---

## 7. Yapı Prensipleri

| Prensip | Neden |
|-----------|-----|
| **Taranabilir** | Başlıklar, listeler, tablolar |
| **Önce örnekler** | Göster, sadece anlatma |
| **Aşamalı ayrıntı** | Basit → Karmaşık |
| **Güncel** | Eski = yanıltıcı |

---

> **Unutmayın:** Şablonlar başlangıç noktalarıdır. Projenizin ihtiyaçlarına göre uyarlayın.
