import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import { ToastProvider } from '@/hooks/Toasts/ToastProvider';
import { PublicRouteName } from '@/routes';
import AccountLayout from '@/pages/AccountPage/AccountLayout';
import General from '@/pages/AccountPage/General';
import ChangePassword from '@/pages/AccountPage/ChangePassword';
import EditProfile from './EditProfile/EditProfiles';
import EditGeneral from './EditProfile/components/EditGeneral/EditGeneral';
import ProfileProvider from '@/utils/ProfileProvider';
import MainLayout from './NavBar/MainLayout';

const Home = lazy(() => import('../pages/HomePage/HomePage'));
const LogIn = lazy(() => import('../pages/LogInPage/LogInPage'));
const Register = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const Details = lazy(() => import('../pages/DetailsPage/DetailsPage'));

const AccountTrainer = lazy(
  () => import('../pages/DetailsPage/AccountTrainerPage/AccountTrainerPage'),
);

const TrainerPage = lazy(
  () => import('../pages/DetailsPage/TrainerPage/TrainerPage'),
);
const AccountAdminClub = lazy(
  () =>
    import('../pages/DetailsPage/AccountAdminClubPage/AccountAdminClubPage'),
);

const Club = lazy(() => import('../pages/DetailsPage/ClubPage/ClubPage'));
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
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path={PublicRouteName.LOGIN} element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details" element={<Details />}>
            <Route path="trainer/:id" element={<TrainerPage />} />
            <Route path="account-trainer/:id" element={<AccountTrainer />} />
            <Route path="club/:id" element={<Club />} />
            <Route
              path="account-admin-club/:id"
              element={<AccountAdminClub />}
            />
          </Route>
          {/* <Route path={PublicRouteName.FAVORITS} element={<Favorites />} /> */}
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/profile" element={<AccountLayout />}>
            <Route index element={<Account />} />
            {/* <Route path="general" element={<General />} /> */}
            <Route path="favorites" element={<Favorites />} />
            {/* {<Route path="change-password" element={<ChangePassword />} />  */}
            <Route path="reviews" element={<Reviews />} />
            <Route path={PublicRouteName.GENERAL} element={<General />} />
            <Route path={PublicRouteName.FAVORITS} element={<Favorites />} />
            <Route
              path={PublicRouteName.CHANGEPASSWORD}
              element={<ChangePassword />}
            />
          </Route>
        </Route>
        {/* </Route> */}
      </Routes>
      <ToastProvider />
    </Suspense>
  );
}

export default App;
