import { useState } from 'react';


const SellerDashboard = () => {
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
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)',
    border: '1px solid #f1f5f9'
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '32px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a' }}>

      {/* --- TOP ACTION BAR --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '600' }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Look for or enter a command" 
              style={{ padding: '10px 16px 10px 36px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '300px', outline: 'none' }}
            />
            <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }}>🔍</span>
          </div>
          <button style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>+</span> Add product
          </button>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>

        {/* TOP LEFT: Map / Analytics (Spans 2 columns) */}
        <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Top countries</h3>
            <select style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fff', outline: 'none' }}>
              <option>Latest 7 days</option>
            </select>
          </div>
          {/* Map Placeholder */}
          <div style={{ width: '100%', height: '280px', backgroundColor: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', color: '#64748b' }}>
              <span style={{ fontSize: '48px' }}>🗺️</span>
              <p style={{ marginTop: '8px' }}>Global Analytics Map</p>
            </div>
            {/* Mock Tooltip to match design */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', backgroundColor: '#fff', padding: '12px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Sudan</span>
              <strong style={{ color: '#3b82f6', fontSize: '14px' }}>$1,688,908.13</strong>
            </div>
          </div>
        </div>

        {/* TOP RIGHT: Product Highlight (Spans 1 column) */}
        <div style={{ ...cardStyle, gridColumn: 'span 1', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: '#f1f5f9', height: '180px', borderRadius: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
            🧘‍♀️
          </div>
          <span style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>New publish</span>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>Strike a yogi pose</h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px 0', flexGrow: 1 }}>Get fit with Pocket Yoga's custom routines.</p>
          <button style={{ padding: '10px', width: '100%', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
            View product
          </button>
        </div>

        {/* BOTTOM: Orders Table (Spans all 3 columns because Gender Chart is removed) */}
        <div style={{ ...cardStyle, gridColumn: 'span 3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>New orders</h3>
            <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>View all</a>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ paddingBottom: '16px', color: '#64748b', fontWeight: '500', fontSize: '14px', borderBottom: '1px solid #e2e8f0' }}>Customers</th>
                <th style={{ paddingBottom: '16px', color: '#64748b', fontWeight: '500', fontSize: '14px', borderBottom: '1px solid #e2e8f0' }}>Order</th>
                <th style={{ paddingBottom: '16px', color: '#64748b', fontWeight: '500', fontSize: '14px', borderBottom: '1px solid #e2e8f0' }}>State</th>
                <th style={{ paddingBottom: '16px', color: '#64748b', fontWeight: '500', fontSize: '14px', borderBottom: '1px solid #e2e8f0' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: index !== orders.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                      {order.avatar}
                    </div>
                    <span style={{ fontWeight: '500' }}>{order.customer}</span>
                  </td>
                  <td style={{ padding: '16px 0', borderBottom: index !== orders.length - 1 ? '1px solid #f1f5f9' : 'none', fontWeight: '500' }}>
                    {order.total}
                  </td>
                  <td style={{ padding: '16px 0', borderBottom: index !== orders.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: order.color }}></span>
                      <span style={{ fontSize: '14px', color: '#475569' }}>{order.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 0', borderBottom: index !== orders.length - 1 ? '1px solid #f1f5f9' : 'none', color: '#64748b', fontSize: '14px' }}>
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

export default SellerDashboard;
