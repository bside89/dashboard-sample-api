import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../users/entities/user.entity';

// Load environment variables
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// Detectar se é ambiente local ou produção
const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;
const isLocalDatabase =
  !databaseUrl ||
  databaseUrl.includes('localhost') ||
  databaseUrl.includes('127.0.0.1');

// Configuração base
const baseConfig = {
  type: 'postgres' as const,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: [User],
  migrations: [
    isProduction
      ? 'dist/database/migrations/*.js'
      : 'src/database/migrations/*.ts',
  ],
  migrationsTableName: 'migrations',
};

// Configuração específica por ambiente
const databaseConfig = isLocalDatabase
  ? {
      // Desenvolvimento local - sem SSL
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'dashboard-sample',
    }
  : {
      // Produção/Railway - com SSL
      url: databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    };

export const AppDataSource = new DataSource({
  ...baseConfig,
  ...databaseConfig,
});
