import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [user, setUser] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock cart data
  const [cart] = useState([
    { id: 1, name: 'Premium Spice Blend', price: 50, quantity: 2 },
    { id: 2, name: 'Organic Turmeric', price: 30, quantity: 1 }
  ]);
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            streetAddress: data.shippingAddress?.streetAddress || '',
            city: data.shippingAddress?.city || '',
            state: data.shippingAddress?.state || '',
            zipCode: data.shippingAddress?.zipCode || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          streetAddress: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        }
      };

      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        
        // Update local storage user info partially
        const lsUserStr = localStorage.getItem('user');
        if (lsUserStr) {
          const lsUser = JSON.parse(lsUserStr);
          localStorage.setItem('user', JSON.stringify({ ...lsUser, name: updatedUser.name, email: updatedUser.email }));
        }

        setMessage('Profile updated successfully!');
      } else {
        const data = await response.json();
        setMessage(`Failed: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/sign-in'; 
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      // Create Order
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: total,
          orderId: `order_${Date.now()}`
        })
      });

      const data = await response.json();

      if (!data.success) {
        alert(`Payment failed: ${data.message}`);
        return;
      }

      // Initialize Razorpay
      const options = {
        key: data.key, 
        amount: data.data.amount,
        currency: data.data.currency,
        name: 'Anjaney Nexus',
        description: 'Test Transaction',
        order_id: data.testMode ? '' : data.data.id, // In test mode, fallback order is handled
        handler: async function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id || 'test_payment'}`);
          // Normally we'd call /api/payments/verify here
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#d97706'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert(response.error.description);
      });
      rzp.open();

    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout');
    }
  };

  return (
    <div className="profile-dashboard" style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* 1. My Account Card */}
      <div className="account-card" style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0 }}>My Account</h3>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <button style={{ backgroundColor: '#007bff', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', marginTop: '10px', cursor: 'pointer' }}>
          Edit Details
        </button>
      </div>

      {/* 2. Logout Button directly below the Account Card */}
      <button 
        onClick={handleLogout} 
        style={{ width: '100%', padding: '10px', backgroundColor: '#fff', color: '#dc3545', border: '1px solid #dc3545', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Log Out
      </button>

      {/* 3. My Cart Section */}
      <div className="cart-section" style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0 }}>My Cart</h3>
        <p style={{ color: '#666' }}>Your cart items will appear here.</p>

        <div className="cart-summary" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          <h4 style={{ margin: '0 0 15px 0' }}>Total: $0.00</h4>
          <button 
            onClick={handleCheckout}
            style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;
