import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [customerData, setCustomerData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [registeredUserId, setRegisteredUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/';
    }
  }, []);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    let interval;

    if (isWaiting && registeredUserId) {
      // Ping the backend every 3 seconds
      interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/auth/status/${registeredUserId}`);
          const data = await response.json();

          if (data.isVerified) {
            clearInterval(interval);
            setIsWaiting(false);

            // 🛑 STRICT GUARD: Only set storage if the backend actually sent the token
            if (data.token && data.token !== 'undefined' && data.token !== 'null') {
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              localStorage.setItem('an_active_session_user', JSON.stringify(data.user));
              window.dispatchEvent(new Event('authChange'));
              window.dispatchEvent(new Event('auth-change'));

              const isAdmin = data.user?.role === 'admin' || data.user?.email?.toLowerCase().includes('admin');
              alert(`✅ Email verified successfully! You are now logged in and will be redirected to ${isAdmin ? 'the Admin Dashboard' : 'the homepage'}.`);
              window.location.href = isAdmin ? '/admin' : '/'; 
            } else {
              console.error("Backend confirmed verification but failed to send the auth token!");
              window.location.href = '/login'; 
            }
          }
        } catch (error) {
          console.error("Status check failed:", error);
        }
      }, 3000); 
    }

    // Cleanup function to prevent memory leaks if the user leaves the page
    return () => clearInterval(interval);
  }, [isWaiting, registeredUserId, navigate]);

  useEffect(() => {
    const authChannel = new BroadcastChannel('auth_channel');

    authChannel.onmessage = (event) => {
      console.log("📥 Broadcast received in Tab A:", event.data);
      if (event.data && event.data.type === 'verification_complete') {
        // Log the original tab in silently
        localStorage.setItem('token', event.data.token);
        localStorage.setItem('user', JSON.stringify(event.data.user));
        localStorage.setItem('an_active_session_user', JSON.stringify(event.data.user));
        window.dispatchEvent(new Event('authChange'));
        window.dispatchEvent(new Event('auth-change'));

        const isAdmin = event.data.user?.role === 'admin' || event.data.user?.email?.toLowerCase().includes('admin');
        setIsWaiting(false); 
        window.location.href = isAdmin ? '/admin' : '/'; 
      } else if (event.data === 'verified_failure') {
        setSuccessMessage("Your previous verification link expired or was invalid.");
        setError("Verification Failed. Please resend the email.");
      }
    };

    return () => authChannel.close(); 
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const endpoint = '/api/auth/register';

      // NEW: Diagnostic log
      console.log("=========================================");
      console.log("[NETWORK DIAGNOSTIC] Attempting to connect to:", endpoint);
      console.log("=========================================");
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });

      if (response.status === 404) {
        alert(`Backend route not found: ${endpoint}. Check authRoutes.js!`);
        return;
      }

      // NEW: Safe parsing to catch empty or HTML responses
      const rawText = await response.text();
      let data;
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch (parseError) {
        console.error("[FETCH PARSE ERROR] Server returned non-JSON response:", rawText);
        alert(`Server returned an invalid response. Check backend console! Raw output: ${rawText.substring(0, 50)}...`);
        setIsWaiting(false);
        return;
      }

      if (!response.ok) {
        // Extract the EXACT message sent by our updated backend
        throw new Error(data.message || "Failed to connect to server");
      }

      // Extract the receipt from the backend data
      const proofMessage = data.receiptId 
        ? `Email formally accepted by Google!\nReceipt ID: ${data.receiptId}\n\nIf it is not in your inbox, check your SPAM/JUNK folder immediately.`
        : `Account created successfully! Please check your email.`;

      alert(proofMessage);

      setSuccessMessage(proofMessage);
      setIsWaiting(true);
      setRegisteredUserId(data.userId);
      setResendTimer(60);
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Registration Failed!\nReason: ${error.message}\nCheck your backend terminal for details.`);
      setError(error.message);
      setIsWaiting(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true); // Triggers loading UI during resend
    try {
      console.log("Sending email payload:", customerData.email);
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: customerData.email }), 
      });

      const data = await response.json();

      if (response.ok) {
        setResendTimer(60);
        alert("A new verification email has been sent! Please check your inbox.");
      } else {
        alert(`Failed to resend: ${data.message || 'Unknown server error'}`);
      }
    } catch (error) {
      console.error("Error resending email:", error);
      alert(`Network error: ${error.message}`);
    } finally {
      // 🎯 GUARANTEED RESET: Removes the stuck loading UI no matter what happens
      setLoading(false);
    }
  };

  const handleDeleteUsers = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete registered users? This cannot be undone.");
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/auth/delete-all', {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Users deleted successfully!");
        
        // NEW: Unlock the card and clear all stuck details
        setCustomerData({ name: '', email: '', password: '' });
        setIsWaiting(false);
        setResendTimer(0);
      } else {
        alert("Failed to delete users.");
      }
    } catch (error) {
      console.error("Error deleting users:", error);
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="signup-page-layout" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px', padding: '40px' }}>
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/40">
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Register
        </h2>
        {error && <div className="mb-4 p-3 bg-red-100/80 border border-red-200 text-red-700 rounded-lg text-sm text-center shadow-sm">{error}</div>}
        {successMessage && !isWaiting && <div className="mb-4 p-3 bg-green-100/80 border border-green-200 text-green-700 rounded-lg text-sm text-center shadow-sm">{successMessage}</div>}
        
        {isWaiting && (
          <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center' }}>
            Account created successfully! Please check your email to verify. 
            <br/>
            <span style={{ fontSize: '14px' }}>
              Verified on another device? <a href="/" style={{ color: '#0056b3', textDecoration: 'underline' }}>Click here to go to the Homepage</a>
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="customer-section space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                name="name" 
                id="register-name"
                placeholder="Name" 
                value={customerData.name} 
                onChange={handleChange} 
                autoComplete="name"
                required
                disabled={isWaiting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                id="register-email"
                placeholder="Email" 
                value={customerData.email} 
                onChange={handleChange} 
                autoComplete="email"
                required
                disabled={isWaiting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                name="password" 
                id="register-password"
                placeholder="Password" 
                value={customerData.password} 
                onChange={handleChange} 
                autoComplete="new-password"
                required
                minLength="6"
                disabled={isWaiting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            <button type="submit" disabled={loading || isWaiting} className={`w-full py-3 px-4 rounded-xl font-bold shadow-md text-white transition-all ${(loading || isWaiting) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'}`}>
              {isWaiting ? 'Waiting for Verification...' : (loading ? 'Processing...' : 'Register')}
            </button>

            {/* NEW: Resend Button - Must remain directly below the Register button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <button 
                type="button" 
                onClick={handleResendEmail} 
                disabled={resendTimer > 0}
                style={{
                  backgroundColor: 'transparent',
                  color: resendTimer > 0 ? '#999' : '#007bff',
                  border: 'none',
                  textDecoration: resendTimer > 0 ? 'none' : 'underline',
                  cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  padding: '5px'
                }}
              >
                {resendTimer > 0 ? `Resend email in ${resendTimer}s` : 'Resend Verification Email'}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-bold hover:text-green-700 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
      
      <div className="utility-actions">
        <button 
          onClick={handleDeleteUsers} 
          style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Delete Registered Users
        </button>
      </div>
    </div>
  );
};

export default SignUp;
