import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'gallery.index_public': { paramsTuple?: []; params?: {} }
    'projects.index_public': { paramsTuple?: []; params?: {} }
    'contact_info.public': { paramsTuple?: []; params?: {} }
    'projects.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'comments.index': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'comments.store': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'blogs.public': { paramsTuple?: []; params?: {} }
    'blogs.trashed': { paramsTuple?: []; params?: {} }
    'blogs.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'blogs.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'users.change_password': { paramsTuple?: []; params?: {} }
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
    'contact_info.index': { paramsTuple?: []; params?: {} }
    'contact_info.store': { paramsTuple?: []; params?: {} }
    'contact_info.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'contact_info.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'contact_info.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comments.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comments.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comments.admin_index': { paramsTuple?: []; params?: {} }
    'comments.deleted_index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'comments.store': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
    'employees.store': { paramsTuple?: []; params?: {} }
    'gallery.store': { paramsTuple?: []; params?: {} }
    'projects.store': { paramsTuple?: []; params?: {} }
    'blogs.store': { paramsTuple?: []; params?: {} }
    'contact_info.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'gallery.index_public': { paramsTuple?: []; params?: {} }
    'projects.index_public': { paramsTuple?: []; params?: {} }
    'contact_info.public': { paramsTuple?: []; params?: {} }
    'projects.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'comments.index': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
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
    'contact_info.index': { paramsTuple?: []; params?: {} }
    'contact_info.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comments.admin_index': { paramsTuple?: []; params?: {} }
    'comments.deleted_index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'gallery.index_public': { paramsTuple?: []; params?: {} }
    'projects.index_public': { paramsTuple?: []; params?: {} }
    'contact_info.public': { paramsTuple?: []; params?: {} }
    'projects.show_by_slug': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'comments.index': { paramsTuple: [ParamValue]; params: {'blogId': ParamValue} }
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
    'contact_info.index': { paramsTuple?: []; params?: {} }
    'contact_info.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comments.admin_index': { paramsTuple?: []; params?: {} }
    'comments.deleted_index': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'users.change_password': { paramsTuple?: []; params?: {} }
    'comments.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
    'contact_info.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'employees.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gallery.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'blogs.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'contact_info.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'comments.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}