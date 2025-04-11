// import React from 'react';
// import { Settings, LogOut } from 'lucide-react';

// const AdminSettings = ({ user, onLogout }) => {
//   return (
//     <div style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//       <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//         <Settings size={24} /> Settings
//       </h2>

//       {/* Profile Section */}
//       <div style={{ marginBottom: '2rem' }}>
//         <h3 style={{ marginBottom: '1rem' }}>Profile</h3>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
//           <img
//             src={user.avatar}
//             alt="Profile"
//             style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
//           />
//           <div>
//             <h4 style={{ margin: 0 }}>{user.name}</h4>
//             <p style={{ margin: 0, color: '#666' }}>{user.email}</p>
//             <p style={{ margin: 0, color: '#666' }}>Role: {user.role}</p>
//           </div>
//         </div>
//       </div>

//       {/* Logout Button */}
//       <div>
//         <button
//           onClick={onLogout}
//           style={{
//             backgroundColor: '#ff4444',
//             color: '#fff',
//             padding: '0.75rem 1.5rem',
//             borderRadius: '5px',
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '0.5rem',
//             transition: 'background-color 0.3s ease',
//             ':hover': {
//               backgroundColor: '#cc0000',
//             },
//           }}
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;

// import React, { useEffect, useState } from 'react';
// import { Settings, LogOut } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const AdminSettings = () => {
//   const [adminData, setAdminData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   // Fetch admin data from the backend
//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/admin/user');
//         setAdminData(response.data);
//         setError('');
//       } catch (err) {
//         setError('Failed to fetch admin data. Please try again.');
//         console.error('Error fetching admin data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminData();
//   }, []);

//   // Logout handler
//   const handleLogout = () => {
//     // Clear any stored tokens or session data (if applicable)
//     localStorage.removeItem('token'); // Example: Clear token from localStorage

//     // Redirect to the admin login page
//     navigate('/admin/login');
//   };

//   if (loading) {
//     return <p>Loading admin data...</p>;
//   }

//   if (error) {
//     return <p style={{ color: 'red' }}>{error}</p>;
//   }

//   return (
//     <div style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//       <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//         <Settings size={24} /> Settings
//       </h2>

//       {/* Profile Section */}
//       <div style={{ marginBottom: '2rem' }}>
//         <h3 style={{ marginBottom: '1rem' }}>Profile</h3>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
//           <img
//             src="https://via.placeholder.com/150" // Placeholder image
//             alt="Profile"
//             style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
//           />
//           <div>
//             <h4 style={{ margin: 0 }}>{adminData?.username || 'Admin'}</h4>
//             <p style={{ margin: 0, color: '#666' }}>{adminData?.email || 'admin@example.com'}</p>
//             <p style={{ margin: 0, color: '#666' }}>Role: {adminData?.role || 'Admin'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Logout Button */}
//       <div>
//         <button
//           onClick={handleLogout} // Call handleLogout on button click
//           style={{
//             backgroundColor: '#ff4444',
//             color: '#fff',
//             padding: '0.75rem 1.5rem',
//             borderRadius: '5px',
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '0.5rem',
//             transition: 'background-color 0.3s ease',
//             ':hover': {
//               backgroundColor: '#cc0000',
//             },
//           }}
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSettings;

// import React, { useEffect, useState } from 'react';
// import { Settings, LogOut, Loader2 } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminSettings = () => {
//   const [adminData, setAdminData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Fetch admin data from the backend
//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           navigate('/admin/login');
//           return;
//         }

//         const response = await axios.get('http://localhost:3000/api/admin/user', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setAdminData(response.data);
//         setError('');
//       } catch (err) {
//         console.error('Error fetching admin data:', {
//           message: err.message,
//           response: err.response?.data,
//           status: err.response?.status
//         });

//         if (err.response?.status === 401) {
//           // Unauthorized - token invalid or expired
//           localStorage.removeItem('token');
//           navigate('/admin/login');
//         } else {
//           setError(err.response?.data?.message || 'Failed to fetch admin data. Please try again.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminData();
//   }, [navigate]);

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/admin/login');
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <Loader2 size={32} className="animate-spin" />
//         <p>Loading admin data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={styles.errorContainer}>
//         <p style={styles.errorText}>{error}</p>
//         <button 
//           onClick={() => window.location.reload()} 
//           style={styles.retryButton}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>
//         <Settings size={24} /> Admin Settings
//       </h2>

//       {/* Profile Section */}
//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Profile Information</h3>
//         <div style={styles.profileCard}>
//           <img
//             src={adminData?.profileImage || "https://via.placeholder.com/150"}
//             alt="Profile"
//             style={styles.profileImage}
//           />
//           <div style={styles.profileInfo}>
//             <h4 style={styles.username}>{adminData?.username || 'Admin'}</h4>
//             <p style={styles.detail}><strong>Email:</strong> {adminData?.email || 'admin@example.com'}</p>
//             <p style={styles.detail}><strong>Role:</strong> {adminData?.role || 'Administrator'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Logout Button */}
//       <div style={styles.logoutSection}>
//         <button
//           onClick={handleLogout}
//           style={styles.logoutButton}
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     padding: '2rem',
//     backgroundColor: '#fff',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     maxWidth: '800px',
//     margin: '2rem auto'
//   },
//   header: {
//     marginBottom: '2rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     color: '#333',
//     borderBottom: '1px solid #eee',
//     paddingBottom: '1rem'
//   },
//   section: {
//     marginBottom: '2rem'
//   },
//   sectionTitle: {
//     marginBottom: '1rem',
//     color: '#444'
//   },
//   profileCard: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1.5rem',
//     padding: '1.5rem',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     border: '1px solid #eee'
//   },
//   profileImage: {
//     width: '100px',
//     height: '100px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     border: '3px solid #ddd'
//   },
//   profileInfo: {
//     flex: 1
//   },
//   username: {
//     margin: '0 0 0.5rem 0',
//     fontSize: '1.2rem',
//     color: '#222'
//   },
//   detail: {
//     margin: '0.25rem 0',
//     color: '#555'
//   },
//   logoutSection: {
//     marginTop: '2rem',
//     textAlign: 'right'
//   },
//   logoutButton: {
//     backgroundColor: '#ff4444',
//     color: '#fff',
//     padding: '0.75rem 1.5rem',
//     borderRadius: '5px',
//     border: 'none',
//     cursor: 'pointer',
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     transition: 'background-color 0.3s ease',
//     fontSize: '1rem'
//   },
//   loadingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '200px',
//     gap: '1rem'
//   },
//   errorContainer: {
//     padding: '2rem',
//     backgroundColor: '#fff',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     maxWidth: '800px',
//     margin: '2rem auto',
//     textAlign: 'center'
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: '1rem'
//   },
//   retryButton: {
//     backgroundColor: '#4285f4',
//     color: '#fff',
//     padding: '0.5rem 1rem',
//     borderRadius: '5px',
//     border: 'none',
//     cursor: 'pointer'
//   }
// };

// export default AdminSettings;

// import React, { useEffect, useState } from 'react';
// import { Settings, LogOut, Loader2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const AdminSettings = () => {
//   const { currentUser, logout, fetchProfile } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadProfile = async () => {
//       await fetchProfile();
//       setLoading(false);
//     };
//     loadProfile();
//   }, [fetchProfile]);

//   const handleLogout = () => {
//     logout();
//     navigate('/admin/login');
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <Loader2 size={32} className="animate-spin" />
//         <p>Loading admin data...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>
//         <Settings size={24} /> Admin Settings
//       </h2>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Profile Information</h3>
//         <div style={styles.profileCard}>
//           <img
//             src={currentUser?.profileImage || "https://via.placeholder.com/150"}
//             alt="Profile"
//             style={styles.profileImage}
//           />
//           <div style={styles.profileInfo}>
//             <h4 style={styles.username}>{currentUser?.username || 'Admin'}</h4>
//             <p style={styles.detail}><strong>Email:</strong> {currentUser?.email || 'admin@example.com'}</p>
//             <p style={styles.detail}><strong>Role:</strong> {currentUser?.role || 'Administrator'}</p>
//           </div>
//         </div>
//       </div>

//       <div style={styles.logoutSection}>
//         <button onClick={handleLogout} style={styles.logoutButton}>
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '2rem',
//     backgroundColor: '#fff',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     maxWidth: '800px',
//     margin: '2rem auto'
//   },
//   header: {
//     marginBottom: '2rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     color: '#333',
//     borderBottom: '1px solid #eee',
//     paddingBottom: '1rem'
//   },
//   profileCard: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1.5rem',
//     padding: '1.5rem',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     border: '1px solid #eee'
//   },
//   profileImage: {
//     width: '100px',
//     height: '100px',
//     borderRadius: '50%',
//     objectFit: 'cover',
//     border: '3px solid #ddd'
//   },
//   profileInfo: {
//     flex: 1
//   },
//   username: {
//     margin: '0 0 0.5rem 0',
//     fontSize: '1.2rem',
//     color: '#222'
//   },
//   detail: {
//     margin: '0.25rem 0',
//     color: '#555'
//   },
//   logoutSection: {
//     marginTop: '2rem',
//     textAlign: 'right'
//   },
//   logoutButton: {
//     backgroundColor: '#ff4444',
//     color: '#fff',
//     padding: '0.75rem 1.5rem',
//     borderRadius: '5px',
//     border: 'none',
//     cursor: 'pointer'
//   },
//   loadingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '200px',
//     gap: '1rem'
//   }
// };

// export default AdminSettings;


// import React, { useEffect, useState } from 'react';
// import { Settings, LogOut, Loader2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const AdminSettings = () => {
//   const { currentUser, logout, fetchProfile } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadProfile = async () => {
//       await fetchProfile();
//       setLoading(false);
//     };
//     loadProfile();
//   }, [fetchProfile]);

//   const handleLogout = () => {
//     logout();
//     navigate('/admin/login');
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <Loader2 size={32} className="animate-spin" />
//         <p>Loading admin data...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>
//         <Settings size={24} /> Admin Settings
//       </h2>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Profile Information</h3>
//         <div style={styles.profileCard}>
//           <div style={styles.profileInfo}>
//             <h4 style={styles.username}>{currentUser?.username || 'Admin'}</h4>
//             <p style={styles.detail}><strong>Email:</strong> {currentUser?.email || 'admin@example.com'}</p>
//             <p style={styles.detail}><strong>Role:</strong> {currentUser?.role || 'Administrator'}</p>
//           </div>
//         </div>
//       </div>

//       <div style={styles.logoutSection}>
//         <button onClick={handleLogout} style={styles.logoutButton}>
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '2rem',
//     backgroundColor: '#fff',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     maxWidth: '800px',
//     margin: '2rem auto'
//   },
//   header: {
//     marginBottom: '2rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     color: '#333',
//     borderBottom: '1px solid #eee',
//     paddingBottom: '1rem'
//   },
//   profileCard: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1.5rem',
//     padding: '1.5rem',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     border: '1px solid #eee'
//   },
//   profileInfo: {
//     flex: 1
//   },
//   username: {
//     margin: '0 0 0.5rem 0',
//     fontSize: '1.2rem',
//     color: '#222'
//   },
//   detail: {
//     margin: '0.25rem 0',
//     color: '#555'
//   },
//   logoutSection: {
//     marginTop: '2rem',
//     textAlign: 'right'
//   },
//   logoutButton: {
//     backgroundColor: '#ff4444',
//     color: '#fff',
//     padding: '0.75rem 1.5rem',
//     borderRadius: '5px',
//     border: 'none',
//     cursor: 'pointer'
//   },
//   loadingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '200px',
//     gap: '1rem'
//   }
// };

// export default AdminSettings;


// import React, { useEffect, useState } from 'react';
// import { Settings, LogOut, Loader2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const AdminSettings = () => {
//   const { currentUser, loading, logout, fetchProfile } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(currentUser);
//     if (currentUser === null) {
//       navigate('/admin/login'); // Redirect to login if no currentUser is found
//     }
//   }, [currentUser, navigate]);

//   const handleLogout = () => {
//     logout();
//     navigate('/admin/login'); // Redirect to login page after logout
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <Loader2 size={32} className="animate-spin" />
//         <p>Loading admin data...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.header}>
//         <Settings size={24} /> Admin Settings
//       </h2>

//       <div style={styles.section}>
//         <h3 style={styles.sectionTitle}>Profile Information</h3>
//         <div style={styles.profileCard}>
//           <div style={styles.profileInfo}>
//             <h4 style={styles.username}>{currentUser?.username || 'Admin'}</h4>
//             <p style={styles.detail}><strong>Email:</strong> {currentUser?.email || 'admin@example.com'}</p>
//             <p style={styles.detail}><strong>Role:</strong> {currentUser?.role || 'Administrator'}</p>
//           </div>
//         </div>
//       </div>

//       <div style={styles.logoutSection}>
//         <button onClick={handleLogout} style={styles.logoutButton}>
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '2rem',
//     backgroundColor: '#fff',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     maxWidth: '800px',
//     margin: '2rem auto',
//   },
//   header: {
//     marginBottom: '2rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     color: '#333',
//     borderBottom: '1px solid #eee',
//     paddingBottom: '1rem',
//   },
//   profileCard: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1.5rem',
//     padding: '1.5rem',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     border: '1px solid #eee',
//   },
//   profileInfo: {
//     flex: 1,
//   },
//   username: {
//     margin: '0 0 0.5rem 0',
//     fontSize: '1.2rem',
//     color: '#222',
//   },
//   detail: {
//     margin: '0.25rem 0',
//     color: '#555',
//   },
//   logoutSection: {
//     marginTop: '2rem',
//     textAlign: 'right',
//   },
//   logoutButton: {
//     backgroundColor: '#ff4444',
//     color: '#fff',
//     padding: '0.75rem 1.5rem',
//     borderRadius: '5px',
//     border: 'none',
//     cursor: 'pointer',
//   },
//   loadingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '200px',
//     gap: '1rem',
//   },
// };

// export default AdminSettings;


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