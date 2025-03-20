import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import { ToastProvider } from '@/hooks/Toasts/ToastProvider';
import { PublicRouteName } from '@/routes';

const Home = lazy(() => import('../pages/HomePage/HomePage'));
const LogIn = lazy(() => import('../pages/LogInPage/LogInPage'));
const Register = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const Details = lazy(() => import('../pages/DetailsPage/DetailsPage'));
const Favorites = lazy(() => import('../pages/FavoritesPage/FavoritesPage'));
const Account = lazy(() => import('../pages/AccountPage/AccountPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={PublicRouteName.LOGIN} element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} /> //Temp!!!
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
      <ToastProvider />
    </Suspense>
  );
}

export default App;
