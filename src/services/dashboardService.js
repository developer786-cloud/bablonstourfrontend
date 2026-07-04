import api from './axios'

export const dashboardService = {
  overview: () => api.get('/dashboard/overview').then((res) => res.data.data),
}
