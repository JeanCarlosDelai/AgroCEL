import { Navigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/localStorage';

const ProtectedRoute = ({ children, checkAccess }) => {
  const user = getUserFromLocalStorage();

  if (!user || (checkAccess && !checkAccess())) {
    return <Navigate to="/landing" />;
  }

  return children;
};

export default ProtectedRoute;
