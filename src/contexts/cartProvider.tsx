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
    const fetchCart = async () => {
      let data: Cart;
      if (!isLoggedIn) {
        if (!storage.getCartStore()) {
          data = await sdkService.createCart();
        } else {
          data = await sdkService.getCart(isNotNullable(storage.getCartStore()).cartId);
          const anonymousId = isNotNullable(storage.getAnonId());

          if (data.anonymousId !== anonymousId) {
            data = await sdkService.setAnonymousId(data.id, data.version, anonymousId);
          }
        }
        storage.setCartStore(data.id, isNotNullable(data.anonymousId));
      } else {
        const carts = await sdkService.getAuthorizedCarts();
        if (carts.length > 0) {
          data = isNotNullable(carts.filter(oneCart => oneCart.cartState === 'Active')[0]);
        } else {
          data = await sdkService.createCart();
        }
        console.log(data);
      }

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
