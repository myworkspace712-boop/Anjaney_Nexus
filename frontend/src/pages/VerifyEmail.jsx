import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = ({ token: propToken, setActivePage }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying your email...');

  useEffect(() => {
    // Extract token/email whether provided via router params, props, or query string
    const urlParams = new URLSearchParams(window.location.search);
    const token = propToken || params.token || urlParams.get('token');
    const email = urlParams.get('verify_email') || urlParams.get('email');

    const verifyUserEmail = async () => {
      if (!token && !email) {
        setStatus('No verification token or email provided in the link. Please check your email.');
        return;
      }

      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
        // 1. Send verification payload to backend
        const response = await axios.post(`${backendUrl}/api/auth/verify-email`, {
          token,
          email
        });

        if (response.data?.success || response.data?.user) {
          const user = response.data.user;
          const authToken = response.data.token;

          setStatus('Verification successful! Redirecting you to the dashboard...');

          // 2. Save authentication token and user across app session keys
          if (authToken) localStorage.setItem('token', authToken);
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('ACTIVE_USER_KEY', JSON.stringify(user));
            localStorage.setItem('an_active_session_user', JSON.stringify(user));
            localStorage.setItem('an_user', JSON.stringify(user));
          }

          // 3. Fire cross-tab notification in case registration tab is open
          localStorage.setItem('emailVerifiedEvent', JSON.stringify({
            timestamp: Date.now(),
            user,
            token: authToken || ''
          }));
          window.dispatchEvent(new Event('auth-change'));

          try {
            const authChannel = new BroadcastChannel('auth_channel');
            authChannel.postMessage({
              type: 'verification_complete',
              token: authToken,
              user,
              email
            });
            authChannel.close();
          } catch {}

          // 4. Directly send them to the correct page based on their role
          setTimeout(() => {
            const isAdmin = user?.role === 'admin' || user?.isAdmin;
            const targetPage = isAdmin ? 'admin' : 'home';
            const targetPath = isAdmin ? '/admin-dashboard' : '/dashboard';

            if (typeof setActivePage === 'function') {
              setActivePage(targetPage);
            } else if (navigate) {
              navigate(targetPath, { replace: true });
            } else {
              window.location.href = targetPath;
            }
          }, 1500);
        } else {
          setStatus(response.data?.message || 'Verification failed. Link may be expired.');
        }
      } catch (error) {
        setStatus(
          error.response?.data?.message ||
          error.response?.data?.error ||
          'Verification failed or link expired. Please try registering again.'
        );
      }
    };

    verifyUserEmail();
  }, [params.token, propToken, navigate, setActivePage]);

  const handleManualRedirect = () => {
    const user = JSON.parse(localStorage.getItem('user') || localStorage.getItem('an_active_session_user') || '{}');
    const isAdmin = user.role === 'admin' || user.isAdmin;
    if (typeof setActivePage === 'function') {
      setActivePage(isAdmin ? 'admin' : 'home');
    } else if (navigate) {
      navigate(isAdmin ? '/admin-dashboard' : '/dashboard', { replace: true });
    } else {
      window.location.href = isAdmin ? '/admin-dashboard' : '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] font-sans px-4">
      <div className="bg-white p-10 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] text-center max-w-md w-full border border-gray-100">
        <div className="w-16 h-16 bg-[#172033] text-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-md">
          ✉️
        </div>
        <h2 className="text-2xl font-extrabold text-[#172033] mb-4 tracking-tight">
          Email Verification
        </h2>
        <p className="text-gray-500 font-medium leading-relaxed">
          {status}
        </p>

        {/* Fallback button just in case the automatic redirect takes too long */}
        {status.includes('successful') && (
          <button
            onClick={handleManualRedirect}
            className="mt-8 w-full bg-[#172033] text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs cursor-pointer shadow-lg shadow-slate-900/10"
          >
            Enter Site Now
          </button>
        )}

        {status.includes('failed') && (
          <div className="mt-8 flex flex-col gap-2.5">
            <button
              onClick={() => {
                if (typeof setActivePage === 'function') setActivePage('auth');
                else navigate('/auth');
              }}
              className="w-full bg-[#172033] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-gray-800 transition-all cursor-pointer"
            >
              Go to Sign In
            </button>
            <button
              onClick={() => {
                if (typeof setActivePage === 'function') setActivePage('home');
                else navigate('/');
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Back to Homepage
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
