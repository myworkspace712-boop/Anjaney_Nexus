import { useState, useEffect } from 'react';


const CustomerDashboard = () => {
  // Mock data for the layout
  const [orders] = useState([
    { id: 1, customer: "Dianne Russell", avatar: "👩🏽", total: "$14.88", status: "Chargeback", date: "16 Sep 2026", color: "#3b82f6" },
    { id: 2, customer: "Bessie Cooper", avatar: "👩🏻", total: "$14.88", status: "Completed", date: "16 Sep 2026", color: "#10b981" },
    { id: 3, customer: "Darlene Robertson", avatar: "👱🏼♀️", total: "$14.88", status: "Completed", date: "16 Sep 2026", color: "#10b981" },
    { id: 4, customer: "Kathryn Murphy", avatar: "👩🏻🦱", total: "$14.88", status: "Chargeback", date: "16 Sep 2026", color: "#3b82f6" }
  ]);

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    border: '1px solid #eaeaea'
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '32px', fontFamily: 'inherit', color: '#111827' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '24px', margin: 0, fontWeight: 'bold' }}>Dashboard</h1>
          {user && (
            <p style={{ margin: '8px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
              Welcome back, <strong>{user.name}</strong> 
              {user.companyName ? ` from ${user.companyName}` : ''}!
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Look for or enter a command" 
              style={{ padding: '10px 16px 10px 36px', borderRadius: '8px', border: '1px solid #e5e7eb', width: '280px', outline: 'none' }}
            />
            <span style={{ position: 'absolute', left: '12px', top: '10px' }}>🔍</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition font-medium cursor-pointer border-none">
            <span role="img" aria-label="cart" className="text-xl">🛒</span>
            <span>My Cart</span>
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>

        {/* MAP CARD (Spans 2 columns) */}
        <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Top countries</h3>
            <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              <option>Latest 7 days</option>
            </select>
          </div>
          <div style={{ width: '100%', height: '260px', backgroundColor: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: '#6b7280' }}>
              <span style={{ fontSize: '40px' }}>🗺️</span>
              <p style={{ marginTop: '8px' }}>Global Analytics Map Placeholder</p>
            </div>
          </div>
        </div>

        {/* PRODUCT CARD (Spans 1 column) */}
        <div style={{ ...cardStyle, gridColumn: 'span 1', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: '#f3f4f6', height: '160px', borderRadius: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
            🧘♀️
          </div>
          <span style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>New publish</span>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>Strike a yogi pose</h3>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 20px 0', flexGrow: 1 }}>Get fit with Pocket Yoga's custom routines.</p>
          <button style={{ padding: '10px', width: '100%', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
            View product
          </button>
        </div>

        {/* ORDERS TABLE (Spans all 3 columns) */}
        <div style={{ ...cardStyle, gridColumn: 'span 3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>New orders</h3>
            <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>View all</a>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ paddingBottom: '16px', color: '#6b7280', fontWeight: '500', fontSize: '14px', borderBottom: '1px solid #e5e7eb' }}>Customers</th>
                <th style={{ paddingBottom: '16px', color: '#6b7280', fontWeight: '500', fontSize: '14px', borderBottom: '1px solid #e5e7eb' }}>Order</th>
                <th style={{ paddingBottom: '16px', color: '#6b7280', fontWeight: '500', fontSize: '14px', borderBottom: '1px solid #e5e7eb' }}>State</th>
                <th style={{ paddingBottom: '16px', color: '#6b7280', fontWeight: '500', fontSize: '14px', borderBottom: '1px solid #e5e7eb' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: index !== orders.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                      {order.avatar}
                    </div>
                    <span style={{ fontWeight: '500' }}>{order.customer}</span>
                  </td>
                  <td style={{ padding: '16px 0', borderBottom: index !== orders.length - 1 ? '1px solid #f3f4f6' : 'none', fontWeight: '500' }}>
                    {order.total}
                  </td>
                  <td style={{ padding: '16px 0', borderBottom: index !== orders.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: order.color }}></span>
                      <span style={{ fontSize: '14px', color: '#4b5563' }}>{order.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 0', borderBottom: index !== orders.length - 1 ? '1px solid #f3f4f6' : 'none', color: '#6b7280', fontSize: '14px' }}>
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
