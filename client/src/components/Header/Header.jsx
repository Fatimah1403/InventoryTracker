import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useState } from 'react';
import { showSuccess } from '../../utils/toast';
import ThemeToggle from "./ThemeToggle";


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
} from "@mui/material"
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    AccountCircle,
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
    // color: theme.palette.grey[500],
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      // transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
  }));
function Header({ onMenuClick, drawerWidth }) {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const [anchorEl, setAnchorEl] = useState(null);

    // Open/close notification dropdown
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // Format time (2m ago, 1h ago, etc.)
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // in seconds
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };
  // Get icon color based on type
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
                    display: { sm: 'none' }  // Only show on mobile
                  }}
                >
                  <MenuIcon />
              </IconButton>
                  <Typography variant="h6" noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Welcome Back!
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

                  <IconButton color="inherit">
                    <AccountCircle />
                  </IconButton>
                  {/* Notification Bell with Badge */}
                  <IconButton color="inherit" onClick={handleClick}>
                    <Badge badgeContent={unreadCount} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  {/* Notification Dropdown Menu */}
                    <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
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