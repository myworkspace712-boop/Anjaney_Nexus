import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';

const Navbar = ({ activePage, setActivePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const themeContext = useTheme();
  const [localTheme, setLocalTheme] = useState(() => {
    try {
      const userSelected = localStorage.getItem('theme_user_selected');
      if (userSelected === 'true') {
        return localStorage.getItem('theme') || 'light';
      }
      return 'light';
    } catch {
      return 'light';
    }
  });
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
        try {
          localStorage.setItem('theme_user_selected', 'true');
          localStorage.setItem('theme', next);
        } catch (e) {
          console.warn('Could not store theme preference:', e);
        }
        return next;
      });
    }
  };

  return (
    <>
      <nav className="fixed w-full z-40 bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-[0_4px_20px_rgba(14,165,233,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* BRANDING & LOGO */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 select-none cursor-default">
              {/* 1. The Logo Image */}
              <img 
                src="/logo.png" 
                alt="Anjaney Nexus Logo" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/Logo1.jpeg';
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-lg shrink-0" 
              />
              
              {/* 2. The Styled Company Name */}
              <div className="text-[11px] sm:text-xs md:text-sm lg:text-base font-black whitespace-nowrap tracking-tight">
                <span className="text-orange-500 dark:text-orange-400">Anjaney</span>{' '}
                <span className="text-blue-900 dark:text-blue-400">
                  Nexus India LLP
                </span>
              </div>
            </div>

            {/* Navigation Links (Visible on sm and larger screens) */}
            <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 md:gap-2.5 lg:gap-4 h-full">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => setActivePage && setActivePage(link.id)}
                    className={`relative flex items-center py-1 px-1 sm:px-1.5 md:px-1.5 lg:px-2 text-[9px] sm:text-[9.5px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap group ${
                      isActive 
                        ? 'text-orange-500 dark:text-blue-400 font-black' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                  >
                    <span className="transition-colors duration-200">{link.label}</span>

                    {/* Single-color underline indicator (orange in light mode, blue in dark mode) */}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-orange-500 dark:bg-blue-400 origin-left transition-transform duration-300 ease-out pointer-events-none ${
                        isActive 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Utility Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Theme Toggle Switch with "Theme" label */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-[9px] sm:text-[9.5px] md:text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 select-none">
                  Theme
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isDarkMode}
                  onClick={toggleTheme}
                  className={`relative inline-flex h-4.5 w-8.5 sm:h-5 sm:w-9 shrink-0 items-center rounded-full p-0.5 border transition-all duration-300 cursor-pointer shadow-xs focus:outline-none ${
                    isDarkMode 
                      ? 'bg-sky-500 border-sky-400' 
                      : 'bg-slate-200 border-slate-300 hover:border-sky-500'
                  }`}
                  aria-label="Toggle Theme"
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  <span
                    className={`pointer-events-none inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-out ${
                      isDarkMode ? 'translate-x-3.5 sm:translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Hamburger Menu Button - appears ONLY when the other buttons are not available (below sm) */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="sm:hidden p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500 dark:hover:border-sky-400 transition-all cursor-pointer shadow-xs"
                aria-label="Open Navigation Sidebar"
                title="Open Menu"
              >
                <div className="flex flex-col justify-center items-center w-4 h-3.5 gap-0.5">
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
