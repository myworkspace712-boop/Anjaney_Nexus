import React, { useState, useEffect, useRef } from 'react';
import MessageSender from '../components/MessageSender';

const STORAGE_KEY = 'an_secure_corporate_database';
const RFQ_STORAGE_KEY = 'an_bulk_rfq_database';
const ACTIVE_USER_KEY = 'an_active_session_user';
const MAX_ATTEMPTS = 3;

const MASTER_ADMIN_EMAILS = ['yatharthjoshi127@gmail.com', 'yj7gov@gmail.com'];

// Optional: Paste your EmailJS keys here if you want 1-click background email delivery
const EMAILJS_SERVICE_ID = '';
const EMAILJS_TEMPLATE_ID = '';
const EMAILJS_PUBLIC_KEY = '';

const AdminDashboard = ({ setActivePage, currentUser: propCurrentUser }) => {
  // --- USER & PROFILE MENU STATES ---
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const data = localStorage.getItem('ACTIVE_USER_KEY') || localStorage.getItem(ACTIVE_USER_KEY);
      if (data && data !== 'undefined') {
        return JSON.parse(data);
      }
    } catch {
      // fallback
    }
    return propCurrentUser || null;
  });
  const [activeTab, setActiveTab] = useState('rfqs');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // --- EFFECTS FOR SESSION & OUTSIDE CLICK ---
  useEffect(() => {
    // Load the admin user session
    const loadUser = () => {
      try {
        const data = localStorage.getItem('ACTIVE_USER_KEY') || localStorage.getItem(ACTIVE_USER_KEY);
        if (data && data !== 'undefined' && data !== 'null') {
          setCurrentUser(JSON.parse(data));
        } else if (propCurrentUser) {
          setCurrentUser(propCurrentUser);
        }
      } catch (e) {
        console.error("Session parse error in AdminDashboard", e);
      }
    };

    loadUser();
    window.addEventListener('auth-change', loadUser);
    window.addEventListener('storage', loadUser);
    return () => {
      window.removeEventListener('auth-change', loadUser);
      window.removeEventListener('storage', loadUser);
    };
  }, [propCurrentUser]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ACTIVE_USER_KEY');
    localStorage.removeItem(ACTIVE_USER_KEY);
    setCurrentUser(null);
    setShowProfileMenu(false);
    window.dispatchEvent(new Event('auth-change'));
    if (typeof setActivePage === 'function') setActivePage('auth');
  };

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [rfqs, setRfqs] = useState(() => {
    const savedRfqs = localStorage.getItem(RFQ_STORAGE_KEY);
    return savedRfqs ? JSON.parse(savedRfqs) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  // Sync users with cross-tab / auth-change events
  useEffect(() => {
    const syncUsers = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUsers(JSON.parse(saved));
    };
    window.addEventListener('storage', syncUsers);
    window.addEventListener('auth-change', syncUsers);
    return () => {
      window.removeEventListener('storage', syncUsers);
      window.removeEventListener('auth-change', syncUsers);
    };
  }, []);

  // Proforma Invoice Modal States
  const [activeRfqForPi, setActiveRfqForPi] = useState(null);
  const [unitPrices, setUnitPrices] = useState({});
  const [piDetails, setPiDetails] = useState({
    piNumber: '',
    validityDays: '7',
    portOfLoading: 'Mundra Port / Nhava Sheva, India',
    freightCost: '0',
    currency: 'USD',
    bankName: 'HDFC Bank Ltd. — International Trade Branch',
    accountName: 'Anjaney Nexus India LLP',
    accountNumber: '502000XXXXXXXX',
    swiftCode: 'HDFCINBBXXX',
    remarks: 'Subject to final phytosanitary inspection and container availability.',
  });
  const [isSendingPi, setIsSendingPi] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: '', text: '' }), 4500);
  };

  // Account Management Actions
  const handleUnlock = (targetEmail) => {
    const updated = users.map((u) =>
      u.email === targetEmail ? { ...u, attempts: 0, isLocked: false } : u
    );
    setUsers(updated);
    showFeedback('success', `Account ${targetEmail} unlocked and attempts reset to 0/${MAX_ATTEMPTS}.`);
  };

  const handleManualVerify = (targetEmail) => {
    const updated = users.map((u) =>
      u.email === targetEmail ? { ...u, isVerified: true, verificationToken: null } : u
    );
    setUsers(updated);
    showFeedback('success', `Manually marked ${targetEmail} as Verified.`);
  };

  const handleDelete = (targetEmail, role) => {
    if (MASTER_ADMIN_EMAILS.includes(targetEmail.toLowerCase())) {
      showFeedback('error', 'Security Restriction: Master Admin accounts cannot be deleted.');
      return;
    }
    if (role === 'admin' && users.filter((u) => u.role === 'admin').length <= 1) {
      showFeedback('error', 'Critical: Cannot delete the last remaining Administrator.');
      return;
    }
    if (window.confirm(`Remove ${targetEmail} from the Corporate Directory?`)) {
      const updated = users.filter((u) => u.email !== targetEmail);
      setUsers(updated);
      showFeedback('success', `Account ${targetEmail} permanently removed.`);
    }
  };

  const handleClearNonAdminUsers = () => {
    if (
      window.confirm(
        'Are you sure you want to delete all non-admin Seller and User accounts? Master Admins and Administrators will be preserved.'
      )
    ) {
      const preservedAdmins = users.filter(
        (u) => u.role === 'admin' || MASTER_ADMIN_EMAILS.includes(u.email?.toLowerCase())
      );
      setUsers(preservedAdmins);
      showFeedback('success', 'Cleared all non-admin registered accounts.');
    }
  };

  // Open Proforma Invoice Generator Modal for a specific RFQ
  const handleOpenPiModal = (rfq) => {
    const initialPrices = {};
    (rfq.commodities || []).forEach((item, index) => {
      const key = item.id || index;
      initialPrices[key] = item.quotedUnitPrice || '1250';
    });

    setUnitPrices(initialPrices);
    setPiDetails((prev) => ({
      ...prev,
      piNumber: rfq.piNumber || `PI-AN-${Math.floor(100000 + Math.random() * 900000)}`,
    }));
    setActiveRfqForPi(rfq);
  };

  // Calculate Subtotal & Grand Total for the Proforma Invoice
  const calculateTotals = () => {
    if (!activeRfqForPi) return { itemsTotal: 0, grandTotal: 0 };
    const itemsTotal = (activeRfqForPi.commodities || []).reduce((sum, item, idx) => {
      const key = item.id || idx;
      const qty = parseFloat(item.volume) || 1;
      const price = parseFloat(unitPrices[key]) || 0;
      return sum + qty * price;
    }, 0);
    const freight = parseFloat(piDetails.freightCost) || 0;
    return {
      itemsTotal,
      freight,
      grandTotal: itemsTotal + freight,
    };
  };

  // Build Formatted Plain-Text Proforma Invoice for Email & WhatsApp
  const buildProformaTextBody = () => {
    if (!activeRfqForPi) return '';
    const { itemsTotal, freight, grandTotal } = calculateTotals();

    const commodityLines = (activeRfqForPi.commodities || [])
      .map((item, idx) => {
        const key = item.id || idx;
        const qty = parseFloat(item.volume) || 1;
        const unitPrice = parseFloat(unitPrices[key]) || 0;
        const lineTotal = (qty * unitPrice).toLocaleString();
        return `• ${item.name} (${item.packaging})\n  Qty: ${qty} ${item.unit} × ${piDetails.currency} ${unitPrice.toLocaleString()} = ${piDetails.currency} ${lineTotal}`;
      })
      .join('\n\n');

    return `PROFORMA INVOICE: ${piDetails.piNumber}
Date: ${new Date().toLocaleDateString()}
Quote Validity: ${piDetails.validityDays} Days
Reference RFQ: ${activeRfqForPi.rfqId}

EXPORTER:
Anjaney Nexus India LLP
Turning Boundaries Into Opportunities

CONSIGNEE / BUYER:
Company: ${activeRfqForPi.buyer?.companyName}
Email: ${activeRfqForPi.buyer?.email}
Phone: ${activeRfqForPi.buyer?.phone}

SHIPPING & TRADE TERMS:
Port of Loading: ${piDetails.portOfLoading}
Port of Discharge: ${activeRfqForPi.shipping?.port}, ${activeRfqForPi.shipping?.country}
Incoterms (2020): ${activeRfqForPi.shipping?.incoterm}
Payment Terms: ${activeRfqForPi.shipping?.paymentTerm}

COMMODITY & PRICING SCHEDULE:
${commodityLines}

-----------------------------------------
Commodities Subtotal: ${piDetails.currency} ${itemsTotal.toLocaleString()}
Freight / Insurance Charges: ${piDetails.currency} ${freight.toLocaleString()}
TOTAL PROFORMA VALUE: ${piDetails.currency} ${grandTotal.toLocaleString()}
-----------------------------------------

EXPORTER BANKING DETAILS:
Beneficiary: ${piDetails.accountName}
Bank: ${piDetails.bankName}
A/C No: ${piDetails.accountNumber}
SWIFT Code: ${piDetails.swiftCode}

Remarks: ${piDetails.remarks}`;
  };

  // Save Proforma Invoice Status to LocalStorage
  const markRfqAsSent = () => {
    if (!activeRfqForPi) return;
    const { grandTotal } = calculateTotals();

    const updatedRfqs = rfqs.map((r) => {
      if (r.rfqId === activeRfqForPi.rfqId) {
        return {
          ...r,
          status: 'PI Sent',
          piNumber: piDetails.piNumber,
          piTotal: `${piDetails.currency} ${grandTotal.toLocaleString()}`,
          piSentAt: new Date().toLocaleString(),
        };
      }
      return r;
    });

    setRfqs(updatedRfqs);
    localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify(updatedRfqs));
  };

  // ACTION 1: Send Proforma Invoice via Email (EmailJS + Mailto Client Fallback)
  const handleSendPiByEmail = async () => {
    if (!activeRfqForPi) return;
    setIsSendingPi(true);

    const buyerEmail = activeRfqForPi.buyer?.email || '';
    const subject = `Official Proforma Invoice ${piDetails.piNumber} (${activeRfqForPi.rfqId}) - Anjaney Nexus India LLP`;
    const bodyText = buildProformaTextBody();

    let sentViaApi = false;

    // Try EmailJS if credentials are configured
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              to_email: buyerEmail,
              pi_number: piDetails.piNumber,
              rfq_id: activeRfqForPi.rfqId,
              buyer_company: activeRfqForPi.buyer?.companyName,
              message: bodyText,
            },
          }),
        });
        sentViaApi = res.ok;
      } catch (err) {
        console.error('EmailJS error:', err);
      }
    }

    // Always open the system/web mail client with the full Proforma Invoice pre-populated if EmailJS isn't set
    if (!sentViaApi) {
      const mailtoUrl = `mailto:${encodeURIComponent(
        buyerEmail
      )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
      window.location.href = mailtoUrl;
    }

    markRfqAsSent();
    setIsSendingPi(false);
    setActiveRfqForPi(null);
    showFeedback(
      'success',
      `Proforma Invoice ${piDetails.piNumber} dispatched to ${buyerEmail}!`
    );
  };

  // ACTION 2: Send Proforma Invoice via WhatsApp
  const handleSendPiByWhatsApp = () => {
    if (!activeRfqForPi) return;
    const rawPhone = (activeRfqForPi.buyer?.phone || '').replace(/[^0-9]/g, '');
    const bodyText = buildProformaTextBody();
    const waUrl = rawPhone
      ? `https://wa.me/${rawPhone}?text=${encodeURIComponent(bodyText)}`
      : `https://wa.me/?text=${encodeURIComponent(bodyText)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    markRfqAsSent();
    setActiveRfqForPi(null);
    showFeedback(
      'success',
      `Proforma Invoice ${piDetails.piNumber} opened in WhatsApp for ${activeRfqForPi.buyer?.companyName}!`
    );
  };

  // ACTION 3: Generate Printable / Downloadable Official PDF Proforma Invoice
  const handleDownloadPrintablePI = () => {
    if (!activeRfqForPi) return;
    const { itemsTotal, freight, grandTotal } = calculateTotals();

    const rowsHtml = (activeRfqForPi.commodities || [])
      .map((item, idx) => {
        const key = item.id || idx;
        const qty = parseFloat(item.volume) || 1;
        const price = parseFloat(unitPrices[key]) || 0;
        const lineTotal = qty * price;
        return `
          <tr>
            <td style="padding:10px;border:1px solid #cbd5e1;">${idx + 1}</td>
            <td style="padding:10px;border:1px solid #cbd5e1;">
              <strong>${item.name}</strong><br/>
              <span style="font-size:11px;color:#475569;">${item.gradeSpec || ''} | Packaging: ${item.packaging}</span>
            </td>
            <td style="padding:10px;border:1px solid #cbd5e1;text-align:center;">${qty} ${item.unit}</td>
            <td style="padding:10px;border:1px solid #cbd5e1;text-align:right;">${piDetails.currency} ${price.toLocaleString()}</td>
            <td style="padding:10px;border:1px solid #cbd5e1;text-align:right;font-weight:bold;">${piDetails.currency} ${lineTotal.toLocaleString()}</td>
          </tr>
        `;
      })
      .join('');

    const printWindow = window.open('', '_blank', 'width=900,height=750');
    if (!printWindow) {
      alert('Please allow pop-ups in your browser to download/print the Proforma Invoice PDF.');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Proforma Invoice - ${piDetails.piNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; color: #0f172a; padding: 32px; }
            .header { display: flex; justify-content: space-between; border-bottom: 3px solid #f97316; padding-bottom: 16px; }
            .badge { background: #fff7ed; color: #ea580c; padding: 4px 10px; border: 1px solid #fdba74; font-size: 11px; font-weight: bold; }
            .grid { display: flex; justify-content: space-between; gap: 20px; margin-top: 20px; }
            .box { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 8px; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 13px; }
            th { background: #172554; color: white; padding: 10px; text-align: left; text-transform: uppercase; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 style="margin:0;color:#172554;font-size:24px;">ANJANEY NEXUS INDIA LLP</h1>
              <p style="margin:4px 0 0;font-size:11px;color:#ea580c;letter-spacing:1px;text-transform:uppercase;">Turning Boundaries Into Opportunities</p>
            </div>
            <div style="text-align:right;">
              <span class="badge">OFFICIAL PROFORMA INVOICE</span>
              <p style="margin:8px 0 2px;font-size:14px;"><strong>PI No:</strong> ${piDetails.piNumber}</p>
              <p style="margin:0;font-size:12px;color:#475569;"><strong>Date:</strong> ${new Date().toLocaleDateString()} | <strong>Validity:</strong> ${piDetails.validityDays} Days</p>
            </div>
          </div>

          <div class="grid">
            <div class="box">
              <strong style="color:#172554;text-transform:uppercase;">Consignee / Buyer Details</strong><br/><br/>
              <strong>Company:</strong> ${activeRfqForPi.buyer?.companyName}<br/>
              <strong>Email:</strong> ${activeRfqForPi.buyer?.email}<br/>
              <strong>Phone:</strong> ${activeRfqForPi.buyer?.phone}<br/>
              <strong>RFQ Reference:</strong> ${activeRfqForPi.rfqId}
            </div>
            <div class="box">
              <strong style="color:#172554;text-transform:uppercase;">Export & Logistics Terms</strong><br/><br/>
              <strong>Port of Loading:</strong> ${piDetails.portOfLoading}<br/>
              <strong>Port of Discharge:</strong> ${activeRfqForPi.shipping?.port}, ${activeRfqForPi.shipping?.country}<br/>
              <strong>Incoterms (2020):</strong> ${activeRfqForPi.shipping?.incoterm}<br/>
              <strong>Payment Terms:</strong> ${activeRfqForPi.shipping?.paymentTerm}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Commodity & Packaging Description</th>
                <th style="text-align:center;">Order Volume</th>
                <th style="text-align:right;">Unit Price</th>
                <th style="text-align:right;">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
              <tr>
                <td colspan="4" style="padding:10px;border:1px solid #cbd5e1;text-align:right;font-weight:bold;">Freight & Insurance Charges</td>
                <td style="padding:10px;border:1px solid #cbd5e1;text-align:right;">${piDetails.currency} ${freight.toLocaleString()}</td>
              </tr>
              <tr style="background:#fff7ed;">
                <td colspan="4" style="padding:12px;border:1px solid #cbd5e1;text-align:right;font-weight:900;color:#172554;">GRAND TOTAL (${activeRfqForPi.shipping?.incoterm})</td>
                <td style="padding:12px;border:1px solid #cbd5e1;text-align:right;font-weight:900;color:#ea580c;font-size:16px;">${piDetails.currency} ${grandTotal.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div class="grid" style="margin-top:24px;">
            <div class="box">
              <strong style="color:#172554;text-transform:uppercase;">Exporter Bank Coordinates</strong><br/><br/>
              <strong>Beneficiary Name:</strong> ${piDetails.accountName}<br/>
              <strong>Bank Name:</strong> ${piDetails.bankName}<br/>
              <strong>Account Number:</strong> ${piDetails.accountNumber}<br/>
              <strong>SWIFT / BIC Code:</strong> ${piDetails.swiftCode}
            </div>
            <div class="box">
              <strong style="color:#172554;text-transform:uppercase;">Required Certifications & Remarks</strong><br/><br/>
              <strong>Certificates:</strong> ${activeRfqForPi.shipping?.certifications || 'Standard Export Docs'}<br/>
              <strong>Remarks:</strong> ${piDetails.remarks}<br/><br/>
              <div style="text-align:right;margin-top:16px;">
                <strong>Authorized Signatory</strong><br/>
                <span style="font-size:11px;color:#64748b;">Anjaney Nexus India LLP</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);

    markRfqAsSent();
    showFeedback('success', `Generated printable Proforma Invoice ${piDetails.piNumber}!`);
  };

  // Analytics Calculations
  const totalAccounts = users.length;
  const lockedAccounts = users.filter((u) => u.isLocked).length;
  const sellerCount = users.filter((u) => u.role === 'seller').length;
  const adminCount = users.filter((u) => u.role === 'admin').length;

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.companyName && u.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const { itemsTotal, freight, grandTotal } = calculateTotals();

  return (
    // 1. LIGHT MODE MAIN WRAPPER
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 2. LIGHT MODE HEADER */}
      <header className="w-full bg-white border-b border-slate-200 shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        {/* ADMIN HEADER BRANDING */}
        <div>
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100 mb-1 inline-block">
            Secure Portal
          </span>
          <h1 className="text-2xl font-black tracking-tighter leading-none">
            <span className="text-orange-500">Anjaney</span> <span className="text-blue-800">Nexus India</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setActivePage('register')}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            + Provision Account
          </button>
          <button
            onClick={() => setActivePage('home')}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            View Frontdesk
          </button>

          {/* Profile Button */}
          <div className="relative" ref={profileMenuRef}>
            {currentUser && (
              <div 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 cursor-pointer bg-white hover:bg-slate-50 p-2 pr-4 rounded-xl transition-all border border-slate-200 shadow-sm select-none"
              >
                <div className="w-9 h-9 rounded-full bg-blue-950 text-white flex items-center justify-center font-black text-sm uppercase">
                  {currentUser.email ? currentUser.email.charAt(0) : 'A'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-blue-950 text-sm leading-none">Admin</span>
                  <span className="text-[10px] font-medium text-slate-500 mt-1 truncate max-w-[120px]">{currentUser.email}</span>
                </div>
                <div className="ml-1 text-slate-400 text-xs">▼</div>
              </div>
            )}

            {showProfileMenu && currentUser && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">System Administrator</p>
                  <p className="text-xs font-bold text-blue-950 truncate mt-1">{currentUser.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Secure Sign Out →
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 3. LIGHT MODE CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* FEEDBACK BANNER */}
        {feedback.text && (
          <div
            className={`p-4 rounded-xl text-sm font-bold shadow-sm border ${
              feedback.type === 'success'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {feedback.type === 'success' ? '✓ ' : '⚠ '} {feedback.text}
          </div>
        )}

        {/* ANALYTICS CARDS (LIGHT MODE) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Accounts', value: totalAccounts, color: 'text-blue-950' },
            { label: 'Corporate Sellers', value: sellerCount, color: 'text-orange-500' },
            { label: 'Bulk RFQs Received', value: rfqs.length, color: 'text-amber-500' },
            {
              label: 'Locked Accounts',
              value: lockedAccounts,
              color: lockedAccounts > 0 ? 'text-red-600' : 'text-green-600',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
            >
              <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                {stat.label}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap gap-8 border-b border-slate-200 px-2">
          <button 
            type="button"
            onClick={() => setActiveTab('rfqs')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'rfqs' 
                ? 'border-orange-500 text-orange-500' 
                : 'border-transparent text-slate-500 hover:text-blue-950'
            }`}
          >
            📋 Bulk RFQs ({rfqs.length})
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('users')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'users' 
                ? 'border-orange-500 text-orange-500' 
                : 'border-transparent text-slate-500 hover:text-blue-950'
            }`}
          >
            🏢 Corporate Users & Email Directory ({users.length})
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'catalog' 
                ? 'border-orange-500 text-orange-500' 
                : 'border-transparent text-slate-500 hover:text-blue-950'
            }`}
          >
            📦 Product Catalog & Allocation (26)
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('logistics')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'logistics' 
                ? 'border-orange-500 text-orange-500' 
                : 'border-transparent text-slate-500 hover:text-blue-950'
            }`}
          >
            🚢 Logistics & Shipments (1)
          </button>
        </div>

        {/* INCOMING BULK RFQs & PROFORMA INVOICE DISPATCH TABLE */}
        {activeTab === 'rfqs' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-blue-950">
                Incoming Bulk RFQs ({rfqs.length})
              </h2>
              <p className="text-xs text-blue-600 font-semibold">
                Click &ldquo;Send Proforma Invoice&rdquo; to price commodities and dispatch an official PI via Email, WhatsApp, or PDF.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-950 text-white text-[10px] uppercase tracking-widest font-bold">
                  <th className="p-4 pl-6">RFQ ID & Date</th>
                  <th className="p-4">Buyer Company</th>
                  <th className="p-4">Commodities & Volume</th>
                  <th className="p-4">Port & Incoterms</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 pr-6 text-right">Proforma Invoice Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {rfqs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-8 text-center text-blue-400 text-sm font-semibold bg-white"
                    >
                      No Bulk RFQs submitted yet. Add items to the Trolley to test.
                    </td>
                  </tr>
                ) : (
                  rfqs.map((rfq) => (
                    <tr
                      key={rfq.rfqId}
                      className="hover:bg-blue-50/50 transition-colors bg-white text-blue-950"
                    >
                      <td className="p-4 pl-6">
                        <span className="text-xs font-mono font-black text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-200">
                          {rfq.rfqId}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">{rfq.submittedAt}</p>
                        {rfq.piNumber && (
                          <p className="text-[10px] font-mono font-bold text-green-700 mt-0.5">
                            {rfq.piNumber} ({rfq.piTotal})
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-black">{rfq.buyer?.companyName}</p>
                        <p className="text-xs font-mono text-blue-600">{rfq.buyer?.email}</p>
                        <p className="text-[10px] text-slate-500">{rfq.buyer?.phone}</p>
                      </td>
                      <td className="p-4">
                        <ul className="space-y-1">
                          {rfq.commodities?.map((c, i) => (
                            <li key={i} className="text-xs font-semibold">
                              • <strong>{c.name}</strong> — {c.volume} {c.unit} ({c.packaging})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-4">
                        <p className="text-xs font-bold text-blue-950">
                          {rfq.shipping?.port}, {rfq.shipping?.country}
                        </p>
                        <p className="text-[11px] text-orange-600 font-bold">
                          {rfq.shipping?.incoterm}
                        </p>
                        <p className="text-[10px] text-slate-500">{rfq.shipping?.paymentTerm}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                            rfq.status === 'PI Sent'
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : 'bg-orange-100 text-orange-700 border-orange-200'
                          }`}
                        >
                          {rfq.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenPiModal(rfq)}
                          className="px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors shadow-md cursor-pointer"
                        >
                          📄 {rfq.status === 'PI Sent' ? 'Resend Proforma Invoice' : 'Send Proforma Invoice'}
                        </button>
                      </td>
                    </tr>
                  ))
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* USER DIRECTORY TABLE */}
        {activeTab === 'users' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-blue-100 bg-blue-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                Live Account Database ({users.length})
              </span>
              <h2 className="text-xl font-black text-blue-950 mt-1">
                Registered Corporate Entities & Verified Emails
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Search company or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-white border border-blue-200 text-blue-950 text-xs font-semibold outline-none focus:border-orange-500"
              />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-white border border-blue-200 text-blue-950 text-xs font-bold outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="all">All Roles ({users.length})</option>
                <option value="admin">Admins</option>
                <option value="seller">Corporate Sellers</option>
                <option value="user">Users</option>
              </select>
              <button
                type="button"
                onClick={handleClearNonAdminUsers}
                className="px-4 py-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🗑️</span>
                <span>Clear Non-Admin Users</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-950 text-white text-[11px] uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6">Entity & Registration</th>
                  <th className="p-4">Account Role</th>
                  <th className="p-4">Primary Corporate Email</th>
                  <th className="p-4 text-center">Email Verification</th>
                  <th className="p-4 text-center">Security / Lock Status</th>
                  <th className="p-4 pr-6 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100 text-blue-950">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400 text-xs font-bold">
                      No matching corporate or user accounts found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u, idx) => {
                    const isMaster = MASTER_ADMIN_EMAILS.includes(u.email?.toLowerCase());
                    const isVerified = u.isVerified !== false || isMaster;

                    return (
                      <tr key={u.email || idx} className="hover:bg-blue-50/40 transition-colors bg-white">
                        <td className="p-4 pl-6">
                          <p className="text-sm font-black text-blue-950">
                            {u.companyName ||
                              (u.role === 'admin'
                                ? 'Anjaney Nexus Admin'
                                : u.role === 'seller'
                                ? 'Corporate Seller'
                                : 'Registered Client')}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            Registered • {u.createdAt || 'Active'}
                          </p>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block whitespace-nowrap text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                              u.role === 'admin' || isMaster
                                ? 'bg-orange-500 text-white border-orange-500'
                                : u.role === 'seller'
                                ? 'bg-blue-950 text-white border-blue-950'
                                : 'bg-blue-50 text-blue-800 border-blue-200'
                            }`}
                          >
                            {isMaster ? 'Master Admin' : u.role || 'user'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                            {u.email}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`inline-block whitespace-nowrap text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                              isVerified
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {isVerified ? '✓ Verified Email' : '⏳ Pending Inbox'}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className={`inline-block whitespace-nowrap text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                                u.isLocked
                                  ? 'bg-red-50 text-red-600 border-red-200'
                                  : 'bg-blue-50 text-blue-900 border-blue-200'
                              }`}
                            >
                              {u.isLocked ? '🔒 Locked' : 'Active'}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              Attempts: {u.attempts || 0}/{MAX_ATTEMPTS}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {!isVerified && (
                              <button
                                type="button"
                                onClick={() => handleManualVerify(u.email)}
                                className="px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Verify Now
                              </button>
                            )}
                            {(u.isLocked || u.attempts > 0) && (
                              <button
                                type="button"
                                onClick={() => handleUnlock(u.email)}
                                className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Unlock
                              </button>
                            )}
                            {!isMaster && (
                              <button
                                type="button"
                                onClick={() => handleDelete(u.email, u.role)}
                                className="px-2.5 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* TAB 3: PRODUCT CATALOG */}
        {activeTab === 'catalog' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
            <h3 className="text-lg font-black text-blue-950">📦 Export Catalog Inventory (26 Active Commodities)</h3>
            <p className="text-sm text-slate-500">
              Spices, Grains, and Agro Commodities available for international export dispatch.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {['Cumin Seeds (Jeera)', 'Turmeric Fingers (Haldi)', 'Coriander Seeds (Dhania)', 'Fennel Seeds (Saunf)', 'Fenugreek (Methi)', 'Granular Urea 46%', 'Basmati Rice', 'Non-Basmati Rice', 'Red Chilli (Dry Whole)'].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm text-blue-950">{item}</h4>
                    <p className="text-xs text-slate-500">Allocation: Ready For Dispatch</p>
                  </div>
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded-full border border-green-200">Available</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LOGISTICS */}
        {activeTab === 'logistics' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
            <h3 className="text-lg font-black text-blue-950">🚢 Active Logistics & Container Shipments (1)</h3>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">BOOKING-MUNDRA-2026</span>
                <h4 className="font-bold text-base text-blue-950 mt-1">20ft Container (Spices Assortment) → Mundra Port</h4>
                <p className="text-xs text-slate-500">Carrier: Maersk Line • ETD: Next Week • Status: Customs Clearance In Progress</p>
              </div>
              <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-black uppercase rounded-full border border-yellow-200 w-max">Transit Prep</span>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* COMMUNICATION HUB (MessageSender)                                     */}
        {/* ===================================================================== */}
        <div className="flex justify-center pt-4">
          <MessageSender />
        </div>

      </main>

      {/* ===================================================================== */}
      {/* INTERACTIVE PROFORMA INVOICE GENERATOR & DISPATCH MODAL               */}
      {/* ===================================================================== */}
      {activeRfqForPi && (
        <div className="fixed inset-0 z-50 bg-blue-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-blue-950 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-blue-200 space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-blue-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  Export Proforma Invoice Builder
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-blue-950 mt-2">
                  Issue Proforma Invoice — {activeRfqForPi.buyer?.companyName}
                </h3>
                <p className="text-xs text-slate-500">
                  RFQ Ref: <strong className="font-mono">{activeRfqForPi.rfqId}</strong> • Buyer Email:{' '}
                  <strong className="font-mono text-orange-600">{activeRfqForPi.buyer?.email}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRfqForPi(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-500 hover:text-white text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 1. Set Unit Price per Commodity */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-blue-900">
                1. Enter Unit Price ({piDetails.currency}) per Requested Commodity
              </h4>
              <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                {(activeRfqForPi.commodities || []).map((item, idx) => {
                  const key = item.id || idx;
                  const qty = parseFloat(item.volume) || 1;
                  const uPrice = parseFloat(unitPrices[key]) || 0;
                  return (
                    <div
                      key={key}
                      className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-sm font-black text-blue-950">{item.name}</p>
                        <p className="text-xs text-slate-500">
                          Volume: <strong>{qty} {item.unit}</strong> • Packaging: {item.packaging}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-blue-800">
                            Unit Price ({piDetails.currency})
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={unitPrices[key] || ''}
                            onChange={(e) =>
                              setUnitPrices({ ...unitPrices, [key]: e.target.value })
                            }
                            className="w-28 p-2 rounded-lg bg-white border border-blue-200 text-blue-950 font-mono text-xs font-bold outline-none focus:border-orange-500"
                          />
                        </div>
                        <div className="text-right min-w-[95px]">
                          <span className="block text-[10px] font-bold uppercase text-slate-400">
                            Line Total
                          </span>
                          <span className="text-sm font-mono font-black text-orange-600">
                            {piDetails.currency} {(qty * uPrice).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Logistics, Freight & Banking Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-blue-100">
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-900 mb-1">
                  PI Reference No.
                </label>
                <input
                  type="text"
                  value={piDetails.piNumber}
                  onChange={(e) => setPiDetails({ ...piDetails, piNumber: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-blue-50/50 border border-blue-200 text-xs font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-900 mb-1">
                  Port of Loading (India)
                </label>
                <input
                  type="text"
                  value={piDetails.portOfLoading}
                  onChange={(e) => setPiDetails({ ...piDetails, portOfLoading: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-blue-50/50 border border-blue-200 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-blue-900 mb-1">
                  Freight / CIF Add-on ({piDetails.currency})
                </label>
                <input
                  type="number"
                  min="0"
                  value={piDetails.freightCost}
                  onChange={(e) => setPiDetails({ ...piDetails, freightCost: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-blue-50/50 border border-blue-200 text-xs font-mono font-bold"
                />
              </div>
            </div>

            {/* Total Summary Bar */}
            <div className="p-4 rounded-xl bg-blue-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs space-x-4">
                <span>
                  Subtotal: <strong>{piDetails.currency} {itemsTotal.toLocaleString()}</strong>
                </span>
                <span>
                  Freight: <strong>{piDetails.currency} {freight.toLocaleString()}</strong>
                </span>
                <span>
                  Incoterm: <strong className="text-orange-400">{activeRfqForPi.shipping?.incoterm}</strong>
                </span>
              </div>
              <div className="text-base font-black text-orange-400 font-mono">
                Grand Total: {piDetails.currency} {grandTotal.toLocaleString()}
              </div>
            </div>

            {/* 3. Dispatch Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                type="button"
                disabled={isSendingPi}
                onClick={handleSendPiByEmail}
                className="py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>✉️</span>
                <span>Send via Email</span>
              </button>

              <button
                type="button"
                onClick={handleSendPiByWhatsApp}
                className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>Send on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPrintablePI}
                className="py-3 px-4 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🖨️</span>
                <span>Download / Print PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;