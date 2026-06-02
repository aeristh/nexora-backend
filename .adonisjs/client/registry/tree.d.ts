/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
  }
  gallery: {
    indexPublic: typeof routes['gallery.index_public']
    trashed: typeof routes['gallery.trashed']
    index: typeof routes['gallery.index']
    store: typeof routes['gallery.store']
    restore: typeof routes['gallery.restore']
    update: typeof routes['gallery.update']
    destroy: typeof routes['gallery.destroy']
  }
  projects: {
    indexPublic: typeof routes['projects.index_public']
    showBySlug: typeof routes['projects.show_by_slug']
    trashed: typeof routes['projects.trashed']
    index: typeof routes['projects.index']
    show: typeof routes['projects.show']
    store: typeof routes['projects.store']
    restore: typeof routes['projects.restore']
    update: typeof routes['projects.update']
    destroy: typeof routes['projects.destroy']
  }
  comment: {
    index: typeof routes['comment.index']
    store: typeof routes['comment.store']
    updateStatus: typeof routes['comment.update_status']
    destroy: typeof routes['comment.destroy']
    adminIndex: typeof routes['comment.admin_index']
    deletedIndex: typeof routes['comment.deleted_index']
  }
  blogs: {
    public: typeof routes['blogs.public']
    trashed: typeof routes['blogs.trashed']
    showBySlug: typeof routes['blogs.show_by_slug']
    show: typeof routes['blogs.show']
    index: typeof routes['blogs.index']
    store: typeof routes['blogs.store']
    restore: typeof routes['blogs.restore']
    update: typeof routes['blogs.update']
    destroy: typeof routes['blogs.destroy']
  }
  employees: {
    trashed: typeof routes['employees.trashed']
    index: typeof routes['employees.index']
    store: typeof routes['employees.store']
    restore: typeof routes['employees.restore']
    update: typeof routes['employees.update']
    destroy: typeof routes['employees.destroy']
  }
  users: {
    index: typeof routes['users.index']
    updateRole: typeof routes['users.update_role']
    toggleActive: typeof routes['users.toggle_active']
    update: typeof routes['users.update']
  }
}
