

// import React, { useState, useEffect } from 'react';

// const AdminItemExchange = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch exchange requests from the backend
//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:3000/api/exchange');
//       if (!response.ok) {
//         throw new Error('Failed to fetch requests');
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Approve or Reject a request
//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update request');
//       }

//       await fetchRequests(); // Refresh the list after updating the status
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Delete a request
//   const handleDeleteRequest = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete request');
//       }

//       await fetchRequests(); // Refresh the list after deletion
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   return (
//     <div>
//       <h2>Item Exchange System</h2>
//       <p>Manage item exchanges between users here.</p>
      
//       <div
//         style={{
//           marginTop: '2rem',
//           padding: '1.5rem',
//           backgroundColor: '#f8f9fa',
//           borderRadius: '8px',
//           border: '1px solid #dee2e6',
//         }}
//       >
//         <h3>Exchange Requests</h3>

//         {loading ? (
//           <p>Loading requests...</p>
//         ) : error ? (
//           <p style={{ color: 'red' }}>{error}</p>
//         ) : (
//           <div>
//             {requests.length === 0 ? (
//               <p>No exchange requests available.</p>
//             ) : (
//               <ul>
//                 {requests.map((request) => (
//                   <li key={request._id} style={{ marginBottom: '1rem' }}>
//                     <div>
//                       <strong>Item Out:</strong> {request.itemOut} ({request.itemOutCondition}) <br />
//                       <strong>Item In:</strong> {request.itemIn} ({request.itemInCondition}) <br />
//                       <strong>Status:</strong> {request.status} <br />
//                       <strong>Notes:</strong> {request.notes}
//                     </div>
//                     <div style={{ marginTop: '0.5rem' }}>
//                       <button
//                         onClick={() => handleStatusUpdate(request._id, 'approved')}
//                         style={{
//                           marginRight: '0.5rem',
//                           backgroundColor: 'green',
//                           color: 'white',
//                           padding: '0.5rem 1rem',
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer',
//                         }}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleStatusUpdate(request._id, 'rejected')}
//                         style={{
//                           backgroundColor: 'red',
//                           color: 'white',
//                           padding: '0.5rem 1rem',
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer',
//                         }}
//                       >
//                         Reject
//                       </button>
//                       <button
//                         onClick={() => handleDeleteRequest(request._id)}
//                         style={{
//                           marginLeft: '0.5rem',
//                           backgroundColor: 'gray',
//                           color: 'white',
//                           padding: '0.5rem 1rem',
//                           border: 'none',
//                           borderRadius: '4px',
//                           cursor: 'pointer',
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminItemExchange;


// import React, { useState, useEffect } from "react";

// const AdminItemExchange = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch exchange requests from the backend
//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/api/exchange");
//       if (!response.ok) {
//         throw new Error("Failed to fetch requests");
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Approve or Reject a request
//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update request");
//       }

//       await fetchRequests(); // Refresh the list after updating status
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Delete a request
//   const handleDeleteRequest = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete request");
//       }

//       await fetchRequests(); // Refresh the list after deletion
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2 style={{ textAlign: "center" }}>Item Exchange System</h2>
//       <p style={{ textAlign: "center" }}>Manage item exchanges between users here.</p>

//       <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
//         {loading ? (
//           <p>Loading requests...</p>
//         ) : error ? (
//           <p style={{ color: "red" }}>{error}</p>
//         ) : requests.length === 0 ? (
//           <p>No exchange requests available.</p>
//         ) : (
//           requests.map((request) => (
//             <div
//               key={request._id}
//               style={{
//                 width: "300px",
//                 padding: "1rem",
//                 backgroundColor: "#fff",
//                 borderRadius: "10px",
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                 textAlign: "center",
//               }}
//             >
//               <h4>Status: {request.status}</h4>

//               {/* Images Preview */}
//               <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//                 <div>
//                   <p><strong>Item Out:</strong></p>
//                   <img
//                     src={request.itemOutImages?.[0] || "/default-placeholder.png"}
//                     alt={request.itemOut}
//                     style={{ width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover" }}
//                     onError={(e) => (e.target.src = "/default-placeholder.png")}
//                   />
//                   <p>{request.itemOut} ({request.itemOutCondition})</p>
//                 </div>

//                 <div>
//                   <p><strong>Item In:</strong></p>
//                   <img
//                     src={request.itemInImages?.[0] || "/default-placeholder.png"}
//                     alt={request.itemIn}
//                     style={{ width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover" }}
//                     onError={(e) => (e.target.src = "/default-placeholder.png")}
//                   />
//                   <p>{request.itemIn} ({request.itemInCondition})</p>
//                 </div>
//               </div>

//               <p><strong>Notes:</strong> {request.notes}</p>

//               {/* Action Buttons */}
//               <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "10px" }}>
//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "approved")}
//                   style={{
//                     backgroundColor: "green",
//                     color: "white",
//                     padding: "0.5rem 1rem",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "rejected")}
//                   style={{
//                     backgroundColor: "red",
//                     color: "white",
//                     padding: "0.5rem 1rem",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Reject
//                 </button>

//                 <button
//                   onClick={() => handleDeleteRequest(request._id)}
//                   style={{
//                     backgroundColor: "gray",
//                     color: "white",
//                     padding: "0.5rem 1rem",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminItemExchange;



// import React, { useState, useEffect } from "react";

// const AdminItemExchange = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/api/exchange");
//       if (!response.ok) {
//         throw new Error("Failed to fetch requests");
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDeleteRequest = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // Status badge styling
//   const getStatusBadgeStyle = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return { backgroundColor: '#FFD700', color: '#000' };
//       case 'approved':
//         return { backgroundColor: '#4CAF50', color: '#fff' };
//       case 'rejected':
//         return { backgroundColor: '#F44336', color: '#fff' };
//       default:
//         return { backgroundColor: '#9E9E9E', color: '#fff' };
//     }
//   };

//   return (
//     <div className="admin-exchange-container" style={{ 
//       padding: "2rem", 
//       maxWidth: "1200px", 
//       margin: "0 auto",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//     }}>
//       <div style={{ 
//         textAlign: "center", 
//         marginBottom: "2rem",
//         borderBottom: "1px solid #eee",
//         paddingBottom: "1rem"
//       }}>
//         <h2 style={{ 
//           margin: 0, 
//           color: "#333",
//           fontSize: "2rem",
//           fontWeight: "600"
//         }}>Item Exchange Requests</h2>
//         <p style={{ 
//           color: "#666",
//           marginTop: "0.5rem",
//           fontSize: "1rem"
//         }}>Review and manage item exchange requests between users</p>
//       </div>

//       {loading ? (
//         <div style={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           height: "200px"
//         }}>
//           <div className="spinner" style={{
//             border: "4px solid rgba(0, 0, 0, 0.1)",
//             width: "36px",
//             height: "36px",
//             borderRadius: "50%",
//             borderLeftColor: "#09f",
//             animation: "spin 1s linear infinite"
//           }}></div>
//         </div>
//       ) : error ? (
//         <div style={{ 
//           backgroundColor: "#FFEBEE", 
//           color: "#B71C1C", 
//           padding: "1rem", 
//           borderRadius: "4px",
//           marginBottom: "1rem",
//           textAlign: "center"
//         }}>
//           {error}
//         </div>
//       ) : requests.length === 0 ? (
//         <div style={{ 
//           textAlign: "center", 
//           padding: "2rem",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "8px"
//         }}>
//           <p style={{ color: "#666" }}>No exchange requests available at this time.</p>
//         </div>
//       ) : (
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "column", 
//           gap: "1.5rem"
//         }}>
//           {requests.map((request) => (
//             <div
//               key={request._id}
//               style={{
//                 padding: "1.5rem",
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
//                 borderLeft: "4px solid #4285F4"
//               }}
//             >
//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "space-between", 
//                 alignItems: "center",
//                 marginBottom: "1rem"
//               }}>
//                 <h3 style={{ 
//                   margin: 0, 
//                   color: "#333",
//                   fontSize: "1.25rem"
//                 }}>
//                   Exchange Request #{request._id.slice(-6).toUpperCase()}
//                 </h3>
//                 <span style={{ 
//                   padding: "0.25rem 0.75rem",
//                   borderRadius: "12px",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                   ...getStatusBadgeStyle(request.status)
//                 }}>
//                   {request.status.toUpperCase()}
//                 </span>
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 gap: "1.5rem",
//                 marginBottom: "1.5rem"
//               }}>
//                 {/* Items Section */}
//                 <div style={{ 
//                   display: "flex", 
//                   justifyContent: "space-between",
//                   gap: "1rem",
//                   flexWrap: "wrap"
//                 }}>
//                   {/* Item Out */}
//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Item Out</h4>
//                     <div style={{ 
//                       display: "flex", 
//                       gap: "1rem",
//                       alignItems: "center"
//                     }}>
//                       <img
//                         src={request.itemOutImages?.[0] || "/default-placeholder.png"}
//                         alt={request.itemOut}
//                         style={{ 
//                           width: "80px", 
//                           height: "80px", 
//                           borderRadius: "8px", 
//                           objectFit: "cover",
//                           border: "1px solid #eee"
//                         }}
//                         onError={(e) => (e.target.src = "/default-placeholder.png")}
//                       />
//                       <div>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           fontWeight: "500"
//                         }}>{request.itemOut}</p>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           color: "#666",
//                           fontSize: "0.875rem"
//                         }}>Condition: {request.itemOutCondition}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Arrow icon */}
//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "50px"
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </div>

//                   {/* Item In */}
//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Item In</h4>
//                     <div style={{ 
//                       display: "flex", 
//                       gap: "1rem",
//                       alignItems: "center"
//                     }}>
//                       <img
//                         src={request.itemInImages?.[0] || "/default-placeholder.png"}
//                         alt={request.itemIn}
//                         style={{ 
//                           width: "80px", 
//                           height: "80px", 
//                           borderRadius: "8px", 
//                           objectFit: "cover",
//                           border: "1px solid #eee"
//                         }}
//                         onError={(e) => (e.target.src = "/default-placeholder.png")}
//                       />
//                       <div>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           fontWeight: "500"
//                         }}>{request.itemIn}</p>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           color: "#666",
//                           fontSize: "0.875rem"
//                         }}>Condition: {request.itemInCondition}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Notes Section */}
//                 {request.notes && (
//                   <div style={{ 
//                     backgroundColor: "#f0f7ff",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     borderLeft: "3px solid #4285F4"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.5rem",
//                       color: "#4285F4"
//                     }}>User Notes</h4>
//                     <p style={{ 
//                       margin: 0, 
//                       color: "#333",
//                       fontStyle: "italic"
//                     }}>{request.notes}</p>
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "flex-end", 
//                 gap: "1rem",
//                 borderTop: "1px solid #eee",
//                 paddingTop: "1rem",
//                 flexWrap: "wrap"
//               }}>
//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "approved")}
//                   style={{
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3d8b40"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "rejected")}
//                   style={{
//                     backgroundColor: "#F44336",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#d32f2f"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#F44336"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="18" y1="6" x2="6" y2="18"></line>
//                     <line x1="6" y1="6" x2="18" y2="18"></line>
//                   </svg>
//                   Reject
//                 </button>

//                 <button
//                   onClick={() => handleDeleteRequest(request._id)}
//                   style={{
//                     backgroundColor: "#757575",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#616161"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#757575"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="3 6 5 6 21 6"></polyline>
//                     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                   </svg>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminItemExchange;


// import React, { useState, useEffect } from "react";

// const AdminItemExchange = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/api/exchange");
//       if (!response.ok) {
//         throw new Error("Failed to fetch requests");
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDeleteRequest = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const getStatusBadgeStyle = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return { backgroundColor: '#FFD700', color: '#000' };
//       case 'approved':
//         return { backgroundColor: '#4CAF50', color: '#fff' };
//       case 'rejected':
//         return { backgroundColor: '#F44336', color: '#fff' };
//       default:
//         return { backgroundColor: '#9E9E9E', color: '#fff' };
//     }
//   };

//   return (
//     <div className="admin-exchange-container" style={{ 
//       padding: "2rem", 
//       maxWidth: "1200px", 
//       margin: "0 auto",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       backgroundColor: "#fff"
//     }}>
//       <div style={{ 
//         textAlign: "center", 
//         marginBottom: "2rem",
//         borderBottom: "1px solid #eee",
//         paddingBottom: "1rem"
//       }}>
//         <h2 style={{ 
//           margin: 0, 
//           color: "#333",
//           fontSize: "2rem",
//           fontWeight: "600"
//         }}>Item Exchange Requests</h2>
//         <p style={{ 
//           color: "#666",
//           marginTop: "0.5rem",
//           fontSize: "1rem"
//         }}>Review and manage item exchange requests between users</p>
//       </div>

//       {loading ? (
//         <div style={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           height: "200px"
//         }}>
//           <div className="spinner" style={{
//             border: "4px solid rgba(0, 0, 0, 0.1)",
//             width: "36px",
//             height: "36px",
//             borderRadius: "50%",
//             borderLeftColor: "#000",
//             animation: "spin 1s linear infinite"
//           }}></div>
//         </div>
//       ) : error ? (
//         <div style={{ 
//           backgroundColor: "#FFEBEE", 
//           color: "#B71C1C", 
//           padding: "1rem", 
//           borderRadius: "4px",
//           marginBottom: "1rem",
//           textAlign: "center"
//         }}>
//           {error}
//         </div>
//       ) : requests.length === 0 ? (
//         <div style={{ 
//           textAlign: "center", 
//           padding: "2rem",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "8px"
//         }}>
//           <p style={{ color: "#666" }}>No exchange requests available at this time.</p>
//         </div>
//       ) : (
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "column", 
//           gap: "1.5rem"
//         }}>
//           {requests.map((request) => (
//             <div
//               key={request._id}
//               style={{
//                 padding: "1.5rem",
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
//                 borderLeft: "4px solid #000"
//               }}
//             >
//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "space-between", 
//                 alignItems: "center",
//                 marginBottom: "1rem"
//               }}>
//                 <h3 style={{ 
//                   margin: 0, 
//                   color: "#333",
//                   fontSize: "1.25rem"
//                 }}>
//                   Exchange Request #{request._id.slice(-6).toUpperCase()}
//                 </h3>
//                 <span style={{ 
//                   padding: "0.25rem 0.75rem",
//                   borderRadius: "12px",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                   ...getStatusBadgeStyle(request.status)
//                 }}>
//                   {request.status.toUpperCase()}
//                 </span>
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 gap: "1.5rem",
//                 marginBottom: "1.5rem"
//               }}>
//                 <div style={{ 
//                   display: "flex", 
//                   justifyContent: "space-between",
//                   gap: "1rem",
//                   flexWrap: "wrap"
//                 }}>
//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Item Out</h4>
//                     <div style={{ 
//                       display: "flex", 
//                       gap: "1rem",
//                       alignItems: "center"
//                     }}>
//                       <img
//                         src={request.itemOutImages?.[0] || "/default-placeholder.png"}
//                         alt={request.itemOut}
//                         style={{ 
//                           width: "80px", 
//                           height: "80px", 
//                           borderRadius: "8px", 
//                           objectFit: "cover",
//                           border: "1px solid #eee"
//                         }}
//                         onError={(e) => (e.target.src = "/default-placeholder.png")}
//                       />
//                       <div>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           fontWeight: "500"
//                         }}>{request.itemOut}</p>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           color: "#666",
//                           fontSize: "0.875rem"
//                         }}>Condition: {request.itemOutCondition}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "50px"
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </div>

//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Item In</h4>
//                     <div style={{ 
//                       display: "flex", 
//                       gap: "1rem",
//                       alignItems: "center"
//                     }}>
//                       <img
//                         src={request.itemInImages?.[0] || "/default-placeholder.png"}
//                         alt={request.itemIn}
//                         style={{ 
//                           width: "80px", 
//                           height: "80px", 
//                           borderRadius: "8px", 
//                           objectFit: "cover",
//                           border: "1px solid #eee"
//                         }}
//                         onError={(e) => (e.target.src = "/default-placeholder.png")}
//                       />
//                       <div>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           fontWeight: "500"
//                         }}>{request.itemIn}</p>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           color: "#666",
//                           fontSize: "0.875rem"
//                         }}>Condition: {request.itemInCondition}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {request.notes && (
//                   <div style={{ 
//                     backgroundColor: "#f5f5f5",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     borderLeft: "3px solid #000"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.5rem",
//                       color: "#000"
//                     }}>User Notes</h4>
//                     <p style={{ 
//                       margin: 0, 
//                       color: "#333",
//                       fontStyle: "italic"
//                     }}>{request.notes}</p>
//                   </div>
//                 )}
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "flex-end", 
//                 gap: "1rem",
//                 borderTop: "1px solid #eee",
//                 paddingTop: "1rem",
//                 flexWrap: "wrap"
//               }}>
//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "approved")}
//                   style={{
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3d8b40"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "rejected")}
//                   style={{
//                     backgroundColor: "#F44336",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#d32f2f"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#F44336"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="18" y1="6" x2="6" y2="18"></line>
//                     <line x1="6" y1="6" x2="18" y2="18"></line>
//                   </svg>
//                   Reject
//                 </button>

//                 <button
//                   onClick={() => handleDeleteRequest(request._id)}
//                   style={{
//                     backgroundColor: "#757575",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#616161"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#757575"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="3 6 5 6 21 6"></polyline>
//                     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                   </svg>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminItemExchange;

// import React, { useState, useEffect } from "react";

// const AdminItemExchange = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/api/exchange");
//       if (!response.ok) {
//         throw new Error("Failed to fetch requests");
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDeleteRequest = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const getStatusBadgeStyle = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return { backgroundColor: '#FFD700', color: '#000' };
//       case 'approved':
//         return { backgroundColor: '#4CAF50', color: '#fff' };
//       case 'rejected':
//         return { backgroundColor: '#F44336', color: '#fff' };
//       default:
//         return { backgroundColor: '#9E9E9E', color: '#fff' };
//     }
//   };

//   return (
//     <div className="admin-exchange-container" style={{ 
//       padding: "2rem", 
//       maxWidth: "1200px", 
//       margin: "0 auto",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       backgroundColor: "#fff"
//     }}>
//       <div style={{ 
//         textAlign: "center", 
//         marginBottom: "2rem",
//         borderBottom: "1px solid #eee",
//         paddingBottom: "1rem"
//       }}>
//         <h2 style={{ 
//           margin: 0, 
//           color: "#333",
//           fontSize: "2rem",
//           fontWeight: "600"
//         }}>Item Exchange Requests</h2>
//         <p style={{ 
//           color: "#666",
//           marginTop: "0.5rem",
//           fontSize: "1rem"
//         }}>Review and manage item exchange requests between users</p>
//       </div>

//       {loading ? (
//         <div style={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           height: "200px"
//         }}>
//           <div className="spinner" style={{
//             border: "4px solid rgba(0, 0, 0, 0.1)",
//             width: "36px",
//             height: "36px",
//             borderRadius: "50%",
//             borderLeftColor: "#000",
//             animation: "spin 1s linear infinite"
//           }}></div>
//         </div>
//       ) : error ? (
//         <div style={{ 
//           backgroundColor: "#FFEBEE", 
//           color: "#B71C1C", 
//           padding: "1rem", 
//           borderRadius: "4px",
//           marginBottom: "1rem",
//           textAlign: "center"
//         }}>
//           {error}
//         </div>
//       ) : requests.length === 0 ? (
//         <div style={{ 
//           textAlign: "center", 
//           padding: "2rem",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "8px"
//         }}>
//           <p style={{ color: "#666" }}>No exchange requests available at this time.</p>
//         </div>
//       ) : (
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "column", 
//           gap: "1.5rem"
//         }}>
//           {requests.map((request) => (
//             <div
//               key={request._id}
//               style={{
//                 padding: "1.5rem",
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
//                 borderLeft: "4px solid #000"
//               }}
//             >
//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "space-between", 
//                 alignItems: "center",
//                 marginBottom: "1rem"
//               }}>
//                 <h3 style={{ 
//                   margin: 0, 
//                   color: "#333",
//                   fontSize: "1.25rem"
//                 }}>
//                   Exchange Request #{request._id.slice(-6).toUpperCase()}
//                 </h3>
//                 <span style={{ 
//                   padding: "0.25rem 0.75rem",
//                   borderRadius: "12px",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                   ...getStatusBadgeStyle(request.status)
//                 }}>
//                   {request.status.toUpperCase()}
//                 </span>
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 gap: "1.5rem",
//                 marginBottom: "1.5rem"
//               }}>
//                 <div style={{ 
//                   display: "flex", 
//                   justifyContent: "space-between",
//                   gap: "1rem",
//                   flexWrap: "wrap"
//                 }}>
//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Item Out</h4>
//                     <div style={{ 
//                       display: "flex", 
//                       gap: "1rem",
//                       alignItems: "center"
//                     }}>
//                       <img
//                         src={request.itemOutImages?.[0] || "/default-placeholder.png"}
//                         alt={request.itemOut}
//                         style={{ 
//                           width: "80px", 
//                           height: "80px", 
//                           borderRadius: "8px", 
//                           objectFit: "cover",
//                           border: "1px solid #eee"
//                         }}
//                         onError={(e) => (e.target.src = "/default-placeholder.png")}
//                       />
//                       <div>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           fontWeight: "500"
//                         }}>{request.itemOut}</p>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           color: "#666",
//                           fontSize: "0.875rem"
//                         }}>Condition: {request.itemOutCondition}</p>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           color: "#666",
//                           fontSize: "0.875rem"
//                         }}>Price: NPR {request.itemOutPrice?.toLocaleString()}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "50px"
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </div>

//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Item In</h4>
//                     <div style={{ 
//                       display: "flex", 
//                       gap: "1rem",
//                       alignItems: "center"
//                     }}>
//                       <img
//                         src={request.itemInImages?.[0] || "/default-placeholder.png"}
//                         alt={request.itemIn}
//                         style={{ 
//                           width: "80px", 
//                           height: "80px", 
//                           borderRadius: "8px", 
//                           objectFit: "cover",
//                           border: "1px solid #eee"
//                         }}
//                         onError={(e) => (e.target.src = "/default-placeholder.png")}
//                       />
//                       <div>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           fontWeight: "500"
//                         }}>{request.itemIn}</p>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           color: "#666",
//                           fontSize: "0.875rem"
//                         }}>Condition: {request.itemInCondition}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {request.notes && (
//                   <div style={{ 
//                     backgroundColor: "#f5f5f5",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     borderLeft: "3px solid #000"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.5rem",
//                       color: "#000"
//                     }}>User Notes</h4>
//                     <p style={{ 
//                       margin: 0, 
//                       color: "#333",
//                       fontStyle: "italic"
//                     }}>{request.notes}</p>
//                   </div>
//                 )}
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "flex-end", 
//                 gap: "1rem",
//                 borderTop: "1px solid #eee",
//                 paddingTop: "1rem",
//                 flexWrap: "wrap"
//               }}>
//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "approved")}
//                   style={{
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3d8b40"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "rejected")}
//                   style={{
//                     backgroundColor: "#F44336",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#d32f2f"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#F44336"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="18" y1="6" x2="6" y2="18"></line>
//                     <line x1="6" y1="6" x2="18" y2="18"></line>
//                   </svg>
//                   Reject
//                 </button>

//                 <button
//                   onClick={() => handleDeleteRequest(request._id)}
//                   style={{
//                     backgroundColor: "#757575",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#616161"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#757575"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="3 6 5 6 21 6"></polyline>
//                     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                   </svg>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminItemExchange;

// import React, { useState, useEffect } from "react";

// const AdminItemExchange = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/api/exchange");
//       if (!response.ok) {
//         throw new Error("Failed to fetch requests");
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDeleteRequest = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const getStatusBadgeStyle = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return { backgroundColor: '#FFD700', color: '#000' };
//       case 'approved':
//         return { backgroundColor: '#4CAF50', color: '#fff' };
//       case 'rejected':
//         return { backgroundColor: '#F44336', color: '#fff' };
//       default:
//         return { backgroundColor: '#9E9E9E', color: '#fff' };
//     }
//   };

//   const getValueCategory = (price) => {
//     if (!price) return 'Unknown value';
//     if (price < 5000) return 'Low-value item';
//     if (price < 20000) return 'Mid-value item';
//     return 'High-value item';
//   };

//   const getValueCategoryStyle = (price) => {
//     if (!price) return { backgroundColor: '#9E9E9E', color: '#fff' };
//     if (price < 5000) return { backgroundColor: '#2196F3', color: '#fff' };
//     if (price < 20000) return { backgroundColor: '#FF9800', color: '#000' };
//     return { backgroundColor: '#F44336', color: '#fff' };
//   };

//   return (
//     <div className="admin-exchange-container" style={{ 
//       padding: "2rem", 
//       maxWidth: "1200px", 
//       margin: "0 auto",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       backgroundColor: "#fff"
//     }}>
//       <div style={{ 
//         textAlign: "center", 
//         marginBottom: "2rem",
//         borderBottom: "1px solid #eee",
//         paddingBottom: "1rem"
//       }}>
//         <h2 style={{ 
//           margin: 0, 
//           color: "#333",
//           fontSize: "2rem",
//           fontWeight: "600"
//         }}>Item Exchange Requests</h2>
//         <p style={{ 
//           color: "#666",
//           marginTop: "0.5rem",
//           fontSize: "1rem"
//         }}>Review and manage item exchange requests between users</p>
//       </div>

//       {loading ? (
//         <div style={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           height: "200px"
//         }}>
//           <div className="spinner" style={{
//             border: "4px solid rgba(0, 0, 0, 0.1)",
//             width: "36px",
//             height: "36px",
//             borderRadius: "50%",
//             borderLeftColor: "#000",
//             animation: "spin 1s linear infinite"
//           }}></div>
//         </div>
//       ) : error ? (
//         <div style={{ 
//           backgroundColor: "#FFEBEE", 
//           color: "#B71C1C", 
//           padding: "1rem", 
//           borderRadius: "4px",
//           marginBottom: "1rem",
//           textAlign: "center"
//         }}>
//           {error}
//         </div>
//       ) : requests.length === 0 ? (
//         <div style={{ 
//           textAlign: "center", 
//           padding: "2rem",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "8px"
//         }}>
//           <p style={{ color: "#666" }}>No exchange requests available at this time.</p>
//         </div>
//       ) : (
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "column", 
//           gap: "1.5rem"
//         }}>
//           {requests.map((request) => (
//             <div
//               key={request._id}
//               style={{
//                 padding: "1.5rem",
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
//                 borderLeft: "4px solid #000"
//               }}
//             >
//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "space-between", 
//                 alignItems: "center",
//                 marginBottom: "1rem"
//               }}>
//                 <h3 style={{ 
//                   margin: 0, 
//                   color: "#333",
//                   fontSize: "1.25rem"
//                 }}>
//                   Exchange Request #{request._id.slice(-6).toUpperCase()}
//                 </h3>
//                 <span style={{ 
//                   padding: "0.25rem 0.75rem",
//                   borderRadius: "12px",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                   ...getStatusBadgeStyle(request.status)
//                 }}>
//                   {request.status.toUpperCase()}
//                 </span>
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 gap: "1.5rem",
//                 marginBottom: "1.5rem"
//               }}>
//                 <div style={{ 
//                   display: "flex", 
//                   justifyContent: "space-between",
//                   gap: "1rem",
//                   flexWrap: "wrap"
//                 }}>
//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Item Out</h4>
//                     <div style={{ 
//                       display: "flex", 
//                       gap: "1rem",
//                       alignItems: "center"
//                     }}>
//                       <img
//                         src={request.itemOutImages?.[0] || "/default-placeholder.png"}
//                         alt={request.itemOut}
//                         style={{ 
//                           width: "80px", 
//                           height: "80px", 
//                           borderRadius: "8px", 
//                           objectFit: "cover",
//                           border: "1px solid #eee"
//                         }}
//                         onError={(e) => (e.target.src = "/default-placeholder.png")}
//                       />
//                       <div>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           fontWeight: "500"
//                         }}>{request.itemOut}</p>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           color: "#666",
//                           fontSize: "0.875rem"
//                         }}>Condition: {request.itemOutCondition}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "50px"
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </div>

//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Item In</h4>
//                     <div style={{ 
//                       display: "flex", 
//                       gap: "1rem",
//                       alignItems: "center"
//                     }}>
//                       <img
//                         src={request.itemInImages?.[0] || "/default-placeholder.png"}
//                         alt={request.itemIn}
//                         style={{ 
//                           width: "80px", 
//                           height: "80px", 
//                           borderRadius: "8px", 
//                           objectFit: "cover",
//                           border: "1px solid #eee"
//                         }}
//                         onError={(e) => (e.target.src = "/default-placeholder.png")}
//                       />
//                       <div>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           fontWeight: "500"
//                         }}>{request.itemIn}</p>
//                         <p style={{ 
//                           margin: "0.25rem 0", 
//                           color: "#666",
//                           fontSize: "0.875rem"
//                         }}>Condition: {request.itemInCondition}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Estimated Value Section */}
//                 <div style={{ 
//                   backgroundColor: "#f0f8ff",
//                   padding: "1rem",
//                   borderRadius: "8px",
//                   borderLeft: "3px solid #2196F3"
//                 }}>
//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     gap: "1rem",
//                     flexWrap: "wrap"
//                   }}>
//                     <div>
//                       <h4 style={{ 
//                         margin: "0 0 0.5rem 0",
//                         color: "#333",
//                         fontSize: "1rem"
//                       }}>Estimated Value</h4>
//                       <p style={{ 
//                         margin: 0,
//                         fontSize: "1.5rem",
//                         fontWeight: "600",
//                         color: "#000"
//                       }}>
//                         NPR {request.itemOutPrice?.toLocaleString() || 'N/A'}
//                       </p>
//                     </div>
//                     <span style={{ 
//                       padding: "0.5rem 1rem",
//                       borderRadius: "20px",
//                       fontSize: "0.875rem",
//                       fontWeight: "600",
//                       ...getValueCategoryStyle(request.itemOutPrice)
//                     }}>
//                       {getValueCategory(request.itemOutPrice)}
//                     </span>
//                   </div>
//                 </div>

//                 {request.notes && (
//                   <div style={{ 
//                     backgroundColor: "#f5f5f5",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     borderLeft: "3px solid #000"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.5rem",
//                       color: "#000"
//                     }}>User Notes</h4>
//                     <p style={{ 
//                       margin: 0, 
//                       color: "#333",
//                       fontStyle: "italic"
//                     }}>{request.notes}</p>
//                   </div>
//                 )}
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "flex-end", 
//                 gap: "1rem",
//                 borderTop: "1px solid #eee",
//                 paddingTop: "1rem",
//                 flexWrap: "wrap"
//               }}>
//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "approved")}
//                   style={{
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3d8b40"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => handleStatusUpdate(request._id, "rejected")}
//                   style={{
//                     backgroundColor: "#F44336",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#d32f2f"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#F44336"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="18" y1="6" x2="6" y2="18"></line>
//                     <line x1="6" y1="6" x2="18" y2="18"></line>
//                   </svg>
//                   Reject
//                 </button>

//                 <button
//                   onClick={() => handleDeleteRequest(request._id)}
//                   style={{
//                     backgroundColor: "#757575",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#616161"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#757575"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="3 6 5 6 21 6"></polyline>
//                     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                   </svg>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminItemExchange;

// import React, { useState, useEffect } from "react";

// const AdminItemExchange = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/api/exchange");
//       if (!response.ok) {
//         throw new Error("Failed to fetch requests");
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}/status`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDeleteRequest = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const getStatusBadgeStyle = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return { backgroundColor: '#FFD700', color: '#000' };
//       case 'approved':
//         return { backgroundColor: '#4CAF50', color: '#fff' };
//       case 'rejected':
//         return { backgroundColor: '#F44336', color: '#fff' };
//       case 'completed':
//         return { backgroundColor: '#2196F3', color: '#fff' };
//       default:
//         return { backgroundColor: '#9E9E9E', color: '#fff' };
//     }
//   };

//   const calculateTotalValue = (items) => {
//     return items.reduce((total, item) => total + (item.price || 0), 0);
//   };

//   const getValueCategory = (price) => {
//     if (!price) return 'Unknown value';
//     if (price < 5000) return 'Low-value item';
//     if (price < 20000) return 'Mid-value item';
//     return 'High-value item';
//   };

//   const getValueCategoryStyle = (price) => {
//     if (!price) return { backgroundColor: '#9E9E9E', color: '#fff' };
//     if (price < 5000) return { backgroundColor: '#2196F3', color: '#fff' };
//     if (price < 20000) return { backgroundColor: '#FF9800', color: '#000' };
//     return { backgroundColor: '#F44336', color: '#fff' };
//   };

//   return (
//     <div className="admin-exchange-container" style={{ 
//       padding: "2rem", 
//       maxWidth: "1200px", 
//       margin: "0 auto",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       backgroundColor: "#fff"
//     }}>
//       <div style={{ 
//         textAlign: "center", 
//         marginBottom: "2rem",
//         borderBottom: "1px solid #eee",
//         paddingBottom: "1rem"
//       }}>
//         <h2 style={{ 
//           margin: 0, 
//           color: "#333",
//           fontSize: "2rem",
//           fontWeight: "600"
//         }}>Item Exchange Requests</h2>
//         <p style={{ 
//           color: "#666",
//           marginTop: "0.5rem",
//           fontSize: "1rem"
//         }}>Review and manage item exchange requests between users</p>
//       </div>

//       {loading ? (
//         <div style={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           height: "200px"
//         }}>
//           <div className="spinner" style={{
//             border: "4px solid rgba(0, 0, 0, 0.1)",
//             width: "36px",
//             height: "36px",
//             borderRadius: "50%",
//             borderLeftColor: "#000",
//             animation: "spin 1s linear infinite"
//           }}></div>
//         </div>
//       ) : error ? (
//         <div style={{ 
//           backgroundColor: "#FFEBEE", 
//           color: "#B71C1C", 
//           padding: "1rem", 
//           borderRadius: "4px",
//           marginBottom: "1rem",
//           textAlign: "center"
//         }}>
//           {error}
//         </div>
//       ) : requests.length === 0 ? (
//         <div style={{ 
//           textAlign: "center", 
//           padding: "2rem",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "8px"
//         }}>
//           <p style={{ color: "#666" }}>No exchange requests available at this time.</p>
//         </div>
//       ) : (
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "column", 
//           gap: "1.5rem"
//         }}>
//           {requests.map((request) => (
//             <div
//               key={request._id}
//               style={{
//                 padding: "1.5rem",
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
//                 borderLeft: `4px solid ${request.status === 'approved' ? '#4CAF50' : 
//                             request.status === 'rejected' ? '#F44336' : 
//                             request.status === 'completed' ? '#2196F3' : '#000'}`
//               }}
//             >
//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "space-between", 
//                 alignItems: "center",
//                 marginBottom: "1rem"
//               }}>
//                 <h3 style={{ 
//                   margin: 0, 
//                   color: "#333",
//                   fontSize: "1.25rem"
//                 }}>
//                   Exchange Request #{request._id.slice(-6).toUpperCase()}
//                 </h3>
//                 <span style={{ 
//                   padding: "0.25rem 0.75rem",
//                   borderRadius: "12px",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                   ...getStatusBadgeStyle(request.status)
//                 }}>
//                   {request.status.toUpperCase()}
//                 </span>
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 gap: "1.5rem",
//                 marginBottom: "1.5rem"
//               }}>
//                 <div style={{ 
//                   display: "flex", 
//                   justifyContent: "space-between",
//                   gap: "1rem",
//                   flexWrap: "wrap"
//                 }}>
//                   {/* Items Out Section */}
//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Items Offered ({request.itemsOut.length})</h4>
//                     {request.itemsOut.map((item, index) => (
//                       <div key={index} style={{ 
//                         marginBottom: "1rem",
//                         paddingBottom: "1rem",
//                         borderBottom: index < request.itemsOut.length - 1 ? "1px solid #eee" : "none"
//                       }}>
//                         <div style={{ 
//                           display: "flex", 
//                           gap: "1rem",
//                           alignItems: "center"
//                         }}>
//                           <img
//                             src={item.images?.[0] || "/default-placeholder.png"}
//                             alt={item.name}
//                             style={{ 
//                               width: "80px", 
//                               height: "80px", 
//                               borderRadius: "8px", 
//                               objectFit: "cover",
//                               border: "1px solid #eee"
//                             }}
//                             onError={(e) => (e.target.src = "/default-placeholder.png")}
//                           />
//                           <div>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               fontWeight: "500"
//                             }}>{item.name}</p>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               color: "#666",
//                               fontSize: "0.875rem"
//                             }}>Condition: {item.condition}</p>
//                             {item.price && (
//                               <p style={{ 
//                                 margin: "0.25rem 0", 
//                                 color: "#666",
//                                 fontSize: "0.875rem"
//                               }}>Value: NPR {item.price.toLocaleString()}</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "50px"
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </div>

//                   {/* Items In Section */}
//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Items Requested ({request.itemsIn.length})</h4>
//                     {request.itemsIn.map((item, index) => (
//                       <div key={index} style={{ 
//                         marginBottom: "1rem",
//                         paddingBottom: "1rem",
//                         borderBottom: index < request.itemsIn.length - 1 ? "1px solid #eee" : "none"
//                       }}>
//                         <div style={{ 
//                           display: "flex", 
//                           gap: "1rem",
//                           alignItems: "center"
//                         }}>
//                           <img
//                             src={item.images?.[0] || "/default-placeholder.png"}
//                             alt={item.name}
//                             style={{ 
//                               width: "80px", 
//                               height: "80px", 
//                               borderRadius: "8px", 
//                               objectFit: "cover",
//                               border: "1px solid #eee"
//                             }}
//                             onError={(e) => (e.target.src = "/default-placeholder.png")}
//                           />
//                           <div>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               fontWeight: "500"
//                             }}>{item.name}</p>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               color: "#666",
//                               fontSize: "0.875rem"
//                             }}>Condition: {item.condition}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Total Value Section */}
//                 <div style={{ 
//                   backgroundColor: "#f0f8ff",
//                   padding: "1rem",
//                   borderRadius: "8px",
//                   borderLeft: "3px solid #2196F3"
//                 }}>
//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     gap: "1rem",
//                     flexWrap: "wrap"
//                   }}>
//                     <div>
//                       <h4 style={{ 
//                         margin: "0 0 0.5rem 0",
//                         color: "#333",
//                         fontSize: "1rem"
//                       }}>Total Estimated Value</h4>
//                       <p style={{ 
//                         margin: 0,
//                         fontSize: "1.5rem",
//                         fontWeight: "600",
//                         color: "#000"
//                       }}>
//                         NPR {calculateTotalValue(request.itemsOut).toLocaleString() || 'N/A'}
//                       </p>
//                     </div>
//                     <span style={{ 
//                       padding: "0.5rem 1rem",
//                       borderRadius: "20px",
//                       fontSize: "0.875rem",
//                       fontWeight: "600",
//                       ...getValueCategoryStyle(calculateTotalValue(request.itemsOut))
//                     }}>
//                       {getValueCategory(calculateTotalValue(request.itemsOut))}
//                     </span>
//                   </div>
//                 </div>

//                 {request.notes && (
//                   <div style={{ 
//                     backgroundColor: "#f5f5f5",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     borderLeft: "3px solid #000"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.5rem",
//                       color: "#000"
//                     }}>User Notes</h4>
//                     <p style={{ 
//                       margin: 0, 
//                       color: "#333",
//                       fontStyle: "italic"
//                     }}>{request.notes}</p>
//                   </div>
//                 )}
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "flex-end", 
//                 gap: "1rem",
//                 borderTop: "1px solid #eee",
//                 paddingTop: "1rem",
//                 flexWrap: "wrap"
//               }}>
//                 {request.status !== 'completed' && (
//                   <>
//                     <button
//                       onClick={() => handleStatusUpdate(request._id, "approved")}
//                       style={{
//                         backgroundColor: "#4CAF50",
//                         color: "white",
//                         padding: "0.5rem 1.25rem",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "0.875rem",
//                         fontWeight: "500",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         transition: "background-color 0.2s",
//                         minWidth: "100px",
//                         justifyContent: "center"
//                       }}
//                       onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3d8b40"}
//                       onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <polyline points="20 6 9 17 4 12"></polyline>
//                       </svg>
//                       Approve
//                     </button>

//                     <button
//                       onClick={() => handleStatusUpdate(request._id, "rejected")}
//                       style={{
//                         backgroundColor: "#F44336",
//                         color: "white",
//                         padding: "0.5rem 1.25rem",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "0.875rem",
//                         fontWeight: "500",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         transition: "background-color 0.2s",
//                         minWidth: "100px",
//                         justifyContent: "center"
//                       }}
//                       onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#d32f2f"}
//                       onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#F44336"}
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <line x1="18" y1="6" x2="6" y2="18"></line>
//                         <line x1="6" y1="6" x2="18" y2="18"></line>
//                       </svg>
//                       Reject
//                     </button>

//                     <button
//                       onClick={() => handleStatusUpdate(request._id, "completed")}
//                       style={{
//                         backgroundColor: "#2196F3",
//                         color: "white",
//                         padding: "0.5rem 1.25rem",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "0.875rem",
//                         fontWeight: "500",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         transition: "background-color 0.2s",
//                         minWidth: "100px",
//                         justifyContent: "center"
//                       }}
//                       onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1976D2"}
//                       onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2196F3"}
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                         <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                       </svg>
//                       Complete
//                     </button>
//                   </>
//                 )}

//                 <button
//                   onClick={() => handleDeleteRequest(request._id)}
//                   style={{
//                     backgroundColor: "#757575",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                   onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#616161"}
//                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#757575"}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="3 6 5 6 21 6"></polyline>
//                     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                   </svg>
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminItemExchange;

// import React, { useState, useEffect } from "react";

// const AdminItemExchange = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/api/exchange");
//       if (!response.ok) {
//         throw new Error("Failed to fetch requests");
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}/status`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDeleteRequest = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const getStatusBadgeStyle = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return { backgroundColor: '#FFD700', color: '#000' };
//       case 'approved':
//         return { backgroundColor: '#4CAF50', color: '#fff' };
//       case 'rejected':
//         return { backgroundColor: '#F44336', color: '#fff' };
//       default:
//         return { backgroundColor: '#9E9E9E', color: '#fff' };
//     }
//   };

//   const calculateTotalValue = (items) => {
//     return items.reduce((total, item) => total + (item.price || 0), 0);
//   };

//   const getValueCategory = (price) => {
//     if (!price) return 'Unknown value';
//     if (price < 5000) return 'Low-value item';
//     if (price < 20000) return 'Mid-value item';
//     return 'High-value item';
//   };

//   const getValueCategoryStyle = (price) => {
//     if (!price) return { backgroundColor: '#9E9E9E', color: '#fff' };
//     if (price < 5000) return { backgroundColor: '#2196F3', color: '#fff' };
//     if (price < 20000) return { backgroundColor: '#FF9800', color: '#000' };
//     return { backgroundColor: '#F44336', color: '#fff' };
//   };

//   return (
//     <div className="admin-exchange-container" style={{ 
//       padding: "2rem", 
//       maxWidth: "1200px", 
//       margin: "0 auto",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       backgroundColor: "#fff"
//     }}>
//       <div style={{ 
//         textAlign: "center", 
//         marginBottom: "2rem",
//         borderBottom: "1px solid #eee",
//         paddingBottom: "1rem"
//       }}>
//         <h2 style={{ 
//           margin: 0, 
//           color: "#333",
//           fontSize: "2rem",
//           fontWeight: "600"
//         }}>Item Exchange Requests</h2>
//         <p style={{ 
//           color: "#666",
//           marginTop: "0.5rem",
//           fontSize: "1rem"
//         }}>Review and manage item exchange requests between users</p>
//       </div>

//       {loading ? (
//         <div style={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           height: "200px"
//         }}>
//           <div className="spinner" style={{
//             border: "4px solid rgba(0, 0, 0, 0.1)",
//             width: "36px",
//             height: "36px",
//             borderRadius: "50%",
//             borderLeftColor: "#000",
//             animation: "spin 1s linear infinite"
//           }}></div>
//         </div>
//       ) : error ? (
//         <div style={{ 
//           backgroundColor: "#FFEBEE", 
//           color: "#B71C1C", 
//           padding: "1rem", 
//           borderRadius: "4px",
//           marginBottom: "1rem",
//           textAlign: "center"
//         }}>
//           {error}
//         </div>
//       ) : requests.length === 0 ? (
//         <div style={{ 
//           textAlign: "center", 
//           padding: "2rem",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "8px"
//         }}>
//           <p style={{ color: "#666" }}>No exchange requests available at this time.</p>
//         </div>
//       ) : (
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "column", 
//           gap: "1.5rem"
//         }}>
//           {requests.map((request) => (
//             <div
//               key={request._id}
//               style={{
//                 padding: "1.5rem",
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
//                 borderLeft: `4px solid ${request.status === 'approved' ? '#4CAF50' : 
//                             request.status === 'rejected' ? '#F44336' : '#000'}`
//               }}
//             >
//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "space-between", 
//                 alignItems: "center",
//                 marginBottom: "1rem"
//               }}>
//                 <h3 style={{ 
//                   margin: 0, 
//                   color: "#333",
//                   fontSize: "1.25rem"
//                 }}>
//                   Exchange Request #{request._id.slice(-6).toUpperCase()}
//                 </h3>
//                 <span style={{ 
//                   padding: "0.25rem 0.75rem",
//                   borderRadius: "12px",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                   ...getStatusBadgeStyle(request.status)
//                 }}>
//                   {request.status.toUpperCase()}
//                 </span>
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 gap: "1.5rem",
//                 marginBottom: "1.5rem"
//               }}>
//                 <div style={{ 
//                   display: "flex", 
//                   justifyContent: "space-between",
//                   gap: "1rem",
//                   flexWrap: "wrap"
//                 }}>
//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Items Offered ({request.itemsOut.length})</h4>
//                     {request.itemsOut.map((item, index) => (
//                       <div key={index} style={{ 
//                         marginBottom: "1rem",
//                         paddingBottom: "1rem",
//                         borderBottom: index < request.itemsOut.length - 1 ? "1px solid #eee" : "none"
//                       }}>
//                         <div style={{ 
//                           display: "flex", 
//                           gap: "1rem",
//                           alignItems: "center"
//                         }}>
//                           <img
//                             src={item.images?.[0] || "/default-placeholder.png"}
//                             alt={item.name}
//                             style={{ 
//                               width: "80px", 
//                               height: "80px", 
//                               borderRadius: "8px", 
//                               objectFit: "cover",
//                               border: "1px solid #eee"
//                             }}
//                             onError={(e) => (e.target.src = "/default-placeholder.png")}
//                           />
//                           <div>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               fontWeight: "500"
//                             }}>{item.name}</p>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               color: "#666",
//                               fontSize: "0.875rem"
//                             }}>Condition: {item.condition}</p>
//                             {item.price && (
//                               <p style={{ 
//                                 margin: "0.25rem 0", 
//                                 color: "#666",
//                                 fontSize: "0.875rem"
//                               }}>Value: NPR {item.price.toLocaleString()}</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "50px"
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </div>

//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Items Requested ({request.itemsIn.length})</h4>
//                     {request.itemsIn.map((item, index) => (
//                       <div key={index} style={{ 
//                         marginBottom: "1rem",
//                         paddingBottom: "1rem",
//                         borderBottom: index < request.itemsIn.length - 1 ? "1px solid #eee" : "none"
//                       }}>
//                         <div style={{ 
//                           display: "flex", 
//                           gap: "1rem",
//                           alignItems: "center"
//                         }}>
//                           <img
//                             src={item.images?.[0] || "/default-placeholder.png"}
//                             alt={item.name}
//                             style={{ 
//                               width: "80px", 
//                               height: "80px", 
//                               borderRadius: "8px", 
//                               objectFit: "cover",
//                               border: "1px solid #eee"
//                             }}
//                             onError={(e) => (e.target.src = "/default-placeholder.png")}
//                           />
//                           <div>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               fontWeight: "500"
//                             }}>{item.name}</p>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               color: "#666",
//                               fontSize: "0.875rem"
//                             }}>Condition: {item.condition}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div style={{ 
//                   backgroundColor: "#f0f8ff",
//                   padding: "1rem",
//                   borderRadius: "8px",
//                   borderLeft: "3px solid #2196F3"
//                 }}>
//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     gap: "1rem",
//                     flexWrap: "wrap"
//                   }}>
//                     <div>
//                       <h4 style={{ 
//                         margin: "0 0 0.5rem 0",
//                         color: "#333",
//                         fontSize: "1rem"
//                       }}>Total Estimated Value</h4>
//                       <p style={{ 
//                         margin: 0,
//                         fontSize: "1.5rem",
//                         fontWeight: "600",
//                         color: "#000"
//                       }}>
//                         NPR {calculateTotalValue(request.itemsOut).toLocaleString() || 'N/A'}
//                       </p>
//                     </div>
//                     <span style={{ 
//                       padding: "0.5rem 1rem",
//                       borderRadius: "20px",
//                       fontSize: "0.875rem",
//                       fontWeight: "600",
//                       ...getValueCategoryStyle(calculateTotalValue(request.itemsOut))
//                     }}>
//                       {getValueCategory(calculateTotalValue(request.itemsOut))}
//                     </span>
//                   </div>
//                 </div>

//                 {request.notes && (
//                   <div style={{ 
//                     backgroundColor: "#f5f5f5",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     borderLeft: "3px solid #000"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.5rem",
//                       color: "#000"
//                     }}>User Notes</h4>
//                     <p style={{ 
//                       margin: 0, 
//                       color: "#333",
//                       fontStyle: "italic"
//                     }}>{request.notes}</p>
//                   </div>
//                 )}
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "flex-end", 
//                 gap: "1rem",
//                 borderTop: "1px solid #eee",
//                 paddingTop: "1rem",
//                 flexWrap: "wrap"
//               }}>
//                 {request.status === 'pending' && (
//                   <>
//                     <button
//                       onClick={() => handleStatusUpdate(request._id, "approved")}
//                       style={{
//                         backgroundColor: "#4CAF50",
//                         color: "white",
//                         padding: "0.5rem 1.25rem",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "0.875rem",
//                         fontWeight: "500",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         transition: "background-color 0.2s",
//                         minWidth: "100px",
//                         justifyContent: "center"
//                       }}
//                     >
//                       Approve
//                     </button>

//                     <button
//                       onClick={() => handleStatusUpdate(request._id, "rejected")}
//                       style={{
//                         backgroundColor: "#F44336",
//                         color: "white",
//                         padding: "0.5rem 1.25rem",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "0.875rem",
//                         fontWeight: "500",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         transition: "background-color 0.2s",
//                         minWidth: "100px",
//                         justifyContent: "center"
//                       }}
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 <button
//                   onClick={() => handleDeleteRequest(request._id)}
//                   style={{
//                     backgroundColor: "#757575",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminItemExchange;


// import React, { useState, useEffect } from "react";

// const AdminItemExchange = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/api/exchange");
//       if (!response.ok) {
//         throw new Error("Failed to fetch requests");
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}/status`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDeleteRequest = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete request");
//       }

//       await fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const getStatusBadgeStyle = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return { backgroundColor: '#FFD700', color: '#000' };
//       case 'approved':
//         return { backgroundColor: '#4CAF50', color: '#fff' };
//       case 'rejected':
//         return { backgroundColor: '#F44336', color: '#fff' };
//       default:
//         return { backgroundColor: '#9E9E9E', color: '#fff' };
//     }
//   };

//   const calculateTotalValue = (items) => {
//     return items.reduce((total, item) => total + (item.price || 0), 0);
//   };

//   const getValueCategory = (price) => {
//     if (!price) return 'Unknown value';
//     if (price < 5000) return 'Low-value item';
//     if (price < 20000) return 'Mid-value item';
//     return 'High-value item';
//   };

//   const getValueCategoryStyle = (price) => {
//     if (!price) return { backgroundColor: '#9E9E9E', color: '#fff' };
//     if (price < 5000) return { backgroundColor: '#2196F3', color: '#fff' };
//     if (price < 20000) return { backgroundColor: '#FF9800', color: '#000' };
//     return { backgroundColor: '#F44336', color: '#fff' };
//   };

//   return (
//     <div className="admin-exchange-container" style={{ 
//       padding: "2rem", 
//       maxWidth: "1200px", 
//       margin: "0 auto",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       backgroundColor: "#fff"
//     }}>
//       <div style={{ 
//         textAlign: "center", 
//         marginBottom: "2rem",
//         borderBottom: "1px solid #eee",
//         paddingBottom: "1rem"
//       }}>
//         <h2 style={{ 
//           margin: 0, 
//           color: "#333",
//           fontSize: "2rem",
//           fontWeight: "600"
//         }}>Item Exchange Requests</h2>
//         <p style={{ 
//           color: "#666",
//           marginTop: "0.5rem",
//           fontSize: "1rem"
//         }}>Review and manage item exchange requests between users</p>
//       </div>

//       {loading ? (
//         <div style={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           height: "200px"
//         }}>
//           <div className="spinner" style={{
//             border: "4px solid rgba(0, 0, 0, 0.1)",
//             width: "36px",
//             height: "36px",
//             borderRadius: "50%",
//             borderLeftColor: "#000",
//             animation: "spin 1s linear infinite"
//           }}></div>
//         </div>
//       ) : error ? (
//         <div style={{ 
//           backgroundColor: "#FFEBEE", 
//           color: "#B71C1C", 
//           padding: "1rem", 
//           borderRadius: "4px",
//           marginBottom: "1rem",
//           textAlign: "center"
//         }}>
//           {error}
//         </div>
//       ) : requests.length === 0 ? (
//         <div style={{ 
//           textAlign: "center", 
//           padding: "2rem",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "8px"
//         }}>
//           <p style={{ color: "#666" }}>No exchange requests available at this time.</p>
//         </div>
//       ) : (
//         <div style={{ 
//           display: "flex", 
//           flexDirection: "column", 
//           gap: "1.5rem"
//         }}>
//           {requests.map((request) => (
//             <div
//               key={request._id}
//               style={{
//                 padding: "1.5rem",
//                 backgroundColor: "#fff",
//                 borderRadius: "12px",
//                 boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
//                 borderLeft: `4px solid ${request.status === 'approved' ? '#4CAF50' : 
//                             request.status === 'rejected' ? '#F44336' : '#000'}`
//               }}
//             >
//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "space-between", 
//                 alignItems: "center",
//                 marginBottom: "1rem"
//               }}>
//                 <div>
//                   <h3 style={{ 
//                     margin: 0, 
//                     color: "#333",
//                     fontSize: "1.25rem"
//                   }}>
//                     Exchange Request #{request._id.slice(-6).toUpperCase()}
//                   </h3>
//                   {/* Added this line for user ID */}
//                   <p style={{ 
//                     margin: "0.25rem 0 0 0",
//                     color: "#666",
//                     fontSize: "0.875rem"
//                   }}>
//                     User ID: {request.userId || request.user?._id || "N/A"}
//                   </p>
//                 </div>
//                 <span style={{ 
//                   padding: "0.25rem 0.75rem",
//                   borderRadius: "12px",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                   ...getStatusBadgeStyle(request.status)
//                 }}>
//                   {request.status.toUpperCase()}
//                 </span>
//               </div>

//               {/* Rest of your existing request card content remains exactly the same */}
//               <div style={{ 
//                 display: "flex", 
//                 flexDirection: "column", 
//                 gap: "1.5rem",
//                 marginBottom: "1.5rem"
//               }}>
//                 <div style={{ 
//                   display: "flex", 
//                   justifyContent: "space-between",
//                   gap: "1rem",
//                   flexWrap: "wrap"
//                 }}>
//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Items Offered ({request.itemsOut.length})</h4>
//                     {request.itemsOut.map((item, index) => (
//                       <div key={index} style={{ 
//                         marginBottom: "1rem",
//                         paddingBottom: "1rem",
//                         borderBottom: index < request.itemsOut.length - 1 ? "1px solid #eee" : "none"
//                       }}>
//                         <div style={{ 
//                           display: "flex", 
//                           gap: "1rem",
//                           alignItems: "center"
//                         }}>
//                           <img
//                             src={item.images?.[0] || "/default-placeholder.png"}
//                             alt={item.name}
//                             style={{ 
//                               width: "80px", 
//                               height: "80px", 
//                               borderRadius: "8px", 
//                               objectFit: "cover",
//                               border: "1px solid #eee"
//                             }}
//                             onError={(e) => (e.target.src = "/default-placeholder.png")}
//                           />
//                           <div>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               fontWeight: "500"
//                             }}>{item.name}</p>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               color: "#666",
//                               fontSize: "0.875rem"
//                             }}>Condition: {item.condition}</p>
//                             {item.price && (
//                               <p style={{ 
//                                 margin: "0.25rem 0", 
//                                 color: "#666",
//                                 fontSize: "0.875rem"
//                               }}>Value: NPR {item.price.toLocaleString()}</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     justifyContent: "center",
//                     minWidth: "50px"
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </div>

//                   <div style={{ 
//                     flex: "1", 
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                     padding: "1rem",
//                     borderRadius: "8px"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.75rem",
//                       color: "#555"
//                     }}>Items Requested ({request.itemsIn.length})</h4>
//                     {request.itemsIn.map((item, index) => (
//                       <div key={index} style={{ 
//                         marginBottom: "1rem",
//                         paddingBottom: "1rem",
//                         borderBottom: index < request.itemsIn.length - 1 ? "1px solid #eee" : "none"
//                       }}>
//                         <div style={{ 
//                           display: "flex", 
//                           gap: "1rem",
//                           alignItems: "center"
//                         }}>
//                           <img
//                             src={item.images?.[0] || "/default-placeholder.png"}
//                             alt={item.name}
//                             style={{ 
//                               width: "80px", 
//                               height: "80px", 
//                               borderRadius: "8px", 
//                               objectFit: "cover",
//                               border: "1px solid #eee"
//                             }}
//                             onError={(e) => (e.target.src = "/default-placeholder.png")}
//                           />
//                           <div>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               fontWeight: "500"
//                             }}>{item.name}</p>
//                             <p style={{ 
//                               margin: "0.25rem 0", 
//                               color: "#666",
//                               fontSize: "0.875rem"
//                             }}>Condition: {item.condition}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div style={{ 
//                   backgroundColor: "#f0f8ff",
//                   padding: "1rem",
//                   borderRadius: "8px",
//                   borderLeft: "3px solid #2196F3"
//                 }}>
//                   <div style={{ 
//                     display: "flex", 
//                     alignItems: "center",
//                     gap: "1rem",
//                     flexWrap: "wrap"
//                   }}>
//                     <div>
//                       <h4 style={{ 
//                         margin: "0 0 0.5rem 0",
//                         color: "#333",
//                         fontSize: "1rem"
//                       }}>Total Estimated Value</h4>
//                       <p style={{ 
//                         margin: 0,
//                         fontSize: "1.5rem",
//                         fontWeight: "600",
//                         color: "#000"
//                       }}>
//                         NPR {calculateTotalValue(request.itemsOut).toLocaleString() || 'N/A'}
//                       </p>
//                     </div>
//                     <span style={{ 
//                       padding: "0.5rem 1rem",
//                       borderRadius: "20px",
//                       fontSize: "0.875rem",
//                       fontWeight: "600",
//                       ...getValueCategoryStyle(calculateTotalValue(request.itemsOut))
//                     }}>
//                       {getValueCategory(calculateTotalValue(request.itemsOut))}
//                     </span>
//                   </div>
//                 </div>

//                 {request.notes && (
//                   <div style={{ 
//                     backgroundColor: "#f5f5f5",
//                     padding: "1rem",
//                     borderRadius: "8px",
//                     borderLeft: "3px solid #000"
//                   }}>
//                     <h4 style={{ 
//                       marginTop: 0, 
//                       marginBottom: "0.5rem",
//                       color: "#000"
//                     }}>User Notes</h4>
//                     <p style={{ 
//                       margin: 0, 
//                       color: "#333",
//                       fontStyle: "italic"
//                     }}>{request.notes}</p>
//                   </div>
//                 )}
//               </div>

//               <div style={{ 
//                 display: "flex", 
//                 justifyContent: "flex-end", 
//                 gap: "1rem",
//                 borderTop: "1px solid #eee",
//                 paddingTop: "1rem",
//                 flexWrap: "wrap"
//               }}>
//                 {request.status === 'pending' && (
//                   <>
//                     <button
//                       onClick={() => handleStatusUpdate(request._id, "approved")}
//                       style={{
//                         backgroundColor: "#4CAF50",
//                         color: "white",
//                         padding: "0.5rem 1.25rem",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "0.875rem",
//                         fontWeight: "500",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         transition: "background-color 0.2s",
//                         minWidth: "100px",
//                         justifyContent: "center"
//                       }}
//                     >
//                       Approve
//                     </button>

//                     <button
//                       onClick={() => handleStatusUpdate(request._id, "rejected")}
//                       style={{
//                         backgroundColor: "#F44336",
//                         color: "white",
//                         padding: "0.5rem 1.25rem",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "0.875rem",
//                         fontWeight: "500",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         transition: "background-color 0.2s",
//                         minWidth: "100px",
//                         justifyContent: "center"
//                       }}
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 <button
//                   onClick={() => handleDeleteRequest(request._id)}
//                   style={{
//                     backgroundColor: "#757575",
//                     color: "white",
//                     padding: "0.5rem 1.25rem",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "0.875rem",
//                     fontWeight: "500",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     transition: "background-color 0.2s",
//                     minWidth: "100px",
//                     justifyContent: "center"
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminItemExchange;

import React, { useState, useEffect } from "react";

const AdminItemExchange = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(2); // Number of requests per page

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/exchange");
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      // Change from createdAt to date
      const sortedRequests = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRequests(sortedRequests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get current requests for pagination
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:3000/api/exchange/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      await fetchRequests();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      await fetchRequests();
      // Reset to first page if current page becomes empty after deletion
      if (currentRequests.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusBadgeStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { backgroundColor: '#FFD700', color: '#000' };
      case 'approved':
        return { backgroundColor: '#4CAF50', color: '#fff' };
      case 'rejected':
        return { backgroundColor: '#F44336', color: '#fff' };
      default:
        return { backgroundColor: '#9E9E9E', color: '#fff' };
    }
  };

  const calculateTotalValue = (items) => {
    return items.reduce((total, item) => total + (item.price || 0), 0);
  };

  const getValueCategory = (price) => {
    if (!price) return 'Unknown value';
    if (price < 5000) return 'Low-value item';
    if (price < 20000) return 'Mid-value item';
    return 'High-value item';
  };

  const getValueCategoryStyle = (price) => {
    if (!price) return { backgroundColor: '#9E9E9E', color: '#fff' };
    if (price < 5000) return { backgroundColor: '#2196F3', color: '#fff' };
    if (price < 20000) return { backgroundColor: '#FF9800', color: '#000' };
    return { backgroundColor: '#F44336', color: '#fff' };
  };

  return (
    <div className="admin-exchange-container" style={{ 
      padding: "2rem", 
      maxWidth: "1200px", 
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#fff"
    }}>
      <div style={{ 
        textAlign: "center", 
        marginBottom: "2rem",
        borderBottom: "1px solid #eee",
        paddingBottom: "1rem"
      }}>
        <h2 style={{ 
          margin: 0, 
          color: "#333",
          fontSize: "2rem",
          fontWeight: "600"
        }}>Item Exchange Requests</h2>
        <p style={{ 
          color: "#666",
          marginTop: "0.5rem",
          fontSize: "1rem"
        }}>Review and manage item exchange requests between users</p>
      </div>

      {loading ? (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "200px"
        }}>
          <div className="spinner" style={{
            border: "4px solid rgba(0, 0, 0, 0.1)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            borderLeftColor: "#000",
            animation: "spin 1s linear infinite"
          }}></div>
        </div>
      ) : error ? (
        <div style={{ 
          backgroundColor: "#FFEBEE", 
          color: "#B71C1C", 
          padding: "1rem", 
          borderRadius: "4px",
          marginBottom: "1rem",
          textAlign: "center"
        }}>
          {error}
        </div>
      ) : requests.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "2rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px"
        }}>
          <p style={{ color: "#666" }}>No exchange requests available at this time.</p>
        </div>
      ) : (
        <>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1.5rem",
            marginBottom: "2rem"
          }}>
            {currentRequests.map((request) => (
              <div
                key={request._id}
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
                  borderLeft: `4px solid ${request.status === 'approved' ? '#4CAF50' : 
                              request.status === 'rejected' ? '#F44336' : '#000'}`
                }}
              >
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  marginBottom: "1rem"
                }}>
                  <div>
                    <h3 style={{ 
                      margin: 0, 
                      color: "#333",
                      fontSize: "1.25rem"
                    }}>
                      Exchange Request #{request._id.slice(-6).toUpperCase()}
                    </h3>
                    <p style={{ 
                      margin: "0.25rem 0 0 0",
                      color: "#666",
                      fontSize: "0.875rem"
                    }}>
                      User ID: {request.userId || request.user?._id || "N/A"}
                    </p>
                    <p style={{ 
                      margin: "0.25rem 0 0 0",
                      color: "#666",
                      fontSize: "0.75rem"
                    }}>
                     {new Date(request.date).toLocaleString()}  {/* Changed from createdAt to date */}
                    </p>
                  </div>
                  <span style={{ 
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    ...getStatusBadgeStyle(request.status)
                  }}>
                    {request.status.toUpperCase()}
                  </span>
                </div>

                <div style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "1.5rem",
                  marginBottom: "1.5rem"
                }}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap"
                  }}>
                    <div style={{ 
                      flex: "1", 
                      minWidth: "250px",
                      backgroundColor: "#f9f9f9",
                      padding: "1rem",
                      borderRadius: "8px"
                    }}>
                      <h4 style={{ 
                        marginTop: 0, 
                        marginBottom: "0.75rem",
                        color: "#555"
                      }}>Items Offered ({request.itemsOut.length})</h4>
                      {request.itemsOut.map((item, index) => (
                        <div key={index} style={{ 
                          marginBottom: "1rem",
                          paddingBottom: "1rem",
                          borderBottom: index < request.itemsOut.length - 1 ? "1px solid #eee" : "none"
                        }}>
                          <div style={{ 
                            display: "flex", 
                            gap: "1rem",
                            alignItems: "center"
                          }}>
                            <img
                              src={item.images?.[0] || "/default-placeholder.png"}
                              alt={item.name}
                              style={{ 
                                width: "80px", 
                                height: "80px", 
                                borderRadius: "8px", 
                                objectFit: "cover",
                                border: "1px solid #eee"
                              }}
                              onError={(e) => (e.target.src = "/default-placeholder.png")}
                            />
                            <div>
                              <p style={{ 
                                margin: "0.25rem 0", 
                                fontWeight: "500"
                              }}>{item.name}</p>
                              <p style={{ 
                                margin: "0.25rem 0", 
                                color: "#666",
                                fontSize: "0.875rem"
                              }}>Condition: {item.condition}</p>
                              {item.price && (
                                <p style={{ 
                                  margin: "0.25rem 0", 
                                  color: "#666",
                                  fontSize: "0.875rem"
                                }}>Value: NPR {item.price.toLocaleString()}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "50px"
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>

                    <div style={{ 
                      flex: "1", 
                      minWidth: "250px",
                      backgroundColor: "#f9f9f9",
                      padding: "1rem",
                      borderRadius: "8px"
                    }}>
                      <h4 style={{ 
                        marginTop: 0, 
                        marginBottom: "0.75rem",
                        color: "#555"
                      }}>Items Requested ({request.itemsIn.length})</h4>
                      {request.itemsIn.map((item, index) => (
                        <div key={index} style={{ 
                          marginBottom: "1rem",
                          paddingBottom: "1rem",
                          borderBottom: index < request.itemsIn.length - 1 ? "1px solid #eee" : "none"
                        }}>
                          <div style={{ 
                            display: "flex", 
                            gap: "1rem",
                            alignItems: "center"
                          }}>
                            <img
                              src={item.images?.[0] || "/default-placeholder.png"}
                              alt={item.name}
                              style={{ 
                                width: "80px", 
                                height: "80px", 
                                borderRadius: "8px", 
                                objectFit: "cover",
                                border: "1px solid #eee"
                              }}
                              onError={(e) => (e.target.src = "/default-placeholder.png")}
                            />
                            <div>
                              <p style={{ 
                                margin: "0.25rem 0", 
                                fontWeight: "500"
                              }}>{item.name}</p>
                              <p style={{ 
                                margin: "0.25rem 0", 
                                color: "#666",
                                fontSize: "0.875rem"
                              }}>Condition: {item.condition}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ 
                    backgroundColor: "#f0f8ff",
                    padding: "1rem",
                    borderRadius: "8px",
                    borderLeft: "3px solid #2196F3"
                  }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap"
                    }}>
                      <div>
                        <h4 style={{ 
                          margin: "0 0 0.5rem 0",
                          color: "#333",
                          fontSize: "1rem"
                        }}>Total Estimated Value</h4>
                        <p style={{ 
                          margin: 0,
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          color: "#000"
                        }}>
                          NPR {calculateTotalValue(request.itemsOut).toLocaleString() || 'N/A'}
                        </p>
                      </div>
                      <span style={{ 
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        ...getValueCategoryStyle(calculateTotalValue(request.itemsOut))
                      }}>
                        {getValueCategory(calculateTotalValue(request.itemsOut))}
                      </span>
                    </div>
                  </div>

                  {request.notes && (
                    <div style={{ 
                      backgroundColor: "#f5f5f5",
                      padding: "1rem",
                      borderRadius: "8px",
                      borderLeft: "3px solid #000"
                    }}>
                      <h4 style={{ 
                        marginTop: 0, 
                        marginBottom: "0.5rem",
                        color: "#000"
                      }}>User Notes</h4>
                      <p style={{ 
                        margin: 0, 
                        color: "#333",
                        fontStyle: "italic"
                      }}>{request.notes}</p>
                    </div>
                  )}
                </div>

                <div style={{ 
                  display: "flex", 
                  justifyContent: "flex-end", 
                  gap: "1rem",
                  borderTop: "1px solid #eee",
                  paddingTop: "1rem",
                  flexWrap: "wrap"
                }}>
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(request._id, "approved")}
                        style={{
                          backgroundColor: "#4CAF50",
                          color: "white",
                          padding: "0.5rem 1.25rem",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          transition: "background-color 0.2s",
                          minWidth: "100px",
                          justifyContent: "center"
                        }}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleStatusUpdate(request._id, "rejected")}
                        style={{
                          backgroundColor: "#F44336",
                          color: "white",
                          padding: "0.5rem 1.25rem",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          transition: "background-color 0.2s",
                          minWidth: "100px",
                          justifyContent: "center"
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDeleteRequest(request._id)}
                    style={{
                      backgroundColor: "#757575",
                      color: "white",
                      padding: "0.5rem 1.25rem",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "background-color 0.2s",
                      minWidth: "100px",
                      justifyContent: "center"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {requests.length > requestsPerPage && (
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "2rem"
            }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #ddd",
                  backgroundColor: currentPage === 1 ? "#f5f5f5" : "#fff",
                  color: currentPage === 1 ? "#aaa" : "#333",
                  borderRadius: "4px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                Previous
              </button>

              {Array.from({ length: Math.ceil(requests.length / requestsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "1px solid #ddd",
                    backgroundColor: currentPage === index + 1 ? "#2196F3" : "#fff",
                    color: currentPage === index + 1 ? "#fff" : "#333",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: currentPage === index + 1 ? "600" : "400"
                  }}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(requests.length / requestsPerPage)))}
                disabled={currentPage === Math.ceil(requests.length / requestsPerPage)}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #ddd",
                  backgroundColor: currentPage === Math.ceil(requests.length / requestsPerPage) ? "#f5f5f5" : "#fff",
                  color: currentPage === Math.ceil(requests.length / requestsPerPage) ? "#aaa" : "#333",
                  borderRadius: "4px",
                  cursor: currentPage === Math.ceil(requests.length / requestsPerPage) ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminItemExchange;