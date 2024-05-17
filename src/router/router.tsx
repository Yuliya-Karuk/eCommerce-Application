import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { NotFoundPage } from '../pages/notFound/notFound';
import { Plants } from '../pages/plants/plants';
import { Pots } from '../pages/pots/pots';
import { ProductItem } from '../pages/productItem/productItem';
import { Registration } from '../pages/registration/registration';
import { Subscriptions } from '../pages/subscriptions/subscriptions';
import { Routes } from './routes';

export const router = createBrowserRouter([
  { path: Routes.HOME_ROUTE, element: <Home /> },
  { path: Routes.LOGIN_ROUTE, element: <Login /> },
  { path: Routes.REGISTRATION_ROUTE, element: <Registration /> },
  { path: Routes.PRODUCT_PLANTS, element: <Plants /> },
  { path: Routes.PRODUCT_POTS, element: <Pots /> },
  { path: Routes.PRODUCT_SUBSCRIPTIONS, element: <Subscriptions /> },
  { path: `${Routes.PRODUCT_ROUTE}/:slug`, element: <ProductItem /> },
  { path: '*', element: <NotFoundPage /> },
]);
