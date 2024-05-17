import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List } from '../List/List';
import { ListItem } from '../ListItem/ListItem';
import './_Menu.scss';
import './_Navigation.scss';

interface NavigationProps {
  paths: string[];
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  id?: string;
}

export const Navigation: FC<NavigationProps> = ({ paths, className, id, isMenuOpen, setIsMenuOpen, ...props }) => {
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
    <nav className={isMenuOpen ? `${className} active` : className} id={id} {...props}>
      <List
        className={className}
        items={paths}
        renderItem={(path: string) => {
          return (
            <ListItem key={path} className={className} data-menu-item>
              <Link to={path}>{path.slice(1)[0].toUpperCase() + path.slice(2)}</Link>
            </ListItem>
          );
        }}
        data-menu-list=""
      />
    </nav>
  );
};
