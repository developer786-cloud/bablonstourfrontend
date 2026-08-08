// NOTE: If your project already has a shared axios instance (e.g. "../utils/axiosInstance"
// or "../services/api"), import and use that instead of the local instance below so that
// baseURL, interceptors, and auth headers stay consistent with the rest of the app.

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api/v1";

const api = axios.create({ baseURL: API_BASE });

// Attach admin token if present (adjust key to match existing app's auth storage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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
