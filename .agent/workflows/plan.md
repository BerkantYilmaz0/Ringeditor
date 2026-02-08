---
description: project-planner ajanı kullanarak proje planı oluşturun. Kod yazma yok - sadece plan dosyası oluşturma.
---

# /plan - Proje Planlama Modu

$ARGUMENTS

---

## 🔴 KRİTİK KURALLAR

1. **KOD YAZMA YOK** - Bu komut yalnızca plan dosyası oluşturur
2. **project-planner ajanını kullanın** - Yerel Plan alt ajanını DEĞİL
3. **Sokratik Kapı** - Planlamadan önce açıklayıcı sorular sorun
4. **Dinamik İsimlendirme** - Göreve göre isimlendirilmiş plan dosyası

---

## Görev

Şu bağlamla `project-planner` ajanını kullanın:

```
BAĞLAM:
- Kullanıcı İsteği: $ARGUMENTS
- Mod: SADECE PLANLAMA (kod yok)
- Çıktı: docs/PLAN-{task-slug}.md (dinamik isimlendirme)

İSİMLENDİRME KURALLARI:
1. İstekten 2-3 anahtar kelime çıkar
2. Küçük harf, tire ile ayrılmış
3. Maksimum 30 karakter
4. Örnek: "e-ticaret sepeti" → PLAN-eticaret-sepeti.md

KURALLAR:
1. project-planner.md Aşama -1'i (Bağlam Kontrolü) izle
2. project-planner.md Aşama 0'ı (Sokratik Kapı) izle
3. Görev dağılımı ile PLAN-{slug}.md oluştur
4. Herhangi bir kod dosyası YAZMA
5. Oluşturulan tam dosya adını RAPORLA
```

---

## Beklenen Çıktı

| Teslimat | Konum |
|-------------|----------|
| Proje Planı | `docs/PLAN-{task-slug}.md` |
| Görev Dağılımı | Plan dosyası içinde |
| Ajan Atamaları | Plan dosyası içinde |
| Doğrulama Kontrol Listesi | Plan dosyasında Aşama X |

---

## Planlamadan Sonra

Kullanıcıya söyleyin:
```
[TAMAM] Plan oluşturuldu: docs/PLAN-{slug}.md

Sonraki adımlar:
- Planı inceleyin
- Uygulamayı başlatmak için `/create` komutunu çalıştırın
- Veya planı manuel olarak değiştirin
```

---

## İsimlendirme Örnekleri

| İstek | Plan Dosyası |
|---------|-----------|
| `/plan e-ticaret sitesi sepetli` | `docs/PLAN-eticaret-sepeti.md` |
| `/plan fitness için mobil uygulama` | `docs/PLAN-fitness-uygulamasi.md` |
| `/plan karanlık mod ekle` | `docs/PLAN-karanlik-mod.md` |
| `/plan kimlik doğrulama hatasını düzelt` | `docs/PLAN-auth-duzeltme.md` |
| `/plan SaaS paneli` | `docs/PLAN-saas-paneli.md` |

---

## Kullanım

```
/plan sepetli e-ticaret sitesi
/plan fitness takibi için mobil uygulama
/plan analitik özellikli SaaS paneli
```
