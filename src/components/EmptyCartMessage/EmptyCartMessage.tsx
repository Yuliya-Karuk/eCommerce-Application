import CartSVG from '@assets/cart_empty.png';
import { Link } from 'react-router-dom';
import styles from './EmptyCartMessage.module.scss';

export function EmptyCartMessage() {
  return (
    <div className={styles.emptyCartMessage}>
      <img src={CartSVG} alt="Empty Cart" className={styles.cartImage} />
      Your shopping cart is empty. Add some items to get started!
      <Link to="/catalog" className={styles.catalogLink}>
        Go to Catalog
      </Link>
    </div>
  );
}
