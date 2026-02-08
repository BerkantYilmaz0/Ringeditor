# Teknoloji Yığını Seçimi (2025)

> Web uygulamaları için varsayılan ve alternatif teknoloji seçenekleri.

## Varsayılan Yığın (Web Uygulaması - 2025)

```yaml
Frontend:
  framework: Next.js 16 (Kararlı)
  language: TypeScript 5.7+
  styling: Tailwind CSS v4
  state: React 19 Actions / Server Components
  bundler: Turbopack (Geliştirme için Kararlı)

Backend:
  runtime: Node.js 23
  framework: Next.js API Routes / Hono (Edge için)
  validation: Zod / TypeBox

Veritabanı:
  primary: PostgreSQL
  orm: Prisma / Drizzle
  hosting: Supabase / Neon

Auth:
  provider: Auth.js (v5) / Clerk

Monorepo:
  tool: Turborepo 2.0
```

## Alternatif Seçenekler

| İhtiyaç | Varsayılan | Alternatif |
|------|---------|-------------|
| Gerçek zamanlı | - | Supabase Realtime, Socket.io |
| Dosya depolama | - | Cloudinary, S3 |
| Ödeme | Stripe | LemonSqueezy, Paddle |
| E-posta | - | Resend, SendGrid |
| Arama | - | Algolia, Typesense |
