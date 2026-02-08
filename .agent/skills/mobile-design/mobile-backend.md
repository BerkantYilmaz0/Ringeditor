# Mobil Backend Desenleri

> **Bu dosya, mobil istemcilere ÖZGÜ backend/API desenlerini kapsar.**
> Genel backend desenleri `nodejs-best-practices` ve `api-patterns` içindedir.
> **Mobil backend, web backend ile aynı DEĞİLDİR. Farklı kısıtlamalar, farklı desenler.**

---

## 🧠 MOBİL BACKEND ZİHNİYETİ

```
Mobil istemciler web istemcilerinden FARKLIDIR:
├── Güvenilmez ağ (2G, metro, asansör)
├── Pil kısıtlamaları (uyandırmaları en aza indir)
├── Sınırlı depolama (her şeyi önbelleğe alamaz)
├── Kesintiye uğrayan oturumlar (aramalar, bildirimler)
├── Çeşitli cihazlar (eski telefonlardan amiral gemilerine)
└── İkili (binary) güncellemeler yavaştır (App Store incelemesi)
```

**Backend'iniz bunların HEPSİNİ telafi etmelidir.**

---

## 🚫 AI MOBİL BACKEND ANTI-DESENLERİ

### Bunlar, mobil backendler oluştururken yapılan yaygın AI hatalarıdır:

| ❌ AI Varsayılanı | Neden Yanlış | ✅ Mobil-Doğrusu |
|---------------|----------------|-------------------|
| Web ve mobil için aynı API | Mobil kompakt yanıtlara ihtiyaç duyar | Ayrı mobil uç noktaları VEYA alan seçimi |
| Tam nesne yanıtları | Bant genişliğini ve pili harcar | Kısmi yanıtlar, sayfalandırma |
| Çevrimdışı düşüncesi yok | Ağ olmadan uygulama çöker | Offline-first tasarım, senkronizasyon kuyrukları |
| Her şey için WebSocket | Pil tüketimi | Push bildirimleri + polling yedeği |
| Uygulama sürümleme yok | Güncellemeleri zorlayamazsınız, kırılmalar | Sürüm başlıkları, minimum sürüm kontrolü |
| Genel hata mesajları | Kullanıcılar sorunları düzeltemez | Mobil'e özgü hata kodları + kurtarma eylemleri |
| Oturum tabanlı auth | Mobil uygulamalar yeniden başlar | Yenileme (refresh) ile token tabanlı |
| Cihaz bilgisini görmezden gelmek | Sorunları debug edemezsiniz | Başlıklarda Cihaz ID, uygulama sürümü |

---

## 1. Push Bildirimleri

### Platform Mimarisi

```
┌─────────────────────────────────────────────────────────────────┐
│                    SİZİN BACKEND'İNİZ                           │
├─────────────────────────────────────────────────────────────────┤
│                         │                                        │
│              ┌──────────┴──────────┐                            │
│              ▼                     ▼                            │
│    ┌─────────────────┐   ┌─────────────────┐                    │
│    │   FCM (Google)  │   │  APNs (Apple)   │                    │
│    │   Firebase      │   │  Doğrudan veya FCM │                 │
│    └────────┬────────┘   └────────┬────────┘                    │
│             │                     │                              │
│             ▼                     ▼                              │
│    ┌─────────────────┐   ┌─────────────────┐                    │
│    │ Android Cihaz   │   │   iOS Cihaz     │                    │
│    └─────────────────┘   └─────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

### Push Türleri

| Tür | Kullanım Durumu | Kullanıcı Görür |
|------|----------|-----------|
| **Display (Görüntülü)** | Yeni mesaj, sipariş güncellemesi | Bildirim başlığı (banner) |
| **Silent (Sessiz)** | Arka plan senkronizasyonu, içerik güncellemesi | Hiçbir şey (arka plan) |
| **Data (Veri)** | Uygulama tarafından özel işleme | Uygulama mantığına bağlı |

### Anti-Desenler

| ❌ ASLA | ✅ HER ZAMAN |
|----------|----------|
| Push içinde hassas veri gönderme | Push "Yeni mesaj" der, uygulama içeriği getirir |
| Push ile aşırı yükleme | Toplu gönder, tekilleştir, sessiz saatlere saygı duy |
| Herkese aynı mesaj | Kullanıcı tercihine, saat dilimine göre segmentle |
| Başarısız tokenları görmezden gelme | Geçersiz tokenları düzenli olarak temizle |
| iOS için APNs'i atlama | FCM tek başına iOS teslimatını garanti etmez |

### Token Yönetimi

```
TOKEN YAŞAM DÖNGÜSÜ:
├── Uygulama kaydolur → Token alır → Backend'e gönderir
├── Token değişebilir → Uygulama başlangıçta yeniden kaydolmalı
├── Token süresi dolar → Veritabanından temizle
├── Kullanıcı kaldırır → Token geçersiz olur (hata ile tespit et)
└── Çoklu cihaz → Kullanıcı başına birden fazla token sakla
```

---

## 2. Çevrimdışı Senkronizasyon & Çatışma Çözümü

### Senkronizasyon Stratejisi Seçimi

```
NE TÜR VERİ?
        │
        ├── Sadece okunur (haberler, katalog)
        │   └── Basit önbellek + TTL
        │       └── Geçersiz kılma için ETag/Last-Modified
        │
        ├── Kullanıcıya ait (notlar, yapılacaklar)
        │   └── Son yazan kazanır (basit)
        │       └── Veya zaman damgası tabanlı birleştirme
        │
        ├── İşbirlikçi (paylaşılan belgeler)
        │   └── CRDT veya OT gerekir
        │       └── Firebase/Supabase düşün
        │
        └── Kritik (ödemeler, envanter)
            └── Sunucu gerçeğin kaynağıdır
                └── İyimser (Optimistic) UI + sunucu onayı
```

### Çatışma Çözüm Stratejileri

| Strateji | Nasıl Çalışır | En İyisi |
|----------|--------------|----------|
| **Son yazan kazanır** | En son zaman damgası üzerine yazar | Basit veri, tek kullanıcı |
| **Sunucu kazanır** | Sunucu her zaman yetkilidir | Kritik işlemler |
| **İstemci kazanır** | Çevrimdışı değişiklikler önceliklendirilir | Çevrimdışı-yoğun uygulamalar |
| **Birleştir (Merge)** | Değişiklikleri alan alan birleştirir | Belgeler, zengin içerik |
| **CRDT** | Matematiksel olarak çatışmasız | Gerçek zamanlı işbirliği |

### Senkronizasyon Kuyruğu Deseni

```
İSTEMCİ TARAFI:
├── Kullanıcı değişiklik yapar → Yerel DB'ye yaz
├── Senkronizasyon kuyruğuna ekle → { eylem, veri, zaman damgası, denemeler }
├── Ağ kullanılabilir → Kuyruğu işle FIFO
├── Başarılı → Kuyruktan kaldır
├── Başarısız → Backoff ile yeniden dene (maksimum 5 deneme)
└── Çatışma → Çözüm stratejisini uygula

SUNUCU TARAFI:
├── Değişikliği istemci zaman damgasıyla kabul et
├── Sunucu sürümüyle karşılaştır
├── Çatışma çözümünü uygula
├── Birleştirilmiş durumu döndür
└── İstemci yerelini sunucu yanıtıyla günceller
```

---

## 3. Mobil API Optimizasyonu

### Yanıt Boyutu Azaltma

| Teknik | Tasarruf | Uygulama |
|-----------|---------|----------------|
| **Alan seçimi** | %30-70 | `?fields=id,name,thumbnail` |
| **Sıkıştırma** | %60-80 | gzip/brotli (otomatik) |
| **Sayfalandırma** | Değişir | Mobil için imleç (cursor) tabanlı |
| **Resim varyantları** | %50-90 | `/image?w=200&q=80` |
| **Delta senkronizasyonu** | %80-95 | Zaman damgasından beri sadece değişen kayıtlar |

### Sayfalandırma: Cursor vs Offset

```
OFFSET (Mobil için Kötü):
├── Sayfa 1: OFFSET 0 LIMIT 20
├── Sayfa 2: OFFSET 20 LIMIT 20
├── Sorun: Yeni öğe eklendi → kopyalar!
└── Sorun: Büyük offset = yavaş sorgu

CURSOR (Mobil için İyi):
├── İlk: ?limit=20
├── Sonraki: ?limit=20&after=cursor_abc123
├── İmleç = kodlanmış (id + sıralama değerleri)
├── Veri değişikliklerinde kopya yok
└── Tutarlı performans
```

### Toplu İstekler (Batch Requests)

```
Bunun yerine:
GET /users/1
GET /users/2  
GET /users/3
(3 gidiş-dönüş, 3x gecikme)

Bunu kullan:
POST /batch
{ requests: [
    { method: "GET", path: "/users/1" },
    { method: "GET", path: "/users/2" },
    { method: "GET", path: "/users/3" }
]}
(1 gidiş-dönüş)
```

---

## 4. Uygulama Sürümleme

### Sürüm Kontrol Uç Noktası

```
GET /api/app-config
Headers:
  X-App-Version: 2.1.0
  X-Platform: ios
  X-Device-ID: abc123

Response:
{
  "minimum_version": "2.0.0",
  "latest_version": "2.3.0",
  "force_update": false,
  "update_url": "https://apps.apple.com/...",
  "feature_flags": {
    "new_player": true,
    "dark_mode": true
  },
  "maintenance": false,
  "maintenance_message": null
}
```

### Sürüm Karşılaştırma Mantığı

```
İSTEMCİ SÜRÜMÜ vs MİNİMUM SÜRÜM:
├── istemci >= minimum → Normal devam et
├── istemci < minimum → Zorunlu güncelleme ekranı göster
│   └── Güncellenene kadar uygulama kullanımını engelle
└── istemci < son sürüm → İsteğe bağlı güncelleme uyarısı göster

ÖZELLİK BAYRAKLARI (FEATURE FLAGS):
├── Uygulama güncellemesi olmadan özellikleri etkinleştir/devre dışı bırak
├── Sürüm/cihaz başına A/B testi
└── Aşamalı dağıtım (%10 → %50 → %100)
```

---

## 5. Mobil için Kimlik Doğrulama

### Token Stratejisi

```
ERİŞİM (ACCESS) TOKEN:
├── Kısa ömürlü (15 dk - 1 saat)
├── Bellekte saklanır (kalıcı değil)
├── API istekleri için kullanılır
└── Süresi dolduğunda yenilenir

YENİLEME (REFRESH) TOKEN:
├── Uzun ömürlü (30-90 gün)
├── SecureStore/Keychain içinde saklanır
├── Sadece yeni erişim tokenı almak için kullanılır
└── Her kullanımda döndür (rotate) (güvenlik)

CİHAZ TOKEN:
├── Bu cihazı tanımlar
├── "Tüm cihazlardan çıkış yap"ı sağlar
├── Yenileme tokenı ile birlikte saklanır
└── Sunucu aktif cihazları izler
```

### Sessiz Yeniden Kimlik Doğrulama

```
İSTEK AKIŞI:
├── Erişim tokenı ile istek yap
├── 401 Unauthorized?
│   ├── Yenileme tokenı var mı?
│   │   ├── Evet → /auth/refresh çağır
│   │   │   ├── Başarılı → Orijinal isteği yeniden dene
│   │   │   └── Başarısız → Çıkış yapmaya zorla
│   │   └── Hayır → Çıkış yapmaya zorla
│   └── Token süresi yeni doldu (geçersiz değil)
│       └── Otomatik yenile, kullanıcı fark etmez
└── Başarılı → Devam et
```

---

## 6. Mobil için Hata Yönetimi

### Mobil-Özel Hata Formatı

```json
{
  "error": {
    "code": "ODEME_REDDEDILDI",
    "message": "Ödemeniz reddedildi",
    "user_message": "Lütfen kart bilgilerinizi kontrol edin veya başka bir ödeme yöntemi deneyin",
    "action": {
      "type": "navigate",
      "destination": "payment_methods"
    },
    "retry": {
      "allowed": true,
      "after_seconds": 5
    }
  }
}
```

### Hata Kategorileri

| Kod Aralığı | Kategori | Mobil İşleme |
|------------|----------|-----------------|
| 400-499 | İstemci hatası | Mesaj göster, kullanıcı eylemi gerekli |
| 401 | Auth süresi doldu | Sessiz yenileme veya yeniden giriş |
| 403 | Yasak | Yükseltme/izin ekranı göster |
| 404 | Bulunamadı | Yerel önbellekten kaldır |
| 409 | Çatışma | Senkronizasyon çatışması kullanıcı arayüzünü göster |
| 429 | Hız sınırı | Header sonrası yeniden dene, backoff |
| 500-599 | Sunucu hatası | Backoff ile yeniden dene, "daha sonra dene" göster |
| Ağ | Bağlantı yok | Önbelleğe alınmış veriyi kullan, senkronizasyon için kuyrağa al |

---

## 7. Medya & İkili (Binary) İşleme

### Resim Optimizasyonu

```
İSTEMCİ İSTEĞİ:
GET /images/{id}?w=400&h=300&q=80&format=webp

SUNUCU YANITI:
├── Anında yeniden boyutlandır VEYA CDN kullan
├── Android için WebP (daha küçük)
├── iOS 14+ için HEIC (destekleniyorsa)
├── JPEG yedeği
└── Cache-Control: max-age=31536000
```

### Parçalı Yükleme (Büyük Dosyalar)

```
YÜKLEME AKIŞI:
1. POST /uploads/init
   { filename, size, mime_type }
   → { upload_id, chunk_size }

2. PUT /uploads/{upload_id}/chunks/{n}
   → Her parçayı yükle (1-5 MB)
   → Kesintiye uğrarsa devam edebilir

3. POST /uploads/{upload_id}/complete
   → Sunucu parçaları birleştirir
   → Son dosya URL'sini döndür
```

### Ses/Video Akışı (Streaming)

```
GEREKSİNİMLER:
├── iOS için HLS (HTTP Live Streaming)
├── Android için DASH veya HLS
├── Çoklu kalite seviyeleri (adaptif bit hızı)
├── Aralık (range) isteği desteği (sarma/seeking)
└── Çevrimdışı indirme parçaları

UÇ NOKTALAR:
GET /media/{id}/manifest.m3u8  → HLS manifestosu
GET /media/{id}/segment_{n}.ts → Video segmenti
GET /media/{id}/download       → Çevrimdışı için tam dosya
```

---

## 8. Mobil için Güvenlik

### Cihaz Doğrulama (Attestation)

```
GERÇEK CİHAZI DOĞRULA (emülatör/bot değil):
├── iOS: DeviceCheck API
│   └── Sunucu Apple ile doğrular
├── Android: Play Integrity API (SafetyNet yerine)
│   └── Sunucu Google ile doğrular
└── Kapalı başarısızlık: Doğrulama başarısızsa reddet
```

### İstek İmzalama

```
İSTEMCİ:
├── İmza oluştur = HMAC(timestamp + path + body, secret)
├── Gönder: X-Signature: {signature}
├── Gönder: X-Timestamp: {timestamp}
└── Gönder: X-Device-ID: {device_id}

SUNUCU:
├── Zaman damgasını doğrula (5 dakika içinde)
├── Aynı girdilerle imzayı yeniden oluştur
├── İmzaları karşılaştır
└── Uyuşmazsa reddet (kurcalama tespit edildi)
```

### Hız Sınırlama (Rate Limiting)

```
MOBİL-ÖZEL SINIRLAR:
├── Cihaz başına (X-Device-ID)
├── Kullanıcı başına (auth sonrası)
├── Uç nokta başına (hassas olanlar için daha sıkı)
└── Kayan pencere (sliding window) tercih edilir

HEADERLAR:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1609459200
Retry-After: 60 (429 olduğunda)
```

---

## 9. İzleme & Analitik

### Mobilden Gelen Zorunlu Headerlar

```
Her mobil istek şunları içermelidir:
├── X-App-Version: 2.1.0
├── X-Platform: ios | android
├── X-OS-Version: 17.0
├── X-Device-Model: iPhone15,2
├── X-Device-ID: uuid (kalıcı)
├── X-Request-ID: uuid (istek başına, izleme için)
├── Accept-Language: tr-TR
└── X-Timezone: Europe/Istanbul
```

### Ne Loglanmalı

```
HER İSTEK İÇİN:
├── Yukarıdaki tüm headerlar
├── Uç nokta, yöntem, durum
├── Yanıt süresi
├── Hata detayları (varsa)
└── Kullanıcı ID (kimliği doğrulanmışsa)

ALARMLAR:
├── Sürüm başına hata oranı > %5
├── P95 gecikmesi > 2 saniye
├── Belirli sürüm çökme artışı
├── Auth başarısızlık artışı (saldırı?)
└── Push teslimat başarısızlık artışı
```

---

## 📝 MOBİL BACKEND KONTROL LİSTESİ

### API Tasarımından Önce
- [ ] Mobil-özel gereksinimler belirlendi mi?
- [ ] Çevrimdışı davranış planlandı mı?
- [ ] Senkronizasyon stratejisi tasarlandı mı?
- [ ] Bant genişliği kısıtlamaları düşünüldü mü?

### Her Uç Nokta İçin
- [ ] Yanıt mümkün olduğunca küçük mü?
- [ ] Sayfalandırma imleç (cursor) tabanlı mı?
- [ ] Düzgün önbellek headerları var mı?
- [ ] Eylemler içeren mobil hata formatı var mı?

### Kimlik Doğrulama
- [ ] Token yenileme uygulandı mı?
- [ ] Sessiz yeniden yetkilendirme akışı?
- [ ] Çoklu cihaz çıkışı?
- [ ] Güvenli token saklama rehberliği?

### Push Bildirimleri
- [ ] FCM + APNs yapılandırıldı mı?
- [ ] Token yaşam döngüsü yönetiliyor mu?
- [ ] Sessiz vs görüntülü push tanımlandı mı?
- [ ] Hassas veriler push yükünde DEĞİL mi?

### Sürüm
- [ ] Sürüm kontrol uç noktası hazır mı?
- [ ] Özellik bayrakları yapılandırıldı mı?
- [ ] Zorunlu güncelleme mekanizması?
- [ ] İzleme headerları gerekli mi?

---

> **Unutmayın:** Mobil backend kötü ağlara dayanıklı olmalı, pil ömrüne saygı duymalı ve kesintiye uğrayan oturumları zarifçe yönetmelidir. İstemciye güvenilemez, ancak yüzüne de kapatılamaz—çevrimdışı yetenekler ve net hata kurtarma yolları sağlayın.
