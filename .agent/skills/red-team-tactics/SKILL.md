---
name: red-team-tactics
description: Red team tactics principles based on MITRE ATT&CK. Attack phases, detection evasion, reporting.
allowed-tools: Read, Glob, Grep
---

# Red Team Taktikleri

> MITRE ATT&CK çerçevesine dayalı düşman simülasyon prensipleri.

---

## 1. MITRE ATT&CK Aşamaları

### Saldırı Yaşam Döngüsü

```
KEŞİF (RECONNAISSANCE) → İLK ERİŞİM (INITIAL ACCESS) → YÜRÜTME (EXECUTION) → KALICILIK (PERSISTENCE)
           ↓                      ↓                         ↓                 ↓
AYRICALIK YÜKSELTME (PRIVILEGE ESC) → SAVUNMA ATLATMA (DEFENSE EVASION) → KİMLİK BİLGİSİ ERİŞİMİ (CRED ACCESS) → KEŞİF (DISCOVERY)
           ↓                      ↓                         ↓                 ↓
YATAY HAREKET (LATERAL MOVEMENT) → TOPLAMA (COLLECTION) → C2 → DIŞARI ÇIKARMA (EXFILTRATION) → ETKİ (IMPACT)
```

### Aşama Hedefleri

| Aşama | Hedef |
|-------|-----------|
| **Recon** | Saldırı yüzeyini haritala |
| **Initial Access** | İlk dayanağı elde et |
| **Execution** | Hedefte kod çalıştır |
| **Persistence** | Yeniden başlatmalarda hayatta kal |
| **Privilege Escalation** | Admin/root ol |
| **Defense Evasion** | Algılamadan kaçın |
| **Credential Access** | Kimlik bilgilerini topla |
| **Discovery** | İç ağı haritala |
| **Lateral Movement** | Diğer sistemlere yayıl |
| **Collection** | Hedef verileri topla |
| **C2** | Komuta kanalını koru |
| **Exfiltration** | Verileri dışarı çıkar |

---

## 2. Keşif Prensipleri

### Pasif vs Aktif

| Tür | Takas (Trade-off) |
|------|-----------|
| **Pasif** | Hedefle temas yok, sınırlı bilgi |
| **Aktif** | Doğrudan temas, daha fazla algılanma riski |

### Bilgi Hedefleri

| Kategori | Değer |
|----------|-------|
| Teknoloji yığını | Saldırı vektörü seçimi |
| Çalışan bilgileri | Sosyal mühendislik |
| Ağ aralıkları | Tarama kapsamı |
| Üçüncü taraflar | Tedarik zinciri saldırısı |

---

## 3. İlk Erişim Vektörleri

### Seçim Kriterleri

| Vektör | Ne Zaman Kullanılır |
|--------|-------------|
| **Oltalama (Phishing)** | İnsan hedefi, e-posta erişimi |
| **Genel istismarlar (Public exploits)** | Savunmasız hizmetler ifşa edilmiş |
| **Geçerli kimlik bilgileri** | Sızdırılmış veya kırılmış |
| **Tedarik zinciri** | Üçüncü taraf erişimi |

---

## 4. Ayrıcalık Yükseltme Prensipleri

### Windows Hedefleri

| Kontrol | Fırsat |
|-------|-------------|
| Alıntılanmamış servis yolları | Yola yaz |
| Zayıf servis izinleri | Servisi değiştir |
| Token ayrıcalıkları | SeDebug vb. kötüye kullan |
| Depolanmış kimlik bilgileri | Topla (Harvest) |

### Linux Hedefleri

| Kontrol | Fırsat |
|-------|-------------|
| SUID binaryleri | Sahibi olarak çalıştır |
| Sudo yanlış yapılandırması | Komut yürütme |
| Kernel güvenlik açıkları | Kernel istismarları |
| Cron işleri | Yazılabilir scriptler |

---

## 5. Savunma Atlatma Prensipleri

### Temel Teknikler

| Teknik | Amaç |
|-----------|---------|
| LOLBins | Meşru araçları kullan |
| Karartma (Obfuscation) | Kötü amaçlı kodu gizle |
| Timestomping | Dosya değişikliklerini gizle |
| Log temizleme | Kanıtları kaldır |

### Operasyonel Güvenlik

- Mesai saatlerinde çalış
- Meşru trafik modellerini taklit et
- Şifreli kanallar kullan
- Normal davranışla karış

---

## 6. Yatay Hareket Prensipleri

### Kimlik Bilgisi Türleri

| Tür | Kullanım |
|------|-----|
| Şifre | Standart kimlik doğrulama |
| Hash | Pass-the-hash |
| Bilet (Ticket) | Pass-the-ticket |
| Sertifika | Sertifika kimlik doğrulama |

### Hareket Yolları

- Admin paylaşımları
- Uzak servisler (RDP, SSH, WinRM)
- İç servislerin istismarı

---

## 7. Active Directory Saldırıları

### Saldırı Kategorileri

| Saldırı | Hedef |
|--------|--------|
| Kerberoasting | Servis hesabı şifreleri |
| AS-REP Roasting | Ön kimlik doğrulamasız hesaplar |
| DCSync | Etki alanı kimlik bilgileri |
| Golden Ticket | Kalıcı etki alanı erişimi |

---

## 8. Raporlama Prensipleri

### Saldırı Hikayesi

Tam saldırı zincirini belgeleyin:
1. İlk erişim nasıl kazanıldı
2. Hangi teknikler kullanıldı
3. Hangi hedeflere ulaşıldı
4. Algılama nerede başarısız oldu

### Algılama Boşlukları

Her başarılı teknik için:
- Bunu ne algılamalıydı?
- Algılama neden çalışmadı?
- Algılama nasıl iyileştirilir?

---

## 9. Etik Sınırlar

### Her Zaman

- Kapsam dahilinde kal
- Etkiyi en aza indir
- Gerçek tehdit bulunursa derhal bildir
- Tüm eylemleri belgele

### Asla

- Üretim verilerini yok etme
- Hizmet reddine (DoS) neden olma (kapsamda değilse)
- Kavram kanıtının ötesine erişme
- Hassas verileri saklama

---

## 10. Anti-Desenler

| ❌ Yapma | ✅ Yap |
|----------|-------|
| İstismara acele et | Metodolojiyi takip et |
| Hasara neden ol | Etkiyi en aza indir |
| Raporlamayı atla | Her şeyi belgele |
| Kapsamı görmezden gel | Sınırlar içinde kal |

---

> **Unutmayın:** Red team, zarar vermek için değil, savunmayı geliştirmek için saldırganları simüle eder.
