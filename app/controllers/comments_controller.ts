import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class CommentController {

    async index({ params, response }: HttpContext) {
        const comments = await Comment.query()
            .where('blog_id', params.blogId)
            .whereIn('status', ['approved', 'hidden'])
            .whereNull('deleted_at')
            .orderBy('created_at', 'asc')

        const result = await Promise.all(
            comments.map(async (c) => {
                const user = await User.find(c.userId)
                return {
                    id: c.id,
                    content: c.content,
                    status: c.status,
                    userName: user?.fullName ?? 'Pengguna',
                    createdAt: c.createdAt,
                }
            })
        )

        return response.ok(result)
    }

    async store({ params, request, auth, response }: HttpContext) {
        const user = auth.user!
        const { content } = request.only(['content'])

        if (!content || content.trim().length < 3) {
            return response.badRequest({ message: 'Komentar terlalu pendek.' })
        }

        const comment = await Comment.create({
            blogId: params.blogId,
            userId: user.id,
            content: content.trim(),
            status: 'hidden',
        })

        return response.created({
            message: 'Komentar terkirim, menunggu persetujuan.',
            comment,
        })
    }

    async updateStatus({ params, request, response }: HttpContext) {
        const comment = await Comment.find(params.id)
        if (!comment) return response.notFound({ message: 'Komentar tidak ditemukan.' })

        const { status } = request.only(['status'])
        if (!['approved', 'hidden', 'pending'].includes(status)) {
            return response.badRequest({ message: 'Status tidak valid.' })
        }

        comment.status = status
        await comment.save()

        return response.ok({ message: 'Status diperbarui.', comment })
    }

    async destroy({ params, auth, response }: HttpContext) {
        const comment = await Comment.query()
            .where('id', params.id)
            .whereNull('deleted_at')
            .first()

        if (!comment) return response.notFound({ message: 'Komentar tidak ditemukan.' })

        comment.deletedAt = DateTime.now()
        comment.deletedBy = auth.user!.id
        await comment.save()

        return response.ok({ message: 'Komentar dihapus.' })
    }

    async adminIndex({ response }: HttpContext) {
        const comments = await Comment.query()
            .whereNull('deleted_at')
            .orderBy('created_at', 'desc')

        const result = await Promise.all(
            comments.map(async (c) => {
                const user = await User.find(c.userId)
                return {
                    id: c.id,
                    blogId: c.blogId,
                    content: c.content,
                    status: c.status,
                    userName: user?.fullName ?? 'Pengguna',
                    createdAt: c.createdAt,
                }
            })
        )

        return response.ok(result)
    }

    async deletedIndex({ response }: HttpContext) {
        const comments = await Comment.query()
            .whereNotNull('deleted_at')
            .orderBy('deleted_at', 'desc')

        const result = await Promise.all(
            comments.map(async (c) => {
                const user = await User.find(c.userId)
                const deletedByUser = await User.find(c.deletedBy)
                return {
                    id: c.id,
                    blogId: c.blogId,
                    content: c.content,
                    status: c.status,
                    userName: user?.fullName ?? 'Pengguna',
                    createdAt: c.createdAt,
                    deletedAt: c.deletedAt,
                    deletedBy: deletedByUser?.fullName ?? 'Unknown',
                }
            })
        )

        return response.ok(result)
    }
}