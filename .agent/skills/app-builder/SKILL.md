---
name: app-builder
description: Ana uygulama oluşturma orkestratörü. Doğal dil isteklerinden tam yığın (full-stack) uygulamalar oluşturur. Proje türünü belirler, teknoloji yığınını seçer, ajanları koordine eder.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent
---

# Uygulama Oluşturucu - Uygulama Oluşturma Orkestratörü

> Kullanıcının isteklerini analiz eder, teknoloji yığınını belirler, yapıyı planlar ve ajanları koordine eder.

## 🎯 Seçici Okuma Kuralı

**SADECE istekle ilgili dosyaları okuyun!** İçerik haritasını kontrol edin, ihtiyacınız olanı bulun.

| Dosya | Açıklama | Ne Zaman Okunmalı |
|------|-------------|--------------|
| `project-detection.md` | Anahtar kelime matrisi, proje türü tespiti | Yeni projeye başlarken |
| `tech-stack.md` | 2025 varsayılan yığını, alternatifler | Teknoloji seçerken |
| `agent-coordination.md` | Ajan boru hattı, yürütme sırası | Çoklu ajan çalışmasını koordine ederken |
| `scaffolding.md` | Dizin yapısı, çekirdek dosyalar | Proje yapısı oluştururken |
| `feature-building.md` | Özellik analizi, hata yönetimi | Mevcut projeye özellik eklerken |
| `templates/SKILL.md` | **Proje şablonları** | Yeni proje iskelesi kurarken |

---

## 📦 Şablonlar (13)

Yeni projeler için hızlı başlangıç iskelesi. **Sadece eşleşen şablonu okuyun!**

| Şablon | Teknoloji Yığını | Ne Zaman Kullanılır |
|----------|------------|-------------|
| [nextjs-fullstack](templates/nextjs-fullstack/TEMPLATE.md) | Next.js + Prisma | Full-stack web uygulaması |
| [nextjs-saas](templates/nextjs-saas/TEMPLATE.md) | Next.js + Stripe | SaaS ürünü |
| [nextjs-static](templates/nextjs-static/TEMPLATE.md) | Next.js + Framer | Açılış sayfası (Landing page) |
| [nuxt-app](templates/nuxt-app/TEMPLATE.md) | Nuxt 3 + Pinia | Vue full-stack uygulaması |
| [express-api](templates/express-api/TEMPLATE.md) | Express + JWT | REST API |
| [python-fastapi](templates/python-fastapi/TEMPLATE.md) | FastAPI | Python API |
| [react-native-app](templates/react-native-app/TEMPLATE.md) | Expo + Zustand | Mobil uygulama |
| [flutter-app](templates/flutter-app/TEMPLATE.md) | Flutter + Riverpod | Çapraz platform mobil |
| [electron-desktop](templates/electron-desktop/TEMPLATE.md) | Electron + React | Masaüstü uygulaması |
| [chrome-extension](templates/chrome-extension/TEMPLATE.md) | Chrome MV3 | Tarayıcı uzantısı |
| [cli-tool](templates/cli-tool/TEMPLATE.md) | Node.js + Commander | CLI uygulaması |
| [monorepo-turborepo](templates/monorepo-turborepo/TEMPLATE.md) | Turborepo + pnpm | Monorepo |

---

## 🔗 İlgili Ajanlar

| Ajan | Rol |
|-------|------|
| `project-planner` | Görev kırılımı, bağımlılık grafiği |
| `frontend-specialist` | UI bileşenleri, sayfalar |
| `backend-specialist` | API, iş mantığı |
| `database-architect` | Şema, migrasyonlar |
| `devops-engineer` | Dağıtım, önizleme |

---

## Kullanım Örneği

```
Kullanıcı: "Fotoğraf paylaşımı ve beğenileri olan bir Instagram klonu yap"

App Builder Süreci:
1. Proje türü: Sosyal Medya Uygulaması
2. Teknoloji yığını: Next.js + Prisma + Cloudinary + Clerk
3. Plan oluştur:
   ├─ Veritabanı şeması (kullanıcılar, gönderiler, beğeniler, takipler)
   ├─ API rotaları (12 uç nokta)
   ├─ Sayfalar (akış, profil, yükleme)
   └─ Bileşenler (PostCard, Feed, LikeButton)
4. Ajanları koordine et
5. İlerlemeyi raporla
6. Önizlemeyi başlat
```
