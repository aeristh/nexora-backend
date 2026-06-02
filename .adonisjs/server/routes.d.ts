import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'gallery.index_public': { paramsTuple?: []; params?: {} }
    'projects.index_public': { paramsTuple?: []; params?: {} }
    'projects.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'comment.index': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'blogs.public': { paramsTuple?: []; params?: {} }
    'blogs.trashed': { paramsTuple?: []; params?: {} }
    'blogs.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'employees.trashed': { paramsTuple?: []; params?: {} }
    'employees.index': { paramsTuple?: []; params?: {} }
    'employees.store': { paramsTuple?: []; params?: {} }
    'employees.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'employees.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'employees.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.update_role': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.toggle_active': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gallery.trashed': { paramsTuple?: []; params?: {} }
    'gallery.index': { paramsTuple?: []; params?: {} }
    'gallery.store': { paramsTuple?: []; params?: {} }
    'gallery.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gallery.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gallery.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.trashed': { paramsTuple?: []; params?: {} }
    'projects.index': { paramsTuple?: []; params?: {} }
    'projects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.store': { paramsTuple?: []; params?: {} }
    'projects.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.index': { paramsTuple?: []; params?: {} }
    'blogs.store': { paramsTuple?: []; params?: {} }
    'blogs.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comment.store': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'comment.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comment.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comment.admin_index': { paramsTuple?: []; params?: {} }
    'comment.deleted_index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'employees.store': { paramsTuple?: []; params?: {} }
    'gallery.store': { paramsTuple?: []; params?: {} }
    'projects.store': { paramsTuple?: []; params?: {} }
    'blogs.store': { paramsTuple?: []; params?: {} }
    'comment.store': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
  }
  GET: {
    'gallery.index_public': { paramsTuple?: []; params?: {} }
    'projects.index_public': { paramsTuple?: []; params?: {} }
    'projects.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'comment.index': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'blogs.public': { paramsTuple?: []; params?: {} }
    'blogs.trashed': { paramsTuple?: []; params?: {} }
    'blogs.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'employees.trashed': { paramsTuple?: []; params?: {} }
    'employees.index': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'gallery.trashed': { paramsTuple?: []; params?: {} }
    'gallery.index': { paramsTuple?: []; params?: {} }
    'projects.trashed': { paramsTuple?: []; params?: {} }
    'projects.index': { paramsTuple?: []; params?: {} }
    'projects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.index': { paramsTuple?: []; params?: {} }
    'comment.admin_index': { paramsTuple?: []; params?: {} }
    'comment.deleted_index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'gallery.index_public': { paramsTuple?: []; params?: {} }
    'projects.index_public': { paramsTuple?: []; params?: {} }
    'projects.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'comment.index': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'blogs.public': { paramsTuple?: []; params?: {} }
    'blogs.trashed': { paramsTuple?: []; params?: {} }
    'blogs.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'employees.trashed': { paramsTuple?: []; params?: {} }
    'employees.index': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'gallery.trashed': { paramsTuple?: []; params?: {} }
    'gallery.index': { paramsTuple?: []; params?: {} }
    'projects.trashed': { paramsTuple?: []; params?: {} }
    'projects.index': { paramsTuple?: []; params?: {} }
    'projects.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.index': { paramsTuple?: []; params?: {} }
    'comment.admin_index': { paramsTuple?: []; params?: {} }
    'comment.deleted_index': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'employees.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'employees.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update_role': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.toggle_active': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gallery.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gallery.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.restore': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'employees.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gallery.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comment.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'comment.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}