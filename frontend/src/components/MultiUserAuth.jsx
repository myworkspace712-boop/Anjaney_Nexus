import React, { useState, useEffect } from 'react';

const MultiUserAuth = () => {
  // Load stored users from localStorage on mount (or default to empty array)
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('an_corporate_users');
      return saved
        ? JSON.parse(saved)
        : [
            {
              email: 'admin@anjaneynexus.com',
              password: 'secure123',
              attempts: 0,
              isLocked: false,
            },
          ];
    } catch {
      return [
        {
          email: 'admin@anjaneynexus.com',
          password: 'secure123',
          attempts: 0,
          isLocked: false,
        },
      ];
    }
  });

  // Form States
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const MAX_ATTEMPTS = 3;

  // Save users to localStorage whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem('an_corporate_users', JSON.stringify(users));
    } catch (err) {
      console.error('Error saving users to localStorage:', err);
    }
  }, [users]);

  // 1. REGISTER A NEW EMAIL & PASSWORD HOLDER
  const handleRegister = (e) => {
    e.preventDefault();
    const cleanEmail = regEmail.toLowerCase().trim();

    // Check if email already exists
    const existingUser = users.find((u) => u.email === cleanEmail);
    if (existingUser) {
      alert('This email ID is already registered in the system.');
      return;
    }

    const newUser = {
      email: cleanEmail,
      password: regPassword,
      attempts: 0,
      isLocked: false,
    };

    setUsers([...users, newUser]);
    setRegEmail('');
    setRegPassword('');
    alert(`Successfully stored new corporate email: ${cleanEmail}`);
  };

  // 2. SIGN IN & TRACK ATTEMPTS PER EMAIL
  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = loginEmail.toLowerCase().trim();

    const userIndex = users.findIndex((u) => u.email === cleanEmail);

    if (userIndex === -1) {
      alert('Email ID not found. Please register this email first.');
      return;
    }

    const targetUser = users[userIndex];

    if (targetUser.isLocked) {
      alert(`Account for ${cleanEmail} is locked due to too many failed attempts.`);
      return;
    }

    // Check password
    if (targetUser.password === loginPassword) {
      alert(`Login successful for ${cleanEmail}! Attempt counter reset.`);

      // Reset attempts on successful login
      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...targetUser, attempts: 0 };
      setUsers(updatedUsers);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      // Increment attempt counter for this specific user
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
        alert(`Maximum attempt limit (${MAX_ATTEMPTS}) reached for ${cleanEmail}. Account locked.`);
      } else {
        alert(`Invalid password! Failed attempt ${nextAttempts} of ${MAX_ATTEMPTS} for this email.`);
      }
    }
  };

  // Helper to unlock an account manually for convenience
  const handleUnlock = (email) => {
    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, attempts: 0, isLocked: false } : u
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10 text-white">
      {/* Grid: Register New User vs Sign In */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* REGISTER SECTION */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Database Storage
          </span>
          <h2 className="text-xl font-bold">Add New Email & Password</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                New Corporate Email
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
                Password
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
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg text-sm transition-colors cursor-pointer"
            >
              Store New Credentials
            </button>
          </form>
        </div>

        {/* SIGN IN SECTION */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Authentication & Attempts
          </span>
          <h2 className="text-xl font-bold">Sign In (Multi-User)</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                Registered Email
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
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg text-sm transition-colors cursor-pointer"
            >
              Sign In & Track Attempts
            </button>
          </form>
        </div>
      </div>

      {/* STORED ACCOUNTS DIRECTORY (To preview all stored email holders) */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white">
          Stored Email Holders & Attempt Status ({users.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-slate-400 uppercase border-b border-slate-800">
                <th className="p-3">Email ID</th>
                <th className="p-3">Failed Attempts</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {users.map((u, index) => (
                <tr key={index} className="hover:bg-slate-900/40">
                  <td className="p-3 text-orange-400">{u.email}</td>
                  <td className="p-3 text-slate-300">
                    {u.attempts} / {MAX_ATTEMPTS}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        u.isLocked
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}
                    >
                      {u.isLocked ? 'LOCKED' : 'Active'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {u.isLocked ? (
                      <button
                        type="button"
                        onClick={() => handleUnlock(u.email)}
                        className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-orange-400 border border-orange-500/30 transition-colors cursor-pointer"
                      >
                        Reset / Unlock
                      </button>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MultiUserAuth;
