import { useState, useEffect } from 'react';
import axios from 'axios';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
        const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

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