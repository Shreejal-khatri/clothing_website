import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const AdminItemManagement = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    category: '', 
    subCategory: '' 
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Display 10 items per page

  // Fetch items from the server
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/items");
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          setError("Invalid data format received from the server");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch items.");
      }
    };
    fetchItems();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Add a new item
  const handleAddItem = async () => {
    if (newItem.name && newItem.price && newItem.description && newItem.category && imageFile) {
      try {
        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('price', newItem.price);
        formData.append('description', newItem.description);
        formData.append('category', newItem.category);
        formData.append('subCategory', newItem.subCategory);
        formData.append('image', imageFile);

        const response = await axios.post('http://localhost:3000/api/items', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setItems([...items, response.data]);
        setNewItem({ name: '', price: '', description: '', category: '', subCategory: '' });
        setImageFile(null);
      } catch (error) {
        setError('Failed to add item. Please try again.');
      }
    } else {
      setError('Please fill all fields and upload an image.');
    }
  };

  // Delete an item
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${itemId}`);
      setItems(items.filter(item => item._id !== itemId));
    } catch (error) {
      setError('Failed to delete item. Please try again.');
    }
  };

  // Update an item
  const handleUpdateItem = async () => {
    if (selectedItem) {
      try {
        const formData = new FormData();
        formData.append('name', selectedItem.name);
        formData.append('price', selectedItem.price);
        formData.append('description', selectedItem.description);
        formData.append('category', selectedItem.category);
        formData.append('subCategory', selectedItem.subCategory);
        if (imageFile) {
          formData.append('image', imageFile);
        }

        const response = await axios.put(`http://localhost:3000/api/items/${selectedItem._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const updatedItems = items.map(item => 
          item._id === response.data._id ? response.data : item
        );
        setItems(updatedItems);
        setSelectedItem(null);
        setImageFile(null);
      } catch (error) {
        setError('Failed to update item. Please try again.');
      }
    }
  };

  // Handle input changes for the update form
  const handleChange = (e) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Styles
  const itemManagementStyles = { 
    backgroundColor: '#fff', 
    padding: '1.5rem', 
    borderRadius: '8px', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
    maxWidth: '1200px', 
    margin: '0 auto' 
  };

  const addItemFormStyles = { 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '1rem', 
    marginBottom: '1.5rem' 
  };

  const inputStyles = { 
    padding: '0.5rem', 
    border: '1px solid #ddd', 
    borderRadius: '4px', 
    flex: '1 1 200px', 
    minWidth: '150px', 
    width: '100%', 
  };

  const addButtonStyles = { 
    backgroundColor: '#000', 
    color: '#fff', 
    border: 'none', 
    padding: '0.5rem 1rem', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    flex: '1 1 100%', 
    marginTop: '1rem' 
  };

  const modalStyles = {
    position: 'fixed', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)',
    padding: '20px', 
    backgroundColor: '#f5f5f5', 
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
    zIndex: 10, 
    width: '400px', 
    borderRadius: '8px'
  };

  const modalOverlayStyles = {
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    backdropFilter: 'blur(5px)', 
    zIndex: 9
  };

  const modalButtonStyles = {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    margin: '10px',
  };

  const deleteButtonStyles = { 
    backgroundColor: '#f44336', 
    color: '#fff', 
    border: 'none', 
    padding: '0.5rem 1rem', 
    borderRadius: '4px', 
    cursor: 'pointer' 
  };

  const actionButtonStyles = {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100px',
  };

  const updateButtonStyles = {
    ...actionButtonStyles,
    backgroundColor: '#000',
    color: '#fff',
    marginBottom: '1rem',
  };

  const deleteButtonSpacingStyles = {
    ...actionButtonStyles,
    backgroundColor: '#f44336',
    color: '#fff',
  };

  return (
    <div style={itemManagementStyles}>
      <h2>Item Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={addItemFormStyles}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={inputStyles}
        />
        <input
          type="text"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          style={inputStyles}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          style={inputStyles}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          style={inputStyles}
        />
        <input
          type="text"
          placeholder="Subcategory"
          value={newItem.subCategory}
          onChange={(e) => setNewItem({ ...newItem, subCategory: e.target.value })}
          style={inputStyles}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={inputStyles}
        />
        <button
          style={addButtonStyles}
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>

      {selectedItem && (
        <>
          <div style={modalOverlayStyles}></div>
          <div style={modalStyles}>
            <h3>Update Item</h3>
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={selectedItem.name}
              onChange={handleChange}
              style={inputStyles}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={selectedItem.price}
              onChange={handleChange}
              style={inputStyles}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={selectedItem.description}
              onChange={handleChange}
              style={inputStyles}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={selectedItem.category}
              onChange={handleChange}
              style={inputStyles}
            />
            <input
              type="text"
              name="subCategory"
              placeholder="Subcategory"
              value={selectedItem.subCategory}
              onChange={handleChange}
              style={inputStyles}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={inputStyles}
            />
            <div>
              <button
                style={modalButtonStyles}
                onClick={handleUpdateItem}
              >
                Save Changes
              </button>
              <button
                style={{ ...modalButtonStyles, backgroundColor: '#f44336' }}
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Image</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Price</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Description</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Subcategory</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item._id}>
              <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{item.name}</td>
              <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{item.price}</td>
              <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{item.description}</td>
              <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{item.category}</td>
              <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{item.subCategory}</td>
              <td style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                <button
                  style={updateButtonStyles}
                  onClick={() => setSelectedItem(item)}
                >
                  Update
                </button>
                <button
                  style={deleteButtonSpacingStyles}
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MUI Pagination with Custom Active Button Color */}
      <Stack spacing={2} alignItems="center" marginTop="1rem">
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

export default AdminItemManagement;

