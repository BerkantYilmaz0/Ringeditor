---
name: bash-linux
description: Bash/Linux terminal desenleri. Kritik komutlar, borulama (piping), hata yönetimi, betik yazma. macOS veya Linux sistemlerinde çalışırken kullanın.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Bash Linux Desenleri

> Linux/macOS üzerinde Bash için temel desenler.

---

## 1. Operatör Sözdizimi

### Komutları Zincirleme

| Operatör | Anlamı | Örnek |
|----------|---------|---------|
| `;` | Sırayla çalıştır | `cmd1; cmd2` |
| `&&` | Önceki başarılıysa çalıştır | `npm install && npm run dev` |
| `\|\|` | Önceki başarısızsa çalıştır | `npm test \|\| echo "Testler başarısız"` |
| `\|` | Çıktıyı borula (Pipe) | `ls \| grep ".js"` |

---

## 2. Dosya İşlemleri

### Temel Komutlar

| Görev | Komut |
|------|---------|
| Hepsini listele | `ls -la` |
| Dosyaları bul | `find . -name "*.js" -type f` |
| Dosya içeriği | `cat file.txt` |
| İlk N satır | `head -n 20 file.txt` |
| Son N satır | `tail -n 20 file.txt` |
| Logu takip et | `tail -f log.txt` |
| Dosyalarda ara | `grep -r "pattern" --include="*.js"` |
| Dosya boyutu | `du -sh *` |
| Disk kullanımı | `df -h` |

---

## 3. Süreç Yönetimi

| Görev | Komut |
|------|---------|
| Süreçleri listele | `ps aux` |
| İsme göre bul | `ps aux \| grep node` |
| PID ile öldür | `kill -9 <PID>` |
| Port kullanıcısını bul | `lsof -i :3000` |
| Portu öldür | `kill -9 $(lsof -t -i :3000)` |
| Arka plan | `npm run dev &` |
| İşler (Jobs) | `jobs -l` |
| Öne getir | `fg %1` |

---

## 4. Metin İşleme

### Temel Araçlar

| Araç | Amaç | Örnek |
|------|---------|---------|
| `grep` | Ara | `grep -rn "TODO" src/` |
| `sed` | Değiştir | `sed -i 's/eski/yeni/g' file.txt` |
| `awk` | Sütunları çıkar | `awk '{print $1}' file.txt` |
| `cut` | Alanları kes | `cut -d',' -f1 data.csv` |
| `sort` | Satırları sırala | `sort -u file.txt` |
| `uniq` | Benzersiz satırlar | `sort file.txt \| uniq -c` |
| `wc` | Say | `wc -l file.txt` |

---

## 5. Ortam Değişkenleri

| Görev | Komut |
|------|---------|
| Hepsini görüntüle | `env` veya `printenv` |
| Birini görüntüle | `echo $PATH` |
| Geçici ayarla | `export VAR="deger"` |
| Betikte ayarla | `VAR="deger" command` |
| PATH'e ekle | `export PATH="$PATH:/yeni/yol"` |

---

## 6. Ağ

| Görev | Komut |
|------|---------|
| İndir | `curl -O https://example.com/file` |
| API isteği | `curl -X GET https://api.example.com` |
| POST JSON | `curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' URL` |
| Portu kontrol et | `nc -zv localhost 3000` |
| Ağ bilgisi | `ifconfig` veya `ip addr` |

---

## 7. Betik Şablonu

```bash
#!/bin/bash
set -euo pipefail  # Hata, tanımsız değişken, boru hatasında çık

# Renkler (isteğe bağlı)
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Betik dizini
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Fonksiyonlar
log_info() { echo -e "${GREEN}[BILGI]${NC} $1"; }
log_error() { echo -e "${RED}[HATA]${NC} $1" >&2; }

# Ana
main() {
    log_info "Başlatılıyor..."
    # Mantığınız burada
    log_info "Bitti!"
}

main "$@"
```

---

## 8. Yaygın Desenler

### Komutun var olup olmadığını kontrol et

```bash
if command -v node &> /dev/null; then
    echo "Node yüklü"
fi
```

### Varsayılan değişken değeri

```bash
NAME=${1:-"varsayilan_deger"}
```

### Dosyayı satır satır oku

```bash
while IFS= read -r line; do
    echo "$line"
done < file.txt
```

### Dosyalar üzerinde döngü

```bash
for file in *.js; do
    echo "İşleniyor $file"
done
```

---

## 9. PowerShell'den Farklar

| Görev | PowerShell | Bash |
|------|------------|------|
| Dosyaları listele | `Get-ChildItem` | `ls -la` |
| Dosyaları bul | `Get-ChildItem -Recurse` | `find . -type f` |
| Ortam | `$env:VAR` | `$VAR` |
| String birleştirme | `"$a$b"` | `"$a$b"` (aynı) |
| Null kontrolü | `if ($x)` | `if [ -n "$x" ]` |
| Boru hattı | Nesne tabanlı | Metin tabanlı |

---

## 10. Hata Yönetimi

### Seçenekleri ayarla

```bash
set -e          # Hata durumunda çık
set -u          # Tanımsız değişkende çık
set -o pipefail # Boru hattı başarısızlığında çık
set -x          # Hata ayıklama: komutları yazdır
```

### Temizlik için Trap

```bash
cleanup() {
    echo "Temizleniyor..."
    rm -f /tmp/tempfile
}
trap cleanup EXIT
```

---

> **Unutmayın:** Bash metin tabanlıdır. Başarı zincirleri için `&&`, güvenlik için `set -e` kullanın ve değişkenlerinizi tırnak içine alın!
