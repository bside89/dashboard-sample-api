#!/bin/bash
# Arquivo: railway-start.sh
# Script para inicializar aplicação no Railway com migrations

set -e  # Parar em caso de erro

echo "🚀 Starting Railway deployment..."

# Executar migrations
echo "📊 Running database migrations..."
NODE_ENV=production npm run typeorm -- migration:run -d dist/database/data-source.js

echo "✅ Migrations completed successfully!"

# Iniciar aplicação
echo "🏃 Starting application..."
NODE_ENV=production node dist/main