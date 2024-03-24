import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/NavBar";
import Registration from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <ToastContainer /> {/* Add this line */}
        <Routes>
          {/* Redirect to dashboard if logged in and token is available */}
          {isLoggedIn && <Route path="/" element={<Navigate to="/dashboard" />} />}
          {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Login route */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          {/* Registration route */}
          <Route path="/register" element={<Registration setIsLoggedIn={setIsLoggedIn} />} />
          {/* If not logged in, redirect to login */}
          {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </>
    </Router>
  );
}

export default App;
