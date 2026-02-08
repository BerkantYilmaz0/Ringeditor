# Sorgu Optimizasyonu

> N+1 problemi, EXPLAIN ANALYZE, optimizasyon öncelikleri.

## N+1 Problemi

```
N+1 nedir?
├── Ana kayıtları almak için 1 sorgu
├── İlgili kayıtları almak için N sorgu
└── Çok yavaş!

Çözümler:
├── JOIN → Tüm verilerle tek sorgu
├── Eager loading → ORM JOIN'i yönetir
├── DataLoader → Toplu işleme ve önbellekleme (GraphQL)
└── Alt sorgu (Subquery) → İlgili olanları tek sorguda getir
```

## Sorgu Analizi Zihniyeti

```
Optimize etmeden önce:
├── Sorguyu EXPLAIN ANALYZE ile incele
├── Seq Scan (tam tablo taraması) ara
├── Gerçek vs tahmin edilen satırları kontrol et
├── Eksik indeksleri belirle
```

## Optimizasyon Öncelikleri

1. **Eksik indeksleri ekle** (en yaygın sorun)
2. **Sadece gerekli sütunları seç** (SELECT * değil)
3. **Uygun JOIN'ler kullan** (mümkünse alt sorgulardan kaçın)
4. **Erken sınırla** (veritabanı seviyesinde sayfalandırma)
5. **Önbellek** (uygun olduğunda)
