import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'galleries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description').nullable()
      table.string('image_path').notNullable()  // path file gambar
      table.string('image_name').notNullable()  // nama file asli
      table.integer('width').nullable()          // lebar gambar (px)
      table.integer('height').nullable()         // tinggi gambar (px)
      table.integer('uploaded_by').unsigned().notNullable()
        .references('id').inTable('users')
      table.integer('updated_by').unsigned().nullable()
        .references('id').inTable('users')
      table.timestamp('deleted_at').nullable()
      table.integer('deleted_by').unsigned().nullable()
        .references('id').inTable('users')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}