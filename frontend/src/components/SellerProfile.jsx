import React from 'react';

const SellerProfile = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
        <h2 className="text-3xl font-bold">Hello, {user.name}!</h2>
        <p className="mt-2 opacity-90">{user.email}</p>
        <span className="inline-block mt-4 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
          Seller Portal
        </span>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-purple-500 text-3xl mb-3">🏷️</div>
          <h3 className="font-bold text-gray-800 mb-2">Active Listings</h3>
          <p className="text-gray-500 text-sm">Manage your products and inventory.</p>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-purple-500 text-3xl mb-3">📊</div>
          <h3 className="font-bold text-gray-800 mb-2">Store Analytics</h3>
          <p className="text-gray-500 text-sm">Track your sales and visitor metrics.</p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-purple-500 text-3xl mb-3">💰</div>
          <h3 className="font-bold text-gray-800 mb-2">Recent Payouts</h3>
          <p className="text-gray-500 text-sm">View your earnings and payment history.</p>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
