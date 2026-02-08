# GraphQL Prensipleri

> Karmaşık, birbirine bağlı veriler için esnek sorgular.

## Ne Zaman Kullanılır

```
✅ İyi uyum:
├── Karmaşık, birbirine bağlı veriler
├── Çoklu frontend platformları
├── İstemcilerin esnek sorgulara ihtiyacı var
├── Gelişen veri gereksinimleri
└── Aşırı veri çekmeyi (over-fetching) azaltmak önemli

❌ Kötü uyum:
├── Basit CRUD operasyonları
├── Dosya yükleme ağırlıklı
├── HTTP önbellekleme önemli
└── Ekip GraphQL'e yabancı
```

## Şema Tasarım Prensipleri

```
Prensipler:
├── Uç noktalar değil, grafikler (graphs) olarak düşünün
├── Gelişebilirlik için tasarlayın (versiyon yok)
├── Sayfalandırma için bağlantıları (connections) kullanın
├── Tipler konusunda spesifik olun (genel "veri" değil)
└── Null olabilirliği (nullability) düşünceli bir şekilde işleyin
```

## Güvenlik Hususları

```
Şunlara karşı koruyun:
├── Sorgu derinliği saldırıları → Maksimum derinlik ayarla
├── Sorgu karmaşıklığı → Maliyet hesapla
├── Toplu işlem (batching) kötüye kullanımı → Toplu işlem boyutunu sınırla
├── İçe bakış (Introspection) → Üretimde devre dışı bırak
```
