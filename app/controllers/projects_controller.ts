import Project from '#models/project'
import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

export default class ProjectsController {

    async indexPublic({ response }: HttpContext) {
        const projects = await Project.query()
            .whereNull('deleted_at')
            .orderBy('created_at', 'desc')
        return response.ok({ data: projects })
    }

    async showBySlug({ params, response }: HttpContext) {
        const project = await Project.query()
            .whereNull('deleted_at')
            .where('slug', params.slug)
            .firstOrFail()
        return response.ok({ data: project })
    }

    async index({ response }: HttpContext) {
        const projects = await Project.query()
            .whereNull('deleted_at')
            .orderBy('created_at', 'desc')
        return response.ok({ data: projects })
    }

    async store({ request, response }: HttpContext) {
        const { title, category, description, content } = request.only([
            'title', 'category', 'description', 'content'
        ])

        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()

        const existing = await Project.findBy('slug', slug)
        const finalSlug = existing ? `${slug}-${Date.now()}` : slug

        let imagePath: string | null = null
        const image = request.file('image', {
            extnames: ['jpg', 'jpeg', 'png', 'webp'],
            size: '5mb',
        })

        if (image) {
            const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects')
            if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })
            const fileName = `${Date.now()}.${image.extname}`
            await image.move(uploadDir, { name: fileName })
            imagePath = `/uploads/projects/${fileName}`
        }

        const project = await Project.create({
            title,
            slug: finalSlug,
            category,
            description: description || null,
            content: content || null,
            imagePath,
        })

        return response.created({ data: project })
    }

    async update({ params, request, response }: HttpContext) {
        const project = await Project.findOrFail(params.id)

        const { title, category, description, content } = request.only([
            'title', 'category', 'description', 'content'
        ])

        let imagePath = project.imagePath
        const image = request.file('image', {
            extnames: ['jpg', 'jpeg', 'png', 'webp'],
            size: '5mb',
        })

        if (image) {
            const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects')
            if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })
            const fileName = `${Date.now()}.${image.extname}`
            await image.move(uploadDir, { name: fileName })
            imagePath = `/uploads/projects/${fileName}`
        }

        project.merge({
            title,
            category,
            description: description || null,
            content: content || null,
            imagePath,
        })
        await project.save()

        return response.ok({ data: project })
    }

    async destroy({ params, auth, response }: HttpContext) {
        const project = await Project.findOrFail(params.id)

        if (project.deletedAt) {
            return response.badRequest({ message: 'Project already deleted' })
        }

        project.deletedAt = DateTime.now()
        project.deletedBy = auth.user!.id
        await project.save()

        return response.ok({ message: 'Project deleted successfully' })
    }

    async trashed({ response }: HttpContext) {
        const projects = await Project.query()
            .whereNotNull('deleted_at')
            .preload('deletedByUser')
            .orderBy('deleted_at', 'desc')
        return response.ok({ data: projects })
    }

    async restore({ params, response }: HttpContext) {
        const project = await Project.query()
            .whereNotNull('deleted_at')
            .where('id', params.id)
            .firstOrFail()

        project.deletedAt = null
        project.deletedBy = null
        await project.save()

        return response.ok({ message: 'Project restored successfully' })
    }
}