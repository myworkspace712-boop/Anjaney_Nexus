import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If a user just verified on another tab, catch it and redirect
    const authChannel = new BroadcastChannel('nexus_auth_channel');
    authChannel.onmessage = (event) => {
      if (event.data === 'verified_success') {
        navigate('/dashboard'); 
      }
    };
    return () => authChannel.close(); 
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (response.ok && data.success !== false) {
        // Save auth data
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        
        // Notify other components if needed
        window.dispatchEvent(new Event('auth_history_updated'));

        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Unable to reach the server.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #d4d4d8', fontSize: '16px', marginBottom: '20px', outline: 'none' };

  return (
    <div style={{ minHeight: 'calc(100vh - 85px)', backgroundColor: '#fafaf9', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '50px 40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px', borderTop: '4px solid #1e3a8a' }}>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0' }}>Welcome Back</h2>
          <p style={{ color: '#666', margin: 0, fontSize: '15px' }}>Sign in to access your export dashboard.</p>
        </div>

        {error && (
          <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label style={{ display: 'block', color: '#1c1917', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Email Address</label>
          <input 
            type="email" 
            style={inputStyle} 
            placeholder="admin@anjaneynexus.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            disabled={loading}
          />

          <label style={{ display: 'block', color: '#1c1917', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Password</label>
          <input 
            type="password" 
            style={inputStyle} 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            disabled={loading}
          />

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              backgroundColor: loading ? '#9ca3af' : '#ea580c', 
              color: '#fff', 
              border: 'none', 
              padding: '14px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              fontSize: '16px', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              transition: 'opacity 0.2s', 
              marginTop: '10px' 
            }}
            onMouseOver={(e) => { if(!loading) e.target.style.opacity = '0.9'; }}
            onMouseOut={(e) => { if(!loading) e.target.style.opacity = '1'; }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#666', fontSize: '14px' }}>
          Don't have an account? <Link to="/register" style={{ color: '#ea580c', fontWeight: 'bold', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
