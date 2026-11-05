import React, { useState, useRef, useEffect } from 'react';
import ProfileIcon from './ProfileIcon';
import { useTheme } from '../context/ThemeContext';

const ACTIVE_USER_KEY = 'an_active_session_user';
const MASTER_ADMIN_EMAILS = ['yatharthjoshi127@gmail.com', 'yj7gov@gmail.com'];

const Navbar = ({ activePage, setActivePage, navCount = 0, currentUser: propCurrentUser, onSignOut }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const themeContext = useTheme();
  const [localTheme, setLocalTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const isDarkMode = themeContext ? themeContext.theme === 'dark' : localTheme === 'dark';

  // 1. Fail-safe user loading logic inside Navbar component
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const loadSecureUser = () => {
      try {
        const storedData = localStorage.getItem('ACTIVE_USER_KEY') || localStorage.getItem(ACTIVE_USER_KEY);
        // Prevent JSON.parse from crashing on "undefined" strings
        if (storedData && storedData !== 'undefined' && storedData !== 'null') {
          setCurrentUser(JSON.parse(storedData));
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setCurrentUser(null);
      }
    };

    // Load user on mount
    loadSecureUser(); 
    
    // Listen for cross-component login/logout events
    window.addEventListener('auth-change', loadSecureUser); 
    window.addEventListener('storage', loadSecureUser);
    
    return () => {
      window.removeEventListener('auth-change', loadSecureUser);
      window.removeEventListener('storage', loadSecureUser);
    };
  }, []);

  const dropdownRef = useRef(null);
  const activeUser = propCurrentUser || currentUser;
  
  const isAdmin =
    (activeUser && activeUser.email && MASTER_ADMIN_EMAILS.includes(activeUser.email.toLowerCase())) ||
    activeUser?.role === 'admin' ||
    activeUser?.isAdmin === true;

  const roleDisplay = activeUser
    ? isAdmin
      ? 'Admin'
      : activeUser.role === 'seller'
      ? 'Seller'
      : 'User'
    : 'Profile';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleSignOutClick = () => {
    setProfileOpen(false);
    localStorage.removeItem(ACTIVE_USER_KEY);
    localStorage.removeItem('ACTIVE_USER_KEY');
    setCurrentUser(null);
    window.dispatchEvent(new Event('auth-change'));
    if (onSignOut) onSignOut();
    else if (setActivePage) setActivePage('auth');
  };

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
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
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
            {navLinks.map((link) => (
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
            ))}
          </div>

          {/* Right Utility Actions (Theme toggle, Cart, Profile) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>

            <button
              onClick={() => setActivePage && setActivePage('cart')}
              className="relative flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <span className="text-sm leading-none">🛒</span>
              <span>Cart</span>
              {navCount > 0 && (
                <span className="ml-1 bg-white text-orange-600 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {navCount}
                </span>
              )}
            </button>

            {/* RIGHT SIDE: PROFILE TAB AREA (Admin Button Removed) */}
            <div className="relative flex items-center gap-4" ref={dropdownRef}>
              {activeUser ? (
                // LOGGED IN VIEW: Profile Dropdown Only
                <div 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 cursor-pointer bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 p-2 pr-4 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 select-none"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-950 text-white flex items-center justify-center font-black text-sm uppercase shadow-sm">
                    {activeUser.email ? activeUser.email.charAt(0) : 'U'}
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="font-bold text-blue-950 dark:text-white text-sm leading-none">
                      {isAdmin 
                        ? 'Admin' 
                        : activeUser.companyName || 'User'}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1 truncate max-w-[150px]">
                      {activeUser.email}
                    </span>
                  </div>
                  <div className="ml-1 text-slate-400 text-xs">▼</div>
                </div>
              ) : (
                // LOGGED OUT VIEW: Sign In Button
                <button 
                  onClick={() => typeof setActivePage === 'function' && setActivePage('auth')}
                  className="px-5 py-2.5 sm:px-6 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Sign In
                </button>
              )}

              {/* PROFILE DROPDOWN MENU */}
              {profileOpen && activeUser && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Signed in securely as</p>
                    <p className="text-xs font-bold text-blue-950 dark:text-white truncate mt-1">{activeUser.email}</p>
                  </div>
                  
                  {/* Admin Dashboard inside dropdown */}
                  {isAdmin && (
                    <button 
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        if (typeof setActivePage === 'function') setActivePage('admin');
                      }}
                      className="w-full text-left px-4 py-3 text-xs font-bold text-blue-950 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-800"
                    >
                      Admin Dashboard
                    </button>
                  )}

                  <button 
                    onClick={handleSignOutClick}
                    className="w-full text-left px-4 py-3.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  >
                    Sign Out →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Bar (Theme toggle + Menu button) */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 text-base"
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
          {navLinks.map((link) => (
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
          ))}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (setActivePage) setActivePage('cart');
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 flex justify-between items-center"
            >
              <span>🛒 Cart</span>
              {navCount > 0 && (
                <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                  {navCount}
                </span>
              )}
            </button>

            {isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (setActivePage) setActivePage('admin');
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                ⚙️ Admin Dashboard
              </button>
            )}

            {!activeUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (setActivePage) setActivePage('auth');
                }}
                className="w-full text-center py-2 bg-blue-950 dark:bg-orange-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOutClick();
                }}
                className="w-full text-center py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Sign Out ({roleDisplay})
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
