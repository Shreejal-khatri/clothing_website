import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const [userId, setUserId] = useState(null); // New state for userId
  const [loading, setLoading] = useState(true);

  // Helper function to decode JWT and extract userId
  const getUserIdFromToken = (token) => {
    try {
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      // return payload.userId || payload.sub || null; // Common JWT fields for user ID
      return payload.id || payload.userId || payload.sub || null;

    } catch (err) {
      console.error('Failed to decode token:', err);
      return null;
    }
  };

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        logout();
        setLoading(false);
        return;
      }

      try {
        // Check token expiration and extract userId
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) throw new Error('Token expired');
        
        // Set userId from token
        // const extractedUserId = payload.userId || payload.sub || null;
        const extractedUserId = payload.id || payload.userId || payload.sub || null;

        setUserId(extractedUserId);
      } catch (err) {
        console.error('Auth validation failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    validateAuth();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
    
    // Extract and set userId from token
    const extractedUserId = getUserIdFromToken(token);
    setUserId(extractedUserId);
    
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setUserId(null); // Clear userId on logout
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      userId, // Include userId in the context
      login, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
