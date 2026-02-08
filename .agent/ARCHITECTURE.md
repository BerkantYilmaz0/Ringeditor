# Antigravity Kit Mimarisi

> Kapsamlı Yapay Zeka Ajan Yetenek Genişletme Araç Kiti

---

## 📋 Genel Bakış

Antigravity Kit, şunlardan oluşan modüler bir sistemdir:

- **19 Uzman Ajan** - Rol tabanlı yapay zeka personaları
- **36 Yetenek (Skills)** - Alana özgü bilgi modülleri
- **11 İş Akışları (Workflows)** - Slash komut prosedürleri

---

## 🏗️ Dizin Yapısı

```plaintext
.agent/
├── ARCHITECTURE.md          # Bu dosya
├── agents/                  # 19 Uzman Ajan
├── skills/                  # 36 Yetenek
├── workflows/               # 11 Slash Komutu
├── rules/                   # Global Kurallar
└── scripts/                 # Ana Doğrulama Scriptleri
```

---

## 🤖 Ajanlar (19)

Farklı alanlar için uzman yapay zeka personaları.

| Ajan | Odak | Kullanılan Yetenekler |
| ----- | ----- | ----------- |
| `orchestrator` | Çoklu ajan koordinasyonu | parallel-agents, behavioral-modes |
| `project-planner` | Keşif, görev planlama | brainstorming, plan-writing, architecture |
| `frontend-specialist` | Web UI/UX | frontend-design, react-patterns, tailwind-patterns |
| `backend-specialist` | API, iş mantığı | api-patterns, nodejs-best-practices, database-design |
| `database-architect` | Şema, SQL | database-design, prisma-expert |
| `mobile-developer` | iOS, Android, RN | mobile-design |
| `game-developer` | Oyun mantığı, mekanikler | game-development |
| `devops-engineer` | CI/CD, Docker | deployment-procedures, docker-expert |
| `security-auditor` | Güvenlik uyumluluğu | vulnerability-scanner, red-team-tactics |
| `penetration-tester` | Ofansif güvenlik | red-team-tactics |
| `test-engineer` | Test stratejileri | testing-patterns, tdd-workflow, webapp-testing |
| `debugger` | Kök neden analizi | systematic-debugging |
| `performance-optimizer` | Hız, Web Vitals | performance-profiling |
| `seo-specialist` | Sıralama, görünürlük | seo-fundamentals, geo-fundamentals |
| `documentation-writer` | Kılavuzlar, dokümanlar | documentation-templates |
| `product-manager` | Gereksinimler, kullanıcı hikayeleri | plan-writing, brainstorming |
| `qa-automation-engineer` | E2E testi, CI hatları | webapp-testing, testing-patterns |
| `code-archaeologist` | Eski kod (Legacy), refactoring | clean-code, code-review-checklist |
| `explorer-agent` | Kod tabanı analizi | - |

---

## 🧩 Yetenekler / Skills (36)

Ajanların görev bağlamına göre talep üzerine yükleyebileceği modüler bilgi alanları.

### Frontend & UI

| Yetenek | Açıklama |
| ----- | ----------- |
| `react-patterns` | React hook'ları, durum yönetimi, performans |
| `nextjs-best-practices` | App Router, Sunucu Bileşenleri |
| `tailwind-patterns` | Tailwind CSS v4 yardımcı araçları |
| `frontend-design` | UI/UX desenleri, tasarım sistemleri |
| `ui-ux-pro-max` | 50 stil, 21 palet, 50 yazı tipi |

### Backend & API

| Yetenek | Açıklama |
| ----- | ----------- |
| `api-patterns` | REST, GraphQL, tRPC |
| `nestjs-expert` | NestJS modülleri, DI, dekoratörler |
| `nodejs-best-practices` | Node.js asenkron yapı, modüller |
| `python-patterns` | Python standartları, FastAPI |

### Veritabanı

| Yetenek | Açıklama |
| ----- | ----------- |
| `database-design` | Şema tasarımı, optimizasyon |
| `prisma-expert` | Prisma ORM, migrasyonlar |

### TypeScript/JavaScript

| Yetenek | Açıklama |
| ----- | ----------- |
| `typescript-expert` | Tip seviyesinde programlama, performans |

### Bulut & Altyapı

| Yetenek | Açıklama |
| ----- | ----------- |
| `docker-expert` | Konteynerleştirme, Compose |
| `deployment-procedures` | CI/CD, dağıtım iş akışları |
| `server-management` | Altyapı yönetimi |

### Test & Kalite

| Yetenek | Açıklama |
| ----- | ----------- |
| `testing-patterns` | Jest, Vitest, stratejiler |
| `webapp-testing` | E2E, Playwright |
| `tdd-workflow` | Test odaklı geliştirme |
| `code-review-checklist` | Kod inceleme standartları |
| `lint-and-validate` | Linting, doğrulama |

### Güvenlik

| Yetenek | Açıklama |
| ----- | ----------- |
| `vulnerability-scanner` | Güvenlik denetimi, OWASP |
| `red-team-tactics` | Ofansif güvenlik |

### Mimari & Planlama

| Yetenek | Açıklama |
| ----- | ----------- |
| `app-builder` | Full-stack uygulama iskeleti oluşturma |
| `architecture` | Sistem tasarım desenleri |
| `plan-writing` | Görev planlama, kırılım |
| `brainstorming` | Sokratik sorgulama |

### Mobil

| Yetenek | Açıklama |
| ----- | ----------- |
| `mobile-design` | Mobil UI/UX desenleri |

### Oyun Geliştirme

| Yetenek | Açıklama |
| ----- | ----------- |
| `game-development` | Oyun mantığı, mekanikler |

### SEO & Büyüme

| Yetenek | Açıklama |
| ----- | ----------- |
| `seo-fundamentals` | SEO, E-E-A-T, Core Web Vitals |
| `geo-fundamentals` | Yapay zeka optimizasyonu (GenAI) |

### Shell/CLI

| Yetenek | Açıklama |
| ----- | ----------- |
| `bash-linux` | Linux komutları, betik yazma |
| `powershell-windows` | Windows PowerShell |

### Diğer

| Yetenek | Açıklama |
| ----- | ----------- |
| `clean-code` | Kodlama standartları (Global) |
| `behavioral-modes` | Ajan personaları |
| `parallel-agents` | Çoklu ajan desenleri |
| `mcp-builder` | Model Bağlam Protokolü (MCP) |
| `documentation-templates` | Doküman formatları |
| `i18n-localization` | Uluslararasılaştırma |
| `performance-profiling` | Web Vitals, optimizasyon |
| `systematic-debugging` | Sorun giderme |

---

## 🔄 İş Akışları / Workflows (11)

Slash komut prosedürleri. `/komut` ile çağırın.

| Komut | Açıklama |
| ------- | ----------- |
| `/brainstorm` | Sokratik keşif |
| `/create` | Yeni özellikler oluşturma |
| `/debug` | Sorunları giderme |
| `/deploy` | Uygulamayı dağıtma |
| `/enhance` | Mevcut kodu iyileştirme |
| `/orchestrate` | Çoklu ajan koordinasyonu |
| `/plan` | Görev kırılımı |
| `/preview` | Değişiklikleri önizleme |
| `/status` | Proje durumunu kontrol etme |
| `/test` | Testleri çalıştırma |
| `/ui-ux-pro-max` | 50 stil ile tasarım yapma |

---

## 🎯 Yetenek Yükleme Protokolü

```plaintext
Kullanıcı İsteği → Yetenek Açıklaması Eşleşmesi → SKILL.md Yükle
                                                    ↓
                                            referansları oku (references/)
                                                    ↓
                                            scriptleri oku (scripts/)
```

### Yetenek Yapısı

```plaintext
skill-name/
├── SKILL.md           # (Zorunlu) Metadata & talimatlar
├── scripts/           # (İsteğe bağlı) Python/Bash scriptleri
├── references/        # (İsteğe bağlı) Şablonlar, dokümanlar
└── assets/            # (İsteğe bağlı) Görseller, logolar
```

### Gelişmiş Yetenekler (scripts/references ile)

| Yetenek | Dosyalar | Kapsam |
| ----- | ----- | -------- |
| `typescript-expert` | 5 | Utility tipleri, tsconfig, kopya kağıdı |
| `ui-ux-pro-max` | 27 | 50 stil, 21 palet, 50 yazı tipi |
| `app-builder` | 20 | Full-stack iskelet oluşturma |

---

## 📜 Scriptler (2)

Yetenek seviyesindeki scriptleri koordine eden ana doğrulama scriptleri.

### Ana Scriptler

| Script | Amaç | Ne Zaman Kullanılır |
| ------ | ------- | ----------- |
| `checklist.py` | Öncelik tabanlı doğrulama (Çekirdek kontroller) | Geliştirme, commit öncesi |
| `verify_all.py` | Kapsamlı doğrulama (Tüm kontroller) | Dağıtım öncesi, sürümler |

### Kullanım

```bash
# Geliştirme sırasında hızlı doğrulama
python .agent/scripts/checklist.py .

# Dağıtım öncesi tam doğrulama
python .agent/scripts/verify_all.py . --url http://localhost:3000
```

### Neleri Kontrol Ederler

**checklist.py** (Çekirdek kontroller):

- Güvenlik (açıklar, sırlar)
- Kod Kalitesi (lint, tipler)
- Şema Doğrulama
- Test Paketi
- UX Denetimi
- SEO Kontrolü

**verify_all.py** (Tam paket):

- checklist.py içindeki her şey ARTI:
- Lighthouse (Core Web Vitals)
- Playwright E2E
- Bundle Analizi
- Mobil Denetimi
- i18n Kontrolü

Detaylar için, bkz. [scripts/README.md](scripts/README.md)

---

## 📊 İstatistikler

| Metrik | Değer |
| ------ | ----- |
| **Toplam Ajan** | 19 |
| **Toplam Yetenek** | 36 |
| **Toplam İş Akışı** | 11 |
| **Toplam Script** | 2 (ana) + 18 (yetenek seviyesi) |
| **Kapsam** | ~%90 web/mobil geliştirme |

---

## 🔗 Hızlı Referans

| İhtiyaç | Ajan | Yetenekler |
| ---- | ----- | ------ |
| Web Uygulaması | `frontend-specialist` | react-patterns, nextjs-best-practices |
| API | `backend-specialist` | api-patterns, nodejs-best-practices |
| Mobil | `mobile-developer` | mobile-design |
| Veritabanı | `database-architect` | database-design, prisma-expert |
| Güvenlik | `security-auditor` | vulnerability-scanner |
| Test | `test-engineer` | testing-patterns, webapp-testing |
| Debug | `debugger` | systematic-debugging |
| Plan | `project-planner` | brainstorming, plan-writing |
