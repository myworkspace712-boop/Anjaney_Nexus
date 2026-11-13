import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      
      {/* 1. HERO SECTION (Single Image - Direct Farm Procurement) */}
      <div className="relative w-full min-h-[500px] lg:min-h-[560px] flex items-center font-sans overflow-hidden bg-slate-950">
        {/* The Direct Farm Procurement Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop" 
            alt="Direct Farm Procurement - Agricultural Harvesting" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Lighter Gradient Fade Overlays - Ensuring the image is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/35 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="max-w-3xl">
            {/* Main Headline */}
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-3 tracking-tight drop-shadow-md">
                <span className="text-blue-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]">Direct Farm Procurement.</span><br />
                <span className="text-white">Connecting India's Harvest to the World.</span>
              </h1>

              {/* Subheading / Tagline */}
              <p className="text-lg sm:text-xl text-white font-medium max-w-2xl drop-shadow-sm">
                Ensuring global standards in every shipment.
              </p>
            </div>

            {/* Description */}
            <p className="text-white/90 max-w-2xl text-sm sm:text-base leading-relaxed font-medium drop-shadow-sm">
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
            
            {/* About Us Paragraphs */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              With over 15 years of experience in the import and export industry, we have established ourselves as a trusted partner in the global fertilizer trade. Our expertise lies in sourcing and supplying high-quality agricultural fertilizers, including Sulphur, DAP (Di-Ammonium Phosphate), and Urea, to customers across domestic and international markets.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Our commitment to quality, reliability, and timely delivery has enabled us to build long-term relationships with suppliers, distributors, and customers worldwide. Backed by industry knowledge, a strong global network, and a customer-focused approach, we continue to expand our reach and deliver value to the agricultural sector.
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

            {/* Core Competencies Cards (Hover Lift Effect) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
              {/* Card 1 */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-orange-500/80 dark:hover:border-orange-500/80 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/60 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0 mb-4 shadow-xs">
                  <span className="text-base font-black">✓</span>
                </div>
                <h4 className="text-base font-black text-blue-950 dark:text-white tracking-tight leading-snug group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                  15+ Years Industry Experience
                </h4>
              </div>

              {/* Card 2 */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-orange-500/80 dark:hover:border-orange-500/80 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/60 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0 mb-4 shadow-xs">
                  <span className="text-base font-black">✓</span>
                </div>
                <h4 className="text-base font-black text-blue-950 dark:text-white tracking-tight leading-snug group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                  Commitment to Sustainable Practices
                </h4>
              </div>

              {/* Card 3 */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-orange-500/80 dark:hover:border-orange-500/80 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/60 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0 mb-4 shadow-xs">
                  <span className="text-base font-black">✓</span>
                </div>
                <h4 className="text-base font-black text-blue-950 dark:text-white tracking-tight leading-snug group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                  Global Network & Reliable Logistics
                </h4>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
