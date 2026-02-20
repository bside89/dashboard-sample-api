const { exec, spawn } = require('child_process');

// Script para executar migrations e iniciar aplicação no Railway
console.log('🚀 Starting Railway deployment...');

// Configurar environment
process.env.NODE_ENV = 'production';

function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n📊 ${description}...`);
    console.log(`Running: ${command}`);

    exec(command, { timeout: 60000 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error in ${description}:`, error.message);
        console.error('Error details:', error);
        if (stderr) console.error('stderr:', stderr);
        reject(error);
        return;
      }

      if (
        stderr &&
        !stderr.includes('warning') &&
        !stderr.includes('injecting env')
      ) {
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
    // Aguardar um pouco para garantir que o banco esteja pronto
    console.log('⏳ Waiting for database to be ready...');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Executar migrations
    await runCommand(
      'NODE_ENV=production npm run typeorm -- migration:run -d dist/database/data-source.js',
      'Running database migrations',
    );

    // Iniciar aplicação
    console.log('\n🏃 Starting application...');

    // Usar spawn ao invés de exec para manter o processo vivo
    const app = spawn('node', ['dist/main'], {
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' },
    });

    app.on('error', (error) => {
      console.error('❌ Application error:', error.message);
      process.exit(1);
    });

    app.on('exit', (code) => {
      console.log(`Application exited with code ${code}`);
      process.exit(code);
    });
  } catch (error) {
    console.error('❌ Startup failed:', error.message);
    process.exit(1);
  }
}

start();
