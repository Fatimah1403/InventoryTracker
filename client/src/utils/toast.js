
import toast from 'react-hot-toast';

// Success notification
export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      border: '1px solid #4CAF50',
      padding: '12px',
      color: '#4CAF50',
      fontWeight: 500,
    },
    iconTheme: {
      primary: '#4CAF50',
      secondary: '#FFFFFF',
    },
  });
};

// Error notification
export const showError = (message) => {
  toast.error(message, {
    style: {
      border: '1px solid #F44336',
      padding: '12px',
      color: '#F44336',
      fontWeight: 500,
    },
    iconTheme: {
      primary: '#F44336',
      secondary: '#FFFFFF',
    },
  });
};
