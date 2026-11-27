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
        ? 'bg-gradient-to-b from-[#0a0f1d] via-[#0d1527] to-[#0a0f1d] text-slate-100 border-slate-800' 
        : 'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] text-[#0b1d3a] border-slate-200'
    }`}>

      {/* MARITIME TRADE & LOGISTICS BACKGROUND OVERLAY */}
      <div className={`absolute inset-0 pointer-events-none -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-trade-grid-dark opacity-80' : 'bg-trade-grid-light opacity-75'
      }`}></div>

      {/* AMBIENT DYNAMIC MARITIME TRADE BEACONS */}
      <div className="absolute -top-12 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl opacity-25 z-0 bg-gradient-to-br from-sky-500/20 via-blue-500/15 to-transparent animate-maritime-drift"></div>
      <div className={`absolute top-1/2 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl z-0 transition-opacity duration-700 animate-float-slow ${
        isDark ? 'bg-gradient-to-tr from-sky-500/15 via-blue-600/15 to-transparent' : 'bg-gradient-to-tr from-sky-500/15 via-blue-500/15 to-transparent'
      }`}></div>
      <div className={`absolute -bottom-16 right-10 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl z-0 transition-opacity duration-700 animate-maritime-drift ${
        isDark ? 'bg-gradient-to-bl from-cyan-500/15 via-sky-500/15 to-transparent' : 'bg-gradient-to-bl from-sky-500/15 via-blue-500/15 to-transparent'
      }`}></div>
      
      {/* ANIMATION KEYFRAMES (Fade-Up & Marquee) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translate3d(0, 32px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 1.05s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
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

      {/* 1. COMPANY FUELED BY PASSION FOR LOGISTICS (Left Text, Right Forklift Image) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative z-20">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 sm:gap-8 md:gap-12">
          
          {/* Left Side: Statement Text */}
          <div className="text-left flex-1 max-w-xl pt-2 sm:pt-4">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-[1.15] ${
              isDark ? 'text-white' : 'text-[#0b1d3a]'
            }`}>
              Company fueled by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 dark:from-orange-400 dark:via-amber-300 dark:to-orange-300">passion for logistics</span>
            </h2>
          </div>

          {/* Right Side: Forklift Image (Broadened, Square, Positioned slightly below text on the right) */}
          <div className="shrink-0 flex justify-end self-end sm:self-auto mt-4 sm:mt-10 md:mt-14">
            <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 shadow-xl w-52 sm:w-64 md:w-72 lg:w-80 aspect-square p-2 backdrop-blur-md ${
              isDark 
                ? 'bg-[#0f172a] border-slate-800 shadow-[0_14px_35px_rgba(0,0,0,0.5)]' 
                : 'bg-white border-slate-200 shadow-[0_14px_35px_rgba(14,165,233,0.1)]'
            }`}>
              <img 
                src="/images/forklift.jpg" 
                alt="Company fueled by passion for logistics" 
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. DOCKYARD LOGISTICS (Larger Dockyard Image on Left, Paragraph beside it on Right) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 relative z-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          
          {/* Left Side: Dockyard Image (Larger in size) */}
          <div className="shrink-0 flex justify-center sm:justify-start">
            <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 shadow-2xl w-full sm:w-[360px] md:w-[440px] lg:w-[500px] xl:w-[540px] p-2.5 sm:p-3 backdrop-blur-md ${
              isDark 
                ? 'bg-[#0f172a] border-slate-800 shadow-[0_16px_40px_rgba(0,0,0,0.6)]' 
                : 'bg-white border-slate-200 shadow-[0_16px_40px_rgba(14,165,233,0.1)]'
            }`}>
              <img 
                src="/images/dockyard.jpg" 
                alt="Global Maritime Trade & Dockyard Logistics" 
                className="w-full h-auto object-cover rounded-xl sm:rounded-2xl"
              />
            </div>
          </div>

          {/* Right Side: Company Paragraph (Adjusted towards the right, besides image) */}
          <div className="text-left flex-1 max-w-lg lg:max-w-xl">
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-medium ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              We coordinate certified farm-gate procurement, Sortex grading, and containerized ocean freight to deliver premium agro-commodities worldwide with uncompromising purity and schedule reliability.
            </p>
          </div>

        </div>
      </div>

      {/* 2. CENTERED HEADER, TITLE, SUBHEADING & REVIEW VERIFICATION DOCUMENTS BUTTON */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 md:mb-16 relative z-10">
        <div className="relative p-6 sm:p-8 rounded-3xl backdrop-blur-md bg-gradient-to-b from-transparent via-slate-100/80 to-transparent dark:via-[#0f172a]/80">
          {/* Title: Verified Credentials (Solid Badge) */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-orange-50 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-400/30 mb-6 mx-auto shadow-xs">
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
                  ? 'border-slate-800 bg-[#0f172a] text-white hover:border-sky-400 hover:text-sky-300' 
                  : 'border-slate-200 bg-white text-slate-900 hover:border-sky-500 hover:text-sky-600'
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
      </div>

      {/* 3. STATIC LARGE CERTIFICATES & REGULATORY REGISTRY CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6 lg:gap-6">
          {logos.map((item, index) => (
            <div
              key={index}
              title={`${item.name} - ${item.fullName}`}
              className={`relative flex flex-col items-center justify-between min-h-[220px] sm:min-h-[250px] p-6 sm:p-7 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 group ${
                isDark 
                  ? 'bg-[#0f172a] border-slate-800 hover:border-sky-400 shadow-lg hover:shadow-[0_16px_36px_rgba(14,165,233,0.18)] hover:-translate-y-1.5' 
                  : 'bg-white border-slate-200 hover:border-sky-500 shadow-md hover:shadow-[0_16px_36px_rgba(14,165,233,0.15)] hover:-translate-y-1.5'
              }`}
            >
              {/* Official Registration Verified Tick Badge (Pointed Flower Badge) */}
              <div 
                className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-6 h-6 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110"
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

              {/* Large Certificate Logo Container */}
              <div className="w-full h-24 sm:h-28 flex items-center justify-center p-2 mt-1 mb-4">
                <img
                  src={item.imagePath}
                  alt={item.alt}
                  className="max-h-20 sm:max-h-24 max-w-[170px] w-auto h-auto object-contain transition-transform group-hover:scale-105 duration-300"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement.querySelector('.logo-fallback');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <span className={`logo-fallback hidden text-base font-bold ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  {item.name}
                </span>
              </div>

              {/* Card Bottom Details: Title & Full Regulatory Authority */}
              <div className="w-full text-center pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                <h3 className="text-sm sm:text-base font-black text-blue-950 dark:text-white uppercase tracking-wider transition-colors">
                  {item.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.fullName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default StatsSection;
