import { sdkService } from '@commercetool/sdk.service';
import { Cart } from '@commercetools/platform-sdk';
import { storage } from '@utils/storage';
import { createContext, ReactNode, useEffect, useState } from 'react';

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

    // Запрашиваем данные корзины при загрузке компонента
    fetchCart();
  }, []);

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
