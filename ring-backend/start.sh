#!/bin/bash
cd /app

cat > /app/.env << EOF
DB_HOST=${DB_HOST}
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASS=${DB_PASS}
EOF

echo "=== ENV KONTROL ==="
cat /app/.env
echo "==================="

php -S 0.0.0.0:${PORT:-8080} -t public