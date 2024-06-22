import { sdkService } from '@commercetool/sdk.service';
import { ToastProvider } from '@contexts/toastProvider';
import { Catalog } from '@pages/catalog/catalog';
import { AppRoutes } from '@router/routes';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('@commercetool/sdk.service');

const mockTypes = [
  {
    name: 'Type1',
    id: '1',
    attributes: [
      {
        name: 'brand',
        type: {
          elementType: {
            values: [{ label: 'brandName1' }, { label: 'brandName2' }, { label: 'brandName3' }],
          },
        },
      },
      { name: 'attr2' },
    ],
  },
  {
    name: 'Type2',
    id: '2',
    attributes: [
      {
        name: 'size',
        type: {
          elementType: {
            values: [{ label: 'S' }, { label: 'M' }, { label: 'L' }],
          },
        },
      },
      { name: 'attr2' },
    ],
  },
  {
    name: 'Type3',
    id: '3',
    attributes: [{ name: 'attr4' }, { name: 'attr1' }],
  },
];

describe('ProductItem', () => {
  it('Brands names are rendering correctly', async () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <Routes>
            <Route path={AppRoutes.CATALOG_ROUTE} element={<Catalog />} />
          </Routes>
        </ToastProvider>
      </MemoryRouter>
    );

    sdkService.getProductsTypes = vi.fn().mockResolvedValue(mockTypes);

    setTimeout(() => {
      expect(screen.getByText('brandName1')).toBeInTheDocument();
      expect(screen.getByText('brandName2')).toBeInTheDocument();
      expect(screen.getByText('brandName3')).toBeInTheDocument();
      expect(screen.getByText('S')).toBeInTheDocument();
      expect(screen.getByText('M')).toBeInTheDocument();
      expect(screen.getByText('L')).toBeInTheDocument();
    }, 2000);
  });
});
