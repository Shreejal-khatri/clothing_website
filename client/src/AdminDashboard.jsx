// // import React, { useState } from 'react';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User, ShoppingCart, Package, Bell, RefreshCw } from 'lucide-react';
// import AdminNavbar from './components/AdminNavbar';
// import AdminUserManagement from './components/AdminUserManagement';
// import AdminItemManagement from './components/AdminItemManagement';
// import AdminReports from './components/AdminReports';
// import AdminOrderList from './components/AdminOrderList';
// import AdminSettings from './components/AdminSettings';
// import AdminNotification from './components/AdminNotification';
// import AdminItemExchange from './components/AdminItemExchange';
// import { useAuth } from './context/AuthContext';

// const AdminDashboard = () => {
//   const [activeSection, setActiveSection] = useState('dashboard');
//   const [activeCard, setActiveCard] = useState(null);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const { currentUser, loading, logout, fetchProfile } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !currentUser) {
//       navigate('/admin/login'); // Only redirect if we're done loading and there's no user
//     }
//   }, [currentUser, loading, navigate]);

//   // Show loading state while checking auth
//   if (loading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         backgroundColor: '#f9f9f9'
//       }}>
//         <div>Loading...</div>
//       </div>
//     );
//   }


//   // Logout handler
//   const handleLogout = () => {
//     alert('Logged out successfully!');
//   };

//   // Styles
//   const dashboardStyles = {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//     backgroundColor: '#f9f9f9',
//     color: '#333',
//   };

//   const mainContentStyles = {
//     display: 'flex',
//     flex: 1,
//   };

//   const sidebarStyles = {
//     width: '250px',
//     backgroundColor: '#ffffff',
//     color: '#333',
//     padding: '1rem',
//     boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
//     position: 'sticky',
//     top: 0,
//     height: '100vh',
//     overflowY: 'auto',
//   };

//   const contentStyles = {
//     flex: 1,
//     padding: '2rem',
//     overflowY: 'auto',
//     marginTop: '4rem',
//   };

//   const sidebarLinkStyles = (section) => ({
//     display: 'block',
//     padding: '0.75rem 1rem',
//     color: activeSection === section ? '#fff' : '#333',
//     backgroundColor: activeSection === section ? '#000' : '#f0f0f0',
//     textDecoration: 'none',
//     borderRadius: '4px',
//     marginBottom: '0.5rem',
//     textAlign: 'center',
//     transition: 'background-color 0.3s ease, color 0.3s ease',
//     cursor: 'pointer',
//     '&:hover': {
//       backgroundColor: activeSection === section ? '#000' : '#ddd',
//     },
//   });

//   const cardContainerStyles = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//     gap: '2rem',
//   };

//   const cardStyles = (card) => ({
//     backgroundColor: '#ffffff',
//     padding: '2rem',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     cursor: 'pointer',
//     transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//     transform: hoveredCard === card ? 'scale(1.05)' : 'scale(1)',
//     '&:hover': {
//       boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
//     },
//   });

//   const iconStyles = { color: '#000', size: 48, marginBottom: '0.5rem' };

//   const footerStyles = {
//     textAlign: 'center',
//     padding: '1rem',
//     backgroundColor: '#f0f0f0',
//     borderTop: '1px solid #ddd',
//   };

//   return (
//     <div style={dashboardStyles}>
//       {/* Main Content and Sidebar */}
//       <div style={mainContentStyles}>
//         {/* Sidebar */}
//         <div style={sidebarStyles}>
//           <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Admin Panel</h2>
//           <div style={sidebarLinkStyles('dashboard')} onClick={() => { setActiveSection('dashboard'); setActiveCard(null); }}>
//             Dashboard
//           </div>
//           <div style={sidebarLinkStyles('reports')} onClick={() => { setActiveSection('reports'); setActiveCard(null); }}>
//             Reports
//           </div>
//           <div style={sidebarLinkStyles('settings')} onClick={() => { setActiveSection('settings'); setActiveCard(null); }}>
//             Settings
//           </div>
//         </div>

//         {/* Main Content */}
//         <div style={contentStyles}>
//           <AdminNavbar />
//           <h1 style={{ marginTop: '1rem', marginBottom: '2rem' }}>
//             {activeSection === 'dashboard'
//               ? 'Admin Dashboard'
//               : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
//           </h1>

//           {/* Card View for Dashboard Section */}
//           {activeSection === 'dashboard' && !activeCard && (
//             <div style={cardContainerStyles}>
//               <div
//                 style={cardStyles('users')}
//                 onClick={() => setActiveCard('users')}
//                 onMouseEnter={() => setHoveredCard('users')}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <User {...iconStyles} />
//                 <h3>User Management</h3>
//               </div>
//               <div
//                 style={cardStyles('items')}
//                 onClick={() => setActiveCard('items')}
//                 onMouseEnter={() => setHoveredCard('items')}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <ShoppingCart {...iconStyles} />
//                 <h3>Item Management</h3>
//               </div>
//               <div
//                 style={cardStyles('orders')}
//                 onClick={() => setActiveCard('orders')}
//                 onMouseEnter={() => setHoveredCard('orders')}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <Package {...iconStyles} />
//                 <h3>Order Management</h3>
//               </div>
//               <div
//                 style={cardStyles('notifications')}
//                 onClick={() => setActiveCard('notifications')}
//                 onMouseEnter={() => setHoveredCard('notifications')}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <Bell {...iconStyles} />
//                 <h3>Notification Management</h3>
//               </div>
//               <div
//                 style={cardStyles('exchange')}
//                 onClick={() => setActiveCard('exchange')}
//                 onMouseEnter={() => setHoveredCard('exchange')}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <RefreshCw {...iconStyles} />
//                 <h3>Item Exchange System</h3>
//               </div>
//             </div>
//           )}

//           {/* Management Content Section */}
//           {activeCard && (
//             <div
//               style={{
//                 marginTop: '2rem',
//                 padding: '2rem',
//                 backgroundColor: '#fff',
//                 borderRadius: '10px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <button
//                 onClick={() => setActiveCard(null)}
//                 style={{
//                   backgroundColor: '#000',
//                   color: '#fff',
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '5px',
//                   border: 'none',
//                   cursor: 'pointer',
//                   marginBottom: '1rem',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.5rem',
//                 }}
//               >
//                 🔙 Back to Dashboard
//               </button>
//               {activeCard === 'users' && <AdminUserManagement />}
//               {activeCard === 'items' && <AdminItemManagement />}
//               {activeCard === 'orders' && <AdminOrderList />}
//               {activeCard === 'notifications' && <AdminNotification />}
//               {activeCard === 'exchange' && <AdminItemExchange />}
//             </div>
//           )}

//           {/* Reports Section */}
//           {activeSection === 'reports' && <AdminReports />}

//           {/* Settings Section */}
//           {activeSection === 'settings' && (
//             <AdminSettings onLogout={handleLogout} />
//           )}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer style={footerStyles}>
//         <p>© 2025 Admin Dashboard. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingCart, Package, Bell, RefreshCw } from 'lucide-react';
import AdminNavbar from './components/AdminNavbar';
import AdminUserManagement from './components/AdminUserManagement';
import AdminItemManagement from './components/AdminItemManagement';
import AdminReports from './components/AdminReports';
import AdminOrderList from './components/AdminOrderList';
import AdminSettings from './components/AdminSettings';
import AdminNotification from './components/AdminNotification';
import AdminItemExchange from './components/AdminItemExchange';
import { useAuth } from './context/AuthContext';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { currentUser, loading, logout, fetchProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/admin/login'); // Only redirect if we're done loading and there's no user
    }
  }, [currentUser, loading, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            border: '4px solid #e2e8f0',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <div style={{ fontWeight: 500, color: '#475569' }}>Loading dashboard...</div>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Logout handler
  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  // Styles
  const dashboardStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    color: '#334155',
    fontFamily: 'Inter, system-ui, sans-serif',
  };

  const mainContentStyles = {
    display: 'flex',
    flex: 1,
  };

  const sidebarStyles = {
    width: '280px',
    backgroundColor: '#ffffff',
    color: '#334155',
    padding: '1.5rem 1rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
    zIndex: 10,
    borderRight: '1px solid #e2e8f0',
  };

  const sidebarLogoStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3rem', // Increased from 2rem to 3rem
    fontWeight: 700,
    fontSize: '1.25rem',
    letterSpacing: '-0.025em',
    color: '#1e293b',
    paddingBottom: '1rem', // Added padding at the bottom
    borderBottom: '1px solid #e2e8f0', // Added a subtle border
  };

  const contentStyles = {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto',
    marginTop: '5rem', // Increased from 4rem to 5rem
    maxWidth: '1600px',
    margin: '0 auto',
    width: '100%',
  };

  const sidebarLinkStyles = (section) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.875rem 1.25rem',
    color: activeSection === section ? '#ffffff' : '#64748b',
    backgroundColor: activeSection === section ? '#0f172a' : 'transparent',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    marginBottom: '0.75rem', // Slightly increased for more vertical spacing
    fontWeight: 500,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    fontSize: '0.9375rem',
  });

  const cardContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem', // Added top margin for more space after the title
  };

  const cardStyles = (card) => ({
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: hoveredCard === card 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: hoveredCard === card ? 'translateY(-8px)' : 'translateY(0)',
    border: '1px solid #f1f5f9',
  });

  const cardTitleStyles = {
    marginTop: '1rem',
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#1e293b',
  };

  const iconContainerStyles = {
    display: 'inline-flex',
    padding: '1rem',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    marginBottom: '1rem',
  };

  const iconStyles = { 
    color: '#0f172a', 
    size: 32
  };

  const footerStyles = {
    textAlign: 'center',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e2e8f0',
    color: '#64748b',
    fontSize: '0.875rem',
    marginTop: '3rem', // Added margin top to create more space before footer
  };

  const backButtonStyles = {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '0.75rem 1.25rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 500,
    fontSize: '0.9375rem',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  };

  const contentCardStyles = {
    marginTop: '2rem', // Increased from 1.5rem to 2rem
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    border: '1px solid #f1f5f9',
  };

  const pageTitleStyles = {
    marginTop: '1rem', // Added margin top
    marginBottom: '2rem', // Increased from 1.5rem to 2rem
    fontSize: '1.75rem', // Increased size slightly
    fontWeight: 700,
    color: '#1e293b',
    letterSpacing: '-0.025em',
    paddingBottom: '0.75rem', // Added padding at the bottom
    borderBottom: '1px solid #e2e8f0', // Added a subtle border
  };

  return (
    <div style={dashboardStyles}>
      {/* Main Content and Sidebar */}
      <div style={mainContentStyles}>
        {/* Sidebar */}
        <div style={sidebarStyles}>
          <div style={sidebarLogoStyles}>
            Admin Panel
          </div>
          <div style={sidebarLinkStyles('dashboard')} onClick={() => { setActiveSection('dashboard'); setActiveCard(null); }}>
            Dashboard
          </div>
          <div style={sidebarLinkStyles('reports')} onClick={() => { setActiveSection('reports'); setActiveCard(null); }}>
            Reports
          </div>
          <div style={sidebarLinkStyles('settings')} onClick={() => { setActiveSection('settings'); setActiveCard(null); }}>
            Settings
          </div>
        </div>

        {/* Main Content */}
        <div style={contentStyles}>
          <AdminNavbar />
          <h1 style={pageTitleStyles}>
            {activeSection === 'dashboard'
              ? 'Admin Dashboard'
              : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>

          {/* Card View for Dashboard Section */}
          {activeSection === 'dashboard' && !activeCard && (
            <div style={cardContainerStyles}>
              <div
                style={cardStyles('users')}
                onClick={() => setActiveCard('users')}
                onMouseEnter={() => setHoveredCard('users')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={iconContainerStyles}>
                  <User {...iconStyles} />
                </div>
                <h3 style={cardTitleStyles}>User Management</h3>
              </div>
              <div
                style={cardStyles('items')}
                onClick={() => setActiveCard('items')}
                onMouseEnter={() => setHoveredCard('items')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={iconContainerStyles}>
                  <ShoppingCart {...iconStyles} />
                </div>
                <h3 style={cardTitleStyles}>Item Management</h3>
              </div>
              <div
                style={cardStyles('orders')}
                onClick={() => setActiveCard('orders')}
                onMouseEnter={() => setHoveredCard('orders')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={iconContainerStyles}>
                  <Package {...iconStyles} />
                </div>
                <h3 style={cardTitleStyles}>Order Management</h3>
              </div>
              <div
                style={cardStyles('notifications')}
                onClick={() => setActiveCard('notifications')}
                onMouseEnter={() => setHoveredCard('notifications')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={iconContainerStyles}>
                  <Bell {...iconStyles} />
                </div>
                <h3 style={cardTitleStyles}>Notification Management</h3>
              </div>
              <div
                style={cardStyles('exchange')}
                onClick={() => setActiveCard('exchange')}
                onMouseEnter={() => setHoveredCard('exchange')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={iconContainerStyles}>
                  <RefreshCw {...iconStyles} />
                </div>
                <h3 style={cardTitleStyles}>Item Exchange System</h3>
              </div>
            </div>
          )}

          {/* Management Content Section */}
          {activeCard && (
            <div style={contentCardStyles}>
              <button
                onClick={() => setActiveCard(null)}
                style={backButtonStyles}
              >
                ← Back to Dashboard
              </button>
              {activeCard === 'users' && <AdminUserManagement />}
              {activeCard === 'items' && <AdminItemManagement />}
              {activeCard === 'orders' && <AdminOrderList />}
              {activeCard === 'notifications' && <AdminNotification />}
              {activeCard === 'exchange' && <AdminItemExchange />}
            </div>
          )}

          {/* Reports Section */}
          {activeSection === 'reports' && (
            <div style={contentCardStyles}>
              <AdminReports />
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div style={contentCardStyles}>
              <AdminSettings onLogout={handleLogout} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={footerStyles}>
        <p>© 2025 Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;