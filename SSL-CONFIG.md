# Configuração SSL Condicional - Solução para Railway

## Problema

Ao tentar executar migrations em desenvolvimento local, o erro "The server does not support SSL connections" ocorria porque:

1. **PostgreSQL local** não suporta SSL por padrão
2. **Railway** (produção) **exige** SSL para conexões
3. **Configuração anterior** forçava SSL em todos os ambientes

## Solução Implementada

### 1. **Detecção Automática de Ambiente**

O sistema agora detecta automaticamente se está usando:

- **Banco local** (localhost/127.0.0.1) → **SEM SSL**
- **Banco externo** (Railway/outros) → **COM SSL**

### 2. **Configuração Condicional**

#### **Desenvolvimento Local:**

```typescript
// src/database/data-source.ts e src/app.module.ts
const isLocalDatabase = !databaseUrl || databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');

// Se for local: usa configurações individuais SEM SSL
{
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // SEM ssl: { ... }
}
```

#### **Produção/Railway:**

```typescript
// Se for externo: usa DATABASE_URL COM SSL
{
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}
```

### 3. **Arquivos de Ambiente Atualizados**

#### **.env.development:**

```env
# Configurações individuais para desenvolvimento local
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=dashboard-sample
# SEM DATABASE_URL para forçar uso das configurações locais
```

#### **.env.production:**

```env
# DATABASE_URL do Railway com SSL
DATABASE_URL=postgresql://postgres:password@postgres.railway.internal:5432/railway
```

## Comandos Testados ✅

```bash
# ✅ Agora funciona sem erro SSL
npm run migration:show:dev

# ✅ Gerar migrations
npm run migration:generate:dev

# ✅ Executar migrations
npm run migration:run:dev

# ✅ Aplicação NestJS
npm run start:dev
```

## Benefícios da Solução

1. **✅ Desenvolvimento local** funciona sem SSL
2. **✅ Produção/Railway** usa SSL automaticamente
3. **✅ Mesmo código** para ambos os ambientes
4. **✅ Migrations** funcionam em dev e prod
5. **✅ Deploy Railway** sem modificações

## Como Funciona

1. **Ao carregar**, detecta se `DATABASE_URL` existe e se contém localhost
2. **Se local**: usa `DB_HOST`, `DB_PORT`, etc. **sem SSL**
3. **Se externo**: usa `DATABASE_URL` **com SSL**
4. **Tanto data-source.ts quanto app.module.ts** usam a mesma lógica
5. **Consistência garantida** entre migrations e aplicação

## Para Railway Deploy

Basta definir a variável `DATABASE_URL` no Railway que o SSL será ativado automaticamente:

```env
DATABASE_URL=postgresql://user:pass@host:port/db
```

**Nenhuma outra configuração necessária!** 🎉
