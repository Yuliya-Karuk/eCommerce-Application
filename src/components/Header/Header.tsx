import sprite from '@assets/sprite.svg';
import { Container } from '@components/Container/Container';
import { Logo } from '@components/Logo/Logo';
import { Navigation } from '@components/Navigation/Navigation';
import { UserMenu } from '@components/UserMenu/UserMenu';
import { FC } from 'react';
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
