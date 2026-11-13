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

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 flex flex-col justify-between ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div>
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          currentUser={currentUser}
          onSignOut={handleSignOut}
        />

        <main>
          {/* Page Switcher */}
          {activePage === 'home' && <HomePage setActivePage={setActivePage} activePage={activePage} />}
          {activePage === 'products' && <ProductsPage setActivePage={setActivePage} />}
          {activePage === 'about' && <AboutPage />}
          {activePage === 'certificates' && <CertificatesPage />}
          {activePage === 'contact' && <InquirePage setActivePage={setActivePage} />}
          {activePage === 'privacy-policy' && <PrivacyPolicy />}
          {activePage === 'verify-email' && <VerifyEmail setActivePage={setActivePage} />}
        </main>
      </div>

      {/* Simple Professional Corporate Footer */}
      <footer className={`border-t py-12 transition-colors duration-200 ${
        isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-slate-200/75 border-slate-300 text-slate-700'
      }`}>
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
                <li><button onClick={() => setActivePage('home')} className="hover:text-blue-600 transition-colors cursor-pointer">Home</button></li>
                <li><button onClick={() => setActivePage('about')} className="hover:text-blue-600 transition-colors cursor-pointer">About Us</button></li>
                <li><button onClick={() => setActivePage('products')} className="hover:text-blue-600 transition-colors cursor-pointer">Products & Services</button></li>
                <li><button onClick={() => setActivePage('contact')} className="hover:text-blue-600 transition-colors cursor-pointer">Contact</button></li>
                <li><button onClick={() => setActivePage('privacy-policy')} className="hover:text-blue-600 transition-colors cursor-pointer">Privacy & Terms</button></li>
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
                <p><a href="mailto:admin@anjaneynexus.com" className="hover:text-blue-600 transition-colors">admin@anjaneynexus.com</a></p>
                <p><a href="tel:+919824056061" className="hover:text-blue-600 transition-colors">+91 98240 56061</a></p>
              </div>
            </div>

          </div>

          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDarkMode ? 'border-zinc-800 text-zinc-400' : 'border-slate-300 text-slate-600'
          }`}>
            <p>© {new Date().getFullYear()} Anjaney Nexus India LLP. All rights reserved.</p>
            <p className="text-[11px]">Import & Export • Agricultural Commodities & Logistics</p>
          </div>
        </div>
      </footer>
      <CookieConsent activePage={activePage} />
    </div>
  );
}