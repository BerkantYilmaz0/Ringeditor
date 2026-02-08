# Kimlik Doğrulama (Authentication) Desenleri

> Kullanım durumuna göre auth deseni seçin.

## Seçim Rehberi

| Desen | En İyisi |
|---------|----------|
| **JWT** | Durum-bağımsız (Stateless), mikroservisler |
| **Session** | Geleneksel web, basit |
| **OAuth 2.0** | Üçüncü taraf entegrasyonu |
| **API Anahtarları** | Sunucudan sunucuya, genel API'ler |
| **Passkey** | Modern şifresiz (passwordless) (2025+) |

## JWT Prensipleri

```
Önemli:
├── İmzayı her zaman doğrula
├── Sona erme süresini (expiration) kontrol et
├── Minimal iddiaları (claims) dahil et
├── Kısa sona erme süresi + yenileme tokenları kullan
└── Hassas verileri asla JWT'de saklama
```
