import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class CommentsController {

    private async getDisplayName(c: Comment): Promise<string> {
        if (c.userId) {
            const user = await User.find(c.userId)
            return user?.fullName ?? 'Pengguna'
        }
        return c.guestName ?? 'Tamu'
    }

    async index({ params, response }: HttpContext) {
        const comments = await Comment.query()
            .where('blog_id', params.blogId)
            .whereIn('status', ['approved', 'hidden'])
            .whereNull('deleted_at')
            .orderBy('created_at', 'asc')

        const result = await Promise.all(
            comments.map(async (c) => ({
                id: c.id,
                content: c.content,
                status: c.status,
                userName: await this.getDisplayName(c),
                createdAt: c.createdAt,
            }))
        )

        return response.ok(result)
    }

    async store({ params, request, auth, response }: HttpContext) {
        const { content, guestName, guestEmail } = request.only([
            'content', 'guestName', 'guestEmail'
        ])

        if (!content || content.trim().length < 3) {
            return response.badRequest({ message: 'Komentar terlalu pendek.' })
        }

        let userId: number | null = null
        let resolvedGuestName: string | null = null
        let resolvedGuestEmail: string | null = null

        try {
            await auth.authenticate()
            userId = auth.user!.id
        } catch {
            if (!guestName || !guestEmail) {
                return response.badRequest({
                    message: 'Nama dan email wajib diisi untuk komentar tanpa login.'
                })
            }
            const existingUser = await User.findBy('email', guestEmail)
            if (existingUser) {
                userId = existingUser.id
            } else {
                resolvedGuestName = guestName.trim()
                resolvedGuestEmail = guestEmail.trim()
            }
        }

        const comment = await Comment.create({
            blogId: params.blogId,
            userId,
            guestName: resolvedGuestName,
            guestEmail: resolvedGuestEmail,
            content: content.trim(),
            status: 'hidden',
        })

        return response.created({
            message: 'Komentar terkirim.',
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
            comments.map(async (c) => ({
                id: c.id,
                blogId: c.blogId,
                content: c.content,
                status: c.status,
                userName: await this.getDisplayName(c),
                isGuest: !c.userId,
                guestEmail: c.guestEmail,
                createdAt: c.createdAt,
            }))
        )

        return response.ok(result)
    }

    async deletedIndex({ response }: HttpContext) {
        const comments = await Comment.query()
            .whereNotNull('deleted_at')
            .orderBy('deleted_at', 'desc')

        const result = await Promise.all(
            comments.map(async (c) => {
                const deletedByUser = await User.find(c.deletedBy)
                return {
                    id: c.id,
                    blogId: c.blogId,
                    content: c.content,
                    status: c.status,
                    userName: await this.getDisplayName(c),
                    isGuest: !c.userId,
                    createdAt: c.createdAt,
                    deletedAt: c.deletedAt,
                    deletedBy: deletedByUser?.fullName ?? 'Unknown',
                }
            })
        )

        return response.ok(result)
    }
}