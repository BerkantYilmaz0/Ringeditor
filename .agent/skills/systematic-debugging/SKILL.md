---
name: systematic-debugging
description: 4-phase systematic debugging methodology with root cause analysis and evidence-based verification. Use when debugging complex issues.
allowed-tools: Read, Glob, Grep
---

# Sistematik Hata Ayıklama

> Kaynak: obra/superpowers

## Genel Bakış
Bu yetenek, rastgele tahminleri önleyen ve çözmeden önce problemlerin düzgün bir şekilde anlaşılmasını sağlayan yapılandırılmış bir hata ayıklama yaklaşımı sunar.

## 4 Aşamalı Hata Ayıklama Süreci

### Aşama 1: Yeniden Üret (Reproduce)
Düzeltmeden önce, sorunu güvenilir bir şekilde yeniden üretin.

```markdown
## Yeniden Üretme Adımları
1. [Yeniden üretmek için kesin adım]
2. [Sonraki adım]
3. [Beklenen vs gerçekleşen sonuç]

## Yeniden Üretme Oranı
- [ ] Her zaman (%100)
- [ ] Sıklıkla (%50-90)
- [ ] Bazen (%10-50)
- [ ] Nadiren (<%10)
```

### Aşama 2: İzole Et (Isolate)
Kaynağı daraltın.

```markdown
## İzolasyon Soruları
- Bu ne zaman olmaya başladı?
- Yakın zamanda ne değişti?
- Tüm ortamlarda oluyor mu?
- Minimal kodla yeniden üretebilir miyiz?
- Bunu tetikleyen en küçük değişiklik nedir?
```

### Aşama 3: Anla (Understand)
Sadece belirtileri değil, kök nedeni bulun.

```markdown
## Kök Neden Analizi
### 5 Neden (5 Whys)
1. Neden: [İlk gözlem]
2. Neden: [Daha derin neden]
3. Neden: [Daha da derin]
4. Neden: [Yaklaşıyor]
5. Neden: [Kök neden]
```

### Aşama 4: Düzelt & Doğrula (Fix & Verify)
Düzeltin ve gerçekten düzeldiğini doğrulayın.

```markdown
## Düzeltme Doğrulaması
- [ ] Hata artık yeniden üretilemiyor
- [ ] İlgili işlevsellik hala çalışıyor
- [ ] Yeni sorunlar ortaya çıkmadı
- [ ] Regresyonu önlemek için test eklendi
```

## Hata Ayıklama Kontrol Listesi

```markdown
## Başlamadan Önce
- [ ] Tutarlı bir şekilde yeniden üretilebiliyor
- [ ] Minimal yeniden üretim durumu var
- [ ] Beklenen davranışı anla

## İnceleme Sırasında
- [ ] Son değişiklikleri kontrol et (git log)
- [ ] Logları hatalar için kontrol et
- [ ] Gerekirse loglama ekle
- [ ] Debugger/breakpoint kullan

## Düzeltmeden Sonra
- [ ] Kök neden belgelendi
- [ ] Düzeltme doğrulandı
- [ ] Regresyon testi eklendi
- [ ] Benzer kodlar kontrol edildi
```

## Yaygın Hata Ayıklama Komutları

```bash
# Son değişiklikler
git log --oneline -20
git diff HEAD~5

# Desen arama
grep -r "errorPattern" --include="*.ts"

# Logları kontrol et
pm2 logs app-name --err --lines 100
```

## Anti-Desenler

❌ **Rastgele değişiklikler** - "Belki bunu değiştirirsem..."
❌ **Kanıtı görmezden gelme** - "Bunun nedeni o olamaz"
❌ **Varsayma** - Kanıt olmadan "Kesin X'tir"
❌ **Önce yeniden üretmeme** - Körlemesine düzeltme
❌ **Belirtilerde durma** - Kök nedeni bulmama
