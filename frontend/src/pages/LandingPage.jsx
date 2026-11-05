// =====================================================================
// INSPIRATION: jftagro.com (B2B Corporate Catalog & Export Layout)
// ADAPTED FOR: J.N. Enterprise (MERN Stack, React, Tailwind CSS)
// =====================================================================
// IMPLEMENTATION: High-trust B2B corporate landing page with continuous live ticker,
// verified credentials strip, structured product catalog categories, 
// transparent 4-step workflow execution, and direct WhatsApp RFQ widget.
// =====================================================================

import React, { useState } from 'react';
import { 
  Award, 
  Factory, 
  Globe2, 
  PackageCheck, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Printer, 
  Layers, 
  FileText, 
  Sparkles, 
  PhoneCall, 
  Boxes,
  Truck,
  CheckCircle
} from 'lucide-react';
import TrustCertificatesSection from '../components/TrustCertificatesSection';

const LandingPage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    {
      id: 'cat-1',
      category: 'packaging',
      title: 'Rigid Luxury & Gift Boxes',
      desc: 'Magnetic closure, foil-stamped corporate packaging with high-density EVA foam inserts.',
      moq: '500 Units',
      leadTime: '7-10 Days',
      badge: 'Bestseller',
      tag: 'Custom Packaging'
    },
    {
      id: 'cat-2',
      category: 'commercial',
      title: 'Multi-Page Catalogs & Brochures',
      desc: 'Spot UV, soft-touch matte lamination, saddle-stitched or perfect-bound product catalogs.',
      moq: '1,000 Units',
      leadTime: '3-5 Days',
      badge: 'High Volume',
      tag: 'Commercial Print'
    },
    {
      id: 'cat-3',
      category: 'packaging',
      title: 'Corrugated Shipping Cartons',
      desc: '3-ply & 5-ply heavy-duty kraft outer boxes engineered for export cargo protection.',
      moq: '1,000 Units',
      leadTime: '5-7 Days',
      badge: 'Export Grade',
      tag: 'Shipping Solutions'
    },
    {
      id: 'cat-4',
      category: 'stationery',
      title: 'Executive Stationery Suites',
      desc: 'FSC-certified bond letterheads, embossed business cards, and branded linen envelopes.',
      moq: '500 Sets',
      leadTime: '2-4 Days',
      badge: 'Corporate',
      tag: 'Office Branding'
    },
    {
      id: 'cat-5',
      category: 'labels',
      title: 'Roll Labels & Security Seals',
      desc: 'Thermal, metallic, vinyl, and tamper-evident roll labels for automated FMCG lines.',
      moq: '5,000 Pcs',
      leadTime: '3-5 Days',
      badge: 'Precision Die-Cut',
      tag: 'Industrial Labels'
    },
    {
      id: 'cat-6',
      category: 'commercial',
      title: 'Custom Presentation Folders',
      desc: 'Die-cut gusset pockets, business card slits, metallic foil accents, and protective coating.',
      moq: '500 Pcs',
      leadTime: '4-6 Days',
      badge: 'Popular',
      tag: 'Marketing Collateral'
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const tickerItems = [
    '🔥 New 2026 Corporate Packaging & Gifting Catalog Available Now',
    '📦 Bulk Offset Orders (10,000+ units) Qualify for Priority Scheduling',
    '✅ ISO 9001:2015 & MSME Certified Commercial Printing Facility',
    '🚚 Direct Pan-India & Port-Delivery Logistics Support Available'
  ];

  const credentials = [
    { icon: Award, label: 'ISO 9001:2015', sub: 'Certified QC Process' },
    { icon: Factory, label: 'MSME Registered', sub: 'Direct Manufacturer' },
    { icon: Globe2, label: 'Export Quality', sub: 'Global Standards' },
    { icon: Boxes, label: 'High Bulk Capacity', sub: '100K+ Units/Day' },
    { icon: ShieldCheck, label: 'Pre-Dispatch QC', sub: 'Zero-Defect Policy' },
    { icon: Clock, label: 'SLA Guaranteed', sub: 'Strict On-Time Dispatch' }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Inquiry & Technical Spec',
      desc: 'Share GSM, dimensions, Pantone shades, finishing needs, and volume for a transparent institutional quote.',
      duration: '< 4 Hours'
    },
    {
      step: '02',
      title: 'Pre-Press Proof & Sample',
      desc: 'Digital color-calibrated proofs and physical mockups dispatched for tactile validation before press run.',
      duration: '24-48 Hours'
    },
    {
      step: '03',
      title: 'Industrial Press Run',
      desc: 'High-speed automated offset/digital printing with in-line spectrophotometer color consistency checks.',
      duration: 'Scheduled Run'
    },
    {
      step: '04',
      title: 'Secure Packing & Dispatch',
      desc: 'Moisture-sealed palletized packing with consignment tracking right up to your loading dock.',
      duration: 'SLA Tracked'
    }
  ];

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hello Anjaney Nexus! I am interested in requesting a B2B quotation / verification details.");
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const url = isMobile 
      ? `https://api.whatsapp.com/send?phone=919925816161&text=${text}`
      : `https://web.whatsapp.com/send?phone=919925816161&text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-600 selection:text-white">
      
      {/* 1. TOP BAR TICKER (Inspired by "AGRO PULSE: Live Trade Feed") */}
      <div className="bg-indigo-950 text-white text-xs sm:text-sm py-2 px-4 border-b border-indigo-800/60 overflow-hidden flex items-center shadow-inner">
        <div className="flex-shrink-0 flex items-center gap-2 pr-4 font-black tracking-wider uppercase border-r border-indigo-800 text-indigo-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          J.N. PULSE
        </div>
        <div className="relative flex overflow-x-hidden w-full ml-4">
          <div className="flex space-x-12 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] text-slate-300 font-medium">
            {tickerItems.concat(tickerItems).map((text, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <span>{text}</span>
                <span className="text-indigo-500">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION (B2B Mega-Menu Vibe) */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <div 
              onClick={() => onNavigate && onNavigate('home')}
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                JN
              </div>
              <div>
                <span className="font-extrabold text-2xl text-slate-900 tracking-tight block leading-none">
                  J.N. Enterprise
                </span>
                <span className="text-[11px] font-bold text-indigo-600 tracking-widest uppercase">
                  Commercial Printing & Packaging
                </span>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-8 font-semibold text-slate-600 text-sm">
              <a href="#products" className="hover:text-indigo-600 transition-colors">Products Catalog</a>
              <a href="#workflow" className="hover:text-indigo-600 transition-colors">Order Execution</a>
              <a href="#credentials" className="hover:text-indigo-600 transition-colors">Quality & Certs</a>
              <a href="#rfq" className="hover:text-indigo-600 transition-colors">Infrastructure</a>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleWhatsAppClick}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Direct Hotline
              </button>
              
              <button 
                onClick={() => onNavigate ? onNavigate('contact') : window.location.href='#rfq'}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md shadow-indigo-600/25 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Request RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION (High-Trust Corporate B2B Focus) */}
      <header className="relative bg-slate-950 text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle grid and decorative glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            ISO 9001:2015 Compliant Industrial Printing Facility
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] mb-6 text-white">
            Industrial-Grade Commercial <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-sky-400">
              Printing & Rigid Packaging
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Contract manufacturing for corporate brochures, rigid luxury gift boxes, corrugated export cartons, and precision labels. Backed by automated Heidelberg offset presses and calibrated spectrophotometer quality control.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#products"
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Browse Catalog & Specs</span>
            </a>
            
            <a 
              href="#workflow"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Execution Workflow</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
            <div>
              <div className="text-2xl font-black text-white">100,000+</div>
              <div className="text-xs text-slate-400 font-medium">Daily Impression Capacity</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">0.05%</div>
              <div className="text-xs text-slate-400 font-medium">Defect Tolerance Standard</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">480+</div>
              <div className="text-xs text-slate-400 font-medium">Corporate Clients Served</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-xs text-slate-400 font-medium">Pre-Dispatch Inspection</div>
            </div>
          </div>

        </div>
      </header>

      {/* 4. TRUST BADGES / CERTIFICATIONS */}
      <section id="credentials" className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Verified Industrial Accreditations & Infrastructure
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {credentials.map((cred, i) => {
              const Icon = cred.icon;
              return (
                <div 
                  key={i} 
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-indigo-50/40 hover:border-indigo-100 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform border border-slate-100">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cred.label}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {cred.sub}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4B. ELEGANT QUALITY REGISTRATIONS & VERIFICATION SECTION (Inspired by JFT Agro) */}
      <TrustCertificatesSection />


      {/* 5. STRUCTURED PRODUCT CATEGORIES */}
      <section id="products" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block mb-2">
                Standard & Custom Formats
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Product Categories & Capabilities
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-normal">
                Choose from standardized packaging specs or request customized die-lines, finishes, and paper weights engineered for your brand.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Catalog' },
                { id: 'packaging', label: 'Packaging' },
                { id: 'commercial', label: 'Commercial Print' },
                { id: 'stationery', label: 'Stationery' },
                { id: 'labels', label: 'Labels & Seals' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div 
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                      {p.tag}
                    </span>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {p.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Standard MOQ</span>
                      <span className="font-bold text-slate-800">{p.moq}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Turnaround</span>
                      <span className="font-bold text-slate-800">{p.leadTime}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleWhatsAppClick}
                    className="w-full py-2.5 bg-slate-900 group-hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Spec & Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. WORKFLOW SECTION (Inspired by "Before We Ship / How Every Order Gets Executed") */}
      <section id="workflow" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block mb-2">
              Quality Assurance Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How Every Order Gets Executed
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal">
              From raw stock inspection to physical sample sign-off and final dispatch, our process is built for high repeatability and zero surprise errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-12 right-12 h-0.5 bg-indigo-100 z-0"></div>

            {workflowSteps.map((item, index) => (
              <div 
                key={index} 
                className="relative z-10 flex flex-col bg-slate-50/70 p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-lg font-black shadow-md shadow-indigo-600/20">
                    {item.step}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {item.duration}
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 text-xs leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Workflow Bottom Trust Pill */}
          <div className="mt-14 p-6 rounded-2xl bg-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/50 flex items-center justify-center flex-shrink-0 text-amber-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">Physical Sampling Before Bulk Runs</h4>
                <p className="text-xs text-slate-300 mt-0.5">We provide unprinted blank mockups or calibrated digitally printed samples for tactile approvals.</p>
              </div>
            </div>
            <button 
              onClick={handleWhatsAppClick}
              className="px-6 py-2.5 bg-white text-indigo-950 hover:bg-slate-100 rounded-lg font-bold text-xs uppercase tracking-wider flex-shrink-0 transition-colors cursor-pointer"
            >
              Order Sample Kit
            </button>
          </div>

        </div>
      </section>

      {/* 7. QUICK RFQ SECTION */}
      <section id="rfq" className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Discuss Your Print Project?</h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
            Submit your specs or get in touch directly with our technical estimating desk. Institutional contracts receive dedicated account management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleWhatsAppClick}
              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </button>
            <a 
              href="mailto:contact@jnenterprise.com"
              className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Email Technical Drawings</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="font-bold text-white text-sm">J.N. Enterprise</span> · Industrial Printing & Packaging Solutions
            <p className="mt-1 text-slate-500">ISO 9001:2015 Registered · Pan-India & Global Export Compliance</p>
          </div>
          <p>© {new Date().getFullYear()} J.N. Enterprise. All rights reserved.</p>
        </div>
      </footer>

      {/* 9. FLOATING LIVE QUOTE WIDGET (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={handleWhatsAppClick}
          className="flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all transform hover:scale-105 font-bold text-sm border-2 border-emerald-400/50 cursor-pointer"
          title="Instant WhatsApp RFQ"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">WhatsApp RFQ</span>
        </button>
      </div>

    </div>
  );
};

export default LandingPage;
