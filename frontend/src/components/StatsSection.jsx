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
    <section className={`w-full pt-12 sm:pt-16 md:pt-20 pb-16 md:pb-24 font-sans border-b transition-colors duration-500 overflow-hidden relative animate-fade-up ${
      isDark 
        ? 'bg-gradient-to-b from-[#141312] via-[#1a1816] to-[#141312] text-slate-100 border-[#2d261e]' 
        : 'bg-gradient-to-b from-[#fcfbf8] via-[#f7f4ee] to-[#f4efe4] text-[#0b1d3a] border-[#e8e2d4]'
    }`}>

      {/* MARITIME TRADE & LOGISTICS BACKGROUND OVERLAY */}
      <div className={`absolute inset-0 pointer-events-none -z-0 transition-opacity duration-700 ${
        isDark ? 'bg-trade-grid-dark opacity-80' : 'bg-trade-grid-light opacity-75'
      }`}></div>

      {/* AMBIENT DYNAMIC MARITIME TRADE BEACONS */}
      <div className="absolute -top-12 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl opacity-25 z-0 bg-gradient-to-br from-[#c99a42]/30 via-[#dfb25b]/20 to-[#c99a42]/10 animate-maritime-drift"></div>
      <div className={`absolute top-1/2 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl z-0 transition-opacity duration-700 animate-float-slow ${
        isDark ? 'bg-gradient-to-tr from-[#c99a42]/20 via-[#a67c2e]/15 to-transparent' : 'bg-gradient-to-tr from-[#c99a42]/18 via-[#dfb25b]/20 to-transparent'
      }`}></div>
      <div className={`absolute -bottom-16 right-10 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl z-0 transition-opacity duration-700 animate-maritime-drift ${
        isDark ? 'bg-gradient-to-bl from-[#c99a42]/20 via-[#dfb25b]/15 to-transparent' : 'bg-gradient-to-bl from-[#c99a42]/18 via-[#dfb25b]/16 to-transparent'
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
          animation: fadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative z-20 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 sm:gap-8 md:gap-12">
          
          {/* Left Side: Statement Text */}
          <div className="text-left flex-1 max-w-xl pt-2 sm:pt-4">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-[1.15] ${
              isDark ? 'text-white' : 'text-[#0b1d3a]'
            }`}>
              Company fueled by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-[#c99a42] to-amber-500 dark:from-orange-400 dark:via-[#dfb25b] dark:to-amber-300">passion for logistics</span>
            </h2>
          </div>

          {/* Right Side: Forklift Image (Broadened, Square, Positioned slightly below text on the right) */}
          <div className="shrink-0 flex justify-end self-end sm:self-auto mt-4 sm:mt-10 md:mt-14">
            <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 shadow-xl w-52 sm:w-64 md:w-72 lg:w-80 aspect-square p-2 backdrop-blur-md ${
              isDark 
                ? 'bg-[#1f1b17] border-[#332b21] shadow-[0_14px_35px_rgba(0,0,0,0.5)]' 
                : 'bg-[#f7f4ee] border-[#e8e2d4] shadow-[0_14px_35px_rgba(201,154,66,0.12)]'
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 relative z-20 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          
          {/* Left Side: Dockyard Image (Larger in size) */}
          <div className="shrink-0 flex justify-center sm:justify-start">
            <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 shadow-2xl w-full sm:w-[360px] md:w-[440px] lg:w-[500px] xl:w-[540px] p-2.5 sm:p-3 backdrop-blur-md ${
              isDark 
                ? 'bg-[#1f1b17] border-[#332b21] shadow-[0_16px_40px_rgba(0,0,0,0.6)]' 
                : 'bg-[#f7f4ee] border-[#e8e2d4] shadow-[0_16px_40px_rgba(201,154,66,0.12)]'
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
        <div className="relative p-6 sm:p-8 rounded-3xl backdrop-blur-md bg-gradient-to-b from-transparent via-[#f7f4ee]/80 to-transparent dark:via-[#1f1b17]/80">
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
                  ? 'border-[#332b21] bg-[#1f1b17] text-white hover:border-[#c99a42] hover:text-[#dfb25b]' 
                  : 'border-[#e8e2d4] bg-[#f7f4ee] text-blue-950 hover:border-[#c99a42] hover:text-[#c99a42]'
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

      {/* 3. CERTIFICATES SLIDER - SOLID REGULATORY REGISTRY CARDS */}
      <div className="w-full relative overflow-hidden pb-4">
        
        {/* Solid Edge Fades (Pure solid gradient matching background, no blur) */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r ${
          isDark ? 'from-[#141312]' : 'from-[#fcfbf8]'
        } to-transparent z-10 pointer-events-none`}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l ${
          isDark ? 'from-[#141312]' : 'from-[#fcfbf8]'
        } to-transparent z-10 pointer-events-none`}></div>

        <div className="animate-marquee gap-6 sm:gap-8 items-center px-4 py-2">
          {loopedLogos.map((item, index) => (
            <div
              key={index}
              title={`${item.name} - ${item.fullName}`}
              className={`relative flex-shrink-0 flex items-center justify-center h-20 sm:h-24 w-auto min-w-[170px] px-6 py-3 rounded-xl border-2 transition-all duration-300 group ${
                isDark 
                  ? 'bg-[#1f1b17] border-[#332b21] hover:border-[#c99a42] shadow-md hover:shadow-[0_10px_25px_rgba(201,154,66,0.15)]' 
                  : 'bg-[#f7f4ee] border-[#e8e2d4] hover:border-[#c99a42] shadow-[0_4px_16px_rgba(201,154,66,0.06)] hover:shadow-[0_10px_25px_rgba(201,154,66,0.15)]'
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
