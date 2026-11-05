import React from 'react';

const StatsSection = ({ setActivePage }) => {
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
    <section className="w-full bg-slate-50 py-16 md:py-24 font-sans border-b border-slate-200 overflow-hidden">
      
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

      {/* 1. 2 DIVISION TABLE (Directly below hero) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="relative flex flex-col items-center justify-center p-12 bg-white overflow-hidden group">
            <span className="absolute inset-0 flex items-center justify-center text-[130px] font-black text-slate-50 select-none pointer-events-none transition-transform group-hover:scale-105 duration-500">18</span>
            <h3 className="relative z-10 text-5xl md:text-6xl font-black text-blue-950 flex items-baseline">18<span className="text-orange-500 text-4xl">+</span></h3>
            <div className="relative z-10 w-12 h-1 bg-orange-500 mt-6 mb-4 rounded-full"></div>
            <p className="relative z-10 text-xs font-black text-slate-500 uppercase tracking-widest text-center">Products</p>
          </div>
          <div className="relative flex flex-col items-center justify-center p-12 bg-white overflow-hidden group">
            <span className="absolute inset-0 flex items-center justify-center text-[120px] font-black text-slate-50 select-none pointer-events-none transition-transform group-hover:scale-105 duration-500">250</span>
            <h3 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-black text-blue-950 flex items-baseline gap-2">250 <span className="text-orange-500 text-xl md:text-2xl tracking-tighter">G/L per day</span></h3>
            <div className="relative z-10 w-12 h-1 bg-orange-500 mt-6 mb-4 rounded-full"></div>
            <p className="relative z-10 text-xs font-black text-slate-500 uppercase tracking-widest text-center">Processing Capacity</p>
          </div>
        </div>
      </div>

      {/* 2. CENTERED HEADER, TITLE, SUBHEADING & REVIEW VERIFICATION DOCUMENTS BUTTON */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 md:mb-12">
        {/* Title: Verified Credentials */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-slate-200 shadow-sm text-slate-600 text-xs font-black uppercase tracking-widest rounded-full mb-6 mx-auto">
          <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified Credentials
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight leading-[1.1] mb-5">
          Export Registrations<br/>
          <span className="text-orange-500">Available to Verify</span>
        </h2>

        {/* Subheading */}
        <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed text-center max-w-2xl mx-auto mb-8">
          Our registrations support export operations across relevant product categories. Buyers can request current stamped copies before contracting.
        </p>

        {/* Clickable Text Link with Right Arrow in Dark Blue */}
        <div className="flex justify-center">
          <button 
            type="button"
            onClick={handleReviewClick}
            className="inline-flex items-center gap-2 text-blue-950 hover:text-blue-800 text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer group"
          >
            <span className="group-hover:underline underline-offset-4">Review Verification Documents</span>
            <svg 
              className="w-4 h-4 text-blue-950 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3. CERTIFICATES SLIDER (BELOW Export Registrations Available to Verify) */}
      <div className="w-full relative overflow-hidden pb-2">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee gap-8 sm:gap-12 items-center px-4 py-2">
          {loopedLogos.map((item, index) => (
            <div
              key={index}
              title={`${item.name} - ${item.fullName}`}
              className="relative flex-shrink-0 flex items-center justify-center h-20 sm:h-24 w-auto min-w-[150px] px-5 py-2.5 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all group"
            >
              {/* Smaller Tick Mark fitted cleanly inside the certificate box */}
              <div 
                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shadow-xs z-10"
                title="Verified Regulatory Body"
              >
                <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <img
                src={item.imagePath}
                alt={item.alt}
                className="max-h-14 sm:max-h-16 max-w-[170px] w-auto h-auto object-contain transition-transform group-hover:scale-105 duration-300"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement.querySelector('.logo-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <span className="logo-fallback hidden text-sm font-bold text-slate-700">
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
