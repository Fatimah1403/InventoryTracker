import React, { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const NotificationContext = createContext();


export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState(() => {
        // Load from local storage wen app starts
        const saved = localStorage.getItem('notifications');
        return saved ? JSON.parse(saved) : [];
    })

   
  const [unreadCount, setUnreadCount] = useState(0);

   // Save to localStorage whenever notifications change
   useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    // Update unread cout
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);


  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(), 
      message,
      type, 
      timestamp: new Date().toISOString(),
      read: false
    };
    
   
    setNotifications(prev => [newNotification, ...prev]);
  };
  // Mark one notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => 
        notif.id === id 
          ? { ...notif, read: true } 
          : notif 
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