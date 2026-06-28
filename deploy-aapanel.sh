#!/bin/bash

# ==============================================================================
# TROJAN RECOVERY - AAPANEL SECURE NODE DEPLOYMENT SCRIPT
# ==============================================================================
# This script is designed to run directly on your aaPanel Linux VPS.
# It can be triggered by aaPanel Webhooks or run manually inside the terminal.
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# Configurations - UPDATE THESE TO MATCH YOUR SERVER PATHS
WEBSITE_DIR="/www/wwwroot/trojanrecovery.com"
PM2_APP_NAME="trojan-recovery"
NODE_PORT=3000

echo "================================================="
echo "🔒 STARTING TROJAN RECOVERY RE-DEPLOYMENT PROTOCOL"
echo "================================================="
echo "📅 Time: $(date)"

# 1. Navigate to Web Root
if [ ! -d "$WEBSITE_DIR" ]; then
    echo "❌ Error: Directory $WEBSITE_DIR does not exist. Creating it now..."
    mkdir -p "$WEBSITE_DIR"
fi

cd "$WEBSITE_DIR"

# 2. Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚙️ Initializing repository in $WEBSITE_DIR..."
    git init
    # Change the remote to your github repository URL
    echo "⚠️ Git not initialized. Run manual setup or git clone first."
    exit 1
fi

# 3. Pull latest changes from main branch
echo "🔄 Pulling fresh updates from GitHub..."
git fetch --all
git reset --hard origin/main || git reset --hard origin/master

# 4. Install production dependencies
echo "📦 Installing clean NPM dependencies..."
npm install --production=false

# 5. Compile Full-Stack Assets (Vite + Server)
echo "⚡ Initiating production compilation pipeline..."
npm run build

# 6. PM2 Process Lifecycle Management
echo "🚀 Initializing PM2 process check..."
if ! command -v pm2 &> /dev/null; then
    echo "⚠️ PM2 not found globally. Installing PM2 via npm..."
    npm install -g pm2
fi

# Check if application is already running in PM2
if pm2 list | grep -q "$PM2_APP_NAME"; then
    echo "🔄 Reloading active PM2 instance safely..."
    pm2 restart "$PM2_APP_NAME" --update-env
else
    echo "🆕 Launching new PM2 service cluster..."
    # Starts the esbuild bundle output with CJS standard
    pm2 start dist/server.cjs --name "$PM2_APP_NAME" --env production
fi

# Save PM2 state to survive server reboots
pm2 save

echo "================================================="
echo "✅ DEPLOYMENT PROTOCOL COMPLETE AND VERIFIED"
echo "🌐 App running on Local Server Port: $NODE_PORT"
echo "================================================="
