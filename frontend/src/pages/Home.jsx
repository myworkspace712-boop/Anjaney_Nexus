import React from 'react';
import StatsSection from '../components/StatsSection';
import ProductGrid from '../components/ProductGrid';
import { useTheme } from '../context/ThemeContext';

const Home = ({ setActivePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <main className={`w-full min-h-screen font-sans transition-colors duration-500 overflow-hidden relative ${
      isDark ? 'bg-[#0c192c] text-slate-100' : 'bg-[#f8fafc] text-[#0b1d3a]'
    }`}>

      {/* 
        1. HERO SECTION - INTERNATIONAL MARITIME IMPORT/EXPORT TERMINAL AESTHETIC
        Solid, authoritative corporate trade presentation (Zero Glassmorphism)
      */}
      <section className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center font-sans overflow-hidden border-b border-slate-200 dark:border-[#1e3c66]">
        
        {/* Background Freight & Shipping Port Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=2000" 
            alt="Global Trade and Export Logistics" 
            className="w-full h-full object-cover object-center scale-100"
          />
        </div>

        {/* Solid Corporate Maritime Overlays (High-Contrast, Pure Solid Depth, No Glass) */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-r from-[#0c192c] via-[#0c192c]/90 to-[#12243d]/80'
            : 'bg-gradient-to-r from-[#0b1d3a] via-[#0b1d3a]/92 to-[#0b1d3a]/70'
        }`}></div>
        
        {/* Precision Architectural Grid for International Logistics */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

        {/* Hero Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
          <div className="max-w-3xl">
            
            {/* Commercial Trust & Export Dispatch Badge (Solid, No Blur) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#081526] border border-orange-500/40 text-orange-400 font-black text-[11px] uppercase tracking-widest rounded-lg mb-6 shadow-md">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span>PREMIUM EXPORT SOLUTIONS · GLOBAL AGRO COMMODITIES</span>
            </div>

            {/* Authoritative Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[0.98] mb-6 drop-shadow-md">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400">Trade Without</span><br />
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
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Explore Products
              </button>
              <button
                onClick={() => setActivePage && setActivePage('contact')}
                className="px-8 py-4 bg-[#0a1a2e] hover:bg-[#122c4d] border-2 border-white/20 hover:border-white/50 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
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
