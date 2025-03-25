import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import { ToastProvider } from '@/hooks/Toasts/ToastProvider';
import { PublicRouteName } from '@/routes';
import AccountLayout from '@/pages/AccountPage/AccountLayout';

const Home = lazy(() => import('../pages/HomePage/HomePage'));
const LogIn = lazy(() => import('../pages/LogInPage/LogInPage'));
const Register = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const Details = lazy(() => import('../pages/DetailsPage/DetailsPage'));
const Coach = lazy(() => import('../pages/DetailsPage/CoachPage/CoachPage'));
const AdminClub = lazy(
  () => import('../pages/DetailsPage/AdminClubPage/AdminClubPage'),
);
const Favorites = lazy(() => import('../pages/FavoritesPage/FavoritesPage'));
const Account = lazy(() => import('../pages/AccountPage/AccountPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={PublicRouteName.LOGIN} element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details" element={<Details />}>
          <Route path="coach" element={<Coach />} />
          <Route path="adminClub" element={<AdminClub />} />
        </Route>
        {/* // TEMP!! */}
        <Route path={PublicRouteName.FAVORITS} element={<Favorites />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<Account />} />
          {/* <Route path="general" element={<General />} /> */}
          <Route path="favorites" element={<Favorites />} /> // TEMP!!
          {/* <Route path="change-password" element={<ChangePassword />} />
          <Route path="my-reviews" element={<MyReviews />} /> */}
        </Route>
        {/* </Route> */}
      </Routes>
      <ToastProvider />
    </Suspense>
  );
}

export default App;
