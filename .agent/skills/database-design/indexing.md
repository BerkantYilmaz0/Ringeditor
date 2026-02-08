# İndeksleme Prensipleri

> İndeksleri ne zaman ve nasıl etkili bir şekilde oluşturmalısınız.

## Ne Zaman İndeks Oluşturmalı

```
Bunları indeksleyin:
├── WHERE ifadelerindeki sütunlar
├── JOIN koşullarındaki sütunlar
├── ORDER BY sütunları
├── Yabancı anahtar (Foreign key) sütunları
└── Benzersiz (Unique) kısıtlamalar

Aşırı indekslemeyin:
├── Çok yazma yapılan tablolar (eklemeleri yavaşlatır)
├── Düşük kardinaliteli sütunlar (örn. cinsiyet: E/K)
├── Nadiren sorgulanan sütunlar
```

## İndeks Tipi Seçimi

| Tip | Kullanım Alanı |
|------|---------|
| **B-tree** | Genel amaçlı, eşitlik ve aralık |
| **Hash** | Sadece eşitlik, daha hızlı |
| **GIN** | JSONB, diziler (arrays), tam metin (full-text) |
| **GiST** | Geometrik, aralık tipleri |
| **HNSW/IVFFlat** | Vektör benzerliği (pgvector) |

## Bileşik İndeks Prensipleri

```
Bileşik indekslerde sıra önemlidir:
├── Eşitlik sütunları önce
├── Aralık sütunları son
├── En seçici (selective) olan önce
└── Sorgu deseniyle eşleşmeli
```
