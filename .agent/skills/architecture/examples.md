# Mimari Örnekleri

> Proje türüne göre gerçek dünya mimari kararları.

---

## Örnek 1: MVP E-ticaret (Tek Geliştirici)

```yaml
Gereksinimler:
  - Başlangıçta <1000 kullanıcı
  - Tek geliştirici
  - Pazara hızlı çıkış (8 hafta)
  - Bütçe bilincine sahip

Mimari Kararları:
  Uygulama Yapısı: Monolit (tek kişi için daha basit)
  Çerçeve: Next.js (full-stack, hızlı)
  Veri Katmanı: Prisma doğrudan (aşırı soyutlama yok)
  Kimlik Doğrulama: JWT (OAuth'dan daha basit)
  Ödeme: Stripe (barındırılan çözüm)
  Veritabanı: PostgreSQL (siparişler için ACID)

Kabul Edilen Takaslar:
  - Monolit → Bağımsız ölçeklenemez (ekip bunu gerektirmiyor)
  - Depo (Repository) Yok → Daha az test edilebilir (basit CRUD ihtiyaç duymaz)
  - JWT → Başlangıçta sosyal giriş yok (daha sonra eklenebilir)

Gelecek Göç Yolu:
  - Kullanıcılar > 10K → Ödeme servisini ayır
  - Ekip > 3 → Repository deseni ekle
  - Sosyal giriş istendi → OAuth ekle
```

---

## Örnek 2: SaaS Ürünü (5-10 Geliştirici)

```yaml
Gereksinimler:
  - 1K-100K kullanıcı
  - 5-10 geliştirici
  - Uzun vadeli (12+ ay)
  - Çoklu etki alanları (faturalama, kullanıcılar, çekirdek)

Mimari Kararları:
  Uygulama Yapısı: Modüler Monolit (ekip boyutu için optimal)
  Çerçeve: NestJS (tasarım gereği modüler)
  Veri Katmanı: Repository deseni (test, esneklik)
  Etki Alanı Modeli: Kısmi DDD (zengin varlıklar)
  Kimlik Doğrulama: OAuth + JWT
  Önbellekleme: Redis
  Veritabanı: PostgreSQL

Kabul Edilen Takaslar:
  - Modüler Monolit → Bazı modül bağımlılıkları (mikroservisler gerekçelendirilmiyor)
  - Kısmi DDD → Tam kümeler (aggregates) yok (alan uzmanları yok)
  - RabbitMQ daha sonra → Başlangıçta senkron (ihtiyaç kanıtlanınca ekle)

Göç Yolu:
  - Ekip > 10 → Mikroservisleri düşün
  - Etki alanları çakışıyor → Sınırlı bağlamları (bounded contexts) ayır
  - Okuma performansı sorunları → CQRS ekle
```

---

## Örnek 3: Kurumsal (100K+ Kullanıcı)

```yaml
Gereksinimler:
  - 100K+ kullanıcı
  - 10+ geliştirici
  - Çoklu iş alanları
  - Farklı ölçekleme ihtiyaçları
  - 7/24 kullanılabilirlik

Mimari Kararları:
  Uygulama Yapısı: Mikroservisler (bağımsız ölçek)
  API Ağ Geçidi: Kong/AWS API GW
  Etki Alanı Modeli: Tam DDD
  Tutarlılık: Olay güdümlü (nihai tutarlılık TAMAM)
  Mesaj Yolu: Kafka
  Kimlik Doğrulama: OAuth + SAML (kurumsal SSO)
  Veritabanı: Polyglot (iş için doğru araç)
  CQRS: Seçili servisler

Operasyonel Gereksinimler:
  - Servis ağı (Service mesh) (Istio/Linkerd)
  - Dağıtık izleme (Jaeger/Tempo)
  - Merkezi loglama (ELK/Loki)
  - Devre kesiciler (Resilience4j)
  - Kubernetes/Helm
```
