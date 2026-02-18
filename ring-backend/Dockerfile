FROM php:8.2-cli

WORKDIR /app

# Sistem bağımlılıkları + PHP eklentileri
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev \
  && docker-php-ext-install pdo pdo_mysql zip \
  && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Önce composer dosyaları (cache için)
COPY composer.json composer.lock* ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-progress

# Uygulama kaynak kodu
COPY . .

# Railway PORT'u kullanarak Slim'i ayağa kaldır
# Slim entrypoint genelde public/index.php ve static dosyalar public/ altında olur
CMD ["sh", "-lc", "/start.sh"]
