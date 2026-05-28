import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Gallery extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare description: string | null

    @column()
    declare imagePath: string

    @column()
    declare imageName: string

    @column()
    declare width: number | null

    @column()
    declare height: number | null

    @column()
    declare uploadedBy: number

    @column()
    declare updatedBy: number | null

    @column.dateTime()
    declare deletedAt: DateTime | null

    @column()
    declare deletedBy: number | null

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => User, { foreignKey: 'uploadedBy' })
    declare uploader: BelongsTo<typeof User>

    @belongsTo(() => User, { foreignKey: 'deletedBy' })
    declare deletedByUser: BelongsTo<typeof User>
}