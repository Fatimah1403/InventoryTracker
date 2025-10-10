import React from 'react';
import { useState } from 'react';
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

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/products' },
    { text: 'Orders', icon: <OrdersIcon />, path: '/orders' },
    { text: 'Purchase', icon: <PurchaseIcon />, path: '/purchase' },
    { text: 'Reporting', icon: <ReportingIcon />, path: '/reporting' },
    { text: 'Support', icon: <SupportIcon />, path: '/support' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];


function Sidebar({ mobileOpen, handleDrawerToggle, drawerWidth }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [user] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {
          name: 'Admin User',
          email: 'fattyhassan@gmail.com',
          initials: 'FK'
        };
    });
      const handleLogout = () => {
        if (window.confirm('Return to dashboard?')) {
          window.location.href = '/'; 
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
                        }}
                        src="/avatar-placeholder.png"
                        >
                        {user.initials}
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
                        {user.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {user.email}
                    </Typography>
                </Box>
                
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                
                {/* Navigation Menu */}
                <List sx={{ px: 1, py: 2 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{  mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
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
                                    slotProps={{  
                                        fontSize: '0.95rem',
                                        fontWeight: location.pathname === item.path ? 600 : 400,
                                        color: '#fff',
                                    }}
                                />

                            </ListItemButton>

                        </ListItem>

                    ))}

                </List>
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
                    color: '#FFFFFF', // 
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

    )
}
export default Sidebar;