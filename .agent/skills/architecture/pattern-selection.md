# Desen Seçim Yönergeleri

> Mimari desenleri seçmek için karar ağaçları.

## Ana Karar Ağacı

```
BAŞLA: ANA endişeniz nedir?

┌─ Veri Erişim Karmaşıklığı?
│  ├─ YÜKSEK (karmaşık sorgular, test gerekli)
│  │  → Repository Deseni + İş Birimi (Unit of Work)
│  │  DOĞRULA: Veri kaynağı sık değişecek mi?
│  │     ├─ EVET → Repository dolaylamaya değer
│  │     └─ HAYIR  → Daha basit ORM doğrudan erişimini düşün
│  └─ DÜŞÜK (basit CRUD, tek veritabanı)
│     → Doğrudan ORM (Prisma, Drizzle)
│     Daha Basit = Daha İyi, Daha Hızlı
│
├─ İş Kuralları Karmaşıklığı?
│  ├─ YÜKSEK (alan mantığı, kurallar bağlama göre değişir)
│  │  → Alan Güdümlü Tasarım (DDD)
│  │  DOĞRULA: Ekipte alan uzmanlarınız var mı?
│  │     ├─ EVET → Tam DDD (Kümeler, Değer Nesneleri)
│  │     └─ HAYIR  → Kısmi DDD (zengin varlıklar, net sınırlar)
│  └─ DÜŞÜK (çoğunlukla CRUD, basit doğrulama)
│     → İşlem Senaryosu (Transaction Script) deseni
│     Daha Basit = Daha İyi, Daha Hızlı
│
├─ Bağımsız Ölçekleme Gerekli mi?
│  ├─ EVET (farklı bileşenler farklı şekilde ölçeklenir)
│  │  → Mikroservisler karmaşıklığa DEĞER
│  │  GEREKSİNİMLER (HEPSİ doğru olmalı):
│  │    - Net alan sınırları
│  │    - Ekip > 10 geliştirici
│  │    - Servis başına farklı ölçekleme ihtiyaçları
│  │  EĞER HEPSİ KARŞILANMIYORSA → Modüler Monolit
│  └─ HAYIR (her şey birlikte ölçeklenir)
│     → Modüler Monolit
│     Kanıtlanmış ihtiyaç olduğunda servisler daha sonra ayrılabilir
│
└─ Gerçek Zamanlı Gereksinimler?
   ├─ YÜKSEK (anında güncellemeler, çok kullanıcılı senkronizasyon)
   │  → Olay Güdümlü Mimari (Event-Driven)
   │  → Mesaj Kuyruğu (RabbitMQ, Redis, Kafka)
   │  DOĞRULA: Nihai tutarlılığı (eventual consistency) yönetebilir misiniz?
   │     ├─ EVET → Olay güdümlü geçerli
   │     └─ HAYIR  → Yoklama (polling) ile senkron
   └─ DÜŞÜK (nihai tutarlılık kabul edilebilir)
      → Senkron (REST/GraphQL)
      Daha Basit = Daha İyi, Daha Hızlı
```

## 3 Soru (HERHANGİ BİR Desenden Önce)

1. **Çözülen Sorun**: Bu desen HANGİ ÖZEL sorunu çözüyor?
2. **Daha Basit Alternatif**: Daha basit bir çözüm var mı?
3. **Ertelenmiş Karmaşıklık**: Bunu gerektiğinde DAHA SONRA ekleyebilir miyiz?

## Kırmızı Bayraklar (Anti-desenler)

| Desen | Anti-desen | Daha Basit Alternatif |
|-------|-----------|-------------------|
| Mikroservisler | Erken bölme | Monolit başla, sonra ayır |
| Temiz/Altıgen | Aşırı soyutlama | Önce somut, sonra arayüzler |
| Olay Kaynağı (Event Sourcing) | Aşırı mühendislik | Sadece ekleme yapılan denetim günlüğü |
| CQRS | Gereksiz karmaşıklık | Tek model |
| Repository | Basit CRUD için YAGNI | ORM doğrudan erişim |
