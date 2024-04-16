import React, { lazy, Suspense, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Layout/NavBar";
import Loading from "./components/Screens/Global/Loading";

const Registration = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const AddFoodForm = lazy(() => import("./components/AddFoodForm"));
const EditFoodForm = lazy(() => import("./components/EditFoodForm"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // State to store user's name

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <>
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userName={userName}
        />
        <ToastContainer />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<Loading />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="/add"
                element={
                  <Suspense fallback={<Loading />}>
                    <AddFoodForm />
                  </Suspense>
                }
              />
              <Route
                path="/edit/:itemId"
                element={
                  <Suspense fallback={<Loading />}>
                    <EditFoodForm />
                  </Suspense>
                }
              />
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading />}>
                    <Navigate to="/dashboard" />
                  </Suspense>
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading />}>
                    <Navigate to="/login" />
                  </Suspense>
                }
              />
              <Route
                path="/login"
                element={
                  <Suspense fallback={<Loading />}>
                    <Login
                      setIsLoggedIn={setIsLoggedIn}
                      setUserName={setUserName}
                    />
                  </Suspense>
                }
              />
              <Route
                path="/register"
                element={
                  <Suspense fallback={<Loading />}>
                    <Registration setIsLoggedIn={setIsLoggedIn} />
                  </Suspense>
                }
              />
            </>
          )}
        </Routes>
      </>
    </Router>
  );
}

export default App;
