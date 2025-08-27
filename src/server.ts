import fastify from 'fastify'
import { knexConfig } from './database'
import { randomUUID } from 'crypto'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import cookie  from '@fastify/cookie'
import { app } from './app'

// Para rodar o tsx em modo watch inserir o script no package.json ->  
//  "scripts": {
//    "dev": "tsx watch src/server.ts"
//  },

//npm install tsx -D -> Serve para converter .ts para .js de forma automatizada sem "sujar as pastas" -> Recomendado apenas para Desenvolvimento, não utilizar em ambiente de produção

// Como o Node foi construído para JS é necessário instalar: npm install -D @types/node
// Sempre executar Node no arquivo .js

// Migration são controles de versão (Histórico de todas as mudanças feitas no banco de dados)

// npm run knex -- migrate:rollback -> para desfazer uma migration executada, mas apenas caso ela não tenha sido enviada para produção

//Definir porta do localhost que será 'ouvida'
app.listen({
    port: env.PORT
}).then( () => {
    console.log('HTTP Server Runnning!');
})