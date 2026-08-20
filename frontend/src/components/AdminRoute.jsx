import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Check if user exists and holds an admin role
  const isAdmin = userInfo && ['admin', 'superadmin'].includes(userInfo.role);

  if (isAdmin) {
    return children;
  }

  // Redirect unauthorized users to login
  return <Navigate to="/login" replace />;
};

export default AdminRoute;