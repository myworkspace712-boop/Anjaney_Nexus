import React from 'react';

const Certificates = () => {
  
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* PAGE HEADER */}
        <div className="text-center mb-16">
          <span className="text-xs font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100 mb-4 inline-block">
            Verified Credentials
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 tracking-tight leading-tight mb-6">
            Document <span className="text-orange-500">Verification.</span>
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
            Use this evidence register to distinguish issuer badges, requested documents and shipment-specific records. Rely only on a current document whose holder, scope and validity you have verified.
          </p>
        </div>

        {/* DETAILED VERIFICATION CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-orange-300 transition-colors shadow-sm flex flex-col">
              
              {/* Card Top: Logo & Title */}
              <div className="p-6 flex items-start gap-4">
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-lg flex shrink-0 items-center justify-center p-2 overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.id} 
                    className="w-full h-full object-contain mix-blend-multiply"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                
                <div className="flex flex-col items-start pt-1">
                  <h3 className="text-lg font-bold text-blue-950 leading-tight mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    {cert.authority}
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                    <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-slate-100"></div>

              {/* Card Bottom: Text & Details */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {cert.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <p className="text-sm font-bold text-blue-950 mb-0.5">{cert.docLabel}</p>
                    <p className="text-sm text-slate-500">Not published</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-950 mb-0.5">Valid until</p>
                    <p className="text-sm text-slate-500">Check current copy</p>
                  </div>
                </div>

                <div className="mt-auto">
                  {/* STANDARD WHATSAPP WEB ROUTING LINK */}
                  <a 
                    href={`https://wa.me/919925816161?text=${encodeURIComponent(cert.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer w-max"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Request
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Certificates;
