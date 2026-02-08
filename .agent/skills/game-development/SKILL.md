---
name: game-development
description: Oyun geliştirme orkestratörü. Proje ihtiyaçlarına göre platforma özgü yeteneklere yönlendirir.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Oyun Geliştirme

> Temel prensipleri sağlayan ve uzmanlaşmış alt yeteneklere yönlendiren **Orkestratör yetenek**.

---

## Bu Yetenek Ne Zaman Kullanılır

Bir oyun geliştirme projesi üzerinde çalışıyorsunuz. Bu yetenek oyun geliştirmenin PRENSİPLERİNİ öğretir ve bağlama göre sizi doğru alt yeteneğe yönlendirir.

---

## Alt-Yetenek Yönlendirme

### Platform Seçimi

| Oyunun hedefi... | Alt Yetenek Kullan |
|------------------------|---------------|
| Web tarayıcıları (HTML5, WebGL) | `game-development/web-games` |
| Mobil (iOS, Android) | `game-development/mobile-games` |
| PC (Steam, Masaüstü) | `game-development/pc-games` |
| VR/AR başlıkları | `game-development/vr-ar` |

### Boyut Seçimi

| Oyun... | Alt Yetenek Kullan |
|-------------------|---------------|
| 2D (sprite'lar, tilemapler) | `game-development/2d-games` |
| 3D (meshler, shaderlar) | `game-development/3d-games` |

### Uzmanlık Alanları

| İhtiyacınız olan... | Alt Yetenek Kullan |
|----------------|---------------|
| GDD, dengeleme, oyuncu psikolojisi | `game-development/game-design` |
| Çok oyunculu, ağ (networking) | `game-development/multiplayer` |
| Görsel stil, varlık hattı, animasyon | `game-development/game-art` |
| Ses tasarımı, müzik, uyarlanabilir ses | `game-development/game-audio` |

---

## Temel Prensipler (Tüm Platformlar)

### 1. Oyun Döngüsü

Her oyun, platformdan bağımsız olarak bu deseni takip eder:

```
INPUT  → Oyuncu eylemlerini oku
UPDATE → Oyun mantığını işle (sabit zaman adımı - fixed timestep)
RENDER → Kareyi çiz (interpolasyonlu)
```

**Sabit Zaman Adımı Kuralı:**
- Fizik/mantık: Sabit hız (örn. 50Hz)
- Render: Mümkün olduğunca hızlı
- Pürüzsüz görseller için durumlar arasında interpolasyon yap

---

### 2. Desen Seçim Matrisi

| Desen | Ne Zaman Kullanılır | Örnek |
|---------|----------|---------|
| **Durum Makinesi (State Machine)** | 3-5 ayrık durum | Oyuncu: Boşta→Yürü→Zıpla |
| **Nesne Havuzlama (Object Pooling)** | Sık yaratım/yıkım | Mermiler, parçacıklar |
| **Gözlemci/Olaylar (Observer/Events)** | Sistemler arası iletişim | Sağlık→UI güncellemeleri |
| **ECS** | Binlerce benzer varlık | RTS birimleri, parçacıklar |
| **Komut (Command)** | Geri al, tekrar oynat, ağ | Girdi kaydı |
| **Davranış Ağacı (Behavior Tree)** | Karmaşık YZ kararları | Düşman YZ |

**Karar Kuralı:** Durum Makinesi ile başlayın. ECS'yi sadece performans gerektirdiğinde ekleyin.

---

### 3. Girdi Soyutlama

Girdiyi ham tuşlara değil, EYLEMLERE soyutlayın:

```
"zipla"  → Space, Gamepad A, Dokunma
"hareket"  → WASD, Sol çubuk, Sanal joystick
```

**Neden:** Çoklu platform, yeniden atanabilir kontroller sağlar.

---

### 4. Performans Bütçesi (60 FPS = 16.67ms)

| Sistem | Bütçe |
|--------|--------|
| Girdi | 1ms |
| Fizik | 3ms |
| YZ | 2ms |
| Oyun Mantığı | 4ms |
| Render | 5ms |
| Tampon | 1.67ms |

**Optimizasyon Önceliği:**
1. Algoritma (O(n²) → O(n log n))
2. Toplu İşleme (Batching) (çizim çağrılarını azalt)
3. Havuzlama (GC ani artışlarını önle)
4. LOD (mesafeye göre detay)
5. Eleme (Culling) (görünmeyenleri atla)

---

### 5. Karmaşıklığa Göre YZ Seçimi

| YZ Türü | Karmaşıklık | Ne Zaman Kullanılır |
|---------|------------|----------|
| **FSM** | Basit | 3-5 durum, tahmin edilebilir davranış |
| **Davranış Ağacı** | Orta | Modüler, tasarımcı dostu |
| **GOAP** | Yüksek | Ortaya çıkan (emergent), planlama tabanlı |
| **Utility AI** | Yüksek | Puanlama tabanlı kararlar |

---

### 6. Çarpışma Stratejisi

| Tür | En İyisi |
|------|----------|
| **AABB** | Dikdörtgenler, hızlı kontroller |
| **Daire** | Yuvarlak nesneler, ucuz |
| **Uzamsal Hash (Spatial Hash)** | Çok sayıda benzer boyutlu nesne |
| **Quadtree** | Büyük dünyalar, değişen boyutlar |

---

## Anti-Desenler (Evrensel)

| Yapma | Yap |
|-------|-----|
| Her karede her şeyi güncelle | Olayları, kirli bayrakları (dirty flags) kullan |
| Sıcak döngülerde nesne oluştur | Nesne havuzlama |
| Hiçbir şeyi önbelleğe alma | Referansları önbelleğe al |
| Profillemeden optimize et | Önce profille |
| Girdiyi mantıkla karıştır | Girdi katmanını soyutla |

---

## Yönlendirme Örnekleri

### Örnek 1: "Tarayıcı tabanlı bir 2D platform oyunu yapmak istiyorum"
→ Çerçeve seçimi için `game-development/web-games` ile başla
→ Sonra sprite/tilemap desenleri için `game-development/2d-games`
→ Seviye tasarımı için `game-development/game-design` referans al

### Örnek 2: "iOS ve Android için mobil bulmaca oyunu"
→ Dokunmatik girdi ve mağazalar için `game-development/mobile-games` ile başla
→ Bulmaca dengelemesi için `game-development/game-design` kullan

### Örnek 3: "Çok oyunculu VR nişancı oyunu"
→ Konfor ve daldırma (immersion) için `game-development/vr-ar`
→ Render için `game-development/3d-games`
→ Ağ oluşturma için `game-development/multiplayer`

---

> **Unutmayın:** Harika oyunlar yinelemeden (iteration) gelir, mükemmellikten değil. Hızlı prototip yapın, sonra cilalayın.
