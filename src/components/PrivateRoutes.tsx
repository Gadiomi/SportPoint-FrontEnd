import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CookiesKey } from '@/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PrivateRoute = () => {
  // const isAuthenticated = useSelector((state: RootState) => state.Auth.token);
  const token = Cookies.get(CookiesKey.TOKEN);

  //  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
