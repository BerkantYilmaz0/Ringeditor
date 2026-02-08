---
name: api-patterns
description: API tasarım ilkeleri ve karar verme. REST vs GraphQL vs tRPC seçimi, yanıt formatları, sürümleme, sayfalandırma.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# API Desenleri

> 2025 için API tasarım ilkeleri ve karar verme.
> **DÜŞÜNMEYİ öğrenin, sabit kalıpları kopyalamayı değil.**

## 🎯 Seçici Okuma Kuralı

**SADECE istekle ilgili dosyaları okuyun!** İçerik haritasını kontrol edin, ihtiyacınız olanı bulun.

---

## 📑 İçerik Haritası

| Dosya | Açıklama | Ne Zaman Okunmalı |
|------|-------------|--------------|
| `api-style.md` | REST vs GraphQL vs tRPC karar ağacı | API türünü seçerken |
| `rest.md` | Kaynak isimlendirme, HTTP metodları, durum kodları | REST API tasarlarken |
| `response.md` | Zarf deseni (Envelope pattern), hata formatı, sayfalandırma | Yanıt yapısı |
| `graphql.md` | Şema tasarımı, ne zaman kullanılır, güvenlik | GraphQL değerlendirirken |
| `trpc.md` | TypeScript monorepo, tip güvenliği | TS fullstack projeler |
| `versioning.md` | URI/Header/Query sürümleme | API evrimini planlama |
| `auth.md` | JWT, OAuth, Passkey, API Anahtarları | Auth deseni seçimi |
| `rate-limiting.md` | Jeton kovası (Token bucket), kayan pencere | API koruması |
| `documentation.md` | OpenAPI/Swagger en iyi uygulamalar | Dokümantasyon |
| `security-testing.md` | OWASP API Top 10, auth/authz testi | Güvenlik denetimleri |

---

## 🔗 İlgili Yetenekler

| İhtiyaç | Yetenek |
|------|-------|
| API uygulaması | `@[skills/backend-development]` |
| Veri yapısı | `@[skills/database-design]` |
| Güvenlik detayları | `@[skills/security-hardening]` |

---

## ✅ Karar Kontrol Listesi

Bir API tasarlamadan önce:

- [ ] **Kullanıcıya API tüketicileri soruldu mu?**
- [ ] **BU bağlam için API stili seçildi mi?** (REST/GraphQL/tRPC)
- [ ] **Tutarlı yanıt formatı tanımlandı mı?**
- [ ] **Sürümleme stratejisi planlandı mı?**
- [ ] **Kimlik doğrulama ihtiyaçları düşünüldü mü?**
- [ ] **Hız sınırlaması (rate limiting) planlandı mı?**
- [ ] **Dokümantasyon yaklaşımı tanımlandı mı?**

---

## ❌ Anti-Desenler

**YAPMA:**
- Her şey için varsayılan olarak REST kullanma
- REST uç noktalarında fiil kullanma (/getUsers)
- Tutarsız yanıt formatları döndürme
- Dahili hataları istemcilere gösterme
- Hız sınırlamasını atlama

**YAP:**
- Bağlama göre API stili seç
- İstemci gereksinimlerini sor
- Kapsamlı bir şekilde belgele
- Uygun durum kodları kullan

---

## Script

| Script | Amaç | Komut |
|--------|---------|---------|
| `scripts/api_validator.py` | API uç noktası doğrulama | `python scripts/api_validator.py <project_path>` |
