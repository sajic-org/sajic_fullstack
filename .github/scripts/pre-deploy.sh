
#!/bin/bash

set -euo pipefail

echo "::group::Running post-deploy script..."

echo "::notice::Caching framework..."
php artisan optimize

echo "::notice::Reloading Services..."
sudo systemctl restart sajic-ssr.service
sudo systemctl reload sajic-queue.service
sudo systemctl reload sajic-site.service

echo "::notice::Bring site back from maintenance mode..."
php artisan up

echo "::endgroup::"

echo "::notice::Post-deploy script was a success!"
