import React from 'react';
import StatsSection from '../components/StatsSection';
import ProductGrid from '../components/ProductGrid';
import { useTheme } from '../context/ThemeContext';

const Home = ({ setActivePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main className={`w-full min-h-screen font-sans transition-colors duration-500 overflow-hidden relative ${
      isDark ? 'bg-[#020611] text-slate-100' : 'bg-[#f8fafc] text-[#0b1d3a]'
    }`}>

      {/* AMBIENT DYNAMIC GLOWING BLOBS (Matching About, Products & Inquire pages) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 -z-0 transition-opacity duration-700 bg-orange-400/20"></div>
      <div className={`absolute top-[450px] right-10 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-[#132649]/35' : 'bg-blue-600/10'
      }`}></div>
      <div className={`absolute top-[1200px] left-10 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-[#0d203e]/30' : 'bg-orange-500/10'
      }`}></div>
      <div className={`absolute bottom-32 right-12 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-[#132649]/30' : 'bg-blue-600/10'
      }`}></div>

      {/* 
        1. HERO SECTION - INTERNATIONAL MARITIME IMPORT/EXPORT TERMINAL AESTHETIC
        Solid, authoritative corporate trade presentation (Zero Glassmorphism)
      */}
      <section className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center font-sans overflow-hidden border-b border-slate-200 dark:border-[#132649]">
        
        {/* Background Freight & Shipping Port Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=2000" 
            alt="Global Trade and Export Logistics" 
            className="w-full h-full object-cover object-center scale-100"
          />
        </div>

        {/* Ambient Glowing Blobs inside Hero */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-25 z-0 bg-orange-400/20"></div>
        <div className={`absolute top-1/2 -right-16 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl z-0 ${
          isDark ? 'bg-[#132649]/40' : 'bg-blue-600/15'
        }`}></div>

        {/* Solid Corporate Maritime Overlays (High-Contrast, Pure Solid Depth, No Glass) */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-r from-[#020611] via-[#020611]/95 to-[#071326]/85'
            : 'bg-gradient-to-r from-[#0b1d3a] via-[#0b1d3a]/92 to-[#0b1d3a]/70'
        }`}></div>
        
        {/* Precision Architectural Grid for International Logistics */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

        {/* Hero Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
          <div className="max-w-3xl">
            
            {/* Commercial Trust & Export Dispatch Badge (Pill Shape, Solid, No Blur) */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-[#01040a] border border-orange-400/50 text-orange-300 font-black text-[11px] uppercase tracking-widest rounded-full mb-6 shadow-md">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              <span>PREMIUM EXPORT SOLUTIONS · GLOBAL AGRO COMMODITIES</span>
            </div>

            {/* Authoritative Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[0.98] mb-6 drop-shadow-md">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300">Trade Without</span><br />
              <span className="text-white">Boundaries.</span>
            </h1>

            {/* Subheading / Tagline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-100 font-medium max-w-2xl leading-relaxed drop-shadow-sm mb-8">
              Direct farm procurement connecting India’s harvest to global markets. Delivering premium basmati rice, spices, oil seeds, and certified agro-commodities worldwide with uncompromising standards.
            </p>

            {/* Solid Commercial Action Buttons (Zero Glassmorphism) */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActivePage && setActivePage('products')}
                className="px-8 py-4 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-400/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Explore Products
              </button>
              <button
                onClick={() => setActivePage && setActivePage('contact')}
                className="px-8 py-4 bg-[#020611] hover:bg-[#071326] border-2 border-white/20 hover:border-white/50 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Request Export Quote
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
