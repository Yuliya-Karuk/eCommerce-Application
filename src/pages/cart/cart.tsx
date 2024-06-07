/* eslint-disable @typescript-eslint/no-unused-vars */
import { sdkService } from '@commercetool/sdk.service';
import { CartProductCard } from '@components/CartProductCard/CartProductCard';
import { Container } from '@components/Container/Container';
import { EmptyCartMessage } from '@components/EmptyCartMessage/EmptyCartMessage';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { PromoCodeView } from '@components/PromoCodeView/PromoCodeView';
import { useCart } from '@contexts/cartProvider';
import { useToast } from '@contexts/toastProvider';
import { convertCentsToDollarsString } from '@utils/utils';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './cart.module.scss';

Modal.setAppElement('#root');

export function Cart() {
  const { customToast } = useToast();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
  const { cart, setCart } = useCart();
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (cart.lineItems?.length > 0) {
      setIsCartEmpty(false);
    } else {
      setIsCartEmpty(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleClearCart = async () => {
    setModalIsOpen(false);
    await sdkService.removeCart(cart.id, cart.version);
    const data = await sdkService.createCart();
    setCart(data);
  };

  return (
    <>
      <Header />
      <Container>
        {isCartEmpty ? (
          <EmptyCartMessage />
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
                      {item.name['en-US']} <span className={styles.sku}>({item.variant.sku})</span> x {item.quantity}
                    </div>
                    <span className={styles.priceWrapper}>
                      {convertCentsToDollarsString(item.totalPrice.centAmount)}
                    </span>
                  </div>
                ))}
              </div>
              <PromoCodeView />
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
