import api from './axios'

export const packageService = {
  list: (params = {}) => api.get('/packages', { params }).then((res) => res.data.data),
  get: (slug) => api.get(`/packages/${slug}`).then((res) => res.data.data.item || res.data.data.package),
  related: (slug) => api.get(`/packages/${slug}/related`).then((res) => res.data.data.items || res.data.data.packages || []),
  reviews: (slug) => api.get(`/packages/${slug}/reviews`).then((res) => res.data.data),
  inquiry: (slug, payload) => api.post(`/packages/${slug}/inquiry`, payload).then((res) => res.data.data),
  create: (payload) => api.post('/packages', payload).then((res) => res.data.data.item || res.data.data.package),
  update: (id, payload) => api.patch(`/packages/${id}`, payload).then((res) => res.data.data.item || res.data.data.package),
  remove: (id) => api.delete(`/packages/${id}`).then((res) => res.data),
  status: (id, payload) => api.patch(`/packages/${id}/status`, payload).then((res) => res.data.data.item || res.data.data.package),
}
