import type { Knex } from 'knex';
import path from 'path'
import { env } from './env'


// console.log(process.env);

if (!process.env.DATABASE_URL) {
  throw new Error ('Database not found')
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: env.DATABASE_CLIENT,
  connection: env.DATABASE_CLIENT === 'sqlite' 
  ? {
    filename: env.DATABASE_URL
  }
    : env.DATABASE_URL, // Se receber sqlite envia filename, se for pg envia env.DATABASE_URL
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: path.resolve(__dirname, 'db', 'migrations'),
  }
  }
};

export default config;
