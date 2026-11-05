import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      
      {/* 1. HERO SECTION (Single Image - Direct Origin Farm Procurement) */}
      <div className="relative w-full min-h-[500px] lg:min-h-[560px] flex items-center font-sans overflow-hidden bg-slate-950">
        {/* The Direct Origin Farm Procurement Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop" 
            alt="Direct Origin Farm Procurement - Agricultural Harvesting" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Brand Dark Navy Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/85 to-slate-950/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-blue-950 font-black text-xs sm:text-sm uppercase tracking-widest rounded-sm mb-6 shadow-sm">
              <span>★</span> DIRECT ORIGIN PROCUREMENT · SUSTAINABLE AGRICULTURE
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-3 tracking-tight">
              Direct Origin Farm Procurement.<br />
              <span className="text-orange-500">Connecting India's Harvest to the World.</span>
            </h1>

            {/* Subheading / Tagline */}
            <p className="text-lg sm:text-xl text-orange-400 font-serif italic mb-4 max-w-2xl">
              Direct partnerships with certified growers across India's premier fertile agricultural belts.
            </p>

            {/* Description */}
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed font-medium">
              Backed by over 15 years of trade integrity, strict laboratory testing standards, and transparent supply chain execution from farm to containerized sea freight.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN ABOUT CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        
        {/* Content & Image Grid */}
        <div className="grid grid-cols-1 gap-12 items-center">
          
          {/* Official About Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-black text-blue-950 dark:text-white tracking-tight">
              A Trusted Partner in Global Trade
            </h2>
            
            {/* About Us Paragraph */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              With over 15 years of experience in the import and export industry, we have established ourselves as a trusted partner in the global fertilizer trade. Our expertise lies in sourcing and supplying high-quality agricultural fertilizers, including Sulphur, DAP (Di-Ammonium Phosphate), and Urea, to customers across domestic and international markets. Our commitment to quality, reliability, and timely delivery has enabled us to build long-term relationships with suppliers, distributors, and customers worldwide. Backed by industry knowledge, a strong global network, and a customer-focused approach, we continue to expand our reach and deliver value to the agricultural sector.
            </p>

            {/* Our Mission Paragraph */}
            <div>
              <h3 className="text-lg font-black text-blue-950 dark:text-white mb-2">Our Mission</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Our mission is to provide high-quality agricultural and food products that meet international standards while promoting sustainable farming, food safety, and customer satisfaction. We are committed to sourcing responsibly, ensuring reliable import and export services, delivering value through quality and innovation, and building long-term partnerships based on trust, integrity, and excellence.
              </p>
            </div>

            {/* Our Vision Paragraph */}
            <div>
              <h3 className="text-lg font-black text-blue-950 dark:text-white mb-2">Our Vision</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Our vision is to become a globally trusted leader in the agriculture and food products industry by connecting producers and markets through sustainable practices, innovative solutions, and exceptional quality. We aspire to contribute to global food security, empower farming communities, and create lasting value for our customers, partners, and society.
              </p>
            </div>

            {/* Core Competencies Bullet Points */}
            <ul className="space-y-4 mt-2">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center border border-orange-100 dark:border-orange-900/50 shrink-0">
                  <span className="text-orange-500 text-sm font-bold">✓</span>
                </div>
                <span className="text-sm font-bold text-blue-950 dark:text-slate-200">15+ Years Industry Experience</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center border border-orange-100 dark:border-orange-900/50 shrink-0">
                  <span className="text-orange-500 text-sm font-bold">✓</span>
                </div>
                <span className="text-sm font-bold text-blue-950 dark:text-slate-200">Commitment to Sustainable Practices</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center border border-orange-100 dark:border-orange-900/50 shrink-0">
                  <span className="text-orange-500 text-sm font-bold">✓</span>
                </div>
                <span className="text-sm font-bold text-blue-950 dark:text-slate-200">Global Network & Reliable Logistics</span>
              </li>
            </ul>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
