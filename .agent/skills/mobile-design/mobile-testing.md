# Mobil Test Desenleri

> **Mobil test web testi DEĞİLDİR. Farklı kısıtlamalar, farklı stratejiler.**
> Bu dosya her test yaklaşımının NE ZAMAN ve NEDEN kullanılacağını öğretir.
> **Kod örnekleri minimaldir - karar vermeye odaklanın.**

---

## 🧠 MOBİL TEST ZİHNİYETİ

```
Mobil test web'den farklıdır:
├── Gerçek cihazlar önemlidir (emülatörler hataları gizler)
├── Platform farklılıkları (iOS vs Android davranışı)
├── Ağ koşulları çılgınca değişir
├── Pil/performans test altındadır
├── Uygulama yaşam döngüsü (arka plan, öldürüldü, geri yüklendi)
├── İzinler ve sistem diyalogları
└── Tıklamalar yerine dokunma etkileşimleri
```

---

## 🚫 AI MOBİL TEST ANTİ-DESENLERİ

| ❌ AI Varsayılanı | Neden Yanlış | ✅ Mobil-Doğrusu |
|---------------|----------------|-------------------|
| Sadece Jest testi | Yerel katmanı kaçırır | Jest + Cihazda E2E |
| Enzyme desenleri | Eski, web odaklı | React Native Testing Library |
| Tarayıcı tabanlı E2E (Cypress) | Yerel özellikleri test edemez | Detox / Maestro |
| Her şeyi mocklamak | Entegrasyon hatalarını kaçırır | Gerçek cihaz testi |
| Platform testlerini yoksaymak | iOS/Android farklılaşır | Platforma özel durumlar |
| Performans testlerini atlamak | Mobil perf kritiktir | Düşük seviye cihazda profilleme |
| Sadece mutlu yolu test etmek | Mobilde daha fazla uç durum var | Çevrimdışı, izinler, kesintiler |
| %100 birim test kapsamı | Yanıltıcı güvenlik | Piramit dengesi |
| Web test desenlerini kopyalamak | Farklı ortam | Mobil odaklı araçlar |

---

## 1. Test Aracı Seçimi

### Karar Ağacı

```
NEYİ TEST EDİYORSUNUZ?
        │
        ├── Saf fonksiyonlar, yardımcılar (utils)
        │   └── Jest (birim testleri)
        │       └── Özel mobil kuruluma gerek yok
        │
        ├── Bağımsız bileşenler (izole)
        │   ├── React Native → React Native Testing Library
        │   ├── Flutter → flutter_test (widget testleri)
        │
        ├── Hook, context, navigasyon içeren bileşenler
        │   ├── React Native → RNTL + mock providerlar
        │   ├── Flutter → integration_test paketi
        │
        ├── Tam kullanıcı akışları (giriş, ödeme, vb.)
        │   ├── Detox (React Native, hızlı, güvenilir)
        │   ├── Maestro (Çapraz platform, YAML tabanlı)
        │   └── Appium (Eski, yavaş, son çare)
        │
        └── Performans, bellek, pil
            ├── Flashlight (RN performans)
            ├── Flutter DevTools
            └── Gerçek cihaz profilleme (Xcode/Android Studio)
```

### Araç Karşılaştırması

| Araç | Platform | Hız | Güvenilirlik | Ne Zaman Kullanılır |
|------|----------|-------|-------------|----------|
| **Jest** | RN | ⚡⚡⚡ | ⚡⚡⚡ | Birim testleri, mantık |
| **RNTL** | RN | ⚡⚡⚡ | ⚡⚡ | Bileşen testleri |
| **flutter_test** | Flutter | ⚡⚡⚡ | ⚡⚡⚡ | Widget testleri |
| **Detox** | RN | ⚡⚡ | ⚡⚡⚡ | E2E, kritik akışlar |
| **Maestro** | İkisi | ⚡⚡ | ⚡⚡ | E2E, çapraz platform |
| **Appium** | İkisi | ⚡ | ⚡ | Eski, son çare |

---

## 2. Mobil İçin Test Piramidi

```
                    ┌───────────────┐
                    │   E2E Tests   │  %10
                    │ (Gerçek cihaz) │  Yavaş, pahalı, temel
                    ├───────────────┤
                    │  Integration  │  %20
                    │    Tests      │  Bileşen + bağlam
                    ├───────────────┤
                    │  Component    │  %30
                    │    Tests      │  İzole UI
                    ├───────────────┤
                    │   Unit Tests  │  %40
                    │    (Jest)     │  Saf mantık
                    └───────────────┘
```

### Neden Bu Dağılım?

| Seviye | Neden Bu % |
|-------|------------|
| **E2E %10** | Yavaş, kararsız ama entegrasyon hatalarını yakalar |
| **Entegrasyon %20** | Tam uygulama olmadan gerçek kullanıcı akışlarını test eder |
| **Bileşen %30** | UI değişikliklerinde hızlı geri bildirim |
| **Birim %40** | En hızlı, en kararlı, mantık kapsamı |

> 🔴 **Eğer %90 birim testiniz ve %0 E2E testiniz varsa, yanlış şeyleri test ediyorsunuz.**

---

## 3. Her Seviyede Neyi Test Etmeli

### Birim Testleri (Jest)

```
✅ TEST ET:
├── Yardımcı fonksiyonlar (formatDate, calculatePrice)
├── Durum düşürücüleri (Redux, Zustand store'ları)
├── API yanıt dönüştürücüleri
├── Doğrulama mantığı
└── İş kuralları

❌ TEST ETME:
├── Bileşen renderlama (bileşen testlerini kullan)
├── Navigasyon (entegrasyon testlerini kullan)
├── Yerel modüller (onları mockla)
└── Üçüncü taraf kütüphaneler
```

### Bileşen Testleri (RNTL / flutter_test)

```
✅ TEST ET:
├── Bileşen doğru render ediliyor
├── Kullanıcı etkileşimleri (dokunma, yazma, kaydırma)
├── Yükleniyor/hata/boş durumları
├── Erişilebilirlik etiketleri mevcut
└── Prop değişiklik davranışı

❌ TEST ETME:
├── İç uygulama detayları
├── Her şeyin anlık görüntüsü (sadece anahtar bileşenler)
├── Stil detayları (kırılgan)
└── Üçüncü taraf bileşen içleri
```

### Entegrasyon Testleri

```
✅ TEST ET:
├── Form gönderme akışları
├── Ekranlar arası navigasyon
├── Ekranlar arası durum kalıcılığı
├── API entegrasyonu (mock sunucu ile)
└── Context/provider etkileşimleri

❌ TEST ETME:
├── Her olası yol (birim testlerini kullan)
├── Üçüncü taraf hizmetler (onları mockla)
└── Backend mantığı (backend testleri)
```

### E2E Testleri

```
✅ TEST ET:
├── Kritik kullanıcı yolculukları (giriş, satın alma, kayıt)
├── Çevrimdışı → çevrimiçi geçişleri
├── Derin link işleme
├── Push bildirimi navigasyonu
├── İzin akışları
└── Ödeme akışları

❌ TEST ETME:
├── Her uç durum (çok yavaş)
├── Görsel regresyon (anlık görüntü testlerini kullan)
├── Kritik olmayan özellikler
└── Sadece backend mantığı
```

---

## 4. Platforma Özel Testler

### iOS ve Android Arasında Ne Farklıdır?

| Alan | iOS Davranışı | Android Davranışı | İkisini de Test Et? |
|------|--------------|------------------|------------|
| **Geri navigasyon** | Kenar kaydırma | Sistem geri butonu | ✅ EVET |
| **İzinler** | Bir kez sor, ayarlar | Her seferinde sor, gerekçe | ✅ EVET |
| **Klavye** | Farklı görünüm | Farklı davranış | ✅ EVET |
| **Tarih seçici** | Tekerlek/modal | Material dialog | ⚠️ Özel UI ise |
| **Push format** | APNs yükü | FCM yükü | ✅ EVET |
| **Derin linkler** | Universal Links | App Links | ✅ EVET |
| **Jestler** | Bazıları benzersiz | Material jestleri | ⚠️ Özel ise |

### Platform Test Stratejisi

```
HER PLATFORM İÇİN:
├── Birim testlerini çalıştır (ikisinde de aynı)
├── Bileşen testlerini çalıştır (ikisinde de aynı)
├── GERÇEK CİHAZDA E2E çalıştır
│   ├── iOS: iPhone (sadece simülatör değil)
│   └── Android: Orta seviye cihaz (amiral gemisi değil)
└── Platforma özgü özellikleri ayrı test et
```

---

## 5. Çevrimdışı & Ağ Testi

### Test Edilecek Çevrimdışı Senaryolar

| Senaryo | Neyi Doğrula |
|----------|----------------|
| Uygulamayı çevrimdışı başlat | Önbelleğe alınmış veriyi veya çevrimdışı mesajını gösterir |
| İşlem ortasında çevrimdışı ol | Eylem kuyruğa alınır, kaybolmaz |
| Tekrar çevrimiçi ol | Kuyruk senkronize edilir, kopya yok |
| Yavaş ağ (2G) | Yükleme durumları, zaman aşımları çalışır |
| Kararsız ağ | Yeniden deneme mantığı, hata kurtarma |

### Ağ Koşulları Nasıl Test Edilir

```
YAKLAŞIM:
├── Birim testleri: NetInfo'yu mockla, mantığı test et
├── Entegrasyon: API yanıtlarını mockla, UI'ı test et
├── E2E (Detox): device.setURLBlacklist() kullan
├── E2E (Maestro): Ağ koşullarını kullan
└── Manuel: Charles Proxy / Network Link Conditioner kullan
```

---

## 6. Performans Testi

### Neyi Ölçmeli

| Metrik | Hedef | Nasıl Ölçülür |
|--------|--------|----------------|
| **Uygulama başlangıcı** | < 2 saniye | Profiler, Flashlight |
| **Ekran geçişi** | < 300ms | React DevTools |
| **Liste kaydırma** | 60 FPS | Profiler, his |
| **Bellek** | Kararlı, sızıntı yok | Instruments / Android Profiler |
| **Paket boyutu** | Minimize et | Metro bundler analizi |

### Ne Zaman Performans Testi Yapmalı

```
PERFORMANS TESTİ:
├── Yayından önce (gerekli)
├── Ağır özellikler ekledikten sonra
├── Bağımlılıkları güncelledikten sonra
├── Kullanıcılar yavaşlık bildirdiğinde
└── CI üzerinde (isteğe bağlı, otomatik kıyaslamalar)

NEREDE TEST ETMELİ:
├── Gerçek cihaz (GEREKLİ)
├── Düşük seviye cihaz (Galaxy A serisi, eski iPhone)
├── Emülatörde DEĞİL (performans hakkında yalan söyler)
└── Üretim benzeri verilerle (3 öğe değil)
```

---

## 7. Erişilebilirlik Testi

### Neyi Doğrulamalı

| Öğe | Kontrol |
|---------|-------|
| Etkileşimli öğeler | accessibilityLabel var |
| Resimler | Alt metin veya dekoratif bayrak var |
| Formlar | Etiketler girdilere bağlı |
| Butonlar | Role = button |
| Dokunma hedefleri | ≥ 44x44 (iOS) / 48x48 (Android) |
| Renk kontrastı | WCAG AA minimum |

### Nasıl Test Edilir

```
OTOMATİK:
├── React Native: jest-axe
├── Flutter: Testlerde accessibility checker
└── Eksik etiketler için Lint kuralları

MANUEL:
├── VoiceOver (iOS) / TalkBack (Android) etkinleştir
├── Tüm uygulamayı ekran okuyucu ile gez
├── Artırılmış metin boyutu ile test et
└── Azaltılmış hareket ile test et
```

---

## 8. CI/CD Entegrasyonu

### Nerede Ne Çalıştırılmalı

| Aşama | Testler | Cihazlar |
|-------|-------|---------|
| **PR** | Birim + Bileşen | Yok (hızlı) |
| **Main'e birleştirme** | + Entegrasyon | Simülatör/Emülatör |
| **Ön yayın** | + E2E | Gerçek cihazlar (çiftlik) |
| **Gece** | Tam paket | Cihaz çiftliği |

### Cihaz Çiftliği Seçenekleri

| Hizmet | Artıları | Eksileri |
|---------|------|------|
| **Firebase Test Lab** | Ücretsiz katman, Google cihazları | Android odaklı |
| **AWS Device Farm** | Geniş seçim | Pahalı |
| **BrowserStack** | İyi UX | Pahalı |
| **Yerel cihazlar** | Ücretsiz, güvenilir | Sınırlı çeşitlilik |

---

## 📝 MOBİL TEST KONTROL LİSTESİ

### PR'dan Önce
- [ ] Yeni mantık için birim testleri
- [ ] Yeni UI için bileşen testleri
- [ ] Testlerde console.log yok
- [ ] Testler CI'da geçiyor

### Yayından Önce
- [ ] Gerçek iOS cihazında E2E
- [ ] Gerçek Android cihazında E2E
- [ ] Düşük seviye cihazda test edildi
- [ ] Çevrimdışı senaryolar doğrulandı
- [ ] Performans kabul edilebilir
- [ ] Erişilebilirlik doğrulandı

### Neleri Atlamalı (Bilinçli Olarak)
- [ ] %100 kapsam (anlamlı kapsamı hedefleyin)
- [ ] Her görsel permütasyon (anlık görüntüleri idareli kullanın)
- [ ] Üçüncü taraf kütüphane içleri
- [ ] Backend mantığı (ayrı testler)

---

## 🎯 Sorulacak Test Soruları

Test yazmadan önce cevaplayın:

1. **Ne bozulabilir?** → Onu test et
2. **Kullanıcılar için kritik olan ne?** → Onu E2E test et
3. **Karmaşık mantık nedir?** → Onu birim test et
4. **Platforma özgü olan ne?** → Her iki platformda test et
5. **Çevrimdışı ne olur?** → O senaryoyu test et

> **Unutmayın:** İyi mobil test, HER ŞEYİ değil, DOĞRU şeyleri test etmektir. Kararsız (flaky) bir E2E testi, hiç test olmamasından daha kötüdür. Hatayı yakalayan başarısız bir birim testi, geçen 100 önemsiz testten daha değerlidir.
