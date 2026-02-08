---
description: Ajan ve proje durumunu göster. İlerleme takibi ve durum panosu.
---

# /status - Durumu Göster

$ARGUMENTS

---

## Görev

Mevcut proje ve ajan durumunu göster.

### Neyi Gösterir

1. **Proje Bilgisi**
   - Proje adı ve yolu
   - Teknoloji yığını
   - Mevcut özellikler

2. **Ajan Durum Panosu**
   - Hangi ajanlar çalışıyor
   - Hangi görevler tamamlandı
   - Bekleyen işler

3. **Dosya İstatistikleri**
   - Oluşturulan dosya sayısı
   - Değiştirilen dosya sayısı

4. **Önizleme Durumu**
   - Sunucu çalışıyor mu
   - URL
   - Sağlık kontrolü

---

## Örnek Çıktı

```
=== Proje Durumu ===

📁 Proje: my-ecommerce
📂 Yol: C:/projects/my-ecommerce
🏷️ Tür: nextjs-ecommerce
📊 Durum: aktif

🔧 Teknoloji Yığını:
   Framework: next.js
   Veritabanı: postgresql
   Auth: clerk
   Ödeme: stripe

✅ Özellikler (5):
   • ürün-listeleme
   • sepet
   • ödeme
   • kullanıcı-auth
   • sipariş-geçmişi

⏳ Bekleyen (2):
   • yönetici-paneli
   • e-posta-bildirimleri

📄 Dosyalar: 73 oluşturuldu, 12 değiştirildi

=== Ajan Durumu ===

✅ database-architect → Tamamlandı
✅ backend-specialist → Tamamlandı
🔄 frontend-specialist → Dashboard bileşenleri (%60)
⏳ test-engineer → Bekliyor

=== Önizleme ===

🌐 URL: http://localhost:3000
💚 Sağlık: TAMAM
```

---

## Teknik

Durum şu scriptleri kullanır:
- `session_manager.py status`
- `auto_preview.py status`
