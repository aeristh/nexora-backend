import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Comment extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare blogId: number

    @column()
    declare userId: number

    @column()
    declare content: string

    @column()
    declare status: 'pending' | 'approved' | 'hidden'

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @column.dateTime()
    declare deletedAt: DateTime | null

    @column()
    declare deletedBy: number | null
}