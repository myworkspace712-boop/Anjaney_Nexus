import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ isOpen, onClose, activePage, setActivePage }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Navigation items matching all options on the navbar
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      description: 'Global Agro Commodities & Trade Terminal',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'about',
      label: 'About Us',
      description: 'A Trusted Partner in Global Trade',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'products',
      label: 'Our Products',
      description: '26 Export-Grade Commodities & Specifications',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'Contact Us',
      description: 'Commercial Procurement & Official Inquiries',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  // Close on Escape key & lock body scroll when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavClick = (pageId) => {
    if (typeof setActivePage === 'function') {
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Slide-Over Sidebar Menu Panel */}
      <aside 
        className={`fixed top-0 bottom-0 right-0 w-80 sm:w-96 max-w-[85vw] z-50 flex flex-col justify-between transition-transform duration-300 ease-out border-l shadow-2xl ${
          isDark 
            ? 'bg-[#141312] border-[#332b21] text-slate-100 shadow-black/90' 
            : 'bg-[#fcfbf8] border-[#e8e2d4] text-[#0b1d3a] shadow-[0_20px_60px_rgba(201,154,66,0.15)]'
        } ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Sidebar Navigation Menu"
      >
        
        {/* SIDEBAR HEADER */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${
          isDark ? 'border-[#332b21]' : 'border-[#e8e2d4]'
        }`}>
          {/* Logo & Company Name */}
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src="/logo.png" 
              alt="Anjaney Nexus India LLP" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/Logo1.jpeg';
              }}
              className="w-9 h-9 object-contain rounded-lg shrink-0" 
            />
            <div className="text-sm sm:text-base font-black leading-tight whitespace-nowrap">
              <span className="text-orange-500 dark:text-orange-400">Anjaney</span>{' '}
              <span className={isDark ? 'text-amber-400' : 'text-blue-900'}>
                Nexus India LLP
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button 
            type="button"
            onClick={onClose} 
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer bg-transparent ${
              isDark 
                ? 'border-[#332b21] text-slate-300 hover:text-white hover:border-[#c99a42] hover:bg-white/5' 
                : 'border-[#e8e2d4] text-slate-600 hover:text-blue-950 hover:border-[#c99a42] hover:bg-[#f7f4ee]'
            }`}
            aria-label="Close sidebar menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* SIDEBAR NAVIGATION ITEMS */}
        <div className="p-4 sm:p-6 flex-grow overflow-y-auto space-y-2 scrollbar-thin">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 mb-2">
            Navigation Menu
          </div>

          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? isDark 
                      ? 'bg-gradient-to-r from-[#c99a42] to-[#dfb25b] text-white font-black shadow-md shadow-[#c99a42]/25'
                      : 'bg-gradient-to-r from-[#c99a42] to-[#a67c2e] text-white font-black shadow-md shadow-[#c99a42]/25'
                    : isDark
                      ? 'text-slate-200 hover:bg-[#1f1b17] hover:text-white border border-transparent hover:border-[#332b21]'
                      : 'text-[#0b1d3a] hover:bg-[#f7f4ee] hover:text-[#c99a42] border border-transparent hover:border-[#e8e2d4]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : isDark 
                        ? 'bg-[#1f1b17] text-[#c99a42] group-hover:bg-[#29221a]' 
                        : 'bg-[#f7f4ee] text-[#c99a42] group-hover:bg-[#efeae0]'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-black tracking-tight leading-snug">
                      {item.label}
                    </span>
                    <span className={`text-[11px] truncate leading-tight mt-0.5 ${
                      isActive 
                        ? 'text-white/80' 
                        : isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {item.description}
                    </span>
                  </div>
                </div>

                {/* Right Arrow / Active Indicator */}
                <svg 
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-500 dark:group-hover:text-orange-400'
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}

          {/* Theme Mode Setting */}
          <div className="pt-4 mt-3 border-t border-[#e8e2d4] dark:border-[#332b21]">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 mb-2">
              Appearance & Settings
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                isDark
                  ? 'text-slate-200 hover:bg-[#1f1b17] hover:text-white border border-[#332b21] hover:border-[#3d3326]'
                  : 'text-[#0b1d3a] hover:bg-[#f7f4ee] hover:text-[#c99a42] border border-[#e8e2d4] hover:border-[#dfd6c4]'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`p-2 rounded-lg shrink-0 text-base transition-colors ${
                  isDark ? 'bg-[#1f1b17] text-[#dfb25b] group-hover:bg-[#29221a]' : 'bg-[#f7f4ee] text-[#c99a42] group-hover:bg-[#efeae0]'
                }`}>
                  {isDark ? '🌙' : '☀️'}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-black tracking-tight leading-snug">
                    Theme: {isDark ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <span className={`text-[11px] truncate leading-tight mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Switch to {isDark ? 'Light' : 'Dark'} mode
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 flex items-center shrink-0 ${
                isDark ? 'bg-[#c99a42] justify-end' : 'bg-[#e8e2d4] justify-start'
              }`}>
                <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* SIDEBAR FOOTER & CTA */}
        <div className={`p-5 sm:p-6 border-t space-y-4 ${
          isDark ? 'border-[#332b21] bg-[#1a1816]/95' : 'border-[#e8e2d4] bg-[#f7f4ee]/95'
        }`}>
          {/* Direct Commercial Quote Action */}
          <button 
            type="button"
            onClick={() => handleNavClick('contact')}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-400 dark:to-amber-500 dark:hover:from-orange-400 dark:hover:to-amber-400 text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center block"
          >
            Request Export Quote
          </button>

          {/* Official Email */}
          <div className="flex items-center justify-center text-xs pt-1">
            <a 
              href="mailto:admin@anjaneynexus.com" 
              className="text-xs font-semibold text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>admin@anjaneynexus.com</span>
            </a>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
