// frontend/src/components/Layout/Header/Header.jsx
import React from 'react';
import { useNotification } from "../../../context/useNotification";
import { useAuth } from '../../../context/useAuth';
import { showSuccess } from "../../../utils/toast";
import { useState } from 'react';
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from 'react-router-dom';

import {
    Menu, 
    MenuItem, 
    ListItemText,
    Button,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    Box,
    Avatar,
    ListItemIcon,
} from "@mui/material"
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    AccountCircle,
    Logout as LogoutIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[400], 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey[400], 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
}));

function Header({ onMenuClick }) {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
    const { user, logout, hasRole } = useAuth();
    const navigate = useNavigate();
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);

    // Notification menu handlers
    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    // Profile menu handlers
    const handleProfileClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };

    const handleLogout = async () => {
        handleProfileClose();
        if (window.confirm('Are you sure you want to logout?')) {
            await logout();
            showSuccess('Logged out successfully');
        }
    };

    const handleSettings = () => {
        handleProfileClose();
        if (hasRole('admin')) {
            navigate('/dashboard/settings');
        } else {
            navigate('/dashboard/profile');
        }
    };

    // Format time for notifications
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        
        if (diff < 60) return 'just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    // Get notification color based on type
    const getColor = (type) => {
        switch(type) {
            case 'success': return 'success.main';
            case 'error': return 'error.main';
            case 'warning': return 'warning.main';
            default: return 'info.main';
        }
    };

    return (
        <AppBar
            position="fixed"
            sx={(theme) => ({
                zIndex: theme.zIndex.drawer + 1,
                backgroundColor:
                    theme.palette.mode === "light"
                        ? theme.palette.background.paper
                        : theme.palette.background.default,
                color:
                    theme.palette.mode === "light"
                        ? theme.palette.text.primary
                        : theme.palette.text.primary,
                boxShadow: theme.palette.mode === "light"
                    ? "0 1px 3px rgba(0,0,0,0.12)"
                    : "0 1px 3px rgba(255,255,255,0.1)",
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ 
                        mr: 2, 
                        display: { sm: 'none' }
                    }}
                >
                    <MenuIcon />
                </IconButton>
                
                <Typography variant="h6" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Welcome Back, {user?.name || 'User'}!
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

                {/* Theme toggle */}
                <ThemeToggle />

                {/* Notification Bell */}
                <IconButton color="inherit" onClick={handleNotificationClick}>
                    <Badge badgeContent={unreadCount} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                {/* User Profile Menu */}
                <Box sx={{ ml: 2 }}>
                    <IconButton
                        onClick={handleProfileClick}
                        sx={{ p: 0.5 }}
                    >
                        <Avatar 
                            sx={{ 
                                width: 35, 
                                height: 35,
                                bgcolor: 'primary.main',
                                fontSize: '1rem'
                            }}
                        >
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                    </IconButton>
                </Box>

                {/* Profile Dropdown Menu */}
                <Menu
                    anchorEl={profileAnchorEl}
                    open={Boolean(profileAnchorEl)}
                    onClose={handleProfileClose}
                    PaperProps={{
                        sx: { 
                            width: 250,
                            mt: 1.5
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {/* User Info Section */}
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {user?.name || 'User'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user?.email || 'user@example.com'}
                        </Typography>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                display: 'inline-block',
                                mt: 0.5,
                                px: 1,
                                py: 0.25,
                                borderRadius: 1,
                                bgcolor: 'primary.light',
                                color: 'primary.contrastText'
                            }}
                        >
                            {user?.role?.toUpperCase() || 'VIEWER'}
                        </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <MenuItem onClick={() => { handleProfileClose(); navigate('/dashboard/profile'); }}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>My Profile</ListItemText>
                    </MenuItem>
                    
                    {hasRole('admin') && (
                        <MenuItem onClick={handleSettings}>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Settings</ListItemText>
                        </MenuItem>
                    )}
                    
                    <Divider />
                    
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography color="error">Logout</Typography>
                        </ListItemText>
                    </MenuItem>
                </Menu>

                {/* Notification Dropdown Menu */}
                <Menu
                    anchorEl={notificationAnchorEl}
                    open={Boolean(notificationAnchorEl)}
                    onClose={handleNotificationClose}
                    PaperProps={{
                        sx: { 
                            width: 360, 
                            maxHeight: 400,
                            overflow: 'auto'
                        }
                    }}
                >
                    {/* Header */}
                    <Box sx={{ 
                        px: 2, 
                        py: 1, 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h6">
                            Notifications {unreadCount > 0 && `(${unreadCount})`}
                        </Typography>
                        {unreadCount > 0 && (
                            <Button 
                                size="small" 
                                onClick={() => {
                                    markAllAsRead();
                                    showSuccess('All notifications marked as read');
                                }}
                            >
                                Mark all read
                            </Button>
                        )}
                    </Box>
                    
                    <Divider />
                    
                    {/* Notification List */}
                    {notifications.length === 0 ? (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography color="text.secondary">
                                No notifications yet
                            </Typography>
                        </Box>
                    ) : (
                        notifications.slice(0, 10).map((notif) => (
                            <MenuItem
                                key={notif.id}
                                onClick={() => {
                                    if (!notif.read) {
                                        markAsRead(notif.id);
                                    }
                                }}
                                sx={{
                                    backgroundColor: notif.read ? 'transparent' : 'action.hover',
                                    borderLeft: `3px solid`,
                                    borderLeftColor: getColor(notif.type),
                                }}
                            >
                                <ListItemText
                                    primary={notif.message}
                                    secondary={formatTime(notif.timestamp)}
                                    primaryTypographyProps={{
                                        fontSize: '0.875rem',
                                        fontWeight: notif.read ? 400 : 500,
                                    }}
                                    secondaryTypographyProps={{
                                        fontSize: '0.75rem',
                                    }}
                                />
                            </MenuItem>
                        ))
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Header;