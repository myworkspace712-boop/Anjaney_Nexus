import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';


const Sidebar = ({ isOpen, onClose }) => {
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
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-green-600">Menu</span>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-md hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col p-4 space-y-2">
          <NavLink 
            to="/" 
            onClick={onClose}
            className={({ isActive }) => 
              `px-4 py-3 rounded-lg text-lg font-medium transition ${
                isActive ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            onClick={onClose}
            className={({ isActive }) => 
              `px-4 py-3 rounded-lg text-lg font-medium transition ${
                isActive ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink 
            to="/products" 
            onClick={onClose}
            className={({ isActive }) => 
              `px-4 py-3 rounded-lg text-lg font-medium transition ${
                isActive ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            Products
          </NavLink>
          <NavLink 
            to="/inquire" 
            onClick={onClose}
            className={({ isActive }) => 
              `px-4 py-3 rounded-lg text-lg font-medium transition ${
                isActive ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            Inquire Us
          </NavLink>

          <div className="pt-4 mt-4 border-t border-gray-100">
            <NavLink 
              to="/signup" 
              onClick={onClose}
              className={({ isActive }) => 
                `block px-4 py-3 rounded-lg text-lg font-medium text-center transition ${
                  isActive ? 'bg-green-700 text-white' : 'bg-green-600 text-white hover:bg-green-700'
                }`
              }
            >
              Sign Up
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};


export default Sidebar;