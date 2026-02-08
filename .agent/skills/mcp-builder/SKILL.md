---
name: mcp-builder
description: MCP (Model Context Protocol) server building principles. Tool design, resource patterns, best practices.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# MCP Oluşturucu

> MCP sunucuları oluşturma prensipleri.

---

## 1. MCP Genel Bakış

### MCP Nedir?

Model Context Protocol (Model Bağlam Protokolü) - AI sistemlerini harici araçlar ve veri kaynaklarıyla bağlamak için standart.

### Temel Kavramlar

| Kavram | Amaç |
|---------|---------|
| **Araçlar (Tools)** | AI'nın çağırabileceği fonksiyonlar |
| **Kaynaklar (Resources)** | AI'nın okuyabileceği veriler |
| **Promptlar** | Önceden tanımlanmış prompt şablonları |

---

## 2. Sunucu Mimarisi

### Proje Yapısı

```
my-mcp-server/
├── src/
│   └── index.ts      # Ana giriş
├── package.json
└── tsconfig.json
```

### Taşıma Tipleri

| Tip | Kullanım |
|------|-----|
| **Stdio** | Yerel, CLI tabanlı |
| **SSE** | Web tabanlı, akış (streaming) |
| **WebSocket** | Gerçek zamanlı, çift yönlü |

---

## 3. Araç Tasarım Prensipleri

### İyi Araç Tasarımı

| Prensip | Açıklama |
|-----------|-------------|
| Net isim | Eylem odaklı (get_weather, create_user) |
| Tek amaç | Bir şeyi iyi yap |
| Doğrulanmış girdi | Türler ve açıklamalar içeren şema |
| Yapılandırılmış çıktı | Tahmin edilebilir yanıt formatı |

### Girdi Şeması Tasarımı

| Alan | Zorunlu? |
|-------|-----------|
| Type | Evet - object |
| Properties | Her parametreyi tanımla |
| Required | Zorunlu parametreleri listele |
| Description | İnsan tarafından okunabilir |

---

## 4. Kaynak Desenleri

### Kaynak Türleri

| Tür | Kullanım |
|------|-----|
| Statik | Sabit veri (yapılandırma, dokümanlar) |
| Dinamik | İstek üzerine oluşturulan |
| Şablon | Parametreli URI |

### URI Desenleri

| Desen | Örnek |
|---------|---------|
| Sabit | `docs://readme` |
| Parametreli | `users://{userId}` |
| Koleksiyon | `files://project/*` |

---

## 5. Hata Yönetimi

### Hata Türleri

| Durum | Yanıt |
|-----------|----------|
| Geçersiz parametreler | Doğrulama hata mesajı |
| Bulunamadı | Net "bulunamadı" |
| Sunucu hatası | Genel hata, ayrıntıları logla |

### En İyi Uygulamalar

- Yapılandırılmış hatalar döndür
- Dahili ayrıntıları ifşa etme
- Hata ayıklama için logla
- Eyleme geçirilebilir mesajlar sağla

---

## 6. Çok Modlu (Multimodal) İşleme

### Desteklenen Türler

| Tür | Kodlama |
|------|----------|
| Metin | Düz metin |
| Görüntüler | Base64 + MIME tipi |
| Dosyalar | Base64 + MIME tipi |

---

## 7. Güvenlik Prensipleri

### Girdi Doğrulama

- Tüm araç girdilerini doğrula
- Kullanıcı tarafından sağlanan verileri temizle (sanitize)
- Kaynak erişimini sınırla

### API Anahtarları

- Ortam değişkenlerini kullan
- Sırları loglama
- İzinleri doğrula

---

## 8. Yapılandırma

### Claude Masaüstü Yapılandırması

| Alan | Amaç |
|-------|---------|
| command | Çalıştırılacak yürütülebilir dosya |
| args | Komut argümanları |
| env | Ortam değişkenleri |

---

## 9. Test Etme

### Test Kategorileri

| Tür | Odak |
|------|-------|
| Birim | Araç mantığı |
| Entegrasyon | Tam sunucu |
| Sözleşme (Contract) | Şema doğrulama |

---

## 10. En İyi Uygulamalar Kontrol Listesi

- [ ] Net, eylem odaklı araç isimleri
- [ ] Açıklamalarla eksiksiz girdi şemaları
- [ ] Yapılandırılmış JSON çıktısı
- [ ] Tüm durumlar için hata yönetimi
- [ ] Girdi doğrulama
- [ ] Ortam tabanlı yapılandırma
- [ ] Hata ayıklama için loglama

---

> **Unutmayın:** MCP araçları basit, odaklanmış ve iyi belgelenmiş olmalıdır. AI, bunları doğru kullanmak için açıklamalara güvenir.
