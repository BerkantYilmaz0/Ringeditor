---
description: Test oluşturma ve test çalıştırma komutu. Kod için testler oluşturur ve yürütür.
---

# /test - Test Oluşturma ve Yürütme

$ARGUMENTS

---

## Amaç

Bu komut testler oluşturur, mevcut testleri çalıştırır veya test kapsamını kontrol eder.

---

## Alt Komutlar

```
/test                - Tüm testleri çalıştır
/test [dosya/özellik]- Belirli hedef için testler oluştur
/test coverage       - Test kapsam raporunu göster
/test watch          - Testleri izleme modunda çalıştır
```

---

## Davranış

### Test Oluşturma

Bir dosya veya özelliği test etmesi istendiğinde:

1. **Kodu analiz et**
   - Fonksiyonları ve metotları tanımla
   - Sınır durumlarını bul
   - Taklit edilecek (mock) bağımlılıkları tespit et

2. **Test durumları üret**
   - Mutlu yol (happy path) testleri
   - Hata durumları
   - Sınır durumları
   - Entegrasyon testleri (gerekirse)

3. **Testleri yaz**
   - Projenin test çerçevesini kullan (Jest, Vitest, vb.)
   - Mevcut test desenlerini izle
   - Harici bağımlılıkları taklit et (mock)

---

## Çıktı Formatı

### Test Oluşturma İçin

```markdown
## 🧪 Testler: [Hedef]

### Test Planı
| Test Durumu | Tür | Kapsam |
|-----------|------|----------|
| Kullanıcı oluşturmalı | Birim | Mutlu yol |
| Geçersiz e-postayı reddetmeli | Birim | Doğrulama |
| Db hatasını işlemeli | Birim | Hata durumu |

### Oluşturulan Testler

`tests/[dosya].test.ts`

[Testleri içeren kod bloğu]

---

Şununla çalıştır: `npm test`
```

### Test Yürütme İçin

```
🧪 Testler çalıştırılıyor...

✅ auth.test.ts (5 geçti)
✅ user.test.ts (8 geçti)
❌ order.test.ts (2 geçti, 1 başarısız)

Başarısız:
  ✗ indirimli toplamı hesaplamalı
    Beklenen: 90
    Alınan: 100

Toplam: 15 test (14 geçti, 1 başarısız)
```

---

## Örnekler

```
/test src/services/auth.service.ts
/test kullanıcı kayıt akışı
/test coverage
/test başarısız testleri düzelt
```

---

## Test Desenleri

### Birim Test Yapısı

```typescript
describe('AuthService', () => {
  describe('login', () => {
    it('geçerli kimlik bilgileri için token döndürmeli', async () => {
      // Düzenle (Arrange)
      const credentials = { email: 'test@test.com', password: 'pass123' };
      
      // Eylem (Act)
      const result = await authService.login(credentials);
      
      // Doğrula (Assert)
      expect(result.token).toBeDefined();
    });

    it('geçersiz şifre için hata fırlatmalı', async () => {
      // Düzenle (Arrange)
      const credentials = { email: 'test@test.com', password: 'yanlis' };
      
      // Eylem & Doğrula (Act & Assert)
      await expect(authService.login(credentials)).rejects.toThrow('Geçersiz kimlik bilgileri');
    });
  });
});
```

---

## Temel Prensipler

- **Uygulamayı değil davranışı test et**
- **Test başına bir doğrulama** (pratik olduğunda)
- **Açıklayıcı test isimleri**
- **Düzenle-Eylem-Doğrula (Arrange-Act-Assert) deseni**
- **Harici bağımlılıkları taklit et (Mock)**
