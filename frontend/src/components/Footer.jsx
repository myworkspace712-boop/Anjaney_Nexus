import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand & About */}
        <div className="space-y-6">
          <Link to="/">
            <img 
              src="https://anjaneynexus.com/wp-content/uploads/2026/06/Anjaney_logo.webp" 
              alt="Anjaney Nexus Logo" 
              className="h-16 w-auto brightness-0 invert opacity-90"
            />
          </Link>
          <p className="text-stone-400 leading-relaxed max-w-sm">
            Bridging India’s ancient spice-farming heritage with global demand. Premium agricultural exports directly from certified farms across the subcontinent.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-6">Navigation</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-spice-gold transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-spice-gold transition-colors">Products</Link></li>
            <li><Link to="/about-us" className="hover:text-spice-gold transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-spice-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-6">Contact</h3>
          <div className="space-y-4 text-stone-400">
            <p className="leading-relaxed">
              C/145, First Floor, B G Tower,<br/>
              Delhi Darwaja, Ahmedabad,<br/>
              Gujarat, India
            </p>
            <p>
              <a href="mailto:admin@anjaneynexus.com" className="hover:text-spice-gold transition-colors">
                admin@anjaneynexus.com
              </a>
            </p>
            <p>
              <a href="tel:+919824056061" className="hover:text-spice-gold transition-colors">
                +91 98240 56061
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
        <p>© 2026 Anjaney Nexus India LLP. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
