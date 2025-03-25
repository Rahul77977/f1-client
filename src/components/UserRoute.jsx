import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/Auth';

const UserRoute = () => {
  const { isLoggedIn, firebaseUser, serverUser } = useAuth();
  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  // Otherwise, render the nested routes
  return <Outlet />;
};

export default UserRoute;
