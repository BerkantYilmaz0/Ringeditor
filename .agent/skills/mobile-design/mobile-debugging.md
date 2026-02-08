# Mobil Hata Ayıklama Rehberi

> **console.log() ile hata ayıklamayı bırakın!**
> Mobil uygulamaların karmaşık yerel katmanları vardır. Metin logları yeterli değildir.
> **Bu dosya etkili mobil hata ayıklama stratejilerini öğretir.**

---

## 🧠 MOBİL HATA AYIKLAMA ZİHNİYETİ

```
Web Hata Ayıklama:  Mobil Hata Ayıklama:
┌──────────────┐    ┌──────────────┐
│  Browser     │    │  JS Bridge   │
│  DevTools    │    │  Native UI   │
│  Network Tab │    │  GPU/Memory  │
└──────────────┘    │  Threads     │
                    └──────────────┘
```

**Ana Farklar:**
1.  **Yerel Katman:** JS kodu çalışıyor ama uygulama çöküyor mu? Muhtemelen yereldir (Java/Obj-C).
2.  **Dağıtım:** Sadece "yenile" yapamazsınız. Durum kaybolur veya takılır.
3.  **Ağ:** SSL Pinning, proxy ayarları daha zordur.
4.  **Cihaz Logları:** `adb logcat` ve `Console.app` sizin gerçeğinizdir.

---

## 🚫 AI HATA AYIKLAMA ANTI-DESENLERİ

| ❌ Varsayılan | ✅ Mobil-Doğrusu |
|------------|-------------------|
| "console.logs ekle" | Flipper / Reactotron kullan |
| "Ağ sekmesini kontrol et" | Charles Proxy / Proxyman kullan |
| "Simülatörde çalışıyor" | **Gerçek Cihazda Test Et** (Donanıma özgü hatalar) |
| "node_modules'ü yeniden kur" | **Yerel İnşayı Temizle** (Gradle/Pod önbelleği) |
| Yerel logları görmezden gelme | `logcat` / Xcode loglarını oku |

---

## 1. Araç Seti

### ⚡ React Native & Expo

| Araç | Amaç | En İyisi |
|------|---------|----------|
| **Reactotron** | Durum/API/Redux | JS tarafı hata ayıklama |
| **Flipper** | Düzen/Ağ/db | Native + JS köprüsü |
| **Expo Tools** | Eleman denetçisi | Hızlı UI kontrolleri |

### 🛠️ Yerel Katman (Derinlemesine İnceleme)

| Araç | Platform | Komut | Neden Kullanılır? |
|------|----------|---------|----------|
| **Logcat** | Android | `adb logcat` | Yerel çökmeler, ANR'ler |
| **Console** | iOS | Xcode aracılığıyla | Yerel istisnalar, bellek |
| **Layout Insp.** | Android | Android Studio | UI hiyerarşi hataları |
| **View Insp.** | iOS | Xcode | UI hiyerarşi hataları |

---

## 2. Yaygın Hata Ayıklama İş Akışları

### 🕵️ "Uygulama Aniden Çöktü" (Kırmızı Ekran vs Ana Ekrana Çökme)

**Senaryo A: Kırmızı Ekran (JS Hatası)**
- **Neden:** Undefined is not an object, import hatası.
- **Çözüm:** Ekrandaki yığın izini (stack trace) okuyun. Genellikle nettir.

**Senaryo B: Ana Ekrana Çökme (Yerel Çökme)**
- **Neden:** Yerel modül hatası, bellek OOM, bildirilmeden izin kullanımı.
- **Araçlar:**
    - **Android:** `adb logcat *:E` (Hatalar için filtrele)
    - **iOS:** Xcode'u Aç → Window → Devices → View Device Logs

> **💡 Profesyonel İpucu:** Uygulama açılışta hemen çöküyorsa, bu neredeyse %100 yerel bir yapılandırma sorunudur (Info.plist, AndroidManifest.xml).

### 🌐 "API İsteği Başarısız" (Ağ)

**Web:** Chrome DevTools → Network açın.
**Mobil:** *Bunu genellikle kolayca göremezsiniz.*

**Çözüm 1: Reactotron/Flipper**
- İzleme uygulamasında ağ isteklerini görüntüleyin.

**Çözüm 2: Proxy (Charles/Proxyman)**
- **Zor ama güçlü.** Yerel SDK'lardan gelenler dahil TÜM trafiği görün.
- Cihaza SSL sertifikası yüklemeyi gerektirir.

### 🐢 "UI Gecikmeli" (Performans)

**Tahmin etmeyin.** Ölçün.
- **React Native:** Performance Monitor (Salla menüsü).
- **Android:** Geliştirici Seçeneklerinde "GPU İşlemeyi Profille".
- **Sorunlar:**
    - **JS FPS düşüşü:** JS iş parçacığında ağır hesaplama.
    - **UI FPS düşüşü:** Çok fazla görünüm, karmaşık hiyerarşi, ağır resimler.

---

## 3. Platforma Özgü Kabuslar

### Android
- **Gradle Sync Başarısız:** Genellikle Java sürüm uyumsuzluğu veya yinelenen sınıflar.
- **Emülatör Ağı:** Emülatör `localhost`u `10.0.2.2`dir, `127.0.0.1` DEĞİL.
- **Önbelleğe Alınmış İnşalar:** `./gradlew clean` en iyi arkadaşınızdır.

### iOS
- **Pod Sorunları:** `pod deintegrate && pod install`.
- **İmzalama Hataları:** Team ID ve Bundle Identifier'ı kontrol edin.
- **Önbellek:** Xcode → Product → Clean Build Folder.

---

## 📝 HATA AYIKLAMA KONTROL LİSTESİ

- [ ] **Bu bir JS mi yoksa Yerel çökme mi?** (Kırmızı ekran mı yoksa ana ekran mı?)
- [ ] **İnşayı temizlediniz mi?** (Yerel önbellekler agresiftir)
- [ ] **Gerçek bir cihazda mısınız?** (Simülatörler eşzamanlılık hatalarını gizler)
- [ ] **Yerel logları kontrol ettiniz mi?** (Sadece terminal çıktısını değil)

> **Unutmayın:** JavaScript mükemmel görünüyor ama uygulama başarısız oluyorsa, Yerel tarafa daha yakından bakın.
