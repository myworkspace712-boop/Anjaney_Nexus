import React, { useState } from 'react';

const RFQ_STORAGE_KEY = 'an_bulk_rfq_database';

const PACKAGING_OPTIONS = [
  '25 kg PP Woven Bags',
  '50 kg Jute / Gunny Bags',
  'Custom / Bulk OEM',
];

const UNIT_OPTIONS = [
  'Metric Tons (MT)',
  "20' FCL Container",
  "40' FCL Container",
];

const INCOTERMS = ['FOB (Free on Board)', 'CIF (Cost, Insurance, Freight)', 'CFR (Cost & Freight)', 'EXW (Ex Works)'];

const CartPage = ({ cartItems = [], setCartItems, setActivePage, currentUser }) => {
  const [itemSpecs, setItemSpecs] = useState({});
  const [logistics, setLogistics] = useState({
    companyName: currentUser?.companyName || '',
    email: currentUser?.email || '',
    destinationPort: '',
    incoterm: 'FOB (Free on Board)',
    notes: '',
  });

  const [submittedRfqId, setSubmittedRfqId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleItemSpecChange = (id, field, value) => {
    setItemSpecs((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleRemoveItem = (id) => {
    if (setCartItems) setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleSubmitRFQ = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (cartItems.length === 0) {
      setErrorMsg('Your trolley is empty.');
      return;
    }

    if (!logistics.companyName || !logistics.email || !logistics.destinationPort) {
      setErrorMsg('Please fill in your Company, Email, and Destination Port.');
      return;
    }

    const rfqId = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const formattedCommodities = cartItems.map((item) => {
      const custom = itemSpecs[item.id] || {};
      return {
        id: item.id,
        name: item.name,
        category: item.category,
        volume: custom.volume || '1',
        unit: custom.unit || 'Metric Tons (MT)',
        packaging: custom.packaging || '25 kg PP Woven Bags',
      };
    });

    const newRfq = {
      rfqId,
      submittedAt: new Date().toLocaleString(),
      status: 'Pending Quote',
      buyer: { companyName: logistics.companyName.trim(), email: logistics.email.trim() },
      shipping: { port: logistics.destinationPort.trim(), incoterm: logistics.incoterm, notes: logistics.notes },
      commodities: formattedCommodities,
    };

    const existingRfqs = JSON.parse(localStorage.getItem(RFQ_STORAGE_KEY)) || [];
    localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify([newRfq, ...existingRfqs]));

    setSubmittedRfqId(rfqId);
    if (setCartItems) setCartItems([]);
  };

  if (submittedRfqId) {
    return (
      <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl">✓</div>
          <h2 className="text-2xl font-black text-blue-950">RFQ Submitted</h2>
          <p className="text-sm text-slate-500">
            Your bulk inquiry <strong className="text-orange-600">{submittedRfqId}</strong> has been sent to our export desk. We will send a Proforma Invoice shortly.
          </p>
          <button
            onClick={() => setActivePage('products')}
            className="mt-4 w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-sm transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-blue-950">Bulk RFQ Trolley</h1>
            <p className="text-sm text-slate-500 mt-1">Review your commodities and request a custom export quote.</p>
          </div>
          <button
            onClick={() => setActivePage('products')}
            className="hidden sm:block px-4 py-2 text-sm font-bold text-blue-950 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50"
          >
            Add More Items
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-lg text-center">
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: CART ITEMS LIST */}
          <div className="flex-1 space-y-4">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
                <span className="text-4xl">🛒</span>
                <h3 className="text-lg font-bold text-blue-950 mt-4">Your trolley is empty</h3>
                <button
                  onClick={() => setActivePage('products')}
                  className="mt-4 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md"
                >
                  View Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const currentSpec = itemSpecs[item.id] || {};
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5">
                    {/* Item Details */}
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-black text-blue-950 mt-1">{item.name}</h3>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-xs font-bold text-red-500 hover:text-red-700 mt-2 flex items-center gap-1"
                      >
                        <span>×</span> Remove Item
                      </button>
                    </div>

                    {/* Spec Selectors */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                      <div className="w-24">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Volume</label>
                        <input
                          type="number"
                          min="1"
                          value={currentSpec.volume || '1'}
                          onChange={(e) => handleItemSpecChange(item.id, 'volume', e.target.value)}
                          className="w-full p-2 text-sm font-bold border border-slate-200 rounded-lg outline-none focus:border-orange-500 text-blue-950"
                        />
                      </div>
                      <div className="w-36">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Unit</label>
                        <select
                          value={currentSpec.unit || UNIT_OPTIONS[0]}
                          onChange={(e) => handleItemSpecChange(item.id, 'unit', e.target.value)}
                          className="w-full p-2 text-sm font-bold border border-slate-200 rounded-lg outline-none focus:border-orange-500 text-blue-950"
                        >
                          {UNIT_OPTIONS.map((u) => <option key={u} value={u}>{u}</option>)}
                        </select>
                      </div>
                      <div className="w-40">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Packaging</label>
                        <select
                          value={currentSpec.packaging || PACKAGING_OPTIONS[0]}
                          onChange={(e) => handleItemSpecChange(item.id, 'packaging', e.target.value)}
                          className="w-full p-2 text-sm font-bold border border-slate-200 rounded-lg outline-none focus:border-orange-500 text-blue-950"
                        >
                          {PACKAGING_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT: RFQ SUMMARY & LOGISTICS */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl sticky top-24">
              <h2 className="text-lg font-black text-blue-950 border-b border-slate-100 pb-3 mb-4">Export Logistics</h2>
              
              <form onSubmit={handleSubmitRFQ} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={logistics.companyName}
                    onChange={(e) => setLogistics({ ...logistics, companyName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-blue-950 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    value={logistics.email}
                    onChange={(e) => setLogistics({ ...logistics, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-blue-950 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Destination Port & Country *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jebel Ali, UAE"
                    value={logistics.destinationPort}
                    onChange={(e) => setLogistics({ ...logistics, destinationPort: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-blue-950 outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Incoterms *</label>
                  <select
                    value={logistics.incoterm}
                    onChange={(e) => setLogistics({ ...logistics, incoterm: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-blue-950 outline-none focus:border-orange-500"
                  >
                    {INCOTERMS.map(term => <option key={term} value={term}>{term}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Additional Notes</label>
                  <textarea
                    rows="2"
                    placeholder="Target price, specs..."
                    value={logistics.notes}
                    onChange={(e) => setLogistics({ ...logistics, notes: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-blue-950 outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Request Quotation</span>
                    <span>→</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-3 uppercase tracking-widest font-semibold">
                    No Payment Required
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
