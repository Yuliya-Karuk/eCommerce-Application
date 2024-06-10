import sprite from '@assets/sprite.svg';
import { sdkService } from '@commercetool/sdk.service';
import { useAuth } from '@contexts/authProvider';
import { AppRoutes } from '@router/routes';
import classnames from 'classnames';
import { FC } from 'react';
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

  const handleLogout = () => {
    sdkService.logoutUser();
    logout();
  };

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

      <div className={styles.userMenuCart} data-tooltip={ToolTips.CART}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#cart`} />
        </svg>
      </div>
    </div>
  );
};
