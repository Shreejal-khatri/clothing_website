import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastClearedId, setLastClearedId] = useState(
    parseInt(localStorage.getItem('lastClearedId')) || 0
  );
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Calculate unread count - using memoization for performance
  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read && n.id > lastClearedId).length;
  }, [notifications, lastClearedId]);

  // Initialize socket connection
  useEffect(() => {
    // Prevent multiple socket connections
    if (socket) return;

    const newSocket = io("http://localhost:3000", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'],  // Prefer WebSocket transport
    });

    newSocket.on("connect", () => {
      console.log("Socket connected!");
      setIsConnected(true);
      // Request notifications after connecting
      // newSocket.emit('request-notifications', lastClearedId);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection Error:", err);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.off("connect");
        newSocket.off("disconnect");
        newSocket.off("connect_error");
        newSocket.disconnect();
      }
    };
  }, []);

  // Setup notification listeners after socket connection is established
  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNewNotification = (data) => {
      console.log("New notification received:", data);
      setNotifications(prev => {
        // Check for duplicates based on message and timestamp
        const isDuplicate = prev.some(n => 
          n.message === data.message && 
          Math.abs(new Date(n.timestamp) - new Date(data.timestamp)) < 1000
        );
        
        if (isDuplicate) return prev;
        
        // Add unique ID if not provided
        const notificationId = data.id || Date.now();
        
        return [{
          id: notificationId,
          type: data.type || 'info',
          message: data.message,
          timestamp: data.timestamp || new Date().toISOString(),
          meta: data,
          read: false
        }, ...prev];
      });
    };

    const handleInitialNotifications = (initialNotes) => {
      console.log("Initial notifications received:", initialNotes);
      if (!Array.isArray(initialNotes)) {
        console.error("Received invalid initial notifications format:", initialNotes);
        return;
      }

      setNotifications(prev => {
        // Filter out duplicates and notifications older than lastClearedId
        const newNotes = initialNotes
          .filter(n => n.id > lastClearedId)
          .filter(newNote => !prev.some(existingNote => existingNote.id === newNote.id));
        
        return [...newNotes, ...prev];
      });
    };

    // Setup listeners
    socket.on("notification", handleNewNotification);
    socket.on("initial-notifications", handleInitialNotifications);

    // Request notifications again if we reconnect
    socket.emit('request-notifications', lastClearedId);

    return () => {
      socket.off("notification", handleNewNotification);
      socket.off("initial-notifications", handleInitialNotifications);
    };
  }, [socket, isConnected, lastClearedId]);

  // Save notifications and lastClearedId to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('lastClearedId', lastClearedId.toString());
  }, [lastClearedId]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? {...n, read: true} : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({...n, read: true}))
    );
  };

  const clearNotifications = () => {
    const newestId = notifications.length > 0 
      ? Math.max(...notifications.map(n => n.id)) 
      : Date.now();
    
    setLastClearedId(newestId);
    setNotifications([]);
    
    if (socket && isConnected) {
      socket.emit("clear-notifications", newestId);
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      clearNotifications,
      isConnected
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};