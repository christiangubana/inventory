import React, { Suspense, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/NavBar";
import Loading from "./components/Screens/Global/Loading";
import useAuth from "./hooks/useAuth"

const Registration = React.lazy(() => import("./components/Register"));
const Login = React.lazy(() => import("./components/Login"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const AddFoodForm = React.lazy(() => import("./components/AddFoodForm"));
const EditFoodForm = React.lazy(() => import("./components/EditFoodForm"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Apply useAuth hook to protect dashboard and related routes
  useAuth(isLoggedIn);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={userName} />
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
          <Route path="/register" element={<Registration setIsLoggedIn={setIsLoggedIn} />} />
          {/* Protected Routes */}
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add" element={<AddFoodForm />} />
              <Route path="/edit/:itemId" element={<EditFoodForm />} />
            </>
          ) : (
            <>
              {/* Redirect to login if not logged in */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
