import React from 'react';
import StatsSection from '../components/StatsSection';
import ProductGrid from '../components/ProductGrid';

const Home = ({ setActivePage }) => {
  return (
    <main className="w-full min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 font-sans overflow-hidden">
      
      {/* 
        1. HERO SECTION (Overlapping Text on Image)
      */}
      <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center font-sans overflow-hidden bg-zinc-950">
        
        {/* Background Hero Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=2000" 
            alt="Global Trade and Export Logistics" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Lighter Fade Overlays - Ensuring the image is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-zinc-950/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-black/20 pointer-events-none"></div>

        {/* Overlapping Hero Text Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
          <div className="max-w-3xl">
            
            {/* Trust & Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-950/90 border border-blue-500/40 text-blue-400 font-black text-xs uppercase tracking-widest rounded-full mb-6 shadow-md backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              PREMIUM EXPORT SOLUTIONS · GLOBAL AGRO COMMODITIES
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[0.95] mb-6 drop-shadow-md">
              Trade Without <br />
              Boundaries.
            </h1>

            {/* Subheading / Tagline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-100 font-medium max-w-2xl leading-relaxed drop-shadow-sm">
              Direct farm procurement connecting India’s harvest to global markets. Delivering premium basmati rice, spices, oil seeds, and certified agro-commodities worldwide with uncompromising standards.
            </p>

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
