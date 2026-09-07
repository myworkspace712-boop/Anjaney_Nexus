import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerProfile from '../components/CustomerProfile';
import SellerProfile from '../components/SellerProfile';
import AdminProfile from '../components/AdminProfile';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('anjaney-nexus-token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        
        if (data.success) {
          setUser(data.data);
        } else {
          setError(data.message || 'Failed to fetch profile.');
        }
      } catch (err) {
        setError('Network error or server is unreachable.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-semibold animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Your Profile</h1>
          <button 
            onClick={() => {
              localStorage.removeItem('anjaney-nexus-token');
              navigate('/login');
            }}
            className="text-sm font-semibold text-red-500 hover:text-red-700 hover:underline transition-colors"
          >
            Log Out
          </button>
        </div>
        <p className="text-gray-500 mb-8">Manage your account settings and preferences.</p>

        {user.role === 'customer' && <CustomerProfile user={user} />}
        {user.role === 'seller' && <SellerProfile user={user} />}
        {user.role === 'admin' && <AdminProfile user={user} />}
      </div>
    </div>
  );
};

export default Profile;
