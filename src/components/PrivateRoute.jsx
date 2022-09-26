import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useMenuContext } from '../provider/Menu';

const PrivateRoute = () => {
  const { isLoggedIn, setOpenLogin } = useMenuContext();

  if (!isLoggedIn) setOpenLogin(true);
  //if user is logged in then go to other pages
  // if user is NOT logged in then login page remains open

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
