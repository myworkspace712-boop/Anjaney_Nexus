import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check login status on mount and path change
  useEffect(() => {
    const user = localStorage.getItem('userInfo') || localStorage.getItem('user');
    if (user) {
      try {
        setUserInfo(JSON.parse(user));
      } catch (e) { setUserInfo(null); }
    } else {
      setUserInfo(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('anjaney-nexus-token');
    setUserInfo(null);
    navigate('/');
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold transition-colors ${
      isActive
        ? 'text-spice-gold'
        : 'text-spice-dark hover:text-spice-gold'
    }`;

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            
            {/* Left side: Logo & Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 mr-2 text-gray-600 hover:text-spice-gold focus:outline-none rounded-md md:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={24} />
              </button>
              
              <NavLink to="/" className="flex-shrink-0 flex items-center">
                <img 
                  src="https://anjaneynexus.com/wp-content/uploads/2026/06/Anjaney_logo.webp" 
                  alt="Anjaney Nexus" 
                  className="h-10 w-auto"
                />
              </NavLink>
            </div>

            {/* Middle: Horizontal Navigation (Desktop Only) */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
              <NavLink to="/about-us" className={navLinkClasses}>About Us</NavLink>
              <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
              <NavLink to="/seller-application" className={navLinkClasses}>Seller Application</NavLink>
            </div>

            {/* Right side: Actions */}
            <div className="flex items-center space-x-3">
              <NavLink 
                to="/contact"
                className="hidden lg:inline-flex px-5 py-2 border-2 border-spice-dark text-sm font-bold text-spice-dark hover:bg-spice-dark hover:text-white transition-colors"
              >
                Inquiry Now
              </NavLink>

              {userInfo ? (
                <>
                  <NavLink
                    to="/profile"
                    className="hidden sm:inline-flex px-4 py-2 text-sm font-bold text-spice-dark hover:text-spice-gold transition-colors"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    className="hidden sm:inline-flex px-4 py-2 text-sm font-bold text-spice-dark hover:text-spice-gold transition-colors"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/register"
                  className="px-5 py-2 bg-spice-gold text-white text-sm font-bold hover:bg-yellow-600 transition-colors"
                >
                  Sign Up
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
};

export default Navbar;
