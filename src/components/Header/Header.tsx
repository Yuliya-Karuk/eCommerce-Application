/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useState } from 'react';
import sprite from '../../assets/sprite.svg';
import { Routes } from '../../router/routes';
import { Container } from '../Container/Container';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import { UserServices } from '../UserServices/UserServices';
import styles from './_Header.module.scss';

export const Header: FC = () => {
  const paths: string[] = [Routes.PRODUCT_PLANTS, Routes.PRODUCT_POTS, Routes.PRODUCT_SUBSCRIPTIONS];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function burgerClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className={styles.header}>
      <Container classname={styles.header}>
        <div className={styles.header__body}>
          <div
            className={isMenuOpen ? 'active' : ''}
            data-burger=""
            role="button"
            aria-expanded={isMenuOpen}
            aria-label={`${isMenuOpen ? 'Close' : 'Open'} menu`}
            tabIndex={0}
            onClick={burgerClick}
          >
            <span />
          </div>
          <Navigation
            paths={paths}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            className="menu"
            id="menu"
            data-menu=""
          />
          <Logo spritePaths={sprite} spriteId="logo" classPrefix="header" title="Sprout" width="88" height="82" />
          <UserServices width="26" height="26" />
        </div>
      </Container>
    </div>
  );
};
