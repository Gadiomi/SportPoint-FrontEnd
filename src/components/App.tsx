import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';

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
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/details" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
