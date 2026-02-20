const { exec } = require('child_process');
const path = require('path');

// Script para executar migrations e iniciar aplicação no Railway
console.log('🚀 Starting Railway deployment...');

// Configurar environment
process.env.NODE_ENV = 'production';

async function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n📊 ${description}...`);
    console.log(`Running: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error in ${description}:`, error.message);
        reject(error);
        return;
      }

      if (stderr) {
        console.log('⚠️  stderr:', stderr);
      }

      if (stdout) {
        console.log(stdout);
      }

      console.log(`✅ ${description} completed successfully!`);
      resolve();
    });
  });
}

async function start() {
  try {
    // Executar migrations
    await runCommand(
      'npm run typeorm -- migration:run -d dist/database/data-source.js',
      'Running database migrations',
    );

    // Iniciar aplicação
    console.log('\n🏃 Starting application...');
    exec('node dist/main', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Application error:', error.message);
        process.exit(1);
      }

      if (stderr) {
        console.error('Application stderr:', stderr);
      }

      if (stdout) {
        console.log(stdout);
      }
    });
  } catch (error) {
    console.error('❌ Startup failed:', error.message);
    process.exit(1);
  }
}

start();
