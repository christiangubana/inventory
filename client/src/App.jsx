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

  console.log(`username FROM App is ${username}`);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }
    console.log("username FROM App:", storedUsername); // This sh
  }, []);

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
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={<Registration setIsLoggedIn={setIsLoggedIn} />}
          />
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
