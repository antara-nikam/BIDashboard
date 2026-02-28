import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me')
};

// Dashboard API
export const dashboardAPI = {
  getData: () => api.get('/dashboard'),
  getKPIs: () => api.get('/kpis'),
  createKPI: (data) => api.post('/kpis', data),
  updateKPI: (id, data) => api.put(`/kpis/${id}`, data),
  deleteKPI: (id) => api.delete(`/kpis/${id}`),
  getSales: () => api.get('/sales'),
  updateSales: (data) => api.put('/sales', data),
  getRevenue: () => api.get('/revenue'),
  updateRevenue: (data) => api.put('/revenue', data),
  getProducts: () => api.get('/products'),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getTransactions: () => api.get('/transactions'),
  createTransaction: (data) => api.post('/transactions', data),
  updateTransaction: (id, data) => api.put(`/transactions/${id}`, data),
  deleteTransaction: (id) => api.delete(`/transactions/${id}`),
  getCategories: () => api.get('/categories'),
  updateCategories: (data) => api.put('/categories', data),
  getConfig: () => api.get('/config')
};

// Import/Export API
export const dataAPI = {
  importData: (source, data, type) => api.post('/import', { source, data, type }),
  getImportedData: () => api.get('/import'),
  exportData: (format = 'json', type = 'full') => api.get(`/export?format=${format}&type=${type}`)
};

export default api;
