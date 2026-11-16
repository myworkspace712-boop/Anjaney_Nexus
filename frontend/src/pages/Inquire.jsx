import React, { useState, useEffect } from 'react';
import { EXPORT_CATALOG } from './Products';
import { useTheme } from '../context/ThemeContext';

const Inquire = ({ setActivePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    product: 'Other / Multiple Products',
    quantity: '',
    destinationCountry: '',
    portOfDischarge: '',
    requiredPacking: '',
    incoterm: 'CIF',
    shipmentMonth: '',
    requirements: ''
  });

  // Pre-fill if navigated from a product card or localStorage
  useEffect(() => {
    try {
      const pendingQuote = localStorage.getItem('an_quote_product');
      if (pendingQuote) {
        const prod = JSON.parse(pendingQuote);
        if (prod && prod.name) {
          setFormData((prev) => ({
            ...prev,
            product: prod.name,
            requirements: prev.requirements || `Inquiring for: ${prod.name} (${prod.spec || ''}). MOQ: ${prod.moq || 'Standard export volume'}.`
          }));
        }
        localStorage.removeItem('an_quote_product');
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text, fieldName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const rfqId = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newQuoteRequirement = {
      rfqId,
      id: rfqId,
      submittedAt: new Date().toLocaleString(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
      type: 'Commercial Quote Requirement',
      buyer: {
        fullName: formData.fullName || 'Commercial Buyer',
        companyName: formData.companyName || formData.fullName || 'Private Commercial Entity',
        email: formData.email,
        phone: formData.phone || 'Not provided',
        country: formData.destinationCountry || 'Global'
      },
      commodities: [
        {
          id: 1,
          name: formData.product || 'Agro Commodity',
          volume: formData.quantity || '1',
          unit: 'MT',
          packaging: formData.requiredPacking || 'Standard Export Packing',
          requirements: formData.requirements || '',
          quotedUnitPrice: '1250'
        }
      ],
      shipping: {
        port: formData.portOfDischarge || 'To be nominated',
        country: formData.destinationCountry || 'International Destination',
        incoterm: formData.incoterm || 'CIF',
        paymentTerm: formData.shipmentMonth ? `Target Month: ${formData.shipmentMonth}` : 'Standard LC / TT',
      },
      requirements: formData.requirements || '',
      shipmentMonth: formData.shipmentMonth || '',
      product: formData.product,
      quantity: formData.quantity
    };

    // 1. Immediately store into local RFQ database for Admin Dashboard
    try {
      const RFQ_STORAGE_KEY = 'an_bulk_rfq_database';
      const existingRfqs = JSON.parse(localStorage.getItem(RFQ_STORAGE_KEY)) || [];
      const updatedRfqs = [newQuoteRequirement, ...existingRfqs];
      localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify(updatedRfqs));

      // 2. Dispatch cross-component and storage events for real-time dashboard update
      window.dispatchEvent(new Event('rfq-change'));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Failed to save RFQ to local database:', err);
    }

    // 3. Dispatch to backend API and verify real email delivery status
    let statusResult = { serverConnected: false, emailDispatched: false, message: '' };
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/rfqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuoteRequirement)
      });
      if (response.ok) {
        const result = await response.json();
        statusResult = {
          serverConnected: true,
          emailDispatched: !!result.emailDispatched,
          message: result.message || result.emailStatus || ''
        };
      } else {
        statusResult = {
          serverConnected: true,
          emailDispatched: false,
          message: `Server returned HTTP ${response.status}`
        };
      }
    } catch {
      statusResult = {
        serverConnected: false,
        emailDispatched: false,
        message: 'Could not connect to backend server on port 5000'
      };
    }

    setIsSubmitting(false);
    setDispatchStatus(statusResult);
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 relative overflow-hidden ${
      isDark ? 'bg-[#0c192c] text-slate-100' : 'bg-[#f8fafc] text-[#0b1d3a]'
    }`}>
      
      {/* AMBIENT DYNAMIC GLOWS (Strictly non-black in dark mode, branded in light mode) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 -z-0 transition-opacity duration-700 bg-orange-500/20"></div>
      <div className={`absolute top-[400px] right-10 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-[#1e3a8a]/25' : 'bg-blue-600/10'
      }`}></div>
      <div className={`absolute bottom-40 left-10 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-[#152e54]/30' : 'bg-orange-500/10'
      }`}></div>

      {/* =========================================================================
          1. HERO SECTION (Without tags; "during published business hours." removed)
         ========================================================================= */}
      <div className="relative w-full min-h-[500px] lg:min-h-[560px] flex items-center font-sans overflow-hidden">
        {/* Background Image: contact_us from public/images */}
        <div className="absolute inset-0">
          <img 
            src="/images/contact_us.jpg" 
            onError={(e) => {
              if (e.currentTarget.src.endsWith('.jpg')) {
                e.currentTarget.src = '/images/contact_us.png';
              }
            }}
            alt="Contact Us - Anjaney Nexus" 
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Dynamic Theme Gradient Overlays:
            - Light mode: Deep Anjaney Logo Navy (#0b1d3a) gradient for maximum contrast and prestige
            - Dark mode: Deep Maritime Ocean Blue (#0c192c to #122744), strictly non-black */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-r from-[#0c192c]/95 via-[#0c192c]/85 to-[#122744]/65'
            : 'bg-gradient-to-r from-[#0b1d3a]/95 via-[#0b1d3a]/80 to-[#0b1d3a]/45'
        }`}></div>
        
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-b from-[#0c192c]/75 via-transparent to-[#0c192c]'
            : 'bg-gradient-to-b from-[#0b1d3a]/75 via-transparent to-[#f8fafc]'
        }`}></div>

        {/* Hero Content (Clean, tags removed) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="max-w-3xl">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tight drop-shadow-md">
              Have a chat with us for your <span className="text-orange-500">Export Inquiry</span>
            </h1>

            {/* Description ("during published business hours." removed) */}
            <p className="text-slate-100 max-w-2xl text-sm sm:text-base leading-relaxed font-medium drop-shadow-sm">
              Submit your product, quantity, specification and destination inquiry, our export team will review your complete trade enquiry.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. QUICK DIRECT CONTACT CHANNELS HUB (Operating Hours: 24/7)
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Phone / Direct Desk */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${
            isDark 
              ? 'bg-[#12243d] border-[#1f3c64] hover:border-orange-500/50 shadow-[0_12px_30px_rgba(4,12,24,0.4)]' 
              : 'bg-white border-slate-200/90 hover:border-orange-500/40 shadow-[0_12px_30px_rgba(11,29,58,0.06)]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <button 
                onClick={() => copyToClipboard('+919824056061', 'phone')}
                title="Copy Phone Number"
                className={`p-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-[#1a355f] text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                }`}
              >
                {copiedField === 'phone' ? (
                  <span className="text-orange-500 text-[11px] font-bold">Copied!</span>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block mb-1">
              Direct Export Desk
            </span>
            <a 
              href="tel:+919824056061" 
              className={`text-base font-bold transition-colors block mb-2 ${
                isDark ? 'text-white hover:text-orange-400' : 'text-[#0b1d3a] hover:text-orange-600'
              }`}
            >
              +91 98240 56061
            </a>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Direct phone &amp; official WhatsApp trade desk assistance.
            </p>
          </div>

          {/* Card 2: Email / RFQ Desk */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${
            isDark 
              ? 'bg-[#12243d] border-[#1f3c64] hover:border-orange-500/50 shadow-[0_12px_30px_rgba(4,12,24,0.4)]' 
              : 'bg-white border-slate-200/90 hover:border-orange-500/40 shadow-[0_12px_30px_rgba(11,29,58,0.06)]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <button 
                onClick={() => copyToClipboard('admin@anjaneynexus.com', 'email')}
                title="Copy Email Address"
                className={`p-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-[#1a355f] text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                }`}
              >
                {copiedField === 'email' ? (
                  <span className="text-orange-500 text-[11px] font-bold">Copied!</span>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block mb-1">
              Commercial Procurement
            </span>
            <a 
              href="mailto:admin@anjaneynexus.com" 
              className={`text-base font-bold transition-colors block mb-2 truncate ${
                isDark ? 'text-white hover:text-orange-400' : 'text-[#0b1d3a] hover:text-orange-600'
              }`}
            >
              admin@anjaneynexus.com
            </a>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Send specifications, LOI, and customized export requests.
            </p>
          </div>

          {/* Card 3: Head Office */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${
            isDark 
              ? 'bg-[#12243d] border-[#1f3c64] hover:border-orange-500/50 shadow-[0_12px_30px_rgba(4,12,24,0.4)]' 
              : 'bg-white border-slate-200/90 hover:border-orange-500/40 shadow-[0_12px_30px_rgba(11,29,58,0.06)]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isDark ? 'bg-[#1a355f] text-orange-400' : 'bg-orange-50 text-orange-700'
              }`}>
                India HQ
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block mb-1">
              Registered Office
            </span>
            <div className={`text-sm font-bold leading-snug mb-1 ${
              isDark ? 'text-white' : 'text-[#0b1d3a]'
            }`}>
              Anjaney Nexus India LLP
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              C/145, First Floor, B G Tower, Delhi Darwaja, Ahmedabad, Gujarat, India
            </p>
          </div>

          {/* Card 4: Operating Hours (24/7) */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${
            isDark 
              ? 'bg-[#12243d] border-[#1f3c64] hover:border-orange-500/50 shadow-[0_12px_30px_rgba(4,12,24,0.4)]' 
              : 'bg-white border-slate-200/90 hover:border-orange-500/40 shadow-[0_12px_30px_rgba(11,29,58,0.06)]'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-500 block mb-1">
              Operating Hours
            </span>
            <div className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-[#0b1d3a]'}`}>
              24/7
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Round-the-clock global trade desk support &amp; port shipment monitoring.
            </p>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. EXPORT QUOTE CARD (Kept as it was, with Logo Theme & Dark Non-Black Palette)
         ========================================================================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        {/* CARD WRAPPER */}
        <div className={`rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 ${
          isDark 
            ? 'border-[#1f3c64] bg-[#10243e] shadow-[0_20px_60px_-15px_rgba(4,12,24,0.7)]' 
            : 'border-slate-200 bg-white shadow-xl'
        }`}>
          
          {/* Card Top Title Bar (Left-aligned, Dark Blue Header) */}
          <div className={`p-6 sm:px-10 sm:py-7 border-b text-left transition-colors ${
            isDark 
              ? 'border-[#1f3c64] bg-[#0b1d3a]' 
              : 'border-blue-950/20 bg-[#0b1d3a]'
          }`}>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Request Your Export Quote
            </h2>
          </div>

          {/* LOWER FORM SECTION */}
          <div className={`p-6 sm:p-10 md:p-12 transition-colors ${
            isDark ? 'bg-[#10243e]' : 'bg-white'
          }`}>
            {submitted ? (
              <div className="text-center py-10 space-y-5">
                {dispatchStatus?.emailDispatched ? (
                  <>
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-sm">
                      ✓
                    </div>
                    <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Quote Dispatched to Administrator
                    </h2>
                    <p className={`text-sm max-w-md mx-auto leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Thank you for submitting your specifications for <strong className="text-orange-500">{formData.product}</strong> ({formData.quantity || 'Standard container'} MT to {formData.destinationCountry || 'International'}). An operational quote notification was successfully emailed to: <strong className="text-emerald-400">yatharthjoshi127@gmail.com</strong>.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-sm">
                      ⚠️
                    </div>
                    <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Quote Saved (Live Email Not Delivered)
                    </h2>
                    <p className={`text-sm max-w-md mx-auto leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Your quote requirement for <strong className="text-orange-500">{formData.product}</strong> ({formData.quantity || 'Standard container'} MT) has been recorded in the database.
                    </p>

                    <div className={`max-w-lg mx-auto p-4 rounded-xl text-left text-xs space-y-2 border ${
                      isDark ? 'bg-[#081526] border-amber-500/40 text-slate-300' : 'bg-amber-50 border-amber-200 text-slate-700'
                    }`}>
                      <div className="font-bold text-amber-500 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>Delivery Diagnostic:</span>
                      </div>
                      <p className="leading-relaxed">
                        {!dispatchStatus?.serverConnected ? (
                          <>The backend server is currently <strong>not running</strong> on port 5000. Start it in your terminal with <code className="font-mono text-orange-500 font-bold">npm --prefix backend start</code> to enable live email delivery.</>
                        ) : (
                          <>Outgoing SMTP mailer credentials are not configured in <code className="font-mono text-orange-500 font-bold">backend/.env</code>. Set <code className="font-mono text-orange-500 font-bold">SMTP_EMAIL</code> and <code className="font-mono text-orange-500 font-bold">SMTP_PASS</code> (16-digit Google App Password) to deliver live emails to <strong className="text-orange-500">yatharthjoshi127@gmail.com</strong>.</>
                        )}
                      </p>
                    </div>
                  </>
                )}

                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setDispatchStatus(null);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        product: 'Other / Multiple Products',
                        quantity: '',
                        destinationCountry: '',
                        portOfDischarge: '',
                        requiredPacking: '',
                        incoterm: 'CIF',
                        shipmentMonth: '',
                        requirements: ''
                      });
                    }}
                    className={`px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer ${
                      isDark 
                        ? 'bg-[#1a355f] hover:bg-[#23457a] text-white' 
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    Submit Another Request
                  </button>
                  {setActivePage && (
                    <button
                      type="button"
                      onClick={() => setActivePage('products')}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                    >
                      Browse More Products
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit}>
                
                {/* ROW 1: FULL NAME & COMPANY NAME */}
                <div className="flex flex-col">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    FULL NAME <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                    required
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    COMPANY NAME <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Global Impex Ltd" 
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                    required
                  />
                </div>

                {/* ROW 2: EMAIL ADDRESS & WHATSAPP / PHONE */}
                <div className="flex flex-col">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    EMAIL ADDRESS <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="procurement@company.com" 
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                    required
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    WHATSAPP / PHONE <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 000 0000" 
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                    required
                  />
                </div>

                {/* ROW 3: PRODUCT OF INTEREST & QUANTITY (G/L) */}
                <div className="flex flex-col">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    PRODUCT OF INTEREST <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border cursor-pointer focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800'
                    }`}
                    required
                  >
                    <option value="Other / Multiple Products">Other / Multiple Products</option>
                    
                    {/* 1. Agriculture / Rice */}
                    <optgroup label="── BASMATI RICE ──" className="font-bold text-orange-500">
                      <option value="1121 Steamy Sella Basmati">1121 Steamy Sella Basmati</option>
                      <option value="1121 Creamy Sella Basmati">1121 Creamy Sella Basmati</option>
                      <option value="1121 Golden Sella Basmati">1121 Golden Sella Basmati</option>
                      <option value="XXXL Steamy Sella Basmati">XXXL Steamy Sella Basmati</option>
                      <option value="XXXL Creamy Sella Basmati">XXXL Creamy Sella Basmati</option>
                      <option value="XXXL Golden Sella Basmati">XXXL Golden Sella Basmati</option>
                      <option value="1509 Basmati Rice">1509 Basmati Rice</option>
                    </optgroup>
                    <optgroup label="── NON-BASMATI RICE ──" className="font-bold text-orange-500">
                      <option value="Non-Basmati - Sona Masuri">Non-Basmati - Sona Masuri</option>
                      <option value="Non-Basmati - IR64">Non-Basmati - IR64</option>
                      <option value="Non-Basmati - All Broken Grades(5% - 100%)">Non-Basmati - All Broken Grades(5% - 100%)</option>
                    </optgroup>

                    {/* 2. Spices */}
                    <optgroup label="── SPICES ──" className="font-bold text-orange-500">
                      <option value="Turmeric (2.5% - 9% curcumin)">Turmeric (2.5% - 9% curcumin) - Fingers / Bulb / Powder</option>
                      <option value="Chillies">Chillies (S17 Teja / Kashmiri / Sannam 334 / Byadgi)</option>
                      <option value="Cumin Seeds">Cumin Seeds (Singaporean / European)</option>
                      <option value="Cardamom">Cardamom (6mm to 8.5mm / Green / Black / Husk)</option>
                      <option value="Pepper">Pepper (400-800 G/L / White Vietnamese / Black Indian-Sri Lankan-Vietnamese)</option>
                      <option value="Cloves">Cloves (Indonesian Lal Pari / Madagascan)</option>
                      <option value="Coriander">Coriander (Eagle / Parrot Machine Cleaned or Sortex)</option>
                      <option value="Cinnamon">Cinnamon (Vietnamese / Indian)</option>
                      <option value="Saffron">Saffron (Kashmiri / Iranian / Spanish)</option>
                    </optgroup>

                    {/* 3. Oil Seeds */}
                    <optgroup label="── OIL SEEDS ──" className="font-bold text-orange-500">
                      <option value="Mustard Seeds">Mustard Seeds (Yellow / Black)</option>
                      <option value="Sesame Seeds">Sesame Seeds (White / Black)</option>
                      <option value="Soyabeans">Soyabeans (Whole High Protein Seeds)</option>
                      <option value="Ground Nut">Ground Nut / Peanuts (Bold / Java / Tj / 30/40 / 40/50 / 50/50 / 60/70)</option>
                    </optgroup>

                    {/* 4. Edible Oils */}
                    <optgroup label="── EDIBLE OILS ──" className="font-bold text-orange-500">
                      <option value="Sunflower Oil">Sunflower Oil (African / Russian / Indian)</option>
                      <option value="Soyabean Oil">Soyabean Oil</option>
                      <option value="Ground Nut Oil">Ground Nut Oil (Cold Press / Filtered)</option>
                    </optgroup>

                    {/* 5. Dry Fruits */}
                    <optgroup label="── DRY FRUITS ──" className="font-bold text-orange-500">
                      <option value="Cashew Nuts">Cashew Nuts (W180, W240, W320, W400, SWP, BB, 4 Piece, 8 Piece, 100% Broken, All Origins)</option>
                      <option value="Almonds">Almonds (70/30 / 80/20 / Independent)</option>
                    </optgroup>

                    {/* 6. Tea & Coffee */}
                    <optgroup label="── TEA & COFFEE ──" className="font-bold text-orange-500">
                      <option value="Tea">Tea (All Grades & Custom Blends of Tea)</option>
                      <option value="Coffee">Coffee (All Grades of Arabica Green or Roasted / All Grades of Robusta Green or Roasted)</option>
                      <option value="Cocoa Powder">Cocoa Powder (All Grades of Cocoa Powder)</option>
                    </optgroup>

                    {/* 7. Food Ingredients */}
                    <optgroup label="── FOOD INGREDIENTS ──" className="font-bold text-orange-500">
                      <option value="Dehydrated Onion Powder">Dehydrated Onion Powder (Red / Pink)</option>
                      <option value="Dehydrated Garlic Powder / Paste">Dehydrated Garlic Powder / Paste (Powder / Paste)</option>
                      <option value="Dehydrated Ginger">Dehydrated Ginger (Indian / Nigerian)</option>
                    </optgroup>
                  </select>
                </div>
                
                <div className="flex flex-col relative">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    QUANTITY (G/L) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 500" 
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                    required
                  />
                </div>

                {/* ROW 4: DESTINATION COUNTRY & PORT OF DISCHARGE */}
                <div className="flex flex-col">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    DESTINATION COUNTRY <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="destinationCountry"
                    value={formData.destinationCountry}
                    onChange={handleChange}
                    placeholder="e.g., United Arab Emirates" 
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                    required
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    PORT OF DISCHARGE <span className="text-slate-400 font-normal lowercase tracking-normal text-[11px]">(optional)</span>
                  </label>
                  <input 
                    type="text" 
                    name="portOfDischarge"
                    value={formData.portOfDischarge}
                    onChange={handleChange}
                    placeholder="e.g., Jebel Ali" 
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* ROW 5 (Full Width): REQUIRED PACKING */}
                <div className="flex flex-col md:col-span-2">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    REQUIRED PACKING <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="requiredPacking"
                    value={formData.requiredPacking}
                    onChange={handleChange}
                    placeholder="e.g., 50kg PP bags or 5kg private label" 
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                    required
                  />
                </div>

                {/* ROW 6: PREFERRED INCOTERM & TARGET SHIPMENT MONTH */}
                <div className="flex flex-col">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    PREFERRED INCOTERM <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="incoterm"
                    value={formData.incoterm}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border cursor-pointer focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800'
                    }`}
                    required
                  >
                    <option value="CIF">CIF — Cost, Insurance &amp; Freight</option>
                    <option value="FOB">FOB — Free On Board</option>
                    <option value="CFR">CFR — Cost and Freight</option>
                    <option value="EXW">EXW — Ex-Works (Mill Delivery)</option>
                  </select>
                </div>
                
                <div className="flex flex-col">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    TARGET SHIPMENT MONTH <span className="text-slate-400 font-normal lowercase tracking-normal text-[11px]">(optional)</span>
                  </label>
                  <input 
                    type="month" 
                    name="shipmentMonth"
                    value={formData.shipmentMonth}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* ROW 7 (Full Width Textarea): SPECIFIC REQUIREMENTS */}
                <div className="flex flex-col md:col-span-2">
                  <label className={`text-[11px] font-black uppercase tracking-wider mb-2 flex items-center gap-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}>
                    SPECIFIC REQUIREMENTS
                  </label>
                  <textarea 
                    rows="4"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="e.g., 50kg PP Bags, 5% Broken max, SGS inspection, COA requirements, private label branding..." 
                    className={`w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all outline-none border resize-y focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 ${
                      isDark
                        ? 'bg-[#0c192c] border-[#23426e] text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                  ></textarea>
                </div>

                {/* SUBMISSION FOOTER (Full Width Elongated Button) */}
                <div className="md:col-span-2 mt-6 border-t border-slate-200 dark:border-[#1f3c64] pt-8">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 px-6 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        <span>Dispatching Requirement to Export Desk...</span>
                      </>
                    ) : (
                      <span>SUBMIT YOUR RFQ</span>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Inquire;
