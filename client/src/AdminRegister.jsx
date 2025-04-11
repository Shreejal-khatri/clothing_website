import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/admin/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess('Admin registered successfully!');
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      }
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = 'Validation error. Please check your inputs.';
            break;
          case 409:
            errorMessage = 'Username or email already exists';
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
        
        <p style={styles.subtitle}>Create your admin account</p>
        
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
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              style={isLoading ? {...styles.input, ...styles.disabledInput} : styles.input}
              placeholder="Email"
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
          
          {success && (
            <div style={{...styles.errorContainer, backgroundColor: '#d4edda', borderColor: '#c3e6cb'}}>
              <div style={{...styles.errorIcon, backgroundColor: '#28a745'}}>✓</div>
              <span style={{...styles.error, color: '#155724'}}>{success}</span>
            </div>
          )}
          
          <button 
            type="submit" 
            style={isLoading ? {...styles.loginButton, ...styles.loginButtonLoading} : styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span style={styles.spinner}></span> Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p style={styles.loginLink}>
          Already have an account?{' '}
          <span
            style={{ color: '#dc3545', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/admin/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

// Styles (same as AdminLogin component)
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
  loginLink: {
    marginTop: '20px',
    textAlign: 'center',
    paddingTop: '15px',
    borderTop: '1px solid #dee2e6',
    color: '#6c757d',
    fontSize: '14px',
  },
};

export default AdminRegister;