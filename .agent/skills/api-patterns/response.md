# Yanıt Formatı Prensipleri

> Tutarlılık anahtardır - bir format seçin ve ona bağlı kalın.

## Yaygın Desenler

```
Birini seçin:
├── Zarf (Envelope) deseni ({ success, data, error })
├── Doğrudan veri (sadece kaynağı döndür)
└── HAL/JSON:API (hipermedya)
```

## Hata Yanıtı

```
Dahil et:
├── Hata kodu (programatik işleme için)
├── Kullanıcı mesajı (görüntüleme için)
├── Ayrıntılar (hata ayıklama, alan düzeyinde hatalar için)
├── İstek ID (destek için)
└── Dahili ayrıntılar YOK (güvenlik!)
```

## Sayfalandırma Türleri

| Tür | En İyisi | Takaslar (Trade-offs) |
|------|----------|------------|
| **Ofset (Offset)** | Basit, atlanabilir | Büyük veri setlerinde performans |
| **İmleç (Cursor)** | Büyük veri setleri | Sayfaya atlanamaz |
| **Anahtar Seti (Keyset)** | Performans kritik | Sıralanabilir anahtar gerekir |

### Seçim Soruları

1. Veri seti ne kadar büyük?
2. Kullanıcıların belirli sayfalara atlaması gerekiyor mu?
3. Veri sık sık değişiyor mu?
