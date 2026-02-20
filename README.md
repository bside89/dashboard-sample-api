# Dashboard Sample API

API RESTful desenvolvida com NestJS para servir como exemplo de dashboard com CRUD completo para usuários.

## 🚀 Tecnologias

- **NestJS** v11+ - Framework progressivo do Node.js
- **TypeScript** - Linguagem tipada
- **PostgreSQL** - Banco de dados
- **TypeORM** - ORM para TypeScript/JavaScript
- **Docker** - Containerização
- **Swagger/OpenAPI** - Documentação da API
- **Railway** - Plataforma de deploy

## 📦 Recursos

### Usuários (CRUD Completo)

- ✅ Criar usuário (`POST /users`)
- ✅ Listar usuários (`GET /users`)
- ✅ Buscar usuário por ID (`GET /users/:id`)
- ✅ Atualizar usuário (`PUT /users/:id`)
- ✅ Deletar usuário (`DELETE /users/:id`)

### Migrations

- ✅ Sistema de migrations automático
- ✅ Migrations condicionais (desenvolvimento vs produção)
- ✅ Rollback de migrations

## 🏗️ Estrutura do Projeto

```
src/
├── database/           # Configuração do banco e migrations
│   ├── data-source.ts
│   └── migrations/
├── users/              # Módulo de usuários
│   ├── dto/           # Data Transfer Objects
│   ├── entities/      # Entidades do banco
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── app.module.ts      # Módulo principal
└── main.ts           # Ponto de entrada
```

## 🛠️ Configuração Local

### Pré-requisitos

- Node.js 18+
- PostgreSQL
- Docker (opcional)

### 1. Instalação

```bash
npm install
```

### 2. Configuração do Banco (Desenvolvimento)

```bash
# PostgreSQL local (sem SSL)
DATABASE_URL=postgresql://usuario:senha@localhost:5432/dashboard_db
PORT=3000
NODE_ENV=development
```

### 3. Executar Migrations

```bash
npm run migration:run:dev
```

### 4. Iniciar Aplicação

```bash
# Desenvolvimento (com watch)
npm run start:dev

# Produção
npm run start:prod
```

## 🐳 Docker

### Desenvolvimento com Hot Reload

```bash
# Iniciar banco + aplicação
docker-compose up

# Aplicação disponível em: http://localhost:3000
```

### Build de Produção

```bash
# Build da imagem
docker build --target production -t dashboard-api .

# Executar
docker run -p 3000:3000 --env-file .env dashboard-api
```

## ☁️ Deploy no Railway

### 1. Preparação

O projeto está configurado para deploy automático no Railway com:

- ✅ Detecção automática de SSL/ambiente
- ✅ Migrations automáticas na inicialização
- ✅ Configuração de produção otimizada

### 2. Variáveis de Ambiente (Railway)

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://usuario:senha@host:porta/db?sslmode=require
```

### 3. Scripts de Deploy

- **Build**: `npm run build`
- **Start**: `node railway-start.js` (executa migrations + inicia app)

### 4. Processo de Deploy

1. Railway detecta o projeto NestJS
2. Executa `npm install` + `npm run build`
3. Inicia com `node railway-start.js`:
   - Aguarda banco estar pronto
   - Executa migrations em produção
   - Inicia aplicação

## 📖 Documentação da API

### Swagger UI

Após iniciar a aplicação, acesse:

- **Local**: http://localhost:3000/api
- **Railway**: https://seu-app.railway.app/api

### Endpoints Principais

#### Usuários

```bash
# Criar usuário
POST /users
{
  "name": "João Silva",
  "birthdate": "1990-05-15",
  "role": "admin",
  "document_number": "12345678901"
}

# Listar usuários
GET /users

# Buscar por ID
GET /users/1

# Atualizar usuário
PUT /users/1
{
  "name": "João Santos",
  "role": "user"
}

# Deletar usuário
DELETE /users/1
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia com hot reload
npm run start:debug        # Inicia em modo debug

# Produção
npm run build              # Build do TypeScript
npm run start:prod         # Inicia aplicação compilada

# Migrations
npm run migration:generate:dev   # Gera migration (dev)
npm run migration:run:dev        # Executa migrations (dev)
npm run migration:run:prod       # Executa migrations (prod)
npm run migration:revert:dev     # Reverte última migration (dev)
npm run migration:show:dev       # Mostra migrations pendentes

# Testes
npm run test               # Executa testes
npm run test:watch         # Testes em modo watch
npm run test:cov           # Testes com coverage

# Linting
npm run lint               # Verifica código
npm run format             # Formata código
```

## 🔒 Configuração de SSL

O projeto detecta automaticamente o ambiente e configura SSL:

- **Desenvolvimento**: SSL desabilitado
- **Produção/Railway**: SSL obrigatório
- **Staging**: SSL opcional

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de conexão SSL**

   ```bash
   # Verifique se NODE_ENV está correto
   echo $NODE_ENV

   # Para desenvolvimento local, use:
   NODE_ENV=development
   ```

2. **Migrations não executam**

   ```bash
   # Verifique se o build está atualizado
   npm run build

   # Execute migrations manualmente
   npm run migration:run:prod
   ```

3. **Railway deploy falha**
   ```bash
   # Verifique logs do Railway
   # Certifique-se que DATABASE_URL está configurado
   # Aguarde alguns segundos para o banco estar pronto
   ```

## 📄 Licença

ISC License
