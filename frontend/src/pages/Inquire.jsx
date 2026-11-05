import React, { useState, useEffect } from 'react';
import { EXPORT_CATALOG } from './Products';
import { useTheme } from '../context/ThemeContext';

const Inquire = ({ setActivePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* 1. HERO SECTION (contact_us image from public/images) */}
      <div className="relative w-full min-h-[500px] lg:min-h-[560px] flex items-center font-sans overflow-hidden bg-slate-950">
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
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Brand Dark Navy Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/85 to-slate-950/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="max-w-3xl">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tight">
              Have a chat with our <span className="text-orange-500">Export Team</span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed font-medium">
              Submit your product, quantity, specification and destination inquiry, our export team will review your complete trade enquiry during published business hours.
            </p>
          </div>
        </div>
      </div>

      {/* 2. INQUIRY FORM SECTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* CARD WRAPPER */}
        <div className={`rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 ${
          isDark ? 'border-slate-800 bg-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]' : 'border-slate-200 bg-white shadow-xl'
        }`}>
          
          {/* Card Top Title Bar */}
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 block mb-1">
                Official Commercial RFQ Form
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-blue-950 dark:text-white">
                Request Your Export Quote
              </h2>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Regulated By</span>
              <div className="font-serif italic text-lg text-slate-300 font-bold tracking-tight select-none px-2 py-0.5 bg-slate-800 rounded">
                fssai
              </div>
            </div>
          </div>

          {/* LOWER FORM SECTION */}
          <div className={`p-6 sm:p-10 md:p-12 transition-colors ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}>
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-orange-500/10 text-orange-500 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-sm">
                  ✓
                </div>
                <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Quote Requirement Received
                </h2>
                <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you for submitting your specifications for <strong className="text-orange-500">{formData.product}</strong>. Our export desk will review your volume ({formData.quantity || 'Standard container'} MT) and destination ({formData.destinationCountry || 'International'}) to provide an official CIF/FOB quote.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
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
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                    required
                  />
                </div>

                {/* ROW 3: PRODUCT OF INTEREST & QUANTITY (METRIC TONS) */}
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800'
                    }`}
                    required
                  >
                    <option value="Other / Multiple Products">Other / Multiple Products</option>
                    
                    {/* 1. Agriculture */}
                    <optgroup label="── AGRICULTURE ──" className="font-bold text-orange-500">
                      <option value="Basmati Rice">Basmati Rice (Premium / Grade A / Standard)</option>
                      <option value="Non-Basmati Rice">Non-Basmati Rice (Raw / Parboiled Sella)</option>
                    </optgroup>

                    {/* 2. Spices */}
                    <optgroup label="── SPICES ──" className="font-bold text-orange-500">
                      <option value="Turmeric">Turmeric (Raw Root / Powder)</option>
                      <option value="Chilly">Chilly (Whole / High SHU Ground)</option>
                      <option value="Cumin Seeds (Jeera)">Cumin Seeds / Jeera (Dried Whole)</option>
                      <option value="Cardamom">Green Cardamom (Whole Pods / Ground)</option>
                      <option value="Black Pepper">Black Pepper (Whole Tellicherry / Powder)</option>
                      <option value="Cloves">Cloves (Dried Unopened Flower Buds)</option>
                      <option value="Coriander">Coriander Seeds / Dhania (Whole)</option>
                      <option value="Cinnamon">Cinnamon (Ceylon / Cassia Bark)</option>
                      <option value="Mustard Seeds">Mustard Seeds / Rai (Whole Machine Cleaned)</option>
                    </optgroup>

                    {/* 3. Oil Seeds */}
                    <optgroup label="── OIL SEEDS ──" className="font-bold text-orange-500">
                      <option value="Sesame Seeds">Sesame Seeds (Natural / Hulled Auto-Sortex)</option>
                      <option value="Soyabean">Soyabean (Whole High Protein Seeds)</option>
                      <option value="Ground Nut">Ground Nut / Peanuts (Bold / Java Kernels)</option>
                    </optgroup>

                    {/* 4. Edible Oils */}
                    <optgroup label="── EDIBLE OILS ──" className="font-bold text-orange-500">
                      <option value="Sunflower Oil">Sunflower Oil (Standard / High-Oleic)</option>
                      <option value="Soyabean Oil">Soyabean Oil (Refined / Bulk Containerized)</option>
                      <option value="Ground Nut Oil">Ground Nut Oil (Cold Pressed / Refined)</option>
                    </optgroup>

                    {/* 5. Dry Fruits */}
                    <optgroup label="── DRY FRUITS ──" className="font-bold text-orange-500">
                      <option value="Cashew Nuts">Cashew Nuts (W180, W240, W320, Splits)</option>
                      <option value="Almonds">Almonds (Raw Whole Edible Kernels)</option>
                      <option value="Saffron">Saffron (Pure Kashmir Mongra Threads)</option>
                    </optgroup>

                    {/* 6. Tea & Coffee */}
                    <optgroup label="── TEA & COFFEE ──" className="font-bold text-orange-500">
                      <option value="Tea">Tea (Black CTC / Green / Indian Masala Chai)</option>
                      <option value="Coffee">Coffee (Arabica / Robusta Beans)</option>
                      <option value="Cocoa">Cocoa (Natural Unsweetened / Cacao Powder)</option>
                    </optgroup>

                    {/* 7. Food Ingredients */}
                    <optgroup label="── FOOD INGREDIENTS ──" className="font-bold text-orange-500">
                      <option value="Dehydrated Onion">Dehydrated Onion (Flakes / Minced / Powder)</option>
                      <option value="Dehydrated Garlic">Dehydrated Garlic (Granules / Powder)</option>
                      <option value="Dehydrated Ginger">Dehydrated Ginger (Whole / Micro Powder)</option>
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800'
                    }`}
                    required
                  >
                    <option value="CIF">CIF — Cost, Insurance & Freight</option>
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
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
                        ? 'bg-slate-950/70 border-slate-700/80 text-white placeholder-slate-500'
                        : 'bg-[#fafafa] border-slate-300/80 text-slate-800 placeholder-slate-400'
                    }`}
                  ></textarea>
                </div>

                {/* SUBMISSION FOOTER */}
                <div className="md:col-span-2 mt-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 gap-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm text-center sm:text-left">
                    By submitting this quote request, your commercial details remain strictly confidential under Anjaney Nexus international trade agreements.
                  </p>
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 cursor-pointer shrink-0"
                  >
                    Submit Export Quote Request
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