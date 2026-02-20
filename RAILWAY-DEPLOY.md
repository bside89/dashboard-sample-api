# 🚀 Railway Deploy - Migrations Guide

## 💥 Problema Atual

Aplicação deployada no Railway mas **migrations não executam** automaticamente, causando erros de banco ao fazer requests.

## ✅ Soluções Implementadas

### 1. **Scripts de Migration Automática**

Adicionados scripts para executar migrations automaticamente:

```json
{
  "scripts": {
    "postbuild": "npm run migrate:prod", // Executa após build
    "migrate:prod": "NODE_ENV=production npm run typeorm -- migration:run -d dist/database/data-source.js",
    "railway:start": "node railway-start.js", // Script completo Railway
    "deploy": "npm run build && npm run migrate:prod && npm run start:prod"
  }
}
```

### 2. **Script de Inicialização Railway**

Criado `railway-start.js` que:

- ✅ Executa migrations automaticamente
- ✅ Inicia aplicação após sucesso
- ✅ Para deploy se migrations falharem

## 🛠️ Como Resolver no Railway

### **Opção 1: Comando de Start Personalizado**

No Railway, configure o comando de start:

```bash
# Vá em: Settings > Deploy > Start Command
npm run railway:start
```

### **Opção 2: Executar Migrations Manualmente (Uma Vez)**

```bash
# No terminal do Railway ou localmente com ENV de produção:
NODE_ENV=production npm run migrate:prod
```

### **Opção 3: Redeploy com Scripts Automáticos**

Com os scripts atualizados, faça novo deploy:

```bash
git add .
git commit -m "Add Railway auto-migration scripts"
git push
```

## 📋 **Configurações Railway Necessárias**

### **1. Variáveis de Ambiente**

Certifique-se que estão configuradas:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db  # Fornecido pelo Railway
```

### **2. Start Command**

```bash
npm run railway:start
```

### **3. Build Command** (Padrão)

```bash
npm run build
```

## 🔍 **Debugging**

### **Ver Status das Migrations**

```bash
# Localmente (conectando ao Railway):
NODE_ENV=production npm run migration:show:prod
```

### **Verificar Logs Railway**

- Acesse Railway Dashboard
- Vá em "Deployments"
- Clique no último deploy
- Verifique logs de build e runtime

### **Testar Localmente**

```bash
# Simular ambiente Railway:
npm run build
npm run railway:start
```

## ⚡ **Solução Imediata**

1. **Configure Start Command no Railway**:

   ```bash
   npm run railway:start
   ```

2. **Ou execute migration manual primeira vez**:

   ```bash
   NODE_ENV=production npm run migrate:prod
   ```

3. **Redeploy da aplicação**

## 📁 **Arquivos Criados**

- ✅ `railway-start.js` - Script de inicialização completo
- ✅ `railway-start.sh` - Versão bash (backup)
- ✅ Scripts npm atualizados no `package.json`

## 🎯 **Resultado Esperado**

Após configuração:

1. **✅ Build** no Railway
2. **✅ Migrations** executam automaticamente
3. **✅ Aplicação** inicia sem erros
4. **✅ Banco** criado e populado
5. **✅ API** funcionando perfeitamente

---

**💡 Próximo Passo**: Configure o "Start Command" no Railway para `npm run railway:start` e faça redeploy!
