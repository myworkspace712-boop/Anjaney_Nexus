import React from 'react';

const ProductGrid = ({ setActivePage }) => {
  
  // FEATURED HOMEPAGE PRODUCTS 
  // Formatted to match the specific hover-card design and rice varieties requested
  const products = [
    {
      id: 1,
      badge: "FLAGSHIP PRODUCT",
      title: "Premium Rice",
      highlights: [
        "1121 Basmati (Extra Long Grain)",
        "1509 Basmati Sella",
        "IR 64 White & Parboiled",
        "Swarna • 100% Broken"
      ],
      linkText: "EXPLORE ALL VARIETIES",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
      localImage: "/images/BasmatiRice.png"
    },
    {
      id: 2,
      badge: "EXPORT QUALITY",
      title: "Indian Spices",
      highlights: [
        "Premium Cumin Seeds",
        "Salem Turmeric Fingers",
        "Eagle Coriander Seeds",
        "Black Pepper & Cloves"
      ],
      linkText: "EXPLORE ALL VARIETIES",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
      localImage: "/images/Turmeric.png"
    },
    {
      id: 3,
      badge: "PREMIUM SEEDS",
      title: "Oil Seeds & Nuts",
      highlights: [
        "Natural Sesame Seeds",
        "High-Yield Soyabean",
        "Export-Grade Ground Nut",
        "Raw Cashew Nuts"
      ],
      linkText: "EXPLORE ALL VARIETIES",
      image: "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
      localImage: "/images/SesameSeeds.png"
    }
  ];

  const handleNavigateToProducts = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof setActivePage === 'function') {
      setActivePage('products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/products';
    }
  };

  return (
    <section className="w-full py-20 md:py-32 font-sans bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* SECTION HEADER */}
        <div className="mb-16 text-center">
          <span className="text-xs font-black text-orange-500 dark:text-orange-400 uppercase tracking-[0.2em] mb-4 block">
            Featured Exports
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-950 dark:text-white tracking-tight leading-[1.1]">
            Global <span className="text-slate-400 dark:text-slate-600">Commodities</span>
          </h2>
        </div>

        {/* HOVER-EFFECT PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              onClick={handleNavigateToProducts}
              className="relative h-[480px] w-full rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Background Image with Zoom on Hover */}
              <img 
                src={product.localImage || product.image} 
                alt={product.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  if (e.currentTarget.src !== product.image) {
                    e.currentTarget.src = product.image;
                  }
                }}
              />

              {/* Permanent dark gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90 dark:from-black/90 dark:via-black/40"></div>

              {/* Darker gradient overlay that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                
                {/* Always visible Headers (Slides slightly up on hover) */}
                <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
                  <span className="text-orange-500 font-black tracking-[0.15em] text-xs uppercase mb-3 block drop-shadow-md">
                    {product.badge}
                  </span>
                  <h3 className="text-white text-4xl sm:text-5xl font-serif font-bold tracking-tight drop-shadow-lg">
                    {product.title}
                  </h3>
                </div>

                {/* Highlights List & Link (Slides up and fades in on hover) */}
                <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-8 group-hover:translate-y-0">
                  <div className="pt-6 pb-8 space-y-3">
                    {product.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start text-white/90 text-[15px] font-medium leading-snug">
                        <span className="text-orange-500 mr-3 font-black select-none">–</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Card Action Link */}
                  <div className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest text-sm">
                    {product.linkText}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
};

export default ProductGrid;
