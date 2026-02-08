---
description: Karmaşık görevler için birden fazla ajanı koordine edin. Çok perspektifli analiz, kapsamlı incelemeler veya farklı alan uzmanlığı gerektiren görevler için kullanın.
---

# Çoklu Ajan Orkestrasyonu

Artık **ORKESTRASYON MODU**ndasınız. Göreviniz: bu karmaşık sorunu çözmek için uzmanlaşmış ajanları koordine etmek.

## Orkestra Edilecek Görev
$ARGUMENTS

---

## 🔴 KRİTİK: Minimum Ajan Gereksinimi

> ⚠️ **ORKESTRASYON = MİNİMUM 3 FARKLI AJAN**
> 
> 3'ten az ajan kullanırsanız, orkestrasyon yapmıyorsunuz demektir - sadece devrediyorsunuzdur.
> 
> **Tamamlamadan önce doğrulama:**
> - Çağrılan ajanları sayın
> - Eğer `ajan_sayisi < 3` ise → DURUN ve daha fazla ajan çağırın
> - Tek ajan = Orkestrasyon BAŞARISIZLIĞI

### Ajan Seçim Matrisi

| Görev Türü | GEREKLİ Ajanlar (minimum) |
|-----------|---------------------------|
| **Web Uygulaması** | frontend-specialist, backend-specialist, test-engineer |
| **API** | backend-specialist, security-auditor, test-engineer |
| **UI/Tasarım** | frontend-specialist, seo-specialist, performance-optimizer |
| **Veritabanı** | database-architect, backend-specialist, security-auditor |
| **Full Stack** | project-planner, frontend-specialist, backend-specialist, devops-engineer |
| **Hata Ayıklama** | debugger, explorer-agent, test-engineer |
| **Güvenlik** | security-auditor, penetration-tester, devops-engineer |

---

## Uçuş Öncesi: Mod Kontrolü

| Mevcut Mod | Görev Türü | Eylem |
|--------------|-----------|--------|
| **plan** | Herhangi | ✅ Önce planlama yaklaşımıyla devam et |
| **edit** | Basit yürütme | ✅ Doğrudan devam et |
| **edit** | Karmaşık/çoklu dosya | ⚠️ Sor: "Bu görev planlama gerektiriyor. Plan moduna geçilsin mi?" |
| **ask** | Herhangi | ⚠️ Sor: "Orkestrasyona hazır. Edit veya plan moduna geçilsin mi?" |

---

## 🔴 KATI 2 AŞAMALI ORKESTRASYON

### AŞAMA 1: PLANLAMA (Sıralı - paralel ajan YOK)

| Adım | Ajan | Eylem |
|------|-------|--------|
| 1 | `project-planner` | docs/PLAN.md oluştur |
| 2 | (isteğe bağlı) `explorer-agent` | Gerekirse kod tabanı keşfi |

> 🔴 **Planlama sırasında BAŞKA AJAN YOK!** Sadece project-planner ve explorer-agent.

### ⏸️ KONTROL NOKTASI: Kullanıcı Onayı

```
PLAN.md tamamlandıktan sonra SORUN:

"✅ Plan oluşturuldu: docs/PLAN.md

Onaylıyor musunuz? (E/H)
- E: Uygulama başlatılır
- H: Planı düzeltirim"
```

> 🔴 **Kullanıcı onayı olmadan Aşama 2'ye GEÇMEYİN!**

### AŞAMA 2: UYGULAMA (Onaydan sonra paralel ajanlar)

| Paralel Grup | Ajanlar |
|----------------|--------|
| Temel | `database-architect`, `security-auditor` |
| Çekirdek | `backend-specialist`, `frontend-specialist` |
| Cilalama | `test-engineer`, `devops-engineer` |

> ✅ Kullanıcı onayından sonra birden fazla ajanı PARALEL olarak çağırın.

## Mevcut Ajanlar (Toplam 17)

| Ajan | Alan | Ne Zaman Kullanılır |
|-------|--------|----------|
| `project-planner` | Planlama | Görev dağılımı, PLAN.md |
| `explorer-agent` | Keşif | Kod tabanı haritalama |
| `frontend-specialist` | UI/UX | React, Vue, CSS, HTML |
| `backend-specialist` | Sunucu | API, Node.js, Python |
| `database-architect` | Veri | SQL, NoSQL, Şema |
| `security-auditor` | Güvenlik | Güvenlik açıkları, Auth |
| `penetration-tester` | Güvenlik | Aktif test |
| `test-engineer` | Test | Birim, E2E, Kapsama |
| `devops-engineer` | Ops | CI/CD, Docker, Dağıtım |
| `mobile-developer` | Mobil | React Native, Flutter |
| `performance-optimizer` | Hız | Lighthouse, Profilleme |
| `seo-specialist` | SEO | Meta, Şema, Sıralamalar |
| `documentation-writer` | Dokümanlar | README, API dokümanları |
| `debugger` | Hata Ayıklama | Hata analizi |
| `game-developer` | Oyunlar | Unity, Godot |
| `orchestrator` | Meta | Koordinasyon |

---

## Orkestrasyon Protokolü

### Adım 1: Görev Alanlarını Analiz Et
Bu görevin dokunduğu TÜM alanları belirleyin:
```
□ Güvenlik     → security-auditor, penetration-tester
□ Backend/API  → backend-specialist
□ Frontend/UI  → frontend-specialist
□ Veritabanı   → database-architect
□ Test         → test-engineer
□ DevOps       → devops-engineer
□ Mobil        → mobile-developer
□ Performans   → performance-optimizer
□ SEO          → seo-specialist
□ Planlama     → project-planner
```

### Adım 2: Aşama Tespiti

| Plan Varsa | Eylem |
|----------------|--------|
| `docs/PLAN.md` YOK | → AŞAMA 1'e git (sadece planlama) |
| `docs/PLAN.md` VAR + kullanıcı onaylı | → AŞAMA 2'ye git (uygulama) |

### Adım 3: Aşamaya Göre Yürüt

**AŞAMA 1 (Planlama):**
```
PLAN.md oluşturmak için project-planner ajanını kullan
→ Plan oluşturulduktan sonra DUR
→ Kullanıcıdan onay İSTE
```

**AŞAMA 2 (Uygulama - onaydan sonra):**
```
Ajanları PARALEL çağır:
[görev] için frontend-specialist ajanını kullan
[görev] için backend-specialist ajanını kullan
[görev] için test-engineer ajanını kullan
```

**🔴 KRİTİK: Bağlam Aktarımı (ZORUNLU)**

HERHANGİ bir alt ajanı çağırırken şunları eklemelisiniz:

1. **Orijinal Kullanıcı İsteği:** Kullanıcının sorduğu tam metin
2. **Alınan Kararlar:** Sokratik sorulara verilen tüm kullanıcı yanıtları
3. **Önceki Ajan Çalışması:** Önceki ajanların yaptıklarının özeti
4. **Mevcut Plan Durumu:** Çalışma alanında plan dosyaları varsa, bunları ekleyin

**TAM bağlamlı örnek:**
```
PLAN.md oluşturmak için project-planner ajanını kullan:

**BAĞLAM:**
- Kullanıcı İsteği: "Öğrenciler için sosyal platform, mock data ile"
- Kararlar: Teknoloji=Vue 3, Düzen=Grid Widget, Auth=Mock, Tasarım=Genç Dinamik
- Önceki Çalışma: Orkestratör 6 soru sordu, kullanıcı tüm seçenekleri seçti
- Mevcut Plan: playful-roaming-dream.md çalışma alanında başlangıç yapısıyla mevcut

**GÖREV:** YUKARIDAKİ kararlara dayanarak detaylı PLAN.md oluştur. Klasör adından çıkarım YAPMA.
```

> ⚠️ **İHLAL:** Tam bağlam olmadan alt ajan çağırmak = alt ajan yanlış varsayımlarda bulunacaktır!


### Adım 4: Doğrulama (ZORUNLU)
SON ajan uygun doğrulama scriptlerini çalıştırmalıdır:
```bash
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .
python .agent/skills/lint-and-validate/scripts/lint_runner.py .
```

### Adım 5: Sonuçları Sentezle
Tüm ajan çıktılarını tek bir raporda birleştirin.

---

## Çıktı Formatı

```markdown
## 🎼 Orkestrasyon Raporu

### Görev
[Orijinal görev özeti]

### Mod
[Mevcut mod: plan/edit/ask]

### Çağrılan Ajanlar (MİNİMUM 3)
| # | Ajan | Odak Alanı | Durum |
|---|-------|------------|--------|
| 1 | project-planner | Görev dağılımı | ✅ |
| 2 | frontend-specialist | UI uygulaması | ✅ |
| 3 | test-engineer | Doğrulama scriptleri | ✅ |

### Yürütülen Doğrulama Scriptleri
- [x] security_scan.py → Başarılı/Başarısız
- [x] lint_runner.py → Başarılı/Başarısız

### Temel Bulgular
1. **[Ajan 1]**: Bulgu
2. **[Ajan 2]**: Bulgu
3. **[Ajan 3]**: Bulgu

### Teslimatlar
- [ ] PLAN.md oluşturuldu
- [ ] Kod uygulandı
- [ ] Testler geçiyor
- [ ] Scriptler doğrulandı

### Özet
[Tüm ajan çalışmalarının bir paragraflık sentezi]
```

---

## 🔴 ÇIKIŞ KAPISI

Orkestrasyonu tamamlamadan önce doğrulayın:

1. ✅ **Ajan Sayısı:** `cagrilan_ajanlar >= 3`
2. ✅ **Yürütülen Scriptler:** En az `security_scan.py` çalıştı
3. ✅ **Oluşturulan Rapor:** Tüm ajanların listelendiği Orkestrasyon Raporu

> **Herhangi bir kontrol başarısız olursa → Orkestrasyonu tamamlandı olarak İŞARETLEMEYİN. Daha fazla ajan çağırın veya script çalıştırın.**

---

**Orkestrasyona şimdi başlayın. 3+ ajan seçin, sıralı yürütün, doğrulama scriptlerini çalıştırın, sonuçları sentezleyin.**
