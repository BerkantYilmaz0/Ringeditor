# Antigravity Yetenekleri (Skills)

> **Antigravity Kit'te Yetenek Oluşturma ve Kullanma Kılavuzu**

---

## 📋 Giriş

Antigravity'nin temel modelleri (Gemini gibi) güçlü genel amaçlı modeller olsa da, özel proje bağlamını veya ekibinizin standartlarını bilemezler. Her kuralı veya aracı ajanın bağlam penceresine yüklemek, "araç şişkinliğine" (tool bloat), yüksek maliyetlere, gecikmeye ve kafa karışıklığına yol açar.

**Antigravity Skills**, bu sorunu **Aşamalı Açıklama (Progressive Disclosure)** özelliği ile çözer. Yetenek, ihtiyaç duyulana kadar pasif duran özelleşmiş bir bilgi paketidir. Bu bilgi, yalnızca sizin özel isteğiniz yeteneğin açıklamasıyla eşleştiğinde ajanın bağlamına yüklenir.

---

## 📁 Yapı ve Kapsam

Yetenekler klasör tabanlı paketlerdir. İhtiyaca göre bu kapsamları tanımlayabilirsiniz:

| Kapsam | Yol | Açıklama |
|---------|-----------|-------|
| **Çalışma Alanı (Workspace)** | `<workspace-root>/.agent/skills/` | Sadece belirli bir projede bulunur |

### Yetenek Klasör Yapısı

```
my-skill/
├── SKILL.md      # (Zorunlu) Metadata & talimatlar
├── scripts/      # (İsteğe bağlı) Python veya Bash scriptleri
├── references/   # (İsteğe bağlı) Metin, dokümantasyon, şablonlar
└── assets/       # (İsteğe bağlı) Görseller veya logolar
```

---

## 🔍 Örnek 1: Kod İnceleme Yeteneği (Code Review Skill)

Bu, sadece talimat içeren (instruction-only) bir yetenektir, sadece `SKILL.md` dosyası oluşturmak yeterlidir.

### 1. Adım: Klasörü Oluşturun

```bash
mkdir -p .agent/skills/code-review
```

### 2. Adım: SKILL.md Oluşturun

```markdown
---
name: code-review
description: Kod değişikliklerini hatalar, stil sorunları ve en iyi uygulamalar açısından inceler. PR'ları gözden geçirirken veya kod kalitesini kontrol ederken kullanın.
---

# Kod İnceleme Yeteneği

Kod incelerken şu adımları izleyin:

## İnceleme Kontrol Listesi

1. **Doğruluk**: Kod yapması gerekeni yapıyor mu?
2. **Uç Durumlar**: Hata durumları ele alınmış mı?
3. **Stil**: Proje kurallarına uyuyor mu?
4. **Performans**: Belirgin verimsizlikler var mı?

## Geri Bildirim Nasıl Verilir

- Neyin değişmesi gerektiği konusunda spesifik olun
- Sadece "ne" olduğunu değil, "neden" olduğunu da açıklayın
- Mümkünse alternatifler önerin
```

> **Not**: `SKILL.md` dosyası en üstte metadata (isim, açıklama) içerir, ardından talimatlar gelir. Ajan sadece metadatayı okur ve talimatları yalnızca ihtiyaç duyulduğunda yükler.

### Deneyin

`demo_bad_code.py` dosyasını oluşturun:

```python
import time

def get_user_data(users, id):
    # Find user by ID
    for u in users:
        if u['id'] == id:
            return u
    return None

def process_payments(items):
    total = 0
    for i in items:
        # Calculate tax
        tax = i['price'] * 0.1
        total = total + i['price'] + tax
        time.sleep(0.1)  # Simulate slow network call
    return total

def run_batch():
    users = [{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]
    items = [{'price': 10}, {'price': 20}, {'price': 100}]
    
    u = get_user_data(users, 3)
    print("User found: " + u['name'])  # Will crash if None
    
    print("Total: " + str(process_payments(items)))

if __name__ == "__main__":
    run_batch()
```

**İstem (Prompt)**: `review the @demo_bad_code.py file`

Ajan otomatik olarak `code-review` yeteneğini tanımlar, bilgileri yükler ve talimatları uygular.

---

## 📄 Örnek 2: Lisans Başlığı Yeteneği (License Header Skill)

Bu yetenek, `resources/` klasöründeki bir referans dosyasını kullanır.

### 1. Adım: Klasörü Oluşturun

```bash
mkdir -p .agent/skills/license-header-adder/resources
```

### 2. Adım: Şablon Dosyasını Oluşturun

**`.agent/skills/license-header-adder/resources/HEADER.txt`**:

```
/*
 * Copyright (c) 2026 YOUR_COMPANY_NAME LLC.
 * All rights reserved.
 * This code is proprietary and confidential.
 */
```

### 3. Adım: SKILL.md Oluşturun

**`.agent/skills/license-header-adder/SKILL.md`**:

```markdown
---
name: license-header-adder
description: Yeni kaynak dosyalarına standart kurumsal lisans başlığını ekler.
---

# Lisans Başlığı Ekleyici

Bu yetenek, tüm yeni kaynak dosyalarının doğru telif hakkı başlığına sahip olmasını sağlar.

## Talimatlar

1. **Şablonu Oku**: `resources/HEADER.txt` içeriğini oku.
2. **Dosyaya Uygula**: Yeni bir dosya oluştururken, bu içeriği aynen başa ekle.
3. **Sözdizimini Uyarla**: 
   - C tarzı diller (Java, TS) için `/* */` bloğunu koru.
   - Python/Shell için `#` yorumlarına dönüştür.
```

### Deneyin

**İstem (Prompt)**: `Create a new Python script named data_processor.py that prints 'Hello World'.`

Ajan şablonu okur, yorumları Python tarzına dönüştürür ve otomatik olarak dosyanın başına ekler.

---

## 🎯 Sonuç

Yetenekler (Skills) oluşturarak, genel amaçlı AI modelini projeniz için bir uzmana dönüştürdünüz:

- ✅ En iyi uygulamaları sistemleştirdiniz
- ✅ Kod inceleme kurallarına uydunuz
- ✅ Lisans başlıklarını otomatik eklediniz
- ✅ Ajanın ekibinizle nasıl çalışacağını otomatik olarak bilmesini sağladınız

AI'ya sürekli "lisans eklemeyi unutma" veya "commit formatını düzelt" demek yerine, artık Ajan bunu otomatik olarak yapar!