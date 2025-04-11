import React, { useState, useEffect } from "react";
import { FaHeart, FaUserCircle, FaBars, FaBell, FaExchangeAlt, FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { cart } = useCart();
  const { unreadCount } = useNotification();
  const [notificationCount, setNotificationCount] = useState(unreadCount);
  const navigate = useNavigate();

  // Update the notification count whenever unreadCount changes
  useEffect(() => {
    setNotificationCount(unreadCount);
  }, [unreadCount]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.name || "User",
          email: parsedUser.email || "",
          picture: parsedUser.picture || null
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser({ name: "User", email: "", picture: null });
      }
    }
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleProtectedAction = (path) => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.brand}>KhatriShops</Link>
        
        <button style={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>

        <ul style={{ ...styles.navLinks, display: menuOpen ? "flex" : "none" }}>
          <li><Link to="/" style={styles.navLink}>Home</Link></li>
          <li><Link to="/shop" style={styles.navLink}>Shop</Link></li>
          <li><Link to="/new-arrivals" style={styles.navLink}>New Arrivals</Link></li>
          <li><Link to="/contact" style={styles.navLink}>Contact</Link></li>
        </ul>

        <div style={styles.navRight}>
          <div 
            style={styles.exchangeIcon} 
            onClick={() => handleProtectedAction("/item-exchange")}
          >
            <FaExchangeAlt />
          </div>

          <div 
            style={styles.orderStatusIcon} 
            onClick={() => handleProtectedAction("/order-status")}
          >
            <FaClipboardList />
          </div>

          <div 
            style={styles.cartIcon} 
            onClick={() => handleProtectedAction("/cart")}
          >
            <img src="/assets/shopping-cart.png" alt="Cart" style={styles.cartImage} />
            {cartItemCount > 0 && <span style={styles.cartBadge}>{cartItemCount}</span>}
          </div>

          <div 
            style={styles.heartIcon} 
            onClick={() => handleProtectedAction("/favourites")}
          >
            <FaHeart />
          </div>

          <div style={styles.notificationIcon}>
            <div 
              style={styles.bellLink} 
              onClick={() => handleProtectedAction("/notifications")}
            >
              <FaBell style={{
                color: notificationCount > 0 ? "#ff0000" : "#333",
                fontSize: "1.3rem",
                transition: "color 0.2s ease"
              }} />
              {notificationCount > 0 && (
                <span style={styles.notificationBadge}>
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </div>
          </div>

          {user ? (
            <div style={styles.profileContainer} onClick={() => navigate("/profile")}>
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt="Profile" 
                  style={styles.profileImage} 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div style={styles.initials}>
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>
          ) : (
            <div 
              style={styles.loginLink} 
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLoginSuccess={() => {
            setShowLoginModal(false);
            // You might want to refresh user data here
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          }}
        />
      )}
    </>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    textDecoration: "none",
  },
  menuToggle: {
    display: "none",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    '@media (max-width: 768px)': {
      display: "block",
    },
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    '@media (max-width: 768px)': {
      flexDirection: "column",
      position: "absolute",
      top: "60px",
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
  },
  navLink: {
    margin: "0 15px",
    color: "#333",
    textDecoration: "none",
    fontSize: "1rem",
    '@media (max-width: 768px)': {
      padding: "15px",
      borderBottom: "1px solid #eee",
    },
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  exchangeIcon: {
    color: "#333",
    fontSize: "1.2rem",
    cursor: "pointer",
    "&:hover": {
      color: "#6a11cb",
    },
  },
  orderStatusIcon: {
    color: "#333",
    fontSize: "1.2rem",
    cursor: "pointer",
    "&:hover": {
      color: "#6a11cb",
    },
  },
  cartIcon: {
    position: "relative",
    cursor: "pointer",
  },
  cartImage: {
    width: "24px",
    height: "24px",
  },
  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    backgroundColor: "red",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "0.7rem",
    fontWeight: "bold",
  },
  heartIcon: {
    color: "red",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  notificationIcon: {
    position: "relative",
  },
  bellLink: {
    color: "inherit",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  notificationBadge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    fontWeight: "bold",
  },
  profileContainer: {
    cursor: "pointer",
  },
  profileImage: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #eee",
  },
  initials: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#6a11cb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  loginLink: {
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
};