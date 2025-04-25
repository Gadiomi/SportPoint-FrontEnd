import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import { ToastProvider } from '@/hooks/Toasts/ToastProvider';
import { PublicRouteName } from '@/routes';
import AccountLayout from '@/pages/AccountPage/AccountLayout';
import ChangePassword from '@/pages/AccountPage/ChangePassword';
import EditProfile from './EditProfile/EditProfiles';
import ProfileProvider from '@/utils/ProfileProvider';
import MainLayout from './NavBar/MainLayout';
import Schedule from './EditProfile/components/Schedule/Schedule';
import LayoutEdit from './EditProfile/components/LayoutEdit/LayoutEdit';
import EditAllGeneral from './EditProfile/components/EditAllGeneral/EditAllGeneral';

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
const ResultSearch = lazy(
  () => import('../pages/ResultSearchPage/ResultSearchPage'),
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<ResultSearch />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="trainer/:id" element={<TrainerPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path={PublicRouteName.LOGIN} element={<LogIn />} />
          <Route path="club/:id" element={<Club />} />
          <Route path="/details" element={<Details />}>
            <Route path="account-trainer/:id" element={<AccountTrainer />} />
            <Route
              path="account-admin-club/:id"
              element={<AccountAdminClub />}
            />
          </Route>
          {/* <Route path={PublicRouteName.FAVORITS} element={<Favorites />} /> */}
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/profile" element={<AccountLayout />}>
            <Route index element={<Account />} />
            <Route path="edit" element={<LayoutEdit />}>
              <Route index element={<EditProfile />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path={PublicRouteName.FAVORITS} element={<Favorites />} />
              <Route
                path={PublicRouteName.CHANGEPASSWORD}
                element={<ChangePassword />}
              />
              <Route path="schedule" element={<Schedule />} />
              <Route path="general" element={<EditAllGeneral />} />
            </Route>
            <Route path="reviews" element={<Reviews />} />
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
