---
description: Yeni uygulama oluşturma komutu. App Builder becerisini tetikler ve kullanıcı ile etkileşimli diyalog başlatır.
---

# /create - Uygulama Oluştur

$ARGUMENTS

---

## Görev

Bu komut, yeni bir uygulama oluşturma sürecini başlatır.

### Adımlar:

1. **İstek Analizi**
   - Kullanıcının ne istediğini anla
   - Bilgi eksikse, sormak için `conversation-manager` becerisini kullan

2. **Proje Planlama**
   - Görev dağılımı için `project-planner` ajanını kullan
   - Teknoloji yığınını belirle
   - Dosya yapısını planla
   - Plan dosyasını oluştur ve inşaya geç

3. **Uygulama İnşası (Onaydan Sonra)**
   - `app-builder` becerisi ile orkestre et
   - Uzman ajanları koordine et:
     - `database-architect` → Şema
     - `backend-specialist` → API
     - `frontend-specialist` → UI

4. **Önizleme**
   - Tamamlandığında `auto_preview.py` ile başlat
   - URL'yi kullanıcıya sun

---

## Kullanım Örnekleri

```
/create blog sitesi
/create ürün listeleme ve sepet özellikli e-ticaret uygulaması
/create yapılacaklar uygulaması
/create Instagram klonu
/create müşteri yönetimli crm sistemi
```

---

## Başlamadan Önce

İstek belirsizse, şu soruları sorun:
- Ne tür bir uygulama?
- Temel özellikler nelerdir?
- Kim kullanacak?

Varsayılanları kullanın, detayları daha sonra ekleyin.
