import api from './axios'

export const destinationService = {
  list: (params = {}) => api.get('/destinations', { params }).then((res) => res.data.data),
  groups: (params = {}) => api.get('/destinations/groups', { params }).then((res) => res.data.data),
  get: (slug, params = {}) =>
    api
      .get(`/destinations/${slug}/page`, {
        params: { include: 'blogs,packages,hotels,nearbyDestinations', ...params },
      })
      .then((res) => res.data.data),
  getRaw: (slug, params = {}) => api.get(`/destinations/${slug}`, { params }).then((res) => res.data.data.destination || res.data.data.item || res.data.data),
  create: (payload) => api.post('/destinations', payload).then((res) => res.data.data.item || res.data.data.destination),
  update: (id, payload) => api.patch(`/destinations/${id}`, payload).then((res) => res.data.data.item || res.data.data.destination),
  remove: (id) => api.delete(`/destinations/${id}`).then((res) => res.data),
}
