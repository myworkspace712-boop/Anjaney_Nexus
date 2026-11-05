import React from 'react';
import AdminPortal from './AdminPortal';

const ACTIVE_USER_KEY = 'an_active_session_user';

const Admin = ({ user, currentUser, setActivePage }) => {
  // Retrieve active user from props or localStorage
  const activeUser =
    currentUser ||
    user ||
    (() => {
      try {
        const saved = localStorage.getItem(ACTIVE_USER_KEY);
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    })();

  const isAdmin =
    activeUser?.role === 'admin' ||
    activeUser?.isAdmin === true ||
    activeUser?.email?.toLowerCase().includes('admin');

  // Security check: only users with admin role can access
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] bg-white dark:bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-800 dark:text-white transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-slate-950 p-8 rounded-2xl border border-red-500/30 text-center space-y-4 shadow-xl dark:shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
            🚫
          </div>
          <h2 className="text-2xl font-extrabold text-blue-950 dark:text-white">Access Denied</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            This panel is restricted to Anjaney Nexus India LLP administrators.
          </p>
          <button
            type="button"
            onClick={() => setActivePage && setActivePage('home')}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors text-sm cursor-pointer"
          >
            Return to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminPortal
      currentUser={activeUser}
      onExit={() => setActivePage && setActivePage('home')}
    />
  );
};

export default Admin;
