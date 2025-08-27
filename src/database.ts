import { knex as setupKnex } from 'knex'
import config from './knexfile'
import 'dotenv/config'

export const knexConfig = setupKnex(config.development)
