import { FC } from 'react';
import sprite from '../../assets/sprite.svg';
import styles from './UserMenu.module.scss';

export const UserMenu: FC = () => {
  const iconSizeNumber = 26;

  return (
    <div className={styles.userMenu}>
      <button type="button" className={styles.userMenuLogin}>
        <div className={styles.userMenuIcon}>
          <svg width={iconSizeNumber} height={iconSizeNumber}>
            <use xlinkHref={`${sprite}#login`} />
          </svg>
        </div>
        <span className={styles.userMenuText}>Logout</span>
      </button>
      {/* <Link to={Routes.LOGIN_ROUTE} className={styles.userMenuLogin}>
        <div className={styles.userMenuIcon}>
          <svg width={iconSizeNumber} height={iconSizeNumber}>
            <use xlinkHref={`${sprite}#login`} />
          </svg>
        </div>
        <span className={styles.userMenuText}>Log In</span>
      </Link> */}
      <div className={styles.userMenuPromo}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#present`} />
        </svg>
      </div>
      <div className={styles.userMenuCart}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#cart`} />
        </svg>
      </div>
    </div>
  );
};
