import type { HttpContext } from '@adonisjs/core/http'
import Blog from '#models/blog'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'
import { DateTime } from 'luxon'

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}

export default class BlogsController {

    async public({ request, response }: HttpContext) {
        const page = Number(request.qs().page) || 1
        const limit = Number(request.qs().limit) || 3
        const search = request.qs().search as string | undefined
        const category = request.qs().category as string | undefined
        const tag = request.qs().tag as string | undefined

        const query = Blog.query()
            .whereNull('deletedAt')
            .preload('author')
            .orderBy('createdAt', 'desc')

        if (search) {
            query.where('title', 'ilike', `%${search}%`)
        }
        if (category) {
            query.where('category', category)
        }
        if (tag) {
            query.whereRaw('? = ANY(tags)', [tag])
        }

        const blogs = await query.paginate(page, limit)
        const result = blogs.toJSON()

        return response.ok({
            data: result.data.map((b: any) => ({
                id: b.id,
                title: b.title,
                slug: b.slug,
                content: b.content,
                coverImage: b.coverImage,
                authorName: b.author.fullName,
                authorId: b.authorId,
                category: b.category,
                tags: b.tags,
                createdAt: b.createdAt,
                updatedAt: b.updatedAt,
            })),
            meta: result.meta,
        })
    }

    async index({ request, response, auth }: HttpContext) {
        const page = Number(request.qs().page) || 1
        const limit = Number(request.qs().limit) || 6
        const user = auth.user!

        const query = Blog.query()
            .whereNull('deletedAt')
            .preload('author')
            .orderBy('createdAt', 'desc')

        if (user.role !== 'admin') {
            query.where('authorId', user.id)
        }

        const blogs = await query.paginate(page, limit)
        const result = blogs.toJSON()

        return response.ok({
            data: result.data.map((b: any) => ({
                id: b.id,
                title: b.title,
                content: b.content,
                coverImage: b.coverImage,
                authorName: b.author.fullName,
                authorId: b.authorId,
                createdAt: b.createdAt,
                updatedAt: b.updatedAt,
            })),
            meta: result.meta,
        })
    }

    async trashed({ response, auth }: HttpContext) {
        const user = auth.user!
        if (user.role !== 'admin') {
            return response.forbidden({ message: 'Hanya admin.' })
        }

        const blogs = await Blog.query()
            .whereNotNull('deletedAt')
            .preload('author')
            .orderBy('deletedAt', 'desc')

        const User = (await import('#models/user')).default
        const userIds = [...new Set(blogs.map(b => b.deletedBy).filter(Boolean))] as number[]
        const users = await User.findMany(userIds)
        const userMap = Object.fromEntries(users.map(u => [u.id, u.fullName]))

        return response.ok({
            data: blogs.map(b => ({
                id: b.id,
                title: b.title,
                content: b.content,
                coverImage: b.coverImage,
                authorName: b.author.fullName,
                authorId: b.authorId,
                deletedAt: b.deletedAt,
                deletedBy: b.deletedBy,
                deletedByName: b.deletedBy ? userMap[b.deletedBy] ?? null : null,
            }))
        })
    }

    async show({ params, response }: HttpContext) {
        const blog = await Blog.query()
            .where('id', params.id)
            .whereNull('deletedAt')
            .preload('author')
            .firstOrFail()

        return response.ok({
            data: {
                id: blog.id,
                title: blog.title,
                content: blog.content,
                coverImage: blog.coverImage,
                authorName: blog.author.fullName,
                authorId: blog.authorId,
                category: blog.category,
                tags: blog.tags,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt,
            }
        })
    }

    async store({ request, auth, response }: HttpContext) {
        const user = auth.user!
        const title = request.input('title')
        const content = request.input('content')

        if (!title || !content) {
            return response.badRequest({ message: 'Title dan content wajib diisi.' })
        }

        let slug = generateSlug(title)
        const existing = await Blog.findBy('slug', slug)
        if (existing) {
            slug = `${slug}-${Date.now()}`
        }

        let coverImage: string | null = null
        const coverFile = request.file('coverImage', {
            extnames: ['jpg', 'jpeg', 'png', 'webp'],
            size: '5mb',
        })
        if (coverFile && coverFile.isValid) {
            const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${coverFile.extname}`
            await coverFile.move(app.publicPath('uploads/blogs'), { name: filename })
            coverImage = `/uploads/blogs/${filename}`
        }

        const category = request.input('category') || null

        const rawTags = request.input('tags')
        let tags: string[] | null = null
        if (rawTags) {
            try {
                tags = typeof rawTags === 'string' ? JSON.parse(rawTags) : rawTags
            } catch {
                tags = null
            }
        }

        const blog = await Blog.create({
            title,
            slug,
            content,
            coverImage,
            authorId: user.id,
            category,
            tags,
        })

        return response.created({ data: blog })
    }

    async showBySlug({ params, response }: HttpContext) {
        const blog = await Blog.query()
            .where('slug', params.slug)
            .whereNull('deletedAt')
            .preload('author')
            .firstOrFail()

        return response.ok({
            data: {
                id: blog.id,
                title: blog.title,
                slug: blog.slug,
                content: blog.content,
                coverImage: blog.coverImage,
                authorName: blog.author.fullName,
                authorId: blog.authorId,
                category: blog.category,
                tags: blog.tags,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt,
            }
        })
    }

    async update({ params, request, auth, response }: HttpContext) {
        const user = auth.user!
        const blog = await Blog.findOrFail(params.id)

        if (blog.authorId !== user.id && user.role !== 'admin') {
            return response.forbidden({ message: 'Tidak diizinkan.' })
        }

        blog.title = request.input('title', blog.title)
        blog.content = request.input('content', blog.content)

        const newCategory = request.input('category')
        blog.category = newCategory !== undefined ? (newCategory || null) : blog.category

        const rawTags = request.input('tags')
        if (rawTags !== undefined && rawTags !== null) {
            try {
                blog.tags = typeof rawTags === 'string' ? JSON.parse(rawTags) : rawTags
            } catch {
            }
        }

        const coverFile = request.file('coverImage', {
            extnames: ['jpg', 'jpeg', 'png', 'webp'],
            size: '5mb',
        })
        if (coverFile && coverFile.isValid) {
            if (blog.coverImage) {
                const oldPath = app.publicPath(blog.coverImage)
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
            }
            const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${coverFile.extname}`
            await coverFile.move(app.publicPath('uploads/blogs'), { name: filename })
            blog.coverImage = `/uploads/blogs/${filename}`
        }

        await blog.save()
        return response.ok({ data: blog })
    }

    async destroy({ params, auth, response }: HttpContext) {
        const user = auth.user!
        const blog = await Blog.findOrFail(params.id)

        if (blog.authorId !== user.id && user.role !== 'admin') {
            return response.forbidden({ message: 'Tidak diizinkan.' })
        }

        blog.deletedAt = DateTime.now()
        blog.deletedBy = user.id
        await blog.save()

        return response.ok({ message: 'Artikel berhasil dihapus.' })
    }

    async restore({ params, auth, response }: HttpContext) {
        const user = auth.user!
        if (user.role !== 'admin') {
            return response.forbidden({ message: 'Hanya admin.' })
        }

        const blog = await Blog.findOrFail(params.id)
        blog.deletedAt = null
        blog.deletedBy = null
        await blog.save()

        return response.ok({ message: 'Artikel berhasil dipulihkan.' })
    }
}
