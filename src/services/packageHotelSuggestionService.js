import api from './axios'

const encodePackageIdentifier = (packageId) => encodeURIComponent(String(packageId || ''))

export const packageHotelSuggestionService = {
  publicList: (packageId) => api.get(`/packages/${encodePackageIdentifier(packageId)}/suggested-hotels`).then((res) => res.data.data.items || res.data.data.suggestions || []),
  adminList: (packageId) => api.get(`/admin/packages/${encodePackageIdentifier(packageId)}/suggested-hotels`).then((res) => res.data.data.items || res.data.data.suggestions || []),
  matchingHotels: (packageId) => api.get(`/admin/packages/${encodePackageIdentifier(packageId)}/matching-hotels`).then((res) => res.data.data.items || res.data.data.hotels || []),
  create: (packageId, payload) => api.post(`/admin/packages/${encodePackageIdentifier(packageId)}/suggested-hotels`, payload).then((res) => res.data.data),
  update: (packageId, mappingId, payload) => api.put(`/admin/packages/${encodePackageIdentifier(packageId)}/suggested-hotels/${mappingId}`, payload).then((res) => res.data.data.item || res.data.data.suggestion),
  remove: (packageId, mappingId) => api.delete(`/admin/packages/${encodePackageIdentifier(packageId)}/suggested-hotels/${mappingId}`).then((res) => res.data),
}
