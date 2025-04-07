// app/api/adminService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'
// Create axios instance with auth header
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminLogin = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/admin/login`, { email, password });
  return response.data;
};

export const fetchUsers = async () => {
  const response = await apiClient.get('/admin/users');
  return response.data;
};

export const fetchSellers = async () => {
  const response = await apiClient.get('/admin/sellers');
  return response.data;
};

export const fetchProducts = async () => {
  const response = await apiClient.get('/admin/products');
  return response.data;
};

export const fetchOrders = async () => {
  const response = await apiClient.get('/admin/orders');
  return response.data;
};

export const fetchDashboardData = async () => {
  const response = await apiClient.get('/admin/dashboard');
  return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  };
  
  export const deleteSeller = async (id: string) => {
    const response = await apiClient.delete(`/admin/sellers/${id}`);
    return response.data;
  };
  
  export const deleteProduct = async (id: string) => {
    const response = await apiClient.delete(`/admin/products/${id}`);
    return response.data;
  };
  
  export const deleteOrder = async (id: string) => {
    const response = await apiClient.delete(`/admin/orders/${id}`);
    return response.data;
  };
  