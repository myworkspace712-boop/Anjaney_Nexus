import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'an_secure_corporate_database';
const ACTIVE_USER_KEY = 'an_active_session_user';
const MASTER_ADMIN_EMAILS = ['yatharthjoshi127@gmail.com', 'yj7gov@gmail.com'];
const MAX_ATTEMPTS = 3;

const EMAIL_HISTORY_KEY = 'anjaney_nexus_email_history';

const AuthPage = ({ setActivePage, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [savedEmails, setSavedEmails] = useState([]);

  // --- EMAIL HISTORY STATES & REFS ---
  const [emailHistory, setEmailHistory] = useState([]);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const emails = storedUsers.map(user => user.email);
    setSavedEmails(emails);

    // Load shared email history
    const history = JSON.parse(localStorage.getItem(EMAIL_HISTORY_KEY)) || [];
    setEmailHistory(history);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowEmailDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- HELPER FUNCTIONS ---
  const handleSelectHistoryEmail = (selectedEmail) => {
    setEmail(selectedEmail);
    setShowEmailDropdown(false);
    if (feedback.text) setFeedback({ type: '', text: '' });
  };

  const handleClearHistory = () => {
    setEmailHistory([]);
    localStorage.removeItem(EMAIL_HISTORY_KEY);
  };

  const saveEmailToHistory = (emailToSave) => {
    const cleanEmail = emailToSave.toLowerCase().trim();
    if (!cleanEmail) return;

    const newHistory = [
      cleanEmail,
      ...emailHistory.filter((e) => e !== cleanEmail),
    ].slice(0, 20);

    setEmailHistory(newHistory);
    localStorage.setItem(EMAIL_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', text: '' });

    // Normalize email, but DO NOT trim the password (allows intentional spaces)
    const cleanEmail = email.toLowerCase().trim();
    const rawPassword = password; 
    
    // Save attempt to history dropdown immediately
    saveEmailToHistory(cleanEmail);
    setShowEmailDropdown(false);

    try {
      // 1. Send secure API request to the Backend
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: cleanEmail, 
          password: rawPassword 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Login Success
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(data.user));
        if (typeof setCurrentUser === 'function') setCurrentUser(data.user);
        window.dispatchEvent(new Event('auth-change'));

        // Route appropriately based on backend role
        if (data.user.role === 'admin' || data.user.isAdmin) {
          if (typeof setActivePage === 'function') setActivePage('admin');
        } else {
          if (typeof setActivePage === 'function') setActivePage('home');
        }
        
      } else {
        // 3. Login Failed (Backend rejection)
        setFeedback({ type: 'error', text: data.error || 'Authentication failed.' });
      }
      
    } catch (err) {
      console.error('Sign In Error:', err);
      setFeedback({ type: 'error', text: 'Network error. Could not reach the server.' });
    }
  };

  const handleDeleteAccount = async () => {
    if (!email) {
      setFeedback({ type: 'error', text: 'Please enter an Email ID above to delete.' });
      return;
    }
    
    const cleanEmail = email.toLowerCase().trim();

    try {
      // 1. Tell the Backend to delete the user directly (No local pre-checks)
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/auth/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await response.json();

      // 2. Clear any lingering ghost data in the browser just in case
      const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const updatedUsers = storedUsers.filter(u => u.email !== cleanEmail);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
      setSavedEmails(updatedUsers.map(user => user.email));

      // 3. Show the result
      if (response.ok) {
        setFeedback({ type: 'success', text: `Account completely deleted from database.` });
        if (typeof setPassword === 'function') setPassword('');
        setEmail('');
      } else {
        // Show whatever error the backend gives us
        setFeedback({ type: 'error', text: data.error || 'Failed to delete from server.' });
      }
      
    } catch (err) {
      setFeedback({ type: 'error', text: 'Network error while contacting the server.' });
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-black text-orange-500 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-800/50">
              Corporate Portal
            </span>
            <h2 className="text-2xl font-black text-blue-950 dark:text-white mt-2">Sign In</h2>
          </div>
          <button
            type="button"
            onClick={() => setActivePage && setActivePage('register')}
            className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-950 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            Register →
          </button>
        </div>

        {feedback.text && (
          <div className={`p-3 rounded-xl text-xs font-bold text-center border ${
            feedback.type === 'success' ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
          }`}>
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-5" noValidate>
          <div className="relative" ref={dropdownRef}>
            <label className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">Email ID</label>
            
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowEmailDropdown(true);
                if (feedback.text) setFeedback({ type: '', text: '' });
              }}
              onFocus={() => setShowEmailDropdown(true)}
              placeholder="Select or enter your registered email"
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-blue-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-medium"
            />
            
            {showEmailDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-60 flex flex-col overflow-hidden animate-in fade-in duration-200">
                {/* Header: Saved emails (X) — Clear All */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shrink-0">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Saved emails ({emailHistory.length})
                  </span>
                  {emailHistory.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="text-[10px] font-black text-red-500 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      — Clear All ✕
                    </button>
                  )}
                </div>

                {emailHistory.length > 0 ? (
                  <div className="overflow-y-auto max-h-40 flex-grow py-2">
                    {emailHistory.map((histEmail, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectHistoryEmail(histEmail)}
                        className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-950 dark:hover:text-white cursor-pointer transition-colors"
                      >
                        {histEmail}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-4 text-xs font-medium text-slate-400 text-center italic bg-white dark:bg-slate-900">
                    No previous emails saved.
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-orange-500 hover:text-orange-600 hover:underline font-bold cursor-pointer transition-colors"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-blue-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-mono"
            />
            
            {MASTER_ADMIN_EMAILS.includes(email.toLowerCase().replace(/\s+/g, '')) && (
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-mono">
                Hint: Default Master Admin password is <strong className="text-orange-500">Admin@12</strong>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg shadow-orange-500/30 cursor-pointer mt-2"
          >
            Secure Sign In
          </button>
        </form>

        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="text-[10px] text-red-500 hover:text-red-600 font-bold uppercase tracking-widest cursor-pointer hover:underline underline-offset-4 transition-colors"
          >
            Delete Account Data
          </button>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
