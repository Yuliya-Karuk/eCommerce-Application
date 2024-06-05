import { sdkService } from '@commercetool/sdk.service';
import { Cart as CartInterface } from '@commercetools/platform-sdk';
import { Container } from '@components/Container/Container';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Loader } from '@components/Loader/Loader';
import { useToast } from '@contexts/toastProvider';
import { storage } from '@utils/storage';
import { assertValue } from '@utils/utils';
import { useEffect, useState } from 'react';
import styles from './cart.module.scss';

export function Cart() {
  const { customToast, errorNotify } = useToast();

  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<CartInterface>({} as CartInterface);

  const cartId = storage.getCartStore();
  assertValue(cartId, 'no cart id in LocalStorage');

  useEffect(() => {
    const getCart = async () => {
      try {
        setLoading(true);
        const data = await sdkService.getAnonymousCart(cartId);
        setCart(data);
        setLoading(false);
      } catch (err) {
        errorNotify((err as Error).message);
      }
    };
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(cart);

  return (
    <>
      <Header />
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <div className={styles.cart}>
            <div className={styles.myCart}>
              <h2 className={styles.myCartHeader}>My cart</h2>
              <div className={styles.productsWrapper}>
                <div>Product_Cart 1</div>
                <div>Product_Cart 2</div>
                <div>Product_Cart 3</div>
              </div>
              <div className={styles.promoCode}>PromoCode</div>
              <div className={styles.note}>Notes Section</div>
            </div>
            <div className={styles.orderSummary}>
              <h2 className={styles.orderSummaryHeader}>Order summary</h2>
              <div className={styles.productsWrapper}>
                <div>Product_name 1$</div>
                <div>Product_name 2$</div>
                <div>Product_name 3$</div>
              </div>
              <div className={styles.totalPriceWrapper}>
                Total: <span>70$</span>
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
