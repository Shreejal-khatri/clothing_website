import { useEffect } from "react";
import { FaBell, FaRegBell, FaTrash } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useNotification } from "./context/NotificationContext";
import { io } from "socket.io-client";

const Notification = () => {
  const { notifications, setNotifications, lastSeenId, setLastSeenId, unreadCount, markAsRead, clearNotifications, isConnected } = useNotification();

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected!");
      // newSocket.emit("request-notifications", lastSeenId);
    });

    newSocket.on("initial-notifications", (initialNotifications) => {
      if (initialNotifications.length > 0) {
        const newNotifications = [...initialNotifications, ...notifications];
        setNotifications(newNotifications);
        setLastSeenId(initialNotifications[0].id);
      }
    });

    newSocket.on("notification", (newNotification) => {
      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      setLastSeenId(newNotification.id);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [notifications, setNotifications, lastSeenId, setLastSeenId]);

  const handleMarkAsRead = (id) => {
    markAsRead(id);
  };

  const handleClearAll = () => {
    clearNotifications();
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      <div style={styles.contentContainer}>
        <div style={styles.header}>
          <h2 style={styles.title}>Notifications</h2>
          <div style={styles.headerActions}>
            {unreadCount > 0 && (
              <div style={styles.notificationBadge}>
                <FaBell size={18} color="red"/>
                <span style={styles.badgeCount}>{unreadCount}</span>
              </div>
            )}
            {notifications.length > 0 && (
              <button onClick={handleClearAll} style={styles.clearButton}>
                <FaTrash size={14} style={{ marginRight: 8 }} />
                Clear All
              </button>
            )}
          </div>
        </div>
        
        <div style={styles.notificationsWrapper}>
          {notifications.length === 0 ? (
            <div style={styles.emptyState}>
              <FaRegBell size={48} style={styles.emptyIcon} />
              <p style={styles.emptyText}>No notifications yet</p>
              <p style={styles.emptySubtext}>We'll notify you when something arrives</p>
            </div>
          ) : (
            <div style={styles.notificationsList}>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    ...styles.notificationCard,
                    backgroundColor: notification.read ? '#ffffff' : '#f8f9fa',
                    borderLeft: notification.read ? '4px solid transparent' : '4px solid #3498db',
                  }}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div style={styles.cardHeader}>
                    <span style={styles.brandName}>KhatriShops</span>
                    <span style={styles.notificationTime}>
                      {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p style={styles.message}>{notification.message}</p>
                  <div style={styles.cardFooter}>
                    <span style={styles.notificationDate}>
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </span>
                    {!notification.read && <span style={styles.unreadBadge}>New</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
  },
  contentContainer: {
    flex: 1,
    padding: '2rem 5%',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    color: '#2c3e50',
    margin: 0,
    fontWeight: '600',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#c0392b',
    },
  },
  notificationsWrapper: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
    minHeight: '60vh',
    overflow: 'hidden',
  },
  notificationsList: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  notificationCard: {
    padding: '1.25rem',
    borderRadius: '8px',
    border: '1px solid #eaeaea',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #f0f0f0',
  },
  brandName: {
    fontWeight: '700',
    color: '#2c3e50',
    fontSize: '1rem',
  },
  notificationTime: {
    color: '#7f8c8d',
    fontSize: '0.8rem',
  },
  message: {
    margin: '0.5rem 0',
    color: '#2c3e50',
    fontSize: '0.95rem',
    lineHeight: '1.5',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.75rem',
  },
  notificationDate: {
    color: '#95a5a6',
    fontSize: '0.8rem',
  },
  unreadBadge: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  notificationBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#000',
    padding: '0.5rem 1rem',
    borderRadius: '50px',
    color: 'red',
    fontWeight: '600',
  },
  badgeCount: {
    fontSize: '0.9rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    color: '#95a5a6',
    textAlign: 'center',
  },
  emptyIcon: {
    marginBottom: '1rem',
    opacity: 0.5,
  },
  emptyText: {
    fontSize: '1.2rem',
    fontWeight: '500',
    margin: '0.5rem 0',
    color: '#7f8c8d',
  },
  emptySubtext: {
    fontSize: '0.9rem',
    margin: 0,
    color: '#bdc3c7',
  },
};

export default Notification;