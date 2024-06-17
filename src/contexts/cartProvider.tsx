import { sdkService } from '@commercetool/sdk.service';
import { Cart, CartSetAnonymousIdAction } from '@commercetools/platform-sdk';
import { storage } from '@utils/storage';
import { isNotNullable } from '@utils/utils';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from './authProvider';

interface CartContextValue {
  cart: Cart;
  setCart: (data: Cart) => void;
  promoCodeName: string;
  setPromoCodeName: (data: string) => void;
}

const CartContext = createContext<CartContextValue>({} as CartContextValue);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState({} as Cart);
  const [promoCodeName, setPromoCodeName] = useState('');
  const { isLoggedIn } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {
    const fetchCart = async () => {
      let data: Cart;
      if (!isLoggedIn) {
        if (!storage.getCartStore()) {
          data = await sdkService.createCart();
        } else {
          data = await sdkService.getCart(isNotNullable(storage.getCartStore()).cartId);
          const anonymousId = isNotNullable(storage.getAnonId());

          if (data.anonymousId !== anonymousId && !initialized.current) {
            initialized.current = true;
            const action: CartSetAnonymousIdAction = {
              action: 'setAnonymousId',
              anonymousId,
            };
            data = await sdkService.setAnonymousId(data.id, data.version, action);
          }
        }
        storage.setCartStore(data.id, isNotNullable(data.anonymousId));
      } else {
        const carts = await sdkService.getAuthorizedCarts();
        const activeCart = carts.filter(oneCart => oneCart.cartState === 'Active')[0];
        if (carts.length > 0 && activeCart) {
          data = activeCart;
        } else {
          data = await sdkService.createCart();
        }
      }

      if (data.discountCodes) {
        const promoCode = data.discountCodes.filter(discount => discount.state === 'MatchesCart')[0];
        setPromoCodeName(promoCode?.discountCode?.obj?.code || '');
      }
      setCart(data);
    };

    fetchCart();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider value={{ cart, setCart, promoCodeName, setPromoCodeName }}>{children}</CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart hook must be used within a CartProvider');
  }

  return context;
};
