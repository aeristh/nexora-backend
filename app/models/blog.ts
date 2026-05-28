import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Blog extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare slug: string | null

    @column()
    declare category: string | null

    @column()
    declare tags: string[] | null

    @column()
    declare content: string

    @column()
    declare coverImage: string | null

    @column()
    declare authorId: number

    @column()
    declare deletedBy: number | null

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @column.dateTime()
    declare deletedAt: DateTime | null

    @belongsTo(() => User, { foreignKey: 'authorId' })
    declare author: BelongsTo<typeof User>

    @belongsTo(() => User, { foreignKey: 'deletedBy' })
    declare deletedByUser: BelongsTo<typeof User>
}