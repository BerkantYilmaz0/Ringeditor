# Mimari Desenleri Referansı

> Kullanım rehberliği ile yaygın desenler için hızlı referans.

## Veri Erişim Desenleri

| Desen | Ne Zaman Kullanılır | Ne Zaman Kullanılmaz | Karmaşıklık |
|-------|-------------------|----------------------|------------|
| **Active Record** | Basit CRUD, hızlı prototipleme | Karmaşık sorgular, çoklu kaynaklar | Düşük |
| **Repository** | Test gerekli, çoklu kaynaklar | Basit CRUD, tek veritabanı | Orta |
| **Unit of Work** | Karmaşık işlemler (transactions) | Basit operasyonlar | Yüksek |
| **Data Mapper** | Karmaşık alan, performans | Basit CRUD, hızlı geliştirme | Yüksek |

## Alan Mantığı Desenleri

| Desen | Ne Zaman Kullanılır | Ne Zaman Kullanılmaz | Karmaşıklık |
|-------|-------------------|----------------------|------------|
| **Transaction Script** | Basit CRUD, prosedürel | Karmaşık iş kuralları | Düşük |
| **Table Module** | Kayıt tabanlı mantık | Zengin davranış gerekli | Düşük |
| **Domain Model** | Karmaşık iş mantığı | Basit CRUD | Orta |
| **DDD (Tam)** | Karmaşık alan, alan uzmanları | Basit alan, uzman yok | Yüksek |

## Dağıtık Sistem Desenleri

| Desen | Ne Zaman Kullanılır | Ne Zaman Kullanılmaz | Karmaşıklık |
|-------|-------------------|----------------------|------------|
| **Modüler Monolit** | Küçük ekipler, belirsiz sınırlar | Net bağlamlar, farklı ölçekler | Orta |
| **Mikroservisler** | Farklı ölçekler, büyük ekipler | Küçük ekipler, basit alan | Çok Yüksek |
| **Olay Güdümlü (Event-Driven)** | Gerçek zamanlı, gevşek bağlılık | Basit iş akışları, güçlü tutarlılık | Yüksek |
| **CQRS** | Okuma/yazma performansı ayrışıyor | Basit CRUD, aynı model | Yüksek |
| **Saga** | Dağıtık işlemler | Tek veritabanı, basit ACID | Yüksek |

## API Desenleri

| Desen | Ne Zaman Kullanılır | Ne Zaman Kullanılmaz | Karmaşıklık |
|-------|-------------------|----------------------|------------|
| **REST** | Standart CRUD, kaynaklar | Gerçek zamanlı, karmaşık sorgular | Düşük |
| **GraphQL** | Esnek sorgular, çoklu istemciler | Basit CRUD, önbellekleme ihtiyaçları | Orta |
| **gRPC** | Dahili servisler, performans | Genel API'ler, tarayıcı istemcileri | Orta |
| **WebSocket** | Gerçek zamanlı güncellemeler | Basit istek/yanıt | Orta |

---

## Basitlik Prensibi

**"Basit başla, karmaşıklığı sadece gerekli olduğu kanıtlandığında ekle."**

- Desenleri her zaman daha sonra ekleyebilirsiniz
- Karmaşıklığı kaldırmak eklemekten ÇOK daha zordur
- Şüpheye düştüğünüzde, daha basit seçeneği seçin
