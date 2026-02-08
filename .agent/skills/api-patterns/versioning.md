# Sürümleme Stratejileri

> İlk günden itibaren API evrimi için plan yapın.

## Karar Faktörleri

| Strateji | Uygulama | Takaslar (Trade-offs) |
|----------|---------------|------------|
| **URI** | /v1/users | Net, kolay önbellekleme |
| **Başlık (Header)** | Accept-Version: 1 | Daha temiz URL'ler, keşfi daha zor |
| **Sorgu (Query)** | ?version=1 | Eklemesi kolay, karmaşık |
| **Hiçbiri** | Dikkatlice geliştir | Dahili için en iyisi, genel için riskli |

## Sürümleme Felsefesi

```
Düşünün:
├── Genel API mi? → URI'de sürümle
├── Sadece dahili mi? → Sürümlemeye ihtiyaç olmayabilir
├── GraphQL mi? → Genellikle sürüm yok (şemayı geliştir)
├── tRPC mi? → Tipler uyumluluğu zorlar
```
