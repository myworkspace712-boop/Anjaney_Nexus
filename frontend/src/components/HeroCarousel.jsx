import React, { useState, useEffect, useCallback } from 'react';

// 5 High-Quality B2B Export & Commodity Slides
const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2000&auto=format&fit=crop', // Cargo Ship / Port
    subtitle: 'Global B2B Procurement',
    title: 'Turning Boundaries Into',
    highlight: 'Opportunities',
    desc: 'Your trusted partner for international bulk export of premium agricultural commodities, spices, and wholesale ingredients across Asia and the Middle East.',
    primaryCta: 'Explore Catalog',
    primaryAction: 'products',
    secondaryCta: 'Request Bulk Quote',
    secondaryAction: 'cart',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop', // Spices
    subtitle: 'Export-Grade Quality',
    title: 'Premium Indian',
    highlight: 'Spices',
    desc: 'From high-curcumin Turmeric to intense Guntur Chillies and aromatic Cardamom. Sourced directly from farms, processed, and packed for global wholesale.',
    primaryCta: 'View Spices',
    primaryAction: 'products',
    secondaryCta: 'Start RFQ',
    secondaryAction: 'cart',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2000&auto=format&fit=crop', // Agriculture / Rice
    subtitle: 'Wholesale Agriculture',
    title: 'Finest Basmati &',
    highlight: 'Grains',
    desc: 'Supplying standard to XXXL Premium grade Basmati and Non-Basmati rice. Sortex-cleaned, naturally aged, and ready for containerized sea freight.',
    primaryCta: 'View Agriculture',
    primaryAction: 'products',
    secondaryCta: 'Contact Sales',
    secondaryAction: 'cart',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2000&auto=format&fit=crop', // Warehouse / Logistics
    subtitle: 'Reliable Supply Chain',
    title: 'Seamless Container',
    highlight: 'Logistics',
    desc: 'End-to-end export management offering FOB, CIF, and CFR Incoterms. We handle the phytosanitary certifications, customs clearance, and port loading.',
    primaryCta: 'Create RFQ',
    primaryAction: 'cart',
    secondaryCta: 'View Products',
    secondaryAction: 'products',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=2000&auto=format&fit=crop', // Edible Oils / Fields
    subtitle: 'Bulk Ingredients',
    title: 'Edible Oils &',
    highlight: 'Oil Seeds',
    desc: 'High-yield Sesame, Soyabean, and Groundnut exports, alongside refined wholesale edible oils tailored for international food manufacturing.',
    primaryCta: 'Browse Catalog',
    primaryAction: 'products',
    secondaryCta: 'Bulk Inquiries',
    secondaryAction: 'cart',
  },
];

const HeroCarousel = ({ setActivePage = () => {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  // Autoplay functionality (6 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const slideInterval = setInterval(nextSlide, 6000);
    return () => clearInterval(slideInterval);
  }, [isPaused, nextSlide]);

  return (
    <div 
      // 'group' class controls hover state for child elements (e.g. desktop hover arrows)
      className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] bg-slate-950 overflow-hidden group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              />
            </div>

            {/* Dark Gradient Overlay for High Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div 
                className={`max-w-2xl transition-all duration-1000 delay-300 transform ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 sm:mb-6">
                  {slide.subtitle}
                </span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-4 sm:mb-6">
                  {slide.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                    {slide.highlight}
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 mb-8 sm:mb-10 leading-relaxed max-w-xl">
                  {slide.desc}
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActivePage(slide.primaryAction)}
                    className="px-6 sm:px-8 py-3.5 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] active:scale-95 cursor-pointer"
                  >
                    {slide.primaryCta}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePage(slide.secondaryAction)}
                    className="px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent hover:bg-slate-800 text-white border border-slate-600 hover:border-slate-400 font-bold rounded-xl text-sm uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                  >
                    {slide.secondaryCta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrow: Left (Previous) */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-slate-900/60 hover:bg-orange-500 backdrop-blur-md border border-slate-700 hover:border-orange-500 text-white cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 shadow-xl active:scale-90"
        aria-label="Previous Slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Navigation Arrow: Right (Next) */}
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-slate-900/60 hover:bg-orange-500 backdrop-blur-md border border-slate-700 hover:border-orange-500 text-white cursor-pointer opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 shadow-xl active:scale-90"
        aria-label="Next Slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Progress Indicators (Bottom Center) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              currentSlide === index
                ? 'w-10 h-1.5 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]'
                : 'w-2 h-1.5 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
