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
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] dark:from-[#0a0f1d] dark:via-[#0d1527] dark:to-[#0a0f1d] font-sans py-20 md:py-32 transition-colors duration-500 relative overflow-hidden">
      
      {/* MARITIME TRADE & LOGISTICS BACKGROUND OVERLAY */}
      <div className="absolute inset-0 pointer-events-none -z-0 transition-opacity duration-700 bg-trade-grid-light dark:bg-trade-grid-dark opacity-75 dark:opacity-80"></div>

      {/* AMBIENT DYNAMIC MARITIME BEACONS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-25 -z-0 bg-gradient-to-br from-sky-500/20 via-blue-500/15 to-transparent animate-maritime-drift"></div>
      <div className="absolute top-[450px] right-10 w-[600px] h-[600px] rounded-full pointer-events-none blur-3xl -z-0 bg-gradient-to-bl from-cyan-500/15 via-sky-500/15 to-transparent animate-float-slow"></div>
      <div className="absolute bottom-20 left-10 w-[550px] h-[550px] rounded-full pointer-events-none blur-3xl -z-0 bg-gradient-to-tr from-sky-500/15 via-blue-500/15 to-transparent animate-maritime-drift"></div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
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
            <ul className="space-y-2.5 pl-2">
              <li className="flex items-start">
                <span className="text-orange-500 dark:text-orange-400 mr-3 font-black text-lg leading-none">•</span>
                <span><strong className="text-slate-800 dark:text-slate-100 font-bold">Corporate Identity Data:</strong> Company name, registered addresses, and buyer credentials.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 dark:text-orange-400 mr-3 font-black text-lg leading-none">•</span>
                <span><strong className="text-slate-800 dark:text-slate-100 font-bold">Contact Information:</strong> Primary and billing email addresses, phone numbers, and representative names.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 dark:text-orange-400 mr-3 font-black text-lg leading-none">•</span>
                <span><strong className="text-slate-800 dark:text-slate-100 font-bold">Trade Data:</strong> Details of your RFQs, commodity requirements (e.g., spices, rice, oilseeds), port of destination, and preferred shipping terms (FOB, CIF).</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 dark:text-orange-400 mr-3 font-black text-lg leading-none">•</span>
                <span><strong className="text-slate-800 dark:text-slate-100 font-bold">Usage Data & Cookies:</strong> We use cookies to track portal usage, manage user authentication securely, and optimize the buyer journey.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              3. Cookie Policy & Tracking
            </h2>
            <p className="mb-4">
              Our website utilizes cookies to ensure core functionality and security (Essential Cookies), as well as to analyze site traffic (Analytics Cookies). When you first visit our site, you are presented with a Cookie Banner allowing you to accept all cookies or proceed with essential ones. You may revoke or modify your consent at any time using the cookie settings button.
            </p>

            {/* Interactive Cookie Preference Settings */}
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 mt-4 shadow-[0_12px_30px_rgba(14,165,233,0.06)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
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
                        ? 'bg-blue-950 text-white border-blue-950 dark:bg-orange-400 dark:border-orange-400 shadow-sm'
                        : 'bg-white dark:bg-[#0a0f1d] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-400'
                    }`}
                  >
                    ESSENTIAL
                  </button>
                  <button
                    onClick={() => handleUpdateConsent('all')}
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                      consent === 'all'
                        ? 'bg-orange-500 text-white border-orange-500 dark:bg-orange-400 dark:border-orange-400 shadow-sm'
                        : 'bg-white dark:bg-[#0a0f1d] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-400'
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
            <ul className="space-y-2.5 pl-2">
              <li className="flex items-start">
                <span className="text-orange-500 dark:text-orange-400 mr-3 font-black text-lg leading-none">•</span>
                <span>Verifying corporate buyers and mitigating trade fraud.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 dark:text-orange-400 mr-3 font-black text-lg leading-none">•</span>
                <span>Generating and dispatching accurate Proforma Invoices based on your RFQs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 dark:text-orange-400 mr-3 font-black text-lg leading-none">•</span>
                <span>Providing secure access to our Trade Control Panel.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 dark:text-orange-400 mr-3 font-black text-lg leading-none">•</span>
                <span>Communicating updates regarding logistics, shipments, and commodity market feeds.</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              5. Data Sharing & Third Parties
            </h2>
            <p>
              To fulfill export requirements and logistics, we may share necessary corporate and trade data with trusted third parties, including freight forwarders, shipping lines, customs authorities, and regulatory bodies (such as APEDA or the Spices Board).
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              6. Data Security
            </h2>
            <p>
              We value the trust you place in providing your corporate information. Our platform uses standard encryption protocols for data transmission. Access to trade information and client records is strictly restricted and monitored. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              7. Terms of Trade
            </h2>
            <p>
              Information provided on this website does not constitute a binding legal contract until a formal Proforma Invoice is signed by both parties. All agro-commodity exports are subject to Indian export regulations, third-party inspection clearances (where applicable), and mutually agreed incoterms.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              8. Your Data Rights
            </h2>
            <p>
              You have the right to access, update, or request the deletion of your corporate account information at any time. To exercise these rights, please contact our compliance team.
            </p>
          </section>

          {/* Section 9 */}
          <section className="bg-white dark:bg-[#181310] border border-[#ebdcc8] dark:border-[#33251c] p-6 sm:p-8 rounded-2xl shadow-[0_12px_30px_rgba(217,119,6,0.06)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.4)] mt-8">
            <h2 className="text-xl font-black text-blue-950 dark:text-white mb-4">
              9. Contact Us
            </h2>
            <p className="mb-4">
              If you have any questions or concerns regarding this Privacy Policy or your data, please contact our compliance team:
            </p>
            <address className="not-italic font-medium text-slate-700 dark:text-slate-300 space-y-1.5">
              <p className="font-bold text-blue-950 dark:text-white text-base">Anjaney Nexus India LLP</p>
              <p>C/145, First Floor, B G Tower, Delhi Darwaja</p>
              <p>Ahmedabad, Gujarat, India</p>
              <div className="pt-3 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-slate-400 dark:text-slate-500 font-semibold text-xs uppercase tracking-wider min-w-[50px]">Email:</span>
                  <a 
                    href="mailto:yatharthjoshi127@gmail.com" 
                    className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-bold transition-colors"
                  >
                    yatharthjoshi127@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-slate-400 dark:text-slate-500 font-semibold text-xs uppercase tracking-wider min-w-[50px]">Phone:</span>
                  <a 
                    href="tel:+919879756061" 
                    className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-bold transition-colors"
                  >
                    +91 98797 56061
                  </a>
                </p>
              </div>
            </address>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
