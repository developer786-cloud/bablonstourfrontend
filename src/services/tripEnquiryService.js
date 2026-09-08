import api from './axios';

const tripEnquiryService = {
  // Public - called from the trip planner form
  create: (payload) => api.post('/trip-enquiries', payload).then((res) => res.data.data.item),

  // Admin
  list: (params = {}) => api.get('/trip-enquiries', { params }).then((res) => res.data.data),
  get: (id) => api.get(`/trip-enquiries/${id}`).then((res) => res.data.data.item),
  updateStatus: (id, status) =>
    api.patch(`/trip-enquiries/${id}/status`, { status }).then((res) => res.data.data.item)
};

export default tripEnquiryService;
