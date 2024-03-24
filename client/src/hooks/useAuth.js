import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (isLoggedIn) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // If user is not logged in, redirect to the login page
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn;
};

export default useAuth;
