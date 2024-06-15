import sprite from '@assets/sprite.svg';
import { sdkService } from '@commercetool/sdk.service';
import { useAuth } from '@contexts/authProvider';
import { AppRoutes } from '@router/routes';
import classnames from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './UserMenu.module.scss';

enum ToolTips {
  HOME = 'Go to home page',
  PROFILE = 'Go to profile page',
  PROMO = 'Introduce the promotional code',
  CART = 'Open the cart',
}

export const UserMenu: FC = () => {
  const iconSizeNumber = 26;
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const isProfile = location.pathname === AppRoutes.PROFILE_ROUTE;

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

      <button type="button" className={styles.userMenuIcon} aria-label={ToolTips.PROMO} data-tooltip={ToolTips.PROMO}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#present`} />
        </svg>
      </button>

      <Link
        to={AppRoutes.CART_ROUTE}
        className={styles.userMenuIcon}
        aria-label={ToolTips.CART}
        data-tooltip={ToolTips.CART}
      >
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#cart`} />
        </svg>
      </Link>
    </div>
  );
};
