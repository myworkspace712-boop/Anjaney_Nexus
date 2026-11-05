import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Adjust this path if your context folder is elsewhere

const CartDashboard = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inquiry submitted successfully! Our team will contact you shortly.");
    if (clearCart) clearCart();
  };

  // 1. EMPTY STATE
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-slate-800 dark:text-white transition-colors duration-300">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-blue-950 dark:text-white mb-2">Your Trolley is Empty</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Looks like you haven't added any products to your inquiry yet.</p>
        <Link 
          to="/products" 
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-md shadow-orange-500/20"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // 2. POPULATED DASHBOARD
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-10 px-4 md:px-8 text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-blue-950 dark:text-white mb-8">Trolley Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Products & Quantity */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item) => (
              <div 
                key={item.name} 
                className="bg-white p-6 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-gray-200"
              >
                {/* Product Image */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded border border-gray-100"
                />
                
                {/* Product Info & Description */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end gap-3 min-w-[120px]">
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.name, -1)} 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-semibold text-gray-800 bg-white border-x border-gray-300">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.name, 1)} 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.name)} 
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: Checkout Details & Form */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Checkout Details</h2>
              <p className="text-gray-600 mb-6 text-sm">
                Total Products Selected: <span className="font-bold text-blue-900 text-base">{cartItems.length}</span>
              </p>
              
              <hr className="mb-6 border-gray-200" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900" placeholder="John Doe" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900" placeholder="john@company.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" required className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900" placeholder="+1 (555) 000-0000" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900" placeholder="Global Imports LLC" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Quantity / Port of Destination</label>
                  <textarea rows="3" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900" placeholder="e.g., We need 5 metric tons delivered to the Port of Felixstowe..."></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-md shadow-orange-500/20 mt-4 cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartDashboard;
