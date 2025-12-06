import { useContext } from 'react'; // Ensure useContext is imported
import { NotificationContext } from './NotificationContext'; // Adjust the path as necessary

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
  };