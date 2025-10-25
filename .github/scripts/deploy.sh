#!/bin/bash
set -e

rollback() {
    echo "::error::Algo deu errado! Revertendo deploy... >:("
    git reset --hard
    php artisan up || true
    exit 1
}

trap rollback ERR

echo "::group::Deploy começou (O_o)!"

php artisan down || true
echo "::notice::Site em modo manutenção..."

echo "::group::Atualizando código..."
git pull origin main
echo "::endgroup::"

echo "::group::Limpando cache..."
php artisan optimize:clear
echo "::endgroup::"

echo "::group::Instalando dependências..."
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts
php artisan package:discover --ansi
npm ci
echo "::endgroup::"


echo "::group::Buildando o front-end..."
sudo systemctl stop sajic-ssr.service # Se a gente não para esse brother a RAM da maquina acaba
npm run build:ssr
sudo systemctl start sajic-ssr.service
echo "::endgroup::"

echo "::group::Fazendo cache das novas coisas..."
php artisan optimize
echo "::endgroup::"

echo "::group::Fazendo migrações no banco..."
php artisan migrate --force
echo "::endgroup::"

echo "::group::Recarregando octane e queue com o código novo..."
sudo systemctl reload sajic-queue.service
sudo systemctl reload sajic-site.service
echo "::endgroup::"

php artisan up
echo "::endgroup::"

echo "::notice:: Deploy foi um sucesso!!! >:D"
