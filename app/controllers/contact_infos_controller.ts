import type { HttpContext } from '@adonisjs/core/http'
import ContactInfo from '#models/contact_info'
import { DateTime } from 'luxon'

export default class ContactInfoController {

    async public({ response }: HttpContext) {
        const contacts = await ContactInfo.query()
            .where('is_active', true)
            .whereNull('deleted_at')
            .orderBy('sort_order', 'asc')

        return response.ok({ data: contacts })
    }

    async index({ response }: HttpContext) {
        const contacts = await ContactInfo.query()
            .whereNull('deleted_at')
            .orderBy('sort_order', 'asc')

        return response.ok({ data: contacts })
    }

    async store({ request, response }: HttpContext) {
        const data = request.only([
            'platform',
            'label',
            'display_text',
            'url',
            'icon_key',
            'is_active',
            'sort_order',
        ])

        const contact = await ContactInfo.create({
            label: data.label,
            displayText: data.display_text,
            url: data.url,
            iconKey: data.icon_key,
            isActive: data.is_active ?? true,
            sortOrder: data.sort_order ?? 0,
        })

        return response.created({ data: contact })
    }

    async show({ params, response }: HttpContext) {
        const contact = await ContactInfo.query()
            .where('id', params.id)
            .whereNull('deleted_at')
            .firstOrFail()

        return response.ok({ data: contact })
    }

    async update({ params, request, response }: HttpContext) {
        const contact = await ContactInfo.query()
            .where('id', params.id)
            .whereNull('deleted_at')
            .firstOrFail()

        const data = request.only([
            'platform',
            'label',
            'display_text',
            'url',
            'icon_key',
            'is_active',
            'sort_order',
        ])

        contact.merge({
            label: data.label,
            displayText: data.display_text,
            url: data.url,
            iconKey: data.icon_key,
            isActive: data.is_active,
            sortOrder: data.sort_order,
        })

        await contact.save()

        return response.ok({ data: contact })
    }

    async destroy({ params, response, auth }: HttpContext) {
        const contact = await ContactInfo.query()
            .where('id', params.id)
            .whereNull('deleted_at')
            .firstOrFail()

        contact.deletedAt = DateTime.now()
        contact.deletedBy = auth.user!.id

        await contact.save()

        return response.ok({ message: 'Contact deleted' })
    }
}