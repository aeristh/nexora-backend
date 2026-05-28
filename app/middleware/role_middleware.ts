import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

export default class RoleMiddleware {
  async handle(
    { auth, response }: HttpContext,
    next: NextFn,
    allowedRoles: string[]
  ) {
    const user = auth.user as User | null

    if (!user) {
      return response.unauthorized({ message: 'Silakan login terlebih dahulu' })
    }

    if (!user.isActive) {
      return response.forbidden({ message: 'Akun Anda telah dinonaktifkan' })
    }

    if (!allowedRoles.includes(user.role)) {
      return response.forbidden({
        message: 'Anda tidak memiliki izin untuk mengakses fitur ini'
      })
    }

    await next()
  }
}