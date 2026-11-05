import React, { useState } from 'react';

const AuthAttempts = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated credential check (Replace with your auth logic)
    const isCorrect = email === 'admin@anjaneynexus.com' && password === 'secure123';

    if (isCorrect) {
      alert('Login successful!');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-950 p-8 rounded-2xl border border-slate-800 text-white shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Secure Sign In</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
            Email ID
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-orange-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg text-white transition-colors cursor-pointer"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AuthAttempts;
