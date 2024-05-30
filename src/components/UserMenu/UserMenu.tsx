import sprite from '@assets/sprite.svg';
import { sdkService } from '@commercetool/sdk.service';
import { useAuth } from '@contexts//authProvider';
import { AppRoutes } from '@router/routes';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserMenu.module.scss';

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
        className={styles.userMenuLogin}
        onClick={handleLogout}
        style={{ visibility: isLoggedIn ? 'visible' : 'hidden', opacity: isLoggedIn ? 1 : 0 }}
      >
        <div className={styles.userMenuIcon}>
          <svg width={iconSizeNumber} height={iconSizeNumber}>
            <use xlinkHref={`${sprite}#login`} />
          </svg>
        </div>
        <span className={styles.userMenuText}>Logout</span>
      </button>
      <Link to={AppRoutes.PROFILE_ROUTE} className={styles.userMenuPromo}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#present`} />
        </svg>
      </Link>
      <div className={styles.userMenuCart}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#cart`} />
        </svg>
      </div>
    </div>
  );
};
