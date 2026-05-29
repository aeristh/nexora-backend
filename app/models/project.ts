import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Project extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare slug: string

    @column()
    declare category: string

    @column()
    declare description: string | null

    @column()
    declare content: string | null

    @column()
    declare imagePath: string | null

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @column.dateTime()
    declare deletedAt: DateTime | null

    @column()
    declare deletedBy: number | null

    @belongsTo(() => User, { foreignKey: 'deletedBy' })
    declare deletedByUser: BelongsTo<typeof User>
}