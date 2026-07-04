import api from './axios'

export const destinationService = {
  list: (params = {}) => api.get('/destinations', { params }).then((res) => res.data.data),
  groups: (params = {}) => api.get('/destinations/groups', { params }).then((res) => res.data.data),
  get: (slug, params = {}) => api.get(`/destinations/${slug}`, { params }).then((res) => res.data.data.item || res.data.data.destination),
  create: (payload) => api.post('/destinations', payload).then((res) => res.data.data.item || res.data.data.destination),
  update: (id, payload) => api.patch(`/destinations/${id}`, payload).then((res) => res.data.data.item || res.data.data.destination),
  remove: (id) => api.delete(`/destinations/${id}`).then((res) => res.data),
}
