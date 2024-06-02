import { About } from '@pages/about/about';
import { Catalog } from '@pages/catalog/catalog';
import { Home } from '@pages/home/home';
import { Login } from '@pages/login/login';
import { NotFoundPage } from '@pages/notFound/notFound';
import { ProductItem } from '@pages/productItem/productItem';
import { Registration } from '@pages/registration/registration';
import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

export const router = createBrowserRouter([
  { path: AppRoutes.HOME_ROUTE, element: <Home /> },
  { path: AppRoutes.LOGIN_ROUTE, element: <Login /> },
  { path: AppRoutes.REGISTRATION_ROUTE, element: <Registration /> },
  { path: AppRoutes.CATALOG_ROUTE, element: <Catalog /> },
  { path: AppRoutes.ABOUT_ROUTE, element: <About /> },
  { path: `${AppRoutes.PRODUCT_ROUTE}/:slug`, element: <ProductItem /> },
  { path: `${AppRoutes.PRODUCTS_ROUTE}/:slug/:key`, element: <ProductItem /> },
  { path: '*', element: <NotFoundPage /> },
]);
