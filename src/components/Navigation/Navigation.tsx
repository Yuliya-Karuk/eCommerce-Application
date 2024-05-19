import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List } from '../List/List';
import styles from './_Navigation.module.scss';

interface NavigationProps {
  paths: string[];
  id?: string;
}

export const Navigation: FC<NavigationProps> = ({ paths, id, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function burgerMediaChange(e: MediaQueryListEventInit) {
      if (e.matches && isMenuOpen) {
        setIsMenuOpen(false);
      }
    }

    const burgerMedia = window.matchMedia('(min-width: 769px)');
    burgerMedia.addEventListener('change', burgerMediaChange);
    burgerMediaChange(burgerMedia);
    return () => {
      burgerMedia.removeEventListener('change', burgerMediaChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <List
          className={styles.menuList}
          items={paths}
          renderItem={(path: string) => {
            return (
              <li key={path} className={styles.menuItem} {...props}>
                <Link to={path}>{path.slice(1)[0].toUpperCase() + path.slice(2)}</Link>
              </li>
            );
          }}
        />
      </nav>
    </>
  );
};
