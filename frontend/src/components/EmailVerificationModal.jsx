import React, { useState, useEffect } from 'react';

const EmailVerificationModal = ({ targetEmail, onVerified, onCancel }) => {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Countdown timer for resend
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Listen for multi-tab verification broadcast
  useEffect(() => {
    let authChannel;
    try {
      authChannel = new BroadcastChannel('auth_channel');
      authChannel.onmessage = (event) => {
        if (event.data?.type === 'verification_complete') {
          setSuccessMsg('Email verified from browser link!');
          setTimeout(() => {
            onVerified();
          }, 800);
        }
      };
    } catch {
      // BroadcastChannel unsupported fallback
    }

    return () => {
      if (authChannel) authChannel.close();
    };
  }, [onVerified]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanCode = code ? code.trim() : '';

    if (!cleanCode || cleanCode.length < 6) {
      setErrorMsg('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          code: cleanCode,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed. Please check the code.');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('an_active_session_user', JSON.stringify(data.user));
          window.dispatchEvent(new Event('auth-change'));
          window.dispatchEvent(new Event('authChange'));
        }
      }

      setSuccessMsg('Email verified successfully!');
      setTimeout(() => {
        onVerified();
      }, 700);
    } catch (err) {
      setErrorMsg(err.message || 'Incorrect 6-digit code. Please verify and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setTimer(60);
    setErrorMsg('');

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend code');
      }
      setSuccessMsg(`A fresh 6-digit verification code has been dispatched to ${targetEmail}`);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to dispatch verification code right now.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mx-auto text-2xl">
            ✉️
          </div>
          <h2 className="text-2xl font-black text-white">Verify Corporate Email</h2>
          <p className="text-xs text-slate-400">
            We sent a verification code to:{' '}
            <span className="font-mono text-orange-400 font-semibold block mt-1 break-all">
              {targetEmail}
            </span>
          </p>
        </div>

        {/* Feedback Banners */}
        {errorMsg && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-lg text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded-lg text-center">
            {successMsg}
          </div>
        )}

        <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg text-[11px] text-slate-400 text-center leading-relaxed">
          💡 If you don't see the email within 1–2 minutes, please check your <strong className="text-orange-400">Spam / Junk</strong> folder or the <strong className="text-slate-300">Promotions</strong> tab.
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
              Enter 6-Digit Code / Token
            </label>
            <input
              type="text"
              required
              maxLength={8}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. 849201"
              className="w-full text-center tracking-widest text-lg font-mono p-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-600 outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-sm transition-colors shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isVerifying ? 'Verifying Code...' : 'Confirm & Activate Account'}
          </button>
        </form>

        <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          <button
            type="button"
            disabled={timer > 0}
            onClick={handleResend}
            className={`font-semibold cursor-pointer ${
              timer > 0 ? 'text-slate-600 cursor-not-allowed' : 'text-orange-400 hover:underline'
            }`}
          >
            {timer > 0 ? `Resend Code in ${timer}s` : 'Resend Code'}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
