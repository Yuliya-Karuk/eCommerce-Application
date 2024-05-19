import { FC } from 'react';
import { Link } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';
import { Routes } from '../../router/routes';
import styles from './_UserMenu.module.scss';

export const UserMenu: FC = () => {
  const iconSizeNumber = 26;

  return (
    <div className={styles.usermenu}>
      <Link to={Routes.LOGIN_ROUTE} className={styles.usermenuLogin}>
        <div className={styles.usermenuIcon}>
          <svg width={iconSizeNumber} height={iconSizeNumber}>
            <use xlinkHref={`${sprite}#login`} />
          </svg>
        </div>
        <span className={styles.usermenuText}>Log In</span>
      </Link>
      <div className={styles.usermenuPromo}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#present`} />
        </svg>
      </div>
      <div className={styles.usermenuCart}>
        <svg width={iconSizeNumber} height={iconSizeNumber}>
          <use xlinkHref={`${sprite}#cart`} />
        </svg>
      </div>
    </div>
  );
};
