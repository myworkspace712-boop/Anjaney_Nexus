import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { EXPORT_CATALOG } from '../pages/Products';

const ProductGrid = ({ setActivePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 4 items from the "PRODUCTS" page catalog displayed on the homepage
  const featuredProducts = EXPORT_CATALOG.slice(0, 4);

  const [selectedVarieties, setSelectedVarieties] = useState({});

  const handleNavigateToProducts = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof setActivePage === 'function') {
      setActivePage('products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/products';
    }
  };

  const handleGetQuote = (product, specificVariety = null) => {
    const chosenVariety = specificVariety || selectedVarieties[product.id] || (product.varieties && (typeof product.varieties[0] === 'string' ? product.varieties[0] : product.varieties[0]?.name)) || '';
    try {
      localStorage.setItem('an_quote_product', JSON.stringify({
        id: product.id,
        name: chosenVariety ? `${product.title || product.name} - ${chosenVariety}` : (product.title || product.name),
        variety: chosenVariety,
        spec: chosenVariety ? `${product.title || product.name} (${chosenVariety})` : product.spec,
        moq: product.moq,
        category: product.category,
        hsCode: product.hsCode
      }));
    } catch (e) {
      console.error(e);
    }

    if (typeof setActivePage === 'function') {
      setActivePage('contact');
      setTimeout(() => {
        const el = document.getElementById('export-quote-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.location.href = '/contact#export-quote-section';
    }
  };

  return (
    <section className={`w-full py-20 md:py-32 font-sans border-t transition-colors duration-500 relative overflow-hidden ${
      isDark 
        ? 'bg-[#020611] text-slate-100 border-[#132649]' 
        : 'bg-[#f8fafc] text-[#0b1d3a] border-slate-200/90'
    }`}>
      
      {/* AMBIENT GLOWING BLOBS */}
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20 z-0 bg-orange-400/20"></div>
      <div className={`absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl z-0 ${
        isDark ? 'bg-[#132649]/35' : 'bg-blue-600/10'
      }`}></div>
      <div className={`absolute -bottom-10 -left-10 w-[450px] h-[450px] rounded-full pointer-events-none blur-3xl z-0 ${
        isDark ? 'bg-[#0d203e]/30' : 'bg-orange-500/10'
      }`}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER - SOLID B2B EXPORT TERMINAL STYLE */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            <span className="text-blue-900 dark:text-white">Global </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 dark:from-orange-300 dark:via-orange-400 dark:to-amber-300">
              Commodities
            </span>
          </h2>

          <div className="flex justify-center">
            <button 
              onClick={handleNavigateToProducts}
              className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-400 dark:to-amber-500 dark:hover:from-orange-400 dark:hover:to-amber-400 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Explore Catalogue
            </button>
          </div>
        </div>

        {/* 4 COMMODITY CARDS - SOLID B2B EXPORT MANIFEST ARCHITECTURE (ZERO GLASS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6">
          {featuredProducts.map((product) => {
            const hasSubProducts = product.varieties && product.varieties.length > 1;
            const selectedVarObj = product.varieties?.find(
              (v) => (typeof v === 'string' ? v : v.name) === selectedVarieties[product.id]
            );
            const cardImage = (selectedVarObj && typeof selectedVarObj === 'object' && selectedVarObj.image)
              ? selectedVarObj.image
              : product.image;

            return (
              <div 
                key={product.id} 
                onClick={() => handleGetQuote(product)}
                className={`border rounded-3xl overflow-hidden transition-all duration-300 ease-out flex flex-col group relative cursor-pointer hover:-translate-y-2 hover:shadow-2xl h-[440px] w-full ${
                  isDark 
                    ? 'bg-[#071326] border-[#132649] shadow-[0_12px_30px_rgba(4,12,24,0.4)] hover:shadow-[0_20px_45px_rgba(4,12,24,0.7)] hover:border-orange-400/80' 
                    : 'bg-white border-slate-200/90 shadow-[0_10px_30px_rgba(11,29,58,0.05)] hover:shadow-[0_20px_45px_rgba(11,29,58,0.12)] hover:border-orange-500/60'
                }`}
              >
                
                {/* Product Image Container */}
                <div className={`h-52 w-full overflow-hidden rounded-t-3xl relative shrink-0 ${
                  isDark ? 'bg-[#020611]' : 'bg-slate-100'
                }`}>
                  <img 
                    src={cardImage} 
                    alt={product.title || product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    onError={(e) => {
                      if (product.fallbackImage && e.target.src !== product.fallbackImage) {
                        e.target.src = product.fallbackImage;
                      } else {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x600/f8fafc/0f172a?text=${encodeURIComponent(product.title || product.name)}`;
                      }
                    }}
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-3 rounded-b-3xl overflow-hidden">
                  <div className="space-y-2">
                    {/* Title & Subtitle (Consistent Height) */}
                    <div className="h-14 flex items-center">
                      <h3 className={`text-xl font-black leading-snug flex flex-wrap items-baseline gap-2 line-clamp-2 ${
                        isDark ? 'text-white' : 'text-[#0b1d3a]'
                      }`}>
                        <span>{product.name}</span>
                        {product.subtitle && (
                          <span className="text-sm font-bold text-orange-500 dark:text-orange-400">
                            {product.subtitle}
                          </span>
                        )}
                      </h3>
                    </div>

                    {/* All Varieties & Grades Directly Visible (Consistent Height Container) */}
                    <div className="h-32 flex flex-col justify-start">
                      {hasSubProducts && (
                        <div className="h-full overflow-y-auto scrollbar-thin pr-1">
                          <div className="flex flex-wrap gap-1.5">
                            {product.varieties.map((v, vIdx) => {
                              const varName = typeof v === 'string' ? v : v.name;
                              const varImg = (typeof v === 'object' && v.image) ? v.image : null;
                              return (
                                <button
                                  key={vIdx}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleGetQuote(product, varName);
                                  }}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                    isDark
                                      ? 'bg-[#020611] hover:bg-orange-500/20 border-[#132649] hover:border-orange-400 text-slate-200 hover:text-white'
                                      : 'bg-slate-50 hover:bg-orange-50 border-slate-200 hover:border-orange-500 text-slate-700 hover:text-orange-600 shadow-2xs'
                                  }`}
                                >
                                  {varImg && (
                                    <img 
                                      src={varImg} 
                                      alt={varName} 
                                      className="w-4 h-4 rounded-md object-cover shrink-0" 
                                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                  )}
                                  <span>{varName}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Single Grade Line (if product only has 1 variety) */}
                      {product.varieties && product.varieties.length === 1 && (
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const varName = typeof product.varieties[0] === 'string' ? product.varieties[0] : product.varieties[0]?.name;
                              setSelectedVarieties((prev) => ({ ...prev, [product.id]: varName }));
                              handleGetQuote(product, varName);
                            }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              isDark 
                                ? 'bg-[#020611] hover:bg-orange-500/20 border-[#132649] hover:border-orange-400 text-slate-200 hover:text-white' 
                                : 'bg-slate-50 hover:bg-orange-50 border-slate-200 hover:border-orange-500 text-slate-700 hover:text-orange-600 shadow-2xs'
                            }`}
                          >
                            <span>{typeof product.varieties[0] === 'string' ? product.varieties[0] : product.varieties[0]?.name}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductGrid;
