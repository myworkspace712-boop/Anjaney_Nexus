import { useState, useEffect } from 'react';
import axios from 'axios';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bulk Add Users State
  const [newUsers, setNewUsers] = useState([{ name: '', email: '', password: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Array-Based Handlers for Bulk Add
  const handleUserChange = (index, e) => {
    const { name, value } = e.target;
    const updatedUsers = [...newUsers];
    updatedUsers[index] = { ...updatedUsers[index], [name]: value };
    setNewUsers(updatedUsers);
  };

  const handleAddUser = () => {
    setNewUsers([...newUsers, { name: '', email: '', password: '' }]);
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = newUsers.filter((_, i) => i !== index);
    setNewUsers(updatedUsers);
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const rawUser = localStorage.getItem('userInfo');
      const userInfo = rawUser ? JSON.parse(rawUser) : null;
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await axios.post(`${baseUrl}/api/auth/register-bulk`, { users: newUsers }, {
        headers: { Authorization: `Bearer ${userInfo?.token}` }
      });
      if (response.data.success) {
        setSubmitMessage(`Success: Created ${response.data.createdCount} users.`);
        setNewUsers([{ name: '', email: '', password: '' }]);
        // Refresh users list
        const usersRes = await axios.get(`${baseUrl}/api/auth/users`, { headers: { Authorization: `Bearer ${userInfo?.token}` } });
        setUsers(Array.isArray(usersRes.data.users) ? usersRes.data.users : (Array.isArray(usersRes.data) ? usersRes.data : []));
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage(err.response?.data?.message || err.message || 'Failed to register bulk users');
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Safe localStorage check
        const rawUser = localStorage.getItem('userInfo');
        if (!rawUser) throw new Error('No user credentials found. Please log in first.');

        const userInfo = JSON.parse(rawUser);
        if (!userInfo?.token) throw new Error('Authentication token missing. Please log in again.');

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        // 2. Base URL fallback to localhost if env variable is missing
        const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

        // Fetch users and orders concurrently
        const [usersRes, ordersRes] = await Promise.all([
          axios.get(`${baseUrl}/admin/users`, config),
          axios.get(`${baseUrl}/admin/orders`, config)
        ]);

        // 3. Array validation
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
        setLoading(false);
      } catch (err) {
        console.error('[AdminDashboard Error]:', err);
        setError(
          err.response?.data?.message || err.message || 'Failed to load dashboard data'
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading Admin Dashboard...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;


  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>

      {/* Bulk Add Users Section */}
      <div className="users-section" style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2>Bulk Add Users</h2>
        <form onSubmit={handleBulkSubmit}>
          {newUsers.map((user, index) => (
            <div key={index} className="user-form-block" style={{ borderBottom: '1px solid #ccc', marginBottom: '15px', paddingBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <h4 style={{ margin: '0 10px 0 0' }}>User {index + 1}</h4>
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={user.name} 
                onChange={(e) => handleUserChange(index, e)}
                required
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={user.email} 
                onChange={(e) => handleUserChange(index, e)} 
                required
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={user.password} 
                onChange={(e) => handleUserChange(index, e)} 
                required
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              {/* Only show remove button if there is more than 1 user */}
              {newUsers.length > 1 && (
                <button type="button" onClick={() => handleRemoveUser(index)} style={{ padding: '8px 12px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Remove User
                </button>
              )}
            </div>
          ))}
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button type="button" onClick={handleAddUser} style={{ padding: '10px 15px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              + Add Another User
            </button>
            <button type="submit" disabled={isSubmitting} style={{ padding: '10px 15px', backgroundColor: '#52c41a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {isSubmitting ? 'Submitting...' : 'Submit All Users'}
            </button>
          </div>
          {submitMessage && <p style={{ marginTop: '15px', fontWeight: 'bold', color: submitMessage.startsWith('Success') ? 'green' : 'red' }}>{submitMessage}</p>}
        </form>
      </div>

      {/* Users Section */}
      <h2>Users ({users.length})</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No users found.</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id || user.id}>
                <td>{user._id || user.id}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>{user.role || 'user'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Orders Section */}
      <h2>Orders ({orders.length})</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Order ID</th>
            <th>User</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No orders found.</td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order._id || order.id}>
                <td>{order._id || order.id}</td>
                <td>{order.user?.name || order.user?.email || 'Unknown User'}</td>
                <td>${order.totalPrice ? Number(order.totalPrice).toFixed(2) : '0.00'}</td>
                <td>{order.isDelivered ? 'Delivered' : 'Pending'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;