// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Toaster } from "react-hot-toast";


// Context Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { useThemeMode } from './context/useThemeMode';
import { useAuth } from './context/useAuth';

// Layout
import Layout from './components/Layout/Layout';

// Auth Components
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Unauthorized from './pages/auth/Unauthorized';

// App Pages
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ComingSoon from './pages/ComingSoon';

// Landing Page Component
function LandingRedirect() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // If authenticated, go to dashboard, otherwise go to login
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

function App() {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
            <Toaster position="top-right" />

        
          <AuthProvider>
            <NotificationProvider>
              <Routes>
                {/* Landing page - redirects based on auth status */}
                <Route path="/" element={<LandingRedirect />} />
                
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Dashboard Layout */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  {/* Dashboard Home */}
                  <Route index element={<Dashboard />} />
                  
                  {/* Products - All authenticated users can view */}
                  <Route path="products" element={<Products />} />
                  
                  {/* Add Product - Only admin and manager */}
                  <Route 
                    path="products/add" 
                    element={
                      <ProtectedRoute requiredRoles={['admin', 'manager']}>
                        <AddProduct />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Edit Product - Only admin and manager */}
                  <Route 
                    path="products/edit/:id" 
                    element={
                      <ProtectedRoute requiredRoles={['admin', 'manager']}>
                        <EditProduct />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route path="orders" element={<ComingSoon pageName="Orders" />} />
                  
                  {/* Purchase - Only admin and manager */}
                  <Route 
                    path="purchase" 
                    element={
                      <ProtectedRoute requiredRoles={['admin', 'manager']}>
                        <ComingSoon pageName="Purchase" />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route path="reporting" element={<ComingSoon pageName="Reporting" />} />
                  
                  <Route path="support" element={<ComingSoon pageName="Support" />} />
                  
                  {/* Settings - Only admin */}
                  <Route 
                    path="settings" 
                    element={
                      <ProtectedRoute requiredRoles={['admin']}>
                        <ComingSoon pageName="Settings" />
                      </ProtectedRoute>
                    } 
                  />
                </Route>

                {/* Legacy routes for compatibility */}
                <Route path="/products" element={<Navigate to="/dashboard/products" replace />} />
                <Route path="/add-product" element={<Navigate to="/dashboard/products/add" replace />} />
                <Route path="/edit-product/:id" element={<Navigate to="/dashboard/products/edit/:id" replace />} />

                {/* Catch all - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </NotificationProvider>
          </AuthProvider>
        
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;