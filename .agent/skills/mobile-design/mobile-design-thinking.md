.agent klasörünü antif# Mobil Tasarım Düşüncesi

> **Bu dosya, AI'ın ezberlenmiş desenleri kullanmasını engeller ve gerçek düşünmeyi zorlar.**
> Mobil geliştirmede standart AI eğitim varsayılanlarını engellemek için mekanizmalar.
> **Frontend'in düzen (layout) ayrıştırma yaklaşımının mobil eşdeğeri.**

---

## 🧠 DERİN MOBİL DÜŞÜNME PROTOKOLÜ

### Bu Süreç Her Mobil Projeden Önce Zorunludur

```
┌─────────────────────────────────────────────────────────────────┐
│                    DERİN MOBİL DÜŞÜNME                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1️⃣ BAĞLAM TARAMASI                                           │
│     └── Bu proje için varsayımlarım neler?                      │
│         └── Bu varsayımları SORGULA                             │
│                                                                 │
│  2️⃣ VARSAYILAN-KARŞITI ANALİZ (ANTI-DEFAULT)                  │
│     └── Ezberlenmiş bir desen mi uyguluyorum?                   │
│         └── Bu desen GERÇEKTEN BU proje için en iyisi mi?       │
│                                                                 │
│  3️⃣ PLATFORM AYRIŞTIRMASI                                     │
│     └── iOS ve Android'i ayrı ayrı düşündüm mü?                 │
│         └── Platforma özgü desenler neler?                      │
│                                                                 │
│  4️⃣ DOKUNMA ETKİLEŞİMİ ANALİZİ                                │
│     └── Her etkileşimi ayrı ayrı analiz ettim mi?               │
│         └── Fitts Yasasını, Başparmak Bölgesini uyguladım mı?   │
│                                                                 │
│  5️⃣ PERFORMANS ETKİ ANALİZİ                                   │
│     └── Her bileşenin performans etkisini düşündüm mü?          │
│         └── Varsayılan çözüm performanslı mı?                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚫 AI MOBİL VARSAYILANLARI (YASAK LİSTESİ)

### Bu Desenleri Otomatik Olarak Kullanmak YASAKTIR!

Aşağıdaki desenler, AI'ların eğitim verilerinden öğrendiği "varsayılanlardır".
Bunlardan herhangi birini kullanmadan önce, **onları SORGULAYIN ve ALTERNATİFLERİ DÜŞÜNÜN!**

```
┌─────────────────────────────────────────────────────────────────┐
│                 🚫 AI MOBİL GÜVENLİ LİMANI                      │
│        (Varsayılan Desenler - Sorgulamadan Asla Kullanma)       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  NAVİGASYON VARSAYILANLARI:                                     │
│  ├── Her proje için Tab bar (Drawer daha mı iyi olurdu?)        │
│  ├── Sabit 5 sekme (3 tane yeterli mi? 6+ için drawer?)         │
│  ├── Solda "Ana Sayfa" sekmesi (Kullanıcı davranışı ne diyor?)  │
│  └── Hamburger menü (Artık modası geçti mi?)                    │
│                                                                 │
│  DURUM YÖNETİMİ VARSAYILANLARI:                                 │
│  ├── Her yerde Redux (Zustand/Jotai yeterli mi?)                │
│  ├── Her şey için global durum (Yerel durum yeterli değil mi?)  │
│  ├── Context Provider cehennemi (Atom tabanlı daha mı iyi?)     │
│  └── Her Flutter projesi için BLoC (Riverpod daha mı modern?)   │
│                                                                 │
│  LİSTE UYGULAMA VARSAYILANLARI:                                 │
│  ├── Varsayılan olarak FlatList (FlashList daha mı performanslı?)│
│  ├── windowSize=21 (Gerçekten gerekli mi?)                      │
│  ├── removeClippedSubviews (Her zaman mı?)                      │
│  └── ListView.builder (ListView.separated daha mı iyi?)         │
│                                                                 │
│  UI DESEN VARSAYILANLARI:                                       │
│  ├── FAB sağ altta (Sol alt daha mı erişilebilir?)              │
│  ├── Her listede çek-yenile (Her yerde gerekli mi?)             │
│  ├── Soldan kaydırarak sil (Sağ daha mı iyi?)                   │
│  └── Her modal için bottom sheet (Tam ekran daha mı iyi?)       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔍 BİLEŞEN AYRIŞTIRMASI (ZORUNLU)

### Her Ekran İçin Ayrıştırma Analizi

Herhangi bir ekranı tasarlamadan önce bu analizi yapın:

```
EKRAN: [Ekran Adı]
├── BİRİNCİL EYLEM: [Ana eylem nedir?]
│   └── Başparmak bölgesinde mi? [Evet/Hayır → Neden?]
│
├── DOKUNMA HEDEFLERİ: [Tüm tıklanabilir öğeler]
│   ├── [Öğe 1]: [Boyut]pt → Yeterli mi?
│   ├── [Öğe 2]: [Boyut]pt → Yeterli mi?
│   └── Boşluk: [Boşluk]pt → Yanlışlıkla dokunma riski?
│
├── KAYDIRILABİLİR İÇERİK:
│   ├── Liste mi? → FlatList/FlashList [Neden bu seçim?]
│   ├── Öğe sayısı: ~[N] → Performans değerlendirmesi?
│   └── Sabit yükseklik? → getItemLayout gerekli mi?
│
├── DURUM GEREKSİNİMLERİ:
│   ├── Yerel durum yeterli mi?
│   ├── Durumu yukarı taşımam (lift state) gerekiyor mu?
│   └── Global gerekli mi? [Neden?]
│
├── PLATFORM FARKLILIKLARI:
│   ├── iOS: [Farklı bir şey gerekli mi?]
│   └── Android: [Farklı bir şey gerekli mi?]
│
├── ÇEVRİMDIŞI DÜŞÜNCESİ:
│   ├── Bu ekran çevrimdışı çalışmalı mı?
│   └── Önbellek stratejisi: [Evet/Hayır/Hangisi?]
│
└── PERFORMANS ETKİSİ:
    ├── Ağır bileşenler var mı?
    ├── Memoization gerekli mi?
    └── Animasyon performansı?
```

---

## 🎯 DESEN SORGULAMA MATRİSİ

Her varsayılan desen için bu soruları sorun:

### Navigasyon Deseni Sorgulama

| Varsayım | Soru | Alternatif |
|------------|----------|-------------|
| "Tab bar kullanacağım" | Kaç hedef var? | 3 → tablar, 6+ → drawer |
| "5 sekme" | Hepsi eşit derecede önemli mi? | "Daha Fazla" sekmesi? Drawer hibrit? |
| "Alt navigasyon" | iPad/tablet desteği? | Navigation rail alternatifi |
| "Stack navigasyonu" | Derin linkleri düşündüm mü? | URL yapısı = navigasyon yapısı |

### Durum Deseni Sorgulama

| Varsayım | Soru | Alternatif |
|------------|----------|-------------|
| "Redux kullanacağım" | Uygulama ne kadar karmaşık? | Basit: Zustand, Sunucu: TanStack |
| "Global durum" | Bu durum gerçekten global mi? | Yerel lift, Context selector |
| "Context Provider" | Yeniden render sorun olacak mı? | Zustand, Jotai (atom tabanlı) |
| "BLoC deseni" | Kod kalıbına değer mi? | Riverpod (daha az kod) |

### Liste Deseni Sorgulama

| Varsayım | Soru | Alternatif |
|------------|----------|-------------|
| "FlatList" | Performans kritik mi? | FlashList (daha hızlı) |
| "Standart renderItem" | Memoize edildi mi? | useCallback + React.memo |
| "Index anahtarı" | Veri sırası değişiyor mu? | item.id kullan |
| "ListView" | Ayırıcılar var mı? | ListView.separated |

### UI Deseni Sorgulama

| Varsayım | Soru | Alternatif |
|------------|----------|-------------|
| "FAB sağ alt" | Kullanıcı hangi elini kullanıyor? | Erişilebilirlik ayarları |
| "Çek-yenile" | Bu listenin yenilenmesi gerekiyor mu? | Sadece gerektiğinde |
| "Modal bottom sheet" | Ne kadar içerik? | Tam ekran modal daha iyi olabilir |
| "Kaydırma eylemleri" | Keşfedilebilirlik? | Görünür buton alternatifi |

---

## 🧪 EZBER-KARŞITI TEST

### Her Çözümden Önce Kendinize Sorun

```
┌─────────────────────────────────────────────────────────────────┐
│                    EZBER-KARŞITI KONTROL LİSTESİ                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ Bu çözümü "her zaman böyle yaptığım için" mi seçtim?         │
│    → Eğer EVET ise: DUR. Alternatifleri düşün.                  │
│                                                                 │
│  □ Bu eğitim verilerinde sıkça gördüğüm bir desen mi?           │
│    → Eğer EVET ise: GERÇEKTEN BU proje için uygun mu?           │
│                                                                 │
│  □ Bu çözümü düşünmeden otomatik olarak mı yazdım?              │
│    → Eğer EVET ise: Geri çekil, ayrıştırma yap.                 │
│                                                                 │
│  □ Alternatif bir yaklaşım düşündüm mü?                         │
│    → Eğer HAYIR ise: En az 2 alternatif düşün, sonra karar ver. │
│                                                                 │
│  □ Platforma özel düşündüm mü?                                  │
│    → Eğer HAYIR ise: iOS ve Android'i ayrı ayrı analiz et.      │
│                                                                 │
│  □ Bu çözümün performans etkisini düşündüm mü?                  │
│    → Eğer HAYIR ise: Bellek, CPU, pil etkisi nedir?             │
│                                                                 │
│  □ Bu çözüm BU projenin BAĞLAMINA uygun mu?                     │
│    → Eğer HAYIR ise: Bağlama göre özelleştir.                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 BAĞLAM TABANLI KARAR PROTOKOLÜ

### Proje Türüne Göre Farklı Düşünün

```
PROJE TÜRÜNÜ BELİRLE:
        │
        ├── E-Ticaret Uygulaması
        │   ├── Navigasyon: Tab (Ana Sayfa, Arama, Sepet, Hesap)
        │   ├── Listeler: Ürün ızgaraları (memoize edilmiş, resim optimize)
        │   ├── Performans: Resim önbellekleme KRİTİK
        │   ├── Çevrimdışı: Sepet kalıcılığı, ürün önbelleği
        │   └── Özel: Ödeme akışı, ödeme güvenliği
        │
        ├── Sosyal/İçerik Uygulaması
        │   ├── Navigasyon: Tab (Akış, Arama, Oluştur, Bildir, Profil)
        │   ├── Listeler: Sonsuz kaydırma, karmaşık öğeler
        │   ├── Performans: Akış renderlama KRİTİK
        │   ├── Çevrimdışı: Akış önbelleği, taslak gönderiler
        │   └── Özel: Gerçek zamanlı güncellemeler, medya işleme
        │
        ├── Üretkenlik/SaaS Uygulaması
        │   ├── Navigasyon: Drawer veya uyarlanabilir (mobil tab, tablet rail)
        │   ├── Listeler: Veri tabloları, formlar
        │   ├── Performans: Veri senkronizasyonu
        │   ├── Çevrimdışı: Tam çevrimdışı düzenleme
        │   └── Özel: Çatışma çözümü, arka plan senkronizasyonu
        │
        ├── Yardımcı (Utility) Uygulama
        │   ├── Navigasyon: Minimal (sadece stack mümkün)
        │   ├── Listeler: Muhtemelen minimal
        │   ├── Performans: Hızlı başlangıç
        │   ├── Çevrimdışı: Temel özellik çevrimdışı
        │   └── Özel: Widget, kısayollar
        │
        └── Medya/Yayın (Streaming) Uygulaması
            ├── Navigasyon: Tab (Ana Sayfa, Arama, Kitaplık, Profil)
            ├── Listeler: Yatay karuseller, dikey akışlar
            ├── Performans: Ön yükleme, tamponlama (buffering)
            ├── Çevrimdışı: İndirme yönetimi
            └── Özel: Arka plan oynatma, yansıtma (casting)
```

---

## 🔄 ETKİLEŞİM AYRIŞTIRMASI

### Her Jest İçin Analiz

Herhangi bir jest eklemeden önce:

```
JEST: [Jest Türü]
├── KEŞFEDİLEBİLİRLİK:
│   └── Kullanıcılar bu jesti nasıl keşfedecek?
│       ├── Görsel bir ipucu var mı?
│       ├── İşe alıştırmada (onboarding) gösterilecek mi?
│       └── Buton alternatifi var mı? (ZORUNLU)
│
├── PLATFORM GELENEĞİ:
│   ├── Bu jest iOS'te ne anlama geliyor?
│   ├── Bu jest Android'de ne anlama geliyor?
│   └── Platform geleneğinden sapıyor muyum?
│
├── ERİŞİLEBİLİRLİK:
│   ├── Motor engelli kullanıcılar bu jesti yapabilir mi?
│   ├── VoiceOver/TalkBack alternatifi var mı?
│   └── Anahtar kontrolü (switch control) ile çalışıyor mu?
│
├── ÇATIŞMA KONTROLÜ:
│   ├── Sistem jestleriyle çatışıyor mu?
│   │   ├── iOS: Kenardan geri kaydırma
│   │   ├── Android: Geri jesti
│   │   └── Ana ekran göstergesi kaydırma
│   └── Diğer uygulama jestleriyle tutarlı mı?
│
└── GERİ BİLDİRİM:
    ├── Dokunsal (haptic) geri bildirim tanımlı mı?
    ├── Görsel geri bildirim yeterli mi?
    └── Sesli geri bildirim gerekli mi?
```

---

## 🎭 KONTROL LİSTESİ YERİNE RUH (Mobil Sürüm)

### Kontrol Listesini Geçmek Yeterli Değil!

| ❌ Kendini Kandırma | ✅ Dürüst Değerlendirme |
|-------------------|----------------------|
| "Dokunma hedefi 44px" (ama kenarda, ulaşılamaz) | "Kullanıcı tek elle ulaşabilir mi?" |
| "FlatList kullandım" (ama memoize etmedim) | "Kaydırma pürüzsüz mü?" |
| "Platforma özel nav" (ama sadece ikonlar farklı) | "iOS, iOS gibi; Android, Android gibi hissettiriyor mu?" |
| "Çevrimdışı destek var" (ama hata mesajı genel) | "Kullanıcı çevrimdışı ne yapabilir?" |
| "Yükleme durumu var" (ama sadece bir dönen çark) | "Kullanıcı ne kadar bekleyeceğini biliyor mu?" |

> 🔴 **Kontrol listesini geçmek amaç DEĞİLDİR. Harika mobil UX yaratmak amaçtır.**

---

## 📝 MOBİL TASARIM TAAHHÜDÜ

### Bunu Her Mobil Projenin Başında Doldurun

```
📱 MOBİL TASARIM TAAHHÜDÜ

Proje: _______________
Platform: iOS / Android / İkisi de

1. Bu projede kullanmayacağım varsayılan desen:
   └── _______________
   
2. Bu proje için bağlama özel odak:
   └── _______________

3. Uygulayacağım platforma özel farklılıklar:
   └── iOS: _______________
   └── Android: _______________

4. Performans için özellikle optimize edeceğim alan:
   └── _______________

5. Bu projenin benzersiz zorluğu:
   └── _______________

🧠 Eğer bu taahhüdü dolduramıyorsam → Projeyi yeterince iyi anlamamışımdır.
   → Geri dön, bağlamı daha iyi anla, kullanıcıya sor.
```

---

## 🚨 ZORUNLU: Her Mobil İşten Önce

```
┌─────────────────────────────────────────────────────────────────┐
│                    ÖN ÇALIŞMA DOĞRULAMASI                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  □ Bileşen Ayrıştırmasını tamamladım mı?                        │
│  □ Desen Sorgulama Matrisini doldurdum mu?                      │
│  □ Ezber-Karşıtı Testi geçtim mi?                               │
│  □ Bağlam tabanlı kararlar verdim mi?                           │
│  □ Etkileşim Ayrıştırmasını analiz ettim mi?                    │
│  □ Mobil Tasarım Taahhüdünü doldurdum mu?                       │
│                                                                 │
│  ⚠️ Bunları tamamlamadan kod yazmayın!                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

> **Unutmayın:** Eğer bir çözümü "her zaman böyle yapıldığı için" seçtiyseniz, DÜŞÜNMEDEN seçtiniz demektir. Her proje benzersizdir. Her bağlam farklıdır. Her kullanıcı davranışı özeldir. **DÜŞÜN, sonra kodla.**
