import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';

const Home = ({ setActivePage }) => {
  
  // Array of 6 products with hover specifications and catalog images
  const signatureProducts = [
    {
      name: "Basmati Rice",
      badge: "FLAGSHIP GRAIN",
      image: "/images/BasmatiRice.png",
      fallbackImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "1121 Basmati (Extra Long Grain)",
        "1509 Basmati Sella & Steam",
        "IR 64 White & Parboiled",
        "Swarna • 100% Broken"
      ],
      linkText: "EXPLORE ALL VARIETIES"
    },
    {
      name: "Indian Spices",
      badge: "EXPORT QUALITY",
      image: "/images/Turmeric.png",
      fallbackImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Salem & Nizamabad Turmeric Fingers",
        "Machine Cleaned Cumin Seeds",
        "Eagle Green Coriander Seeds",
        "Black Pepper, Cloves & Whole Spices"
      ],
      linkText: "EXPLORE ALL VARIETIES"
    },
    {
      name: "Green Cardamom",
      badge: "PREMIUM AROMATICS",
      image: "/images/Cardamom.png",
      fallbackImage: "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Kerala Idukki Green Cardamom (7mm - 8mm+)",
        "Deep Natural Green • High Essential Oil",
        "Handpicked & Color Sorted",
        "Aroma-Locked Multi-Layer Packaging"
      ],
      linkText: "EXPLORE ALL VARIETIES"
    },
    {
      name: "Cashew Nuts",
      badge: "GRADE W-180 TO W-320",
      image: "/images/CashewNuts.png",
      fallbackImage: "https://images.unsplash.com/photo-1509912760195-465492211993?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Whole White Cashews (W180, W210, W240, W320)",
        "Zero Adulteration • Nitrogen Flushed",
        "Crunchy Texture & Natural Sweetness",
        "Certified Phytosanitary & APEDA Compliant"
      ],
      linkText: "EXPLORE ALL VARIETIES"
    },
    {
      name: "Almonds",
      badge: "SELECT HARVEST",
      image: "/images/Almonds.png",
      fallbackImage: "https://images.unsplash.com/photo-1508061252224-43775270e309?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Premium California & Nonpareil Grade",
        "Uniform Kernel Size & Golden Texture",
        "High Protein & Vitamin E Rich",
        "Moisture Sealed Wholesale Packaging"
      ],
      linkText: "EXPLORE ALL VARIETIES"
    },
    {
      name: "Oil Seeds & Sesame",
      badge: "PREMIUM SEEDS",
      image: "/images/SesameSeeds.png",
      fallbackImage: "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
      highlights: [
        "Natural White & Hulled Sesame Seeds",
        "High-Yield Export Soyabean",
        "Export-Grade Ground Nut",
        "Purity: 99.95% Auto-Sorted"
      ],
      linkText: "EXPLORE ALL VARIETIES"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. The Hero Carousel Section */}
      <HeroSection setActivePage={setActivePage} />

      {/* 2. Turning Boundaries Into Opportunities Section */}
      <section className="relative w-full pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden bg-white dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-slate-800">
        
        {/* Subtle Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-50 dark:bg-orange-500/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-50 dark:bg-indigo-900/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500 text-white dark:bg-orange-500/10 dark:text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
              Anjaney Nexus India LLP
            </span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-indigo-950 dark:text-white tracking-tight leading-[1.05] mb-6">
              Turning Boundaries <br className="hidden md:block" />
              Into <span className="text-orange-500">Opportunities.</span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium mb-10 max-w-lg leading-relaxed">
              Your Trusted Professional Procurement Solutions Provider Across Asia. We provide reliable and efficient foreign trade services to serve your agricultural and commodity requirements.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setActivePage && setActivePage('products')}
                className="px-8 py-4 bg-indigo-950 hover:bg-orange-500 dark:bg-indigo-500 dark:hover:bg-orange-400 text-white dark:text-black font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-xl hover:shadow-orange-500/25 cursor-pointer"
              >
                Explore Catalogue
              </button>
              <button 
                onClick={() => setActivePage && setActivePage('certificates')}
                className="px-8 py-4 bg-white dark:bg-[#111] hover:bg-slate-50 dark:hover:bg-black text-indigo-950 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-sm flex items-center gap-3 cursor-pointer"
              >
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verify Credentials
              </button>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/10 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <img 
              src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1200" 
              alt="Global Trade and Logistics" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay to ensure logo/text contrast if added later */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-indigo-950/20 to-transparent"></div>
          </div>

        </div>
      </section>

      {/* 3. Export Registrations, Certificates Marquee & Metrics Grid */}
      <StatsSection setActivePage={setActivePage} />

      {/* 4. Product Catalogue */}
      <section className="w-full bg-white py-16 md:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Section Header - Centered in the middle of the screen */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-xs font-black text-orange-500 uppercase tracking-widest mb-3 inline-block">
              Product Catalogue
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight mb-4">
              Our Exports
            </h2>
            <p className="text-sm font-medium text-slate-500 max-w-xl mx-auto leading-relaxed mb-6">
              A focused selection of India's finest agro-commodities. Hover over any product to view brief specifications.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setActivePage && setActivePage('products')}
                className="px-8 py-3.5 bg-white border border-slate-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 text-blue-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-sm cursor-pointer"
              >
                View Full Catalog
              </button>
            </div>
          </div>

          {/* 6-Product Grid with Hover Specification Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {signatureProducts.map((product, index) => (
              <div 
                key={index} 
                onClick={() => setActivePage && setActivePage('products')}
                className="relative h-[460px] sm:h-[480px] w-full rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-800/10"
              >
                {/* Background Image with Zoom on Hover */}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
                      e.currentTarget.src = product.fallbackImage;
                    }
                  }}
                />
                
                {/* Permanent dark gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>

                {/* Darker gradient overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content Container */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                  
                  {/* Always visible Headers (Slides slightly up on hover) */}
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-3">
                    <span className="text-orange-500 font-black tracking-[0.15em] text-xs uppercase mb-2 block drop-shadow-md">
                      {product.badge}
                    </span>
                    <h3 className="text-white text-3xl sm:text-4xl font-serif font-bold tracking-tight drop-shadow-lg">
                      {product.name}
                    </h3>
                  </div>

                  {/* Highlights List & Link (Slides up and fades in on hover) */}
                  <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-6 group-hover:translate-y-0">
                    <div className="pt-4 pb-6 space-y-2.5">
                      {product.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start text-white/90 text-sm font-medium leading-snug">
                          <span className="text-orange-500 mr-2.5 font-black select-none">–</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Card Action Link */}
                    <div className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest text-xs">
                      <span>{product.linkText}</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
