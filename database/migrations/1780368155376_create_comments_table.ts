import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('blog_id').unsigned().notNullable()
      table.integer('user_id').unsigned().notNullable()
      table.text('content').notNullable()
      table.enum('status', ['pending', 'approved', 'hidden']).defaultTo('pending')
      table.timestamps(true, true)
      table.timestamp('deleted_at').nullable()
      table.integer('deleted_by').unsigned().nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}