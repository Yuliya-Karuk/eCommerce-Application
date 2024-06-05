import { Container } from '@components/Container/Container';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import styles from './cart.module.scss';

export function Cart() {
  return (
    <>
      <Header />
      <Container>
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
      </Container>
      <Footer />
    </>
  );
}
