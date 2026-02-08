# Mobil Karar Ağaçları

> Çerçeve (Framework) seçimi, durum yönetimi, depolama stratejisi ve bağlam tabanlı kararlar.
> **Bunlar DÜŞÜNME rehberleridir, kopyala-yapıştır cevaplar değil.**

---

## 1. Çerçeve Seçimi

### Ana Karar Ağacı

```
NE İNŞA EDİYORSUNUZ?
        │
        ├── App store incelemesi olmadan OTA (Over-The-Air) güncellemelere ihtiyacınız var mı?
        │   │
        │   ├── Evet → React Native + Expo
        │   │         ├── Geliştirme için Expo Go
        │   │         ├── Üretim OTA için EAS Update
        │   │         └── En iyisi: hızlı iterasyon, web ekipleri
        │   │
        │   └── Hayır → Devam et ▼
        │
        ├── Platformlar arasında piksel-mükemmel özel arayüze ihtiyacınız var mı?
        │   │
        │   ├── Evet → Flutter
        │   │         ├── Özel rendering motoru
        │   │         ├── iOS + Android için tek UI
        │   │         └── En iyisi: markalı, görsel uygulamalar
        │   │
        │   └── Hayır → Devam et ▼
        │
        ├── Ağır yerel özellikler (ARKit, HealthKit, özel sensörler)?
        │   │
        │   ├── Sadece iOS → SwiftUI / UIKit
        │   │              └── Maksimum yerel yetenek
        │   │
        │   ├── Sadece Android → Kotlin + Jetpack Compose
        │   │                  └── Maksimum yerel yetenek
        │   │
        │   └── İkisi de → Paylaşılan mantık ile yerel (native) düşünün
        │              └── Paylaşılan için Kotlin Multiplatform
        │
        ├── Mevcut web ekibi + TypeScript kod tabanı?
        │   │
        │   └── Evet → React Native
        │             ├── React geliştiricileri için tanıdık paradigma
        │             ├── Web ile kod paylaşımı (sınırlı)
        │             └── Geniş ekosistem
        │
        └── Mevcut Flutter ekibi olan kurumsal yapı?
            │
            └── Evet → Flutter
                      └── Mevcut uzmanlığı kullan
```

### Çerçeve Karşılaştırması

| Faktör | React Native | Flutter | Native (Swift/Kotlin) |
|--------|-------------|---------|----------------------|
| **OTA Güncellemeleri** | ✅ Expo | ❌ Hayır | ❌ Hayır |
| **Öğrenme Eğrisi** | Düşük (React geliştiricileri) | Orta | Daha Yüksek |
| **Performans** | İyi | Mükemmel | En İyi |
| **UI Tutarlılığı** | Platforma özgü | Özdeş | Platforma özgü |
| **Paket Boyutu** | Orta | Daha Büyük | En Küçük |
| **Yerel Erişim** | Köprüler (bridges) ile | Kanallar ile | Doğrudan |
| **Hot Reload** | ✅ | ✅ | ✅ (Xcode 15+) |

### Ne Zaman Native Seçilmeli

```
ŞU DURUMLARDA NATIVE SEÇİN:
├── Maksimum performans gerekiyorsa (oyunlar, 3D)
├── Derin OS entegrasyonu gerekiyorsa
├── Platforma özgü özellikler temel ise
├── Ekibin native uzmanlığı varsa
├── App store varlığı birincil ise
└── Uzun vadeli bakım öncelikliyse

ŞU DURUMLARDA NATIVE'DEN KAÇININ:
├── Bütçe/zaman sınırlıysa
├── Hızlı iterasyon gerekiyorsa
├── Her iki platformda özdeş UI gerekiyorsa
├── Ekip web odaklıysa
└── Çapraz platform öncelikliyse
```

---

## 2. Durum Yönetimi Seçimi

### React Native Durum Kararı

```
DURUM KARMAŞIKLIĞINIZ NEDİR?
        │
        ├── Basit uygulama, az ekran, minimal paylaşılan durum
        │   │
        │   └── Zustand (veya sadece useState/Context)
        │       ├── Minimal kod kalıbı (boilerplate)
        │       ├── Anlaması kolay
        │       └── Ortaya kadar iyi ölçeklenir
        │
        ├── Öncelikle sunucu verisi (API güdümlü)
        │   │
        │   └── TanStack Query (React Query) + Zustand
        │       ├── Sunucu durumu için Query
        │       ├── UI durumu için Zustand
        │       └── Mükemmel önbellekleme, yeniden getirme
        │
        ├── Çok özellikli karmaşık uygulama
        │   │
        │   └── Redux Toolkit + RTK Query
        │       ├── Öngörülebilir, hata ayıklanabilir
        │       ├── API için RTK Query
        │       └── Büyük ekipler için iyi
        │
        └── Atomik, granüler durum ihtiyaçları
            │
            └── Jotai
                ├── Atom tabanlı (Recoil gibi)
                ├── Yeniden renderları en aza indirir
                └── Türetilmiş durum için iyi
```

### Flutter Durum Kararı

```
DURUM KARMAŞIKLIĞINIZ NEDİR?
        │
        ├── Basit uygulama, Flutter öğreniyorum
        │   │
        │   └── Provider (veya setState)
        │       ├── Resmi, basit
        │       ├── Flutter'a yerleşik
        │       └── Küçük uygulamalar için iyi
        │
        ├── Modern, tip güvenli, test edilebilir
        │   │
        │   └── Riverpod 2.0
        │       ├── Derleme zamanı güvenliği
        │       ├── Kod üretimi
        │       ├── Orta-büyük uygulamalar için mükemmel
        │       └── Yeni projeler için önerilir
        │
        ├── Kurumsal, katı desenler gerekli
        │   │
        │   └── BLoC
        │       ├── Event → State deseni
        │       ├── Çok test edilebilir
        │       ├── Daha fazla kod kalıbı
        │       └── Büyük ekipler için iyi
        │
        └── Hızlı prototipleme
            │
            └── GetX (dikkatli olun)
                ├── Uygulaması hızlı
                ├── Daha az katı desenler
                └── Ölçeklendiğinde karışık olabilir
```

### Durum Yönetimi Anti-Desenleri

```
❌ YAPMA:
├── Her şey için global durum kullanma
├── Durum yönetimi yaklaşımlarını karıştırma
├── Sunucu durumunu yerel durumda saklama
├── Durum normalizasyonunu atlama
├── Context'i aşırı kullanma (ağır yeniden render)
└── Navigasyon durumunu uygulama durumuna koyma

✅ YAP:
├── Sunucu durumu → Query kütüphanesi
├── UI durumu → Minimal, önce yerel
├── Durumu sadece gerektiğinde yukarı taşı (lift state)
├── Proje başına TEK yaklaşım seç
└── Durumu kullanıldığı yere yakın tut
```

---

## 3. Navigasyon Deseni Seçimi

```
KAÇ TANE ÜST DÜZEY HEDEF VAR?
        │
        ├── 2 hedef
        │   └── Düşün: Üst sekmeler veya basit yığın (stack)
        │
        ├── 3-5 hedef (eşit önemde)
        │   └── ✅ Tab Bar / Alt Navigasyon
        │       ├── En yaygın desen
        │       └── Kolay keşif
        │
        ├── 5+ hedef
        │   │
        │   ├── Hepsi önemli → Çekmece (Drawer) Navigasyonu
        │   │                   └── Gizli ama çok seçenek
        │   │
        │   └── Bazıları daha az önemli → Tab bar + drawer hibrit
        │
        └── Tek doğrusal akış?
            └── Sadece Stack Navigasyonu
                └── İşe alıştırma (onboarding), ödeme vb.
```

### Uygulama Türüne Göre Navigasyon

| Uygulama Türü | Desen | Neden |
|----------|---------|--------|
| Sosyal (Instagram) | Tab bar | Sık geçiş |
| E-ticaret | Tab bar + stack | Kategoriler sekme olarak |
| E-posta (Gmail) | Drawer + list-detail | Çok klasör |
| Ayarlar | Sadece Stack | Derin kırılım |
| İşe Alıştırma | Stack sihirbazı | Doğrusal akış |
| Mesajlaşma | Tab (sohbetler) + stack | Konular (threads) |

---

## 4. Depolama Stratejisi Seçimi

```
NE TÜR VERİ?
        │
        ├── Hassas (tokenlar, şifreler, anahtarlar)
        │   │
        │   └── ✅ Güvenli Depolama (Secure Storage)
        │       ├── iOS: Keychain
        │       ├── Android: EncryptedSharedPreferences
        │       └── RN: expo-secure-store / react-native-keychain
        │
        ├── Kullanıcı tercihleri (ayarlar, tema)
        │   │
        │   └── ✅ Anahtar-Değer Depolama (Key-Value)
        │       ├── iOS: UserDefaults
        │       ├── Android: SharedPreferences
        │       └── RN: AsyncStorage / MMKV
        │
        ├── Yapılandırılmış veri (varlıklar, ilişkiler)
        │   │
        │   └── ✅ Veritabanı
        │       ├── SQLite (expo-sqlite, sqflite)
        │       ├── Realm (NoSQL, reaktif)
        │       └── WatermelonDB (büyük veri setleri)
        │
        ├── Büyük dosyalar (resimler, belgeler)
        │   │
        │   └── ✅ Dosya Sistemi
        │       ├── iOS: Documents / Caches dizini
        │       ├── Android: Internal/External depolama
        │       └── RN: react-native-fs / expo-file-system
        │
        └── Önbelleğe alınmış API verisi
            │
            └── ✅ Query Kütüphanesi Önbelleği
                ├── TanStack Query (RN)
                ├── Riverpod async (Flutter)
                └── Otomatik geçersiz kılma (invalidation)
```

### Depolama Karşılaştırması

| Depolama | Hız | Güvenlik | Kapasite | Kullanım Durumu |
|---------|-------|----------|----------|----------|
| Secure Storage | Orta | 🔒 Yüksek | Küçük | Tokenlar, sırlar |
| Key-Value | Hızlı | Düşük | Orta | Ayarlar |
| SQLite | Hızlı | Düşük | Büyük | Yapılandırılmış veri |
| File System | Orta | Düşük | Çok Büyük | Medya, belgeler |
| Query Cache | Hızlı | Düşük | Orta | API yanıtları |

---

## 5. Çevrimdışı (Offline) Strateji Seçimi

```
ÇEVRİMDIŞI NE KADAR KRİTİK?
        │
        ├── Olsa iyi olur (mümkün olduğunda çalışır)
        │   │
        │   └── Son veriyi önbelleğe al + eskiyi göster
        │       ├── Basit uygulama
        │       ├── staleTime ile TanStack Query
        │       └── "Son güncelleme" zaman damgasını göster
        │
        ├── Gerekli (temel işlevsellik çevrimdışı)
        │   │
        │   └── Offline-first mimari
        │       ├── Gerçek kaynağı olarak yerel veritabanı
        │       ├── Çevrimiçi olduğunda sunucuya senkronize et
        │       ├── Çatışma çözüm stratejisi
        │       └── Eylemleri sonraki senkronizasyon için kuyrağa al
        │
        └── Gerçek zamanlı kritik (işbirliği, sohbet)
            │
            └── WebSocket + yerel kuyruk
                ├── İyimser (optimistic) güncellemeler
                ├── Nihai tutarlılık (eventual consistency)
                └── Karmaşık çatışma yönetimi
```

### Çevrimdışı Uygulama Desenleri

```
1. CACHE-FIRST (Basit)
   İstek → Önbelleği kontrol et → Eskiyse getir → Önbelleği güncelle
   
2. STALE-WHILE-REVALIDATE
   İstek → Önbelleği döndür → Güncellemeyi getir → UI'ı güncelle
   
3. OFFLINE-FIRST (Karmaşık)
   Eylem → Yerel DB'ye yaz → Senkronizasyon kuyruğuna al → Çevrimiçiyken senkronize et
   
4. SENKRONİZASYON MOTORU
   Kullan: Firebase, Realm Sync, Supabase realtime
   Çatışma çözümünü otomatik halleder
```

---

## 6. Kimlik Doğrulama Deseni Seçimi

```
HANGİ AUTH TÜRÜ GEREKLİ?
        │
        ├── Basit e-posta/şifre
        │   │
        │   └── Token tabanlı (JWT)
        │       ├── Yenileme (refresh) tokenını güvenli sakla
        │       ├── Erişim (access) tokenını bellekte tut
        │       └── Sessiz yenileme akışı
        │
        ├── Sosyal giriş (Google, Apple, vb.)
        │   │
        │   └── OAuth 2.0 + PKCE
        │       ├── Platform SDK'larını kullan
        │       ├── Derin link (deep link) geri çağrısı
        │       └── iOS için Apple Girişi zorunlu
        │
        ├── Kurumsal/SSO
        │   │
        │   └── OIDC / SAML
        │       ├── Web view veya sistem tarayıcısı
        │       └── Yönlendirmeyi düzgün yönet
        │
        └── Biyometrik (FaceID, parmak izi)
            │
            └── Yerel auth + güvenli token
                ├── Biyometrik saklanan tokenın kilidini açar
                ├── Sunucu auth'un yerini tutmaz
                └── PIN/şifre yedeği
```

### Auth Token Depolama

```
❌ Tokenları ASLA şuralarda saklama:
├── AsyncStorage (düz metin)
├── Redux/state (doğru şekilde kalıcı değil)
├── Yerel depolama eşdeğeri
└── Loglar veya debug çıktısı

✅ Tokenları HER ZAMAN şuralarda sakla:
├── iOS: Keychain
├── Android: EncryptedSharedPreferences
├── Expo: SecureStore
├── Mümkünse biyometrik korumalı
```

---

## 7. Proje Türü Şablonları

### E-Ticaret Uygulaması

```
ÖNERİLEN YIĞIN:
├── Çerçeve: React Native + Expo (Fiyatlandırma için OTA)
├── Navigasyon: Tab bar (Ana Sayfa, Arama, Sepet, Hesap)
├── Durum: TanStack Query (ürünler) + Zustand (sepet)
├── Depolama: SecureStore (auth) + SQLite (sepet önbelleği)
├── Çevrimdışı: Ürünleri önbelleğe al, sepet eylemlerini kuyrağa al
└── Auth: E-posta/şifre + Sosyal + Apple Pay

ANAHTAR KARARLAR:
├── Ürün resimleri: Tembel yükle, agresif önbellekle
├── Sepet: API aracılığıyla cihazlar arasında senkronize et
├── Ödeme: Güvenli, minimal adımlar
└── Derin linkler: Ürün paylaşımları, pazarlama
```

### Sosyal/İçerik Uygulaması

```
ÖNERİLEN YIĞIN:
├── Çerçeve: React Native veya Flutter
├── Navigasyon: Tab bar (Akış, Arama, Oluştur, Bildirimler, Profil)
├── Durum: TanStack Query (akış) + Zustand (UI)
├── Depolama: SQLite (akış önbelleği, taslaklar)
├── Çevrimdışı: Akışı önbelleğe al, gönderileri kuyrağa al
└── Auth: Sosyal giriş birincil, Apple zorunlu

ANAHTAR KARARLAR:
├── Akış: Sonsuz kaydırma, ezberlenmiş (memoized) öğeler
├── Medya: Yükleme kuyruğu, arka plan yüklemesi
├── Push: İçeriğe derin link
└── Gerçek zamanlı: Bildirimler için WebSocket
```

### Üretkenlik/SaaS Uygulaması

```
ÖNERİLEN YIĞIN:
├── Çerçeve: Flutter (tutarlı UI) veya RN
├── Navigasyon: Drawer veya Tab bar
├── Durum: Riverpod/BLoC veya Redux Toolkit
├── Depolama: SQLite (çevrimdışı), SecureStore (auth)
├── Çevrimdışı: Tam çevrimdışı düzenleme, senkronizasyon
└── Auth: Kurumsal için SSO/OIDC

ANAHTAR KARARLAR:
├── Veri senkronizasyonu: Çatışma çözüm stratejisi
├── İşbirlikçi: Gerçek zamanlı mı nihai mi?
├── Dosyalar: Büyük dosya yönetimi
└── Kurumsal: MDM, uyumluluk
```

---

## 8. Karar Kontrol Listesi

### HERHANGİ Bir Projeye Başlamadan Önce

- [ ] Hedef platformlar tanımlandı mı (iOS/Android/ikisi)?
- [ ] Kriterlere göre çerçeve seçildi mi?
- [ ] Durum yönetimi yaklaşımı seçildi mi?
- [ ] Navigasyon deseni seçildi mi?
- [ ] Her veri türü için depolama stratejisi?
- [ ] Çevrimdışı gereksinimler tanımlandı mı?
- [ ] Auth akışı tasarlandı mı?
- [ ] Baştan planlanan derin linkleme?

### Kullanıcıya Sorulacak Sorular

```
Proje detayları belirsizse, SORUN:

1. "App store incelemesi olmadan OTA güncellemelere ihtiyaç var mı?"
   → Çerçeve seçimini etkiler (Expo = evet)

2. "iOS ve Android'in özdeş UI'a ihtiyacı var mı?"
   → Çerçeveyi etkiler (Flutter = özdeş)

3. "Çevrimdışı gereksinimi nedir?"
   → Mimari karmaşıklığını etkiler

4. "Mevcut bir backend/auth sistemi var mı?"
   → Auth ve API yaklaşımını etkiler

5. "Hangi cihazlar? Sadece telefon mu, yoksa tablet mi?"
   → Navigasyon ve düzeni etkiler

6. "Kurumsal mı tüketici mi?"
   → Auth (SSO), güvenlik, uyumluluğu etkiler
```

---

## 9. Anti-Desen Kararları

### ❌ Karar Anti-Desenleri

| Anti-Desen | Neden Kötü | Daha İyi Yaklaşım |
|--------------|--------------|-----------------|
| **Basit uygulama için Redux** | Aşırı yük (overkill) | Zustand veya context |
| **MVP için Native** | Yavaş geliştirme | Çapraz platform MVP |
| **3 bölüm için Drawer** | Gizli navigasyon | Tab bar |
| **Tokenlar için AsyncStorage** | Güvensiz | SecureStore |
| **Çevrimdışı düşüncesi yok** | Metroda bozulur | Baştan planla |
| **Tüm projeler için aynı yığın** | Bağlama uymaz | Proje başına değerlendir |

---

## 10. Hızlı Referans

### Çerçeve Hızlı Seçim

```
OTA gerekli?           → React Native + Expo
Özdeş UI?              → Flutter
Maksimum performans?   → Native
Web ekibi?             → React Native
Hızlı prototip?        → Expo
```

### Durum Hızlı Seçim

```
Basit uygulama?        → Zustand / Provider
Sunucu-ağır?           → TanStack Query / Riverpod
Kurumsal?              → Redux / BLoC
Atomik durum?          → Jotai
```

### Depolama Hızlı Seçim

```
Sırlar?                → SecureStore / Keychain
Ayarlar?               → AsyncStorage / UserDefaults
Yapılandırılmış veri?  → SQLite
API önbelleği?         → Query library
```

---

> **Unutmayın:** Bu ağaçlar DÜŞÜNMEK için rehberlerdir, körü körüne izlenecek kurallar değildir. Her projenin benzersiz kısıtlamaları vardır. Gereksinimler belirsiz olduğunda açıklayıcı sorular SORUN ve varsayılanlara değil, gerçek ihtiyaçlara göre seçim yapın.
