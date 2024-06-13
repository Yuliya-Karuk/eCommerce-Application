/* eslint-disable no-nested-ternary */
import { sdkService } from '@commercetool/sdk.service';
import { CartProductCard } from '@components/CartProductCard/CartProductCard';
import { Container } from '@components/Container/Container';
import { EmptyCartMessage } from '@components/EmptyCartMessage/EmptyCartMessage';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Loader } from '@components/Loader/Loader';
import { PromoCodeView } from '@components/PromoCodeView/PromoCodeView';
import { useCart } from '@contexts/cartProvider';
import { useToast } from '@contexts/toastProvider';
import { convertCentsToDollarsString, isNotNullable } from '@utils/utils';
import classnames from 'classnames';
import { useState } from 'react';
import Modal from 'react-modal';
import styles from './cart.module.scss';

Modal.setAppElement('#root');

export function Cart() {
  let price;
  let discount;
  const { customToast } = useToast();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { cart, setCart, promoCodeName, setPromoCodeName } = useCart();
  const [notes, setNotes] = useState<string>('');

  if (promoCodeName) {
    discount = isNotNullable(cart.discountOnTotalPrice?.discountedAmount.centAmount);
    price = cart.totalPrice.centAmount + discount;
  }
  const isCartEmpty = !(cart.lineItems?.length > 0);

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleClearCart = async () => {
    setModalIsOpen(false);
    await sdkService.removeCart(cart.id, cart.version);
    const data = await sdkService.createCart();
    setCart(data);
    setPromoCodeName('');
  };

  return (
    <>
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
                  <CartProductCard key={item.id} product={item} />
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
              {price && discount && (
                <>
                  <div className={classnames(styles.totalPriceWrapper, { [styles.price]: true })}>
                    Price: <span>{convertCentsToDollarsString(price)}</span>
                  </div>
                  <div className={classnames(styles.totalPriceWrapper, { [styles.discount]: true })}>
                    Discount: <span>{convertCentsToDollarsString(discount)}</span>
                  </div>
                </>
              )}
              <div className={styles.totalPriceWrapper}>
                Total: <span>{convertCentsToDollarsString(cart.totalPrice.centAmount)}</span>
              </div>
              <button type="button" className={styles.checkoutButton}>
                Checkout
              </button>
            </div>
          </div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className={styles.modal}
          overlayClassName={styles.modalOverlay}
        >
          <h2 className={styles.modalText}>Are you sure you want to remove all items from your cart?</h2>
          <div className={styles.buttonWrapper}>
            <button className={styles.modalConfirmButton} type="button" onClick={handleClearCart}>
              Confirm
            </button>
            <button className={styles.modalCancelButton} type="button" onClick={() => setModalIsOpen(false)}>
              Cancel
            </button>
          </div>
        </Modal>
        {customToast({ position: 'top-center', autoClose: 5000 })}
      </Container>
      <Footer />
    </>
  );
}
