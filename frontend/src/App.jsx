import React, { useState, useEffect, createContext, useContext } from 'react';
import ProductsPage from './pages/Products';
import HeroCarousel from './components/HeroCarousel';
import ProfileIcon from './components/ProfileIcon';
import Navbar from './components/Navbar';
import CookieConsent from './components/CookieConsent';
import { useTheme } from './context/ThemeContext';

// ==========================================
// 1. CONTEXT SETUP (Auth & Cart)
// ==========================================
const AuthContext = createContext();
const CartContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('an_user');
      return saved ? JSON.parse(saved) : { email: 'admin@anjaneynexus.com', role: 'admin' };
    } catch {
      return { email: 'admin@anjaneynexus.com', role: 'admin' };
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

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ==========================================
// 2. NAVBAR IMPORTED FROM ./components/Navbar
// ==========================================

import HomePage from './pages/Home';





// ==========================================
// 5. ADMIN PAGE COMPONENT
// ==========================================
const AdminPage = ({ setActivePage }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('rfqs');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-950 p-8 rounded-2xl border border-red-500/30 text-center space-y-4 shadow-2xl">
          <div className="text-4xl">🚫</div>
          <h2 className="text-2xl font-black text-white">Access Denied</h2>
          <p className="text-sm text-slate-400">
            This dashboard is restricted to Anjaney Nexus India LLP administrators.
          </p>
          <button
            onClick={() => setActivePage('home')}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors text-sm cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="px-2.5 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs font-bold rounded uppercase">
              Admin Privilege Active
            </span>
            <h1 className="text-3xl font-black text-white mt-2">Executive Control Panel</h1>
            <p className="text-xs text-slate-400 mt-1">Logged in as: <strong className="text-orange-400">{user.email}</strong></p>
          </div>
          <button
            onClick={() => setActivePage('home')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-700 cursor-pointer"
          >
            ← Back to Public Site
          </button>
        </div>

        {/* Admin Tabs */}
        <div className="flex border-b border-slate-800 gap-6">
          <button
            onClick={() => setActiveTab('rfqs')}
            className={`pb-3 font-bold text-sm border-b-2 cursor-pointer ${
              activeTab === 'rfqs' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            📦 RFQs (2)
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 font-bold text-sm border-b-2 cursor-pointer ${
              activeTab === 'users' ? 'border-orange-500 text-orange-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            👥 Corporate Email Entities
          </button>
        </div>

        {/* Tab 1: RFQs */}
        {activeTab === 'rfqs' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Incoming Quote Requests</h2>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="font-mono text-xs text-orange-400">RFQ-8821</span>
                <h3 className="text-lg font-bold">Apex Global Trade Corp (Rahul Sharma)</h3>
                <p className="text-sm text-slate-300 mt-1">Granular Urea 46% (500 Metric Tons)</p>
                <div className="flex gap-4 text-xs text-slate-400 mt-2 font-mono">
                  <span>Primary: trade@apexglobal.com</span>
                  <span>Billing: accounts@apexglobal.com</span>
                </div>
              </div>
              <button
                onClick={() => alert('Issuing official quote...')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 font-bold text-xs rounded-lg whitespace-nowrap cursor-pointer"
              >
                Send Formal Quote
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Users */}
        {activeTab === 'users' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-950 text-slate-400 text-xs uppercase border-b border-slate-800">
                  <th className="p-4">Company</th>
                  <th className="p-4">Primary Email</th>
                  <th className="p-4">Billing Email</th>
                  <th className="p-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-4 font-bold text-white">Anjaney Nexus India LLP</td>
                  <td className="p-4 font-mono text-xs text-orange-400">admin@anjaneynexus.com</td>
                  <td className="p-4 font-mono text-xs text-slate-400">finance@anjaneynexus.com</td>
                  <td className="p-4"><span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-bold">Administrator</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

// ==========================================
// 6. OTHER PAGE PLACEHOLDERS
// ==========================================
import AboutPage from './pages/About';
import CertificatesPage from './pages/Certificates';
import CartPage from './pages/CartPage';
import AuthPage from './pages/Auth';
import RegisterPage from './pages/RegisterPage';
import Admin from './pages/Admin';
import VerifyEmail from './pages/VerifyEmail';
import InquirePage from './pages/Inquire';
import PrivacyPolicy from './pages/PrivacyPolicy';

// ==========================================
// 7. MAIN APP WRAPPER
// ==========================================
const getPageFromPath = (path) => {
  const clean = path.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'home') return 'home';
  if (clean.startsWith('verify-email') || clean.startsWith('verify')) return 'verify-email';
  if (clean === 'login' || clean === 'signin' || clean === 'auth') return 'auth';
  if (clean === 'register' || clean === 'signup') return 'register';
  if (clean === 'create-account') return 'create-account';
  if (clean === 'products' || clean === 'services') return 'products';
  if (clean === 'about' || clean === 'about-us') return 'about';
  if (clean === 'certificates') return 'certificates';
  if (clean === 'cart' || clean === 'trolley') return 'cart';
  if (clean === 'contact' || clean === 'inquire' || clean === 'inquiry') return 'contact';
  if (clean === 'privacy-policy' || clean === 'privacy' || clean === 'terms') return 'privacy-policy';
  if (clean === 'admin' || clean === 'admin-dashboard') return 'admin';
  if (clean === 'dashboard') return 'home';
  return 'home';
};

const getPathFromPage = (page) => {
  if (page === 'home') return '/';
  if (page === 'auth') return '/auth';
  if (page === 'register') return '/register';
  if (page === 'admin') return '/admin-dashboard';
  if (page === 'verify-email') return window.location.pathname.startsWith('/verify') ? window.location.pathname : '/verify-email';
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

        // 5. Route to their appropriate dashboard
        setActivePage(verifiedAccount.role === 'admin' ? 'admin' : 'home');
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
            const eventData = JSON.parse(e.newValue);
            const user = eventData.user || parsed;
            localStorage.removeItem('emailVerifiedEvent');
            const targetPage = user?.role === 'admin' || user?.isAdmin ? 'admin' : 'home';
            setActivePage(targetPage);
          } catch {
            const targetPage = parsed?.role === 'admin' || parsed?.isAdmin ? 'admin' : 'home';
            setActivePage(targetPage);
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
    setActivePage('auth');
  };

  return (
    <AuthProvider>
      <CartProvider>
        <AppContent
          activePage={activePage}
          setActivePage={setActivePage}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          handleSignOut={handleSignOut}
        />
      </CartProvider>
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
  const { cartItems, setCartItems, removeFromCart, clearCart } = useCart();
  const navCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 flex flex-col justify-between ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div>
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          navCount={navCount}
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
          {activePage === 'cart' && (
            <CartPage
              cartItems={cartItems}
              setCartItems={setCartItems}
              setActivePage={setActivePage}
              currentUser={currentUser}
            />
          )}
          {activePage === 'verify-email' && <VerifyEmail setActivePage={setActivePage} />}
          {activePage === 'auth' && (
            <AuthPage
              setActivePage={setActivePage}
              setCurrentUser={(user) => {
                localStorage.setItem('an_active_session_user', JSON.stringify(user));
                setCurrentUser(user);
              }}
            />
          )}
          {activePage === 'register' && (
            <RegisterPage
              setActivePage={setActivePage}
              setCurrentUser={setCurrentUser}
            />
          )}
          {activePage === 'create-account' && (
            <CreateAccountPage
              setActivePage={setActivePage}
              setCurrentUser={setCurrentUser}
            />
          )}
          {activePage === 'admin' && (
            <Admin
              setActivePage={setActivePage}
              currentUser={currentUser}
            />
          )}
        </main>
      </div>

      {/* Simple Professional Corporate Footer */}
      <footer className={`border-t py-12 transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
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
            isDarkMode ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'
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