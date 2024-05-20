import { createBrowserRouter } from 'react-router-dom';
import { Catalog } from '../pages/catalog/catalog';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { NotFoundPage } from '../pages/notFound/notFound';
import { ProductItem } from '../pages/productItem/productItem';
import { Registration } from '../pages/registration/registration';
import { Routes } from './routes';

export const router = createBrowserRouter([
  { path: Routes.HOME_ROUTE, element: <Home /> },
  { path: Routes.LOGIN_ROUTE, element: <Login /> },
  { path: Routes.REGISTRATION_ROUTE, element: <Registration /> },
  { path: Routes.CATALOG_ROUTE, element: <Catalog /> },
  { path: `${Routes.PRODUCT_ROUTE}/:slug`, element: <ProductItem /> },
  { path: '*', element: <NotFoundPage /> },
]);
