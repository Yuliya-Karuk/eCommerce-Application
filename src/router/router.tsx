import { About } from '@pages/about/about';
import { Cart } from '@pages/cart/cart';
import { Catalog } from '@pages/catalog/catalog';
import { Home } from '@pages/home/home';
import { Login } from '@pages/login/login';
import { NotFoundPage } from '@pages/notFound/notFound';
import { ProductItem } from '@pages/productItem/productItem';
import { Profile } from '@pages/profile/profile';
import { Registration } from '@pages/registration/registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
      <Route path={AppRoutes.LOGIN_ROUTE} element={<Login />} />
      <Route path={AppRoutes.REGISTRATION_ROUTE} element={<Registration />} />
      <Route path={AppRoutes.PROFILE_ROUTE} element={<Profile />} />
      <Route path={`${AppRoutes.CATALOG_ROUTE}/:category?/:subcategory?`} element={<Catalog />} />
      <Route path={`${AppRoutes.PRODUCTS_ROUTE}/:category?/:subcategory?/:slug`} element={<ProductItem />} />
      <Route path={AppRoutes.ABOUT_ROUTE} element={<About />} />
      <Route path={AppRoutes.CART_ROUTE} element={<Cart />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
