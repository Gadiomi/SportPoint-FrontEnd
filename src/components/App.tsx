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
import EditScheduleCard from './EditProfile/components/Schedule/components/EditScheduleCard/EditScheduleCard';

const Home = lazy(() => import('../pages/HomePage/HomePage'));
const LogIn = lazy(() => import('../pages/LogInPage/LogInPage'));
const Register = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const ProfileRoute = lazy(() => import('../pages/AccountPage/ProfileRoute'));

const TrainerPage = lazy(
  () => import('../pages/DetailsPage/TrainerPage/TrainerPage'),
);

const Club = lazy(() => import('../pages/DetailsPage/ClubPage/ClubPage'));
const Favorites = lazy(() => import('../pages/FavoritesPage/FavoritesPage'));
const TrainersPage = lazy(
  () => import('../pages/HomePage/TrainersPage/TrainersPage'),
);
const ClubsPage = lazy(() => import('../pages/HomePage/ClubsPage/ClubsPage'));
const Reviews = lazy(() => import('../pages/ReviewsPage/ReviewsPage'));
const ResultSearch = lazy(
  () => import('../pages/ResultSearchPage/ResultSearchPage'),
);
// --- TEMP! ---
const Helper = lazy(() => import('../pages/HelperPage/HelperPage'));
// --- TEMP! ---

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<ResultSearch />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="trainers/trainer/:id" element={<TrainerPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="clubs/club/:id" element={<Club />} />
          <Route path="/register" element={<Register />} />
          <Route path={PublicRouteName.LOGIN} element={<LogIn />} />

          {/* <Route path={PublicRouteName.FAVORITS} element={<Favorites />} /> */}
          {/* <Route element={<PrivateRoute />}> */}
          <Route path="/profile" element={<AccountLayout />}>
            <Route index element={<ProfileRoute />} />
            <Route path="edit" element={<LayoutEdit />}>
              <Route index element={<EditProfile />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path={PublicRouteName.FAVORITS} element={<Favorites />} />
              <Route
                path={PublicRouteName.CHANGEPASSWORD}
                element={<ChangePassword />}
              />
              <Route
                path="edit-schedule"
                element={<EditScheduleCard />}
              ></Route>
              <Route path="schedule" element={<Schedule />}></Route>
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
        <Route path="/helper" element={<Helper />} /> {/* TEMP!!! */}
      </Routes>
      <ToastProvider />
    </Suspense>
  );
}

export default App;
