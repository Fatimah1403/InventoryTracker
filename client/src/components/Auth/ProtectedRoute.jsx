import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { user, loading, canAccess } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requiredRoles.length > 0 && !canAccess(requiredRoles)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
export default ProtectedRoute;
