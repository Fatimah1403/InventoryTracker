import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { useThemeMode } from './context/ThemeContext';

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
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ComingSoon from './pages/ComingSoon';

function App() {
  // Get theme from ThemeContext
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
          <AuthProvider>
            <NotificationProvider>
              <Routes>

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Products />} />

                  <Route
                    path="products/add"
                    element={
                      <ProtectedRoute requiredRoles={['admin', 'manager']}>
                        <AddProduct />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="products/edit/:id"
                    element={
                      <ProtectedRoute requiredRoles={['admin', 'manager']}>
                        <EditProduct />
                      </ProtectedRoute>
                    }
                  />

                  {/* Placeholder for unfinished pages */}
                  <Route path="coming-soon" element={<ComingSoon />} />
                </Route>

                {/* Default redirect */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </NotificationProvider>
          </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
