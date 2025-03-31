import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import { ToastProvider } from '@/hooks/Toasts/ToastProvider';
import { PublicRouteName } from '@/routes';
import AccountLayout from '@/pages/AccountPage/AccountLayout';
import General from '@/pages/AccountPage/General';
import ChangePassword from '@/pages/AccountPage/ChangePassword';

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
const TrainersPage = lazy(
  () => import('../pages/HomePage/TrainersPage/TrainersPage'),
);
const ClubsPage = lazy(() => import('../pages/HomePage/ClubsPage/ClubsPage'));
const Reviews = lazy(() => import('../pages/ReviewsPage/ReviewsPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainers" element={<TrainersPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path={PublicRouteName.LOGIN} element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details" element={<Details />}>
          <Route path="coach" element={<Coach />} />
          <Route path="adminClub" element={<AdminClub />} />
        </Route>
        {/* // TEMP!! */}
        {/* <Route path={PublicRouteName.FAVORITS} element={<Favorites />} /> */}
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/profile" element={<AccountLayout />}>
          <Route index element={<Account />} />
          <Route path={PublicRouteName.GENERAL} element={<General />} />
          <Route path={PublicRouteName.FAVORITS} element={<Favorites />} />
          <Route
            path={PublicRouteName.CHANGEPASSWORD}
            element={<ChangePassword />}
          />
          <Route path={PublicRouteName.REVIEWS} element={<Reviews />} />
        </Route>
        {/* </Route> */}
      </Routes>
      <ToastProvider />
    </Suspense>
  );
}

export default App;
