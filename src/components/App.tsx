import { lazy, Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/HomePage/HomePage"));
const LogIn = lazy(() => import("../pages/LogInPage/LogInPage"));
const Register = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const Details = lazy(() => import("../pages/DetailsPage/DetailsPage"));
const Favorites = lazy(() => import("../pages/FavoritesPage/FavoritesPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
}

export default App;
