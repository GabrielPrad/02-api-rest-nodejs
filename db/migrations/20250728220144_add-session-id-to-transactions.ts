import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.uuid('session_id').after('id').index() // Indice é uma forma de dizer ao DB que teram muitas buscas utilizando X parametro no Where
  })
}


export async function down(knex: Knex): Promise<void> {
   await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })
}

