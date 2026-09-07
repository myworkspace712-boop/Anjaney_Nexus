import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Products from './pages/Products';
import Inquire from './pages/Inquire';
import UserProfile from './pages/UserProfile';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';
import VerifyEmail from './pages/VerifyEmail';
import Footer from './components/Footer';
import SellerApplication from './pages/SellerApplication';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Render SignUp as the first page */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/inquire" element={<Inquire />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/seller-application" element={<SellerApplication />} />

        {/* Admin Dashboard Route */}
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;