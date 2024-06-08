import sprite from '@assets/sprite.svg';
import { sdkService } from '@commercetool/sdk.service';
import { useAuth } from '@contexts/authProvider';
import { useCart } from '@contexts/cartProvider';
import { AppRoutes } from '@router/routes';
import { sumQuantities } from '@utils/utils';
import classnames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserMenu.module.scss';

enum ToolTips {
  PROFILE = 'Go to profile page',
  PROMO = 'Introduce the promotional code',
  CART = 'Open the cart',
}

export const UserMenu: FC = () => {
  const iconSizeNumber = 26;
  const { isLoggedIn, logout } = useAuth();
  const { cart } = useCart();
  const [productInCart, setProductInCart] = useState(0);

  const handleLogout = () => {
    sdkService.logoutUser();
    logout();
  };

  useEffect(() => {
    if (cart.lineItems !== undefined) {
      const newProductInCart = sumQuantities(cart.lineItems);
      setProductInCart(newProductInCart);
    }
  }, [cart]);

  return (
    <div className={styles.userMenu}>
      <button
        type="button"
        className={classnames(styles.userMenuLogout, { [styles.hidden]: !isLoggedIn })}
        onClick={handleLogout}
      >
        <div className={styles.userMenuIcon}>
          <svg width={iconSizeNumber} height={iconSizeNumber}>
            <use xlinkHref={`${sprite}#logout`} />
          </svg>
        </div>
        <span className={styles.userMenuText}>Logout</span>
      </button>
      <Link
        to={AppRoutes.PROFILE_ROUTE}
        className={classnames(styles.userMenuProfile, { [styles.hidden]: !isLoggedIn })}
        data-tooltip={ToolTips.PROFILE}
      >
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#profile`} />
        </svg>
      </Link>

      <div className={styles.userMenuPromo} data-tooltip={ToolTips.PROMO}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#present`} />
        </svg>
      </div>

      <Link to={AppRoutes.CART_ROUTE} className={styles.userMenuCart} data-tooltip={ToolTips.CART}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#cart`} />
        </svg>
        <span>{productInCart}</span>
      </Link>
    </div>
  );
};
