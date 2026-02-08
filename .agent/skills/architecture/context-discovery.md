# Bağlam Keşfi

> Herhangi bir mimari önermeden önce, bağlamı toplayın.

## Soru Hiyerarşisi (ÖNCE Kullanıcıya Sorun)

1. **Ölçek (Scale)**
   - Kaç kullanıcı? (10, 1K, 100K, 1M+)
   - Veri hacmi? (MB, GB, TB)
   - İşlem oranı? (saniye/dakika başına)

2. **Ekip**
   - Tek geliştirici mi yoksa ekip mi?
   - Ekip büyüklüğü ve uzmanlığı?
   - Dağıtık mı yoksa aynı ofiste mi?

3. **Zaman Çizelgesi**
   - MVP/Prototip mi yoksa uzun vadeli ürün mü?
   - Pazara çıkış süresi baskısı?

4. **Alan (Domain)**
   - CRUD ağırlıklı mı yoksa iş mantığı karmaşık mı?
   - Gerçek zamanlı gereksinimler?
   - Uyumluluk/düzenlemeler?

5. **Kısıtlamalar**
   - Bütçe sınırlamaları?
   - Entegre edilecek eski sistemler?
   - Teknoloji yığını tercihleri?

## Proje Sınıflandırma Matrisi

```
                    MVP              SaaS           Kurumsal (Enterprise)
┌─────────────────────────────────────────────────────────────┐
│ Ölçek        │ <1K           │ 1K-100K      │ 100K+        │
│ Ekip         │ Tek           │ 2-10         │ 10+          │
│ Zaman        │ Hızlı (haftalar)│ Orta (aylar) │ Uzun (yıllar)│
│ Mimari       │ Basit         │ Modüler      │ Dağıtık      │
│ Desenler     │ Minimal       │ Seçici       │ Kapsamlı     │
│ Örnek        │ Next.js API   │ NestJS       │ Mikroservisler│
└─────────────────────────────────────────────────────────────┘
```
