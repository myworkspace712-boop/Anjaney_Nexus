const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Products</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Explore our wide range of premium, handcrafted, and eco-friendly goods. 
          We partner with verified sellers to ensure the best quality for you.
        </p>
        {/* Placeholder for future product grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-48 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
              <span className="text-gray-400">Product Image</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
