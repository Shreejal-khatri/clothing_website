import { jwtDecode } from 'jwt-decode';




export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);

    // // Check token expiration
    // if (decoded.exp && isTokenExpired(decoded.exp)) {
    //   console.warn("Token expired");
    //   localStorage.removeItem("token"); // Clean up expired token
    //   return null;
    // }

    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    localStorage.removeItem("token"); // Clean up invalid token
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (expirationTimestamp) => {
  return Date.now() >= expirationTimestamp * 1000; // Convert to milliseconds
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  // Only return auth header if token exists AND isn't expired
  if (token) {
    try {
      const decoded = jwt_decode(token);
      if (!decoded.exp || !isTokenExpired(decoded.exp)) {
        return { Authorization:` Bearer ${token}`};
      }
    }
     catch (error) {
      console.error("Invalid token", error);
    }
  }
  return {};
};