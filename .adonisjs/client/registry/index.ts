/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'gallery.index_public': {
    methods: ["GET","HEAD"],
    pattern: '/gallery/public',
    tokens: [{"old":"/gallery/public","type":0,"val":"gallery","end":""},{"old":"/gallery/public","type":0,"val":"public","end":""}],
    types: placeholder as Registry['gallery.index_public']['types'],
  },
  'projects.index_public': {
    methods: ["GET","HEAD"],
    pattern: '/projects/public',
    tokens: [{"old":"/projects/public","type":0,"val":"projects","end":""},{"old":"/projects/public","type":0,"val":"public","end":""}],
    types: placeholder as Registry['projects.index_public']['types'],
  },
  'projects.show_by_slug': {
    methods: ["GET","HEAD"],
    pattern: '/projects/slug/:slug',
    tokens: [{"old":"/projects/slug/:slug","type":0,"val":"projects","end":""},{"old":"/projects/slug/:slug","type":0,"val":"slug","end":""},{"old":"/projects/slug/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['projects.show_by_slug']['types'],
  },
  'comment.index': {
    methods: ["GET","HEAD"],
    pattern: '/blogs/:blogId/comments',
    tokens: [{"old":"/blogs/:blogId/comments","type":0,"val":"blogs","end":""},{"old":"/blogs/:blogId/comments","type":1,"val":"blogId","end":""},{"old":"/blogs/:blogId/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['comment.index']['types'],
  },
  'blogs.public': {
    methods: ["GET","HEAD"],
    pattern: '/blogs/public',
    tokens: [{"old":"/blogs/public","type":0,"val":"blogs","end":""},{"old":"/blogs/public","type":0,"val":"public","end":""}],
    types: placeholder as Registry['blogs.public']['types'],
  },
  'blogs.trashed': {
    methods: ["GET","HEAD"],
    pattern: '/blogs/trashed',
    tokens: [{"old":"/blogs/trashed","type":0,"val":"blogs","end":""},{"old":"/blogs/trashed","type":0,"val":"trashed","end":""}],
    types: placeholder as Registry['blogs.trashed']['types'],
  },
  'blogs.show_by_slug': {
    methods: ["GET","HEAD"],
    pattern: '/blogs/slug/:slug',
    tokens: [{"old":"/blogs/slug/:slug","type":0,"val":"blogs","end":""},{"old":"/blogs/slug/:slug","type":0,"val":"slug","end":""},{"old":"/blogs/slug/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['blogs.show_by_slug']['types'],
  },
  'blogs.show': {
    methods: ["GET","HEAD"],
    pattern: '/blogs/:id',
    tokens: [{"old":"/blogs/:id","type":0,"val":"blogs","end":""},{"old":"/blogs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['blogs.show']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/me',
    tokens: [{"old":"/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'employees.trashed': {
    methods: ["GET","HEAD"],
    pattern: '/employees/trashed',
    tokens: [{"old":"/employees/trashed","type":0,"val":"employees","end":""},{"old":"/employees/trashed","type":0,"val":"trashed","end":""}],
    types: placeholder as Registry['employees.trashed']['types'],
  },
  'employees.index': {
    methods: ["GET","HEAD"],
    pattern: '/employees',
    tokens: [{"old":"/employees","type":0,"val":"employees","end":""}],
    types: placeholder as Registry['employees.index']['types'],
  },
  'employees.store': {
    methods: ["POST"],
    pattern: '/employees',
    tokens: [{"old":"/employees","type":0,"val":"employees","end":""}],
    types: placeholder as Registry['employees.store']['types'],
  },
  'employees.restore': {
    methods: ["PUT"],
    pattern: '/employees/:id/restore',
    tokens: [{"old":"/employees/:id/restore","type":0,"val":"employees","end":""},{"old":"/employees/:id/restore","type":1,"val":"id","end":""},{"old":"/employees/:id/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['employees.restore']['types'],
  },
  'employees.update': {
    methods: ["PUT"],
    pattern: '/employees/:id',
    tokens: [{"old":"/employees/:id","type":0,"val":"employees","end":""},{"old":"/employees/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['employees.update']['types'],
  },
  'employees.destroy': {
    methods: ["DELETE"],
    pattern: '/employees/:id',
    tokens: [{"old":"/employees/:id","type":0,"val":"employees","end":""},{"old":"/employees/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['employees.destroy']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.update_role': {
    methods: ["PUT"],
    pattern: '/users/:id/role',
    tokens: [{"old":"/users/:id/role","type":0,"val":"users","end":""},{"old":"/users/:id/role","type":1,"val":"id","end":""},{"old":"/users/:id/role","type":0,"val":"role","end":""}],
    types: placeholder as Registry['users.update_role']['types'],
  },
  'users.toggle_active': {
    methods: ["PUT"],
    pattern: '/users/:id/toggle-active',
    tokens: [{"old":"/users/:id/toggle-active","type":0,"val":"users","end":""},{"old":"/users/:id/toggle-active","type":1,"val":"id","end":""},{"old":"/users/:id/toggle-active","type":0,"val":"toggle-active","end":""}],
    types: placeholder as Registry['users.toggle_active']['types'],
  },
  'users.update': {
    methods: ["PUT"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'gallery.trashed': {
    methods: ["GET","HEAD"],
    pattern: '/gallery/trashed',
    tokens: [{"old":"/gallery/trashed","type":0,"val":"gallery","end":""},{"old":"/gallery/trashed","type":0,"val":"trashed","end":""}],
    types: placeholder as Registry['gallery.trashed']['types'],
  },
  'gallery.index': {
    methods: ["GET","HEAD"],
    pattern: '/gallery',
    tokens: [{"old":"/gallery","type":0,"val":"gallery","end":""}],
    types: placeholder as Registry['gallery.index']['types'],
  },
  'gallery.store': {
    methods: ["POST"],
    pattern: '/gallery',
    tokens: [{"old":"/gallery","type":0,"val":"gallery","end":""}],
    types: placeholder as Registry['gallery.store']['types'],
  },
  'gallery.restore': {
    methods: ["PUT"],
    pattern: '/gallery/:id/restore',
    tokens: [{"old":"/gallery/:id/restore","type":0,"val":"gallery","end":""},{"old":"/gallery/:id/restore","type":1,"val":"id","end":""},{"old":"/gallery/:id/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['gallery.restore']['types'],
  },
  'gallery.update': {
    methods: ["PUT"],
    pattern: '/gallery/:id',
    tokens: [{"old":"/gallery/:id","type":0,"val":"gallery","end":""},{"old":"/gallery/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['gallery.update']['types'],
  },
  'gallery.destroy': {
    methods: ["DELETE"],
    pattern: '/gallery/:id',
    tokens: [{"old":"/gallery/:id","type":0,"val":"gallery","end":""},{"old":"/gallery/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['gallery.destroy']['types'],
  },
  'projects.trashed': {
    methods: ["GET","HEAD"],
    pattern: '/projects/trashed',
    tokens: [{"old":"/projects/trashed","type":0,"val":"projects","end":""},{"old":"/projects/trashed","type":0,"val":"trashed","end":""}],
    types: placeholder as Registry['projects.trashed']['types'],
  },
  'projects.index': {
    methods: ["GET","HEAD"],
    pattern: '/projects',
    tokens: [{"old":"/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.index']['types'],
  },
  'projects.show': {
    methods: ["GET","HEAD"],
    pattern: '/projects/:id',
    tokens: [{"old":"/projects/:id","type":0,"val":"projects","end":""},{"old":"/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.show']['types'],
  },
  'projects.store': {
    methods: ["POST"],
    pattern: '/projects',
    tokens: [{"old":"/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['projects.store']['types'],
  },
  'projects.restore': {
    methods: ["PUT"],
    pattern: '/projects/:id/restore',
    tokens: [{"old":"/projects/:id/restore","type":0,"val":"projects","end":""},{"old":"/projects/:id/restore","type":1,"val":"id","end":""},{"old":"/projects/:id/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['projects.restore']['types'],
  },
  'projects.update': {
    methods: ["PUT"],
    pattern: '/projects/:id',
    tokens: [{"old":"/projects/:id","type":0,"val":"projects","end":""},{"old":"/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.update']['types'],
  },
  'projects.destroy': {
    methods: ["DELETE"],
    pattern: '/projects/:id',
    tokens: [{"old":"/projects/:id","type":0,"val":"projects","end":""},{"old":"/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['projects.destroy']['types'],
  },
  'blogs.index': {
    methods: ["GET","HEAD"],
    pattern: '/blogs',
    tokens: [{"old":"/blogs","type":0,"val":"blogs","end":""}],
    types: placeholder as Registry['blogs.index']['types'],
  },
  'blogs.store': {
    methods: ["POST"],
    pattern: '/blogs',
    tokens: [{"old":"/blogs","type":0,"val":"blogs","end":""}],
    types: placeholder as Registry['blogs.store']['types'],
  },
  'blogs.restore': {
    methods: ["PUT"],
    pattern: '/blogs/:id/restore',
    tokens: [{"old":"/blogs/:id/restore","type":0,"val":"blogs","end":""},{"old":"/blogs/:id/restore","type":1,"val":"id","end":""},{"old":"/blogs/:id/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['blogs.restore']['types'],
  },
  'blogs.update': {
    methods: ["PUT"],
    pattern: '/blogs/:id',
    tokens: [{"old":"/blogs/:id","type":0,"val":"blogs","end":""},{"old":"/blogs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['blogs.update']['types'],
  },
  'blogs.destroy': {
    methods: ["DELETE"],
    pattern: '/blogs/:id',
    tokens: [{"old":"/blogs/:id","type":0,"val":"blogs","end":""},{"old":"/blogs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['blogs.destroy']['types'],
  },
  'comment.store': {
    methods: ["POST"],
    pattern: '/blogs/:blogId/comments',
    tokens: [{"old":"/blogs/:blogId/comments","type":0,"val":"blogs","end":""},{"old":"/blogs/:blogId/comments","type":1,"val":"blogId","end":""},{"old":"/blogs/:blogId/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['comment.store']['types'],
  },
  'comment.update_status': {
    methods: ["PATCH"],
    pattern: '/comments/:id/status',
    tokens: [{"old":"/comments/:id/status","type":0,"val":"comments","end":""},{"old":"/comments/:id/status","type":1,"val":"id","end":""},{"old":"/comments/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['comment.update_status']['types'],
  },
  'comment.destroy': {
    methods: ["DELETE"],
    pattern: '/comments/:id',
    tokens: [{"old":"/comments/:id","type":0,"val":"comments","end":""},{"old":"/comments/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['comment.destroy']['types'],
  },
  'comment.admin_index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/comments',
    tokens: [{"old":"/admin/comments","type":0,"val":"admin","end":""},{"old":"/admin/comments","type":0,"val":"comments","end":""}],
    types: placeholder as Registry['comment.admin_index']['types'],
  },
  'comment.deleted_index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/comments/deleted',
    tokens: [{"old":"/admin/comments/deleted","type":0,"val":"admin","end":""},{"old":"/admin/comments/deleted","type":0,"val":"comments","end":""},{"old":"/admin/comments/deleted","type":0,"val":"deleted","end":""}],
    types: placeholder as Registry['comment.deleted_index']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
