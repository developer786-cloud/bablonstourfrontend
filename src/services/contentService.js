import api from './axios'

export const contentService = {
  testimonials: () => api.get('/testimonials').then((res) => res.data.data.testimonials || []),
  createTestimonial: (payload) => api.post('/testimonials', payload).then((res) => res.data.data.item || res.data.data.testimonial),
  updateTestimonial: (id, payload) => api.patch(`/testimonials/${id}`, payload).then((res) => res.data.data.item || res.data.data.testimonial),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`).then((res) => res.data),
  blogs: () => api.get('/blogs').then((res) => res.data.data.blogs || []),
  createBlog: (payload) => api.post('/blogs', payload).then((res) => res.data.data.item || res.data.data.blog),
  updateBlog: (id, payload) => api.patch(`/blogs/${id}`, payload).then((res) => res.data.data.item || res.data.data.blog),
  deleteBlog: (id) => api.delete(`/blogs/${id}`).then((res) => res.data),
  newsletter: () => api.get('/newsletter').then((res) => res.data.data.subscribers || []),
}
