/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartProductCard } from '@components/CartProductCard/CartProductCard';
import { Container } from '@components/Container/Container';
import { EmptyCartMessage } from '@components/EmptyCartMessage/EmptyCartMessage';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { PriceView } from '@components/PriceView/PriceView';
import { useCart } from '@contexts/cartProvider';
import { useToast } from '@contexts/toastProvider';
import { convertCentsToDollarsString } from '@utils/utils';
import { useEffect, useState } from 'react';
import styles from './cart.module.scss';

export function Cart() {
  const { customToast } = useToast();

  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
  const { cart } = useCart();

  useEffect(() => {
    if (cart.lineItems?.length > 0) {
      setIsCartEmpty(false);
      console.log(cart);
    } else {
      setIsCartEmpty(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <>
      <Header />
      <Container>
        {isCartEmpty ? (
          <EmptyCartMessage />
        ) : (
          <div className={styles.cart}>
            <div className={styles.myCart}>
              <h2 className={styles.myCartHeader}>My cart</h2>
              <div className={styles.productsWrapper}>
                {cart.lineItems.map(item => (
                  <CartProductCard key={item.id} product={item} />
                ))}
              </div>
              <div className={styles.promoCode}>PromoCode</div>
              <div className={styles.note}>Notes Section</div>
            </div>
            <div className={styles.orderSummary}>
              <h2 className={styles.orderSummaryHeader}>Order summary</h2>
              <div className={styles.orderSummaryLineWrapper}>
                {cart.lineItems.map(item => (
                  <div key={item.id} className={styles.orderLine}>
                    {item.name['en-US']}
                    <span className={styles.priceWrapper}>
                      <PriceView price={item.price} />
                    </span>
                  </div>
                ))}
              </div>
              <div className={styles.totalPriceWrapper}>
                Total: <span>{convertCentsToDollarsString(cart.totalPrice.centAmount)}</span>
              </div>
              <button type="button" className={styles.checkoutButton}>
                Checkout
              </button>
            </div>
          </div>
        )}
        {customToast({ position: 'top-center', autoClose: 5000 })}
      </Container>
      <Footer />
    </>
  );
}
