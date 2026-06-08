import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {

  async index({ response }: HttpContext) {
    const users = await User.query()
      .select('id', 'full_name', 'email', 'role', 'is_active', 'created_at')
      .orderBy('created_at', 'desc')

    return response.ok(users)
  }

  async updateRole({ params, request, response, auth }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User tidak ditemukan' })

    if (user.id === auth.user!.id) {
      return response.badRequest({ message: 'Tidak bisa mengubah role diri sendiri' })
    }

    const { role } = request.only(['role'])
    if (!['admin', 'user'].includes(role)) {
      return response.badRequest({ message: 'Role tidak valid' })
    }

    user.role = role
    await user.save()

    return response.ok({ message: 'Role berhasil diubah', user })
  }

  async toggleActive({ params, response, auth }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User tidak ditemukan' })

    if (user.id === auth.user!.id) {
      return response.badRequest({ message: 'Tidak bisa menonaktifkan akun sendiri' })
    }

    user.isActive = !user.isActive
    await user.save()

    const status = user.isActive ? 'diaktifkan' : 'dinonaktifkan'
    return response.ok({ message: `Akun berhasil ${status}`, user })
  }

  async update({ params, request, response, auth }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'User tidak ditemukan' })

    if (user.id === auth.user!.id) {
      return response.badRequest({ message: 'Tidak bisa mengedit akun sendiri dari sini' })
    }

    const { fullName, email } = request.only(['fullName', 'email'])

    if (email && email !== user.email) {
      const existing = await User.findBy('email', email)
      if (existing) return response.badRequest({ message: 'Email sudah digunakan' })
    }

    if (fullName) user.fullName = fullName
    if (email) user.email = email
    await user.save()

    return response.ok({ message: 'User berhasil diperbarui', user })
  }
  async changePassword({ request, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const { currentPassword, newPassword } = request.only(['currentPassword', 'newPassword'])

    if (!currentPassword || !newPassword) {
      return response.badRequest({ message: 'Semua field wajib diisi.' })
    }

    const isValid = await hash.verify(user.password, currentPassword)
    if (!isValid) {
      return response.badRequest({ message: 'Password saat ini salah.' })
    }

    if (newPassword.length < 6) {
      return response.badRequest({ message: 'Password baru minimal 6 karakter.' })
    }

    user.password = newPassword
    await user.save()

    return response.ok({ message: 'Password berhasil diubah.' })
  }
}