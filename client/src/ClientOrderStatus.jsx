import React, { useState, useEffect } from 'react';
import { 
  CircularProgress, 
  Pagination, 
  Paper, 
  Typography, 
  Box, 
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Container
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from "./context/AuthContext";

const OrderContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: 'auto',
  maxWidth: '1200px',
  borderRadius: '12px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
  backgroundColor: theme.palette.background.paper,
}));

const OrderCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '10px',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
  position: 'relative',
}));

const ProductImage = styled(Avatar)({
  width: 80,
  height: 80,
  marginRight: 16,
});

const statusStyles = {
  completed: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  pending: {
    backgroundColor: '#ff9800',
    color: '#fff',
  },
  processing: {
    backgroundColor: '#2196f3',
    color: '#fff',
  },
  cancelled: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
};

const ClientOrderStatus = () => {
  const { } = useAuth();
  const [orders, setOrders] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id || payload._id; 
      console.log('Extracted userId:', userId);
  
      if (userId) {
        fetchOrders(userId);
      }
    } catch (err) {
      console.error('Invalid token:', err);
      setError('Invalid or expired token.');
      setLoading(false);
    }
  }, []);
  
  const fetchOrders = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/order/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch orders. Status: ${response.status}`);
      }
  
      const data = await response.json();
      const ordersArray = Array.isArray(data) ? data :
                        Array.isArray(data?.orders) ? data.orders :
                        Array.isArray(data?.data) ? data.data : [];
  
      setOrders(ordersArray);
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  

  // Safeguarded pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleCancelClick = (orderId) => {
    setOrderToCancel(orderId);
    setOpenCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderToCancel}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}` // ✅ Add this
        }
        
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel order. Status: ${response.status}`);
      }

      setOrders(orders.filter(order => order._id !== orderToCancel));

      setSnackbar({
        open: true,
        message: 'Order cancelled successfully!',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Failed to cancel order',
        severity: 'error',
      });
    } finally {
      setOpenCancelDialog(false);
      setOrderToCancel(null);
    }
  };

  const handleCancelDialogClose = () => {
    setOpenCancelDialog(false);
    setOrderToCancel(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusStyle = (status) => {
    const lowerStatus = (status || '').toLowerCase();
    return statusStyles[lowerStatus] || statusStyles.pending;
  };

  const canCancelOrder = (order) => {
    return ['pending', 'processing'].includes((order.paymentStatus || '').toLowerCase());
  };

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" mt={3}>Loading your orders...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <OrderContainer>
        <Typography variant="h5" color="error" gutterBottom>
          Error loading orders
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={fetchOrders}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </OrderContainer>
    );
  }


  const token = localStorage.getItem('token');
if (!token) {
  return (
    <OrderContainer>
      <Typography variant="h5" gutterBottom>
        Please login to view your orders
      </Typography>
      <Button 
        component={Link}
        to="/login"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Go to Login
      </Button>
    </OrderContainer>
  );
}

  return (
    <>
      <Navbar />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <OrderContainer>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            📦 Your Order History
          </Typography>
          
          {orders.length === 0 ? (
            <Box 
              textAlign="center" 
              p={6} 
              border="1px dashed #ddd" 
              borderRadius={2}
              bgcolor="background.default"
            >
              <Typography variant="h6" gutterBottom>
                No orders found
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Start shopping to see your orders here!
              </Typography>
              <Box mt={3}>
                <Link to="/products" style={{ textDecoration: 'none' }}>
                  <Chip 
                    label="Browse Products" 
                    color="primary" 
                    clickable 
                    variant="outlined"
                  />
                </Link>
              </Box>
            </Box>
          ) : (
            <>
              <Box component="section">
                {currentOrders.map((order) => (
                  <OrderCard key={order._id} elevation={0}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        Order #{order._id.substring(0, 8)}
                      </Typography>
                      <Chip 
                        label={order.paymentStatus || 'Pending'} 
                        sx={getStatusStyle(order.paymentStatus)}
                        size="medium"
                      />
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" mb={3}>
                      <Typography variant="body2" color="textSecondary">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Total: NPR {order.totalPrice?.toFixed(2)}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                      Ordered Items
                    </Typography>
                    
                    <List>
                      {order.items?.map((item, index) => (
                        <ListItem key={index} alignItems="flex-start" sx={{ py: 2 }}>
                          <ListItemAvatar>
                            <ProductImage
                              src={item.image || '/placeholder-product.jpg'}
                              alt={item.name}
                              variant="rounded"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" component="span" display="block">
                                  Qty: {item.quantity}
                                </Typography>
                                <Typography variant="body2" component="span" display="block">
                                  Price: NPR {item.price?.toFixed(2)} each
                                </Typography>
                              </>
                            }
                          />
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            NPR {(item.quantity * item.price)?.toFixed(2)}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>

                    {canCancelOrder(order) && (
                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancelClick(order._id)}
                          sx={{ textTransform: 'none' }}
                        >
                          Cancel Order
                        </Button>
                      </Box>
                    )}
                  </OrderCard>
                ))}
              </Box>

              {orders.length > itemsPerPage && (
                <Box display="flex" justifyContent="center" mt={4}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    shape="rounded"
                  />
                </Box>
              )}
            </>
          )}

          {/* Cancel Order Confirmation Dialog */}
          <Dialog
            open={openCancelDialog}
            onClose={handleCancelDialogClose}
            aria-labelledby="cancel-order-dialog-title"
          >
            <DialogTitle id="cancel-order-dialog-title">
              Confirm Order Cancellation
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to cancel this order? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDialogClose} color="primary">
                Keep Order
              </Button>
              <Button 
                onClick={handleCancelConfirm} 
                color="error"
                variant="contained"
                autoFocus
              >
                Confirm Cancel
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert 
              onClose={handleSnackbarClose} 
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </OrderContainer>
      </Container>
      
      <Footer />
    </>
  );
};

export default ClientOrderStatus;