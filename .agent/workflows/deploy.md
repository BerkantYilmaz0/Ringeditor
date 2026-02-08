---
description: Canlı sürümler için dağıtım komutu. Uçuş öncesi kontroller ve dağıtım uygulaması.
---

# /deploy - Canlı Dağıtım (Production Deployment)

$ARGUMENTS

---

## Amaç

Bu komut, uçuş öncesi kontroller, dağıtım uygulaması ve doğrulama ile canlı dağıtımı gerçekleştirir.

---

## Alt Komutlar

```
/deploy            - Etkileşimli dağıtım sihirbazı
/deploy check      - Sadece dağıtım öncesi kontrolleri çalıştır
/deploy preview    - Önizleme/hazırlık ortamına dağıt
/deploy production - Canlı ortama (production) dağıt
/deploy rollback   - Önceki sürüme geri dön
```

---

## Dağıtım Öncesi Kontrol Listesi

Herhangi bir dağıtımdan önce:

```markdown
## 🚀 Dağıtım Öncesi Kontrol Listesi

### Kod Kalitesi
- [ ] TypeScript hatası yok (`npx tsc --noEmit`)
- [ ] ESLint geçiyor (`npx eslint .`)
- [ ] Tüm testler geçiyor (`npm test`)

### Güvenlik
- [ ] Sabit kodlanmış gizli bilgi (secret) yok
- [ ] Ortam değişkenleri belgelenmiş
- [ ] Bağımlılıklar denetlenmiş (`npm audit`)

### Performans
- [ ] Paket boyutu kabul edilebilir
- [ ] console.log ifadeleri yok
- [ ] Görseller optimize edilmiş

### Dokümantasyon
- [ ] README güncellenmiş
- [ ] CHANGELOG güncellenmiş
- [ ] API dokümanları güncel

### Dağıtıma hazır mı? (e/h)
```

---

## Dağıtım Akışı

```
┌─────────────────┐
│  /deploy        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Uçuş öncesi    │
│  kontroller     │
└────────┬────────┘
         │
    Geçti? ──Hayır──► Sorunları düzelt
         │
        Evet
         │
         ▼
┌─────────────────┐
│  Uygulamayı     │
│  derle          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Platforma      │
│  dağıt          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sağlık kontrolü│
│  & doğrulama    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ✅ Tamamlandı  │
└─────────────────┘
```

---

## Çıktı Formatı

### Başarılı Dağıtım

```markdown
## 🚀 Dağıtım Tamamlandı

### Özet
- **Sürüm:** v1.2.3
- **Ortam:** production
- **Süre:** 47 saniye
- **Platform:** Vercel

### URL'ler
- 🌐 Production: https://app.example.com
- 📊 Dashboard: https://vercel.com/project

### Neler Değişti
- Kullanıcı profili özelliği eklendi
- Giriş hatası düzeltildi
- Bağımlılıklar güncellendi

### Sağlık Kontrolü
✅ API yanıt veriyor (200 OK)
✅ Veritabanı bağlı
✅ Tüm servisler sağlıklı
```

### Başarısız Dağıtım

```markdown
## ❌ Dağıtım Başarısız

### Hata
Derleme şu adımda başarısız oldu: TypeScript compilation

### Detaylar
```
error TS2345: Argument of type 'string' is not assignable...
\```

### Çözüm
1. `src/services/user.ts:45` içindeki TypeScript hatasını düzelt
2. Doğrulamak için yerelde `npm run build` çalıştır
3. Tekrar `/deploy` dene

### Geri Alma Mevcut
Önceki sürüm (v1.2.2) hala aktif.
Gerekirse `/deploy rollback` çalıştırın.
```

---

## Platform Desteği

| Platform | Komut | Notlar |
|----------|---------|-------|
| Vercel | `vercel --prod` | Next.js için otomatik algılanır |
| Railway | `railway up` | Railway CLI gerektirir |
| Fly.io | `fly deploy` | flyctl gerektirir |
| Docker | `docker compose up -d` | Kendi sunucunuz için |

---

## Örnekler

```
/deploy
/deploy check
/deploy preview
/deploy production --skip-tests
/deploy rollback
```
