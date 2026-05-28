import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blogs'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('category').nullable().defaultTo(null)
      table.specificType('tags', 'text[]').nullable().defaultTo(null)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('category')
      table.dropColumn('tags')
    })
  }
}