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
      <nav className="fixed w-full z-40 bg-white/95 dark:bg-[#0c192c]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-[#1e3c66] shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* BRANDING & LOGO */}
            <div 
              className="text-xl font-black tracking-tighter cursor-pointer flex items-center gap-2 sm:gap-3 group"
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
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg group-hover:scale-105 transition-transform" 
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
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActivePage && setActivePage(link.id)}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activePage === link.id 
                      ? 'text-orange-500 border-b-2 border-orange-500 pb-1 font-black' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              ))}
            </div>

            {/* Right Utility Actions (Theme toggle + Hamburger Menu Button) */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-[#1e3c66] bg-slate-50 dark:bg-[#12243d] hover:bg-slate-100 dark:hover:bg-[#162c4c] text-slate-600 dark:text-zinc-300 transition-all cursor-pointer shadow-xs"
                aria-label="Toggle Theme"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>

              {/* Hamburger Menu Button (Desktop) */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#1e3c66] bg-slate-50 dark:bg-[#12243d] hover:bg-slate-100 dark:hover:bg-[#162c4c] text-slate-700 dark:text-zinc-200 transition-all cursor-pointer flex items-center gap-2.5 group shadow-xs hover:border-orange-500/70"
                aria-label="Open Sidebar Menu"
                title="Open Sidebar Navigation Menu"
              >
                <div className="flex flex-col justify-center items-center w-4 h-3.5 gap-[3px]">
                  <span className="w-full h-0.5 bg-current rounded-full transition-all group-hover:bg-orange-500"></span>
                  <span className="w-full h-0.5 bg-current rounded-full transition-all group-hover:bg-orange-500"></span>
                  <span className="w-full h-0.5 bg-current rounded-full transition-all group-hover:bg-orange-500"></span>
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 group-hover:text-orange-500">
                  Menu
                </span>
              </button>
            </div>

            {/* Mobile Right Bar (Theme toggle + Hamburger button) */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-[#1e3c66] bg-slate-50 dark:bg-[#12243d] text-slate-600 dark:text-slate-300 text-sm cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg border border-slate-200 dark:border-[#1e3c66] bg-slate-50 dark:bg-[#12243d] text-slate-700 dark:text-slate-300 hover:text-orange-500 hover:border-orange-500 transition-all cursor-pointer shadow-xs"
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
