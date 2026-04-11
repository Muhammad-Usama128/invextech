import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { lazy } from "react";
import Layout from "./components/Layout/Layout";
const Home = lazy(() => import("./components/Home/Home"));
const Categories = lazy(() => import("./components/Categories/Categories"));
const SubCategories = lazy(
  () => import("./components/SubCategories/SubCategories"),
);
const About = lazy(() => import("./components/About/About"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:category" element={<SubCategories />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
