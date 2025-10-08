
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#4A6B7C', // Teal/blue-gray color from your sidebar
          light: '#5A7B8C',
          dark: '#3A5B6C',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#3498DB', // Bright blue for accents
        },
        success: {
          main: '#4CAF50', // Green for success states
          light: '#81C784',
        },
        warning: {
          main: '#FF9800', // Orange for warnings
        },
        error: {
          main: '#F44336', // Red for out of stock
        },
        background: {
          default: '#F5F7FA', // Light gray background
          paper: '#FFFFFF',
        },
        text: {
          primary: '#2C3E50',
          secondary: '#7F8C8D',
        },
      },
      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
          fontWeight: 600,
          color: '#2C3E50',
        },
        h6: {
          fontWeight: 500,
        },
      },
      components: {
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: '#4A6B7C',
              color: '#FFFFFF',
              '& .MuiListItemButton-root': {
                color: '#FFFFFF', // text
                '& .MuiListItemIcon-root': {
                  color: '#FFFFFF',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  '& .MuiListItemIcon-root': {
                    color: '#FFFFFF',
                  },
                },
              },
              '& .MuiListItemText-primary': {
                color: '#FFFFFF',
              },
              '& .MuiSvgIcon-root': {
                color: '#FFFFFF',
              },
            },
          },
        },
      },
      
});