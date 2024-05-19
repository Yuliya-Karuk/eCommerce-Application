/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import sprite from '../../assets/sprite.svg';
import { Routes } from '../../router/routes';
import { Container } from '../Container/Container';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import { UserMenu } from '../UserMenu/UserMenu';
import styles from './_Header.module.scss';

export const Header: FC = () => {
  const paths: string[] = [Routes.PRODUCT_PLANTS, Routes.PRODUCT_POTS, Routes.PRODUCT_SUBSCRIPTIONS];

  return (
    <header className={styles.header}>
      <Container classname={styles.header}>
        <div className={styles.header__body}>
          <Navigation paths={paths} id="menu" />
          <Logo spritePaths={sprite} title="Sprout" width="88" height="82" />
          <UserMenu />
        </div>
      </Container>
    </header>
  );
};
