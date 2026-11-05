import React, { useState } from 'react';
import { supabase } from '../supabase';

const RealAuth = ({ setActivePage }) => {
  const [loading, setLoading] = useState(false);

  // Sign In State
  const [signInData, setSignInData] = useState({ email: '', password: '' });

  // Registration State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    companyName: '',
    primaryEmail: '',
    password: '',
    confirmPassword: '',
  });

  // REAL SIGN IN (Strictly checks password hash against database)
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.email.trim(),
        password: signInData.password,
      });

      if (error) {
        alert(`Authentication Failed: ${error.message}`);
      } else {
        alert(`Successfully signed in as ${data.user.email}!`);
        if (setActivePage) setActivePage('home');
      }
    } catch (err) {
      alert(`Unexpected error: ${err.message || 'Login failed'}`);
    } finally {
      setLoading(false);
    }
  };

  // REAL SIGN UP (Hashes password securely and stores corporate data)
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.primaryEmail.trim(),
        password: signUpData.password, // Supabase automatically hashes this!
        options: {
          data: {
            full_name: signUpData.fullName,
            company_name: signUpData.companyName,
          },
        },
      });

      if (error) {
        alert(`Registration Error: ${error.message}`);
      } else {
        alert('Account created securely! Please check your email inbox to verify your account.');
      }
    } catch (err) {
      alert(`Unexpected error: ${err.message || 'Registration failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-10 text-white font-sans">
      {/* SIGN IN CARD */}
      <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          Secure Login
        </span>
        <h2 className="text-2xl font-bold">Sign In with Real Password</h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Corporate Email
            </label>
            <input
              type="email"
              required
              value={signInData.email}
              onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
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
              value={signInData.password}
              onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-orange-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg text-sm transition-colors shadow-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>
      </div>

      {/* REGISTER CARD */}
      <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          New Account
        </span>
        <h2 className="text-2xl font-bold">Register Encrypted Corporate Account</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={signUpData.fullName}
                onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                required
                value={signUpData.companyName}
                onChange={(e) => setSignUpData({ ...signUpData, companyName: e.target.value })}
                className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
              Corporate Email
            </label>
            <input
              type="email"
              required
              value={signUpData.primaryEmail}
              onChange={(e) => setSignUpData({ ...signUpData, primaryEmail: e.target.value })}
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                Password (Min 6 Chars)
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={signUpData.password}
                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-slate-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={signUpData.confirmPassword}
                onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg text-sm transition-colors shadow-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Secure Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RealAuth;
