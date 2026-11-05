import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
  // Merged state: Added companyName to match the new UI, but keeping the old logic
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
      navigate('/');
    }
  }, [navigate]);

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
              navigate(isAdmin ? '/admin' : '/'); 
            } else {
              console.error("Backend confirmed verification but failed to send the auth token!");
              navigate('/login'); 
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
        navigate(isAdmin ? '/admin' : '/'); 
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

      console.log("=========================================");
      console.log("[NETWORK DIAGNOSTIC] Attempting to connect to:", endpoint);
      console.log("=========================================");
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Passing all customer data including company name
        body: JSON.stringify(customerData),
      });

      if (response.status === 404) {
        alert(`Backend route not found: ${endpoint}. Check authRoutes.js!`);
        return;
      }

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
        throw new Error(data.message || "Failed to connect to server");
      }

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
    setLoading(true); 
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

  // --- STYLES ---
  const inputStyle = { width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #d4d4d8', fontSize: '16px', marginBottom: '20px', outline: 'none' };

  return (
    <div style={{ minHeight: 'calc(100vh - 85px)', backgroundColor: '#fafaf9', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '50px 40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px', borderTop: '4px solid #ea580c' }}>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0' }}>Create an Account</h2>
          <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>Partner with Anjaney Nexus India LLP today.</p>
        </div>

        {error && <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
        {successMessage && !isWaiting && <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#dcfce7', border: '1px solid #86efac', color: '#15803d', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>{successMessage}</div>}
        
        {isWaiting && (
          <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', border: '1px solid #86efac' }}>
            Account created successfully! Please check your email to verify. 
            <br/><br/>
            <span style={{ fontSize: '14px' }}>
              Verified on another device? <a href="/" style={{ color: '#1e3a8a', textDecoration: 'underline', fontWeight: 'bold' }}>Click here to go to the Homepage</a>
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#1c1917', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Full Name</label>
              <input 
                type="text" 
                name="name"
                style={{...inputStyle, backgroundColor: isWaiting ? '#f3f4f6' : '#fff', color: isWaiting ? '#9ca3af' : '#000'}} 
                placeholder="John Doe" 
                value={customerData.name}
                onChange={handleChange}
                disabled={isWaiting}
                required 
              />
            </div>
          </div>

          <label style={{ display: 'block', color: '#1c1917', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Email Address</label>
          <input 
            type="email" 
            name="email"
            style={{...inputStyle, backgroundColor: isWaiting ? '#f3f4f6' : '#fff', color: isWaiting ? '#9ca3af' : '#000'}} 
            placeholder="name@company.com" 
            value={customerData.email}
            onChange={handleChange}
            disabled={isWaiting}
            required 
          />

          <label style={{ display: 'block', color: '#1c1917', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Password</label>
          <input 
            type="password" 
            name="password"
            style={{...inputStyle, backgroundColor: isWaiting ? '#f3f4f6' : '#fff', color: isWaiting ? '#9ca3af' : '#000'}} 
            placeholder="Create a secure password" 
            value={customerData.password}
            onChange={handleChange}
            disabled={isWaiting}
            required 
            minLength="6"
          />

          <button 
            type="submit" 
            disabled={loading || isWaiting}
            style={{ 
              width: '100%', 
              backgroundColor: (loading || isWaiting) ? '#9ca3af' : '#1e3a8a', 
              color: '#fff', 
              border: 'none', 
              padding: '14px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              fontSize: '16px', 
              cursor: (loading || isWaiting) ? 'not-allowed' : 'pointer', 
              transition: 'opacity 0.2s', 
              marginTop: '10px' 
            }}
            onMouseOver={(e) => { if(!loading && !isWaiting) e.target.style.opacity = '0.9'; }}
            onMouseOut={(e) => { if(!loading && !isWaiting) e.target.style.opacity = '1'; }}
          >
            {isWaiting ? 'Waiting for Verification...' : (loading ? 'Processing...' : 'Register Account')}
          </button>

          {/* Resend Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <button 
              type="button" 
              onClick={handleResendEmail} 
              disabled={resendTimer > 0}
              style={{
                backgroundColor: 'transparent',
                color: resendTimer > 0 ? '#9ca3af' : '#ea580c',
                border: 'none',
                textDecoration: resendTimer > 0 ? 'none' : 'underline',
                cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                padding: '5px',
                fontWeight: '600'
              }}
            >
              {resendTimer > 0 ? `Resend email in ${resendTimer}s` : 'Resend Verification Email'}
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#666', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: '#1e3a8a', fontWeight: 'bold', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>

      {/* Utility Action */}
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={handleDeleteUsers} 
          style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(220, 38, 38, 0.2)' }}
        >
          Delete Registered Users (Debug)
        </button>
      </div>
    </div>
  );
};

export default Register;
