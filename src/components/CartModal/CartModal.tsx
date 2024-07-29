import Modal from 'react-modal';
import styles from './CartModal.module.scss';

const root = document.getElementById('root') as HTMLElement;
Modal.setAppElement(root);

interface CartModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (data: boolean) => void;
  handleClearCart: () => void;
}

export const CartModal = (cartModalProps: CartModalProps) => {
  const { modalIsOpen, setModalIsOpen, handleClearCart } = cartModalProps;

  return (
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
  );
};
