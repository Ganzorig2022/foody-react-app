import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useMenuContext } from '../provider/Menu';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { LoadingSpinner } from '../components/Spinner';

const PrivateRoute = () => {
  const { isLoggedIn, openLogin, setOpenLogin, isSpinning, setIsSpinning } = useMenuContext();
  // const { checkingStatus } = useAuthStatus();

  if (!isLoggedIn) setOpenLogin(true);
  //if user is logged in then go to other pages
  // if user is NOT logged in then login page remains open

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
