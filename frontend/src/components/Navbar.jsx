import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  
  const themeContext = useTheme();
  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const isDarkMode = themeContext ? themeContext.theme === 'dark' : localTheme === 'dark';

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const toggleTheme = () => {
    if (themeContext && themeContext.toggleTheme) {
      themeContext.toggleTheme();
    } else {
      setLocalTheme((prev) => {
        const next = prev === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        return next;
      });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* BRANDING & LOGO */}
          <div 
            className="text-xl font-black tracking-tighter cursor-pointer flex items-center gap-2 sm:gap-3"
            onClick={() => setActivePage && setActivePage('home')}
          >
            {/* 1. The Logo Image */}
            <img 
              src="/logo.png" 
              alt="Anjaney Nexus Logo" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/Logo1.jpeg';
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg" 
            />
            
            {/* 2. The Styled Company Name */}
            <div className="text-lg sm:text-xl font-black">
              <span className="text-orange-500">Anjaney</span>{' '}
              <span className="text-blue-900 dark:text-blue-400">
                Nexus India
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.id === 'products') {
                return (
                  <div
                    key={link.id}
                    className="relative py-2"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setActivePage && setActivePage('products')}
                      className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-1.5 ${
                        activePage === 'products'
                          ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
                          : 'text-slate-500 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <svg 
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${productsDropdownOpen ? 'rotate-180 text-orange-500' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Smooth Animated Dropdown Effect */}
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[520px] transition-all duration-300 ease-out z-50 ${
                        productsDropdownOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-5 backdrop-blur-xl">
                        
                        {/* 1. Rice Dropdown Section (Starting from Rice) */}
                        <div className="mb-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-black uppercase tracking-wider text-orange-500 flex items-center gap-1.5">
                              <span>🌾</span> RICE COMMODITIES
                            </span>
                          </div>

                          <div className="bg-slate-50/80 dark:bg-zinc-950/60 border border-slate-200/80 dark:border-zinc-800/80 rounded-xl p-3 space-y-3">
                            <div className="text-xs font-black text-blue-950 dark:text-white">
                              <span>Basmati Rice:</span>
                            </div>

                            {/* 1121 Varieties */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                                1121 Basmati:
                              </span>
                              <div className="grid grid-cols-3 gap-2">
                                <button
                                  type="button"
                                  onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                                  className="text-left p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:border-orange-500 text-[11px] font-bold text-slate-700 dark:text-zinc-200 hover:text-orange-500 transition-all cursor-pointer"
                                >
                                  • Steamy Sella
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                                  className="text-left p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:border-orange-500 text-[11px] font-bold text-slate-700 dark:text-zinc-200 hover:text-orange-500 transition-all cursor-pointer"
                                >
                                  • Creamy Sella
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                                  className="text-left p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:border-orange-500 text-[11px] font-bold text-slate-700 dark:text-zinc-200 hover:text-orange-500 transition-all cursor-pointer"
                                >
                                  • Golden Sella
                                </button>
                              </div>
                            </div>

                            {/* XXXL Varieties */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                                XXXL Basmati:
                              </span>
                              <div className="grid grid-cols-3 gap-2">
                                <button
                                  type="button"
                                  onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                                  className="text-left p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:border-orange-500 text-[11px] font-bold text-slate-700 dark:text-zinc-200 hover:text-orange-500 transition-all cursor-pointer"
                                >
                                  • Steamy Sella
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                                  className="text-left p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:border-orange-500 text-[11px] font-bold text-slate-700 dark:text-zinc-200 hover:text-orange-500 transition-all cursor-pointer"
                                >
                                  • Creamy Sella
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                                  className="text-left p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:border-orange-500 text-[11px] font-bold text-slate-700 dark:text-zinc-200 hover:text-orange-500 transition-all cursor-pointer"
                                >
                                  • Golden Sella
                                </button>
                              </div>
                            </div>

                            {/* 1509 Basmati */}
                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                                className="w-full text-left p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:border-orange-500 text-xs font-bold text-slate-800 dark:text-zinc-100 hover:text-orange-500 transition-all cursor-pointer"
                              >
                                <span>• 1509 Basmati Rice</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 2. Other Product Categories Grid */}
                        <div className="grid grid-cols-2 gap-2 pb-4 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                            className="text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center gap-2 cursor-pointer transition-colors"
                          >
                            <span>🌶️</span> Indian Spices
                          </button>
                          <button
                            type="button"
                            onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                            className="text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center gap-2 cursor-pointer transition-colors"
                          >
                            <span>🌱</span> Oil Seeds & Edible Oils
                          </button>
                          <button
                            type="button"
                            onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                            className="text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center gap-2 cursor-pointer transition-colors"
                          >
                            <span>🥜</span> Dry Fruits & Saffron
                          </button>
                          <button
                            type="button"
                            onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                            className="text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center gap-2 cursor-pointer transition-colors"
                          >
                            <span>☕</span> Tea, Coffee & Ingredients
                          </button>
                        </div>

                        {/* 3. Bottom Button */}
                        <button
                          type="button"
                          onClick={() => { setProductsDropdownOpen(false); setActivePage('products'); }}
                          className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm text-center flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Explore All Verified Products</span>
                          <span>→</span>
                        </button>

                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage && setActivePage(link.id)}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activePage === link.id 
                      ? 'text-orange-500 border-b-2 border-orange-500 pb-1' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mb-1" title="Verified"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Utility Actions (Theme toggle) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-all cursor-pointer shadow-xs"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Mobile Right Bar (Theme toggle + Menu button) */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-slate-600 dark:text-slate-300 text-sm cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-950 dark:hover:text-white font-bold text-xl cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            if (link.id === 'products') {
              return (
                <div key={link.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (setActivePage) setActivePage('products');
                      }}
                      className={`flex-grow text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                        activePage === 'products'
                          ? 'text-orange-500 bg-orange-50 dark:bg-orange-950/30'
                          : 'text-slate-600 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white'
                      }`}
                    >
                      Products
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="p-2 text-slate-400 hover:text-orange-500 cursor-pointer"
                      aria-label="Toggle Products Submenu"
                    >
                      <svg className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {mobileProductsOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-2 bg-slate-50 dark:bg-zinc-900/60 rounded-xl text-xs">
                      <div className="text-[10px] font-black uppercase text-orange-500 tracking-wider">
                        Rice Varieties:
                      </div>
                      <div className="space-y-1.5 pl-2 border-l border-orange-500/30">
                        <div className="font-semibold text-slate-700 dark:text-zinc-300">• 1121 Steamy Sella</div>
                        <div className="font-semibold text-slate-700 dark:text-zinc-300">• 1121 Creamy Sella</div>
                        <div className="font-semibold text-slate-700 dark:text-zinc-300">• 1121 Golden Sella</div>
                        <div className="font-semibold text-slate-700 dark:text-zinc-300">• XXXL Steamy Sella</div>
                        <div className="font-semibold text-slate-700 dark:text-zinc-300">• XXXL Creamy Sella</div>
                        <div className="font-semibold text-slate-700 dark:text-zinc-300">• XXXL Golden Sella</div>
                        <div className="font-semibold text-slate-700 dark:text-zinc-300">• 1509 Basmati</div>
                      </div>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (setActivePage) setActivePage('products');
                        }}
                        className="w-full text-left text-[11px] font-bold text-orange-500 pt-1 cursor-pointer"
                      >
                        View All Commodities →
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (setActivePage) setActivePage(link.id);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between ${
                  activePage === link.id
                    ? 'text-orange-500 bg-orange-50 dark:bg-orange-950/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'certificates' && (
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
