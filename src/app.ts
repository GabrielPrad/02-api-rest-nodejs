import fastify from 'fastify'
import { knexConfig } from './database'
import { randomUUID } from 'crypto'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import cookie  from '@fastify/cookie'

export const app = fastify()

// Cadastro módulo de cookies
app.register(cookie)
app.register(transactionsRoutes, {
    prefix: 'transaction'
})