import { sdkService } from '@commercetool/sdk.service';
import { ToastProvider } from '@contexts/toastProvider';
import { ProductItem } from '@pages/productItem/productItem';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('@commercetool/sdk.service');

const mockProduct = {
  id: '1',
  name: { 'en-US': 'Test Product' },
  description: { 'en-US': 'Test Product Description' },
  masterVariant: {
    id: 1,
    sku: 'test-sku',
    prices: [{ value: { currencyCode: 'USD', centAmount: 1000 } }],
    images: [{ url: 'https://via.placeholder.com/150' }],
    attributes: [{ name: 'details', value: 'Test details' }],
  },
  variants: [],
};

describe('ProductItem', () => {
  beforeEach(() => {
    sdkService.getProductProjectionByKey = vi.fn().mockResolvedValue(mockProduct);
  });

  it('renders loader initially', async () => {
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
      expect(screen.getByRole('ariaLabel', { name: 'rotating-lines-loading' })).toBeInTheDocument();
    }, 2000);
  });

  it('handles add to cart button click', () => {
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
      expect(screen.getByText('Test Product')).toBeInTheDocument();

      const addToCartButton = screen.getByText('add to cart');
      fireEvent.click(addToCartButton);

      expect(screen.getByText('remove from cart')).toBeInTheDocument();
    }, 2000);
  });

  it('handles remove from cart button click', () => {
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
      expect(screen.getByText('Test Product')).toBeInTheDocument();

      const addToCartButton = screen.getByText('add to cart');
      fireEvent.click(addToCartButton);
      const removeFromCartButton = screen.getByText('remove from cart');
      fireEvent.click(removeFromCartButton);

      expect(screen.getByText('add to cart')).toBeInTheDocument();
    }, 2000);
  });

  it('handles favorite button click', () => {
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
      expect(screen.getByText('Test Product')).toBeInTheDocument();

      const addToFavoriteButton = screen.getByAltText('add to favorite');
      fireEvent.click(addToFavoriteButton);

      expect(screen.getByAltText('flying heart')).toBeInTheDocument();
    }, 2000);
  });

  it('renders product details after loading', () => {
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
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('SKU: test-sku')).toBeInTheDocument();
      expect(screen.getByText('Price:')).toBeInTheDocument();
      expect(screen.getByText('$10.00')).toBeInTheDocument();
      expect(screen.getByText('Test details')).toBeInTheDocument();
    }, 2000);
  });
});
