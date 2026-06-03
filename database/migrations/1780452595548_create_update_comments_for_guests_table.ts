import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().nullable().alter()
      table.string('guest_name').nullable()
      table.string('guest_email').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().notNullable().alter()
      table.dropColumn('guest_name')
      table.dropColumn('guest_email')
    })
  }
}