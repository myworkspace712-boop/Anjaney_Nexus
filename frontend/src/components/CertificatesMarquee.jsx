import React from 'react';

// Isolated Component: Use this to drop into your Anjaney Nexus homepage
// without overwriting your existing navigation, hero, or commodities sections.

const CertificatesMarquee = () => {
    // Certificate Data
    const certificates = [
        {
            name: "FSSAI LICENSE",
            imagePath: "/Certi_Img/FSSAI.jpg",
            alt: "FSSAI Food Safety License"
        },
        {
            name: "APEDA RCMC",
            imagePath: "/Certi_Img/RCMC/RCMC APEDA 1_page-0001.jpg", 
            alt: "APEDA Registration"
        },
        {
            name: "SPICES BOARD",
            imagePath: "/Certi_Img/RCMC/RCMC Spices Board_page-0001.jpg", 
            alt: "Spices Board Certification"
        },
        {
            name: "IEC CODE",
            imagePath: "/Certi_Img/IEC.jpg", 
            alt: "Import Export Code (IEC)"
        },
        {
            name: "UDYAM REGISTRATION",
            imagePath: "/Certi_Img/Udhyam.jpg",
            alt: "Udyam Registration Certificate"
        },
    ];

    return (
        <section className="bg-[#f8f9f7] py-16 border-b border-gray-200 overflow-hidden">
            {/* INLINE CSS FOR MARQUEE ANIMATION */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-container {
                    display: flex;
                    width: max-content;
                    animation: marquee-scroll 40s linear infinite;
                }
                .marquee-container:hover {
                    animation-play-state: paused;
                }
                @media (prefers-reduced-motion: reduce) {
                    .marquee-container {
                        animation: none;
                        width: 100%;
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                    .marquee-wrapper {
                        overflow-x: auto;
                    }
                }
            `}} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center sm:text-left">
                <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
                    <svg className="w-4 h-4 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Verified Credentials</span>
                </div>
                <h2 className="text-3xl font-extrabold text-[#11322d] font-serif tracking-tight">
                    Quality Registrations
                </h2>
            </div>

            {/* Marquee Wrapper */}
            <div className="marquee-wrapper w-full overflow-hidden relative">
                {/* Fading Edges for smooth entry/exit effect */}
                <div className="absolute top-0 left-0 h-full w-16 sm:w-32 bg-gradient-to-r from-[#f8f9f7] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-16 sm:w-32 bg-gradient-to-l from-[#f8f9f7] to-transparent z-10 pointer-events-none"></div>
                
                {/* Duplicating the array multiple times ensures wide screens are fully populated */}
                <div className="marquee-container gap-6 px-4">
                    {[...certificates, ...certificates, ...certificates, ...certificates, ...certificates, ...certificates].map((cert, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 bg-white rounded-xl shadow-sm p-6 relative flex flex-col items-center justify-center w-[260px] sm:w-[300px] border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 to-transparent opacity-70"></div>
                            
                            <div className="absolute top-4 right-4 text-green-700 bg-green-50 rounded-full p-0.5">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <div className="h-24 flex items-center justify-center mb-4 w-full mt-2">
                                <img 
                                    src={cert.imagePath} 
                                    alt={cert.alt} 
                                    className="max-h-full max-w-[80%] object-contain mix-blend-multiply"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = "https://placehold.co/150x80?text=" + encodeURIComponent(cert.name);
                                    }}
                                />
                            </div>
                            <h4 className="font-bold text-[#11322d] tracking-wider uppercase text-xs text-center">
                                {cert.name}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CertificatesMarquee;
