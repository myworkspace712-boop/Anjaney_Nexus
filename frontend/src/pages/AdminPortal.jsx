import React, { useState } from 'react';
import { CATALOG_PRODUCTS } from './Products';

const AdminPortal = ({ currentUser, onExit }) => {
  const [activeTab, setActiveTab] = useState('rfqs');
  const [filterStatus, setFilterStatus] = useState('All');

  // ----------------------------------------------------
  // DATA STATE: RFQs
  // ----------------------------------------------------
  const [rfqs, setRfqs] = useState([
    {
      id: 'RFQ-2026-001',
      company: 'Apex Global Logistics Corp.',
      contactPerson: 'Rahul Sharma',
      primaryEmail: 'r.sharma@apexglobal.com',
      billingEmail: 'accounts@apexglobal.com',
      phone: '+91 98765 43210',
      country: 'India',
      product: 'Basmati Rice',
      quantity: '500 Metric Tons',
      destinationPort: 'Jebel Ali, UAE',
      shippingTerm: 'CIF',
      status: 'Pending Review',
      date: '2026-10-14',
    },
    {
      id: 'RFQ-2026-002',
      company: 'Middle East Agro Trade FZCO',
      contactPerson: 'Tariq Al-Mansoor',
      primaryEmail: 'tariq@meagro.ae',
      billingEmail: 'finance@meagro.ae',
      phone: '+971 50 123 4567',
      country: 'UAE',
      product: 'Turmeric',
      quantity: '1,200 Metric Tons',
      destinationPort: 'Mundra Port, India',
      shippingTerm: 'FOB',
      status: 'Quote Issued',
      date: '2026-10-12',
    },
  ]);

  // ----------------------------------------------------
  // DATA STATE: Corporate Users & Email Entities
  // ----------------------------------------------------
  const [corporateEntities, setCorporateEntities] = useState([
    {
      id: 'ENT-101',
      companyName: 'Apex Global Logistics Corp.',
      businessType: 'Importer / Wholesaler',
      country: 'India',
      primaryEmail: 'r.sharma@apexglobal.com',
      billingEmail: 'accounts@apexglobal.com',
      verifiedStatus: true,
      joinedDate: '2026-09-15',
    },
    {
      id: 'ENT-102',
      companyName: 'Middle East Agro Trade FZCO',
      businessType: 'Distributor',
      country: 'UAE',
      primaryEmail: 'tariq@meagro.ae',
      billingEmail: 'finance@meagro.ae',
      verifiedStatus: true,
      joinedDate: '2026-10-01',
    },
  ]);

  // ----------------------------------------------------
  // DATA STATE: Export Product Catalog (Directly from Official Catalog)
  // ----------------------------------------------------
  const [catalog, setCatalog] = useState(() =>
    CATALOG_PRODUCTS.map((prod) => ({
      id: prod.id,
      name: prod.name,
      category: prod.category,
      spec: prod.spec,
      image: prod.image,
      fallbackImage: prod.fallbackImage,
      allocationQuota: '5,000 MT/month',
      status: 'Available in Bulk',
    }))
  );

  // ----------------------------------------------------
  // DATA STATE: Trade Logistics & Document Tracking
  // ----------------------------------------------------
  const [shipments, setShipments] = useState([
    {
      id: 'SHP-2026-88',
      rfqRef: 'RFQ-2026-001',
      buyerCompany: 'Apex Global Logistics Corp.',
      incoterm: 'CIF',
      originPort: 'Mundra Port, India',
      destinationPort: 'Jebel Ali, UAE',
      vesselName: 'MV OCEAN FREIGHT II',
      containerCount: '20 x 20ft Containers',
      sgsCertificate: 'SGS-IN-99201.pdf',
      paymentStatus: 'LC Irrevocable Verified',
      etd: '2026-10-20',
      eta: '2026-10-28',
    }
  ]);

  // ----------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------
  const handleUpdateRfqStatus = (id, newStatus) => {
    setRfqs(rfqs.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const filteredRfqs = filterStatus === 'All' 
    ? rfqs 
    : rfqs.filter(r => r.status === filterStatus);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Executive Portal
              </span>
              <span className="text-xs text-slate-400 font-mono">
                System Time: Oct 2026
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight mt-2">
              Anjaney Nexus Trade Control Panel
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Active Admin: <span className="text-orange-400 font-semibold">{currentUser?.email || 'admin@anjaneynexus.com'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Exit to Main Storefront
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-8">
          <button
            onClick={() => setActiveTab('rfqs')}
            className={`pb-4 text-sm font-bold tracking-wide transition-colors border-b-2 cursor-pointer ${
              activeTab === 'rfqs'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📋 Bulk RFQs ({rfqs.length})
          </button>
          <button
            onClick={() => setActiveTab('entities')}
            className={`pb-4 text-sm font-bold tracking-wide transition-colors border-b-2 cursor-pointer ${
              activeTab === 'entities'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🏢 Corporate Users & Email Directory ({corporateEntities.length})
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-4 text-sm font-bold tracking-wide transition-colors border-b-2 cursor-pointer ${
              activeTab === 'catalog'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📦 Product Catalog & Allocation ({catalog.length})
          </button>
          <button
            onClick={() => setActiveTab('shipments')}
            className={`pb-4 text-sm font-bold tracking-wide transition-colors border-b-2 cursor-pointer ${
              activeTab === 'shipments'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🚢 Logistics & Shipments ({shipments.length})
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: RFQ MANAGEMENT                                */}
        {/* ==================================================== */}
        {activeTab === 'rfqs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-white">Incoming Quotation Inquiries</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Filter Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg outline-none focus:border-orange-500"
                >
                  <option value="All">All Inquiries</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Quote Issued">Quote Issued</option>
                  <option value="Contract Finalized">Contract Finalized</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredRfqs.map((rfq) => (
                <div
                  key={rfq.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded">
                        {rfq.id}
                      </span>
                      <span className="text-xs text-slate-400">Received: {rfq.date}</span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${
                        rfq.status === 'Pending Review' 
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' 
                          : 'bg-green-500/10 text-green-400 border-green-500/20'
                      }`}>
                        {rfq.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-white">{rfq.company}</h3>
                      <p className="text-xs text-slate-400">Contact: {rfq.contactPerson} ({rfq.country})</p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs space-y-1">
                      <p><span className="text-slate-400">Commodity:</span> <strong className="text-orange-400">{rfq.product}</strong></p>
                      <p><span className="text-slate-400">Quantity & Terms:</span> {rfq.quantity} | Term: {rfq.shippingTerm} | Port: {rfq.destinationPort}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-mono">
                      <span className="text-slate-300">
                        Primary Email: <a href={`mailto:${rfq.primaryEmail}`} className="text-orange-400 underline">{rfq.primaryEmail}</a>
                      </span>
                      <span className="text-slate-300">
                        Billing Email: <a href={`mailto:${rfq.billingEmail}`} className="text-slate-400 underline">{rfq.billingEmail}</a>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-48">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Update Status</label>
                    <select
                      value={rfq.status}
                      onChange={(e) => handleUpdateRfqStatus(rfq.id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-white text-xs p-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Quote Issued">Quote Issued</option>
                      <option value="Contract Finalized">Contract Finalized</option>
                    </select>

                    <a
                      href={`mailto:${rfq.primaryEmail}?subject=Official CIF/FOB Quote for ${rfq.id} - Anjaney Nexus India`}
                      className="w-full text-center py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition-colors shadow-md"
                    >
                      Send Proforma Invoice
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: CORPORATE ENTITY & EMAIL DIRECTORY            */}
        {/* ==================================================== */}
        {activeTab === 'entities' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-white">Registered Corporate Entities & Verified Emails</h2>
              <button
                type="button"
                onClick={async () => {
                  const confirmDelete = window.confirm(
                    'Are you sure you want to actively delete all registered users? This will wipe accounts from both the database and local storage.'
                  );
                  if (!confirmDelete) return;

                  try {
                    localStorage.removeItem('an_secure_corporate_database');
                    localStorage.removeItem('an_active_session_user');
                    localStorage.removeItem('user');
                    localStorage.removeItem('an_user');
                    localStorage.removeItem('userInfo');
                    localStorage.removeItem('token');

                    window.dispatchEvent(new Event('auth-change'));
                    window.dispatchEvent(new Event('authChange'));
                    window.dispatchEvent(new Event('storage'));

                    const res = await fetch('/api/auth/delete-all', { method: 'DELETE' });
                    const data = await res.json().catch(() => ({}));

                    alert(data.message || 'All registered users actively deleted.');
                    setCorporateEntities([]);
                  } catch (err) {
                    console.error('Delete error:', err);
                    alert('Local registered users cleared.');
                    setCorporateEntities([]);
                  }
                }}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <span>🗑️</span>
                <span>Delete Registered Users</span>
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                      <th className="p-4">Entity & Country</th>
                      <th className="p-4">Business Type</th>
                      <th className="p-4">Primary Corporate Email</th>
                      <th className="p-4">Billing / Finance Email</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {corporateEntities.map((ent) => (
                      <tr key={ent.id} className="hover:bg-slate-950/50 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-white">{ent.companyName}</p>
                          <p className="text-xs text-slate-400">{ent.country} • Registered {ent.joinedDate}</p>
                        </td>
                        <td className="p-4 text-xs font-semibold">{ent.businessType}</td>
                        <td className="p-4 font-mono text-xs text-orange-400">{ent.primaryEmail}</td>
                        <td className="p-4 font-mono text-xs text-slate-400">{ent.billingEmail}</td>
                        <td className="p-4">
                          <span className="bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-xs px-2.5 py-1 rounded">
                            Verified B2B
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: PRODUCT CATALOG CONTROL                       */}
        {/* ==================================================== */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Export Inventory & Allocations</h2>
              <button
                onClick={() => alert('Add product dialog placeholder')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                + Add Export Commodity
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {catalog.map((prod) => (
                <div key={prod.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                  {prod.image && (
                    <div className="h-44 w-full bg-slate-950 overflow-hidden relative">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = prod.fallbackImage || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-black uppercase px-2.5 py-1 rounded bg-slate-950/80 text-orange-400 border border-orange-500/30 backdrop-blur-sm">
                        {prod.category}
                      </span>
                    </div>
                  )}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {!prod.image && (
                        <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 uppercase">
                          {prod.category}
                        </span>
                      )}
                      <h3 className="text-base font-black text-white mt-1">{prod.name}</h3>
                      <p className="text-xs font-mono text-slate-400 mt-1 line-clamp-2">{prod.spec}</p>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Monthly Quota: <strong className="text-white font-mono">{prod.allocationQuota || '5,000 MT'}</strong>
                      </span>
                      <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                        {prod.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: TRADE LOGISTICS & DOCUMENT TRACKING           */}
        {/* ==================================================== */}
        {activeTab === 'shipments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Active Cargo & Shipment Operations</h2>
                <p className="text-xs text-slate-400 mt-1">Live Incoterm tracking, vessel manifests, SGS inspection docs, and container allocations.</p>
              </div>
              <button
                onClick={() => alert('New Shipment creation dialog')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                + Book Vessel Cargo
              </button>
            </div>

            <div className="space-y-4">
              {shipments.map((shp) => (
                <div
                  key={shp.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded">
                        {shp.id}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Ref: {shp.rfqRef}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Incoterm: {shp.incoterm}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                        {shp.paymentStatus}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-white">{shp.buyerCompany}</h3>
                      <p className="text-xs text-slate-400">Vessel: <span className="text-slate-200 font-semibold">{shp.vesselName}</span> | Containers: <span className="text-orange-400 font-mono">{shp.containerCount}</span></p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs flex flex-wrap gap-6">
                      <div>
                        <span className="text-slate-400 block">Origin Port</span>
                        <strong className="text-white">{shp.originPort}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Destination Port</span>
                        <strong className="text-white">{shp.destinationPort}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ETD (Estimated Departure)</span>
                        <span className="text-orange-300 font-mono">{shp.etd}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ETA (Estimated Arrival)</span>
                        <span className="text-green-300 font-mono">{shp.eta}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs pt-1">
                      <span className="text-slate-400">📄 SGS Inspection Certificate:</span>
                      <span className="font-mono text-orange-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {shp.sgsCertificate}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full lg:w-44">
                    <button
                      onClick={() => alert(`Tracking vessel coordinates for ${shp.vesselName}`)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg transition-colors border border-slate-700 cursor-pointer text-center"
                    >
                      Track Vessel AIS
                    </button>
                    <button
                      onClick={() => alert(`Downloading inspection dossier: ${shp.sgsCertificate}`)}
                      className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Download SGS Dossier
                    </button>
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

export default AdminPortal;
