import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to <span className="text-green-600">Anjaney Nexus</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your one-stop marketplace for organic, handcrafted, and eco-friendly products.
        </p>
        <div className="flex flex-col items-center gap-4 mt-4">
          <Link 
            to="/signup"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
          <div className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
