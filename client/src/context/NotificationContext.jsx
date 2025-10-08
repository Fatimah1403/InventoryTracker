import React, { createContext, useContext, useState, useEffect } from 'react';

// to create a global storage for notification
const NotificationContext = createContext();

// Custom hook to use the NotificationContext
export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState(() => {
        // Load from local storage wen app starts
        const saved = localStorage.getItem('notifications');
        return saved ? JSON.parse(saved) : [];
    })

    // Count of unread notifications (for the badge)
  const [unreadCount, setUnreadCount] = useState(0);

   // Save to localStorage whenever notifications change
   useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    // Update unread count
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Function to add a new notification
  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(), // Unique ID
      message,
      type, // 'success', 'warning', 'error', 'info'
      timestamp: new Date().toISOString(),
      read: false, // Starts as unread
    };
    
    // Add to beginning of array (newest first)
    setNotifications(prev => [newNotification, ...prev]);
  };
  // Mark one notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => 
        notif.id === id 
          ? { ...notif, read: true } // Mark this one as read
          : notif // Leave others unchanged
      )
    );
  };
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Provide these to all child components
  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearAll,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}