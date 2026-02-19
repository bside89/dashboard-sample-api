# Scripts de Migration

## Como usar as migrations

### 1. Gerar nova migration

```bash
# Desenvolvimento
npm run migration:generate:dev

# Produção
npm run migration:generate:prod
```

### 2. Executar migrations

```bash
# Desenvolvimento
npm run migration:run:dev

# Produção
npm run migration:run:prod
```

### 3. Reverter última migration

```bash
# Desenvolvimento
npm run migration:revert:dev

# Produção
npm run migration:revert:prod
```

### 4. Verificar status das migrations

```bash
NODE_ENV=development npm run typeorm -- migration:show -d src/database/data-source.ts
```

### 5. Marcar migration como executada (fake)

```bash
# Para marcar uma migration como já executada sem realmente executá-la
# Útil quando a tabela já existe no banco
NODE_ENV=development npm run typeorm -- query "INSERT INTO migrations (timestamp, name) VALUES (TIMESTAMP, 'MIGRATION_NAME')" -d src/database/data-source.ts
```

## Estado Atual

- ✅ **Migration inicial criada**: `CreateUserTable1708301400000`
- ✅ **Marcada como executada**: A tabela `users` já existia no banco
- ✅ **Sistema de migrations ativado**: `DB_SYNCHRONIZE=false` no `.env.development`
- ✅ **Tabela migrations criada**: Sistema TypeORM funcionando

## Próximos Passos

A partir de agora, todas as mudanças no banco de dados devem ser feitas via migrations:

1. Altere a entidade (ex: adicionar nova coluna)
2. Gere nova migration: `npm run migration:generate:dev`
3. Revise a migration gerada
4. Execute a migration: `npm run migration:run:dev`
5. Commit a migration junto com o código
