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
    const user = localStorage.getItem('userInfo');
    if (user) {
      setUserInfo(JSON.parse(user));
    } else {
      setUserInfo(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('anjaney-nexus-token');
    setUserInfo(null);
    navigate('/');
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? 'bg-green-100 text-green-800'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Left side: Logo & Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 mr-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100"
                aria-label="Open sidebar"
              >
                <Menu size={24} />
              </button>
              
              <NavLink to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-green-600">Anjaney Nexus</span>
              </NavLink>
            </div>

            {/* Middle: Horizontal Navigation (Desktop Only) */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/" className={navLinkClasses}>
                Home
              </NavLink>
              <NavLink to="/about" className={navLinkClasses}>
                About Us
              </NavLink>
              <NavLink to="/products" className={navLinkClasses}>
                Products
              </NavLink>
              <NavLink to="/inquire" className={navLinkClasses}>
                Inquire Us
              </NavLink>
            </div>

            {/* Right side: Auth Links */}
            <div className="flex items-center space-x-4">
              {userInfo ? (
                <>
                  {userInfo.role === 'admin' && userInfo.email === 'admin@plantbase.com' && (
                    <NavLink
                      to="/admin/dashboard"
                      className="hidden sm:inline-flex px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none"
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/signup"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
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
