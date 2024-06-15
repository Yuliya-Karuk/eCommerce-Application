import { useAuth } from '@contexts/authProvider';
import { AppRoutes } from '@router/routes';
import { useLocation } from 'react-router-dom';

export const useChangeMenuRoute = (array: string[]) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return array.map((path: string) => {
    let route = '';

    switch (path) {
      case location.pathname:
        route = AppRoutes.HOME_ROUTE;
        break;

      case AppRoutes.LOGIN_ROUTE:
        route = isLoggedIn ? `${AppRoutes.CATALOG_ROUTE}/plants` : AppRoutes.LOGIN_ROUTE;

        if (route === location.pathname) {
          route = AppRoutes.HOME_ROUTE;
        }
        break;

      case AppRoutes.REGISTRATION_ROUTE:
        route = isLoggedIn ? `${AppRoutes.CATALOG_ROUTE}/pots` : AppRoutes.REGISTRATION_ROUTE;

        if (route === location.pathname) {
          route = AppRoutes.HOME_ROUTE;
        }
        break;

      default:
        route = path;
        break;
    }

    return route;
  });
};
