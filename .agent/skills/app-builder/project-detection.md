# Proje Türü Tespiti

> Proje türünü ve şablonunu belirlemek için kullanıcı isteklerini analiz edin.

## Anahtar Kelime Matrisi

| Anahtar Kelimeler | Proje Türü | Şablon |
|------------------|------------|--------|
| blog, post, article, makale, yazı | Blog | astro-static |
| e-commerce, e-ticaret, product, ürün, cart, sepet, payment, ödeme | E-ticaret | nextjs-saas |
| dashboard, panel, management, yönetim | Admin Paneli | nextjs-fullstack |
| api, backend, service, servis, rest | API Servisi | express-api |
| python, fastapi, django | Python API | python-fastapi |
| mobile, android, ios, react native | Mobil Uygulama (RN) | react-native-app |
| flutter, dart | Mobil Uygulama (Flutter) | flutter-app |
| portfolio, portfolyo, personal, kişisel, cv | Portfolyo | nextjs-static |
| crm, customer, müşteri, sales, satış | CRM | nextjs-fullstack |
| saas, subscription, abonelik, stripe | SaaS | nextjs-saas |
| landing, promotional, marketing, pazarlama | Açılış Sayfası | nextjs-static |
| docs, documentation, dokümantasyon | Dokümantasyon | astro-static |
| extension, plugin, chrome, eklenti | Tarayıcı Eklentisi | chrome-extension |
| desktop, electron, masaüstü | Masaüstü Uygulaması | electron-desktop |
| cli, command line, terminal, komut satırı | CLI Aracı | cli-tool |
| monorepo, workspace, çalışma alanı | Monorepo | monorepo-turborepo |

## Tespit Süreci

```
1. Kullanıcı isteğini simgeleştir (tokenize)
2. Anahtar kelimeleri çıkar
3. Proje türünü belirle
4. Eksik bilgileri tespit et → conversation-manager'a ilet
5. Teknoloji yığını (tech stack) öner
```
