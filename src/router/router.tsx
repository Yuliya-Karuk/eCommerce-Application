import { About } from '@pages/about/about';
import { Cart } from '@pages/cart/cart';
import { Catalog } from '@pages/catalog/catalog';
import { Home } from '@pages/home/home';
import { Login } from '@pages/login/login';
import { NotFoundPage } from '@pages/notFound/notFound';
import { ProductItem } from '@pages/productItem/productItem';
import { Profile } from '@pages/profile/profile';
import { Registration } from '@pages/registration/registration';
import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

export const router = createBrowserRouter([
  { path: AppRoutes.HOME_ROUTE, element: <Home /> },
  { path: AppRoutes.LOGIN_ROUTE, element: <Login /> },
  { path: AppRoutes.REGISTRATION_ROUTE, element: <Registration /> },
  { path: AppRoutes.PROFILE_ROUTE, element: <Profile /> },
  { path: AppRoutes.CATALOG_ROUTE, element: <Catalog /> },
  { path: `${AppRoutes.CATALOG_ROUTE}/:category/`, element: <Catalog /> },
  { path: `${AppRoutes.CATALOG_ROUTE}/:category/:subcategory`, element: <Catalog /> },
  { path: `${AppRoutes.PRODUCTS_ROUTE}/:category?/:subcategory?/:slug`, element: <ProductItem /> },
  { path: AppRoutes.ABOUT_ROUTE, element: <About /> },
  { path: AppRoutes.PROFILE_ROUTE, element: <Profile /> },
  { path: `${AppRoutes.PRODUCTS_ROUTE}/:slug`, element: <ProductItem /> },
  { path: `${AppRoutes.PRODUCTS_ROUTE}/:slug/:key`, element: <ProductItem /> },
  { path: AppRoutes.CART_ROUTE, element: <Cart /> },
  { path: '*', element: <NotFoundPage /> },
]);
