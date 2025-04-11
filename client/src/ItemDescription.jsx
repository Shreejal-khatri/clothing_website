import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from './context/CartContext'; // Import useCart hook
import Navbar from './components/Navbar'; // Import Navbar
import Footer from './components/Footer'; // Import Footer

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    marginRight: '40px',
  },
  image: {
    width: '100%',
    maxWidth: '600px',
    borderRadius: '10px',
  },
  detailsContainer: {
    flex: 1,
    padding: '20px',
  },
  name: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#111',
    marginBottom: '20px',
  },
  price: {
    fontSize: '1.8rem',
    color: '#555',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.1rem',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginRight: '10px',
  },
  buttonHover: {
    backgroundColor: '#333',
  },
  favouriteButton: {
    backgroundColor: 'transparent',
    border: '2px solid #000',
    color: '#000',
    padding: '15px 30px',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
  favouriteButtonActive: {
    backgroundColor: '#000',
    color: '#fff',
  },
  loading: {
    fontSize: '1.5rem',
    color: '#333',
    textAlign: 'center',
    marginTop: '50px',
  },
  error: {
    fontSize: '1.5rem',
    color: 'red',
    textAlign: 'center',
    marginTop: '50px',
  },
  sizeButton: {
    backgroundColor: '#fff',
    border: '1px solid #000',
    color: '#000',
    padding: '10px 15px',
    borderRadius: '5px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  sizeButtonActive: {
    backgroundColor: '#000',
    color: '#fff',
  },
  counterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  counterButton: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  counterValue: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },

  backButton: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '10px 80px',
    borderRadius: '30px',
    fontSize: '1rem',
    cursor: 'pointer',
    margin: '1px auto', // Center the button horizontally
    display: 'block', // Ensure it takes full width
  },

};

const ItemDescription = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false); // State for favourite button
  const [isInCart, setIsInCart] = useState(false); // State for cart button
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [quantity, setQuantity] = useState(1); // State for item counter
  const { addToCart, cart } = useCart(); // Use the useCart hook to get the addToCart function and cart state

  // Get the logged-in user's email as the unique userId
  const getUserId = () => {
    const userData = localStorage.getItem("user");
    if (!userData) return null; // No user stored

    const parsedUser = JSON.parse(userData);
    return parsedUser.email || null; // Use email as userId
  };
  

  // Fetch item details from the server
  useEffect(() => {
    fetch(`http://localhost:3000/api/items/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
        checkIfFavourite(data._id);
        checkIfInCart(data._id); // Check if the item is already in the cart
      })
      .catch((error) => {
        console.error('Error fetching item details:', error);
        setError('Failed to load item details');
        setLoading(false);
      });
  }, [id]);

  const checkIfFavourite = async (itemId) => {
    const userId = getUserId();
    if (!userId) return;
  
    const response = await fetch(`http://localhost:3000/api/favourites/${userId}`);
    const favourites = await response.json();
    const isFavourited = favourites.some(fav => fav.itemId === itemId);
    setIsFavourite(isFavourited);
  };

  // Check if the item is already in the cart
  const checkIfInCart = (itemId) => {
    const isInCart = cart.some((cartItem) => cartItem._id === itemId); // Use item._id for comparison
    setIsInCart(isInCart);
  };

  // Handle favourite button click
  const handleFavouriteClick = async () => {
    let userId = getUserId(); // Get user email as ID
    if (!userId) {
      alert("Error: No user found.");
      return;
    }

    try {
      if (isFavourite) {
        // Remove from favourites
        await fetch("http://localhost:3000/api/favourites/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, itemId: item._id }),
        });
      } else {
        // Add to favourites
        await fetch("http://localhost:3000/api/favourites/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, itemId: item._id }),
        });
      }

      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  };

  // Handle add to cart button click
  const handleAddToCart = () => {
    if (!isInCart && selectedSize) {
      addToCart({ ...item, size: selectedSize, quantity }); // Add the item with size and quantity to the cart
      setIsInCart(true); // Update the state to reflect that the item is in the cart
    } else {
      alert('Please select a size before adding to cart.');
    }
  };

  // Handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // Handle item counter increment
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Handle item counter decrement
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!item) {
    return <div style={styles.error}>Item not found</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div style={{ paddingTop: '80px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={styles.backButton}
        >
          Back to Items
        </button>

        <div style={styles.container}>
          {/* Image Section */}
          <div style={styles.imageContainer}>
            <img 
              src={item.image.startsWith('http') ? item.image : `http://localhost:3000${item.image}`} 
              alt={item.name} 
              style={styles.image} 
            />
          </div>

          {/* Details Section */}
          <div style={styles.detailsContainer}>
            <h1 style={styles.name}>{item.name}</h1>
            <p style={styles.price}>NPR {item.price}</p>
            <p style={styles.description}>{item.description}</p>

            {/* Size Selection Buttons */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>Select Size:</p>
              <div>
                {['M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    style={{
                      ...styles.sizeButton,
                      ...(selectedSize === size ? styles.sizeButtonActive : {}),
                    }}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Item Counter */}
            <div style={styles.counterContainer}>
              <button style={styles.counterButton} onClick={handleDecrement}>-</button>
              <span style={styles.counterValue}>{quantity}</span>
              <button style={styles.counterButton} onClick={handleIncrement}>+</button>
            </div>

            {/* Add to Cart and Favourite Buttons */}
            <div style={{ display: 'flex', gap: '20px' }}>
              <button
                onClick={handleAddToCart}
                style={styles.button}
                disabled={isInCart}
              >
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleFavouriteClick}
                style={{
                  ...styles.favouriteButton,
                  ...(isFavourite ? styles.favouriteButtonActive : {}),
                }}
              >
                {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ItemDescription;
