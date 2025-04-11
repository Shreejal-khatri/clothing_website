import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#333',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    position: 'relative',
  },
  orderId: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  orderDetails: {
    fontSize: '1rem',
    color: '#666',
  },
  status: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  removeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  itemImage: {
    width: '80px',
    height: '115px',
    borderRadius: '5px',
    marginRight: '10px',
    marginBottom: '20px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
};

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Display 5 items per page

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Expected JSON, but received: ${text}`);
        }
        const data = await response.json();
        console.log("Fetched orders:", data); // Log the fetched orders
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleRemoveOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      alert(result.message); // Show success message
      setOrders(orders.filter(order => order._id !== orderId)); // Remove the order from the list
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <p>Error: {error}</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Admin Order List</h2>
      <div style={styles.orderList}>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          currentOrders.map((order) => (
            <div key={order._id} style={styles.orderItem}>
              <button
                style={styles.removeButton}
                onClick={() => handleRemoveOrder(order._id)}
              >
                Remove
              </button>
              <div style={styles.orderId}>Order ID: {order._id}</div>
              <div> User ID: {order.userId} </div>
              <div style={styles.status}>
                Payment Status: {order.paymentStatus || "Pending"} {/* Default to "Pending" if paymentStatus is missing */}
              </div>
              <div style={styles.orderDetails}>
                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                <p>Total Price: NPR {order.totalPrice}</p>
                <ul>
                  {order.items && order.items.map((item) => (
                    <li key={item._id || item.name}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={styles.itemImage}
                      />
                      {item.name} - {item.quantity} x NPR {item.price} (Size: {item.size || 'N/A'})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <Stack spacing={2} alignItems="center" marginTop="30px">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              borderColor: 'red', // Outline color
              color: 'red', // Default text color
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red hover effect
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              backgroundColor: 'red', // Active button background
              color: 'white', // Active button text color
              borderColor: 'red',
            },
            '& .MuiPaginationItem-page.Mui-selected:hover': {
              backgroundColor: 'darkred', // Darker red on hover
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default AdminOrderList;
