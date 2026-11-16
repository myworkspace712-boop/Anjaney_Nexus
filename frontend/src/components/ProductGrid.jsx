import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { EXPORT_CATALOG } from '../pages/Products';

const ProductGrid = ({ setActivePage }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 4 items from the "PRODUCTS" page catalog displayed on the homepage
  const featuredProducts = EXPORT_CATALOG.slice(0, 4);

  const [selectedVarieties, setSelectedVarieties] = useState(() => {
    const initial = {};
    featuredProducts.forEach((p) => {
      if (p.varieties && p.varieties.length > 0) {
        initial[p.id] = typeof p.varieties[0] === 'string' ? p.varieties[0] : p.varieties[0]?.name;
      }
    });
    return initial;
  });

  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.subproduct-dropdown-container')) {
        setOpenDropdownId(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavigateToProducts = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof setActivePage === 'function') {
      setActivePage('products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/products';
    }
  };

  const handleGetQuote = (product) => {
    const chosenVariety = selectedVarieties[product.id] || (product.varieties && (typeof product.varieties[0] === 'string' ? product.varieties[0] : product.varieties[0]?.name)) || '';
    try {
      localStorage.setItem('an_quote_product', JSON.stringify({
        id: product.id,
        name: product.title || product.name,
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <section className={`w-full py-20 md:py-32 font-sans border-t transition-colors duration-500 relative ${
      isDark 
        ? 'bg-[#0c192c] text-slate-100 border-[#1f3c64]' 
        : 'bg-[#f8fafc] text-[#0b1d3a] border-slate-200/90'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER - SOLID B2B EXPORT TERMINAL STYLE */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            <span className="text-blue-900 dark:text-white">Global </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500">
              Commodities
            </span>
          </h2>

          <div className="flex justify-center">
            <button 
              onClick={handleNavigateToProducts}
              className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Explore Catalogue
            </button>
          </div>
        </div>

        {/* 4 COMMODITY CARDS - SOLID B2B EXPORT MANIFEST ARCHITECTURE (ZERO GLASS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6">
          {featuredProducts.map((product) => {
            const selectedVarObj = product.varieties?.find(
              (v) => (typeof v === 'string' ? v : v.name) === selectedVarieties[product.id]
            );
            const cardImage = (selectedVarObj && typeof selectedVarObj === 'object' && selectedVarObj.image)
              ? selectedVarObj.image
              : product.image;

            const isDropdownOpen = openDropdownId === product.id;

            return (
              <div 
                key={product.id} 
                style={{ zIndex: isDropdownOpen ? 50 : 1 }}
                className={`border-2 rounded-2xl transition-all duration-300 flex flex-col group relative ${
                  isDark 
                    ? 'bg-[#12243d] border-[#1e3c66] shadow-xl hover:border-orange-500' 
                    : 'bg-white border-slate-200 shadow-lg hover:border-orange-500'
                }`}
              >
                
                {/* Product Image Container with Solid Industrial Export Badges */}
                <div className={`h-56 w-full rounded-t-2xl overflow-hidden relative ${
                  isDark ? 'bg-[#0c192c]' : 'bg-slate-100'
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
                  
                  {/* Category Pill (Solid, No Blur) */}
                  {product.category && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#081526] text-orange-400 border border-orange-500/40 shadow-sm">
                      {product.category}
                    </div>
                  )}

                  {/* Port Freight Indicator (Solid, No Blur) */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-[#081526] text-slate-200 border border-slate-700 shadow-sm">
                    FCL EXPORT
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4 rounded-b-2xl">
                  <div className="space-y-3">
                    {/* Title & Subtitle */}
                    <div className="space-y-1">
                      <h3 className={`text-lg sm:text-xl font-black leading-tight flex flex-wrap items-baseline gap-2 ${
                        isDark ? 'text-white' : 'text-[#0b1d3a]'
                      }`}>
                        <span>{product.name}</span>
                        {product.subtitle && (
                          <span className="text-xs sm:text-sm font-bold text-orange-500">
                            {product.subtitle}
                          </span>
                        )}
                      </h3>
                      {product.bullets && product.bullets.length > 0 && (
                        <p className={`text-xs line-clamp-2 leading-relaxed font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {product.bullets[0]}
                        </p>
                      )}
                    </div>

                    {/* Sub-Products Dropdown Menu (Solid Opaque, Zero Glass, Clean Typography) */}
                    {product.varieties && product.varieties.length > 1 && (
                      <div className="relative subproduct-dropdown-container">
                        
                        {/* Dropdown Header Label */}
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                            <span>Sub-Product / Variety</span>
                          </span>
                          <span className="text-[9px] font-mono font-bold text-orange-500 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">
                            {product.varieties.length} GRADES
                          </span>
                        </div>

                        {/* Solid Trigger Button (Pure Solid, Zero Blur) */}
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(isDropdownOpen ? null : product.id);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border-2 text-xs font-black transition-all duration-200 cursor-pointer shadow-xs ${
                            isDropdownOpen
                              ? 'bg-orange-500/15 border-orange-500 text-orange-600 dark:text-orange-400 ring-2 ring-orange-500/20'
                              : isDark
                                ? 'bg-[#0c192c] hover:bg-[#152a48] border-[#1e3c66] text-white hover:border-orange-500'
                                : 'bg-slate-100 hover:bg-slate-200/70 border-slate-200 text-blue-950 hover:border-orange-500'
                          }`}
                        >
                          <span className="flex items-center gap-2 min-w-0 pr-2">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${
                              isDropdownOpen ? 'bg-orange-500' : 'bg-orange-400'
                            }`}></span>
                            <span className="truncate text-xs font-black tracking-tight">
                              {selectedVarieties[product.id] || product.dropdownPlaceholder || 'Select Sub-Product'}
                            </span>
                          </span>

                          <svg 
                            className={`w-4 h-4 shrink-0 transition-transform duration-300 ease-out ${
                              isDropdownOpen ? 'rotate-180 text-orange-500' : 'text-slate-400'
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Solid Opaque Floating Dropdown Popover (Zero Glass, Pure Solid Surface) */}
                        {isDropdownOpen && (
                          <div 
                            className={`absolute left-0 right-0 top-[calc(100%+6px)] z-50 p-2 rounded-xl border-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150 ${
                              isDark 
                                ? 'bg-[#0c192c] border-[#234574] shadow-black/80 text-white' 
                                : 'bg-white border-slate-300 shadow-blue-950/20 text-[#0b1d3a]'
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Popover Header */}
                            <div className="px-3 py-2 mb-1 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              <span>Available Export Grades</span>
                              <span className="text-orange-500 font-black">{product.varieties.length} Options</span>
                            </div>

                            {/* Options List (Solid Rows, Clean Typography, Zero Images) */}
                            <div className="max-h-56 overflow-y-auto space-y-1 p-0.5 scrollbar-thin">
                              {product.varieties.map((v, vIdx) => {
                                const varName = typeof v === 'string' ? v : v.name;
                                const isSelected = selectedVarieties[product.id] === varName;
                                return (
                                  <button 
                                    key={vIdx}
                                    type="button"
                                    onClick={() => {
                                      setSelectedVarieties((prev) => ({ ...prev, [product.id]: varName }));
                                      setOpenDropdownId(null);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left cursor-pointer group/item ${
                                      isSelected 
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black shadow-sm' 
                                        : isDark
                                          ? 'text-slate-200 hover:bg-[#162c4c] hover:text-white'
                                          : 'text-slate-800 hover:bg-slate-100 hover:text-orange-600'
                                    }`}
                                  >
                                    {/* Left: Index + Grade Name */}
                                    <div className="flex items-center gap-2 min-w-0 pr-1">
                                      <span className={`text-[10px] font-mono font-bold w-5 shrink-0 ${
                                        isSelected ? 'text-white' : 'text-slate-400 group-hover/item:text-orange-500'
                                      }`}>
                                        0{vIdx + 1}
                                      </span>
                                      <span className={`leading-snug break-words text-[11px] tracking-tight ${
                                        isSelected ? 'font-black text-white' : 'font-bold'
                                      }`}>
                                        {varName}
                                      </span>
                                    </div>

                                    {/* Right: Selected Checkmark Pill or Hover Indicator */}
                                    {isSelected ? (
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/25 text-white text-[9px] font-black uppercase tracking-wider shrink-0 ml-2">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Active</span>
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover/item:opacity-100 group-hover/item:text-orange-500 transition-all shrink-0 ml-2">
                                        Select →
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Single Grade Line (if product only has 1 variety) */}
                    {product.varieties && product.varieties.length === 1 && (
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                            <span>Sub-Product / Variety</span>
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                            SINGLE SPEC
                          </span>
                        </div>
                        <div className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border-2 text-xs font-black shadow-xs ${
                          isDark 
                            ? 'border-[#1e3c66] bg-[#0c192c] text-white' 
                            : 'border-slate-200 bg-slate-100 text-blue-950'
                        }`}>
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            <span className="truncate text-xs font-black">
                              {typeof product.varieties[0] === 'string' ? product.varieties[0] : product.varieties[0]?.name}
                            </span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                            FIXED GRADE
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Section */}
                  <div className="pt-2">
                    <button 
                      onClick={() => handleGetQuote(product)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center block"
                    >
                      Get Official Quote
                    </button>
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
