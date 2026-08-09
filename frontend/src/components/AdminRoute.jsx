import { Navigate } from 'react-router-dom';


const AdminRoute = ({ children }) => {
  // Replace this with your actual auth state management (Context, Redux, or localStorage)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo && userInfo.role === 'admin') {
    return children;
  }

  // Redirect to home if not authorized
  return <Navigate to="/" replace />;
};

export default AdminRoute;
