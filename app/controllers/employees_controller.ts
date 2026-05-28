import Employee from '#models/employee'
import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'


export default class EmployeesController {
  async index({ response }: HttpContext) {
    const employees = await Employee.query()
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc')

    return response.ok({ data: employees })
  }

  async store({ request }: HttpContext) {
    const data = request.only(['name', 'email', 'phone', 'position', 'status'])

    const employee = await Employee.create(data)

    return employee
  }

  async update({ params, request }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)

    const data = request.only(['name', 'email', 'phone', 'position', 'status'])

    employee.merge(data)

    await employee.save()

    return employee
  }

  async destroy({ params, auth, response }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)

    if (employee.deletedAt) {
      return response.badRequest({ message: 'Employee already deleted' })
    }

    employee.deletedAt = DateTime.now()
    employee.deletedBy = auth.user!.id
    await employee.save()

    return response.ok({ message: 'Employee deleted successfully' })
  }

  async trashed({ response }: HttpContext) {
    const employees = await Employee.query()
      .whereNotNull('deleted_at')
      .preload('deletedByUser')
      .orderBy('deleted_at', 'desc')

    return response.ok({ data: employees })
  }

  async restore({ params, response }: HttpContext) {
    const employee = await Employee.query()
      .whereNotNull('deleted_at')
      .where('id', params.id)
      .firstOrFail()

    employee.deletedAt = null
    employee.deletedBy = null
    await employee.save()

    return response.ok({ message: 'Employee restored successfully' })
  }
}
