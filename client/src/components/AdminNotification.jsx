// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminNotification = () => {
//   const [notification, setNotification] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSendNotification = async () => {
//     if (!notification.trim()) {
//       setError('Notification message cannot be empty.');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.post('/api/send-notification', {
//         message: notification,
//       });

//       if (response.data.success) {
//         setSuccess('Notification sent successfully!');
//         setNotification('');
//       } else {
//         setError('Failed to send notification.');
//       }
//     } catch (err) {
//       setError('An error occurred while sending the notification.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '2rem' }}>
//       <h3>Send Notification to Clients</h3>
//       <textarea
//         value={notification}
//         onChange={(e) => setNotification(e.target.value)}
//         placeholder="Enter your notification message here..."
//         style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
//       />
//       <button
//         onClick={handleSendNotification}
//         disabled={loading}
//         style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
//       >
//         {loading ? 'Sending...' : 'Send Notification'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//     </div>
//   );
// };

// export default AdminNotification;
// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminNotification = () => {
//   const [notification, setNotification] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSendNotification = async () => {
//     if (!notification.trim()) {
//       setError('Notification message cannot be empty.');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       // Send the notification to the backend
//       const response = await axios.post('http://localhost:3000/notifications', {
//         message: notification,
//       });

//       if (response.data.success) {
//         setSuccess('Notification sent successfully!');
//         setNotification('');
//       } else {
//         setError(response.data.error || 'Failed to send notification.');
//       }
//     } catch (err) {
//       setError('An error occurred while sending the notification.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', padding: '2rem' }}>
//       <h3>Send Notification to Clients</h3>
//       <textarea
//         value={notification}
//         onChange={(e) => setNotification(e.target.value)}
//         placeholder="Enter your notification message here..."
//         style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
//       />
//       <button
//         onClick={handleSendNotification}
//         disabled={loading}
//         style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
//       >
//         {loading ? 'Sending...' : 'Send Notification'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//     </div>
//   );
// };

// export default AdminNotification;

import React, { useState } from 'react';
import axios from 'axios';

const AdminNotification = () => {
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendNotification = async () => {
    if (!notification.trim()) {
      setError('Notification message cannot be empty.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Send the notification to the backend
      const response = await axios.post('http://localhost:3000/send-notification', {
        message: notification,
      });

      if (response.data.success) {
        setSuccess('Notification sent successfully!');
        setNotification('');
      } else {
        setError(response.data.error || 'Failed to send notification.');
      }
    } catch (err) {
      setError('An error occurred while sending the notification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h3>Send Notification to Clients</h3>
      <textarea
        value={notification}
        onChange={(e) => setNotification(e.target.value)}
        placeholder="Enter your notification message here..."
        style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
      />
      <button
        onClick={handleSendNotification}
        disabled={loading}
        style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
      >
        {loading ? 'Sending...' : 'Send Notification'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default AdminNotification;