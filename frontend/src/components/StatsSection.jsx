import React from 'react';
import { useTheme } from '../context/ThemeContext';

const StatsSection = ({ setActivePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Official regulatory authority & registration certificates
  const logos = [
    {
      name: 'APEDA',
      fullName: 'Agricultural and Processed Food Products Export Development Authority',
      imagePath: '/Logos/apeda.jpg',
      alt: 'APEDA Logo',
    },
    {
      name: 'SPICES BOARD',
      fullName: 'Spices Board of India, Govt. of India, Ministry of Commerce & Industry',
      imagePath: '/Logos/spices-board.svg',
      alt: 'Spices Board Logo',
    },
    {
      name: 'DGFT',
      fullName: 'Directorate General of Foreign Trade, Ministry of Commerce',
      imagePath: '/Logos/dgft.jpg',
      alt: 'DGFT Logo',
    },
    {
      name: 'FSSAI',
      fullName: 'Food Safety and Standards Authority of India',
      imagePath: '/Logos/fssai.jpg',
      alt: 'FSSAI Logo',
    },
    {
      name: 'MSME',
      fullName: 'Ministry of Micro, Small and Medium Enterprises',
      imagePath: '/Logos/msme.jpg',
      alt: 'MSME Logo',
    },
  ];

  // Repeat items to ensure seamless infinite looping marquee
  const loopedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  const handleReviewClick = () => {
    if (typeof setActivePage === 'function') {
      setActivePage('certificates');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/certificates';
    }
  };

  return (
    <section className={`w-full pt-12 sm:pt-16 md:pt-20 pb-16 md:pb-24 font-sans border-b transition-colors duration-500 overflow-hidden relative ${
      isDark 
        ? 'bg-[#020611] text-slate-100 border-[#132649]' 
        : 'bg-[#f8fafc] text-[#0b1d3a] border-slate-200/90'
    }`}>

      {/* AMBIENT GLOWING BLOBS */}
      <div className="absolute -top-12 right-1/4 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 z-0 bg-orange-400/20"></div>
      <div className={`absolute top-1/2 -left-20 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl z-0 ${
        isDark ? 'bg-[#132649]/35' : 'bg-blue-600/10'
      }`}></div>
      <div className={`absolute -bottom-16 right-10 w-[400px] h-[400px] rounded-full pointer-events-none blur-3xl z-0 ${
        isDark ? 'bg-[#0d203e]/30' : 'bg-orange-500/10'
      }`}></div>
      
      {/* MARQUEE ANIMATION CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scroll-left 25s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* 1. 2 DIVISION TABLE - SOLID COMMERCIAL PERFORMANCE METRICS (Sits cleanly below hero) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Stat Card 1: 18+ Products */}
          <div className={`relative flex flex-col p-8 sm:p-10 rounded-2xl border-2 transition-all duration-300 group hover:-translate-y-1 ${
            isDark 
              ? 'bg-[#071326] border-[#132649] hover:border-orange-400 shadow-xl' 
              : 'bg-white border-slate-200 hover:border-orange-500 shadow-lg'
          }`}>
            {/* Metric Body */}
            <div className="flex flex-col items-start flex-grow justify-center">
              <h3 className="text-5xl sm:text-6xl font-black text-blue-900 dark:text-sky-400 flex items-baseline tracking-tight">
                18<span className="text-orange-500 dark:text-orange-400 text-4xl ml-1">+</span>
              </h3>
              <div className="w-14 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 mt-4 mb-3 rounded-full"></div>
              <p className={`text-lg font-black uppercase tracking-wider ${
                isDark ? 'text-white' : 'text-[#0b1d3a]'
              }`}>
                Products
              </p>
              <p className={`text-sm mt-2 font-medium leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Premium basmati, spices, oil seeds, edible oils & processed food commodities.
              </p>
            </div>
          </div>

          {/* Stat Card 2: 250 G/L per day Processing Capacity */}
          <div className={`relative flex flex-col p-8 sm:p-10 rounded-2xl border-2 transition-all duration-300 group hover:-translate-y-1 ${
            isDark 
              ? 'bg-[#071326] border-[#132649] hover:border-orange-400 shadow-xl' 
              : 'bg-white border-slate-200 hover:border-orange-500 shadow-lg'
          }`}>
            {/* Metric Body */}
            <div className="flex flex-col items-start flex-grow justify-center">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-900 dark:text-sky-400 flex items-baseline gap-2 tracking-tight">
                250 <span className="text-orange-500 dark:text-orange-400 text-xl sm:text-2xl font-black tracking-tighter">G/L per day</span>
              </h3>
              <div className="w-14 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 mt-4 mb-3 rounded-full"></div>
              <p className={`text-lg font-black uppercase tracking-wider ${
                isDark ? 'text-white' : 'text-[#0b1d3a]'
              }`}>
                Processing Capacity
              </p>
              <p className={`text-sm mt-2 font-medium leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Automated cleaning, grading, Sortex sorting, and vacuum/bulk export packaging lines.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. CENTERED HEADER, TITLE, SUBHEADING & REVIEW VERIFICATION DOCUMENTS BUTTON */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 md:mb-16 relative z-10">
        
        {/* Title: Verified Credentials (Solid Badge) */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-[#01040a] text-orange-400 border border-orange-400/30 mb-6 mx-auto shadow-sm">
          <svg className="w-4 h-4 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Verified Credentials</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-900 dark:text-white tracking-tight leading-[1.15] mb-5">
          Export Registrations<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 dark:from-orange-300 dark:via-orange-400 dark:to-amber-300">
            Available to Verify
          </span>
        </h2>

        {/* Subheading */}
        <p className={`text-xs sm:text-sm font-medium leading-relaxed text-center max-w-2xl mx-auto mb-8 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Our registrations support export operations across relevant product categories. Buyers can request current stamped copies before contracting.
        </p>

        {/* Clickable Action Button (Solid Corporate Trade Button) */}
        <div className="flex justify-center">
          <button 
            type="button"
            onClick={handleReviewClick}
            className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border-2 font-black text-xs uppercase tracking-wider transition-all duration-300 group cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0 ${
              isDark 
                ? 'border-[#132649] bg-[#071326] text-white hover:border-orange-400 hover:text-orange-300' 
                : 'border-slate-300 bg-white text-blue-950 hover:border-orange-500 hover:text-orange-600'
            }`}
          >
            <span>Review Verification Documents</span>
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-orange-500 dark:text-orange-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3. CERTIFICATES SLIDER - SOLID REGULATORY REGISTRY CARDS */}
      <div className="w-full relative overflow-hidden pb-4">
        
        {/* Solid Edge Fades (Pure solid gradient matching background, no blur) */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r ${
          isDark ? 'from-[#020611]' : 'from-[#f8fafc]'
        } to-transparent z-10 pointer-events-none`}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l ${
          isDark ? 'from-[#020611]' : 'from-[#f8fafc]'
        } to-transparent z-10 pointer-events-none`}></div>

        <div className="animate-marquee gap-6 sm:gap-8 items-center px-4 py-2">
          {loopedLogos.map((item, index) => (
            <div
              key={index}
              title={`${item.name} - ${item.fullName}`}
              className={`relative flex-shrink-0 flex items-center justify-center h-20 sm:h-24 w-auto min-w-[170px] px-6 py-3 rounded-xl border-2 transition-all duration-300 group hover:-translate-y-1 ${
                isDark 
                  ? 'bg-[#071326] border-[#132649] hover:border-orange-400 shadow-md' 
                  : 'bg-white border-slate-200 hover:border-orange-500 shadow-sm'
              }`}
            >
              {/* Official Registration Verified Tick Badge (Pointed Flower Badge) */}
              <div 
                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110"
                title="Verified Regulatory Body"
              >
                <svg 
                  className="w-full h-full drop-shadow-xs" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  {/* Pointed Flower Background */}
                  <path 
                    d="M12 1.5 L14.87 5.07 L19.42 4.58 L18.93 9.13 L22.5 12 L18.93 14.87 L19.42 19.42 L14.87 18.93 L12 22.5 L9.13 18.93 L4.58 19.42 L5.07 14.87 L1.5 12 L5.07 9.13 L4.58 4.58 L9.13 5.07 Z" 
                    className="fill-green-500/15 dark:fill-green-400/20 stroke-green-500 dark:stroke-green-400" 
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                  {/* Centered Green Checkmark / Tick */}
                  <path 
                    d="m9 12 2 2 4-4" 
                    className="stroke-green-600 dark:stroke-green-400" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </div>

              <img
                src={item.imagePath}
                alt={item.alt}
                className="max-h-12 sm:max-h-14 max-w-[150px] w-auto h-auto object-contain transition-transform group-hover:scale-105 duration-300"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement.querySelector('.logo-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <span className={`logo-fallback hidden text-sm font-bold ${
                isDark ? 'text-slate-200' : 'text-slate-700'
              }`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default StatsSection;
