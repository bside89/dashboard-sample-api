# Dashboard Sample API

Uma API RESTful construída com NestJS, PostgreSQL e Swagger para demonstração de um dashboard.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **NestJS** - Framework Node.js progressivo
- **TypeScript** - Linguagem tipada
- **PostgreSQL** - Banco de dados relacional
- **TypeORM** - ORM para TypeScript
- **Swagger** - Documentação da API
- **Docker** - Containerização

## 📋 Pré-requisitos

- Node.js (versão 18+)
- PostgreSQL (versão 15+)
- Docker e Docker Compose (para execução containerizada)
- npm ou yarn

## 🛠️ Configuração do Ambiente

### Banco de Dados Local

Certifique-se de que o PostgreSQL está instalado e rodando localmente. Crie o banco de dados:

```sql
CREATE DATABASE "dashboard-sample";
```

**Configuração padrão esperada:**

- Host: `localhost`
- Porta: `5432`
- Usuário: `postgres`
- Senha: `postgres`
- Database: `dashboard-sample`

### Variáveis de Ambiente

O projeto usa arquivos `.env` específicos para cada ambiente:

- `.env.development` - Configurações de desenvolvimento (já configurado)
- `.env.production` - Configurações de produção (a ser configurado)

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd dashboard-sample-api
```

2. Instale as dependências:

```bash
npm install
```

3. Execute as migrations do banco de dados:

```bash
npm run migration:run:dev
```

## 🎯 Execução

### Desenvolvimento Local

```bash
# Modo desenvolvimento com hot reload
npm run start:dev

# Modo debug
npm run start:debug
```

### Produção Local

```bash
# Build da aplicação
npm run build

# Execução em produção
npm run start:prod
```

### Docker

#### Desenvolvimento

```bash
# Subir toda a stack (aplicação + PostgreSQL + Adminer)
docker-compose up -d

# Verificar logs
docker-compose logs -f app
```

#### Produção

```bash
# Configurar variáveis no .env.production primeiro
# Depois executar:
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 Documentação da API

Após iniciar a aplicação, a documentação Swagger estará disponível em:

- **Desenvolvimento**: http://localhost:3000/api
- **Produção**: http://[seu-host]:3000/api

### Endpoints Disponíveis

| Método | Endpoint     | Descrição               |
| ------ | ------------ | ----------------------- |
| GET    | `/users`     | Lista todos os usuários |
| GET    | `/users/:id` | Busca usuário por ID    |
| POST   | `/users`     | Cria novo usuário       |
| PATCH  | `/users/:id` | Atualiza usuário        |
| DELETE | `/users/:id` | Remove usuário          |

### Exemplo de Payload (POST /users)

```json
{
  "name": "João Silva",
  "birthdate": "1990-01-01",
  "role": "user",
  "document_number": "12345678901"
}
```

## 🗃️ Modelo de Dados

### Entidade User

| Campo             | Tipo     | Descrição                     |
| ----------------- | -------- | ----------------------------- |
| `id`              | number   | ID único (auto-increment)     |
| `name`            | string   | Nome do usuário (obrigatório) |
| `birthdate`       | date     | Data de nascimento            |
| `created_at`      | datetime | Data de criação               |
| `updated_at`      | datetime | Data de atualização           |
| `role`            | string   | Função (padrão: "user")       |
| `document_number` | string   | CPF/CNPJ (único, obrigatório) |

## 🛢️ Migrations de Banco de Dados

### Desenvolvimento

```bash
# Gerar migration
npm run migration:generate:dev

# Executar migrations
npm run migration:run:dev

# Reverter última migration
npm run migration:revert:dev
```

### Produção

```bash
# Gerar migration
npm run migration:generate:prod

# Executar migrations
npm run migration:run:prod

# Reverter última migration
npm run migration:revert:prod
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Testes com coverage
npm run test:cov

# Testes e2e
npm run test:e2e
```

## 📋 Scripts Disponíveis

| Script                       | Descrição                      |
| ---------------------------- | ------------------------------ |
| `npm run start:dev`          | Desenvolvimento com hot reload |
| `npm run start:prod`         | Produção                       |
| `npm run start:staging`      | Homologação                    |
| `npm run build`              | Build da aplicação             |
| `npm run migration:run:dev`  | Executar migrations (dev)      |
| `npm run migration:run:prod` | Executar migrations (prod)     |
| `npm run lint`               | Verificar código com ESLint    |
| `npm run format`             | Formatar código com Prettier   |

## 🐳 Docker

### Desenvolvimento com Docker

O arquivo `docker-compose.yml` inclui:

- **app**: Aplicação NestJS
- **postgres**: Banco PostgreSQL
- **adminer**: Interface web para PostgreSQL (http://localhost:8080)

### Produção com Docker

Use o arquivo `docker-compose.prod.yml` para ambiente de produção.

## 🔧 Estrutura do Projeto

```
src/
├── database/           # Configurações do banco
│   ├── data-source.ts  # DataSource do TypeORM
│   └── migrations/     # Migrations
├── users/              # Módulo de usuários
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Entidades do banco
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── app.module.ts       # Módulo principal
└── main.ts             # Ponto de entrada
```

## 🔒 Segurança

- Validação de entrada com class-validator
- CORS habilitado
- Pipes de validação globais
- Sanitização de dados

## 🚀 Deploy

### Preparação para Produção

1. Configure as variáveis no `.env.production`
2. Execute o build: `npm run build`
3. Execute as migrations: `npm run migration:run:prod`
4. Inicie a aplicação: `npm run start:prod`

### Deploy com Docker

1. Configure `.env.production`
2. Execute: `docker-compose -f docker-compose.prod.yml up -d`

## 📄 Licença

Este projeto está sob a licença ISC.

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, abra uma issue no repositório do projeto.
