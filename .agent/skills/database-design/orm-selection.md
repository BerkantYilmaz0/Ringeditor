# ORM Seçimi (2025)

> Dağıtım ve DX (Geliştirici Deneyimi) ihtiyaçlarına göre ORM seçin.

## Karar Ağacı

```
Bağlam nedir?
│
├── Uç (Edge) dağıtım / Paket boyutu önemli
│   └── Drizzle (en küçük, SQL benzeri)
│
├── En iyi DX / Şema öncelikli
│   └── Prisma (migrasyonlar, stüdyo)
│
├── Maksimum kontrol
│   └── Sorgu oluşturucu ile ham SQL
│
└── Python ekosistemi
    └── SQLAlchemy 2.0 (async desteği)
```

## Karşılaştırma

| ORM | En İyisi | Takaslar (Trade-offs) |
|-----|----------|------------|
| **Drizzle** | Edge, TypeScript | Daha yeni, daha az örnek |
| **Prisma** | DX, şema yönetimi | Daha ağır, edge için hazır değil |
| **Kysely** | Tip güvenli SQL oluşturucu | Manuel migrasyonlar |
| **Raw SQL** | Karmaşık sorgular, kontrol | Manuel tip güvenliği |
