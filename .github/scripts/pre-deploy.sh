#!/bin/bash

set -euo pipefail

echo "::group::Running pre-deploy script..."

echo "::notice::Set site to maintenance mode..."
php artisan down || true

echo "::notice::Cleaning cache..."
php artisan optimize:clear

echo "::endgroup::"

echo "::notice::Pre-deploy script was a success!"
