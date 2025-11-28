// frontend/src/components/Layout/Sidebar.jsx
import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Box,
    Typography,
    Divider,
    Button,
    Chip
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    ShoppingCart as OrdersIcon,
    AddBox as PurchaseIcon,
    Assessment as ReportingIcon,
    Support as SupportIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RoleBasedComponent from '../Auth/RoleBasedComponent';

function Sidebar({ mobileOpen, handleDrawerToggle, drawerWidth }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, hasRole } = useAuth();

    // Menu items with role restrictions
    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/', roles: ['admin', 'manager', 'viewer'] },
        { text: 'Inventory', icon: <InventoryIcon />, path: '/products', roles: ['admin', 'manager', 'viewer'] },
        { text: 'Orders', icon: <OrdersIcon />, path: '/orders', roles: ['admin', 'manager', 'viewer'] },
        { text: 'Purchase', icon: <PurchaseIcon />, path: '/purchase', roles: ['admin', 'manager'] },
        { text: 'Reporting', icon: <ReportingIcon />, path: '/reporting', roles: ['admin', 'manager', 'viewer'] },
        { text: 'Support', icon: <SupportIcon />, path: '/support', roles: ['admin', 'manager', 'viewer'] },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings', roles: ['admin'] },
    ];

    // Filter menu items based on user role
    const visibleMenuItems = menuItems.filter(item => 
        hasRole(item.roles)
    );
    

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            await logout();
        }
    };

    const getRoleColor = (role) => {
        switch(role) {
            case 'admin': return 'error';
            case 'manager': return 'warning';
            case 'viewer': return 'info';
            default: return 'default';
        }
    };

    const getRoleIcon = (role) => {
        switch(role) {
            case 'admin': return '👑';
            case 'manager': return '👔';
            case 'viewer': return '👀';
            default: return '👤';
        }
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                {/* User profile Section */}
                <Box
                    sx={{
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mb: 2,
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            bgcolor: 'primary.main',
                            fontSize: '2rem'
                        }}
                    >
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
                        {user?.name || 'User'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                        {user?.email || 'user@example.com'}
                    </Typography>
                    <Chip 
                        label={`${getRoleIcon(user?.role)} ${user?.role || 'viewer'}`}
                        color={getRoleColor(user?.role)}
                        size="small"
                        sx={{ 
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                        }}
                    />
                </Box>
                
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                
                {/* Navigation Menu */}
                <List sx={{ px: 1, py: 2 }}>
                    {visibleMenuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path);
                                    if (mobileOpen) handleDrawerToggle();
                                }}
                                selected={location.pathname === item.path}
                                sx={{
                                    borderRadius: '8px',
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        },
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text}
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            fontSize: '0.95rem',
                                            fontWeight: location.pathname === item.path ? 600 : 400,
                                            color: '#fff',
                                        }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                {/* Role-specific info */}
                {user?.role && (
                    <Box sx={{ px: 2, py: 1 }}>
                        <Box 
                            sx={{ 
                                p: 2, 
                                borderRadius: 1, 
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                Access Level:
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'white', mt: 0.5 }}>
                                {user.role === 'admin' && 'Full System Access'}
                                {user.role === 'manager' && 'Inventory Management'}
                                {user.role === 'viewer' && 'View Only Access'}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>
    
            {/* Logout Button */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Button
                    fullWidth
                    variant="text"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                        color: 'white',
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: "#476675",
                        color: 'white',
                    },
                }}
            >
                {drawer}
            </Drawer>
            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#4A6B7C',
                        marginTop: '64px',
                        color: '#FFFFFF',
                        '& .MuiListItemIcon-root': {
                            color: '#FFFFFF',
                        },
                        '& .MuiListItemText-primary': {
                            color: '#FFFFFF',
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#FFFFFF',
                        }
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default Sidebar;