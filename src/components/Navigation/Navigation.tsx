import { AppRoutes } from '@router/routes';
import { FC, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'react-router-dom';
import { useClickOutside } from 'src/hooks/useClickOutside';
import styles from './Navigation.module.scss';

interface NavigationProps {
  id?: string;
}

export const Navigation: FC<NavigationProps> = ({ id, ...props }) => {
  const paths: string[] = [
    AppRoutes.ABOUT_ROUTE,
    AppRoutes.CATALOG_ROUTE,
    AppRoutes.LOGIN_ROUTE,
    AppRoutes.REGISTRATION_ROUTE,
  ];
  const location = useLocation();
  const menuPaths = paths.map(path => (path === location.pathname ? AppRoutes.HOME_ROUTE : path));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });
  const menuRef = useRef(null);
  const onClickOutside = () => {
    if (!isDesktop && isMenuOpen) {
      setIsMenuOpen(false);
      document.body.classList.toggle('lock', !isMenuOpen);
    }
  };

  useClickOutside(menuRef, onClickOutside);

  useEffect(() => {
    if (isDesktop && isMenuOpen) {
      setIsMenuOpen(false);
      document.body.classList.toggle('lock', !isMenuOpen);
    }
  }, [isDesktop, isMenuOpen]);

  return (
    <>
      <div
        className={isMenuOpen ? `${styles.burger} ${styles.active}` : styles.burger}
        role="button"
        aria-expanded={isMenuOpen}
        aria-controls={id || 'menu'}
        aria-label={`${isMenuOpen ? 'Close' : 'Open'} menu`}
        tabIndex={0}
        onClick={e => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
          document.body.classList.toggle('lock', !isMenuOpen);
        }}
      >
        <span />
      </div>
      <nav
        className={isMenuOpen ? `${styles.menu} ${styles.active}` : styles.menu}
        id={id || 'menu'}
        ref={menuRef}
        {...props}
      >
        <ul className={styles.menuList}>
          {menuPaths.map(path => (
            <li key={path} className={styles.menuItem}>
              <Link
                to={path}
                onClick={() => {
                  document.body.classList.remove('lock');
                }}
              >
                {path === AppRoutes.HOME_ROUTE ? 'Home' : path.slice(1)[0].toUpperCase() + path.slice(2)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
