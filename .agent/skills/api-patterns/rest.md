# REST Prensipleri

> Kaynak tabanlı API tasarımı - fiiller değil, isimler.

## Kaynak İsimlendirme Kuralları

```
Prensipler:
├── İSİMLER kullanın, fiiller değil (kaynaklar, eylemler değil)
├── ÇOĞUL formlar kullanın (/user değil /users)
├── Tireli küçük harf kullanın (/user-profiles)
├── İlişkiler için iç içe geçirin (/users/123/posts)
└── Sığ tutun (maksimum 3 seviye derinlik)
```

## HTTP Metodu Seçimi

| Metod | Amaç | Idempotent? | Body? |
|--------|---------|-------------|-------|
| **GET** | Kaynak(ları) oku | Evet | Hayır |
| **POST** | Yeni kaynak oluştur | Hayır | Evet |
| **PUT** | Tüm kaynağı değiştir | Evet | Evet |
| **PATCH** | Kısmi güncelleme | Hayır | Evet |
| **DELETE** | Kaynağı kaldır | Evet | Hayır |

## Durum Kodu Seçimi

| Durum | Kod | Neden |
|-----------|------|-----|
| Başarı (oku) | 200 | Standart başarı |
| Oluşturuldu | 201 | Yeni kaynak oluşturuldu |
| İçerik yok | 204 | Başarı, döndürülecek bir şey yok |
| Kötü istek | 400 | Hatalı biçimlendirilmiş istek |
| Yetkisiz | 401 | Eksik/geçersiz auth |
| Yasak | 403 | Geçerli auth, izin yok |
| Bulunamadı | 404 | Kaynak mevcut değil |
| Çakışma | 409 | Durum çakışması (kopya) |
| Doğrulama hatası | 422 | Geçerli sözdizimi, geçersiz veri |
| Hız sınırlı | 429 | Çok fazla istek |
| Sunucu hatası | 500 | Bizim hatamız |
