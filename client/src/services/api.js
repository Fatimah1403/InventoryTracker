
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );

// Product APIs
export const productAPI = {
    // Get all products
    getAll: () => api.get("/api/products"),
        // Get single product
    getOne: (id) => api.get(`/api/products/${id}`),
    // Create product
    create: (data) => api.post('/api/products', data),
    
    // Update product
    update: (id, data) => api.put(`/api/products/${id}`, data),
    
    // Delete product
    delete: (id) => api.delete(`/api/products/${id}`),
    
    // Update quantity
    updateQuantity: (id, quantity) => 
        api.patch(`/api/products/${id}/quantity`, { quantity }),

};

export default api;