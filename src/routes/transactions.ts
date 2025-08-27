import { randomUUID } from "crypto"
import type { FastifyInstance } from "fastify"
import knex from "knex"
import { z } from 'zod'
import { knexConfig } from '../database'
import { checkSessionIdExists } from "../middlewares/check-session-id-exists"


export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/',
  {
    preHandler: [checkSessionIdExists]
  }, async (request, reply) => {
    const { session_id } = request.cookies

    const transactions = await knexConfig('transactions')
      .where('session_id', session_id)
      .select()

      return transactions
  })

  app.get('/summary',
      {
    preHandler: [checkSessionIdExists]
  }, async (request) => {
    const { session_id } = request.cookies

    const summary = await knex('transactions')
    .sum('amount', { as: 'amount' })
    .first()

    return { summary }
  })

  // Rota para buscar uma transação específica pelo ID
  app.get('/:id',
          {
    preHandler: [checkSessionIdExists]
  }, async (request) => {
    const { session_id } = request.cookies

    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(), 
    });

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where({ id: id,
       session_id: session_id
     }).first()
  })
  

  app.post('/', async (request, reply) => {

    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    });

    console.log(request.body);
    

    // Validando dados do request body para ver se batem com o que foi definido no schema
     const { title, amount, type } = createTransactionBodySchema.parse(request.body);
    // Se a validação de dados da linha acima não obter sucesso nada abaixo dela será executado

    // Procurando dentro dos cookies se já existe uma session ID
    let session_id = request.cookies.sessionId

    if (!session_id) {
      session_id = randomUUID()

      reply.cookie('session_id', session_id, {
        path: '/',
        maxAge:  60 * 60 * 24 * 7 // 7 days
      })

    }

    // Criando transação
await knexConfig('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: session_id
    });

    return reply.status(201).send();
  });
}