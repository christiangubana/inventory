import React, { Suspense, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/NavBar";
import Loading from "./components/Screens/Global/Loading";

const Registration = React.lazy(() => import("./components/Register"));
const Login = React.lazy(() => import("./components/Login"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const AddFoodForm = React.lazy(() => import("./components/AddFoodForm"));
const EditFoodForm = React.lazy(() => import("./components/EditFoodForm"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUserName(storedUsername);
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  if (loading) {
    return <Loading />; // Show loading indicator while checking authentication
  }

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
      />
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
            }
          />
          <Route
            path="/register"
            element={<Registration setIsLoggedIn={setIsLoggedIn} />}
          />
          {/* Redirect root path to /login */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add" element={<AddFoodForm />} />
              <Route path="/edit/:itemId" element={<EditFoodForm />} />
              <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Redirect to dashboard if logged in */}
            </>
          ) : (
            <>
              {/* Redirect all other paths to login if not logged in */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
