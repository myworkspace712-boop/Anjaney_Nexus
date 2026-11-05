import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminPage = ({ user: propUser, setActivePage }) => {
  const [activeTab, setActiveTab] = useState('rfqs');
  const navigate = useNavigate();
  const { user: authUser } = useAuth();

  // Support both props and AuthContext/localStorage
  const currentUser = propUser || authUser || (() => {
    try {
      return JSON.parse(localStorage.getItem('an_user') || localStorage.getItem('user') || localStorage.getItem('userInfo'));
    } catch {
      return null;
    }
  })();

  const handleNavigateHome = () => {
    if (setActivePage) {
      setActivePage('home');
    } else {
      navigate('/');
    }
  };

  // Simple access check for demo/protection
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-[80vh] bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-950 p-8 rounded-2xl border border-red-500/30 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
            🚫
          </div>
          <h2 className="text-2xl font-extrabold text-white">Access Denied</h2>
          <p className="text-sm text-slate-400">
            This area is strictly restricted to Anjaney Nexus India LLP administrators.
          </p>
          <button
            onClick={handleNavigateHome}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors text-sm cursor-pointer"
          >
            Return to Public Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Portal Header */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs font-bold rounded uppercase">
                Admin Privilege Active
              </span>
              <span className="text-xs text-slate-400">Session ID: #AN-ADM-2026</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight mt-2">
              Executive Trade Control Center
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Logged in as: <span className="text-orange-400 font-semibold">{currentUser?.email || 'admin@anjaneynexus.com'}</span>
            </p>
          </div>

          <button
            onClick={handleNavigateHome}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            ← Back to Storefront
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 gap-6">
          <button
            onClick={() => setActiveTab('rfqs')}
            className={`pb-3 font-bold text-sm tracking-wide transition-colors border-b-2 cursor-pointer ${
              activeTab === 'rfqs' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📦 RFQ Inquiries (2)
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 font-bold text-sm tracking-wide transition-colors border-b-2 cursor-pointer ${
              activeTab === 'users' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            👥 Corporate Email Entities
          </button>
        </div>

        {/* Tab Content: RFQs */}
        {activeTab === 'rfqs' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Incoming Bulk Requests for Quote</h2>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="font-mono text-xs text-orange-400">RFQ-8821</span>
                <h3 className="text-lg font-bold">Apex Global Trade Corp (Rahul Sharma)</h3>
                <p className="text-sm text-slate-300 mt-1">Granular Urea 46% (500 Metric Tons)</p>
                <div className="flex gap-4 text-xs text-slate-400 mt-2 font-mono">
                  <span>Primary Email: trade@apexglobal.com</span>
                  <span>Billing Email: accounts@apexglobal.com</span>
                </div>
              </div>
              <button
                onClick={() => alert('Sending official quotation email...')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 font-bold text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Send Formal Quote
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: Corporate Email Entities */}
        {activeTab === 'users' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                  <th className="p-4">Company</th>
                  <th className="p-4">Primary Email</th>
                  <th className="p-4">Billing Email</th>
                  <th className="p-4">Role / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-4 font-bold text-white">Anjaney Nexus India LLP</td>
                  <td className="p-4 font-mono text-xs text-orange-400">admin@anjaneynexus.com</td>
                  <td className="p-4 font-mono text-xs text-slate-400">finance@anjaneynexus.com</td>
                  <td className="p-4"><span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 font-bold">Administrator</span></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white">Apex Global Trade Corp</td>
                  <td className="p-4 font-mono text-xs text-slate-300">trade@apexglobal.com</td>
                  <td className="p-4 font-mono text-xs text-slate-400">accounts@apexglobal.com</td>
                  <td className="p-4"><span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-bold">Verified Buyer</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPage;
