import { useState } from 'react';
import './CustomerRegistration.css';


const CustomerRegistration = () => {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Tag Display State
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'customer'
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Registration successful!');
        
        // Extract the user data
        const savedUser = data.user || { name, email };

        // Add to Message Display State
        setRegisteredUsers(prev => [
          {
            id: Date.now() + Math.random(),
            name: savedUser.name,
            email: savedUser.email
          },
          ...prev
        ]);

        // Reset form
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(data.message || 'Failed to register. Please try again.');
      }
    } catch (err) {
      setError('Network error. Could not connect to the server.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearUsers = () => {
    setRegisteredUsers([]);
  };

  return (
    <div className="cr-container">
      <div className="cr-card">
        <h2 className="cr-title">Customer Registration</h2>
        <p className="cr-subtitle">Join the premium plant-based marketplace today.</p>

        <form onSubmit={handleSubmit} className="cr-form">
          <div className="cr-input-group">
            <label className="cr-label">Full Name</label>
            <input
              type="text"
              className="cr-input"
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="cr-input-group">
            <label className="cr-label">Email Address</label>
            <input
              type="email"
              className="cr-input"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="cr-input-group">
            <label className="cr-label">Password</label>
            <input
              type="password"
              className="cr-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="cr-submit-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Register Account'}
          </button>

          {error && <div className="cr-message error">{error}</div>}
          {success && <div className="cr-message success">{success}</div>}
        </form>

        {registeredUsers.length > 0 && (
          <div className="cr-tags-section">
            <div className="cr-tags-header">
              <h3>Recently Registered</h3>
              <button className="cr-clear-btn" onClick={handleClearUsers}>
                Clear All
              </button>
            </div>
            
            <div className="cr-tags-container">
              {registeredUsers.map((user) => (
                <div key={user.id} className="cr-tag">
                  <div className="cr-tag-avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <div className="cr-tag-info">
                    <span className="cr-tag-name">{user.name}</span>
                    <span className="cr-tag-email">{user.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRegistration;
