import React, { useState, useEffect, useCallback } from 'react';

// 5 Carousel Slides: 2 commodity images (Cashew Nuts & Basmati Rice) + 3 empty slots
const CAROUSEL_SLIDES = [
  {
    id: 1,
    name: 'Cashew Nuts',
    tag: 'Export Grade · W-240 / W-320',
    subtitle: 'Nutrient-dense nuts packed with heart-healthy unsaturated fats and plant-based protein.',
    image: '/images/CashewNuts.png',
    fallback: '/images/CashewNuts.jpg',
    isEmpty: false,
  },
  {
    id: 2,
    name: 'Basmati Rice',
    tag: '1121 & 1509 Aged Long Grain',
    subtitle: 'Premium grades feature extra-long grains (8.2 mm or longer) that grow up to twice their size when cooked.',
    image: '/images/BasmatiRice.png',
    fallback: '/images/Bas_Rice.jpg',
    isEmpty: false,
  },
  {
    id: 3,
    name: 'Empty Image Slot 3',
    tag: 'Slot 03',
    subtitle: 'Slot reserved for upcoming commodity image',
    image: '',
    fallback: '',
    isEmpty: true,
  },
  {
    id: 4,
    name: 'Empty Image Slot 4',
    tag: 'Slot 04',
    subtitle: 'Slot reserved for upcoming commodity image',
    image: '',
    fallback: '',
    isEmpty: true,
  },
  {
    id: 5,
    name: 'Empty Image Slot 5',
    tag: 'Slot 05',
    subtitle: 'Slot reserved for upcoming commodity image',
    image: '',
    fallback: '',
    isEmpty: true,
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const [animId, setAnimId] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((newIndex) => {
    setCurrentSlide((prev) => {
      if (prev === newIndex) return prev;
      setPrevSlideIndex(prev);
      setAnimId((id) => id + 1);
      return newIndex;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev === CAROUSEL_SLIDES.length - 1 ? 0 : prev + 1;
      setPrevSlideIndex(prev);
      setAnimId((id) => id + 1);
      return next;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1;
      setPrevSlideIndex(prev);
      setAnimId((id) => id + 1);
      return next;
    });
  }, []);

  // Autoplay carousel every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div 
      className="relative w-full h-[70vh] min-h-[500px] max-h-[750px] bg-slate-950 overflow-hidden select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* 1. SLIDES CONTAINER */}
      {CAROUSEL_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {slide.isEmpty ? (
              /* EMPTY SLIDES (Slots 3, 4, 5) */
              <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none"></div>

                {/* Centered Empty State Frame */}
                <div className="relative z-10 border-2 border-dashed border-slate-700/80 rounded-2xl p-8 sm:p-12 max-w-md w-full mx-6 text-center bg-slate-950/60 backdrop-blur-sm shadow-2xl">
                  <div className="w-20 h-20 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500 shadow-inner">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-300">
                    {slide.name}
                  </h3>
                </div>
              </div>
            ) : (
              /* FILLED SLIDES (Cashew Nuts & Basmati Rice) */
              <div className="w-full h-full relative overflow-hidden">
                {/* Commodity Image */}
                <img
                  src={slide.image}
                  alt={slide.name}
                  onError={(e) => {
                    if (slide.fallback && e.currentTarget.src !== slide.fallback) {
                      e.currentTarget.src = slide.fallback;
                    }
                  }}
                  className="w-full h-full object-cover object-center"
                />

                {/* Overlays for depth and text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/40 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>

                {/* Bottom Left Title & Description */}
                <div className="absolute bottom-16 sm:bottom-20 left-6 sm:left-12 lg:left-16 max-w-2xl z-20">
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md mb-2">
                    {slide.name}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-200 font-medium drop-shadow leading-relaxed max-w-xl">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* 2. TOP RIGHT SLIDE COUNTER */}
      <div className="absolute top-6 right-6 sm:right-10 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-white shadow-lg">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
        <span>0{currentSlide + 1} / 0{CAROUSEL_SLIDES.length}</span>
      </div>

      {/* 3. NAVIGATION CONTROLS (Left & Right Arrows) */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-orange-500 border border-white/20 hover:border-orange-500 text-white flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
        aria-label="Previous Slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-orange-500 border border-white/20 hover:border-orange-500 text-white flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
        aria-label="Next Slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 4. BOTTOM PAGINATION INDICATORS (Horizontal Pill in Motion -> Merges into Dot) */}
      {(() => {
        const STEP = 24; // 10px dot + 14px gap
        const fromPos = prevSlideIndex * STEP;
        const toPos = currentSlide * STEP;
        const midPos = (fromPos + toPos) / 2;
        const pillWidth = 34;
        const pillLeft = midPos - (pillWidth - 10) / 2;

        return (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
            {animId > 0 && (
              <style>{`
                @keyframes heroPillMorph_${animId} {
                  0% {
                    left: ${fromPos}px;
                    width: 10px;
                  }
                  45% {
                    left: ${pillLeft}px;
                    width: ${pillWidth}px;
                  }
                  100% {
                    left: ${toPos}px;
                    width: 10px;
                  }
                }
              `}</style>
            )}
            <div className="relative flex items-center gap-[14px]">
              {/* Static Background Dots (all same orange colour) */}
              {CAROUSEL_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className="w-2.5 h-2.5 rounded-full bg-orange-500/35 hover:bg-orange-500/70 transition-colors cursor-pointer"
                  title={slide.isEmpty ? `Slide ${idx + 1}: Empty` : `Slide ${idx + 1}: ${slide.name}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}

              {/* Active Moving Pill that merges into the dot */}
              <span
                key={animId}
                className="absolute top-0 h-2.5 rounded-full bg-orange-500 shadow-md shadow-orange-500/60 pointer-events-none"
                style={{
                  left: `${toPos}px`,
                  width: '10px',
                  animation: animId > 0 ? `heroPillMorph_${animId} 550ms cubic-bezier(0.4, 0, 0.2, 1) forwards` : 'none',
                }}
              />
            </div>
          </div>
        );
      })()}

    </div>
  );
};

export default HeroSection;
