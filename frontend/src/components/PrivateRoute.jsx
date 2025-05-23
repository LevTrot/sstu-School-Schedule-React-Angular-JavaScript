import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children || <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
