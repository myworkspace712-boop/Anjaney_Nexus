import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JNHome = () => {
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

    // Products Catalogue Data
    const featuredCommodities = [
        { 
            name: "Premium Brochures", 
            description: "Available in multiple finishes and GSMs. Minimum order quantity: 500 units.",
            image: "/Images/Brochure.jpg" 
        },
        { 
            name: "Business Cards", 
            description: "Matte, gloss, and textured varieties with strict quality and cut specs.",
            image: "/Images/Business Card.jpg" 
        },
        { 
            name: "Packaging Boxes", 
            description: "Corrugated and duplex boxes tailored for secure corporate packaging.",
            image: "/Images/Packing Box.jpg" 
        },
        { 
            name: "Corporate Gift Articles", 
            description: "Custom branded merchandise and premium gifting solutions for B2B.",
            image: "/Images/Corporate Gift Articles.jpg" 
        }
    ];

    const [formSubmitted, setFormSubmitted] = useState(false);

    // Function to handle "Get a Quote" click - scrolls directly to the quote section
    const scrollToQuote = () => {
        const el = document.getElementById('export-quote-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fc] font-sans text-gray-800">
            
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

            {/* 1. TOP BAR TICKER */}
            <div className="bg-[#172033] text-white text-sm py-2 overflow-hidden flex items-center">
                <div className="px-4 font-bold tracking-wider uppercase border-r border-[#2d3748] whitespace-nowrap">
                    J.N. UPDATE
                </div>
                <div className="flex space-x-8 px-4 animate-pulse whitespace-nowrap overflow-x-auto no-scrollbar">
                    <span>🔥 Premium Commercial Printing & Packaging Solutions.</span>
                    <span>✅ ISO 9001:2015 & GMC Certified Infrastructure.</span>
                    <span>📦 Bulk Packaging Orders Available.</span>
                </div>
            </div>

            {/* 2. MAIN NAVIGATION */}
            <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex-shrink-0 flex items-center cursor-pointer">
                            <span className="font-extrabold text-3xl text-[#172033] tracking-tight">
                                J.N. Enterprise
                            </span>
                        </div>
                        <div className="hidden md:flex space-x-8 font-semibold text-gray-500">
                            <Link to="/" className="hover:text-[#172033] transition-colors">Home</Link>
                            <Link to="/company" className="hover:text-[#172033] transition-colors">Company</Link>
                            <Link to="/products" className="hover:text-[#172033] transition-colors">Products</Link>
                            <Link to="/infrastructure" className="hover:text-[#172033] transition-colors">Infrastructure</Link>
                        </div>
                        <div>
                            <button 
                                onClick={scrollToQuote}
                                className="bg-[#172033] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-800 shadow-md transition-all tracking-wide cursor-pointer"
                            >
                                Get a Quote
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 3. HERO SECTION */}
            <header className="relative bg-[#172033] text-white py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-cover bg-center bg-gray-900"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Excellence in Design & Packaging
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-300 mb-10 leading-relaxed">
                        "Design is a behavior not a Department....." Delivering contract-based commercial printing, backed by verified credentials and strict quality control.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={scrollToQuote}
                            className="bg-white text-[#172033] px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg cursor-pointer"
                        >
                            Request your export quote
                        </button>
                    </div>
                </div>
            </header>

            {/* 4. INFRASTRUCTURE CAPABILITIES */}
            <section className="py-16 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div className="px-6 py-4">
                            <h3 className="text-4xl font-extrabold text-[#172033] mb-2">High-Volume</h3>
                            <p className="text-gray-900 font-bold uppercase tracking-wide">Production Capacity</p>
                            <p className="text-sm text-gray-500 mt-3">Equipped for bulk commercial printing and automated packaging lines.</p>
                        </div>
                        <div className="px-6 py-4">
                            <h3 className="text-4xl font-extrabold text-[#172033] mb-2">100%</h3>
                            <p className="text-gray-900 font-bold uppercase tracking-wide">Quality Assured</p>
                            <p className="text-sm text-gray-500 mt-3">Color-matching, GSM verification, and structural integrity checks on every batch.</p>
                        </div>
                        <div className="px-6 py-4">
                            <h3 className="text-4xl font-extrabold text-[#172033] mb-2">B2B Focused</h3>
                            <p className="text-gray-900 font-bold uppercase tracking-wide">Corporate Contracts</p>
                            <p className="text-sm text-gray-500 mt-3">Dedicated account management for enterprise clients and wholesale distributors.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CERTIFICATIONS ROLLER */}
            <section className="bg-white py-16 border-b border-gray-200 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center sm:text-left">
                    <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
                        <svg className="w-4 h-4 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Verified Credentials</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#172033] tracking-tight">
                        Quality Registrations
                    </h2>
                </div>

                <div className="marquee-wrapper w-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 h-full w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                    
                    <div className="marquee-container gap-6 px-4 pb-4">
                        {[...certificates, ...certificates, ...certificates, ...certificates, ...certificates, ...certificates].map((cert, index) => (
                            <div key={index} className="flex-shrink-0 bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-6 relative flex flex-col items-center justify-center w-[260px] sm:w-[300px] border border-gray-100 cursor-pointer hover:-translate-y-1 transition-transform">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-transparent opacity-80 rounded-t-2xl"></div>
                                <div className="absolute top-4 right-4 text-green-700 bg-green-50 rounded-full p-0.5">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
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
                                <h4 className="font-bold text-[#172033] tracking-wider uppercase text-xs text-center">{cert.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. PRODUCTS CATALOGUE */}
            <section className="py-24 bg-[#f8f9fc]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-extrabold text-[#1a233a] tracking-tight mb-3">Featured Products</h2>
                            <p className="text-lg text-gray-500">Contract-based commercial printing backed by agreed specifications and quality inspection.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCommodities.map((product, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-[1.25rem] p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
                            >
                                <div className="w-full h-48 mb-5 overflow-hidden rounded-xl bg-gray-50 relative">
                                    <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-5 transition-opacity z-10"></div>
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { 
                                            e.currentTarget.onerror = null; 
                                            e.currentTarget.src = `https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`; 
                                        }}
                                    />
                                </div>
                                
                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-xl font-extrabold text-[#1a233a] mb-2">{product.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 pr-2">
                                        {product.description}
                                    </p>
                                    
                                    {/* Direct to Quote Button instead of Add to Cart */}
                                    <button 
                                        onClick={scrollToQuote}
                                        className="w-full bg-[#f8f9fa] border border-gray-200 text-[#1a233a] font-bold text-xs py-3.5 px-4 rounded-xl hover:bg-gray-100 hover:border-gray-300 transition-colors uppercase tracking-widest cursor-pointer"
                                    >
                                        Get a Quote
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. DIRECT EXPORT QUOTE SECTION */}
            <section id="export-quote-section" className="py-24 bg-white border-t border-gray-200 scroll-mt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#f8f9fc] rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 text-center">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#172033] tracking-tight mb-4">
                            Request Your Export Quote
                        </h2>
                        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
                            Send the product, specification, quantity, and destination for a contract-based quotation. Pricing and timing will be confirmed by our trade desk.
                        </p>

                        {formSubmitted && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl font-semibold">
                                ✅ Thank you! Your quotation requirement has been submitted. Our trade desk will respond shortly.
                            </div>
                        )}

                        <form className="text-left space-y-6 max-w-3xl mx-auto" onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Commodity / Product</label>
                                    <select defaultValue="" className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-white focus:ring-[#172033] focus:border-[#172033] outline-none" required>
                                        <option value="" disabled>Select Product...</option>
                                        <option value="brochures">Premium Brochures</option>
                                        <option value="business-cards">Business Cards</option>
                                        <option value="packaging">Packaging Boxes</option>
                                        <option value="corporate-gifts">Corporate Gift Articles</option>
                                        <option value="other">Other Requirements</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Target Quantity</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. 5,000 units" 
                                        required
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-white focus:ring-[#172033] focus:border-[#172033] outline-none" 
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="company@domain.com" 
                                        required
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-white focus:ring-[#172033] focus:border-[#172033] outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Destination / Port</label>
                                    <input 
                                        type="text" 
                                        placeholder="Delivery Location" 
                                        required
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-white focus:ring-[#172033] focus:border-[#172033] outline-none" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Additional Specifications</label>
                                <textarea 
                                    rows="4" 
                                    placeholder="Paper GSM, lamination, specific dimensions..." 
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 bg-white focus:ring-[#172033] focus:border-[#172033] outline-none resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-[#172033] text-white font-extrabold text-lg py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg uppercase tracking-widest mt-4 cursor-pointer"
                            >
                                Submit Requirement
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* 8. CLIENT DUE DILIGENCE */}
            <section className="py-20 bg-[#172033] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Verify Before You Commit</h2>
                        <p className="text-gray-400 text-lg">We encourage our B2B clients to validate our company credentials, approve physical samples, and confirm specifications before finalizing any bulk contract.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "1. Verify Registrations", desc: "Request current stamped MSME and ISO certification copies." },
                            { title: "2. Approve the Sample", desc: "Record the agreed paper grade, lamination, and print tolerances." },
                            { title: "3. Confirm Logistics", desc: "Agree upon bulk packaging formats and delivery timelines." },
                            { title: "4. Secure Contracting", desc: "Check Proforma Invoice and terms before production begins." }
                        ].map((item, index) => (
                            <div key={index} className="bg-[#1f293f] p-6 rounded-2xl border border-gray-700 hover:border-indigo-500 transition-colors">
                                <h4 className="text-indigo-400 font-bold text-lg mb-3">{item.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. WORKFLOW SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-[#172033] tracking-tight">How Every Order Gets Executed</h2>
                        <p className="mt-4 text-xl text-gray-500">From digital proof to final dispatch, our process is entirely transparent.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-gray-100 z-0"></div>
                        
                        {[
                            { step: "01", title: "Inquiry & Proforma", desc: "Complete requirements are reviewed before preparing a Proforma Invoice." },
                            { step: "02", title: "Design Approval", desc: "Digital proofs and physical mockups are confirmed by the client." },
                            { step: "03", title: "Production & QC", desc: "High-speed processing with documented structural and color checks." },
                            { step: "04", title: "Final Dispatch", desc: "Securely palletized and handed over with required commercial documents." }
                        ].map((item, index) => (
                            <div key={index} className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-[#172033] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-md transform rotate-3">
                                    <div className="transform -rotate-3">{item.step}</div>
                                </div>
                                <h3 className="text-xl font-bold text-[#172033] mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default JNHome;
