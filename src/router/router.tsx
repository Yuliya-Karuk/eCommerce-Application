import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/login/login';
import Registration from '../pages/registration/registration';
import ProductItem from '../pages/productItem/productItem';
import { Routes } from './routes';

export const router = createBrowserRouter([
  { path: Routes.HOME_ROUTE, element: <App /> },
  { path: Routes.LOGIN_ROUTE, element: <Login /> },
  { path: Routes.REGISTRATION_ROUTE, element: <Registration /> },
  { path: `${Routes.PRODUCT_ROUTE}/:slug`, element: <ProductItem /> },
]);
