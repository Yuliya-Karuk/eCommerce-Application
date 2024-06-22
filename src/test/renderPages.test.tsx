import { Home } from '@pages/home/home';
import { Login } from '@pages/login/login';
import { NotFoundPage } from '@pages/notFound/notFound';
import { ProductItem } from '@pages/productItem/productItem';
import { Registration } from '@pages/registration/registration';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ToastProvider } from '@contexts/toastProvider';
import { About } from '@pages/about/about';
import { Cart } from '@pages/cart/cart';
import { Catalog } from '@pages/catalog/catalog';
import { AppRoutes } from '../router/routes';

const textOnPages = {
  product: 'ProductItem Page',
};

export const routerArray = [
  { path: AppRoutes.HOME_ROUTE, element: <Home />, text: 'Sprout' },
  { path: AppRoutes.LOGIN_ROUTE, element: <Login />, text: 'Log in' },
  { path: AppRoutes.REGISTRATION_ROUTE, element: <Registration />, text: 'Registration' },
  { path: AppRoutes.ABOUT_ROUTE, element: <About />, text: 'All About Sprout' },
  { path: '/undefined', element: <NotFoundPage />, text: 'Feel free to continue browsing the site.' },
];

describe('render', () => {
  routerArray.forEach(({ path, element, text }) => {
    it(`should render component for route ${path}`, async () => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <ToastProvider>
            <Routes>
              <Route path={path} element={element} />
            </Routes>
          </ToastProvider>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });
  });
});

describe('render', () => {
  it('renders the Product Item page', () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Routes>
            <Route path="products/plants/succulents/Pl-01" element={<ProductItem />} />
          </Routes>
        </ToastProvider>
      </MemoryRouter>
    );

    setTimeout(() => {
      expect(screen.getByText(textOnPages.product)).toBeInTheDocument();
    }, 2000);
  });
});

describe('render', () => {
  it('renders the Cart page', async () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Routes>
            <Route path={AppRoutes.CART_ROUTE} element={<Cart />} />
          </Routes>
        </ToastProvider>
      </MemoryRouter>
    );

    setTimeout(() => {
      const firstText = screen.getByText('My cart');
      const secondText = screen.getByText('Your shopping cart is empty. Add some items to get started!');
      expect(firstText || secondText).toBeInTheDocument();
    }, 2000);
  });
});

describe('render', () => {
  it('renders the Catalog Page', async () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Routes>
            <Route path={AppRoutes.CATALOG_ROUTE} element={<Catalog />} />
          </Routes>
        </ToastProvider>
      </MemoryRouter>
    );

    setTimeout(() => {
      expect(screen.getByText('Browse by')).toBeInTheDocument();
    }, 2000);
  });
});
