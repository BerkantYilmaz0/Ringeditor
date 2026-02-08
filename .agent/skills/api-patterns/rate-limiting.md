# Hız Sınırlama (Rate Limiting) Prensipleri

> API'nizi kötüye kullanımdan ve aşırı yüklenmeden koruyun.

## Neden Hız Sınırlaması

```
Şunlara karşı koruyun:
├── Kaba kuvvet (brute force) saldırıları
├── Kaynak tükenmesi
├── Maliyet aşımları (kullanım başına ödeme yapılıyorsa)
└── Adil olmayan kullanım
```

## Strateji Seçimi

| Tür | Nasıl | Ne Zaman |
|------|-----|------|
| **Token bucket** | Patlamaya izin verilir, zamanla dolar | Çoğu API |
| **Kayan pencere (Sliding window)** | Pürüzsüz dağılım | Katı limitler |
| **Sabit pencere (Fixed window)** | Pencere başına basit sayaçlar | Temel ihtiyaçlar |

## Yanıt Başlıkları

```
Başlıklara dahil edin:
├── X-RateLimit-Limit (maksimum istek)
├── X-RateLimit-Remaining (kalan istek)
├── X-RateLimit-Reset (sınır ne zaman sıfırlanacak)
└── Aşıldığında 429 döndür
```
