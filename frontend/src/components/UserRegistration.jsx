import { useState } from 'react';
import './UserRegistration.css';


const UserRegistration = () => {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Customer');
  const [adminSecret, setAdminSecret] = useState('');

  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Message Display State (Catches saved data)
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Determine target endpoint and payload dynamically based on account type
    const endpoint = accountType === 'Admin' ? '/api/admin_auth/register' : '/api/auth/register';
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    const payload = {
      name,
      email,
      password,
      role: accountType.toLowerCase()
    };

    if (accountType === 'Admin') {
      payload.adminSecret = adminSecret;
    }

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message || 'Registration successful!');
        
        // Ensure we catch the user data, whether it's directly on the data object or nested
        // The backend controllers were updated to return: user: { name: ..., email: ... } or admin: { ... }
        const savedUser = data.user || data.admin || { name: name, email: email };

        // Add to Message Display State
        setRegisteredUsers(prev => [
          {
            id: Date.now() + Math.random(), // Unique ID for React keys
            name: savedUser.name,
            email: savedUser.email,
            type: accountType
          },
          ...prev
        ]);

        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setAdminSecret('');
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

  const handleClearUser = (idToRemove) => {
    setRegisteredUsers(prev => prev.filter(user => user.id !== idToRemove));
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2 className="registration-title">Join Nexus</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Account Type</label>
            <select 
              className="registration-select"
              value={accountType} 
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              className="registration-input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className="registration-input"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="registration-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {accountType === 'Admin' && (
            <div className="input-group admin-secret-group">
              <label className="input-label">Admin Secret Key</label>
              <input
                type="password"
                className="registration-input"
                placeholder="Enter authorized secret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : `Register as ${accountType}`}
          </button>

          {error && <div className="message-status error">{error}</div>}
          {success && <div className="message-status success">{success}</div>}
        </form>

        {registeredUsers.length > 0 && (
          <div className="registered-users-section">
            <h3 className="users-title">Recently Registered</h3>
            <div className="users-list">
              {registeredUsers.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h4 className="user-name">{user.name} <span style={{fontSize: '0.8rem', opacity: 0.7}}>({user.type})</span></h4>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <button 
                    className="clear-btn"
                    onClick={() => handleClearUser(user.id)}
                  >
                    Clear
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRegistration;
