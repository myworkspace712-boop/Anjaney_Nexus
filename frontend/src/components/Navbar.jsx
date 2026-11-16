import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';

const Navbar = ({ activePage, setActivePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const themeContext = useTheme();
  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const isDarkMode = themeContext ? themeContext.theme === 'dark' : localTheme === 'dark';

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Our Products' },
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
    <>
      <nav className="fixed w-full z-40 bg-white/95 dark:bg-[#020611]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-[#132649] shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* BRANDING & LOGO */}
            <div 
              className="text-xl font-black tracking-tighter cursor-pointer flex items-center gap-2 sm:gap-3 group shrink-0"
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
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg group-hover:scale-105 transition-transform shrink-0" 
              />
              
              {/* 2. The Styled Company Name */}
              <div className="text-xs sm:text-sm md:text-base lg:text-xl font-black whitespace-nowrap">
                <span className="text-orange-500 dark:text-orange-400">Anjaney</span>{' '}
                <span className="text-blue-900 dark:text-blue-400">
                  Nexus India LLP
                </span>
              </div>
            </div>

            {/* Navigation Links (Visible on sm and larger screens) */}
            <div className="hidden sm:flex items-center gap-2.5 md:gap-4 lg:gap-8 h-full">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActivePage && setActivePage(link.id)}
                    className={`relative h-full flex items-center px-1 sm:px-1.5 lg:px-2 text-[10px] sm:text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest transition-colors duration-200 cursor-pointer whitespace-nowrap group ${
                      isActive 
                        ? 'text-orange-500 dark:text-orange-400 font-black' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="transition-colors duration-200">{link.label}</span>

                    {/* Line at the lower end of the navbar: comes from the left side of the button on hover, stays active when selected */}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-[2.5px] rounded-t-full bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 origin-left transition-transform duration-300 ease-out pointer-events-none ${
                        isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Utility Actions (Theme toggle + Hamburger Menu Button on sm+) */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-[#132649] bg-slate-50 dark:bg-[#071326] hover:bg-slate-100 dark:hover:bg-[#0d203e] text-slate-600 dark:text-zinc-300 transition-all cursor-pointer shadow-xs text-xs sm:text-sm"
                aria-label="Toggle Theme"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>

              {/* Hamburger Menu Button (Desktop) */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="px-2.5 sm:px-3 lg:px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-[#132649] bg-slate-50 dark:bg-[#071326] hover:bg-slate-100 dark:hover:bg-[#0d203e] text-slate-700 dark:text-zinc-200 transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 group shadow-xs hover:border-orange-500/70 dark:hover:border-orange-400/80"
                aria-label="Open Sidebar Menu"
                title="Open Sidebar Navigation Menu"
              >
                <div className="flex flex-col justify-center items-center w-3.5 h-3 sm:w-4 sm:h-3.5 gap-[3px]">
                  <span className="w-full h-0.5 bg-current rounded-full transition-all group-hover:bg-orange-500 dark:group-hover:bg-orange-400"></span>
                  <span className="w-full h-0.5 bg-current rounded-full transition-all group-hover:bg-orange-500 dark:group-hover:bg-orange-400"></span>
                  <span className="w-full h-0.5 bg-current rounded-full transition-all group-hover:bg-orange-500 dark:group-hover:bg-orange-400"></span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 group-hover:text-orange-500 dark:group-hover:text-orange-400">
                  Menu
                </span>
              </button>
            </div>

            {/* Mobile Right Bar (Theme toggle + Hamburger button below sm) */}
            <div className="sm:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-[#132649] bg-slate-50 dark:bg-[#071326] text-slate-600 dark:text-slate-300 text-sm cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg border border-slate-200 dark:border-[#132649] bg-slate-50 dark:bg-[#071326] text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500 dark:hover:border-orange-400 transition-all cursor-pointer shadow-xs"
                aria-label="Open Navigation Sidebar"
                title="Open Menu"
              >
                <div className="flex flex-col justify-center items-center w-5 h-4 gap-1">
                  <span className="w-full h-0.5 bg-current rounded-full"></span>
                  <span className="w-full h-0.5 bg-current rounded-full"></span>
                  <span className="w-full h-0.5 bg-current rounded-full"></span>
                </div>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Slide-Over Sidebar Menu */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </>
  );
};

export default Navbar;
