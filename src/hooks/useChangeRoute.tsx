import { useAuth } from '@contexts/authProvider';
import { AppRoutes } from '@router/routes';
import { useLocation } from 'react-router-dom';

export const useChangeRoute = (array: string[]) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  let result = array.map(path => (path === location.pathname ? AppRoutes.HOME_ROUTE : path));

  if (isLoggedIn) {
    result = result.filter(path => path !== AppRoutes.LOGIN_ROUTE && path !== AppRoutes.REGISTRATION_ROUTE);
  }

  return result;
};
