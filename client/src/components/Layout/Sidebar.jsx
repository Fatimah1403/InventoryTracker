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
import { useAuth } from "../../context/useAuth";

function Sidebar({ mobileOpen, handleDrawerToggle, drawerWidth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasRole } = useAuth();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['admin','manager','viewer'] },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/dashboard/products', roles: ['admin','manager','viewer'] },
    { text: 'Orders', icon: <OrdersIcon />, path: '/dashboard/orders', roles: ['admin','manager','viewer'] },
    { text: 'Purchase', icon: <PurchaseIcon />, path: '/dashboard/purchase', roles: ['admin','manager'] },
    { text: 'Reporting', icon: <ReportingIcon />, path: '/dashboard/reporting', roles: ['admin','manager','viewer'] },
    { text: 'Support', icon: <SupportIcon />, path: '/dashboard/support', roles: ['admin','manager','viewer'] },
    { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings', roles: ['admin'] },
  ];

  const visibleMenuItems = menuItems.filter(item =>
    item.roles.includes(user?.role || 'viewer')
  );

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'manager': return 'warning';
      case 'viewer': return 'info';
      default: return 'default';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return '👑';
      case 'manager': return '👔';
      case 'viewer': return '👀';
      default: return '👤';
    }
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", overflowY: 'auto' }}>
      <Box sx={{ flexGrow: 1 }}>
        {/* PROFILE */}
        <Box sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.1)"
        }}>
          <Avatar sx={{ width: 80, height: 80, mb: 2, fontSize: "2rem" }}>
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </Avatar>

          <Typography variant="h6" sx={{ color: "white" }}>
            {user?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "#ddd" }}>
            {user?.email}
          </Typography>

          <Chip
            label={`${getRoleIcon(user?.role)} ${user?.role}`}
            color={getRoleColor(user?.role)}
            sx={{ mt: 1, color: "white", textTransform: "capitalize" }}
          />
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

        {/* MENU */}
        <List sx={{ px: 1 }}>
          {visibleMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (mobileOpen) handleDrawerToggle();
                }}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: "8px",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.2)"
                  }
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ color: "white" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* LOGOUT */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="text"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ color: "white" }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* MOBILE SIDEBAR */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#4A6B7C"
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* DESKTOP SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#4A6B7C",
            marginTop: "64px"
          }
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Sidebar;
