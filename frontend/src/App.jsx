import React, { useState, useEffect, createContext, useContext } from 'react';
import ProductsPage from './pages/Products';
import HeroCarousel from './components/HeroCarousel';
import ProfileIcon from './components/ProfileIcon';
import Navbar from './components/Navbar';
import CookieConsent from './components/CookieConsent';
import { useTheme } from './context/ThemeContext';

// ==========================================
// 1. CONTEXT SETUP (Auth)
// ==========================================
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('an_active_session_user') || localStorage.getItem('an_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('an_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('an_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ==========================================
// 2. NAVBAR IMPORTED FROM ./components/Navbar
// ==========================================

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import CertificatesPage from './pages/Certificates';
import RegisterPage from './pages/RegisterPage';
import VerifyEmail from './pages/VerifyEmail';
import InquirePage from './pages/Inquire';
import PrivacyPolicy from './pages/PrivacyPolicy';

// ==========================================
// 6. MAIN APP WRAPPER
// ==========================================
const getPageFromPath = (path) => {
  const clean = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'home') return 'home';
  if (clean.startsWith('verify-email') || clean.startsWith('verify')) return 'verify-email';
  if (clean === 'products' || clean === 'services') return 'products';
  if (clean === 'about' || clean === 'about-us') return 'about';
  if (clean === 'certificates') return 'certificates';
  if (clean === 'cart' || clean === 'trolley') return 'home';
  if (clean === 'contact' || clean === 'inquire' || clean === 'inquiry') return 'contact';
  if (clean === 'privacy-policy' || clean === 'privacy' || clean === 'terms') return 'privacy-policy';
  return 'home';
};

const getPathFromPage = (page) => {
  if (page === 'home') return '/';
  if (page === 'verify-email') return window.location.pathname.startsWith('/verify') ? window.location.pathname : '/verify-email';
  if (page === 'about') return '/about-us';
  return `/${page}`;
};

export default function App() {
  const [activePage, setActivePageState] = useState(() => {
    return getPageFromPath(window.location.pathname);
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('an_active_session_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Function to navigate and update the browser address bar + history
  const setActivePage = (page) => {
    setActivePageState(page);
    const targetPath = getPathFromPage(page);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
  };

  // =====================================================================
  // DYNAMIC CONSENT-BASED ANALYTICS & TRACKER LOADER
  // =====================================================================
  useEffect(() => {
    const loadTrackers = () => {
      try {
        // 1. Check what the user clicked in the banner
        const consent = localStorage.getItem('cookieConsent') || localStorage.getItem('anjaney_cookie_consent');

        // 2. Only load trackers if they clicked "Accept All"
        if (consent === 'all') {
          // Prevent duplicate injection
          if (document.getElementById('ga-gtag-script')) return;

          // Example: Injecting Google Analytics dynamically
          const script = document.createElement('script');
          script.id = 'ga-gtag-script';
          script.src = "https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID";
          script.async = true;
          document.head.appendChild(script);

          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR_TRACKING_ID');
        }
      } catch (err) {
        // If cookies or storage are disabled by browser, site still works 100%
        console.warn('Cookie storage unavailable; trackers not loaded:', err);
      }
    };

    // Initial check on mount
    loadTrackers();

    // Listen for live consent updates dispatched from Cookie Banner or Privacy Policy page
    const handleConsentChange = (e) => {
      if (e?.detail === 'all') {
        loadTrackers();
      }
    };
    window.addEventListener('anjaney_cookie_consent_updated', handleConsentChange);
    return () => {
      window.removeEventListener('anjaney_cookie_consent_updated', handleConsentChange);
    };
  }, []);

  // =====================================================================
  // BULLETPROOF EMAIL LINK DETECTOR & VERIFIER
  // =====================================================================
  useEffect(() => {
    // Safely extract parameters whether using standard URLs or Hash Routing (/#/...)
    const queryString = window.location.search || (window.location.hash.includes('?') ? window.location.hash.substring(window.location.hash.indexOf('?')) : '');
    const urlParams = new URLSearchParams(queryString);
    
    const verifyEmail = urlParams.get('verify_email');
    const token = urlParams.get('token');

    if (verifyEmail && token) {
      const STORAGE_KEY = 'an_secure_corporate_database';
      const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      // Find the exact user with the matching email and security token
      const userIndex = storedUsers.findIndex(
        (u) => u.email.toLowerCase() === verifyEmail.toLowerCase() && u.verificationToken === token
      );

      if (userIndex !== -1) {
        // 1. Mark account as Verified and destroy the used token
        storedUsers[userIndex].isVerified = true;
        storedUsers[userIndex].verificationToken = null;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedUsers));

        // 2. Automatically sign them in
        const verifiedAccount = storedUsers[userIndex];
        localStorage.setItem('an_active_session_user', JSON.stringify(verifiedAccount));
        setCurrentUser(verifiedAccount);
        window.dispatchEvent(new Event('auth-change'));

        // 3. Alert Success
        alert(`✅ Success! The account for ${verifyEmail} is now verified and active.`);

        // 4. Clean the browser URL so it doesn't try to verify again if refreshed
        window.history.replaceState({}, document.title, window.location.pathname);

        // 5. Route to homepage
        setActivePage('home');
      } else {
        alert('❌ Invalid or expired verification link. Please check your email or register again.');
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);
  // =====================================================================

  // Listen for browser Back and Forward button events
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath(window.location.pathname);
      setActivePageState(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const syncSession = (e) => {
      try {
        const saved = localStorage.getItem('an_active_session_user');
        const parsed = saved ? JSON.parse(saved) : null;
        setCurrentUser(parsed);

        // If this event was triggered by another tab completing verification
        if (e && e.key === 'emailVerifiedEvent' && e.newValue) {
          try {
            localStorage.removeItem('emailVerifiedEvent');
            setActivePage('home');
          } catch {
            setActivePage('home');
          }
        }
      } catch {
        setCurrentUser(null);
      }
    };

    window.addEventListener('auth-change', syncSession);
    window.addEventListener('storage', syncSession);
    return () => {
      window.removeEventListener('auth-change', syncSession);
      window.removeEventListener('storage', syncSession);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('an_active_session_user');
    setCurrentUser(null);
    window.dispatchEvent(new Event('auth-change'));
    setActivePage('home');
  };

  return (
    <AuthProvider>
      <AppContent
        activePage={activePage}
        setActivePage={setActivePage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        handleSignOut={handleSignOut}
      />
    </AuthProvider>
  );
}

function AppContent({
  activePage,
  setActivePage,
  currentUser,
  setCurrentUser,
  handleSignOut,
  pendingVerificationEmail,
  setPendingVerificationEmail,
}) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 flex flex-col justify-between relative ${isDarkMode ? 'bg-gradient-to-b from-[#141312] via-[#1a1816] to-[#141312] text-slate-100' : 'bg-gradient-to-b from-[#fcfbf8] via-[#f7f4ee] to-[#f4efe4] text-slate-900'}`}>
      
      {/* Global Maritime Trade Coordinate Grid & Ambient Horizon System */}
      <div className={`fixed inset-0 pointer-events-none -z-10 transition-opacity duration-700 ${isDarkMode ? 'bg-trade-grid-dark opacity-75' : 'bg-trade-grid-light opacity-70'}`} />

      {/* Global Dynamic Reading Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2.5px] z-50 pointer-events-none bg-gradient-to-r from-[#c99a42] via-[#dfb25b] to-[#c99a42] transition-all duration-150 ease-out shadow-xs shadow-[#c99a42]/50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div>
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          currentUser={currentUser}
          onSignOut={handleSignOut}
        />

        <main key={activePage} className="animate-page-enter">
          {/* Page Switcher */}
          {activePage === 'home' && <HomePage setActivePage={setActivePage} activePage={activePage} />}
          {activePage === 'products' && <ProductsPage setActivePage={setActivePage} />}
          {activePage === 'about' && <AboutPage setActivePage={setActivePage} />}
          {activePage === 'certificates' && <CertificatesPage />}
          {activePage === 'contact' && <InquirePage setActivePage={setActivePage} />}
          {activePage === 'privacy-policy' && <PrivacyPolicy />}
          {activePage === 'verify-email' && <VerifyEmail setActivePage={setActivePage} />}
        </main>
      </div>

      {/* Dynamic Floating Back To Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-2xl shadow-xl transition-all duration-300 cursor-pointer border flex items-center justify-center group ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        } ${
          isDarkMode
            ? 'bg-[#1f1b17]/95 backdrop-blur-md border-[#332b21] text-[#c99a42] hover:bg-[#c99a42] hover:text-white shadow-black/80'
            : 'bg-[#f7f4ee]/95 backdrop-blur-md border-[#e8e2d4] text-[#c99a42] hover:bg-[#c99a42] hover:text-white shadow-[0_10px_25px_rgba(201,154,66,0.12)]'
        }`}
      >
        <svg className="w-5 h-5 transform transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Simple Professional Corporate Footer */}
      <footer className={`border-t py-12 transition-colors duration-300 relative overflow-hidden ${
        isDarkMode ? 'bg-gradient-to-b from-[#1a1a1a] via-[#141312] to-[#0d0c0b] border-[#29221a] text-slate-300' : 'bg-gradient-to-b from-[#f7f4ee] via-[#efeae0] to-[#e8e1d3] border-[#e2d9c8] text-slate-700'
      }`}>
        {/* Maritime Trade Coordinates & Horizon Highlight in Footer Background */}
        <div className="absolute inset-0 pointer-events-none bg-trade-grid-light dark:bg-trade-grid-dark opacity-35"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#c99a42]/30 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
            
            <div className="md:col-span-2 space-y-3">
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
                Anjaney Nexus India LLP
              </h3>
              <p className="text-xs leading-relaxed max-w-sm">
                Connecting businesses with dependable international trade solutions, verified agricultural commodities sourcing, and reliable supply chain logistics.
              </p>
            </div>

            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setActivePage('home')} className="hover:text-orange-500 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5">Home</button></li>
                <li><button onClick={() => setActivePage('about')} className="hover:text-orange-500 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5">About Us</button></li>
                <li><button onClick={() => setActivePage('products')} className="hover:text-orange-500 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5">Products & Services</button></li>
                <li><button onClick={() => setActivePage('contact')} className="hover:text-orange-500 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5">Contact</button></li>
                <li><button onClick={() => setActivePage('privacy-policy')} className="hover:text-orange-500 dark:hover:text-orange-400 hover:translate-x-1 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5">Privacy & Terms</button></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>
                Contact Details
              </h4>
              <p className="text-xs leading-relaxed">
                C/145, First Floor, B G Tower,<br />
                Delhi Darwaja, Ahmedabad,<br />
                Gujarat, India
              </p>
              <div className="mt-2 space-y-1 text-xs">
                <p><a href="mailto:admin@anjaneynexus.com" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">admin@anjaneynexus.com</a></p>
                <p><a href="tel:+919824056061" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">+91 98240 56061</a></p>
              </div>
            </div>

          </div>

          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDarkMode ? 'border-[#291e17] text-slate-400' : 'border-[#e2d0b5] text-slate-600'
          }`}>
            <p>© {new Date().getFullYear()} Anjaney Nexus India LLP. All rights reserved.</p>
            <p className="text-[11px] inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Import & Export • Agricultural Commodities & Logistics</span>
            </p>
          </div>
        </div>
      </footer>
      <CookieConsent activePage={activePage} />
    </div>
  );
}