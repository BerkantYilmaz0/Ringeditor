# API Güvenlik Testi

> API güvenliğini test etme prensipleri. OWASP API Top 10, kimlik doğrulama, yetkilendirme testi.

---

## OWASP API Güvenliği Top 10

| Güvenlik Açığı | Test Odağı |
|---------------|------------|
| **API1: BOLA** | Diğer kullanıcıların kaynaklarına eriş |
| **API2: Broken Auth** | JWT, oturum, kimlik bilgileri |
| **API3: Property Auth** | Toplu atama (mass assignment), veri ifşası |
| **API4: Resource Consumption** | Hız sınırlama, DoS |
| **API5: Function Auth** | Admin uç noktaları, rol atlatma |
| **API6: Business Flow** | Mantık kötüye kullanımı, otomasyon |
| **API7: SSRF** | İç ağ erişimi |
| **API8: Misconfiguration** | Hata ayıklama uç noktaları, CORS |
| **API9: Inventory** | Gölge API'ler, eski sürümler |
| **API10: Unsafe Consumption** | Üçüncü taraf API güveni |

---

## Kimlik Doğrulama Testi

### JWT Testi

| Kontrol | Ne Test Edilmeli |
|-------|--------------|
| Algoritma | Yok (None), algoritma karışıklığı |
| Sır (Secret) | Zayıf sırlar, kaba kuvvet |
| İddialar (Claims) | Sona erme, yayıncı, izleyici |
| İmza | Manipülasyon, anahtar enjeksiyonu |

### Oturum Testi

| Kontrol | Ne Test Edilmeli |
|-------|--------------|
| Oluşturma | Tahmin edilebilirlik |
| Depolama | İstemci tarafı güvenliği |
| Sona Erme | Zaman aşımı zorlaması |
| Geçersiz Kılma | Çıkış etkinliği |

---

## Yetkilendirme Testi

| Test Türü | Yaklaşım |
|-----------|----------|
| **Yatay** | Eş düzey kullanıcıların verilerine eriş |
| **Dikey** | Daha yüksek ayrıcalıklı fonksiyonlara eriş |
| **Bağlam** | İzin verilen kapsam dışına eriş |

### BOLA/IDOR Testi

1. İsteklerdeki kaynak ID'lerini belirle
2. Kullanıcı A'nın oturumuyla isteği yakala
3. Kullanıcı B'nin oturumuyla tekrarla
4. Yetkisiz erişimi kontrol et

---

## Girdi Doğrulama Testi

| Enjeksiyon Türü | Test Odağı |
|----------------|------------|
| SQL | Sorgu manipülasyonu |
| NoSQL | Belge sorguları |
| Komut | Sistem komutları |
| LDAP | Dizin sorguları |

**Yaklaşım:** Tüm parametreleri test et, tür zorlamayı dene, sınırları test et, hata mesajlarını kontrol et.

---

## Hız Sınırlama Testi

| Yön | Kontrol |
|--------|-------|
| Varlık | Herhangi bir sınır var mı? |
| Atlatma | Başlıklar, IP döndürme |
| Kapsam | Kullanıcı başına, IP başına, küresel |

**Atlatma teknikleri:** X-Forwarded-For, farklı HTTP metodları, büyük/küçük harf varyasyonları, API sürümleme.

---

## GraphQL Güvenliği

| Test | Odak |
|------|-------|
| İçe Bakış (Introspection) | Şema ifşası |
| Toplu İşlem (Batching) | Sorgu DoS |
| İç İçe Geçme (Nesting) | Derinlik tabanlı DoS |
| Yetkilendirme | Alan düzeyinde erişim |

---

## Güvenlik Testi Kontrol Listesi

**Kimlik Doğrulama:**
- [ ] Atlatma (bypass) testi yap
- [ ] Kimlik bilgisi gücünü kontrol et
- [ ] Token güvenliğini doğrula

**Yetkilendirme:**
- [ ] BOLA/IDOR testi yap
- [ ] Ayrıcalık yükseltmeyi kontrol et
- [ ] Fonksiyon erişimini doğrula

**Girdi:**
- [ ] Tüm parametreleri test et
- [ ] Enjeksiyon kontrolü yap

**Yapılandırma:**
- [ ] CORS kontrolü yap
- [ ] Başlıkları doğrula
- [ ] Hata yönetimini test et

---

> **Unutmayın:** API'ler modern uygulamaların omurgasıdır. Onları saldırganların yapacağı gibi test edin.
