import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './components/Footer'; // Import Footer component
import Navbar from './components/Navbar'; // Import Navbar component
// import { useCart } from './context/CartContext'; // Import useCart
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f0f0f5', // Light background for the entire page
    color: '#333', // Dark text for contrast
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#ffffff', // Light sidebar
    color: '#333', // Dark text
    padding: '20px',
    textAlign: 'left',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Add shadow for separation
  },
  sidebarItem: {
    margin: '15px 0',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  sidebarItemActive: {
    backgroundColor: '#000', // Black for selected category
    color: '#fff', // White text
  },
  subCategoryItem: {
    marginLeft: '20px', // Indent sub-categories
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  subCategoryItemActive: {
    backgroundColor: '#444', // Darker for selected sub-category
    color: '#fff', // White text
  },
  mainContent: {
    flexGrow: 1,
    padding: '40px',
    backgroundColor: '#f0f0f5', // Light background for main content
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#333', // Dark heading
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '15px',
    justifyContent: 'center',
  },
  item: {
    border: '1px solid #ddd', // Light border
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: '#ffffff', // Light item background
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Light shadow
    transition: 'transform 0.2s',
    width: '320px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  itemName: {
    fontSize: '1.6rem',
    margin: '10px 0',
    color: '#333', // Dark text for item name
  },
  itemPrice: {
    fontSize: '1.4rem',
    color: '#888', // Gray for price
    margin: '5px 0',
  },
  button: {
    backgroundColor: '#000000', // Black button
    color: '#ffffff', // White text
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s',
    display: 'block',
    margin: '10px auto 0',
  },
  buttonHover: {
    backgroundColor: '#333', // Slightly lighter on hover
  },
};

function Item() {
  const [items, setItems] = useState([]); // State to store items fetched from the backend
  const [mainCategory, setMainCategory] = useState('Men'); // Default main category
  const [subCategory, setSubCategory] = useState(null); // Default sub-category (null means all items)
  // const { addToCart, cart } = useCart(); // Use the useCart hook to get the addToCart function and cart state
  const navigate = useNavigate(); // Hook for navigation

  // Define main categories and their sub-categories
  const categories = {
    Men: ['T-Shirts', 'Bottoms', 'Coats', 'Jackets', 'Hoodie'], // Men's categories
    Women: ['T-Shirts', 'Bottoms', 'Coats', 'Long Dress', 'Wedding'], // Replaced 'Jackets' with 'Long Dress'
  };

  // Fetch items from the backend when the component mounts or category changes
  useEffect(() => {
    let url = `http://localhost:3000/api/items/category/${mainCategory}`;
    if (subCategory) {
      url += `/${subCategory}`; // Append subcategory if selected
    }

    axios.get(url)
      .then(response => {
        setItems(response.data); // Set the fetched data into state
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, [mainCategory, subCategory]); // Depend on the selected main and sub-category

  // // Check if an item is already in the cart
  // const isItemInCart = (itemId) => {
  //   return cart.some((cartItem) => cartItem._id === itemId);
  // };

  return (
    <div style={styles.container}>
      <Navbar /> 
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div style={styles.sidebar}>
          <h2>Categories</h2>
          {Object.keys(categories).map((category) => (
            <div key={category}>
              <div
                style={{
                  ...styles.sidebarItem,
                  ...(mainCategory === category ? styles.sidebarItemActive : {}),
                }}
                onClick={() => {
                  setMainCategory(category); // Set the main category
                  setSubCategory(null); // Reset subcategory when main category changes
                }}
              >
                {category}
              </div>
              {mainCategory === category &&
                categories[category].map((subCat) => (
                  <div
                    key={subCat}
                    style={{
                      ...styles.subCategoryItem,
                      ...(subCategory === subCat ? styles.subCategoryItemActive : {}),
                    }}
                    onClick={() => {
                      setSubCategory(subCat); // Set the subcategory
                    }}
                  >
                    {subCat}
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div style={styles.mainContent}>
          <h1 style={styles.heading}>
            {mainCategory} {subCategory ? `> ${subCategory}` : 'All Items'}
          </h1>
          <div style={styles.grid}>
            {items.length === 0 ? (
              <p>Loading items...</p> // Show loading text if items are not yet fetched
            ) : (
              items.map((item) => {
                // const isInCart = isItemInCart(item._id); // Check if the item is in the cart
                return (
                  <div
                    key={item._id}
                    style={styles.item}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img
                        src={item.image.startsWith('http') ? item.image : `http://localhost:3000${item.image}`}
                        alt={item.name}
                        style={styles.image}
                      />
                      <h3 style={styles.itemName}>{item.name}</h3>
                      <p style={styles.itemPrice}>NPR {item.price}</p>
                    </Link>
                    <button
                      style={styles.button}
                      onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                      onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                      onClick={() => {
                        navigate(`/product/${item._id}`); // Redirect to the item description page
                      }}
                    >
                      View Details
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default Item;