---
name: architecture
description: Mimari karar verme çerçevesi. Gereksinim analizi, takas (trade-off) değerlendirmesi, ADR dokümantasyonu. Mimari kararlar alırken veya sistem tasarımını analiz ederken kullanın.
allowed-tools: Read, Glob, Grep
---

# Mimari Karar Çerçevesi

> "Gereksinimler mimariyi yönlendirir. Takaslar (Trade-offs) kararları bilgilendirir. ADR'ler mantığı yakalar."

## 🎯 Seçici Okuma Kuralı

**SADECE istekle ilgili dosyaları okuyun!** İçerik haritasını kontrol edin, ihtiyacınız olanı bulun.

| Dosya | Açıklama | Ne Zaman Okunmalı |
|------|-------------|--------------|
| `context-discovery.md` | Sorulacak sorular, proje sınıflandırması | Mimari tasarımına başlarken |
| `trade-off-analysis.md` | ADR şablonları, takas çerçevesi | Kararları belgelerken |
| `pattern-selection.md` | Karar ağaçları, anti-desenler | Desen seçerken |
| `examples.md` | MVP, SaaS, Kurumsal örnekler | Referans uygulamaları |
| `patterns-reference.md` | Desenler için hızlı bakış | Desen karşılaştırması |

---

## 🔗 İlgili Yetenekler

| Yetenek | Kullanım Amacı |
|-------|---------|
| `@[skills/database-design]` | Veritabanı şema tasarımı |
| `@[skills/api-patterns]` | API tasarım desenleri |
| `@[skills/deployment-procedures]` | Dağıtım mimarisi |

---

## Temel Prensip

**"Basitlik en üst düzey karmaşıklıktır."**

- Basit başla
- SADECE kanıtlanmış bir şekilde gerekliyse karmaşıklık ekle
- Desenleri her zaman daha sonra ekleyebilirsin
- Karmaşıklığı kaldırmak, eklemekten ÇOK daha zordur

---

## Doğrulama Kontrol Listesi

Mimariyi kesinleştirmeden önce:

- [ ] Gereksinimler açıkça anlaşıldı
- [ ] Kısıtlamalar belirlendi
- [ ] Her kararın takas analizi var
- [ ] Daha basit alternatifler düşünüldü
- [ ] Önemli kararlar için ADR'ler yazıldı
- [ ] Ekip uzmanlığı seçilen desenlerle eşleşiyor
