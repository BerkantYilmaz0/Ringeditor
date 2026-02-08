---
name: code-review-checklist
description: Code review guidelines covering code quality, security, and best practices.
allowed-tools: Read, Glob, Grep
---

# Kod İnceleme Kontrol Listesi

## Hızlı İnceleme Kontrol Listesi

### Doğruluk
- [ ] Kod yapması gerekeni yapıyor
- [ ] Uç durumlar ele alınmış
- [ ] Hata yönetimi mevcut
- [ ] Belirgin bir hata (bug) yok

### Güvenlik
- [ ] Girdi doğrulanmış ve temizlenmiş (sanitized)
- [ ] SQL/NoSQL enjeksiyon güvenlik açığı yok
- [ ] XSS veya CSRF güvenlik açığı yok
- [ ] Kodlanmış sırlar veya hassas kimlik bilgileri yok
- [ ] **AI-Özel:** Prompt Enjeksiyonuna karşı koruma (varsa)
- [ ] **AI-Özel:** Çıktılar kritik havuzlarda (sinks) kullanılmadan önce temizleniyor

### Performans
- [ ] N+1 sorgusu yok
- [ ] Gereksiz döngü yok
- [ ] Uygun önbellekleme
- [ ] Paket boyutu etkisi dikkate alınmış

### Kod Kalitesi
- [ ] Net isimlendirme
- [ ] DRY - yinelenen kod yok
- [ ] SOLID prensipleri izlenmiş
- [ ] Uygun soyutlama seviyesi

### Test Etme
- [ ] Yeni kod için birim testleri
- [ ] Uç durumlar test edilmiş
- [ ] Testler okunabilir ve bakımı yapılabilir

### Dokümantasyon
- [ ] Karmaşık mantık yorumlanmış
- [ ] Genel API'ler belgelenmiş
- [ ] Gerekirse README güncellenmiş

## AI & LLM İnceleme Desenleri (2025)

### Mantık & Halüsinasyonlar
- [ ] **Düşünce Zinciri (Chain of Thought):** Mantık doğrulanabilir bir yolu izliyor mu?
- [ ] **Uç Durumlar:** AI boş durumları, zaman aşımlarını ve kısmi başarısızlıkları hesaba kattı mı?
- [ ] **Harici Durum:** Kod dosya sistemleri veya ağlar hakkında güvenli varsayımlar yapıyor mu?

### Prompt Mühendisliği İncelemesi
```markdown
// ❌ Kodda belirsiz prompt
const response = await ai.generate(userInput);

// ✅ Yapılandırılmış & Güvenli prompt
const response = await ai.generate({
  system: "You are a specialized parser...",
  input: sanitize(userInput),
  schema: ResponseSchema
});
```

## İşaretlenecek Anti-Desenler

```typescript
// ❌ Sihirli sayılar
if (status === 3) { ... }

// ✅ İsimlendirilmiş sabitler
if (status === Status.ACTIVE) { ... }

// ❌ Derin iç içe geçme
if (a) { if (b) { if (c) { ... } } }

// ✅ Erken dönüşler
if (!a) return;
if (!b) return;
if (!c) return;
// işi yap

// ❌ Uzun fonksiyonlar (100+ satır)
// ✅ Küçük, odaklanmış fonksiyonlar

// ❌ any tipi
const data: any = ...

// ✅ Uygun tipler
const data: UserData = ...
```

## İnceleme Yorumları Rehberi

```
// Engelleyici sorunlar 🔴 kullanır
🔴 ENGELLEYİCİ: Burada SQL enjeksiyonu güvenlik açığı var

// Önemli öneriler 🟡 kullanır
🟡 ÖNERİ: Performans için useMemo kullanmayı düşünün

// Küçük nitelikler 🟢 kullanır
🟢 UFAK: Değişmez değişken için let yerine const tercih edin

// Sorular ❓ kullanır
❓ SORU: Kullanıcı burada null ise ne olur?
```
