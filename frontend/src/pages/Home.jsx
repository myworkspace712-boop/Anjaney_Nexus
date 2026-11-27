import React from 'react';
import StatsSection from '../components/StatsSection';
import ProductGrid from '../components/ProductGrid';
import { useTheme } from '../context/ThemeContext';

const Home = ({ setActivePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main className={`w-full min-h-screen font-sans transition-colors duration-500 overflow-hidden relative ${
      isDark 
        ? 'bg-gradient-to-b from-[#0a0f1d] via-[#0d1527] to-[#0a0f1d] text-slate-100' 
        : 'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] text-[#0b1d3a]'
    }`}>

      {/* MARITIME TRADE & LOGISTICS BACKGROUND OVERLAY (Navigational Chart Grid + Deep Ocean Aurora) */}
      <div className={`absolute inset-0 pointer-events-none -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-trade-grid-dark opacity-80' : 'bg-trade-grid-light opacity-75'
      }`}></div>

      {/* AMBIENT DYNAMIC MARITIME BEACONS & OCEANIC TRADE HUBS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-25 -z-0 bg-gradient-to-br from-sky-500/20 via-blue-500/15 to-transparent animate-maritime-drift"></div>
      <div className={`absolute top-[450px] right-10 w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 animate-float-slow ${
        isDark ? 'bg-gradient-to-bl from-cyan-500/15 via-sky-500/15 to-transparent' : 'bg-gradient-to-bl from-sky-500/15 via-blue-500/15 to-transparent'
      }`}></div>
      <div className={`absolute top-[1200px] left-10 w-[550px] h-[550px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 animate-maritime-drift ${
        isDark ? 'bg-gradient-to-tr from-sky-500/15 via-blue-600/15 to-transparent' : 'bg-gradient-to-tr from-sky-500/15 via-blue-500/15 to-transparent'
      }`}></div>
      <div className={`absolute bottom-32 right-12 w-[550px] h-[550px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 animate-float-slow ${
        isDark ? 'bg-gradient-to-tl from-cyan-500/15 via-sky-500/15 to-transparent' : 'bg-gradient-to-tl from-sky-500/15 via-blue-500/15 to-transparent'
      }`}></div>

      {/* 
        1. HERO SECTION - INTERNATIONAL MARITIME IMPORT/EXPORT TERMINAL AESTHETIC
        Solid, authoritative corporate trade presentation (Zero Glassmorphism)
      */}
      <section className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center font-sans overflow-hidden border-b border-slate-200 dark:border-slate-800">
        
        {/* Background Freight & Shipping Port Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=2000" 
            alt="Global Trade and Export Logistics" 
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out hover:scale-105"
          />
        </div>

        {/* Ambient Glowing Blobs inside Hero */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-25 z-0 bg-orange-400/20 animate-pulse-subtle"></div>
        <div className={`absolute top-1/2 -right-16 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl z-0 animate-float-slow ${
          isDark ? 'bg-[#132649]/40' : 'bg-blue-600/15'
        }`}></div>

        {/* Solid Corporate Maritime Overlays (High-Contrast, Pure Solid Depth, No Glass) */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-r from-[#0a0f1d] via-[#0a0f1d]/95 to-[#0f172a]/85'
            : 'bg-gradient-to-r from-[#0b1d3a] via-[#0b1d3a]/92 to-[#0b1d3a]/70'
        }`}></div>
        
        {/* Precision Architectural Grid for International Logistics */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

        {/* Hero Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="max-w-3xl text-left">
            {/* Commercial Trust & Export Dispatch Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/15 backdrop-blur-sm border border-orange-400/40 text-orange-300 font-black text-[11px] uppercase tracking-widest rounded-full mb-6 shadow-md transform transition-all duration-300 hover:scale-[1.02] cursor-default">
              <span>PREMIUM EXPORT SOLUTIONS · GLOBAL AGRO COMMODITIES</span>
            </div>

            {/* Authoritative Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[0.98] mb-6 drop-shadow-md text-left">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300">Trade Without</span><br />
              <span className="text-white">Boundaries.</span>
            </h1>

            {/* Subheading / Tagline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-100 font-medium max-w-2xl leading-relaxed drop-shadow-sm mb-8 text-left">
              Direct farm procurement connecting India’s harvest to global markets. Delivering premium and certified agro-commodities worldwide with uncompromising standards.
            </p>

            {/* Solid Commercial Action Buttons */}
            <div className="flex flex-wrap items-center justify-start gap-4">
              <button
                onClick={() => setActivePage && setActivePage('contact')}
                className="px-8 py-4 bg-[#0a0f1d] hover:bg-[#111a2e] border-2 border-white/20 hover:border-white/50 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* 2. STATS & CREDENTIALS SECTION */}
      <StatsSection setActivePage={setActivePage} />

      {/* 3. FEATURED PRODUCTS GRID */}
      <div id="products">
        <ProductGrid setActivePage={setActivePage} />
      </div>

    </main>
  );
};

export default Home;
