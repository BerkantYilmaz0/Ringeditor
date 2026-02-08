---
name: parallel-agents
description: Multi-agent orchestration patterns. Use when multiple independent tasks can run with different domain expertise or when comprehensive analysis requires multiple perspectives.
allowed-tools: Read, Glob, Grep
---

# Yerel Paralel Ajanlar

> Claude Code'un yerleşik Agent Aracı aracılığıyla orkestrasyon

## Genel Bakış

Bu yetenek, Claude Code'un yerel ajan sistemi aracılığıyla birden fazla uzmanlaşmış ajanı koordine etmeyi sağlar. Harici komut dosyalarının aksine, bu yaklaşım tüm orkestrasyonu Claude'un kontrolü altında tutar.

## Orkestrasyon Ne Zaman Kullanılır

✅ **Şunlar İçin İyi:**
- Birden fazla uzmanlık alanı gerektiren karmaşık görevler
- Güvenlik, performans ve kalite perspektiflerinden kod analizi
- Kapsamlı incelemeler (mimari + güvenlik + test)
- Backend + frontend + veritabanı çalışması gerektiren özellik uygulaması

❌ **Şunlar İçin Değil:**
- Basit, tek alanlı görevler
- Hızlı düzeltmeler veya küçük değişiklikler
- Tek bir ajanın yeterli olduğu görevler

---

## Yerel Ajan Çağrısı

### Tek Ajan
```
Kimlik doğrulamasını incelemek için security-auditor ajanını kullan
```

### Sıralı Zincir
```
Önce, proje yapısını keşfetmek için explorer-agent kullan.
Sonra, API uç noktalarını incelemek için backend-specialist kullan.
Son olarak, test boşluklarını belirlemek için test-engineer kullan.
```

### Bağlam Aktarımı İle
```
React bileşenlerini analiz etmek için frontend-specialist kullan.
Bu bulgulara dayanarak, test-engineer'a bileşen testleri oluşturttur.
```

### Önceki İşe Devam Et
```
[agentId] ajanını sürdür ve ek gereksinimlerle devam et.
```

---

## Orkestrasyon Desenleri

### Desen 1: Kapsamlı Analiz
```
Ajanlar: explorer-agent → [alan-ajanları] → sentez

1. explorer-agent: Kod tabanı yapısını haritala
2. security-auditor: Güvenlik duruşu
3. backend-specialist: API kalitesi
4. frontend-specialist: UI/UX desenleri
5. test-engineer: Test kapsamı
6. Tüm bulguları sentezle
```

### Desen 2: Özellik İncelemesi
```
Ajanlar: etkilenen-alan-ajanları → test-engineer

1. Etkilenen alanları belirle (backend? frontend? her ikisi?)
2. İlgili alan ajanlarını çağır
3. test-engineer değişiklikleri doğrular
4. Önerileri sentezle
```

### Desen 3: Güvenlik Denetimi
```
Ajanlar: security-auditor → penetration-tester → sentez

1. security-auditor: Yapılandırma ve kod incelemesi
2. penetration-tester: Aktif güvenlik açığı testi
3. Önceliklendirilmiş iyileştirme ile sentezle
```

---

## Mevcut Ajanlar

| Ajan | Uzmanlık | Tetikleyici İfadeler |
|-------|-----------|-----------------|
| `orchestrator` | Koordinasyon | "kapsamlı" (comprehensive), "çok perspektifli" (multi-perspective) |
| `security-auditor` | Güvenlik | "security", "auth", "vulnerabilities" |
| `penetration-tester` | Güvenlik Testi | "pentest", "red team", "exploit" |
| `backend-specialist` | Backend | "API", "server", "Node.js", "Express" |
| `frontend-specialist` | Frontend | "React", "UI", "components", "Next.js" |
| `test-engineer` | Test Etme | "tests", "coverage", "TDD" |
| `devops-engineer` | DevOps | "deploy", "CI/CD", "infrastructure" |
| `database-architect` | Veritabanı | "schema", "Prisma", "migrations" |
| `mobile-developer` | Mobil | "React Native", "Flutter", "mobile" |
| `api-designer` | API Tasarımı | "REST", "GraphQL", "OpenAPI" |
| `debugger` | Hata Ayıklama | "bug", "error", "not working" |
| `explorer-agent` | Keşif | "explore", "map", "structure" |
| `documentation-writer` | Dokümantasyon | "write docs", "create README", "generate API docs" |
| `performance-optimizer` | Performans | "slow", "optimize", "profiling" |
| `project-planner` | Planlama | "plan", "roadmap", "milestones" |
| `seo-specialist` | SEO | "SEO", "meta tags", "search ranking" |
| `game-developer` | Oyun Geliştirme | "game", "Unity", "Godot", "Phaser" |

---

## Claude Code Yerleşik Ajanları

Bunlar özel ajanlarla birlikte çalışır:

| Ajan | Model | Amaç |
|-------|-------|---------|
| **Explore** | Haiku | Hızlı salt okunur kod tabanı araması |
| **Plan** | Sonnet | Plan modu sırasında araştırma |
| **Genel amaçlı** | Sonnet | Karmaşık çok adımlı değişiklikler |

Hızlı aramalar için **Explore**, alan uzmanlığı için **özel ajanlar** kullanın.

---

## Sentez Protokolü

Tüm ajanlar tamamlandıktan sonra sentezleyin:

```markdown
## Orkestrasyon Sentezi

### Görev Özeti
[Ne başarıldı]

### Ajan Katkıları
| Ajan | Bulgu |
|-------|---------|
| security-auditor | X Buldu |
| backend-specialist | Y Belirledi |

### Birleştirilmiş Öneriler
1. **Kritik**: [Ajan A'dan sorun]
2. **Önemli**: [Ajan B'den sorun]
3. **Olsa iyi olur**: [Ajan C'den geliştirme]

### Aksiyon Öğeleri
- [ ] Kritik güvenlik sorununu düzelt
- [ ] API uç noktasını yeniden düzenle (refactor)
- [ ] Eksik testleri ekle
```

---

## En İyi Uygulamalar

1. **Mevcut ajanlar** - 17 uzmanlaşmış ajan orkestre edilebilir
2. **Mantıksal sıra** - Keşif → Analiz → Uygulama → Test Etme
3. **Bağlamı paylaş** - İlgili bulguları sonraki ajanlara aktar
4. **Tek sentez** - Ayrı çıktılar değil, tek bir birleşik rapor
5. **Değişiklikleri doğrulayın** - Kod değişiklikleri için her zaman test-engineer'ı dahil edin

---

## Temel Faydalar

- ✅ **Tek oturum** - Tüm ajanlar bağlamı paylaşır
- ✅ **AI kontrollü** - Claude otonom olarak orkestre eder
- ✅ **Yerel entegrasyon** - Yerleşik Explore, Plan ajanları ile çalışır
- ✅ **Devam etme desteği** - Önceki ajan çalışmalarına devam edebilir
- ✅ **Bağlam aktarımı** - Bulgular ajanlar arasında akar
