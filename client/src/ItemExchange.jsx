import React, { useState, useEffect } from 'react';
import { RefreshCw, Package, Plus, X, Info, Upload, AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

const ItemExchange = () => {
  const { currentUser, userId } = useAuth();
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    itemsOut: [{ name: '', price: 0, condition: 'good', images: [] }],
    itemsIn: [{ name: '', condition: 'good', images: [] }],
    notes: ''
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setFormData({
      itemsOut: [{ name: '', price: 0, condition: 'good', images: [] }],
      itemsIn: [{ name: '', condition: 'good', images: [] }],
      notes: ''
    });
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token is required for authentication.');
      
      // The backend will get the user ID from the token.
      const response = await fetch(`http://localhost:3000/api/exchange-user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch requests. Status: ${response.status}`);
      }
  
      const data = await response.json();
      const requestsArray = Array.isArray(data) ? data : 
                           Array.isArray(data?.requests) ? data.requests : 
                           Array.isArray(data?.data) ? data.data : [];
  
      const formattedData = requestsArray.map(req => ({
        ...req,
        itemsOut: req.itemsOut || [{ 
          name: req.itemOut || '', 
          price: req.itemOutPrice || 0, 
          condition: req.itemOutCondition || 'good', 
          images: req.itemOutImages || [] 
        }],
        itemsIn: req.itemsIn || [{ 
          name: req.itemIn || '', 
          condition: req.itemInCondition || 'good', 
          images: req.itemInImages || [] 
        }]
      })).sort((a, b) => new Date(b.date) - new Date(a.date));
  
      setRequests(formattedData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchRequests();
    }
  }, []);

  const handleChange = (field, index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData[field]];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: name === 'price' ? Number(value) : value
    };
    setFormData({ ...formData, [field]: updatedItems });
  };

  const addItem = (field) => {
    const newItem = field === 'itemsOut' 
      ? { name: '', price: 0, condition: 'good', images: [] }
      : { name: '', condition: 'good', images: [] };
    
    setFormData({
      ...formData,
      [field]: [...formData[field], newItem]
    });
  };

  const removeItem = (field, index) => {
    const updatedItems = [...formData[field]];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, [field]: updatedItems });
  };

  const handleImageUpload = async (e, field, itemIndex) => {
    const files = Array.from(e.target.files).slice(0, 5 - formData[field][itemIndex].images.length);
    if (files.length === 0) return;

    setUploading(true);
    const formDataToSend = new FormData();
    files.forEach(file => formDataToSend.append('images', file));

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const uploadedImages = await response.json();
      const updatedItems = [...formData[field]];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        images: [
          ...updatedItems[itemIndex].images,
          ...uploadedImages.map(img => img.startsWith('http') ? img : `http://localhost:3000${img}`)
        ]
      };
      setFormData({ ...formData, [field]: updatedItems });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (field, itemIndex, imageIndex) => {
    const updatedItems = [...formData[field]];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      images: updatedItems[itemIndex].images.filter((_, i) => i !== imageIndex)
    };
    setFormData({ ...formData, [field]: updatedItems });
  };

  const calculateTotalOutValue = () => {
    return formData.itemsOut.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // Check if itemsOut and itemsIn are of equal length
      if (formData.itemsOut.length !== formData.itemsIn.length) {
        throw new Error('The number of items you are offering must match the number of items you are requesting.');
      }
  
      // Extract userId from the token
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in to create an exchange');
    
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id || payload._id;
      if (!userId) throw new Error('User ID not found in the token');
    
      const validationErrors = [];
      formData.itemsOut.forEach((item, index) => {
        if (!item.name?.trim()) validationErrors.push(`Your item ${index + 1} needs a name`);
        if (isNaN(item.price) || item.price < 0) validationErrors.push(`Your item ${index + 1} needs a valid price`);
        if (item.images.length === 0) validationErrors.push(`Your item ${index + 1} needs at least one photo`);
      });
    
      formData.itemsIn.forEach((item, index) => {
        if (!item.name?.trim()) validationErrors.push(`Requested item ${index + 1} needs a name`);
        if (item.images.length === 0) validationErrors.push(`Requested item ${index + 1} needs at least one photo`);
      });
    
      if (validationErrors.length) throw new Error(validationErrors.join('\n'));
    
      // Send request with userId extracted from token
      const response = await fetch('http://localhost:3000/api/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,  // Use userId extracted from token
          itemsOut: formData.itemsOut.map(item => ({
            name: item.name.trim(),
            price: Number(item.price),
            condition: item.condition.trim(),
            images: item.images
          })),
          itemsIn: formData.itemsIn.map(item => ({
            name: item.name.trim(),
            condition: item.condition.trim(),
            images: item.images
          })),
          notes: formData.notes?.trim() || undefined
        }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.message || 'Submission failed');
      }
    
      const result = await response.json();
      setRequests([result.data, ...requests]);
      setShowForm(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };
  
  

  const cancelRequest = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/exchange/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete request');
      fetchRequests();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="exchange-container">
          <div className="exchange-header">
            <RefreshCw size={28} className="header-icon" />
            <h2>Item Exchange Requests</h2>
            <button className="new-request-btn" onClick={() => setShowForm(true)}>
              <Plus size={18} /> New Request
            </button>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => setError(null)}>Dismiss</button>
            </div>
          )}

          {showForm && (
            <div className="exchange-form-container">
              <div className="exchange-form">
                <div className="form-header">
                  <h3>New Exchange Request</h3>
                  <button className="close-btn" onClick={() => setShowForm(false)}>
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-sections-container">
                    {/* Items Out Section */}
                    <div className="form-section items-out">
                      <div className="section-header">
                        <h4>Your Items</h4>
                        <span className="section-subtitle">What you're offering</span>
                      </div>
                      
                      {formData.itemsOut.map((item, index) => (
                        <div key={index} className="item-group">
                          <div className="item-header">
                            <h5>Item {index + 1}</h5>
                            {formData.itemsOut.length > 1 && (
                              <button type="button" className="remove-item-btn" onClick={() => removeItem('itemsOut', index)}>
                                Remove Item
                              </button>
                            )}
                          </div>
                          
                          <div className="form-group">
                            <label>Item Name</label>
                            <input
                              type="text"
                              name="name"
                              value={item.name}
                              onChange={(e) => handleChange('itemsOut', index, e)}
                              required
                            />
                          </div>
                          
                          <div className="form-group">
                            <label>Estimated Value (NPR)</label>
                            <input
                              type="number"
                              name="price"
                              value={item.price}
                              onChange={(e) => handleChange('itemsOut', index, e)}
                              min="0"
                              step="1"
                              required
                            />
                          </div>
                          
                          <div className="form-group">
                            <label>Condition</label>
                            <select
                              name="condition"
                              value={item.condition}
                              onChange={(e) => handleChange('itemsOut', index, e)}
                            >
                              <option value="excellent">Excellent</option>
                              <option value="good">Good</option>
                              <option value="fair">Fair</option>
                              <option value="poor">Poor</option>
                            </select>
                          </div>
                          
                          <div className="form-group">
                            <label>Upload Images (Max 5)</label>
                            <div className="image-upload-container">
                              <label className="upload-btn">
                                <Upload size={16} /> Choose Files
                                <input 
                                  type="file" 
                                  multiple 
                                  accept="image/*" 
                                  onChange={(e) => handleImageUpload(e, 'itemsOut', index)}
                                  disabled={item.images.length >= 5 || uploading}
                                  style={{ display: 'none' }}
                                />
                              </label>
                              <span className="upload-hint">{item.images.length}/5 images uploaded</span>
                            </div>
                            
                            <div className="image-preview-container">
                              {item.images.map((img, imgIndex) => (
                                <div key={imgIndex} className="image-preview">
                                  <img src={img} alt={`Your Item ${imgIndex}`} />
                                  <button 
                                    type="button" 
                                    className="remove-image-btn"
                                    onClick={() => removeImage('itemsOut', index, imgIndex)}
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <button type="button" className="add-item-btn" onClick={() => addItem('itemsOut')}>
                        <Plus size={16} /> Add Another Item
                      </button>
                      
                      <div className="total-value">
                        <strong>Total Value:</strong> NPR {calculateTotalOutValue()}
                      </div>
                    </div>

                    {/* Items In Section */}
                    <div className="form-section items-in">
                      <div className="section-header">
                        <h4>Requested Items</h4>
                        <span className="section-subtitle">What you want in return</span>
                      </div>
                      
                      {formData.itemsIn.map((item, index) => (
                        <div key={index} className="item-group">
                          <div className="item-header">
                            <h5>Item {index + 1}</h5>
                            {formData.itemsIn.length > 1 && (
                              <button type="button" className="remove-item-btn" onClick={() => removeItem('itemsIn', index)}>
                                Remove Item
                              </button>
                            )}
                          </div>
                          
                          <div className="form-group">
                            <label>Item Name</label>
                            <input
                              type="text"
                              name="name"
                              value={item.name}
                              onChange={(e) => handleChange('itemsIn', index, e)}
                              required
                            />
                          </div>
                          
                          <div className="form-group">
                            <label>Condition</label>
                            <select
                              name="condition"
                              value={item.condition}
                              onChange={(e) => handleChange('itemsIn', index, e)}
                            >
                              <option value="excellent">Excellent</option>
                              <option value="good">Good</option>
                              <option value="fair">Fair</option>
                              <option value="poor">Poor</option>
                            </select>
                          </div>
                          
                          <div className="form-group">
                            <label>Upload Images (Max 5)</label>
                            <div className="image-upload-container">
                              <label className="upload-btn">
                                <Upload size={16} /> Choose Files
                                <input 
                                  type="file" 
                                  multiple 
                                  accept="image/*" 
                                  onChange={(e) => handleImageUpload(e, 'itemsIn', index)}
                                  disabled={item.images.length >= 5 || uploading}
                                  style={{ display: 'none' }}
                                />
                              </label>
                              <span className="upload-hint">{item.images.length}/5 images uploaded</span>
                            </div>
                            
                            <div className="image-preview-container">
                              {item.images.map((img, imgIndex) => (
                                <div key={imgIndex} className="image-preview">
                                  <img src={img} alt={`Requested Item ${imgIndex}`} />
                                  <button 
                                    type="button" 
                                    className="remove-image-btn"
                                    onClick={() => removeImage('itemsIn', index, imgIndex)}
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <button type="button" className="add-item-btn" onClick={() => addItem('itemsIn')}>
                        <Plus size={16} /> Add Another Item
                      </button>
                    </div>
                  </div>

                  {/* Notes and Submit Section */}
                  <div className="form-notes-section">
                    <div className="form-group">
                      <label>Additional Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        rows="3"
                        placeholder="Any special requests or details about the exchange..."
                      />
                    </div>

                    <div className="form-actions">
                      <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="submit-btn" disabled={uploading}>
                        {uploading ? 'Submitting...' : 'Submit Request'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <p>Loading exchange requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="empty-state">
              <Info size={40} className="info-icon" />
              <p>No exchange requests yet</p>
              <p>Click "New Request" to start an exchange</p>
            </div>
          ) : (
            <div className="requests-list">
              {requests.map(request => (
                <div key={request._id} className="request-card">
                  <div className="card-header">
                    <span className="request-id">Request #{request._id.slice(-4)}</span>
                    <span className="request-date">{new Date(request.date).toLocaleDateString()}</span>
                    <span className={`request-status ${request.status}`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="exchange-details">
                    <div className="items-section">
                      <h4>Your Items:</h4>
                      {request.itemsOut.map((item, index) => (
                        <div key={index} className="item-section">
                          <Package size={18} className="item-icon" />
                          <div>
                            <p className="item-name">{item.name}</p>
                            <p className="item-condition">Condition: {item.condition}</p>
                            <div className="price-display">
                              <div className="price-value">
                                <span className="price-label">Estimated Value:</span>
                                <span className="price-amount">NPR {item.price}</span>
                              </div>
                              {item.price > 0 && (
                                <div className="price-helper">
                                  {item.price <= 5000 ? (
                                    <span className="low-value">
                                      <Info size={14} /> Low-value item
                                    </span>
                                  ) : item.price <= 20000 ? (
                                    <span className="medium-value">
                                      <Info size={14} /> Medium-value item
                                    </span>
                                  ) : (
                                    <span className="high-value">
                                      <AlertCircle size={14} /> High-value item
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            {item.images?.length > 0 && (
                              <div className="item-images">
                                {item.images.map((img, imgIndex) => (
                                  <div key={imgIndex} className="request-image">
                                    <img src={img} alt={`Your Item ${imgIndex}`} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="total-value">
                        <strong>Total Value:</strong> NPR {request.itemsOut.reduce((total, item) => total + (item.price || 0), 0)}
                      </div>
                    </div>
                    
                    <div className="exchange-arrow">
                      <RefreshCw size={20} />
                    </div>
                    
                    <div className="items-section">
                      <h4>Requested Items:</h4>
                      {request.itemsIn.map((item, index) => (
                        <div key={index} className="item-section">
                          <Package size={18} className="item-icon" />
                          <div>
                            <p className="item-name">{item.name}</p>
                            <p className="item-condition">Condition: {item.condition}</p>
                            {item.images?.length > 0 && (
                              <div className="item-images">
                                {item.images.map((img, imgIndex) => (
                                  <div key={imgIndex} className="request-image">
                                    <img src={img} alt={`Requested Item ${imgIndex}`} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {request.notes && (
                    <div className="notes-section">
                      <p><strong>Notes:</strong> {request.notes}</p>
                    </div>
                  )}
                  
                  <div className="card-actions">
                    <button className="cancel-request-btn" onClick={() => cancelRequest(request._id)}>
                      <X size={16} /> Cancel Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f8f9fa;
        }
        
        .content-container {
          flex: 1;
          padding: 2rem;
        }
        
        .exchange-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .exchange-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eaeaea;
        }
        
        .exchange-header h2 {
          margin: 0;
          flex-grow: 1;
          color: #1e293b;
        }
        
        .header-icon {
          color:rgb(0, 0, 0);
        }
        
        .new-request-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background-color:rgb(0, 0, 0);
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .new-request-btn:hover {
          background-color:rgb(0, 0, 0);
        }
        
        .error-message {
          background-color: #fee2e2;
          color: #dc2626;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1050;
        }
        
        .error-message button {
          background: none;
          border: none;
          color: #dc2626;
          cursor: pointer;
          font-weight: bold;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }
        
        .error-message button:hover {
          background-color: #fecaca;
        }
        
        .loading-state {
          text-align: center;
          padding: 3rem;
          color: #64748b;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem;
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .info-icon {
          color:rgb(1, 5, 14);
          margin-bottom: 1rem;
        }
        
        .empty-state p {
          margin: 0.5rem 0;
          color: #64748b;
        }
        
        .exchange-form-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 1rem;
        }
        
        .exchange-form {
          background-color: white;
          border-radius: 0.75rem;
          padding: 2rem;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eaeaea;
        }
        
        .form-header h3 {
          margin: 0;
          color: #1e293b;
          font-size: 1.5rem;
        }
        
        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          padding: 0.25rem;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        
        .close-btn:hover {
          background-color: #f1f5f9;
        }
        
        .form-sections-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .form-sections-container {
            grid-template-columns: 1fr;
          }
        }
        
        .form-section {
          padding: 1.5rem;
          border-radius: 0.5rem;
          background-color: #f8fafc;
        }
        
        .items-out {
          border-left: 4px solidrgb(0, 0, 0);
        }
        
        .items-in {
          border-left: 4px solidrgb(11, 77, 199);
        }
        
        .section-header {
          margin-bottom: 1.5rem;
        }
        
        .section-header h4 {
          margin: 0 0 0.25rem 0;
          color: #1e293b;
          font-size: 1.25rem;
        }
        
        .section-subtitle {
          color: #64748b;
          font-size: 0.875rem;
        }
        
        .item-group {
          margin-bottom: 1.5rem;
          padding: 1.25rem;
          background-color: white;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .item-header h5 {
          margin: 0;
          color: #1e293b;
          font-size: 1rem;
        }
        
        .remove-item-btn {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          font-size: 0.875rem;
          text-decoration: underline;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #334155;
          font-size: 0.875rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color:rgb(0, 0, 0);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }
        
        .image-upload-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .upload-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: #f1f5f9;
          color:rgb(0, 0, 0);
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s;
        }
        
        .upload-btn:hover {
          background-color: #e2e8f0;
        }
        
        .upload-hint {
          font-size: 0.75rem;
          color: #64748b;
        }
        
        .image-preview-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }
        
        .image-preview {
          position: relative;
          width: 80px;
          height: 80px;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          overflow: hidden;
        }
        
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .remove-image-btn {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          width: 1.25rem;
          height: 1.25rem;
          background-color: rgba(239, 68, 68, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }
        
        .add-item-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: #f1f5f9;
          color: #334155;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s;
          margin-bottom: 1rem;
        }
        
        .add-item-btn:hover {
          background-color: #e2e8f0;
        }
        
        .total-value {
          padding: 0.75rem;
          background-color: #eff6ff;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          text-align: right;
          color: #1e40af;
          font-weight: 500;
        }
        
        .form-notes-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #eaeaea;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .cancel-btn {
          padding: 0.75rem 1.5rem;
          background-color: #f1f5f9;
          color: #334155;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .cancel-btn:hover {
          background-color: #e2e8f0;
        }
        
        .submit-btn {
          padding: 0.75rem 1.5rem;
          background-color:rgb(0, 0, 0);
          color: white;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .submit-btn:hover {
          background-color:rgb(0, 0, 0);
        }
        
        .submit-btn:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }
        
        .requests-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .request-card {
          background-color: white;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .request-id {
          font-weight: 600;
          color:rgb(0, 0, 0);
        }
        
        .request-date {
          color: #64748b;
          font-size: 0.875rem;
        }
        
        .request-status {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: capitalize;
        }
        
        .request-status.pending {
          background-color: #ffedd5;
          color: #9a3412;
        }
        
        .request-status.approved {
          background-color: #dcfce7;
          color: #166534;
        }
        
        .request-status.rejected {
          background-color: #fee2e2;
          color: #991b1b;
        }
        
        .exchange-details {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
          .exchange-details {
            flex-direction: column;
            gap: 1rem;
          }
        }
        
        .items-section {
          flex: 1;
        }
        
        .items-section h4 {
          margin: 0 0 1rem 0;
          color: #1e293b;
          font-size: 1.125rem;
        }
        
        .item-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .item-icon {
          color: #64748b;
          flex-shrink: 0;
        }
        
        .item-name {
          font-weight: 500;
          margin: 0 0 0.25rem 0;
          color: #1e293b;
        }
        
        .item-condition {
          font-size: 0.875rem;
          color: #64748b;
          margin: 0 0 0.5rem 0;
        }
        
        .price-display {
          margin: 0.5rem 0;
          padding: 0.5rem;
          background-color: #f8fafc;
          border-radius: 0.375rem;
        }
        
        .price-value {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }
        
        .price-label {
          color: #64748b;
          font-size: 0.875rem;
        }
        
        .price-amount {
          font-weight: 600;
          color: #1e293b;
        }
        
        .price-helper {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
        }
        
        .low-value {
          color: #16a34a;
        }
        
        .medium-value {
          color: #d97706;
        }
        
        .high-value {
          color: #dc2626;
        }
        
        .item-images {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }
        
        .request-image {
          width: 100px;
          height: 100px;
          border-radius: 0.375rem;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        
        .request-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .exchange-arrow {
          display: flex;
          align-items: center;
          color: #64748b;
        }
        
        @media (max-width: 768px) {
          .exchange-arrow {
            justify-content: center;
            transform: rotate(90deg);
            padding: 1rem 0;
          }
        }
        .notes-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px dashed #e2e8f0;
          font-size: 0.875rem;
          color: #334155;
        }

.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eaeaea;
}

.cancel-request-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #fee2e2;
  color: #b91c1c;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.cancel-request-btn:hover {
  background-color: #fecaca;
}

@media (max-width: 640px) {
  .content-container {
    padding: 1rem;
  }
  
  .exchange-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .new-request-btn {
    width: 100%;
    justify-content: center;
  }
  
  .exchange-form {
    padding: 1.5rem;
  }
  
  .image-preview {
    width: 60px;
    height: 60px;
  }
  
  .request-image {
    width: 80px;
    height: 80px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
    `}</style>
    </div>
  );
};

export default ItemExchange;
        
    

