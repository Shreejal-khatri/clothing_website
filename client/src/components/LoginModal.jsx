import React from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        {/* Close Button */}
        <button style={styles.closeButton} onClick={onClose}>
          &times; {/* Close icon (×) */}
        </button>

        {/* Modal Content */}
        <div style={styles.modalBody}>
          {/* Left Side: Image */}
          <div style={styles.imageContainer}>
            <img
              src="/assets/popup_image.jpg" // Path to the image in the public/assets folder
              alt="Welcome"
              style={styles.image}
            />
          </div>

          {/* Right Side: Buttons */}
          <div style={styles.buttonContainer}>
            <h2 style={styles.modalTitle}>Welcome to KhatriShops</h2>
            <p style={styles.modalText}>
              Please log in or register to continue shopping.
            </p>
            <button
              style={styles.loginButton}
              onClick={() => navigate("/login")} // Redirect to login page
            >
              Login
            </button>
            <button
              style={styles.registerButton}
              onClick={() => navigate("/register")} // Redirect to register page
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    width: "700px", // Increased width to accommodate the image
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    position: "relative",
    animation: "fadeIn 0.3s ease-in-out", // Add animation
  },
  modalBody: {
    display: "flex",
    alignItems: "stretch",
    height: "100%",
  },
  imageContainer: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  buttonContainer: {
    flex: 1,
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: "1.8rem",
    marginBottom: "15px",
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: "1rem",
    marginBottom: "25px",
    color: "#666",
    lineHeight: "1.5",
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    width: "100%",
    marginBottom: "10px",
    transition: "background-color 0.3s, transform 0.2s",
  },
  registerButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    width: "100%",
    transition: "background-color 0.3s, transform 0.2s",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "transparent",
    color: "#666",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "color 0.3s",
  },
};

// Add CSS animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }`,
  styleSheet.cssRules.length
);

export default LoginModal;