import { CartProvider } from '@contexts/cartProvider';
import { ToastProvider } from '@contexts/toastProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/authProvider';
import { CategoryProvider } from './contexts/categoryProvider';
import { AppRouter } from './router/router';
import './styles/index.scss';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <CategoryProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </CategoryProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
