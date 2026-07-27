import api from './axios'

const cleanParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== undefined && value !== null))

export const hotelService = {
  list: (params = {}) => api.get('/hotels', { params: cleanParams(params) }).then((res) => res.data.data),
  adminList: (params = {}) => api.get('/admin/hotels', { params: cleanParams(params) }).then((res) => res.data.data),
  get: (id) => api.get(`/admin/hotels/${id}`).then((res) => res.data.data.item || res.data.data.hotel),
  publicGet: (id) => api.get(`/hotels/${id}`).then((res) => res.data.data.item || res.data.data.hotel),
  create: (payload) => api.post('/admin/hotels', payload).then((res) => res.data.data.item || res.data.data.hotel),
  update: (id, payload) => api.patch(`/admin/hotels/${id}`, payload).then((res) => res.data.data.item || res.data.data.hotel),
  remove: (id) => api.delete(`/admin/hotels/${id}`).then((res) => res.data),
  status: (id, isActive) => api.patch(`/admin/hotels/${id}/status`, { isActive }).then((res) => res.data.data.item || res.data.data.hotel),
}
