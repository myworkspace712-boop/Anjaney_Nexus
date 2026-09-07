import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SellerApplication = () => {
  const [sellerData, setSellerData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    
    // Add API call logic here to register the seller
    console.log("Submitting seller application:", sellerData);
    
    try {
      let backendUrl = import.meta.env.VITE_API_URL || '';
      backendUrl = backendUrl.replace(/\/api\/?$/, '');
      const response = await fetch(`${backendUrl}/api/seller_auth/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sellerData)
      });
      
      const data = await response.json();
      if (response.ok || data.success) {
        setSuccessMessage("Your seller application has been submitted and is pending admin approval.");
        setSellerData({ name: '', email: '', password: '', businessName: '', phone: '' });
      } else {
        setError(data.message || 'Application failed to submit.');
      }
    } catch (err) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-6 gap-8">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/40">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 tracking-tight">Seller Application</h2>
        
        {error && <div className="mb-4 p-3 bg-red-100/80 border border-red-200 text-red-700 rounded-lg text-sm text-center shadow-sm">{error}</div>}
        {successMessage && <div className="mb-4 p-3 bg-green-100/80 border border-green-200 text-green-700 rounded-lg text-sm text-center shadow-sm">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="e.g. John Doe" 
                value={sellerData.name} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="e.g. you@example.com" 
                value={sellerData.email} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                value={sellerData.password} 
                onChange={handleChange} 
                required 
                minLength="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Business Name</label>
              <input 
                type="text" 
                name="businessName" 
                placeholder="e.g. Acme Corp" 
                value={sellerData.businessName} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="e.g. +1 234 567 8900" 
                value={sellerData.phone} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            
            <button type="submit" disabled={loading} className={`w-full py-3 px-4 rounded-xl font-bold shadow-md text-white transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'}`}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerApplication;
