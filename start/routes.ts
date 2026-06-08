import router from '@adonisjs/core/services/router'
import EmployeesController from '#controllers/employees_controller'
import AuthController from '#controllers/auth_controller'
import UsersController from '#controllers/users_controller'
import GalleryController from '#controllers/gallery_controller'
import { middleware } from './kernel.js'
import BlogsController from '#controllers/blogs_controller'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import ProjectsController from '#controllers/projects_controller'
import CommentController from '#controllers/comments_controller'
import ContactInfoController from '#controllers/contact_infos_controller'

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router.get('/gallery/public', [GalleryController, 'indexPublic'])
router.get('/projects/public', [ProjectsController, 'indexPublic'])
router.get('/contact/public', [ContactInfoController, 'public'])
router.get('/projects/slug/:slug', [ProjectsController, 'showBySlug'])

router.get('/blogs/:blogId/comments', [CommentController, 'index'])
router.post('/blogs/:blogId/comments', [CommentController, 'store'])

router.get('/uploads/*', async ({ params, response }) => {
  const parts = Array.isArray(params['*']) ? params['*'] : [params['*']]
  const filePath = join(process.cwd(), 'public', 'uploads', ...parts)
  console.log('File path:', filePath)
  if (!existsSync(filePath)) {
    return response.notFound({ message: 'File not found' })
  }
  return response.download(filePath)
})

router.get('/blogs/public', [BlogsController, 'public'])
router.get('/blogs/trashed', [BlogsController, 'trashed']).use(middleware.auth()).use(middleware.role(['admin']))
router.get('/blogs/slug/:slug', [BlogsController, 'showBySlug'])
router.get('/blogs/:id', [BlogsController, 'show'])

router
  .group(() => {
    router.get('/me', [AuthController, 'me'])
    router.patch('/me/change-password', [UsersController, 'changePassword'])

    router.get('/employees/trashed', [EmployeesController, 'trashed']).use(middleware.role(['admin']))
    router.get('/employees', [EmployeesController, 'index'])
    router.post('/employees', [EmployeesController, 'store']).use(middleware.role(['admin']))
    router.put('/employees/:id/restore', [EmployeesController, 'restore']).use(middleware.role(['admin']))
    router.put('/employees/:id', [EmployeesController, 'update']).use(middleware.role(['admin']))
    router.delete('/employees/:id', [EmployeesController, 'destroy']).use(middleware.role(['admin']))

    router.get('/users', [UsersController, 'index']).use(middleware.role(['admin']))
    router.put('/users/:id/role', [UsersController, 'updateRole']).use(middleware.role(['admin']))
    router.put('/users/:id/toggle-active', [UsersController, 'toggleActive']).use(middleware.role(['admin']))
    router.put('/users/:id', [UsersController, 'update']).use(middleware.role(['admin']))

    router.get('/gallery/trashed', [GalleryController, 'trashed']).use(middleware.role(['admin']))
    router.get('/gallery', [GalleryController, 'index'])
    router.post('/gallery', [GalleryController, 'store'])
    router.put('/gallery/:id/restore', [GalleryController, 'restore']).use(middleware.role(['admin']))
    router.put('/gallery/:id', [GalleryController, 'update'])
    router.delete('/gallery/:id', [GalleryController, 'destroy']).use(middleware.role(['admin']))

    router.get('/projects/trashed', [ProjectsController, 'trashed']).use(middleware.role(['admin']))
    router.get('/projects', [ProjectsController, 'index'])
    router.get('/projects/:id', [ProjectsController, 'show'])
    router.post('/projects', [ProjectsController, 'store']).use(middleware.role(['admin']))
    router.put('/projects/:id/restore', [ProjectsController, 'restore']).use(middleware.role(['admin']))
    router.put('/projects/:id', [ProjectsController, 'update']).use(middleware.role(['admin']))
    router.delete('/projects/:id', [ProjectsController, 'destroy']).use(middleware.role(['admin']))

    router.get('/blogs', [BlogsController, 'index'])
    router.post('/blogs', [BlogsController, 'store'])
    router.put('/blogs/:id/restore', [BlogsController, 'restore']).use(middleware.role(['admin']))
    router.put('/blogs/:id', [BlogsController, 'update'])
    router.delete('/blogs/:id', [BlogsController, 'destroy'])

    router.get('/contact', [ContactInfoController, 'index']).use(middleware.role(['admin']))
    router.post('/contact', [ContactInfoController, 'store']).use(middleware.role(['admin']))
    router.get('/contact/:id', [ContactInfoController, 'show']).use(middleware.role(['admin']))
    router.put('/contact/:id', [ContactInfoController, 'update']).use(middleware.role(['admin']))
    router.delete('/contact/:id', [ContactInfoController, 'destroy']).use(middleware.role(['admin']))

    router.patch('/comments/:id/status', [CommentController, 'updateStatus']).use(middleware.role(['admin']))
    router.delete('/comments/:id', [CommentController, 'destroy']).use(middleware.role(['admin']))

    router.get('/admin/comments', [CommentController, 'adminIndex']).use(middleware.role(['admin']))
    router.get('/admin/comments/deleted', [CommentController, 'deletedIndex']).use(middleware.role(['admin']))
  })
  .use(middleware.auth())