import React from 'react';

const AdminNavbar = () => {
  const navbarStyles = {
    backgroundColor: '#fff',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(153, 10, 10, 0.1)',
    marginTop: '-2.5rem',
    borderRadius: '20px'
  
  };

  const headingStyles = {
    marginTop: '1rem', // Adjust this value to move the text upwards
  };

  return (
    <nav style={navbarStyles}>
      <h2 style={headingStyles}>Khatri Shops Admin</h2>
    </nav>
  );
};

export default AdminNavbar;