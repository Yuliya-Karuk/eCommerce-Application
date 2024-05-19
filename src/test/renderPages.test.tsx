import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { NotFoundPage } from '../pages/notFound/notFound';
import { ProductItem } from '../pages/productItem/productItem';
import { Registration } from '../pages/registration/registration';
import { Routes as appRoutes } from '../router/routes';

const textOnPages = {
  product: 'ProductItem Page',
};

export const routerArray = [
  { path: appRoutes.HOME_ROUTE, element: <Home />, text: 'Home Page' },
  { path: appRoutes.LOGIN_ROUTE, element: <Login />, text: 'Log in' },
  { path: appRoutes.REGISTRATION_ROUTE, element: <Registration />, text: 'Registration' },
  { path: '/undefined', element: <NotFoundPage />, text: 'Feel free to continue browsing the site.' },
];

describe('render', () => {
  routerArray.forEach(({ path, element, text }) => {
    it(`should render component for route ${path}`, () => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path={path} element={element} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});

describe('render', () => {
  it('renders the Product Item page', () => {
    render(
      <BrowserRouter>
        <ProductItem />
      </BrowserRouter>
    );
    expect(screen.getByText(textOnPages.product)).toBeInTheDocument();
  });
});
