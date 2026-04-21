
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL 
let newAccessToken = null;

export const setAccessToken = (token) => {
    newAccessToken = token;
};

export const getAccessToken = () => {
    return newAccessToken;
};

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true

})
api.interceptors.request.use(
    (config) => {
        if (newAccessToken) {
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            console.log('API Request:', config.method?.toUpperCase(), config.url);

        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshResponse = await axios.post(
                    `${API_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                
                const newAccessToken = refreshResponse.data.accessToken;
                setAccessToken(newAccessToken);

                
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                setAccessToken(null);
                
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);   
  

// Product APIs
export const productAPI = {
    // Get all products
    getAll: () => api.get("/products"),
        // Get single product
    getOne: (id) => api.get(`/products/${id}`),
    // Create product
    create: (data) => api.post('/products', data),
    
    // Update product
    update: (id, data) => api.put(`/products/${id}`, data),
    
    // Delete product
    delete: (id) => api.delete(`/products/${id}`),
    
    // Update quantity
    updateQuantity: async (id, quantity) => {
        try {
            const response = await api.patch(`/products/${id}/quantity`, { quantity });
            return response;
        } catch (error) {
            console.error('Quantity update error:', error);
            throw error;
        }
    }

};
export const notificationAPI = {
    sendOutOfStockAlert: (data) => api.post('/notifications/out-of-stock', data)
};
export const authAPI = {
    verify: () => api.get('/auth/verify'),
    updateProfile: (data) => api.put('/auth/profile', data)
};

export default api;