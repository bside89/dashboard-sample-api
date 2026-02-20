import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

// Detectar se é ambiente local ou produção
const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;
const isLocalDatabase =
  !databaseUrl ||
  databaseUrl.includes('localhost') ||
  databaseUrl.includes('127.0.0.1');

// Configuração do banco de dados baseada no ambiente
const getDatabaseConfig = () => {
  const baseConfig = {
    type: 'postgres' as const,
    entities: [User],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  };

  return isLocalDatabase
    ? {
        ...baseConfig,
        // Desenvolvimento local - sem SSL
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }
    : {
        ...baseConfig,
        // Produção/Railway - com SSL
        url: databaseUrl,
        ssl: {
          rejectUnauthorized: false,
        },
      };
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
