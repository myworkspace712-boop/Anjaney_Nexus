import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthHistoryDropdown from '../components/AuthHistoryDropdown';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [savedEmails, setSavedEmails] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('nexus_login_emails') || '[]');
    setSavedEmails(history);
  }, []);

  useEffect(() => {
    const authChannel = new BroadcastChannel('nexus_auth_channel');

    authChannel.onmessage = (event) => {
      if (event.data === 'verified_success') {
        navigate('/'); 
      }
    };

    return () => authChannel.close(); 
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Save attempt to local storage
    try {
      const history = JSON.parse(localStorage.getItem('auth_attempts') || '[]');
      history.push({ name: 'N/A (Login)', email, type: 'login' });
      localStorage.setItem('auth_attempts', JSON.stringify(history));
      window.dispatchEvent(new Event('auth_history_updated'));
    } catch(err) { console.error('Failed to save auth history', err); }

    setError('');
    
    try {
      console.log('Sending login payload:', { email, password });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (data.success) {
        const currentHistory = JSON.parse(localStorage.getItem('nexus_login_emails') || '[]');
        if (email && !currentHistory.includes(email)) {
          const newHistory = [email, ...currentHistory].slice(0, 5); // Keep the last 5 emails
          localStorage.setItem('nexus_login_emails', JSON.stringify(newHistory));
          setSavedEmails(newHistory);
        }

        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Welcome Back</h2>
        
        <AuthHistoryDropdown />
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          <div className="relative w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              placeholder="e.g. you@example.com"
            />
            {showDropdown && savedEmails.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1917] border border-stone-700 rounded-md shadow-xl z-50 overflow-hidden text-sm">
                {savedEmails.map((savedEmail, i) => (
                  <div 
                    key={i} 
                    onMouseDown={(e) => { 
                      e.preventDefault(); 
                      setEmail(savedEmail); // Update to match your email state setter
                      setShowDropdown(false); 
                    }}
                    className="px-4 py-2 text-stone-200 hover:bg-stone-800 cursor-pointer flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    {savedEmail}
                  </div>
                ))}
                <div 
                  onMouseDown={(e) => { 
                    e.preventDefault(); 
                    localStorage.removeItem('nexus_login_emails'); 
                    setSavedEmails([]); 
                    setShowDropdown(false); 
                  }}
                  className="px-4 py-2 text-red-400 hover:bg-stone-800 cursor-pointer border-t border-stone-700 font-medium text-xs text-center transition-colors"
                >
                  Clear history
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g. ••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 bg-transparent border-none cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/forgot-password" className="text-green-600 font-semibold hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-green-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
