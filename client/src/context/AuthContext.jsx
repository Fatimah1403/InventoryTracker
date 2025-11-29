import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const login = async (email, password, rememberMe = false) => {
        try {
            setError(null);
            const response = await axios.post('/api/auth/login', { email, password });
            
            const { token, user: userData } = response.data;

            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            localStorage.removeItem("user");
            sessionStorage.removeItem("user")
            
            // Store token and user data
            if (rememberMe) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user', JSON.stringify(userData));
            }
            
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
            
            // Auto-login after registration
            if (response.data.user) {
                await login(formData.email, formData.password, true);
            }
            
            return { success: true, data: response.data };
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            setError(message);
            return { success: false, error: message };
        }
    };
    const logout = async () => {
        // Clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        delete axios.defaults.headers.common['Authorization'];
        
        setUser(null);
        navigate('/login');
    };
    const forgotPassword = async (email) => {
        try {
            setError(null);
            const response = await axios.post('/api/password/request', { email });
            return { success: true, data: response.data };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to send reset email';
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
            const message = err.response?.data?.message || 'Failed to reset password';
            setError(message);
            return { success: false, error: message };
        }
    };
    const updateProfile = async (updates) => {
        try {
            const response = await axios.put('/api/auth/profile', updates);
            const updatedUser = response.data.user;
            
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
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
    

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    await logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
        return () => axios.interceptors.response.eject(interceptor);
        
    }, [navigate]);

    const checkAuth = () => {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
    
        const userData =
          localStorage.getItem("user") || sessionStorage.getItem("user");
    
        if (!token || !userData) {
            setLoading(false);
            return;
        }
    
        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
    
            axios.get("/api/auth/verify").catch(() => {
                logout(false);
            });
        } catch (error) {
            logout(false);
        }
    
        setLoading(false);
    };
    
    
    const value = {
        user,
        loading,
        error,
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
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;