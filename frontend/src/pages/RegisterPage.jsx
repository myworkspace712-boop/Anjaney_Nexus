import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'an_secure_corporate_database';
const EMAIL_HISTORY_KEY = 'anjaney_nexus_email_history'; // New history key
const MASTER_ADMIN_EMAILS = ['yatharthjoshi127@gmail.com', 'yj7gov@gmail.com'];

const EMAILJS_SERVICE_ID = ''; 
const EMAILJS_TEMPLATE_ID = ''; 
const EMAILJS_PUBLIC_KEY = ''; 

const RegisterPage = ({ setActivePage, setCurrentUser }) => {
  const [accountType, setAccountType] = useState('user');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [isSending, setIsSending] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(null);

  // New Email History State
  const [emailHistory, setEmailHistory] = useState([]);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Initialize Users & Load Email History on Mount
  useEffect(() => {
    // 1. User DB Initialization
    const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    let updated = false;

    MASTER_ADMIN_EMAILS.forEach((adminEmail) => {
      const existingIndex = storedUsers.findIndex((u) => u.email === adminEmail);
      if (existingIndex === -1) {
        storedUsers.push({
          email: adminEmail,
          password: 'Admin@12',
          companyName: 'Anjaney Nexus Admin',
          role: 'admin',
          isAdmin: true,
          isVerified: true,
          attempts: 0,
          isLocked: false,
          createdAt: new Date().toLocaleDateString(),
        });
        updated = true;
      } else if (storedUsers[existingIndex].role !== 'admin') {
        storedUsers[existingIndex].role = 'admin';
        storedUsers[existingIndex].isAdmin = true;
        updated = true;
      }
    });
    if (updated) localStorage.setItem(STORAGE_KEY, JSON.stringify(storedUsers));

    // 2. Load Email History
    const history = JSON.parse(localStorage.getItem(EMAIL_HISTORY_KEY)) || [];
    setEmailHistory(history);
  }, []);

  // Listen for Cross-Tab Verification Event from the New Tab
  useEffect(() => {
    const handleVerificationComplete = (userData) => {
      // Clean up event key
      try { localStorage.removeItem('emailVerifiedEvent'); } catch {}

      const user = userData || JSON.parse(localStorage.getItem('user') || localStorage.getItem('an_active_session_user') || '{}');
      if (typeof setCurrentUser === 'function') {
        setCurrentUser(user);
      }

      const isAdmin = user.role === 'admin' || user.isAdmin;
      if (typeof setActivePage === 'function') {
        setActivePage(isAdmin ? 'admin' : 'home');
      } else if (typeof window !== 'undefined') {
        window.location.href = isAdmin ? '/admin' : '/';
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === 'emailVerifiedEvent' && e.newValue) {
        try {
          const payload = JSON.parse(e.newValue);
          handleVerificationComplete(payload.user);
        } catch {
          handleVerificationComplete();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    let authChannel;
    try {
      authChannel = new BroadcastChannel('auth_channel');
      authChannel.onmessage = (msg) => {
        if (msg.data?.type === 'verification_complete') {
          handleVerificationComplete(msg.data.user);
        }
      };
    } catch {}

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (authChannel) authChannel.close();
    };
  }, [setActivePage, setCurrentUser]);

  // Handle outside click to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowEmailDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setShowEmailDropdown(true); // Show dropdown while typing
    if (feedback.text) setFeedback({ type: '', text: '' });
  };

  const handleSelectHistoryEmail = (selectedEmail) => {
    setEmail(selectedEmail);
    setShowEmailDropdown(false);
    if (feedback.text) setFeedback({ type: '', text: '' });
  };

  const handleClearHistory = () => {
    setEmailHistory([]);
    localStorage.removeItem(EMAIL_HISTORY_KEY);
    setShowEmailDropdown(false);
    // Note: The current input value (email) remains unchanged as requested.
  };

  const saveEmailToHistory = (emailToSave) => {
    const cleanEmail = emailToSave.toLowerCase().trim();
    if (!cleanEmail) return;

    // Deduplicate and push to top, limit to 20
    const newHistory = [
      cleanEmail,
      ...emailHistory.filter(e => e !== cleanEmail)
    ].slice(0, 20);

    setEmailHistory(newHistory);
    localStorage.setItem(EMAIL_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const passwordChecks = {
    length: createPassword.length >= 6 && createPassword.length <= 8,
    uppercase: /[A-Z]/.test(createPassword),
    lowercase: /[a-z]/.test(createPassword),
    number: /[0-9]/.test(createPassword),
    special: /[@#$!%*?&]/.test(createPassword),
  };

  const getMissingPasswordRules = () => {
    const missing = [];
    if (!createPassword) return ['Please enter a password.'];
    if (!passwordChecks.length) missing.push('6 to 8 char limit');
    if (!passwordChecks.uppercase) missing.push('1 uppercase');
    if (!passwordChecks.lowercase) missing.push('1 lowercase');
    if (!passwordChecks.number) missing.push('1 number');
    if (!passwordChecks.special) missing.push('1 special symbol');
    return missing;
  };

  const sendVerificationEmailToInbox = async (targetEmail, roleLabel, verificationLink) => {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      return { sentRealEmail: false };
    }
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: { 
            to_email: targetEmail, 
            account_role: roleLabel.toUpperCase(), 
            verification_link: verificationLink, 
            company_name: 'Anjaney Nexus India LLP' 
          },
        }),
      });
      if (!response.ok) throw new Error(await response.text());
      return { sentRealEmail: true };
    } catch (err) {
      console.warn(`EmailJS dispatch error: ${err.message}`);
      return { sentRealEmail: false };
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', text: '' });

    const cleanEmail = email.toLowerCase().trim();
    
    // 1. SAVE TO HISTORY IMMEDIATELY (Even if validation fails)
    saveEmailToHistory(cleanEmail);
    setShowEmailDropdown(false);

    // 2. Validate
    const missingRules = getMissingPasswordRules();
    if (missingRules.length > 0) {
      setFeedback({ type: 'error', text: `Password missing: ${missingRules.join(', ')}.` });
      return;
    }
    if (!verifyPassword) {
      setFeedback({ type: 'error', text: 'Please verify your password.' });
      return;
    }
    if (createPassword !== verifyPassword) {
      setFeedback({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    setIsSending(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: companyName.trim() || cleanEmail.split('@')[0],
          email: cleanEmail, 
          password: createPassword, 
          companyName: companyName.trim(), 
          role: accountType 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({ type: 'success', text: data.message });
        setPendingVerification({ 
          email: cleanEmail, 
          role: roleLabels[accountType] || accountType, 
          link: data.verificationUrl || '' 
        });
        setCompanyName('');
        setEmail('');
        setCreatePassword('');
        setVerifyPassword('');
      } else {
        setFeedback({ type: 'error', text: data.message || data.error || 'Registration failed.' });
      }
    } catch (err) {
      console.warn('Backend server unreachable, falling back to local session store:', err);
      


      const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const finalRole = MASTER_ADMIN_EMAILS.includes(cleanEmail) ? 'admin' : accountType;
      const verificationLink = `${window.location.origin}${window.location.pathname}?verify_email=${encodeURIComponent(cleanEmail)}`;

      const newAccount = {
        email: cleanEmail,
        password: createPassword,
        companyName: finalRole === 'seller' ? companyName.trim() || 'Corporate Seller' : finalRole === 'admin' ? 'Anjaney Nexus Admin' : 'Registered User',
        role: finalRole,
        isAdmin: finalRole === 'admin',
        isVerified: false,
        verificationLink: verificationLink,
        attempts: 0,
        isLocked: false,
        createdAt: new Date().toLocaleDateString(),
      };

      storedUsers.unshift(newAccount);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedUsers));

      await sendVerificationEmailToInbox(cleanEmail, finalRole, verificationLink);

      setPendingVerification({ 
        email: cleanEmail, 
        role: finalRole, 
        link: verificationLink,
        serverOffline: true
      });
      setFeedback({ type: 'error', text: 'Server offline: Backend at http://localhost:5000 was unreachable.' });
      setCompanyName('');
      setEmail('');
      setCreatePassword('');
      setVerifyPassword('');
    } finally {
      setIsSending(false);
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

      // 3. Show the result
      if (response.ok) {
        setFeedback({ type: 'success', text: `Account completely deleted from database.` });
        if (typeof setCreatePassword === 'function') setCreatePassword('');
        if (typeof setVerifyPassword === 'function') setVerifyPassword('');
        if (typeof setPassword === 'function') setPassword('');
      } else {
        // Show whatever error the backend gives us
        setFeedback({ type: 'error', text: data.error || 'Failed to delete from server.' });
      }
      
    } catch (err) {
      setFeedback({ type: 'error', text: 'Network error while contacting the server.' });
    }
  };

  const roleLabels = { user: 'User', seller: 'Seller', admin: 'Admin' };

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12 font-sans text-slate-800 dark:text-slate-100 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] space-y-6">
        
        {pendingVerification ? (
          <div className="space-y-5 text-center py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-800/50 flex items-center justify-center text-3xl">✉️</div>
            <div className="space-y-2">
              <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-800/50">Action Required</span>
              <h2 className="text-2xl font-black text-blue-950 dark:text-white pt-2">Check Your Inbox</h2>
              {pendingVerification.serverOffline ? (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-800 dark:text-amber-300 font-medium text-left space-y-1">
                  <p>⚠️ <b>Backend server is currently offline.</b></p>
                  <p>A real email could not be dispatched because <code>http://localhost:5000</code> is not running. Start the backend with <code>npm start</code> in the <code>backend/</code> folder to send real emails.</p>
                  <p>You can use the <b>Instant Verify</b> button below to test your session immediately.</p>
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto font-medium">
                  We've sent a verification link to activate your <strong className="text-blue-950 dark:text-white">{pendingVerification.role}</strong> account. Please check your inbox and spam folder.
                </p>
              )}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-700 dark:text-amber-400 font-medium">
                ⚡ <b>Leave this tab open.</b> It will automatically sign you in and open your dashboard once you verify in the new window.
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mt-4 space-y-3">
                <p className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 break-all">{pendingVerification.email}</p>
                {pendingVerification.link && (
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Dev Mode Bypass</p>
                    <a 
                      href={pendingVerification.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black tracking-widest uppercase rounded-xl transition-colors shadow-lg shadow-orange-500/30"
                    >
                      Bypass & Verify Instantly
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
              <button onClick={() => setPendingVerification(null)} className="hover:text-blue-950 dark:hover:text-white cursor-pointer transition-colors">← Back to Register</button>
              <button onClick={() => setActivePage && setActivePage('auth')} className="text-orange-500 hover:text-orange-400 cursor-pointer transition-colors">Go to Sign In →</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-black text-orange-500 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-800/50">
                  {roleLabels[accountType]}
                </span>
                <h2 className="text-2xl font-black text-blue-950 dark:text-white mt-2">Create Account</h2>
              </div>
              <button 
                type="button" 
                onClick={() => setActivePage && setActivePage('auth')} 
                className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-950 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Sign In →
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              {['user', 'seller', 'admin'].map((roleKey) => (
                <button
                  key={roleKey} 
                  type="button" 
                  onClick={() => setAccountType(roleKey)}
                  className={`py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    accountType === roleKey 
                      ? 'bg-blue-950 text-white shadow-md dark:bg-orange-500 dark:text-white' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/60'
                  }`}
                >
                  {roleLabels[roleKey]}
                </button>
              ))}
            </div>

            {feedback.text && (
              <div className={`p-3 rounded-xl text-xs font-bold text-center border ${
                feedback.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
              }`}>
                {feedback.text}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4" noValidate>
              {accountType === 'seller' && (
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">Seller Company Name</label>
                  <input 
                    type="text" 
                    required 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    placeholder="Global Agro Exports" 
                    className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-blue-950 dark:text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" 
                  />
                </div>
              )}

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
                  placeholder="Enter your email id" 
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
                  <label className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Create Password</label>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[11px] text-orange-500 hover:underline font-bold cursor-pointer">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  maxLength={8} 
                  value={createPassword} 
                  onChange={(e) => setCreatePassword(e.target.value.slice(0, 8))} 
                  placeholder="e.g. Nexus@12" 
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-blue-950 dark:text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm font-mono" 
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1.5 tracking-wider">Verify Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  maxLength={8} 
                  value={verifyPassword} 
                  onChange={(e) => setVerifyPassword(e.target.value.slice(0, 8))} 
                  placeholder="Re-enter 6–8 char password" 
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-blue-950 dark:text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm font-mono" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSending} 
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg shadow-orange-500/30 mt-2 cursor-pointer"
              >
                {isSending ? 'Processing...' : 'Register & Send Link'}
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
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
