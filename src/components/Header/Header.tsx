/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import sprite from '../../assets/sprite.svg';
import { Container } from '../Container/Container';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import { UserMenu } from '../UserMenu/UserMenu';
import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container classname={styles.header}>
        <div className={styles.headerBody}>
          <Navigation id="menu" />
          <Logo spritePaths={sprite} title="Sprout" width="88" height="82" />
          <UserMenu />
        </div>
      </Container>
    </header>
  );
};
