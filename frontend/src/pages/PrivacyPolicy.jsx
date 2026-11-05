import React, { useState, useEffect } from 'react';
import { getCookieConsent, setCookieConsent } from '../components/CookieConsent';

const PrivacyPolicy = () => {
  const [consent, setConsent] = useState(getCookieConsent);

  useEffect(() => {
    setConsent(getCookieConsent());
  }, []);

  const handleUpdateConsent = (type) => {
    setCookieConsent(type);
    setConsent(type);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] font-sans py-20 md:py-32 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* HEADER */}
        <div className="mb-16">
          <span className="text-xs font-black text-orange-500 dark:text-orange-400 uppercase tracking-[0.2em] mb-4 block">
            Legal Compliance
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 dark:text-white tracking-tight leading-[1.1] mb-6">
            Privacy & Cookie Policy
          </h1>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 pb-8">
            Anjaney Nexus India LLP
          </p>
        </div>

        {/* POLICY CONTENT */}
        <div className="space-y-12 text-slate-600 dark:text-slate-300 text-[15px] sm:text-base leading-relaxed">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to the official web portal of Anjaney Nexus India LLP. This Privacy Policy governs your use of our website, Trade Control Panel, and RFQ (Request for Quotation) systems. By accessing our platform, registering an account, or requesting an export quote, you agree to the collection and use of information in relation to this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">We collect various types of information to provide and improve our B2B export services:</p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 font-black">•</span>
                <span><strong>Corporate Identity Data:</strong> Company name, registered addresses, and buyer credentials.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 font-black">•</span>
                <span><strong>Contact Information:</strong> Primary and billing email addresses, phone numbers, and representative names.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 font-black">•</span>
                <span><strong>Trade Data:</strong> Details of your RFQs, commodity requirements (e.g., spices, rice, oilseeds), port of destination, and preferred shipping terms (FOB, CIF).</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 font-black">•</span>
                <span><strong>Usage Data & Cookies:</strong> We use cookies to track portal usage, manage user authentication securely, and optimize the buyer journey.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              3. Cookie Policy & Tracking
            </h2>
            <p className="mb-4">
              Our website utilizes cookies to ensure core functionality and security (Essential Cookies), as well as to analyze site traffic (Analytics Cookies).
            </p>
            <p className="mb-4">
              When you first visit our site, you are presented with a Cookie Banner allowing you to accept all cookies or proceed with ESSENTIAL ones. You may revoke or modify your consent at any time using the floating cookie settings button at the bottom of the screen.
            </p>

            {/* Interactive Cookie Preference Settings */}
            <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 mt-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-blue-950 dark:text-white">Your Saved Cookie Preference</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Current status:{' '}
                    <span className="font-bold text-orange-600 dark:text-orange-400 uppercase">
                      {consent === 'all' ? 'All Cookies Accepted' : consent === 'essential' ? 'Essential Cookies Only' : 'Not Decided'}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpdateConsent('essential')}
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                      consent === 'essential'
                        ? 'bg-blue-950 text-white border-blue-950 dark:bg-orange-500 dark:border-orange-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    ESSENTIAL
                  </button>
                  <button
                    onClick={() => handleUpdateConsent('all')}
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                      consent === 'all'
                        ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              4. How We Use Your Data
            </h2>
            <p className="mb-4">Anjaney Nexus India LLP processes your data strictly for legitimate business purposes, including:</p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 font-black">•</span>
                <span>Verifying corporate buyers and mitigating trade fraud.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 font-black">•</span>
                <span>Generating and dispatching accurate Proforma Invoices based on your RFQs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 font-black">•</span>
                <span>Providing secure access to our Trade Control Panel.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 font-black">•</span>
                <span>Communicating updates regarding logistics, shipments, and commodity market feeds.</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              5. Data Security
            </h2>
            <p>
              We value the trust you place in providing your corporate information. Our platform uses standard encryption protocols for data transmission. Access to the Admin Dashboard and client directories is strictly restricted and monitored. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              6. Terms of Trade
            </h2>
            <p>
              Information provided on this website does not constitute a binding legal contract until a formal Proforma Invoice is signed by both parties. All agro-commodity exports are subject to Indian export regulations, third-party inspection clearances (where applicable), and mutually agreed incoterms.
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-white dark:bg-black border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm mt-8">
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              7. Contact Us
            </h2>
            <p className="mb-4">If you have any questions or concerns regarding this Privacy Policy or your data, please contact our compliance team:</p>
            <address className="not-italic font-medium text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-bold text-blue-950 dark:text-white">Anjaney Nexus India LLP</p>
              <p>Ahmedabad, Gujarat, India</p>
              <p className="pt-2">
                <span className="text-slate-400 dark:text-slate-500 mr-2">Email:</span> 
                <a href="mailto:privacy@anjaneynexus.com" className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-bold transition-colors">
                  privacy@anjaneynexus.com
                </a>
              </p>
            </address>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
