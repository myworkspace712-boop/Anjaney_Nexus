import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AboutPage = ({ setActivePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 relative overflow-hidden ${
      isDark ? 'bg-[#020611] text-slate-100' : 'bg-[#f8fafc] text-[#0b1d3a]'
    }`}>
      
      {/* AMBIENT DYNAMIC GLOWS (Strictly non-black in dark mode, branded in light mode) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 -z-0 transition-opacity duration-700 bg-orange-400/20"></div>
      <div className={`absolute top-[450px] right-10 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-[#132649]/35' : 'bg-blue-600/10'
      }`}></div>
      <div className={`absolute top-[1100px] left-10 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-[#0d203e]/30' : 'bg-orange-500/10'
      }`}></div>

      {/* =========================================================================
          1. HERO SECTION (Dynamic Brand Navy in Light / Deep Maritime in Dark)
         ========================================================================= */}
      <div className="relative w-full min-h-[500px] lg:min-h-[560px] flex items-center font-sans overflow-hidden">
        {/* The Direct Farm Procurement Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop" 
            alt="Direct Farm Procurement - Agricultural Harvesting" 
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
        </div>

        {/* Dynamic Theme Gradient Overlays:
            - Light mode: Deep Anjaney Logo Navy (#0b1d3a) gradient for maximum contrast and prestige
            - Dark mode: Deep Maritime Ocean Blue (#020611 to #071326), strictly non-black */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-r from-[#020611]/95 via-[#020611]/85 to-[#071326]/65'
            : 'bg-gradient-to-r from-[#0b1d3a]/95 via-[#0b1d3a]/80 to-[#0b1d3a]/45'
        }`}></div>
        
        <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
          isDark
            ? 'bg-gradient-to-b from-[#020611]/75 via-transparent to-[#020611]'
            : 'bg-gradient-to-b from-[#0b1d3a]/75 via-transparent to-[#f8fafc]'
        }`}></div>

        {/* Subtle dynamic grid pattern for high-tech maritime feel */}
        <div className="absolute inset-0 bg-[radial-gradient(#fb923c_1px,transparent_1px)] [background-size:36px_36px] opacity-15 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24">
          <div className="max-w-3xl">
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-500 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-400/15 border border-orange-500/20 dark:border-orange-400/30 mb-4">
              <span>Global Agricultural Trade &amp; Procurement</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4 tracking-tight drop-shadow-lg text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300">Direct Farm Procurement.</span><br />
              <span className="text-white">Connecting India's Harvest to the World.</span>
            </h1>

            {/* Subheading / Tagline */}
            <p className="text-lg sm:text-xl text-orange-400 dark:text-orange-300 font-bold mb-4 drop-shadow-sm">
              Ensuring global standards in every shipment.
            </p>

            {/* Description */}
            <p className="text-slate-100 max-w-2xl text-base sm:text-lg leading-relaxed font-normal drop-shadow-md">
              Backed by over 15 years of trade integrity, strict laboratory testing standards, and transparent supply chain execution from farm to containerized sea freight.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. FLOATING 3-CARD STATS / CORE COMPETENCIES STRIP
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: 15+ Years Industry Experience */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer group ${
            isDark 
              ? 'bg-[#071326] border-[#132649] hover:border-orange-400/80 shadow-[0_12px_30px_rgba(4,12,24,0.4)] hover:shadow-[0_20px_40px_rgba(4,12,24,0.6)]' 
              : 'bg-white border-slate-200/90 hover:border-orange-500/60 shadow-[0_12px_30px_rgba(11,29,58,0.06)] hover:shadow-[0_20px_40px_rgba(11,29,58,0.12)]'
          }`}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 dark:bg-orange-400/15 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500 dark:group-hover:bg-orange-400 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h4 className={`text-lg sm:text-xl font-black tracking-tight leading-snug mb-2 transition-colors ${
              isDark ? 'text-white group-hover:text-orange-400' : 'text-[#0b1d3a] group-hover:text-orange-600'
            }`}>
              15+ Years Industry Experience
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Deep domain expertise in agricultural sourcing, compliance, and cross-border trade execution.
            </p>
          </div>

          {/* Card 2: Commitment to Sustainable Practices */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer group ${
            isDark 
              ? 'bg-[#071326] border-[#132649] hover:border-orange-400/80 shadow-[0_12px_30px_rgba(4,12,24,0.4)] hover:shadow-[0_20px_40px_rgba(4,12,24,0.6)]' 
              : 'bg-white border-slate-200/90 hover:border-orange-500/60 shadow-[0_12px_30px_rgba(11,29,58,0.06)] hover:shadow-[0_20px_40px_rgba(11,29,58,0.12)]'
          }`}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 dark:bg-orange-400/15 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500 dark:group-hover:bg-orange-400 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h4 className={`text-lg sm:text-xl font-black tracking-tight leading-snug mb-2 transition-colors ${
              isDark ? 'text-white group-hover:text-orange-400' : 'text-[#0b1d3a] group-hover:text-orange-600'
            }`}>
              Commitment to Sustainable Practices
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Responsible farming partnerships, ethical procurement, and environmental stewardship.
            </p>
          </div>

          {/* Card 3: Global Network & Reliable Logistics */}
          <div className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer group ${
            isDark 
              ? 'bg-[#071326] border-[#132649] hover:border-orange-400/80 shadow-[0_12px_30px_rgba(4,12,24,0.4)] hover:shadow-[0_20px_40px_rgba(4,12,24,0.6)]' 
              : 'bg-white border-slate-200/90 hover:border-orange-500/60 shadow-[0_12px_30px_rgba(11,29,58,0.06)] hover:shadow-[0_20px_40px_rgba(11,29,58,0.12)]'
          }`}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-500/10 dark:bg-orange-400/15 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500 dark:group-hover:bg-orange-400 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h4 className={`text-lg sm:text-xl font-black tracking-tight leading-snug mb-2 transition-colors ${
              isDark ? 'text-white group-hover:text-orange-400' : 'text-[#0b1d3a] group-hover:text-orange-600'
            }`}>
              Global Network &amp; Reliable Logistics
            </h4>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              End-to-end containerized ocean shipping, port clearance, and multimodal forwarding.
            </p>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. MAIN ABOUT CONTENT SECTION (A Trusted Partner in Global Trade)
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200 dark:border-[#132649]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-500 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-400/15 border border-orange-500/20 dark:border-orange-400/30 mb-3">
              <span>Established Commercial Enterprise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-blue-900 dark:text-sky-400">
              A Trusted Partner in Global Trade
            </h2>
            <p className={`text-sm font-medium mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Delivering verified quality, transparent sourcing, and lasting value across international borders.
            </p>
          </div>
        </div>

        {/* Narrative Feature Card */}
        <div className={`p-8 sm:p-10 lg:p-12 rounded-3xl border transition-all duration-300 relative overflow-hidden mb-12 ${
          isDark 
            ? 'bg-[#071326] border-[#132649] shadow-[0_16px_40px_rgba(4,12,24,0.4)]' 
            : 'bg-white border-slate-200/90 shadow-[0_16px_40px_rgba(11,29,58,0.06)]'
        }`}>
          {/* Subtle Ambient Backlight Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-10 bg-orange-400"></div>

          <div className="relative z-10 space-y-6 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-orange-500 dark:bg-orange-400"></span>
              <span className="text-xs font-black uppercase tracking-widest text-orange-500 dark:text-orange-400">
                Trade Foundation &amp; Experience
              </span>
            </div>

            {/* About Us Paragraph 1 */}
            <p className={`text-base sm:text-lg leading-relaxed font-medium ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              With over 15 years of experience in the import and export industry, we have established ourselves as a trusted partner in the global fertilizer trade. Our expertise lies in sourcing and supplying high-quality agricultural fertilizers, including Sulphur, DAP (Di-Ammonium Phosphate), and Urea, to customers across domestic and international markets.
            </p>

            {/* About Us Paragraph 2 */}
            <p className={`text-base sm:text-lg leading-relaxed font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Our commitment to quality, reliability, and timely delivery has enabled us to build long-term relationships with suppliers, distributors, and customers worldwide. Backed by industry knowledge, a strong global network, and a customer-focused approach, we continue to expand our reach and deliver value to the agricultural sector.
            </p>
          </div>
        </div>

        {/* =========================================================================
            4. MISSION & VISION SHOWCASE (Modern Dual Card Grid)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          
          {/* OUR MISSION CARD */}
          <div className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 ${
            isDark 
              ? 'bg-[#071326] border-[#132649] hover:border-orange-400/80 shadow-[0_14px_35px_rgba(4,12,24,0.4)]' 
              : 'bg-white border-slate-200/90 hover:border-orange-500/60 shadow-[0_14px_35px_rgba(11,29,58,0.06)]'
          }`}>
            <div>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-500/10 dark:bg-orange-400/15 text-orange-500 dark:text-orange-400 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-600 dark:group-hover:from-orange-400 dark:group-hover:to-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-black tracking-tight mb-4 transition-colors ${
                isDark ? 'text-white group-hover:text-orange-400' : 'text-[#0b1d3a] group-hover:text-orange-600'
              }`}>
                Our Mission
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Our mission is to provide high-quality agricultural and food products that meet international standards while promoting sustainable farming, food safety, and customer satisfaction. We are committed to sourcing responsibly, ensuring reliable import and export services, delivering value through quality and innovation, and building long-term partnerships based on trust, integrity, and excellence.
              </p>
            </div>
          </div>

          {/* OUR VISION CARD */}
          <div className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 ${
            isDark 
              ? 'bg-[#071326] border-[#132649] hover:border-orange-400/80 shadow-[0_14px_35px_rgba(4,12,24,0.4)]' 
              : 'bg-white border-slate-200/90 hover:border-orange-500/60 shadow-[0_14px_35px_rgba(11,29,58,0.06)]'
          }`}>
            <div>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-500/10 dark:bg-sky-400/15 text-blue-500 dark:text-sky-400 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-blue-700 dark:group-hover:from-sky-500 dark:group-hover:to-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-black tracking-tight mb-4 transition-colors ${
                isDark ? 'text-white group-hover:text-orange-400' : 'text-[#0b1d3a] group-hover:text-orange-600'
              }`}>
                Our Vision
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed font-medium ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Our vision is to become a globally trusted leader in the agriculture and food products industry by connecting producers and markets through sustainable practices, innovative solutions, and exceptional quality. We aspire to contribute to global food security, empower farming communities, and create lasting value for our customers, partners, and society.
              </p>
            </div>
          </div>

        </div>

        {/* =========================================================================
            5. CALL TO ACTION STRIP
           ========================================================================= */}
        <div className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isDark 
            ? 'bg-gradient-to-r from-[#01040a] via-[#071326] to-[#0d203e] border-[#132649] shadow-xl' 
            : 'bg-gradient-to-r from-blue-950 via-[#0b1d3a] to-blue-900 border-transparent shadow-xl text-white'
        }`}>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 dark:text-orange-300 mb-1 block">
              Global Procurement Network
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-blue-100 tracking-tight">
              Ready to explore our export catalog or initiate an inquiry?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Connect directly with our commercial desk for contract-backed pricing, sample approvals, and certified specifications.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setActivePage && setActivePage('products')}
              className="flex-1 sm:flex-none px-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-400 dark:to-amber-500 dark:hover:from-orange-400 dark:hover:to-amber-400 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              Explore Products
            </button>
            <button
              onClick={() => setActivePage && setActivePage('contact')}
              className={`flex-1 sm:flex-none px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer border text-center ${
                isDark 
                  ? 'border-[#132649] bg-[#020611] hover:bg-[#0d203e] text-white hover:border-orange-400' 
                  : 'border-white/30 bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AboutPage;
