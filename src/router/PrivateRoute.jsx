import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    toast.error("You must be logged in to access this page!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default PrivateRoute;
