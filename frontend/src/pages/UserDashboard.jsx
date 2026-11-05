import { Navigate } from 'react-router-dom';
import CustomerDashboard from './CustomerDashboard';
import SellerDashboard from './SellerDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  // Extract user data saved during your login/polling process
  const userString = localStorage.getItem('user');

  if (!userString || userString === 'undefined') {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(userString);
  } catch (error) {
    return <Navigate to="/login" replace />;
  }

  // 🎯 DYNAMIC ROUTING: Render the exact dashboard based on role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'seller':
      return <SellerDashboard />;
    case 'customer':
    default:
      return <CustomerDashboard />;
  }
};

export default Dashboard;
