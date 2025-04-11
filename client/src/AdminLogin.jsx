import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', {
        username,
        password,
      });

      const { token, admin } = response.data;
      login(token, admin);
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
      
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            errorMessage = 'Invalid username or password';
            break;
          case 403:
            errorMessage = 'Account disabled or access denied';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>K</div>
          <h1 style={styles.title}>KhatriShops Admin Portal</h1>
        </div>
        
        <p style={styles.subtitle}>Enter your credentials to continue</p>
        
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              style={isLoading ? {...styles.input, ...styles.disabledInput} : styles.input}
              placeholder="Username"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              style={isLoading ? {...styles.input, ...styles.disabledInput} : styles.input}
              placeholder="Password"
            />
          </div>
          
          {error && (
            <div style={styles.errorContainer}>
              <div style={styles.errorIcon}>!</div>
              <span style={styles.error}>{error}</span>
            </div>
          )}
          
          <button 
            type="submit" 
            style={isLoading ? {...styles.loginButton, ...styles.loginButtonLoading} : styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span style={styles.spinner}></span> Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '25px',
  },
  logo: {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    borderRadius: '8px',
    backgroundColor: '#dc3545',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#212529',
    margin: '0 0 5px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6c757d',
    textAlign: 'center',
    margin: '0 0 25px 0',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#495057',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '14px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    backgroundColor: 'white',
    transition: 'border-color 0.15s ease-in-out',
    ':focus': {
      outline: 'none',
      borderColor: '#dc3545',
      boxShadow: '0 0 0 2px rgba(220, 53, 69, 0.25)',
    },
  },
  disabledInput: {
    backgroundColor: '#e9ecef',
    cursor: 'not-allowed',
  },
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
    marginBottom: '20px',
    border: '1px solid #f5c6cb',
  },
  errorIcon: {
    width: '20px',
    height: '20px',
    lineHeight: '20px',
    borderRadius: '50%',
    backgroundColor: '#dc3545',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: '10px',
    fontSize: '14px',
  },
  error: {
    color: '#721c24',
    fontSize: '14px',
  },
  loginButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    ':hover': {
      backgroundColor: '#c82333',
    },
    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.5)',
    },
  },
  loginButtonLoading: {
    backgroundColor: '#bd2130',
    cursor: 'not-allowed',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: 'white',
    animation: 'spin 1s linear infinite',
    marginRight: '8px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
    paddingTop: '15px',
    borderTop: '1px solid #dee2e6',
  },
  footerLink: {
    color: '#6c757d',
    fontSize: '13px',
    textDecoration: 'none',
    ':hover': {
      color: '#dc3545',
      textDecoration: 'underline',
    },
  },
};

export default AdminLogin;