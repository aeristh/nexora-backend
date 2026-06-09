import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ContactInfo extends BaseModel {
    public static table = 'contact_infos'

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare label: string

    @column()
    declare displayText: string

    @column()
    declare url: string

    @column()
    declare iconKey: string

    @column()
    declare isActive: boolean

    @column()
    declare sortOrder: number

    @column.dateTime()
    declare deletedAt: DateTime | null

    @column()
    declare deletedBy: number | null

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}