// // src/components/admin/UserManagement.jsx
// import React, { useState } from 'react';

// const AdminUserManagement = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
//   ]);

//   const handleDeleteUser = (userId) => {
//     setUsers(users.filter(user => user.id !== userId));
//   };

//   const userManagementStyles = {
//     backgroundColor: '#fff',
//     padding: '1.5rem',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   };

//   const tableStyles = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: '1rem',
//   };

//   const thTdStyles = {
//     padding: '0.75rem',
//     textAlign: 'left',
//     borderBottom: '1px solid #ddd',
//   };

//   const deleteButtonStyles = {
//     backgroundColor: '#000',
//     color: '#fff',
//     border: 'none',
//     padding: '0.5rem 1rem',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   };

//   const deleteButtonHoverStyles = {
//     backgroundColor: '#333',
//   };

//   return (
//     <div style={userManagementStyles}>
//       <h2>User Management</h2>
//       <table style={tableStyles}>
//         <thead>
//           <tr>
//             <th style={thTdStyles}>Name</th>
//             <th style={thTdStyles}>Email</th>
//             <th style={thTdStyles}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td style={thTdStyles}>{user.name}</td>
//               <td style={thTdStyles}>{user.email}</td>
//               <td style={thTdStyles}>
//                 <button
//                   style={deleteButtonStyles}
//                   onMouseEnter={(e) => (e.target.style.backgroundColor = deleteButtonHoverStyles.backgroundColor)}
//                   onMouseLeave={(e) => (e.target.style.backgroundColor = deleteButtonStyles.backgroundColor)}
//                   onClick={() => handleDeleteUser(user.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUserManagement;
// import React, { useState, useEffect } from "react";

// const AdminUserManagement = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/users"); // Adjust URL if needed
//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDeleteUser = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete user");
//       }

//       setUsers(users.filter((user) => user._id !== userId)); // Ensure backend returns _id
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const userManagementStyles = {
//     backgroundColor: "#fff",
//     padding: "1.5rem",
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   };

//   const tableStyles = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "1rem",
//   };

//   const thTdStyles = {
//     padding: "0.75rem",
//     textAlign: "left",
//     borderBottom: "1px solid #ddd",
//   };

//   const deleteButtonStyles = {
//     backgroundColor: "#000",
//     color: "#fff",
//     border: "none",
//     padding: "0.5rem 1rem",
//     borderRadius: "4px",
//     cursor: "pointer",
//   };

//   const deleteButtonHoverStyles = {
//     backgroundColor: "#333",
//   };

//   return (
//     <div style={userManagementStyles}>
//       <h2>User Management</h2>
//       <table style={tableStyles}>
//         <thead>
//           <tr>
//             <th style={thTdStyles}>Name</th>
//             <th style={thTdStyles}>Email</th>
//             <th style={thTdStyles}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user._id}>
//                 <td style={thTdStyles}>{user.name}</td>
//                 <td style={thTdStyles}>{user.email}</td>
//                 <td style={thTdStyles}>
//                   <button
//                     style={deleteButtonStyles}
//                     onMouseEnter={(e) =>
//                       (e.target.style.backgroundColor =
//                         deleteButtonHoverStyles.backgroundColor)
//                     }
//                     onMouseLeave={(e) =>
//                       (e.target.style.backgroundColor =
//                         deleteButtonStyles.backgroundColor)
//                     }
//                     onClick={() => handleDeleteUser(user._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>
//                 No users found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUserManagement;


// import React, { useState, useEffect } from "react";
// import { FaTrash, FaEdit, FaUser, FaSpinner } from "react-icons/fa";

// const AdminUserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/users");
//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
    
//     try {
//       const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete user");
//       }

//       setUsers(users.filter((user) => user._id !== userId));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       setError(error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <FaSpinner className="spinner" />
//         <p>Loading users...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <p className="error-message">Error: {error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-container">
//       <h2 className="admin-title">User Management</h2>
      
//       <div className="table-responsive">
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Contact Info</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user._id}>
//                   <td>
//                     <div className="user-info">
//                       <div className="user-avatar">
//                         {user.picture ? (
//                           <img src={user.picture} alt={user.name} />
//                         ) : (
//                           <FaUser />
//                         )}
//                       </div>
//                       <div>
//                         <strong>{user.name || "No name"}</strong>
//                         <div className="user-email">{user.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="contact-info">
//                       <div>
//                         <strong>Email:</strong> {user.email}
//                       </div>
//                       <div>
//                         <strong>Phone:</strong> {user.phone || "Not provided"}
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     {user.address ? (
//                       <div className="address">{user.address}</div>
//                     ) : (
//                       <span className="empty-field">Not provided</span>
//                     )}
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button 
//                         className="btn-delete"
//                         onClick={() => handleDeleteUser(user._id)}
//                       >
//                         <FaTrash /> Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="no-users">
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <style jsx>{`
//         .admin-container {
//           padding: 2rem;
//           background: #fff;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           max-width: 1200px;
//           margin: 2rem auto;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         .admin-title {
//           color: #2c3e50;
//           margin-bottom: 1.5rem;
//           font-size: 1.8rem;
//           font-weight: 600;
//           border-bottom: 2px solid #eee;
//           padding-bottom: 0.5rem;
//         }
        
//         .table-responsive {
//           overflow-x: auto;
//           margin-top: 1.5rem;
//         }
        
//         .user-table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 0.95rem;
//         }
        
//         .user-table th {
//           background: #f8f9fa;
//           padding: 1rem;
//           text-align: left;
//           font-weight: 600;
//           color: #495057;
//           border-bottom: 2px solid #dee2e6;
//         }
        
//         .user-table td {
//           padding: 1rem;
//           border-bottom: 1px solid #eee;
//           vertical-align: top;
//         }
        
//         .user-table tr:hover {
//           background-color: #f8f9fa;
//         }
        
//         .user-info {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }
        
//         .user-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background: #e9ecef;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//           color: #6c757d;
//         }
        
//         .user-avatar img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
        
//         .user-email {
//           color: #6c757d;
//           font-size: 0.85rem;
//           margin-top: 0.2rem;
//         }
        
//         .contact-info {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }
        
//         .address {
//           white-space: pre-line;
//         }
        
//         .empty-field {
//           color: #adb5bd;
//           font-style: italic;
//         }
        
//         .action-buttons {
//           display: flex;
//           gap: 0.5rem;
//         }
        
//         .btn-delete {
//           background: #dc3545;
//           color: white;
//           border: none;
//           padding: 0.5rem 1rem;
//           border-radius: 4px;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           transition: all 0.2s;
//           font-size: 0.9rem;
//         }
        
//         .btn-delete:hover {
//           background: #c82333;
//         }
        
//         .no-users {
//           text-align: center;
//           padding: 2rem;
//           color: #6c757d;
//         }
        
//         .loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 200px;
//           gap: 1rem;
//         }
        
//         .spinner {
//           animation: spin 1s linear infinite;
//           font-size: 2rem;
//           color: #6c757d;
//         }
        
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         .error-container {
//           padding: 2rem;
//           text-align: center;
//           background: #f8d7da;
//           border-radius: 8px;
//           color: #721c24;
//           max-width: 600px;
//           margin: 2rem auto;
//         }
        
//         .error-message {
//           margin-bottom: 1rem;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminUserManagement;

import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaUser, FaSpinner } from "react-icons/fa";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const usersPerPage = 8; // Number of users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get current users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="admin-container">
      <h2 className="admin-title">User Management</h2>

      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact Info</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.picture ? (
                          <img src={user.picture} alt={user.name} />
                        ) : (
                          <FaUser />
                        )}
                      </div>
                      <div>
                        <strong>{user.name || "No name"}</strong>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div>
                        <strong>Email:</strong> {user.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {user.phone || "Not provided"}
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.address ? (
                      <div className="address">{user.address}</div>
                    ) : (
                      <span className="empty-field">Not provided</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-users">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Prev
        </button>
        <span className="pagination-text">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>

      <style jsx>{`
        .admin-container {
          padding: 2rem;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 1200px;
          margin: 2rem auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .admin-title {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          font-weight: 600;
          border-bottom: 2px solid #eee;
          padding-bottom: 0.5rem;
        }

        .table-responsive {
          overflow-x: auto;
          margin-top: 1.5rem;
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .user-table th {
          background: #f8f9fa;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #dee2e6;
        }

        .user-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          vertical-align: top;
        }

        .user-table tr:hover {
          background-color: #f8f9fa;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: #6c757d;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-email {
          color: #6c757d;
          font-size: 0.85rem;
          margin-top: 0.2rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .address {
          white-space: pre-line;
        }

        .empty-field {
          color: #adb5bd;
          font-style: italic;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-delete {
          background: #dc3545;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .btn-delete:hover {
          background: #c82333;
        }

        .no-users {
          text-align: center;
          padding: 2rem;
          color: #6c757d;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          gap: 1rem;
        }

        .spinner {
          animation: spin 1s linear infinite;
          font-size: 2rem;
          color: #6c757d;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-container {
          padding: 2rem;
          text-align: center;
          background: #f8d7da;
          border-radius: 8px;
          color: #721c24;
          max-width: 600px;
          margin: 2rem auto;
        }

        .error-message {
          margin-bottom: 1rem;
        }

        .pagination-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .pagination-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .pagination-btn:disabled {
          background: #ccc;
        }

        .pagination-text {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default AdminUserManagement;
