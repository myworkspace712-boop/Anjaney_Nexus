import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (data.success) {
          setUser(data.data);
        } else {
          setError(data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        setError('Network error or server unreachable');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="animate-pulse text-xl text-gray-500 font-semibold flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-red-50 border border-red-100 text-red-700 p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-3 text-red-800">Access Denied</h2>
          <p className="text-red-600/80 font-medium">{error}</p>
          <button 
            onClick={() => navigate('/login')} 
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <header className="bg-white shadow border border-gray-200 p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Welcome, <span className="text-indigo-600">{user.name}</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-medium">
              {user.email}
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:items-end gap-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wider border border-gray-200">
              Role: {user.role}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Conditional Role Sections */}
        <div className="mt-8">
          {user.role === 'customer' && (
            <section className="bg-blue-50 border border-blue-100 p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">🛍️</span> Customer Area
              </h2>
              <p className="text-blue-700 font-medium">
                Here you can view your active orders, check your wishlist, and manage your shipping details.
              </p>
            </section>
          )}

          {user.role === 'seller' && (
            <section className="bg-purple-50 border border-purple-100 p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">🏪</span> Seller Portal
              </h2>
              <p className="text-purple-700 font-medium">
                Manage your product listings, view incoming orders, and track your store's sales performance.
              </p>
            </section>
          )}

          {user.role === 'admin' && (
            <section className="bg-red-50 border border-red-100 p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">⚙️</span> Admin Control
              </h2>
              <p className="text-red-700 font-medium">
                Access system-wide settings, manage users, and review platform analytics.
              </p>
              <button 
                onClick={() => navigate('/admin/dashboard')}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors"
              >
                Go to Full Admin Panel
              </button>
            </section>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
