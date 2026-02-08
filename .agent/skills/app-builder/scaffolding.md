# Proje İskelesi (Scaffolding)

> Yeni projeler için dizin yapısı ve temel dosyalar.

---

## Next.js Full-Stack Yapısı (2025 Optimize Edilmiş)

```
project-name/
├── src/
│   ├── app/                        # Sadece rotalar (ince katman)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/                 # Rota grubu - auth sayfaları
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/            # Rota grubu - dashboard düzeni
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── [resource]/route.ts
│   │   
│   ├── features/                   # Özellik tabanlı modüller
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── actions.ts          # Server Eylemleri
│   │   │   ├── queries.ts          # Veri getirme
│   │   │   └── types.ts
│   │   ├── products/
│   │   │   ├── components/
│   │   │   ├── actions.ts
│   │   │   └── queries.ts
│   │   └── cart/
│   │       └── ...
│   │   
│   ├── shared/                     # Paylaşılan araçlar
│   │   ├── components/ui/          # Yeniden kullanılabilir UI bileşenleri
│   │   ├── lib/                    # Utils, yardımcılar
│   │   └── hooks/                  # Global hooklar
│   │   
│   └── server/                     # Sadece sunucu kodu
│       ├── db/                     # Veritabanı istemcisi (Prisma)
│       ├── auth/                   # Auth yapılandırması
│       └── services/               # Harici API entegrasyonları
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── public/
├── .env.example
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Yapı Prensipleri

| Prensip | Uygulama |
|-----------|----------------|
| **Özellik izolasyonu** | Her özellik `features/` içinde kendi bileşenleri, hookları, eylemleriyle |
| **Sunucu/İstemci ayrımı** | Sadece sunucu kodu `server/` içinde, yanlışlıkla istemci içe aktarmalarını önler |
| **İnce rotalar** | `app/` sadece yönlendirme için, mantık `features/` içinde yaşar |
| **Rota grupları** | URL etkisi olmadan düzen paylaşımı için `(groupName)/` |
| **Paylaşılan kod** | Gerçekten yeniden kullanılabilir UI ve araçlar için `shared/` |

---

## Temel Dosyalar

| Dosya | Amaç |
|------|---------|
| `package.json` | Bağımlılıklar |
| `tsconfig.json` | TypeScript + yol takma adları (`@/features/*`) |
| `tailwind.config.ts` | Tailwind yapılandırması |
| `.env.example` | Ortam şablonu |
| `README.md` | Proje dokümantasyonu |
| `.gitignore` | Git yoksayma kuralları |
| `prisma/schema.prisma` | Veritabanı şeması |

---

## Yol Takma Adları (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/server/*": ["./src/server/*"]
    }
  }
}
```

---

## Neyin Ne Zaman Kullanılacağı

| İhtiyaç | Konum |
|------|----------|
| Yeni sayfa/rota | `app/(group)/page.tsx` |
| Özellik bileşeni | `features/[name]/components/` |
| Sunucu eylemi (Server action) | `features/[name]/actions.ts` |
| Veri getirme | `features/[name]/queries.ts` |
| Yeniden kullanılabilir buton/giriş | `shared/components/ui/` |
| Veritabanı sorgusu | `server/db/` |
| Harici API çağrısı | `server/services/` |
