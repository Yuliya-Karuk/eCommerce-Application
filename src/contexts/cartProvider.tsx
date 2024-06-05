import { sdkService } from '@commercetool/sdk.service';
import { Cart } from '@commercetools/platform-sdk';
import { storage } from '@utils/storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchCart = async () => {
      const data = await sdkService.createAnonymousCart();
      console.log(data);
      storage.setCartStore(data.id);
      setCart(data);
    };

    fetchCart();
  }, []);

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
