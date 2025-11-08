#!/bin/bash

set -euo pipefail

echo "::group::Running post-deploy script..."

echo "::notice::Caching framework..."
php artisan optimize

echo "::notice::Reloading Services..."
sudo systemctl reload sajic-queue.service || true
sudo systemctl reload sajic-site.service

php artisan migrate --force --isolated

echo "::notice::Bring site back from maintenance mode..."
php artisan up

echo "::notice::Reset storage link just be sure..."
php artisan storage:unlink
php artisan storage:link

echo "::endgroup::"

echo "::notice::Post-deploy script was a success!"
