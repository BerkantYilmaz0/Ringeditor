# API Tarzı Seçimi (2025)

> REST vs GraphQL vs tRPC - Hangi durumda hangisi?

## Karar Ağacı

```
API tüketicileri kimler?
│
├── Genel (Public) API / Çoklu platformlar
│   └── REST + OpenAPI (en geniş uyumluluk)
│
├── Karmaşık veri ihtiyaçları / Çoklu frontendler
│   └── GraphQL (esnek sorgular)
│
├── TypeScript frontend + backend (monorepo)
│   └── tRPC (uçtan uca tip güvenliği)
│
├── Gerçek zamanlı / Olay güdümlü (Event-driven)
│   └── WebSocket + AsyncAPI
│
└── Dahili mikroservisler
    └── gRPC (performans) veya REST (basitlik)
```

## Karşılaştırma

| Faktör | REST | GraphQL | tRPC |
|--------|------|---------|------|
| **En iyisi** | Genel API'ler | Karmaşık uygulamalar | TS monorepolar |
| **Öğrenme eğrisi** | Düşük | Orta | Düşük (eğer TS ise) |
| **Aşırı/eksik veri çekme** | Yaygın | Çözülmüş | Çözülmüş |
| **Tip güvenliği** | Manuel (OpenAPI) | Şema tabanlı | Otomatik |
| **Önbellekleme** | HTTP yerel | Karmaşık | İstemci tabanlı |

## Seçim Soruları

1. API tüketicileri kimler?
2. Frontend TypeScript mi?
3. Veri ilişkileri ne kadar karmaşık?
4. Önbellekleme kritik mi?
5. Genel mi yoksa dahili API mi?
