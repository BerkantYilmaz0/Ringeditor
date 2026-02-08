---
name: server-management
description: Server management principles and decision-making. Process management, monitoring strategy, and scaling decisions. Teaches thinking, not commands.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Sunucu Yönetimi

> Üretim operasyonları için sunucu yönetimi prensipleri.
> **Komutları ezberlemeyi değil, DÜŞÜNMEYİ öğrenin.**

---

## 1. Süreç Yönetimi Prensipleri

### Araç Seçimi

| Senaryo | Araç |
|----------|------|
| **Node.js uygulaması** | PM2 (kümeleme, yeniden yükleme) |
| **Herhangi bir uygulama** | systemd (Linux yerel) |
| **Konteynerler** | Docker/Podman |
| **Orkestrasyon** | Kubernetes, Docker Swarm |

### Süreç Yönetimi Hedefleri

| Hedef | Ne Anlama Gelir |
|------|---------------|
| **Çökme durumunda yeniden başlatma** | Otomatik kurtarma |
| **Sıfır kesintili yeniden yükleme** | Hizmet kesintisi yok |
| **Kümeleme (Clustering)** | Tüm CPU çekirdeklerini kullan |
| **Kalıcılık** | Sunucu yeniden başlatmasında hayatta kal |

---

## 2. İzleme Prensipleri

### Ne İzlenmeli

| Kategori | Temel Metrikler |
|----------|-------------|
| **Kullanılabilirlik** | Çalışma süresi (uptime), sağlık kontrolleri |
| **Performans** | Yanıt süresi, çıktı (throughput) |
| **Hatalar** | Hata oranı, türleri |
| **Kaynaklar** | CPU, bellek, disk |

### Uyarı Önem Derecesi Stratejisi

| Seviye | Yanıt |
|-------|----------|
| **Kritik** | Acil eylem |
| **Uyarı** | Yakında incele |
| **Bilgi** | Günlük gözden geçir |

### İzleme Aracı Seçimi

| İhtiyaç | Seçenekler |
|------|---------|
| Basit/Ücretsiz | PM2 metrikleri, htop |
| Tam gözlemlenebilirlik | Grafana, Datadog |
| Hata takibi | Sentry |
| Çalışma süresi (Uptime) | UptimeRobot, Pingdom |

---

## 3. Log Yönetimi Prensipleri

### Log Stratejisi

| Log Türü | Amaç |
|----------|---------|
| **Uygulama logları** | Hata ayıklama, denetim |
| **Erişim logları** | Trafik analizi |
| **Hata logları** | Sorun tespiti |

### Log Prensipleri

1. Disk dolmasını önlemek için **logları döndür (rotate)**
2. Ayrıştırma için **yapılandırılmış loglama** (JSON)
3. **Uygun seviyeler** (error/warn/info/debug)
4. Loglarda **hassas veri yok**

---

## 4. Ölçeklendirme Kararları

### Ne Zaman Ölçeklendirilmeli

| Belirti | Çözüm |
|---------|----------|
| Yüksek CPU | Örnek (instance) ekle (yatay) |
| Yüksek bellek | RAM artır veya sızıntıyı düzelt |
| Yavaş yanıt | Önce profil oluştur, sonra ölçeklendir |
| Trafik ani artışları | Otomatik ölçeklendirme |

### Ölçeklendirme Stratejisi

| Tür | Ne Zaman Kullanılır |
|------|-------------|
| **Dikey** | Hızlı çözüm, tek örnek |
| **Yatay** | Sürdürülebilir, dağıtık |
| **Otomatik** | Değişken trafik |

---

## 5. Sağlık Kontrolü Prensipleri

### Sağlıklıyı Ne Oluşturur

| Kontrol | Anlamı |
|-------|---------|
| **HTTP 200** | Hizmet yanıt veriyor |
| **Veritabanı bağlı** | Veri erişilebilir |
| **Bağımlılıklar TAMAM** | Harici hizmetlere erişilebilir |
| **Kaynaklar TAMAM** | CPU/bellek tükenmemiş |

### Sağlık Kontrolü Uygulaması

- Basit: Sadece 200 döndür
- Derin: Tüm bağımlılıkları kontrol et
- Yük dengeleyici ihtiyaçlarına göre seç

---

## 6. Güvenlik Prensipleri

| Alan | Prensip |
|------|-----------|
| **Erişim** | Sadece SSH anahtarları, şifre yok |
| **Güvenlik Duvarı** | Sadece gerekli portlar açık |
| **Güncellemeler** | Düzenli güvenlik yamaları |
| **Sırlar** | Ortam değişkenleri, dosyalar değil |
| **Denetim** | Erişimi ve değişiklikleri logla |

---

## 7. Sorun Giderme Önceliği

Bir şeyler ters gittiğinde:

1. **Çalışıp çalışmadığını kontrol et** (süreç durumu)
2. **Logları kontrol et** (hata mesajları)
3. **Kaynakları kontrol et** (disk, bellek, CPU)
4. **Ağı kontrol et** (portlar, DNS)
5. **Bağımlılıkları kontrol et** (veritabanı, API'ler)

---

## 8. Anti-Desenler

| ❌ Yapma | ✅ Yap |
|----------|-------|
| Root olarak çalıştır | Root olmayan kullanıcı kullan |
| Logları görmezden gel | Log döndürme ayarla |
| İzlemeyi atla | İlk günden itibaren izle |
| Manuel yeniden başlatmalar | Otomatik yeniden başlatma yapılandırması |
| Yedek yok | Düzenli yedekleme takvimi |

---

> **Unutmayın:** İyi yönetilen bir sunucu sıkıcıdır. Hedef budur.
