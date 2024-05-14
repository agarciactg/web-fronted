import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  // const isLoggedIn = useSelector((state: any) => state.auth.authentication);
  return <Outlet />
};

export default PublicRoute;
