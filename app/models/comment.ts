import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Blog from '#models/blog'

export default class Comment extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare blogId: number

    @column()
    declare userId: number | null

    @column()
    declare guestName: string | null

    @column()
    declare guestEmail: string | null

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

    @belongsTo(() => Blog)
    declare blog: BelongsTo<typeof Blog>
}