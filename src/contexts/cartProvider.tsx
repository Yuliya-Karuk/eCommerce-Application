import { sdkService } from '@commercetool/sdk.service';
import { Cart } from '@commercetools/platform-sdk';
import { storage } from '@utils/storage';
import { isNotNullable } from '@utils/utils';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useAuth } from './authProvider';

interface CartContextValue {
  cart: Cart;
  setCart: (data: Cart) => void;
}

const CartContext = createContext<CartContextValue>({} as CartContextValue);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState({} as Cart);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log(isLoggedIn);
    const fetchCart = async () => {
      let data: Cart;
      if (!storage.getCartStore() && isLoggedIn) {
        console.log('loggenied - storage');
        const carts = await sdkService.getAuthorizedCarts();
        if (carts.length > 0) {
          [data] = carts;
        } else {
          data = await sdkService.createAuthorizedCart();
        }
        storage.setCartStore(data.id);
      } else if (!storage.getCartStore() && !isLoggedIn) {
        data = await sdkService.createCart();
        storage.setCartStore(data.id);
        console.log('anonim - storage');
      } else {
        console.log('storage');
        console.log(await sdkService.getAuthorizedCarts());
        data = await sdkService.getCart(isNotNullable(storage.getCartStore()));
      }
      console.log(data);
      setCart(data);
    };

    fetchCart();
  }, [isLoggedIn]);

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart hook must be used within a CartProvider');
  }

  return context;
};
