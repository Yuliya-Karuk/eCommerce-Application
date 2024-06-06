/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from '@components/Container/Container';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Loader } from '@components/Loader/Loader';
import { PriceView } from '@components/PriceView/PriceView';
import { useCart } from '@contexts/cartProvider';
import { useToast } from '@contexts/toastProvider';
import { convertCentsToDollarsString } from '@utils/utils';
import { useEffect, useState } from 'react';
import styles from './cart.module.scss';

export function Cart() {
  const { customToast } = useToast();

  const [loading, setLoading] = useState<boolean>(true);
  const { cart, setCart } = useCart();

  // не нужно
  // const cartId = storage.getCartStore();
  // assertValue(cartId, 'no cart id in LocalStorage');

  useEffect(() => {
    // не нужно это все в хуке и его можно взять из любого компонента
    // const getCart = async () => {
    //   try {
    //     setLoading(true);
    //     const data = await sdkService.getCart(cartId);
    //     setCart(data);
    //     setLoading(false);
    //   } catch (err) {
    //     errorNotify((err as Error).message);
    //   }
    // };
    // getCart();
    if (Object.values(cart).length > 0) {
      setLoading(false);
      console.log(setCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

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
