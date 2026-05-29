import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.string('tag').notNullable()
      table.text('description').nullable()
      table.text('content').nullable()
      table.string('image_path').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.timestamp('deleted_at').nullable()
      table.integer('deleted_by').unsigned().references('id').inTable('users').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}