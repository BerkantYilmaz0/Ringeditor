---
name: plan-writing
description: Structured task planning with clear breakdowns, dependencies, and verification criteria. Use when implementing features, refactoring, or any multi-step work.
allowed-tools: Read, Glob, Grep
---

# Plan Yazma

> Kaynak: obra/superpowers

## Genel Bakış
Bu yetenek, işi doğrulama kriterleri ile net, eyleme geçirilebilir görevlere ayırmak için bir çerçeve sağlar.

## Görev Bölme Prensipleri

### 1. Küçük, Odaklanmış Görevler
- Her görev 2-5 dakika sürmeli
- Görev başına net bir sonuç
- Bağımsız olarak doğrulanabilir

### 2. Net Doğrulama
- Bittiğini nasıl anlarsınız?
- Neyi kontrol edebilir/test edebilirsiniz?
- Beklenen çıktı nedir?

### 3. Mantıksal Sıralama
- Bağımlılıklar belirlendi
- Mümkün olduğunda paralel çalışma
- Kritik yol vurgulandı
- **Aşama X: Doğrulama her zaman SONUNCUDUR**

### 4. Proje Kökünde Dinamik İsimlendirme
- Plan dosyaları PROJE KÖKÜNDE `{task-slug}.md` olarak kaydedilir
- İsim görevden türetilir (örneğin, "kimlik doğrulama ekle" → `auth-feature.md`)
- **ASLA** `.claude/`, `docs/` veya geçici klasörlerin içinde değil

## Planlama Prensipleri (Şablon Değil!)

> 🔴 **Sabit şablonlar YOK. Her plan göreve ÖZELDİR.**

### Prensip 1: KISA Tutun

| ❌ Yanlış | ✅ Doğru |
|----------|----------|
| Alt-alt-görevler içeren 50 görev | Maksimum 5-10 net görev |
| Listelenen her mikro adım | Sadece eyleme geçirilebilir öğeler |
| Ayrıntılı açıklamalar | Görev başına bir satır |

> **Kural:** Plan 1 sayfadan uzunsa, çok uzundur. Basitleştirin.

---

### Prensip 2: Genel Değil, ÖZEL Olun

| ❌ Yanlış | ✅ Doğru |
|----------|----------|
| "Projeyi kur" | "`npx create-next-app` çalıştır" |
| "Kimlik doğrulama ekle" | "next-auth kur, `/api/auth/[...nextauth].ts` oluştur" |
| "Arayüzü stillendir" | "`Header.tsx`'e Tailwind sınıfları ekle" |

> **Kural:** Her görevin net, doğrulanabilir bir sonucu olmalıdır.

---

### Prensip 3: Proje Türüne Göre Dinamik İçerik

**YENİ PROJE İçin:**
- Hangi teknoloji yığını? (önce karar ver)
- MVP nedir? (minimum özellikler)
- Dosya yapısı nedir?

**ÖZELLİK EKLEME İçin:**
- Hangi dosyalar etkileniyor?
- Hangi bağımlılıklar gerekli?
- Çalıştığını nasıl doğrularsın?

**HATA DÜZELTME İçin:**
- Kök neden nedir?
- Hangi dosya/satır değişecek?
- Düzeltmeyi nasıl test edersin?

---

### Prensip 4: Scriptler Projeye Özgüdür

> 🔴 **Script komutlarını kopyalayıp yapıştırmayın. Proje türüne göre seçin.**

| Proje Türü | İlgili Scriptler |
|--------------|------------------|
| Frontend/React | `ux_audit.py`, `accessibility_checker.py` |
| Backend/API | `api_validator.py`, `security_scan.py` |
| Mobil | `mobile_audit.py` |
| Veritabanı | `schema_validator.py` |
| Full-stack | Dokunduğunuz yere göre yukarıdakilerin karışımı |

**Yanlış:** Tüm scriptleri her plana eklemek
**Doğru:** Sadece BU görevle ilgili scriptler

---

### Prensip 5: Doğrulama Basittir

| ❌ Yanlış | ✅ Doğru |
|----------|----------|
| "Bileşenin doğru çalıştığını doğrula" | "`npm run dev` çalıştır, butona tıkla, toast mesajını gör" |
| "API'yi test et" | "curl localhost:3000/api/users 200 döndürür" |
| "Stilleri kontrol et" | "Tarayıcıyı aç, koyu mod geçişinin çalıştığını doğrula" |

---

## Plan Yapısı (Esnek, Sabit Değil!)

```
# [Görev Adı]

## Hedef
Bir cümle: Ne inşa ediyoruz/düzeltiyoruz?

## Görevler
- [ ] Görev 1: [Belirli eylem] → Doğrula: [Nasıl kontrol edilir]
- [ ] Görev 2: [Belirli eylem] → Doğrula: [Nasıl kontrol edilir]
- [ ] Görev 3: [Belirli eylem] → Doğrula: [Nasıl kontrol edilir]

## Bittiğinde
- [ ] [Ana başarı kriterleri]
```

> **Bu kadar.** Gerçekten gerekmedikçe aşamalar, alt bölümler yok.
> Minimal tutun. Sadece gerektiğinde karmaşıklık ekleyin.

## Notlar
[Herhangi bir önemli husus]
```

---

## En İyi Uygulamalar (Hızlı Referans)

1. **Hedefle başla** - Ne inşa ediyoruz/düzeltiyoruz?
2. **Maksimum 10 görev** - Daha fazlaysa, birden fazla plana bölün
3. **Her görev doğrulanabilir** - Net "bitti" kriterleri
4. **Projeye özel** - Kopyala-yapıştır şablonlar yok
5. **İlerledikçe güncelle** - Tamamlandığında `[x]` işaretle

---

## Ne Zaman Kullanılır

- Sıfırdan yeni proje
- Özellik ekleme
- Hata düzeltme (karmaşıksa)
- Birden fazla dosyayı yeniden düzenleme (refactoring)
