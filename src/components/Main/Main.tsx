import { FC } from 'react';
import { Banner } from '../Banner/Banner';
import { Header } from '../Header/Header';
import { Hero } from '../Hero/Hero';
import styles from './_Main.module.scss';

export const Main: FC = () => {
  return (
    <div className={styles.main}>
      <Hero>
        <Header />
        <Banner />
      </Hero>
    </div>
  );
};
