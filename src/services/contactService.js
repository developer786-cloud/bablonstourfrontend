import api from './axios'

export const contactService = {
  create: (payload) => api.post('/contact', payload).then((res) => res.data.data.item || res.data.data.contact),
  list: (params = {}) => api.get('/contact', { params }).then((res) => res.data.data),
  updateStatus: (id, status) => api.patch(`/contact/${id}/status`, { status }).then((res) => res.data.data.item || res.data.data.contact),
}
