import sprite from '@assets/sprite.svg';
import { sdkService } from '@commercetool/sdk.service';
import { Modal } from '@components/Modal/Modal';
import { useAuth } from '@contexts/authProvider';
import { useCart } from '@contexts/cartProvider';
import { AppRoutes } from '@router/routes';
import { sumQuantities } from '@utils/utils';
import classnames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './UserMenu.module.scss';

enum ToolTips {
  HOME = 'Go to home page',
  PROFILE = 'Go to profile page',
  PROMO = 'Introduce the promotional code',
  CART = 'Open the cart',
}

const promoText =
  "Enjoy 10% off with our summer promo code SUMMER2024, or get 15% off your first order with promo code FIRST! Don't miss out on these great deals!";

export const UserMenu: FC = () => {
  const iconSizeNumber = 26;
  const { isLoggedIn, logout } = useAuth();
  const { cart } = useCart();
  const [productInCart, setProductInCart] = useState(0);
  const location = useLocation();
  const isProfile = location.pathname === AppRoutes.PROFILE_ROUTE;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleLogout = () => {
    sdkService.logoutUser();
    logout();
  };

  useEffect(() => {
    if (cart && cart.lineItems !== undefined) {
      const newProductInCart = sumQuantities(cart.lineItems);
      setProductInCart(newProductInCart);
    }
  }, [cart]);

  return (
    <>
      <div className={styles.userMenu}>
        <button
          type="button"
          className={classnames(styles.userMenuLogout, { [styles.hidden]: !isLoggedIn })}
          onClick={handleLogout}
        >
          <div className={styles.userMenuLogoutIcon}>
            <svg width={iconSizeNumber} height={iconSizeNumber}>
              <use xlinkHref={`${sprite}#logout`} />
            </svg>
          </div>
          <span className={styles.userMenuText}>Logout</span>
        </button>

        <Link
          to={isProfile ? AppRoutes.HOME_ROUTE : AppRoutes.PROFILE_ROUTE}
          className={classnames(styles.userMenuIcon, { [styles.hidden]: !isLoggedIn })}
          aria-label={isProfile ? ToolTips.HOME : ToolTips.PROFILE}
          data-tooltip={isProfile ? ToolTips.HOME : ToolTips.PROFILE}
        >
          <svg width={iconSizeNumber} height={iconSizeNumber}>
            <use xlinkHref={isProfile ? `${sprite}#home` : `${sprite}#profile`} />
          </svg>
        </Link>

        <button
          type="button"
          className={styles.userMenuIcon}
          aria-label={ToolTips.PROMO}
          data-tooltip={ToolTips.PROMO}
          onClick={e => {
            e.stopPropagation();
            setIsOpenModal(true);
          }}
        >
          <svg width={iconSizeNumber} height={iconSizeNumber}>
            <use xlinkHref={`${sprite}#present`} />
          </svg>
        </button>

        <Link
          to={AppRoutes.CART_ROUTE}
          className={classnames(styles.userMenuIcon, { [styles.userMenuCart]: true })}
          data-tooltip={ToolTips.CART}
          aria-label={ToolTips.CART}
        >
          <svg width={iconSizeNumber} height={iconSizeNumber}>
            <use xlinkHref={`${sprite}#cart`} />
          </svg>
          <span>{productInCart > 99 ? '99+' : productInCart}</span>
        </Link>
      </div>

      <Modal
        isOpenModal={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      >
        {promoText}
      </Modal>
    </>
  );
};
