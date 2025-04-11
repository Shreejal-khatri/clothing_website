import React from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalTitle}>Login or Register</h2>
        <p style={styles.modalText}>You need to log in or register to continue.</p>
        <div style={styles.buttonContainer}>
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
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  modalTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#333",
  },
  modalText: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#666",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  loginButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    flex: 1,
  },
  registerButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    flex: 1,
  },
  closeButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "10px",
    width: "100%",
  },
};

export default LoginModal;