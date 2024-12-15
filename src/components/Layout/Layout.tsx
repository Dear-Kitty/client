import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/router';
import { useAuthStore } from '../../store/authStore';
import Navigation from '../Navigation/Navigation';
import Content from './Content';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isloggedIn } = useAuthStore();

  useEffect(() => {
    if (!isloggedIn) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [navigate, isloggedIn]);

  if (location.pathname === ROUTES.JOIN || location.pathname === ROUTES.LOGIN) {
    return <Content />;
  } else {
    return (
      <>
        <Navigation />

        <Content />
      </>
    );
  }
};
export default Layout;
