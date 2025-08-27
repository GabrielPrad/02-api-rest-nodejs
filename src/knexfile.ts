import type { Knex } from 'knex';
import path from 'path'
import { env } from './env'


// console.log(process.env);

if (!process.env.DATABASE_URL) {
  throw new Error ('Database not found')
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
},

    useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: path.resolve(__dirname, 'db', 'migrations'),
  }
  }
};

export default config;
