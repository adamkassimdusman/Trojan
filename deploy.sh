#!/bin/bash
set -e

APP_DIR="/www/wwwroot/Trojan"

echo "=== Deploy started ==="

cd $APP_DIR

echo "Pulling latest code..."
git fetch origin main
git reset --hard origin/main

echo "Installing dependencies..."
npm ci

echo "Building..."
npm run build

echo "Reloading PM2..."
pm2 reload trojan || pm2 start dist/server.cjs --name trojan

pm2 save

echo "=== Deploy complete ==="
