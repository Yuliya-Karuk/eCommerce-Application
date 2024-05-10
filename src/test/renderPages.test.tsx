import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { NotFoundPage } from '../pages/notFound/notFound';
import { ProductItem } from '../pages/productItem/productItem';
import { Registration } from '../pages/registration/registration';

describe('render', () => {
  it('renders the main page', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});

describe('render', () => {
  it('renders the login page', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});

describe('render', () => {
  it('renders the registration page', () => {
    render(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});

describe('render', () => {
  it('renders the Not Found page', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});

describe('render', () => {
  it('renders the Product Item page', () => {
    render(
      <BrowserRouter>
        <ProductItem />
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });
});
