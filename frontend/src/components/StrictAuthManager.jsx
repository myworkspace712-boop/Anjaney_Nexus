import React, { useState, useEffect } from 'react';

const StrictAuthManager = () => {
  // 1. Database of Stored Email & Password Holders (persisted in localStorage)
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('an_strict_corporate_users');
      return saved
        ? JSON.parse(saved)
        : [
            {
              email: 'admin@anjaneynexus.com',
              password: 'securePassword123',
              attempts: 0,
              isLocked: false,
            },
          ];
    } catch {
      return [
        {
          email: 'admin@anjaneynexus.com',
          password: 'securePassword123',
          attempts: 0,
          isLocked: false,
        },
      ];
    }
  });

  // Registration Form State
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const MAX_ATTEMPTS = 3;

  // Save changes to localStorage automatically
  useEffect(() => {
    try {
      localStorage.setItem('an_strict_corporate_users', JSON.stringify(users));
    } catch (err) {
      console.error('Error saving users to localStorage:', err);
    }
  }, [users]);

  // REGISTER NEW CORPORATE EMAIL HOLDER
  const handleRegister = (e) => {
    e.preventDefault();
    const cleanEmail = regEmail.toLowerCase().trim();

    // Check if email already exists
    const existingUser = users.find((u) => u.email === cleanEmail);
    if (existingUser) {
      alert('This corporate email is already registered in the system.');
      return;
    }

    const newUser = {
      email: cleanEmail,
      password: regPassword, // Stored securely to this specific email holder
      attempts: 0,
      isLocked: false,
    };

    setUsers([...users, newUser]);
    setRegEmail('');
    setRegPassword('');
    alert(`Successfully registered new corporate email holder: ${cleanEmail}`);
  };

  // STRICT LOGIN & ATTEMPT VALIDATION
  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = loginEmail.toLowerCase().trim();

    // Find the user in our stored database array
    const userIndex = users.findIndex((u) => u.email === cleanEmail);

    // RULE 1: Reject random/unregistered emails
    if (userIndex === -1) {
      alert('Access Denied: This email ID is not registered in our database.');
      return;
    }

    const targetUser = users[userIndex];

    // Check if account is locked due to too many failed attempts
    if (targetUser.isLocked) {
      alert(`Account for ${cleanEmail} is locked due to ${MAX_ATTEMPTS} failed attempts.`);
      return;
    }

    // RULE 2: Strictly validate password for THIS specific email
    if (targetUser.password === loginPassword) {
      alert(`Authentication Successful! Welcome back, ${cleanEmail}.`);

      // Reset attempts on successful login
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...targetUser, attempts: 0 };
      setUsers(updatedUsers);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      // RULE 3: Increment attempt counter for this specific email only
      const nextAttempts = targetUser.attempts + 1;
      const isNowLocked = nextAttempts >= MAX_ATTEMPTS;

      const updatedUsers = [...users];
      updatedUsers[userIndex] = {
        ...targetUser,
        attempts: nextAttempts,
        isLocked: isNowLocked,
      };
      setUsers(updatedUsers);

      if (isNowLocked) {
        alert(`Maximum attempt limit (${MAX_ATTEMPTS}) reached. Account ${cleanEmail} is now LOCKED.`);
      } else {
        alert(`Invalid password! Failed attempt ${nextAttempts} of ${MAX_ATTEMPTS} for ${cleanEmail}.`);
      }
    }
  };

  // Quick reset helper for locked accounts
  const handleUnlock = (email) => {
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, attempts: 0, isLocked: false } : u
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 text-white font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT 2 COLUMNS: REGISTRATION & SIGN IN FORMS */}
        <div className="lg:col-span-2 space-y-8">
          {/* REGISTER NEW EMAIL HOLDER */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Database Credential Holder
            </span>
            <h2 className="text-xl font-bold">Register New Corporate Email & Password</h2>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Corporate Email ID
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="trade@company.com"
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Assign Password
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg text-sm transition-colors shadow-md cursor-pointer"
              >
                Save Credential Holder
              </button>
            </form>
          </div>

          {/* STRICT SIGN IN FORM */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Strict Authentication
            </span>
            <h2 className="text-xl font-bold">Sign In & Verify Password</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Registered Email ID
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="trade@company.com"
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg text-sm transition-colors shadow-md cursor-pointer"
              >
                Authenticate Credentials
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR HISTORY DIRECTORY */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 sticky top-24">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Stored Email Directory</h3>
            <span className="text-xs font-mono bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">
              Total: {users.length}
            </span>
          </div>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {users.map((u, index) => (
              <div
                key={index}
                className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 space-y-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="font-mono text-xs text-orange-400 font-semibold break-all">
                    {u.email}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        u.isLocked
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}
                    >
                      {u.isLocked ? 'Locked' : 'Active'}
                    </span>
                    {u.isLocked && (
                      <button
                        type="button"
                        onClick={() => handleUnlock(u.email)}
                        title="Reset & Unlock Account"
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-orange-300 border border-orange-500/30 cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-mono pt-1 border-t border-slate-800/50">
                  <span>Failed Attempts:</span>
                  <strong className={u.attempts > 0 ? 'text-yellow-400' : 'text-slate-300'}>
                    {u.attempts} / {MAX_ATTEMPTS}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-800">
            Random passwords and unregistered emails are strictly rejected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrictAuthManager;
