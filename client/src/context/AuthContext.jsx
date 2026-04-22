import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../services/api';



const AuthContext = createContext({});
let _accessToken = null; 

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true; 


axios.interceptors.response.use(
    (res) => res,
    async (err) => {
      const original = err.config;

      if (original.url.includes("/api/auth/refresh")) {
        console.warn("Refresh request failed.");
        return Promise.reject(err);
      }
  
      if (err.response?.status === 401 && !original._retry) {
        original._retry = true;
  
        try {
          const refreshed = await axios.post( import.meta.env.VITE_API_URL + "/api/auth/refresh", {}, { withCredentials: true });
  
          const newAccessToken = refreshed.data.accessToken;
          setAccessToken(newAccessToken);

          axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          original.headers["Authorization"] = `Bearer ${newAccessToken}`;
  
          return axios(original);
        } catch (refreshErr) {
            console.error('Refresh failed:', refreshErr);
            window.location.href = "/login";
            return Promise.reject(refreshErr);
        }
      }
  
      return Promise.reject(err);
    }
  );
  export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [_error, setError] = useState(null);

    
    const login = async (email, password, rememberMe = false) => {
        try {
            setError(null)
            const res = await axios.post("/api/auth/login", { email, password, rememberMe });
            const { accessToken, user: userData } = res.data;


            setAccessToken(accessToken);
            
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            
            setUser(userData);
            return { success: true, data: userData };

        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
            return { success: false, error: message };
        }
    };
    const register = async (formData) => {
        try {
            setError(null);
            const response = await axios.post('/api/auth/register', formData);
            return { success: true, data: response.data };

        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            return { success: false, error: message };
        }
    };
    const logout = async () => {
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
        setAccessToken(null);
        delete axios.defaults.headers.common["Authorization"];

        setUser(null);
        navigate("/login");

    };
    const forgotPassword = async (email) => {
        try {
            setError(null);
            const response = await axios.post('/api/password/request', { email });
            return { success: true, data: response.data };
        } catch (err) {
            const message = err.response?.data?.message || "Failed to send email";
            setError(message);
            return { success: false, error: message };
            
        }
    };

    const resetPassword = async (userId, token, newPassword) => {
        try {
            setError(null);
            const response = await axios.post('/api/password/confirm', {
                userId,
                token,
                newPassword
            });
            return { success: true, data: response.data };
        } catch (err) {
            const message = err.response?.data?.message || "Failed to reset password";
            setError(message);
            return { success: false, error: message };
        }
    };
    const updateProfile = async (updates) => {
        try {
            const response = await axios.put('/api/auth/profile', updates);
            const updatedUser = response.data.user;
            
            setUser(updatedUser);
            
            return { success: true, data: updatedUser };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to update profile';
            return { success: false, error: message };
        }
    };
    const hasRole = (roles) => {
        if (!user) return false;
        if (typeof roles === 'string') return user.role === roles;
        if (Array.isArray(roles)) return roles.includes(user.role);
        return false;
    };

    const canAccess = (requiredRoles) => {
        if (!user) return false;
        if (user.role === 'admin') return true; 
        return hasRole(requiredRoles);
    };

   
    
    const checkAuth = async () => {
        try {
            const refreshed = await axios.post("/api/auth/refresh", {}, {
                withCredentials: true
            });
    
            const { accessToken } = refreshed.data;
    
            setAccessToken(accessToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    
            const verifyRes = await axios.get("/api/auth/verify");
            setUser(verifyRes.data.user || null);
        } catch  {
            setAccessToken(null);
            delete axios.defaults.headers.common["Authorization"];
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    
      useEffect(() => {
        checkAuth();
      }, []);
    
    
    const value = {
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        hasRole,
        canAccess,
        isAuthenticated: !!user,
    };
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    
};
    
export { AuthContext };
export default AuthContext;