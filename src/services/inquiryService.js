import api from './axios'

export const inquiryService = {
  list: (params = {}) => api.get('/inquiries', { params }).then((res) => res.data.data),
  get: (id) => api.get(`/inquiries/${id}`).then((res) => res.data.data.item || res.data.data.inquiry),
  updateStatus: (id, status) => api.patch(`/inquiries/${id}/status`, { status }).then((res) => res.data.data.item || res.data.data.inquiry),
  addNote: (id, text) => api.post(`/inquiries/${id}/notes`, { text }).then((res) => res.data.data.item || res.data.data.inquiry),
  assign: (id, assignedTo) => api.patch(`/inquiries/${id}/assign`, { assignedTo }).then((res) => res.data.data.item || res.data.data.inquiry),
}
