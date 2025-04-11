import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Favourites = () => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safely get user email from localStorage
  const getUserEmail = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.email;
    } catch (e) {
      console.error('Error parsing user data:', e);
      return null;
    }
  };

  useEffect(() => {
    const userEmail = getUserEmail();
    
    if (!userEmail) {
      setError('Please login to view your favourites');
      setLoading(false);
      return;
    }

    const fetchFavourites = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/favourites/${userEmail}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setFavourites(data);
        } else {
          throw new Error('Received data is not an array');
        }
      } catch (error) {
        console.error('Error fetching favourites:', error);
        setError(error.message || 'Failed to load favourites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const handleItemClick = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleRemoveItem = async (itemId) => {
    const userEmail = getUserEmail();

    if (!userEmail) {
      setError('Please login to remove items from your favourites');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/favourites/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userEmail,
          itemId: itemId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the state by removing the item from the favourites list
        setFavourites(prevFavourites => prevFavourites.filter(item => item._id !== itemId));
      } else {
        throw new Error(data.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setError(error.message || 'Failed to remove item');
    }
  };

  const formatPrice = (price) => {
    if (price == null) return 'Price not available';
    
    const numericValue = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.]/g, '')) 
      : Number(price);
    
    if (!isNaN(numericValue)) {
      return `NPR ${numericValue.toLocaleString('en-NP', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
    
    return `NPR ${price}`;
  };

  const styles = {
    container: {
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 160px)',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '30px',
      textAlign: 'center',
      borderBottom: '2px solid #f1f1f1',
      paddingBottom: '15px',
    },
    noFavourites: {
      fontSize: '1.5rem',
      color: '#7f8c8d',
      textAlign: 'center',
      marginTop: '50px',
    },
    itemList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '30px',
    },
    itemCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      padding: '0',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '480px',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
      },
    },
    itemImageContainer: {
      height: '320px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
    },
    itemImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      transition: 'transform 0.5s',
      maxWidth: '100%',
      maxHeight: '100%',
      ':hover': {
        transform: 'scale(1.03)',
      },
    },
    itemContent: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    itemName: {
      fontSize: '1.4rem',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '10px 0',
      lineHeight: '1.3',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    itemDescription: {
      fontSize: '1rem',
      color: '#7f8c8d',
      margin: '8px 0',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flexGrow: 1,
    },
    itemPrice: {
      fontSize: '1.3rem',
      color: '#e74c3c',
      fontWeight: 'bold',
      marginTop: '15px',
    },
    backButton: {
      marginTop: '40px',
      padding: '12px 30px',
      fontSize: '1.1rem',
      color: '#fff',
      backgroundColor: '#000',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      ':hover': {
        backgroundColor: '#1a252f',
        transform: 'translateY(-2px)',
      },
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '50px',
    },
    errorContainer: {
      textAlign: 'center',
      padding: '50px',
    },
    errorText: {
      color: 'red',
    },
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Navbar />
        <div style={styles.loadingContainer}>
          <p>Loading your favourites...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Navbar />
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{error}</p>
          <button
            style={styles.backButton}
            onClick={handleBackToHome}
          >
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Your Favourites</h1>
        {favourites.length === 0 ? (
          <div>
            <p style={styles.noFavourites}>You haven't added any favourites yet.</p>
            <button
              style={styles.backButton}
              onClick={handleBackToHome}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <div style={styles.itemList}>
              {favourites.map(item => (
                <div
                  key={item._id}
                  style={styles.itemCard}
                  onClick={() => handleItemClick(item._id)}
                >
                  <div style={styles.itemImageContainer}>
                    <img
                      src={item.image?.startsWith('http') ? item.image : `http://localhost:3000${item.image}`}
                      alt={item.name || 'Product image'}
                      style={styles.itemImage}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x320?text=Image+Not+Available';
                        e.target.style.objectFit = 'cover';
                      }}
                    />
                  </div>
                  <div style={styles.itemContent}>
                    <h2 style={styles.itemName}>{item.name || 'Unnamed Product'}</h2>
                    {item.description && (
                      <p style={styles.itemDescription}>{item.description}</p>
                    )}
                    <p style={styles.itemPrice}>{formatPrice(item.price)}</p>
                    <button
                      style={{ ...styles.backButton, backgroundColor: '#e74c3c' }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the item click
                        handleRemoveItem(item._id);
                      }}
                    >
                      Remove from Favourites
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              style={styles.backButton}
              onClick={handleBackToHome}
            >
              Back to Home
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favourites;
