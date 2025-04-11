import React, { useEffect, useState } from 'react';
import { Settings, LogOut, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSettings = () => {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(currentUser);
    if (currentUser === null) {
      navigate('/admin/login'); // Redirect to login if no currentUser is found
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login'); // Redirect to login page after logout
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 size={32} className="animate-spin" />
        <p>Loading admin data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        <Settings size={24} /> Admin Settings
      </h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Profile Information</h3>
        <div style={styles.profileCard}>
          <div style={styles.profileInfo}>
            <h4 style={styles.username}>{currentUser?.username || 'Admin'}</h4>
            <p style={styles.detail}><strong>Role:</strong> {currentUser?.role || 'Administrator'}</p>
          </div>
        </div>
      </div>

      <div style={styles.logoutSection}>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '2rem auto',
  },
  header: {
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.2rem',
    color: '#222',
  },
  detail: {
    margin: '0.25rem 0',
    color: '#555',
  },
  logoutSection: {
    marginTop: '2rem',
    textAlign: 'right',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    gap: '1rem',
  },
};

export default AdminSettings;
