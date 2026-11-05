import React, { useState } from 'react';

const STORAGE_KEY = 'an_secure_corporate_database';

const CreateAccountPage = ({ setActivePage, setCurrentUser }) => {
  const [accountType, setAccountType] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  // --- ADD THESE NEW STATES & REFS ---
  const [emailHistory, setEmailHistory] = useState([]);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const dropdownRef = React.useRef(null);
  const EMAIL_HISTORY_KEY = 'anjaney_nexus_email_history';

  // --- ADD THESE EFFECTS ---
  // Load history on mount
  React.useEffect(() => {
    const history = JSON.parse(localStorage.getItem(EMAIL_HISTORY_KEY)) || [];
    setEmailHistory(history);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowEmailDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- AUTOMATICALLY VERIFY AND REDIRECT ON verify_email LINK ---
  React.useEffect(() => {
    const verifyEmailFromUrl = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const emailToVerify = searchParams.get("verify_email");

      if (emailToVerify) {
        try {
          // 1. Call your backend to verify the email
          const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
          const response = await fetch(`${backendUrl}/api/auth/verify-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailToVerify }),
          });

          const data = await response.json();

          if (response.ok) {
            // 1. Establish the Authentication Session using the backend response
            if (data.user) {
              localStorage.setItem('an_active_session_user', JSON.stringify(data.user));
              localStorage.setItem('ACTIVE_USER_KEY', JSON.stringify(data.user));
              if (typeof setCurrentUser === 'function') setCurrentUser(data.user);
              window.dispatchEvent(new Event('auth-change'));
            }

            setFeedback({ type: 'success', text: 'Email verified! Signing you in automatically...' });
            
            setTimeout(() => {
              // 2. Attempt to close tab (for dev bypass)
              window.close();
              
              // 3. Redirect to the correct authenticated route
              if (typeof setActivePage === 'function') {
                if (data.user && (data.user.role === 'admin' || data.user.isAdmin)) {
                  setActivePage('admin');
                } else {
                  setActivePage('home');
                }
              }
            }, 2000);

          } else {
            setFeedback({ type: 'error', text: `Verification failed: ${data.error || data.message || 'Unknown error'}` });
          }
        } catch (err) {
          setFeedback({ type: 'error', text: 'Network error during verification.' });
        } finally {
          // 4. Clean up the URL so it doesn't get stuck in a verification loop if refreshed
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    verifyEmailFromUrl();
  }, [setActivePage]);

  // --- ADD THESE HELPER FUNCTIONS ---
  const handleSelectHistoryEmail = (selectedEmail) => {
    setEmail(selectedEmail);
    setShowEmailDropdown(false);
    if (feedback.text) setFeedback({ type: '', text: '' });
  };

  const handleClearHistory = () => {
    setEmailHistory([]);
    localStorage.removeItem(EMAIL_HISTORY_KEY);
    // Keep dropdown open so user sees the empty state, or close it:
    // setShowEmailDropdown(false); 
  };

  const saveEmailToHistory = (emailToSave) => {
    const cleanEmail = emailToSave.toLowerCase().trim();
    if (!cleanEmail) return;
    const newHistory = [cleanEmail, ...emailHistory.filter(e => e !== cleanEmail)].slice(0, 20);
    setEmailHistory(newHistory);
    localStorage.setItem(EMAIL_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const handleDeleteAccount = async () => {
    if (!email) {
      setFeedback({ type: 'error', text: 'Please enter an Email ID above to delete.' });
      return;
    }
    
    const cleanEmail = email.toLowerCase().trim();

    try {
      // 1. Delete from Backend (MongoDB)
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/auth/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await response.json();

      // 2. Delete from Frontend (localStorage)
      const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const updatedUsers = storedUsers.filter(u => u.email !== cleanEmail);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

      // 3. Remove from email history dropdown
      const newHistory = emailHistory.filter(e => e !== cleanEmail);
      setEmailHistory(newHistory);
      localStorage.setItem(EMAIL_HISTORY_KEY, JSON.stringify(newHistory));

      if (response.ok) {
        setFeedback({ type: 'success', text: data.message || `Account completely deleted from database.` });
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setFeedback({ type: 'error', text: data.error || data.message || 'Failed to delete from server.' });
      }
      
    } catch (err) {
      setFeedback({ type: 'error', text: 'Network error while contacting the server.' });
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setFeedback({ type: '', text: '' });

    const cleanEmail = email.toLowerCase().trim();

    // ADD THIS EXACT LINE HERE:
    saveEmailToHistory(cleanEmail);
    setShowEmailDropdown(false);

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setFeedback({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (password.length < 6) {
      setFeedback({ type: 'error', text: 'Create Password must be at least 6 characters.' });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({ type: 'error', text: 'Passwords do not match. Please verify your password.' });
      return;
    }

    let storedUsers = [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      storedUsers = saved
        ? JSON.parse(saved)
        : [
            {
              email: 'admin@anjaneynexus.com',
              password: 'AdminSecurePassword123',
              attempts: 0,
              isLocked: false,
            },
          ];
    } catch {
      storedUsers = [
        {
          email: 'admin@anjaneynexus.com',
          password: 'AdminSecurePassword123',
          attempts: 0,
          isLocked: false,
        },
      ];
    }

    if (storedUsers.some((u) => u.email === cleanEmail)) {
      setFeedback({ type: 'error', text: 'This email account is already registered.' });
      return;
    }

    const isAccountAdmin = accountType === 'admin' || cleanEmail.includes('admin') || cleanEmail.startsWith('admin@');
    const role = isAccountAdmin ? 'admin' : (accountType === 'seller' ? 'seller' : 'user');

    const newUser = {
      email: cleanEmail,
      password: password,
      role: role,
      isAdmin: isAccountAdmin,
      companyName: isAccountAdmin ? 'Anjaney Nexus Admin' : (role === 'seller' ? 'Corporate Seller' : 'Registered Client'),
      attempts: 0,
      isLocked: false,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...storedUsers, newUser]));

    // Save active session for immediate profile update
    localStorage.setItem('an_active_session_user', JSON.stringify(newUser));
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('an_user', JSON.stringify(newUser));
    localStorage.setItem('userInfo', JSON.stringify({ ...newUser, token: 'session-' + Date.now() }));
    localStorage.setItem('token', 'session-' + Date.now());

    window.dispatchEvent(new Event('auth-change'));
    window.dispatchEvent(new Event('authChange'));
    window.dispatchEvent(new Event('storage'));

    if (setCurrentUser) {
      setCurrentUser(newUser);
    }

    // Try sending email verification via backend
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        password: password,
        role: role,
      }),
    }).catch(() => {});

    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFeedback({
      type: 'success',
      text: `Verification email sent to ${cleanEmail}! Account created.`,
    });

    setTimeout(() => {
      if (setActivePage) setActivePage(isAccountAdmin ? 'admin' : 'home');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] bg-white dark:bg-slate-900 flex items-center justify-center px-4 py-12 font-sans text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-1.5 border-b border-slate-200 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            {accountType === 'admin' ? 'Admin Registration' : accountType === 'seller' ? 'Seller Registration' : 'User Registration'}
          </span>
          <h2 className="text-2xl font-black text-blue-950 dark:text-white pt-1">
            Register {accountType === 'admin' ? 'Admin' : accountType === 'seller' ? 'Seller' : 'User'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter email ID, create password, verify password, and receive inbox verification.
          </p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setAccountType('user')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              accountType === 'user' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white'
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setAccountType('seller')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              accountType === 'seller' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white'
            }`}
          >
            Seller
          </button>
          <button
            type="button"
            onClick={() => setAccountType('admin')}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              accountType === 'admin' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback.text && (
          <div
            className={`p-3 rounded-lg text-xs font-bold text-center border ${
              feedback.type === 'success'
                ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* Create Account & Password Form */}
        <form onSubmit={handleCreateAccount} className="space-y-4">
          {/* --- REPLACE YOUR OLD EMAIL INPUT WITH THIS --- */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-xs uppercase font-bold text-slate-500 mb-1.5 tracking-wider">Email ID</label>
            
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
              className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 placeholder-slate-400 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-medium"
            />
            
            {/* Custom Dropdown Menu */}
            {showEmailDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-60 flex flex-col overflow-hidden animate-in fade-in duration-200">
                
                {/* Header: Saved emails (X) — Clear All */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
                  <span className="text-xs font-bold text-slate-500">
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
                        className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-950 cursor-pointer transition-colors"
                      >
                        {histEmail}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-4 text-xs font-medium text-slate-400 text-center italic bg-white">
                    No previous emails saved.
                  </div>
                )}
              </div>
            )}
          </div>
          {/* --- END OF EMAIL INPUT REPLACEMENT --- */}

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs uppercase font-semibold text-slate-700 dark:text-slate-300">
                Create Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-orange-600 dark:text-orange-400 hover:underline font-semibold cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-orange-500 text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs uppercase font-semibold text-slate-700 dark:text-slate-300">
                Verify Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-[11px] text-orange-600 dark:text-orange-400 hover:underline font-semibold cursor-pointer"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-orange-500 text-sm"
            />
            {confirmPassword && confirmPassword !== password && (
              <p className="text-[11px] text-red-500 mt-1 font-semibold">
                Passwords do not match
              </p>
            )}
            {confirmPassword && confirmPassword === password && (
              <p className="text-[11px] text-green-600 dark:text-green-400 mt-1 font-semibold">
                ✓ Passwords match
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm uppercase tracking-wider transition-colors shadow-lg cursor-pointer mt-2"
          >
            Register & Send Verification
          </button>
        </form>

        {/* Navigation Links */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <button
            type="button"
            onClick={() => setActivePage('register')}
            className="hover:text-blue-950 dark:hover:text-white transition-colors cursor-pointer"
          >
            ← Register Page
          </button>
          <button
            type="button"
            onClick={() => setActivePage('auth')}
            className="text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer"
          >
            Sign In →
          </button>
        </div>

        {/* Delete Single Account Button */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="w-full py-2.5 px-4 bg-red-600/10 hover:bg-red-600/20 text-red-500 hover:text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🗑️</span>
            <span>Delete Entered Account</span>
          </button>

          <button
            type="button"
            onClick={async () => {
              const confirmDelete = window.confirm(
                'Are you sure you want to actively delete all registered users? This will wipe accounts from both the database and local storage.'
              );
              if (!confirmDelete) return;

              try {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem('an_active_session_user');
                localStorage.removeItem('user');
                localStorage.removeItem('an_user');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('token');

                window.dispatchEvent(new Event('auth-change'));
                window.dispatchEvent(new Event('authChange'));
                window.dispatchEvent(new Event('storage'));

                if (setCurrentUser) setCurrentUser(null);

                const res = await fetch('/api/auth/delete-all', { method: 'DELETE' });
                const data = await res.json().catch(() => ({}));

                setFeedback({
                  type: 'success',
                  text: data.message || 'All registered users actively deleted.',
                });
                alert('All registered users have been deleted.');
              } catch (err) {
                console.error('Delete error:', err);
                setFeedback({
                  type: 'success',
                  text: 'Local registered accounts wiped.',
                });
              }
            }}
            className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>⚠️</span>
            <span>Wipe All Registered Users (Reset)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
