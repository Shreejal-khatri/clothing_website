const styles = {
  heroSection: {
    background: "linear-gradient(45deg, #6a11cb, #2575fc)",
    color: "#fff",
    padding: "100px 20px",
    textAlign: "center",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  heroSubtitle: {
    fontSize: "20px",
    fontWeight: "300",
  },
  profileContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    backgroundColor: "#f5f5f5",
    minHeight: "calc(100vh - 560px)", // Adjust based on your header/footer height
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
    position: "relative",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "25px",
    border: "4px solid #fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
    objectFit: "cover",
  },
  initialsAvatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    backgroundColor: "#6a11cb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "25px",
    margin: "0 auto",
  },
  userDetails: {
    textAlign: "center",
    marginBottom: "20px",
  },
  userName: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  userInfo: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#555",
  },
  backButton: {
    backgroundColor: "#2575fc",
    color: "#fff",
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    color: "#fff",
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      if (parsedUser.picture) {
        setUser(parsedUser);
      } else {
        axios
          .get(`http://localhost:3000/profile?email=${parsedUser.email}`)
          .then((response) => {
            setUser(response.data);
            setEditedUser({
              name: response.data.name,
              phone: response.data.phone || "",
              address: response.data.address || ""
            });
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
          });
      }
    } else {
      navigate("/login");
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset edited values to original
    setEditedUser({
      name: user.name,
      phone: user.phone || "",
      address: user.address || ""
    });
  };

  const handleSave = () => {
    axios
      .put("http://localhost:3000/profile", {
        email: user.email,
        name: editedUser.name,
        phone: editedUser.phone,
        address: editedUser.address
      })
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
        // Update localStorage if needed
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && !storedUser.picture) {
          localStorage.setItem("user", JSON.stringify({
            ...storedUser,
            name: response.data.name
          }));
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to Your Profile</h1>
          <p style={styles.heroSubtitle}>
            Here you can view and manage your personal information.
          </p>
        </div>
      </div>
      <div style={styles.profileContainer}>
        <div style={styles.profileCard}>
          {user?.picture ? (
            <img 
              src={user.picture} 
              alt="Profile" 
              style={styles.profileImage} 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div style={styles.initialsAvatar}>
              {user?.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle size={80} />}
            </div>
          )}

          {user && (
            <div style={styles.userDetails}>
              {isEditing ? (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={editedUser.address}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h1 style={styles.userName}>{user.name}</h1>
                  <p style={styles.userInfo}><strong>Email:</strong> {user.email}</p>
                  {user.phone && <p style={styles.userInfo}><strong>Phone:</strong> {user.phone}</p>}
                  {user.address && <p style={styles.userInfo}><strong>Address:</strong> {user.address}</p>}
                </>
              )}
            </div>
          )}

          <div style={styles.buttonContainer}>
            {!user?.picture && (
              isEditing ? (
                <>
                  <button style={styles.saveButton} onClick={handleSave}>
                    <FaSave style={{ marginRight: 8 }} /> Save
                  </button>
                  <button style={styles.cancelButton} onClick={handleCancel}>
                    <FaTimes style={{ marginRight: 8 }} /> Cancel
                  </button>
                </>
              ) : (
                <button style={styles.editButton} onClick={handleEdit}>
                  <FaEdit style={{ marginRight: 8 }} /> Edit Profile
                </button>
              )
            )}
            <button style={styles.backButton} onClick={handleBackToHome}>
              Back to Home
            </button>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

