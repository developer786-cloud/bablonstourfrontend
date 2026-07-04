import api from './axios'

export const authService = {
  login: (payload) => api.post('/auth/login', payload).then((res) => res.data.data),
  me: () => api.get('/auth/me').then((res) => res.data.data),
  logout: () => api.post('/auth/logout').then((res) => res.data),
  listAdmins: () => api.get('/auth/admin-users').then((res) => res.data.data.users || []),
  createAdmin: (payload) => api.post('/auth/admin-users', payload).then((res) => res.data.data.user),
  updateAdmin: (id, payload) => api.patch(`/auth/admin-users/${id}`, payload).then((res) => res.data.data.user),
  updateAdminStatus: (id, isActive) => api.patch(`/auth/admin-users/${id}/status`, { isActive }).then((res) => res.data.data.user),
}
