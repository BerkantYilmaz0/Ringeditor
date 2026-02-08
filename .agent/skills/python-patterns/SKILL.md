---
name: python-patterns
description: Python development principles and decision-making. Framework selection, async patterns, type hints, project structure. Teaches thinking, not copying.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Python Desenleri

> 2025 için Python geliştirme prensipleri ve karar verme.
> **Kalıpları ezberlemeyi değil, DÜŞÜNMEYİ öğrenin.**

---

## ⚠️ Bu Yetenek Nasıl Kullanılır

Bu yetenek kopyalanacak sabit kodları değil, **karar verme prensiplerini** öğretir.

- Belirsiz olduğunda kullanıcıya çerçeve tercihini SORUN
- BAĞLAMA göre async vs sync seçin
- Her seferinde aynı çerçeveyi (framework) varsayılan yapmayın

---

## 1. Çerçeve Seçimi (2025)

### Karar Ağacı

```
Ne inşa ediyorsunuz?
│
├── API-öncelikli / Mikroservisler
│   └── FastAPI (async, modern, hızlı)
│
├── Full-stack web / CMS / Admin
│   └── Django (her şey dahil - batteries-included)
│
├── Basit / Script / Öğrenme
│   └── Flask (minimal, esnek)
│
├── AI/ML API sunumu
│   └── FastAPI (Pydantic, async, uvicorn)
│
└── Arka plan çalışanları (workers)
    └── Celery + herhangi bir çerçeve
```

### Karşılaştırma Prensipleri

| Faktör | FastAPI | Django | Flask |
|--------|---------|--------|-------|
| **En iyisi** | API'ler, mikroservisler | Full-stack, CMS | Basit, öğrenme |
| **Async** | Yerel (Native) | Django 5.0+ | Eklentiler aracılığıyla |
| **Admin** | Manuel | Yerleşik | Eklentiler aracılığıyla |
| **ORM** | Kendi seçimin | Django ORM | Kendi seçimin |
| **Öğrenme eğrisi** | Düşük | Orta | Düşük |

### Seçim Soruları:
1. Bu sadece API mi yoksa full-stack mi?
2. Admin arayüzüne ihtiyaç var mı?
3. Ekip async biliyor mu?
4. Mevcut altyapı var mı?

---

## 2. Async vs Sync Kararı

### Ne Zaman Async Kullanmalı

```
async def şu durumlarda daha iyidir:
├── I/O-sınırlı operasyonlar (veritabanı, HTTP, dosya)
├── Çok sayıda eş zamanlı bağlantı
├── Gerçek zamanlı özellikler
├── Mikroservis iletişimi
└── FastAPI/Starlette/Django ASGI

def (sync) şu durumlarda daha iyidir:
├── CPU-sınırlı operasyonlar
├── Basit scriptler
├── Eski (Legacy) kod tabanı
├── Ekip async'e aşina değil
└── Bloklayan kütüphaneler (async sürümü yok)
```

### Altın Kural

```
I/O-sınırlı → async (harici bekleme)
CPU-sınırlı → sync + multiprocessing (hesaplama)

Yapma (Don't):
├── Sync ve async'i dikkatsizce karıştırma
├── Async kodda sync kütüphaneler kullanma
└── CPU işi için async zorlama
```

### Async Kütüphane Seçimi

| İhtiyaç | Async Kütüphanesi |
|------|---------------|
| HTTP istemcisi | httpx |
| PostgreSQL | asyncpg |
| Redis | aioredis / redis-py async |
| Dosya I/O | aiofiles |
| Veritabanı ORM | SQLAlchemy 2.0 async, Tortoise |

---

## 3. Tip İpuçları (Type Hints) Stratejisi

### Ne Zaman Tiplemeli

```
Her zaman tiple:
├── Fonksiyon parametreleri
├── Dönüş türleri
├── Sınıf öznitelikleri
├── Genel API'ler

Atlanabilir:
├── Yerel değişkenler (bırak çıkarım çalışsın)
├── Tek seferlik scriptler
├── Testler (genellikle)
```

### Yaygın Tip Desenleri

```python
# Bunlar desenlerdir, anlayın:

# Optional → None olabilir
from typing import Optional
def find_user(id: int) -> Optional[User]: ...

# Union → birden fazla türden biri
def process(data: str | dict) -> None: ...

# Generic collections
def get_items() -> list[Item]: ...
def get_mapping() -> dict[str, int]: ...

# Callable
from typing import Callable
def apply(fn: Callable[[int], str]) -> str: ...
```

### Doğrulama için Pydantic

```
Pydantic ne zaman kullanılmalı:
├── API istek/yanıt modelleri
├── Yapılandırma/ayarlar
├── Veri doğrulama
├── Serileştirme

Faydalar:
├── Çalışma zamanı doğrulaması
├── Otomatik oluşturulan JSON şeması
├── FastAPI ile yerel olarak çalışır
└── Net hata mesajları
```

---

## 4. Proje Yapısı Prensipleri

### Yapı Seçimi

```
Küçük proje / Script:
├── main.py
├── utils.py
└── requirements.txt

Orta Ölçekli API:
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── schemas/
├── tests/
└── pyproject.toml

Büyük uygulama:
├── src/
│   └── myapp/
│       ├── core/
│       ├── api/
│       ├── services/
│       ├── models/
│       └── ...
├── tests/
└── pyproject.toml
```

### FastAPI Yapı Prensipleri

```
Özelliğe veya katmana göre organize edin:

Katmana göre:
├── routes/ (API uç noktaları)
├── services/ (iş mantığı)
├── models/ (veritabanı modelleri)
├── schemas/ (Pydantic modelleri)
└── dependencies/ (paylaşılan bağımlılıklar)

Özelliğe göre:
├── users/
│   ├── routes.py
│   ├── service.py
│   └── schemas.py
└── products/
    └── ...
```

---

## 5. Django Prensipleri (2025)

### Django Async (Django 5.0+)

```
Django async'i destekler:
├── Async görünümler (views)
├── Async ara yazılım (middleware)
├── Async ORM (sınırlı)
└── ASGI dağıtımı

Django'da ne zaman async kullanılır:
├── Harici API çağrıları
├── WebSocket (Channels)
├── Yüksek eş zamanlılıklı görünümler
└── Arka plan görevi tetikleme
```

### Django En İyi Uygulamalar

```
Model tasarımı:
├── Şişman modeller, zayıf görünümler (Fat models, thin views)
├── Yaygın sorgular için yöneticileri (managers) kullan
├── Paylaşılan alanlar için soyut temel sınıflar

Görünümler (Views):
├── Karmaşık CRUD için sınıf tabanlı
├── Basit uç noktalar için fonksiyon tabanlı
├── DRF ile viewset kullan

Sorgular:
├── FK'lar için select_related()
├── M2M için prefetch_related()
├── N+1 sorgularından kaçın
└── Belirli alanlar için .only() kullan
```

---

## 6. FastAPI Prensipleri

### FastAPI'de async def vs def

```
async def kullan:
├── Async veritabanı sürücüleri kullanırken
├── Async HTTP çağrıları yaparken
├── I/O-sınırlı işlemler
└── Eş zamanlılığı yönetmek istediğinde

def kullan:
├── Bloklayan işlemler
├── Sync veritabanı sürücüleri
├── CPU-sınırlı iş
└── FastAPI iş parçacığı havuzunda otomatik olarak çalıştırır
```

### Bağımlılık Enjeksiyonu (Dependency Injection)

```
Bağımlılıkları şunlar için kullanın:
├── Veritabanı oturumları
├── Mevcut kullanıcı / Auth
├── Yapılandırma
├── Paylaşılan kaynaklar

Faydalar:
├── Test edilebilirlik (bağımlılıkları mockla)
├── Temiz ayrım
├── Otomatik temizleme (yield)
```

### Pydantic v2 Entegrasyonu

```python
# FastAPI + Pydantic sıkı bir şekilde entegre edilmiştir:

# İstek doğrulama
@app.post("/users")
async def create(user: UserCreate) -> UserResponse:
    # user zaten doğrulandı
    ...

# Yanıt serileştirme
# Dönüş türü yanıt şeması olur
```

---

## 7. Arka Plan Görevleri

### Seçim Rehberi

| Çözüm | En İyisi |
|----------|----------|
| **BackgroundTasks** | Basit, işlem içi görevler |
| **Celery** | Dağıtık, karmaşık iş akışları |
| **ARQ** | Async, Redis tabanlı |
| **RQ** | Basit Redis kuyruğu |
| **Dramatiq** | Aktör tabanlı, Celery'den daha basit |

### Her Birini Ne Zaman Kullanmalı

```
FastAPI BackgroundTasks:
├── Hızlı işlemler
├── Kalıcılığa gerek yok
├── Ateşle ve unut (Fire-and-forget)
└── Aynı işlem (process)

Celery/ARQ:
├── Uzun süren görevler
├── Yeniden deneme mantığına ihtiyaç var
├── Dağıtık işçiler (workers)
├── Kalıcı kuyruk
└── Karmaşık iş akışları
```

---

## 8. Hata Yönetimi Prensipleri

### İstisna (Exception) Stratejisi

```
FastAPI'da:
├── Özel istisna sınıfları oluştur
├── İstisna işleyicilerini (exception handlers) kaydet
├── Tutarlı hata formatı döndür
└── Dahili bilgileri ifşa etmeden logla

Desen:
├── Servislerde etki alanı (domain) istisnaları fırlat
├── İşleyicilerde yakala ve dönüştür
└── İstemci temiz hata yanıtı alır
```

### Hata Yanıt Felsefesi

```
Şunları İçerir:
├── Hata kodu (programatik)
├── Mesaj (insan tarafından okunabilir)
├── Ayrıntılar (uygulanabilir olduğunda alan düzeyinde)
└── Yığın izleri (stack traces) YOK (güvenlik)
```

---

## 9. Test Prensipleri

### Test Stratejisi

| Tür | Amaç | Araçlar |
|------|---------|-------|
| **Birim** | İş mantığı | pytest |
| **Entegrasyon** | API uç noktaları | pytest + httpx/TestClient |
| **E2E** | Tam iş akışları | pytest + DB |

### Async Test Etme

```python
# Async testler için pytest-asyncio kullan

import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/users")
        assert response.status_code == 200
```

### Fikstür (Fixtures) Stratejisi

```
Yaygın fikstürler:
├── db_session → Veritabanı bağlantısı
├── client → Test istemcisi
├── authenticated_user → Token'lı kullanıcı
└── sample_data → Test verisi kurulumu
```

---

## 10. Karar Kontrol Listesi

Uygulamadan önce:

- [ ] **Kullanıcıya çerçeve tercihi soruldu mu?**
- [ ] **BU bağlam için çerçeve seçildi mi?** (sadece varsayılan değil)
- [ ] **Async vs sync kararı verildi mi?**
- [ ] **Tip ipucu stratejisi planlandı mı?**
- [ ] **Proje yapısı tanımlandı mı?**
- [ ] **Hata yönetimi planlandı mı?**
- [ ] **Arka plan görevleri düşünüldü mü?**

---

## 11. Kaçınılması Gereken Anti-Desenler

### ❌ YAPMA:
- Basit API'ler için varsayılan olarak Django kullanma (FastAPI daha iyi olabilir)
- Async kodda sync kütüphaneler kullanma
- Genel API'ler için tip ipuçlarını atlama
- İş mantığını routelara/viewlara koyma
- N+1 sorgularını görmezden gelme
- Async ve sync'i dikkatsizce karıştırma

### ✅ YAP:
- Bağlama göre çerçeve seç
- Async gereksinimleri hakkında sor
- Doğrulama için Pydantic kullan
- Endişeleri ayır (routes → services → repos)
- Kritik yolları test et

---

> **Unutmayın**: Python desenleri SİZİN özel bağlamınız için karar vermekle ilgilidir. Kodu kopyalamayın—uygulamanıza en iyi neyin hizmet ettiğini düşünün.
