import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProfile = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Network error while fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!userId) {
      alert("Invalid user ID");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await axios.delete(`${baseUrl}/auth/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        // Filter out the deleted user
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      } else {
        alert(response.data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('[Delete User Error]:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Network error while deleting user');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white">
        <h2 className="text-3xl font-bold">Hello, Administrator {user.name}!</h2>
        <p className="mt-2 opacity-90">{user.email}</p>
        <span className="inline-block mt-4 px-3 py-1 bg-red-500/80 rounded-full text-sm font-semibold backdrop-blur-sm">
          Super Admin Access
        </span>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-gray-800 text-3xl mb-3">📈</div>
          <h3 className="font-bold text-gray-800 mb-2">Platform Statistics</h3>
          <p className="text-gray-500 text-sm">Global overview of revenue and activity.</p>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-gray-800 text-3xl mb-3">👥</div>
          <h3 className="font-bold text-gray-800 mb-2">User Directory</h3>
          <p className="text-gray-500 text-sm">Manage customers, sellers, and roles.</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-gray-800 text-3xl mb-3">🛠️</div>
          <h3 className="font-bold text-gray-800 mb-2">System Settings</h3>
          <p className="text-gray-500 text-sm">Configure core platform functionality.</p>
        </div>
      </div>

      {/* User Directory Section */}
      <div className="p-8 border-t border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">User Management</h3>
        
        {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
        
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-600">Name</th>
                  <th className="p-4 font-semibold text-gray-600">Email</th>
                  <th className="p-4 font-semibold text-gray-600">Role</th>
                  <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(u => (
                    <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-800">{u.name}</td>
                      <td className="p-4 text-gray-600">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          u.role === 'admin' ? 'bg-red-100 text-red-700' :
                          u.role === 'seller' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {u._id !== user._id && (
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded transition-colors text-sm font-semibold"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
