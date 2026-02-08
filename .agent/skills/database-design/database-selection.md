# Veritabanı Seçimi (2025)

> Varsayılanı değil, bağlama göre veritabanını seçin.

## Karar Ağacı

```
Gereksinimleriniz neler?
│
├── Tam ilişkisel özellikler gerekli
│   ├── Kendi sunucumda (Self-hosted) → PostgreSQL
│   └── Sunucusuz (Serverless) → Neon, Supabase
│
├── Uç (Edge) dağıtım / Ultra düşük gecikme
│   └── Turso (edge SQLite)
│
├── AI / Vektör arama
│   └── PostgreSQL + pgvector
│
├── Basit / Gömülü / Yerel
│   └── SQLite
│
└── Küresel dağıtım
    └── PlanetScale, CockroachDB, Turso
```

## Karşılaştırma

| Veritabanı | En İyisi | Takaslar (Trade-offs) |
|----------|----------|------------|
| **PostgreSQL** | Tam özellikler, karmaşık sorgular | Barındırma gerektirir |
| **Neon** | Sunucusuz PG, dallanma (branching) | PG karmaşıklığı |
| **Turso** | Uç (Edge), düşük gecikme | SQLite sınırlamaları |
| **SQLite** | Basit, gömülü, yerel | Tek yazıcı (Single-writer) |
| **PlanetScale** | MySQL, küresel ölçek | Yabancı anahtar (Foreign key) yok |

## Sorulacak Sorular

1. Dağıtım ortamı nedir?
2. Sorgular ne kadar karmaşık?
3. Edge/Serverless önemli mi?
4. Vektör arama gerekli mi?
5. Küresel dağıtım gerekli mi?
