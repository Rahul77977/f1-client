import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import AdminDashboard from './Admin/AdminDashboard';

const AdminRoute = () => {
  const { isLoggedIn, firebaseUser, serverUser, authIsLoading } = useAuth();

  // Debug logging
  console.log("AdminRoute: isLoggedIn =", isLoggedIn);
  console.log("AdminRoute: firebaseUser =", firebaseUser);
  console.log("AdminRoute: serverUser =", serverUser);

  if (authIsLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = serverUser?.isAdmin || firebaseUser?.isAdmin;
  console.log("AdminRoute: isAdmin =", isAdmin);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <AdminDashboard />;
};

export default AdminRoute;
