// =====================================================================
// COMPONENT: TrustCertificatesSection.jsx
// PURPOSE: Replicate the elegant, trust-focused layout of the provided 
// JFT Agro example (image_52b980.png) using J.N. Enterprise branding 
// and specific certificates with interactive verification modal preview.
// =====================================================================

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  FileCheck2, 
  X, 
  Download, 
  ExternalLink,
  Award
} from 'lucide-react';

const TrustCertificatesSection = ({ onReviewAll, customCertificates }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  // Array of Anjaney Nexus specific certificates with actual images in /Certi_Img
  const defaultCertificates = [
    {
      id: 'fssai',
      name: "FSSAI LICENSE",
      category: "Food Safety and Standards Authority of India",
      imagePath: "/Certi_Img/FSSAI.jpg",
      fallbackImage: "/Certi_Img/FSSAI/FSSAI LICENSE ANJANEY_page-0001.jpg",
      certNumber: "FSSAI Central Export License",
      validity: "Active & Verified",
      alt: "FSSAI Food Safety License"
    },
    {
      id: 'apeda',
      name: "APEDA RCMC",
      category: "Agricultural & Processed Food Products Export Authority",
      imagePath: "/Certi_Img/RCMC/RCMC APEDA 1_page-0001.jpg",
      fallbackImage: "/Certi_Img/RCMC/RCMC APEDA 1_page-0001.jpg",
      certNumber: "RCMC APEDA Certified",
      validity: "Export Authorized",
      alt: "APEDA Registration"
    },
    {
      id: 'spices',
      name: "SPICES BOARD",
      category: "Spices Board, Ministry of Commerce & Industry",
      imagePath: "/Certi_Img/RCMC/RCMC Spices Board_page-0001.jpg",
      fallbackImage: "/Certi_Img/RCMC/RCMC Spices Board_page-0001.jpg",
      certNumber: "CRES Certified Exporter",
      validity: "Registered Trader",
      alt: "Spices Board Certification"
    },
    {
      id: 'iec',
      name: "IMPORT EXPORT CODE (IEC)",
      category: "Directorate General of Foreign Trade (DGFT)",
      imagePath: "/Certi_Img/IEC.jpg",
      fallbackImage: "/Certi_Img/anjaney LLP - certificate Of IEC_page-0001.jpg",
      certNumber: "DGFT Verified Code",
      validity: "Lifetime Authorized",
      alt: "IEC Certificate"
    },
    {
      id: 'udyam',
      name: "UDYAM REGISTRATION",
      category: "Ministry of MSME, Govt. of India",
      imagePath: "/Certi_Img/Udhyam.jpg",
      fallbackImage: "/Certi_Img/Udhyam/anjaney LLP - Udhyam Certificate _page-0001.jpg",
      certNumber: "UDYAM-MH-XX-XXXXXXX",
      validity: "Permanent Registration",
      alt: "Udyam Registration Certificate"
    }
  ];

  const certificates = customCertificates || defaultCertificates;

  return (
    <section className="bg-[#f8f9f7] py-20 border-b border-gray-200 relative overflow-hidden font-sans">
      
      {/* Subtle organic background accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-900/[0.02] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-900/[0.03] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. SECTION HEADER (Replicating the typography and pill badge) */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#eef4ee] border border-[#d2e3d3] text-[#2c5b36] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-6 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#2c5b36]" />
            <span>Verified Credentials</span>
          </div>

          {/* Main Headings */}
          <h2 className="text-4xl sm:text-5xl md:text-5xl font-black text-[#11322d] font-serif leading-tight mb-2 tracking-tight">
            Quality Registrations
          </h2>
          <h3 className="text-4xl sm:text-5xl md:text-5xl font-bold text-[#3a6944] font-serif leading-tight mb-6 tracking-tight">
            Available to Verify
          </h3>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl font-normal">
            Our registrations support manufacturing and supply operations across all product categories. Clients can review current stamped copies before contracting.
          </p>

          {/* Review Link / Action */}
          <button 
            type="button"
            onClick={() => onReviewAll ? onReviewAll() : setSelectedCert(certificates[0])}
            className="inline-flex items-center text-xs sm:text-sm font-bold text-[#627725] hover:text-[#455518] uppercase tracking-widest transition-all group cursor-pointer"
          >
            <span>Review Verification Documents</span>
            <ArrowUpRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 2. CERTIFICATE GRID (Card design with green checkmarks) */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {certificates.map((cert, index) => (
            <div 
              key={cert.id || index} 
              onClick={() => setSelectedCert(cert)}
              className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.07)] p-8 relative flex flex-col items-center justify-between w-full sm:w-[320px] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.12)] transition-all duration-300 group overflow-hidden border border-gray-100/90 cursor-pointer"
            >
              {/* Top Golden Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 opacity-80"></div>
              
              {/* Verified Green Check Icon */}
              <div className="absolute top-4 right-4 text-emerald-700 bg-emerald-50 rounded-full p-1 border border-emerald-100 shadow-xs group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
              </div>

              {/* Certificate Image/Icon Container */}
              <div className="h-28 flex items-center justify-center my-4 w-full relative">
                <img 
                  src={cert.imagePath} 
                  alt={cert.alt} 
                  className="max-h-full max-w-[85%] object-contain mix-blend-multiply filter grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    if (cert.fallbackImage && e.target.src !== window.location.origin + cert.fallbackImage) {
                      e.target.src = cert.fallbackImage;
                    } else {
                      e.target.style.display = 'none';
                      const fallback = e.target.parentElement.querySelector('.cert-icon-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }
                  }}
                />
                
                {/* Fallback stylized badge if image is unavailable */}
                <div className="cert-icon-fallback hidden flex-col items-center justify-center text-center p-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-1">
                    <FileCheck2 className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Official Document</span>
                </div>
              </div>

              {/* Card Footer / Title */}
              <div className="w-full text-center pt-4 border-t border-gray-50 flex flex-col items-center">
                <h4 className="font-extrabold text-[#11322d] tracking-wider uppercase text-sm group-hover:text-[#3a6944] transition-colors">
                  {cert.name}
                </h4>
                <span className="text-[11px] text-gray-400 mt-1 font-medium">
                  {cert.validity || "Active & Verified"}
                </span>
                
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-[#627725] group-hover:underline">
                  Click to inspect proof
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>

      {/* 3. INTERACTIVE VERIFICATION MODAL */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#11322d] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide uppercase">
                    {selectedCert.name}
                  </h3>
                  <p className="text-xs text-emerald-200 font-medium">
                    {selectedCert.category || "Official Corporate Accreditation"}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Certificate Viewer */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-50 min-h-[300px]">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 w-full flex items-center justify-center">
                <img 
                  src={selectedCert.imagePath} 
                  alt={selectedCert.alt}
                  className="max-h-[380px] w-auto object-contain rounded"
                  onError={(e) => {
                    if (selectedCert.fallbackImage) {
                      e.target.src = selectedCert.fallbackImage;
                    }
                  }}
                />
              </div>

              <div className="w-full mt-4 bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 uppercase font-bold block text-[10px]">Verification Status</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                    Verified & Audit Ready
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold block text-[10px]">Registration / Standard</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">
                    {selectedCert.certNumber || "Compliance Certified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Official document issued to Anjaney Nexus India LLP
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a 
                  href={selectedCert.imagePath} 
                  download 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold bg-[#11322d] hover:bg-[#1a4a43] text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Proof</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default TrustCertificatesSection;
