import { Navigate } from 'react-router-dom';
import CustomerDashboard from './CustomerDashboard';
import SellerDashboard from './SellerDashboard';

const Dashboard = () => {
  // Extract user data saved during your login/polling process
  const userString = localStorage.getItem('user');

  if (!userString || userString === 'undefined') {
    return <Navigate to="/" replace />;
  }

  let user;
  try {
    user = JSON.parse(userString);
  } catch (error) {
    return <Navigate to="/" replace />;
  }

  // Render dashboard based on role
  if (user.role === 'seller') {
    return <SellerDashboard />;
  }
  return <CustomerDashboard />;
};

export default Dashboard;
