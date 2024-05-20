import { AppRoutes } from '@router/routes';
import { FC, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

interface NavigationProps {
  id?: string;
}

export const Navigation: FC<NavigationProps> = ({ id, ...props }) => {
  const paths: string[] = [AppRoutes.CATALOG_ROUTE, AppRoutes.LOGIN_ROUTE, AppRoutes.REGISTRATION_ROUTE];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  useEffect(() => {
    if (isDesktop && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isDesktop, isMenuOpen]);

  return (
    <>
      <div
        className={isMenuOpen ? `${styles.burger} ${styles.active}` : styles.burger}
        role="button"
        aria-expanded={isMenuOpen}
        aria-label={`${isMenuOpen ? 'Close' : 'Open'} menu`}
        tabIndex={0}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span />
      </div>
      <nav className={isMenuOpen ? `${styles.menu} ${styles.active}` : styles.menu} id={id} {...props}>
        <ul className={styles.menuList}>
          {paths.map(path => (
            <li key={path} className={styles.menuItem}>
              <Link to={path}>{path.slice(1)[0].toUpperCase() + path.slice(2)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
