import React, { useState } from 'react';

const Certificates = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalCert, setActiveModalCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  
  const certificates = [
    { 
      id: "apeda",
      title: "APEDA Registration Documentation", 
      authority: "Agricultural & Processed Food Products Export Dev. Authority",
      image: "/Certi_Img/apeda.jpg",
      docLabel: "Registration number",
      description: "Request the current RCMC and verify it's holder, registration number, scheduled-product scope and validity before relying on it.",
      waText: "Hello, I need a copy of your APEDA RCMC certificate. Product/page: Proof & DocumentVerification Source page: /certificates.html"
    },
    { 
      id: "spices-board",
      title: "Spices Board Documentation", 
      authority: "Spices Board of India, Govt. of India",
      image: "/Certi_Img/spices-board.jpg",
      docLabel: "Registration number",
      description: "Spices Board registration summary for regulated spice-export activities. Current scope and validity should be checked against the stamped copy.",
      waText: "Hello, I need a copy of your Spices Board certificate. Product/page: Proof & DocumentVerification Source page: /certificates.html"
    },
    { 
      id: "fssai",
      title: "FSSAI Licence Documentation", 
      authority: "Food Safety & Standards Authority of India",
      image: "/Certi_Img/fssai.jpg",
      docLabel: "Licence number",
      description: "Food-business licencing summary for the activities listed on the current FSSAI document. Buyers can request the stamped copy and scope for verification.",
      waText: "Hello, I need a copy of your FSSAI Licence certificate. Product/page: Proof & DocumentVerification Source page: /certificates.html"
    }
  ];

  const filteredCerts = selectedFilter === 'all' 
    ? certificates 
    : certificates.filter(c => c.id === selectedFilter);

  const handleCopy = (cert) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${cert.title} - ${cert.authority}`);
      setCopiedId(cert.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] dark:from-[#0a0f1d] dark:via-[#0d1527] dark:to-[#0a0f1d] font-sans py-16 md:py-24 transition-colors duration-500 relative overflow-hidden">
      {/* MARITIME TRADE & LOGISTICS BACKGROUND OVERLAY */}
      <div className="absolute inset-0 pointer-events-none -z-0 transition-opacity duration-700 bg-trade-grid-light dark:bg-trade-grid-dark opacity-75 dark:opacity-80"></div>

      {/* Dynamic Ambient Maritime Background Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-25 -z-0 bg-gradient-to-br from-sky-500/20 via-blue-500/15 to-transparent animate-maritime-drift"></div>
      <div className="absolute bottom-20 right-10 w-[550px] h-[550px] rounded-full pointer-events-none blur-3xl opacity-20 -z-0 bg-gradient-to-tl from-cyan-500/15 via-sky-500/15 to-transparent animate-float-slow"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* PAGE HEADER */}
        <div className="text-center mb-12 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl backdrop-blur-md bg-gradient-to-b from-transparent via-slate-100/80 to-transparent dark:via-[#0f172a]/80">
          <span className="text-xs font-black text-orange-500 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-[#01040a] dark:border-orange-400/30 px-3 py-1 rounded-full border border-orange-100 mb-4 inline-block shadow-xs">
            Verified Credentials
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 dark:text-white tracking-tight leading-tight mb-6">
            Document <span className="text-orange-500 dark:text-orange-400">Verification.</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
            Use this evidence register to distinguish issuer badges, requested documents and shipment-specific records. Rely only on a current document whose holder, scope and validity you have verified.
          </p>

          {/* Interactive Dynamic Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-105'
                  : 'bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-400'
              }`}
            >
              All Credentials ({certificates.length})
            </button>
            {certificates.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedFilter(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  selectedFilter === c.id
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-105'
                    : 'bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-400'
                }`}
              >
                {c.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* DETAILED VERIFICATION CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 backdrop-blur-md rounded-2xl overflow-hidden hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300 shadow-[0_12px_32px_rgba(14,165,233,0.06)] dark:shadow-[0_14px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_38px_rgba(14,165,233,0.16)] flex flex-col group relative before:absolute before:inset-x-0 before:top-0 before:h-[2.5px] before:bg-gradient-to-r before:from-transparent before:via-sky-400 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:z-10"
            >
              
              {/* Card Top: Logo & Title */}
              <div className="p-6 flex items-start gap-4">
                <div 
                  onClick={() => setActiveModalCert(cert)}
                  title="Click to expand credential preview"
                  className="w-20 h-20 bg-white rounded-xl flex shrink-0 items-center justify-center p-2 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer group-hover:scale-105 transition-transform duration-300"
                >
                  <img 
                    src={cert.image} 
                    alt={cert.id} 
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                
                <div className="flex flex-col items-start pt-1">
                  <h3 
                    onClick={() => setActiveModalCert(cert)}
                    className="text-lg font-bold text-blue-950 dark:text-white leading-tight mb-1 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    {cert.authority}
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200 shadow-xs">
                    <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-slate-200 dark:bg-slate-800"></div>

              {/* Card Bottom: Text & Details */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {cert.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <p className="text-sm font-bold text-blue-950 dark:text-white mb-0.5">{cert.docLabel}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Not published</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-950 dark:text-white mb-0.5">Valid until</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Check current copy</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                  {/* STANDARD WHATSAPP WEB ROUTING LINK */}
                  <a 
                    href={`https://wa.me/919925816161?text=${encodeURIComponent(cert.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:shadow-sm cursor-pointer w-max"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Request
                  </a>

                  {/* Interactive Quick Preview Button */}
                  <button
                    type="button"
                    onClick={() => setActiveModalCert(cert)}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/50 transition-all cursor-pointer"
                    title="View Credential Card"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DYNAMIC MODAL / LIGHTBOX PREVIEW */}
      {activeModalCert && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-page-enter"
          onClick={() => setActiveModalCert(null)}
        >
          <div 
            className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 bg-[#ffffff] rounded-2xl flex items-center justify-center p-4 border border-slate-200 dark:border-slate-800 shadow-sm mb-5">
                <img 
                  src={activeModalCert.image} 
                  alt={activeModalCert.id} 
                  className="w-full h-full object-contain mix-blend-multiply" 
                />
              </div>

              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200 mb-3 shadow-xs">
                <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </div>

              <h3 className="text-xl font-black text-blue-950 dark:text-white mb-1">
                {activeModalCert.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
                {activeModalCert.authority}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-left bg-slate-50 dark:bg-[#0a0f1d] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                {activeModalCert.description}
              </p>

              <div className="grid grid-cols-2 gap-4 w-full mb-6 text-left">
                <div className="bg-slate-50 dark:bg-[#0a0f1d] p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-blue-950 dark:text-white mb-0.5">{activeModalCert.docLabel}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Not published</p>
                </div>
                <div className="bg-slate-50 dark:bg-[#0a0f1d] p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-blue-950 dark:text-white mb-0.5">Valid until</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Check current copy</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full">
                <a 
                  href={`https://wa.me/919925816161?text=${encodeURIComponent(activeModalCert.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Request
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(activeModalCert)}
                  className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/50 transition-colors cursor-pointer"
                >
                  {copiedId === activeModalCert.id ? 'Copied!' : 'Copy Info'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
