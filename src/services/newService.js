import api from "./axios";

// ---------- Public ----------
const unwrapData = (response) => response?.data?.data ?? response?.data ?? response;

export const fetchFeaturedNews = (limit = 6) =>
  api.get(`/news/featured`, { params: { limit } }).then((r) => unwrapData(r));

export const fetchLatestNews = (limit = 8) =>
  api.get(`/news/latest`, { params: { limit } }).then((r) => unwrapData(r));

export const fetchNewsByCategory = (category, limit = 8) =>
  api.get(`/news/category/${category}`, { params: { limit } }).then((r) => unwrapData(r));

export const fetchNewsByCountry = (country, limit = 8) =>
  api.get(`/news/country/${encodeURIComponent(country)}`, { params: { limit } }).then((r) => unwrapData(r));

export const fetchNewsList = (params = {}) =>
  api.get(`/news`, { params }).then((r) => unwrapData(r));

export const fetchNewsBySlug = (slug) =>
  api.get(`/news/${slug}`).then((r) => {
    const payload = r?.data ?? r;
    return {
      data: payload?.data ?? payload,
      relatedNews: payload?.relatedNews || [],
    };
  });

// ---------- Admin ----------
export const adminFetchNewsList = (params = {}) =>
  api.get(`/news/admin/list`, { params }).then((r) => r.data);

export const adminFetchNewsById = (id) =>
  api.get(`/news/admin/${id}`).then((r) => r.data);

export const adminCreateNews = (payload) =>
  api.post(`/news/admin`, payload).then((r) => r.data);

export const adminUpdateNews = (id, payload) =>
  api.put(`/news/admin/${id}`, payload).then((r) => r.data);

export const adminDeleteNews = (id) =>
  api.delete(`/news/admin/${id}`).then((r) => r.data);

export const adminToggleStatus = (id) =>
  api.patch(`/news/admin/${id}/status`).then((r) => r.data);

export const adminToggleFeatured = (id) =>
  api.patch(`/news/admin/${id}/featured`).then((r) => r.data);

export default api;
