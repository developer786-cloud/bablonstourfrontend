import api from './axios'

export const uploadService = {
  image: (formData, onUploadProgress) => api.post('/uploads/image', formData, { onUploadProgress }).then((res) => res.data.data.image),
  remove: (publicId) => api.delete('/uploads/image', { data: { publicId } }).then((res) => res.data),
}
