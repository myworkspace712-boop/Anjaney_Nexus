import React from 'react';

const CustomerProfile = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white">
        <h2 className="text-3xl font-bold">Hello, {user.name}!</h2>
        <p className="mt-2 opacity-90">{user.email}</p>
        <span className="inline-block mt-4 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
          Customer Account
        </span>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-blue-500 text-3xl mb-3">📦</div>
          <h3 className="font-bold text-gray-800 mb-2">My Orders</h3>
          <p className="text-gray-500 text-sm">View and track your recent purchases.</p>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-blue-500 text-3xl mb-3">❤️</div>
          <h3 className="font-bold text-gray-800 mb-2">Saved Items</h3>
          <p className="text-gray-500 text-sm">Products you've favorited for later.</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-blue-500 text-3xl mb-3">⚙️</div>
          <h3 className="font-bold text-gray-800 mb-2">Account Settings</h3>
          <p className="text-gray-500 text-sm">Manage your personal details and password.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
