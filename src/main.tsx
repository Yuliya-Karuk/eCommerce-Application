import { CartProvider } from '@contexts/cartProvider';
import { ToastProvider } from '@contexts/toastProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/authProvider';
import { CategoryProvider } from './contexts/categoryProvider';
import { router } from './router/router';
import './styles/index.scss';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <CategoryProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </CategoryProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
