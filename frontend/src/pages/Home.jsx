import { Link } from 'react-router-dom';
import { ArrowRight, Globe, ShieldCheck, Leaf } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen font-body text-spice-dark">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center bg-[url('/Hero/indian-whole-spices.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-left">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            India's Finest Spices,Delivered Globally.
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mb-10">
            We bring the centuries-old spice heritage of India to international markets. Premium turmeric, pepper, cardamom, and more — sourced directly from certified farms across the subcontinent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products"
              className="bg-brand-primary hover:bg-opacity-90 text-brand-dark px-8 py-3 rounded font-semibold text-lg transition-all"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Exports Header */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold font-display mb-6">Our Signature Exports</h2>
              <p className="text-xl text-gray-600">
                World-class spices defining the true taste of India, cultivated with uncompromising standards across the subcontinent.
              </p>
            </div>
            <Link 
              to="/products"
              className="group flex items-center gap-2 text-spice-gold font-bold hover:text-yellow-700 transition-colors"
            >
              View Full catalogue 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Products Alternating Layout */}
          <div className="space-y-24">
            
            {/* Product 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 flex justify-center">
                <img 
                  src="https://anjaneynexus.com/wp-content/uploads/2026/06/gochugaru.png"
                  alt="Lakadong Turmeric"
                  className="w-full max-w-md object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 font-bold rounded-full text-sm uppercase tracking-wider">
                  Category: Spices
                </span>
                <h3 className="text-4xl font-bold font-display">Lakadong Turmeric</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Exceptionally high curcumin content (7–12%). Bright golden colour, earthy aroma, and unmatched potency. Sourced from…
                </p>
                <Link 
                  to="/products"
                  className="inline-block px-8 py-3 bg-spice-dark text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Product 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="w-full md:w-1/2 flex justify-center">
                <img 
                  src="https://anjaneynexus.com/wp-content/uploads/2026/06/sesame.png"
                  alt="Black Pepper"
                  className="w-full max-w-md object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <span className="inline-block px-4 py-1 bg-gray-100 text-gray-800 font-bold rounded-full text-sm uppercase tracking-wider">
                  Category: Pepper
                </span>
                <h3 className="text-4xl font-bold font-display">Black Pepper</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The king of spices. Bold, complex heat with floral undertones. Single-origin from Kerala’s Wayanad and Idukki districts.
                </p>
                <Link 
                  to="/products"
                  className="inline-block px-8 py-3 bg-spice-dark text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-spice-light border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg text-spice-green">
                <Globe size={40} />
              </div>
              <h3 className="text-xl font-bold">Global Export Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                Compliant with FSSAI, APEDA, and international food safety standards. We handle the complexities of agricultural export logistics so you receive premium ingredients seamlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg text-spice-red">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-xl font-bold">Uncompromising Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Every batch is rigorously tested for purity, moisture content, and authentic flavour profiles. No additives, no fillers, no compromises.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg text-spice-gold">
                <Leaf size={40} />
              </div>
              <h3 className="text-xl font-bold">Farm-Direct Sourcing</h3>
              <p className="text-gray-600 leading-relaxed">
                We work directly with farming cooperatives across Rajasthan, Kerala, Andhra Pradesh, and Meghalaya — ensuring fair trade and genuine terroir in every shipment.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
