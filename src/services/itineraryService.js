import api from './axios';

const API_BASE = api.defaults.baseURL; // e.g. '/api/v1'

const itineraryService = {
  create: (payload) => api.post('/itineraries', payload).then((res) => res.data.data.item),
  get: (id) => api.get(`/itineraries/${id}`).then((res) => res.data.data.item),
  update: (id, payload) => api.patch(`/itineraries/${id}`, payload).then((res) => res.data.data.item),

  // These hit the API directly (not via axios) so the browser can stream/download the file
  // with the auth token attached as a query param or via a signed link, depending on your
  // authMiddleware setup. If routes require a Bearer token, fetch the blob instead - see
  // downloadAsBlob below.
  pdfUrl: (id) => `${API_BASE}/itineraries/${id}/pdf`,
  docxUrl: (id) => `${API_BASE}/itineraries/${id}/docx`,

  downloadAsBlob: async (id, type = 'pdf') => {
    const res = await api.get(`/itineraries/${id}/${type}`, { responseType: 'blob' });
    const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `itinerary.${type}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  }
};

export default itineraryService;
