/* eslint-disable no-nested-ternary */
import { sdkService } from '@commercetool/sdk.service';
import { CartModal } from '@components/CartModal/CartModal';
import { CartProductCard } from '@components/CartProductCard/CartProductCard';
import { Container } from '@components/Container/Container';
import { EmptyCartMessage } from '@components/EmptyCartMessage/EmptyCartMessage';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Loader } from '@components/Loader/Loader';
import { PromoCodeView } from '@components/PromoCodeView/PromoCodeView';
import { useAuth } from '@contexts/authProvider';
import { useCart } from '@contexts/cartProvider';
import { useToast } from '@contexts/toastProvider';
import { storage } from '@utils/storage';
import { convertCentsToDollarsString, isNotNullable } from '@utils/utils';
import classnames from 'classnames';
import { useState } from 'react';
import styles from './cart.module.scss';

export function Cart() {
  const { customToast, errorNotify } = useToast();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { cart, setCart, promoCodeName, setPromoCodeName } = useCart();
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const isCartEmpty = !(cart.lineItems?.length > 0);

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleClearCart = async () => {
    try {
      setModalIsOpen(false);
      await sdkService.removeCart(cart.id, cart.version);
      const data = await sdkService.createCart();
      if (!isLoggedIn) {
        storage.setCartStore(data.id, isNotNullable(data.anonymousId));
      }
      setCart(data);
      setPromoCodeName('');
    } catch (e) {
      errorNotify((e as Error).message);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <Container>
        {isCartEmpty ? (
          cart.lineItems ? (
            <EmptyCartMessage />
          ) : (
            <Loader />
          )
        ) : (
          <div className={styles.cart}>
            <div className={styles.myCart}>
              <div className={styles.myCartHeader}>
                <h2 className={styles.myCartTitle}>My cart</h2>
                <button type="button" className={styles.clearButton} onClick={() => setModalIsOpen(true)}>
                  Clear Cart
                </button>
              </div>
              <div className={styles.productsWrapper}>
                {cart.lineItems.map(item => (
                  <CartProductCard key={item.id} product={item} loading={loading} setLoading={setLoading} />
                ))}
              </div>
              <div className={styles.notes}>
                <textarea
                  className={styles.noteInput}
                  placeholder="Enter your notes here"
                  value={notes}
                  onChange={handleNotesChange}
                />
              </div>
            </div>
            <div className={styles.orderSummary}>
              <h2 className={styles.orderSummaryHeader}>Order summary</h2>
              <div className={styles.orderSummaryLineWrapper}>
                {cart.lineItems.map(item => (
                  <div key={item.id} className={styles.orderLine}>
                    <div className={styles.nameWrapper}>
                      {item.quantity}
                      <span className={styles.sku}>x</span>
                      {item.name['en-US']} <span className={styles.sku}>({item.variant.sku})</span>
                    </div>
                    <span className={styles.priceWrapper}>
                      {convertCentsToDollarsString(item.totalPrice.centAmount)}
                    </span>
                  </div>
                ))}
              </div>
              <PromoCodeView />
              {promoCodeName && cart.discountOnTotalPrice?.discountedAmount && (
                <>
                  <div className={classnames(styles.totalPriceWrapper, styles.price)}>
                    Price:{' '}
                    <span>
                      {convertCentsToDollarsString(
                        cart.totalPrice.centAmount +
                          isNotNullable(cart.discountOnTotalPrice?.discountedAmount.centAmount)
                      )}
                    </span>
                  </div>
                  <div className={classnames(styles.totalPriceWrapper, styles.discount)}>
                    Discount:{' '}
                    <span>{convertCentsToDollarsString(cart.discountOnTotalPrice.discountedAmount.centAmount)}</span>
                  </div>
                </>
              )}
              <div className={styles.totalPriceWrapper}>
                Total:
                <span
                  className={classnames({ [styles.discountedFinalPrice]: cart.discountOnTotalPrice?.discountedAmount })}
                >
                  {convertCentsToDollarsString(cart.totalPrice.centAmount)}
                </span>
              </div>
              <button type="button" className={styles.checkoutButton}>
                Checkout
              </button>
            </div>
          </div>
        )}
        <CartModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} handleClearCart={handleClearCart} />
      </Container>
      <div className={styles.specialEmptyContainer} />
      <Footer />
      {customToast({ position: 'top-center', autoClose: 5000 })}
    </div>
  );
}
