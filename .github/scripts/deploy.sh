#!/bin/bash
set -e

echo "Deploy começou... (O_o)!"

(php artisan down) || true

git pull origin dev

php artisan optimize:clear

composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

npm ci

npm run build:ssr

php artisan optimize

php artisan migrate --force

php artisan up

echo "Deploy foi um sucesso!!! :D"
