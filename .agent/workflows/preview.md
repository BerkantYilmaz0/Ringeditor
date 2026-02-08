---
description: Önizleme sunucusu başlatma, durdurma ve durum kontrolü. Yerel geliştirme sunucusu yönetimi.
---

# /preview - Önizleme Yönetimi

$ARGUMENTS

---

## Görev

Önizleme sunucusunu yönet: başlat, durdur, durum kontrolü.

### Komutlar

```
/preview           - Mevcut durumu göster
/preview start     - Sunucuyu başlat
/preview stop      - Sunucuyu durdur
/preview restart   - Yeniden başlat
/preview check     - Sağlık kontrolü
```

---

## Kullanım Örnekleri

### Sunucuyu Başlat
```
/preview start

Yanıt:
🚀 Önizleme başlatılıyor...
   Port: 3000
   Tür: Next.js

✅ Önizleme hazır!
   URL: http://localhost:3000
```

### Durum Kontrolü
```
/preview

Yanıt:
=== Önizleme Durumu ===

🌐 URL: http://localhost:3000
📁 Proje: C:/projects/my-app
🏷️ Tür: nextjs
💚 Sağlık: TAMAM
```

### Port Çakışması
```
/preview start

Yanıt:
⚠️ Port 3000 kullanımda.

Seçenekler:
1. 3001 portunda başlat
2. 3000 portundaki uygulamayı kapat
3. Farklı port belirt

Hangisi? (varsayılan: 1)
```

---

## Teknik

Otomatik önizleme `auto_preview.py` scriptini kullanır:

```bash
python .agent/scripts/auto_preview.py start [path] [port]
python .agent/scripts/auto_preview.py stop
python .agent/scripts/auto_preview.py status
```
