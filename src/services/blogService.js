import api from './axios'

export const blogService = {
  getBlogs: (params = {}) =>
    api.get('/blogs', { params }).then((res) => res.data.data),

  getBlogBySlug: (slug) =>
    api.get(`/blogs/${slug}`).then((res) => res.data.data),
}

export default blogService
