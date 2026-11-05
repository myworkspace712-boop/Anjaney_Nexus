import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const token = localStorage.getItem('token') || localStorage.getItem('anjaney-nexus-token');
  const isAuthenticated = token && token !== 'undefined' && token !== 'null';

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('anjaney-nexus-token');
    window.location.href = '/';
  };
  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        ></div>
      )}

      {/* Slide-over panel */}
      <div 
        className={`fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <img 
            src="https://anjaneynexus.com/wp-content/uploads/2026/06/Anjaney_logo.webp" 
            alt="Anjaney Nexus" 
            className="h-8 w-auto"
          />
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-spice-dark focus:outline-none"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col p-6 space-y-4">
          <NavLink 
            to="/" 
            onClick={onClose}
            className={({ isActive }) => 
              `text-lg font-semibold transition-colors ${
                isActive ? 'text-spice-gold' : 'text-spice-dark hover:text-spice-gold'
              }`
            }
          >Home</NavLink>
          <NavLink 
            to="/products" 
            onClick={onClose}
            className={({ isActive }) => 
              `text-lg font-semibold transition-colors ${
                isActive ? 'text-spice-gold' : 'text-spice-dark hover:text-spice-gold'
              }`
            }
          >Products</NavLink>
          <NavLink 
            to="/about-us" 
            onClick={onClose}
            className={({ isActive }) => 
              `text-lg font-semibold transition-colors ${
                isActive ? 'text-spice-gold' : 'text-spice-dark hover:text-spice-gold'
              }`
            }
          >About Us</NavLink>
          <NavLink 
            to="/contact" 
            onClick={onClose}
            className={({ isActive }) => 
              `text-lg font-semibold transition-colors ${
                isActive ? 'text-spice-gold' : 'text-spice-dark hover:text-spice-gold'
              }`
            }
          >Contact</NavLink>
          <NavLink 
            to="/seller-application" 
            onClick={onClose}
            className={({ isActive }) => 
              `text-lg font-semibold transition-colors ${
                isActive ? 'text-spice-gold' : 'text-spice-dark hover:text-spice-gold'
              }`
            }
          >Seller Application</NavLink>

          <div className="pt-6 mt-6 border-t border-gray-100 space-y-4 flex flex-col">
            <NavLink 
              to="/contact" 
              onClick={onClose}
              className="px-4 py-3 border-2 border-spice-dark text-center text-spice-dark font-bold hover:bg-spice-dark hover:text-white transition-colors"
            >
              Inquiry Now
            </NavLink>
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="px-4 py-3 bg-red-600 text-white text-center font-bold hover:bg-red-700 transition-colors w-full"
              >
                Logout
              </button>
            ) : (
              <NavLink 
                to="/signup" 
                onClick={onClose}
                className="px-4 py-3 bg-spice-gold text-white text-center font-bold hover:bg-yellow-600 transition-colors"
              >
                Sign Up / Login
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;