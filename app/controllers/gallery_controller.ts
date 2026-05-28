import type { HttpContext } from '@adonisjs/core/http'
import Gallery from '#models/gallery'
import { DateTime } from 'luxon'
import app from '@adonisjs/core/services/app'
import { randomUUID } from 'node:crypto'

export default class GalleryController {

    async index({ response }: HttpContext) {
        const galleries = await Gallery.query()
            .whereNull('deleted_at')
            .preload('uploader')
            .orderBy('created_at', 'desc')

        return response.ok({ data: galleries })
    }

    async store({ request, auth, response }: HttpContext) {
        const image = request.file('image', {
            size: '5mb',
            extnames: ['jpg', 'jpeg', 'png', 'webp'],
        })

        if (!image) {
            return response.badRequest({ message: 'Image is required' })
        }

        if (!image.isValid) {
            return response.badRequest({ message: image.errors })
        }

        const title = request.input('title')
        const description = request.input('description')
        const width = request.input('width')
        const height = request.input('height')

        if (!title) {
            return response.badRequest({ message: 'Title is required' })
        }

        const fileName = `${randomUUID()}.${image.extname}`

        await image.move(app.publicPath('uploads'), {
            name: fileName,
        })

        const gallery = await Gallery.create({
            title,
            description,
            imagePath: `/uploads/${fileName}`,
            imageName: image.clientName,
            width: width ? parseInt(width) : null,
            height: height ? parseInt(height) : null,
            uploadedBy: auth.user!.id,
        })

        return response.created({ data: gallery, message: 'Image uploaded successfully' })
    }

    async update({ params, request, auth, response }: HttpContext) {
        const gallery = await Gallery.query()
            .whereNull('deleted_at')
            .where('id', params.id)
            .firstOrFail()

        const title = request.input('title')
        const description = request.input('description')
        const width = request.input('width')
        const height = request.input('height')

        const newImage = request.file('image', {
            size: '5mb',
            extnames: ['jpg', 'jpeg', 'png', 'webp'],
        })

        if (newImage) {
            if (!newImage.isValid) {
                return response.badRequest({ message: newImage.errors })
            }

            const fileName = `${randomUUID()}.${newImage.extname}`
            await newImage.move(app.publicPath('uploads'), {
                name: fileName,
            })

            gallery.imagePath = `/uploads/${fileName}`
            gallery.imageName = newImage.clientName
        }

        gallery.title = title || gallery.title
        gallery.description = description !== undefined ? description : gallery.description
        gallery.width = width ? parseInt(width) : gallery.width
        gallery.height = height ? parseInt(height) : gallery.height
        gallery.updatedBy = auth.user!.id

        await gallery.save()

        return response.ok({ data: gallery, message: 'Gallery updated successfully' })
    }

    async destroy({ params, auth, response }: HttpContext) {
        const gallery = await Gallery.query()
            .whereNull('deleted_at')
            .where('id', params.id)
            .firstOrFail()

        gallery.deletedAt = DateTime.now()
        gallery.deletedBy = auth.user!.id
        await gallery.save()

        return response.ok({ message: 'Image deleted successfully' })
    }

    async trashed({ response }: HttpContext) {
        const galleries = await Gallery.query()
            .whereNotNull('deleted_at')
            .preload('uploader')
            .preload('deletedByUser')
            .orderBy('deleted_at', 'desc')

        return response.ok({ data: galleries })
    }

    async restore({ params, response }: HttpContext) {
        const gallery = await Gallery.query()
            .whereNotNull('deleted_at')
            .where('id', params.id)
            .firstOrFail()

        gallery.deletedAt = null
        gallery.deletedBy = null
        await gallery.save()

        return response.ok({ message: 'Image restored successfully' })
    }

    async indexPublic({ response }: HttpContext) {
        const galleries = await Gallery.query()
            .whereNull('deleted_at')
            .orderBy('created_at', 'desc')
        return response.ok({ data: galleries })
    }
}