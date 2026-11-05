import React from 'react';

const LogosMarquee = () => {
  // Official logos from /public/Logos
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

  return (
    <section className="w-full bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-8 overflow-hidden relative transition-colors duration-300">
      {/* Marquee Animation Keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes logos-slide-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .logos-slider-track {
            display: flex;
            width: max-content;
            animation: logos-slide-left 25s linear infinite;
          }
          .logos-slider-track:hover {
            animation-play-state: paused;
          }
        `,
      }} />

      {/* Subtle Label / Header with Reduced Size Tick Mark */}
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <div className="inline-flex items-center justify-center gap-2.5">
          {/* Reduced-size verified tick mark on the heading */}
          <div className="w-4 h-4 rounded-full bg-green-50 dark:bg-emerald-950 border border-green-200 dark:border-emerald-600/60 flex items-center justify-center shrink-0">
            <svg className="w-2.5 h-2.5 text-green-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
            Our registrations support export operations across relevant product categories. Buyers can request current stamped copies before contracting.
          </p>
        </div>
      </div>

      {/* Edge Gradient Mask for Smooth Fade In/Out */}
      <div className="relative w-full overflow-hidden py-1">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

        {/* The Moving Slider track (slides towards the left side) */}
        <div className="logos-slider-track gap-10 sm:gap-14 items-center px-4 py-2">
          {loopedLogos.map((item, index) => (
            <div
              key={index}
              title={`${item.name} - ${item.fullName}`}
              className="relative flex-shrink-0 flex items-center justify-center h-20 sm:h-24 w-auto min-w-[140px] px-5 py-2.5 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group"
            >
              {/* Smaller Tick Mark fitted cleanly inside the certificate box */}
              <div 
                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 rounded-full bg-green-50 dark:bg-emerald-950 border border-green-200 dark:border-emerald-600 flex items-center justify-center shadow-xs z-10"
                title="Verified Regulatory Body"
              >
                <svg className="w-2.5 h-2.5 text-green-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span className="logo-fallback hidden text-sm font-bold text-slate-700 dark:text-slate-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosMarquee;
