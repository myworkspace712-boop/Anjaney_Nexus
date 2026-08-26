import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MessageTab from '../components/MessageTab';


const SignUp = () => {
  const [accountType, setAccountType] = useState('Customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  
  const [registeredUser, setRegisteredUser] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    
    let endpoint = '/auth/register';
    let bodyData = { name, email, password };
    
    if (accountType === 'Seller') {
      endpoint = '/seller_auth/apply';
    } else if (accountType === 'Admin') {
      endpoint = '/admin_auth/register';
      bodyData.adminSecret = adminSecret;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      
      const data = await response.json();
      if (data.success || response.ok) {
        setRegisteredUser({ name, email });
        if (accountType === 'Seller') {
          setSuccessMessage('Your seller application has been submitted and is pending admin approval.');
        } else {
          setSuccessMessage('Registration successful!');
        }
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/40">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 tracking-tight">Create an Account</h2>
        
        {/* Render MessageTab if user is registered */}
        {registeredUser && (
          <MessageTab 
            name={registeredUser.name} 
            email={registeredUser.email} 
            onClear={() => setRegisteredUser(null)} 
          />
        )}

        {/* Tabs */}
        <div className="flex justify-center space-x-1 mb-8 bg-gray-100/50 p-1 rounded-xl">
          {['Customer', 'Seller', 'Admin'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => { setAccountType(type); setError(''); setSuccessMessage(''); }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
                accountType === type
                  ? 'bg-white text-green-600 shadow-sm scale-100'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 scale-95 hover:scale-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100/80 border border-red-200 text-red-700 rounded-lg text-sm text-center shadow-sm">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100/80 border border-green-200 text-green-800 rounded-lg text-sm text-center shadow-sm animate-pulse">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="space-y-4 transition-all duration-300">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2.5 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-2.5 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required
                minLength="6"
                className="w-full px-4 py-2.5 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            
            {/* Admin Secret Field */}
            {accountType === 'Admin' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Admin Secret</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-4 py-2.5 bg-white/50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none"
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  placeholder="Enter admin secret key"
                />
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={loading || (accountType === 'Seller' && successMessage !== '')}
            className={`w-full text-white py-3 px-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
              loading || (accountType === 'Seller' && successMessage !== '')
                ? 'bg-green-400 cursor-not-allowed translate-y-0 shadow-none'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }`}
          >
            {loading ? 'Processing...' : (accountType === 'Seller' ? 'Submit Application' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-bold hover:text-green-700 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
