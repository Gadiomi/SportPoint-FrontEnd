import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PrivateRoute = () => {
  const token = true;
  // const isAuthenticated = useSelector((state: RootState) => state.Auth.token);

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
