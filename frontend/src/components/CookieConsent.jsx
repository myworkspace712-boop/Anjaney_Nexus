import React, { useState, useEffect } from 'react';

// Central helper functions for retrieving and setting cookie consent
export const getCookieConsent = () => {
  try {
    const local = localStorage.getItem('anjaney_cookie_consent') || localStorage.getItem('an_cookie_consent');
    if (local) return local;
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|; )anjaney_cookie_consent=([^;]*)/);
      if (match) return match[1];
    }
  } catch (e) {
    console.error('Error reading cookie consent:', e);
  }
  return null;
};

export const setCookieConsent = (value) => {
  try {
    localStorage.setItem('anjaney_cookie_consent', value);
    localStorage.setItem('an_cookie_consent', value);
    if (typeof document !== 'undefined') {
      document.cookie = `anjaney_cookie_consent=${value}; path=/; max-age=31536000; SameSite=Lax`;
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('anjaney_cookie_consent_updated', { detail: value }));
    }
  } catch (e) {
    console.error('Error saving cookie consent:', e);
  }
};

const CookieConsent = ({ activePage }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [consentStatus, setConsentStatus] = useState(getCookieConsent);

  const isPrivacyPage = activePage === 'privacy-policy' || 
    (typeof window !== 'undefined' && (
      window.location.pathname.toLowerCase().includes('privacy') || 
      window.location.hash.toLowerCase().includes('privacy')
    ));

  // Check on mount and whenever activePage changes: if already accepted, do not show drop-up
  useEffect(() => {
    const current = getCookieConsent();
    if (current) {
      setConsentStatus(current);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, [activePage]);

  // Listen to consent updates dispatched from Privacy Policy page or other components
  useEffect(() => {
    const handleUpdate = (e) => {
      const val = (e && e.detail) || getCookieConsent();
      if (val) {
        setConsentStatus(val);
        setShowBanner(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('anjaney_cookie_consent_updated', handleUpdate);
      window.addEventListener('storage', handleUpdate);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('anjaney_cookie_consent_updated', handleUpdate);
        window.removeEventListener('storage', handleUpdate);
      }
    };
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent('all');
    setConsentStatus('all');
    setShowBanner(false);
  };

  const handleAcceptEssential = () => {
    setCookieConsent('essential');
    setConsentStatus('essential');
    setShowBanner(false);
  };

  const openSettings = () => {
    setShowBanner(true);
  };

  return (
    <>
      {/* FLOATING COOKIE SETTINGS BUTTON (Visible when banner is hidden) */}
      {!showBanner && (
        <button 
          onClick={openSettings}
          className="fixed bottom-4 left-4 z-50 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-slate-800 p-3 rounded-full shadow-lg hover:border-orange-500 dark:hover:border-orange-400 transition-colors group cursor-pointer"
          aria-label="Cookie Settings"
          title="Cookie Settings"
        >
          <svg className="w-5 h-5 text-blue-950 dark:text-slate-300 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}

      {/* COOKIE CONSENT BANNER (DROP-UP) */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 w-full z-[100] p-4 sm:p-6 md:p-8 animate-fade-in-up font-sans pointer-events-none">
          <div className="max-w-5xl mx-auto bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-blue-950/10 dark:shadow-black pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8">
            
            {/* Text Content */}
            <div className="flex-grow max-w-3xl">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-5 h-5 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-black text-blue-950 dark:text-white tracking-tight">
                  Privacy & Cookie Policy
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                We use cookies to ensure core functionality and security (Essential Cookies), as well as to analyze site traffic (Analytics Cookies) to optimize your B2B export journey. By clicking "Accept All", you consent to our use of all cookies. You may also proceed with essential cookies only.{!isPrivacyPage && (
                  <>
                    {' '}
                    <a href="/privacy-policy" className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-bold underline underline-offset-2 transition-colors">
                      Read full policy
                    </a>.
                  </>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={handleAcceptEssential}
                className="px-6 py-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-blue-950 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-black text-xs uppercase tracking-widest rounded-xl transition-colors text-center cursor-pointer"
              >
                Essential
              </button>
              <button 
                onClick={handleAcceptAll}
                className="px-6 py-3.5 bg-blue-950 hover:bg-orange-500 dark:bg-blue-600 dark:hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm text-center cursor-pointer"
              >
                Accept All
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Global Animation Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}} />
    </>
  );
};

export default CookieConsent;
