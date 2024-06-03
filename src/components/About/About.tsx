import { Container } from '@components/Container/Container';
import { LinkButton } from '@components/LinkButton/LinkButton';
import { AppRoutes } from '@router/routes';
import { FC } from 'react';
import styles from './About.module.scss';

export const About: FC = () => {
  return (
    <div className={styles.about}>
      <Container classname={styles.banner}>
        <div className={styles.aboutBody}>
          <div className={styles.aboutTitle}>Sprout Is…</div>
          <div className={styles.aboutText}>
            A bunch of houseplant lovers just like you. We are here for you every step of your houseplant journey, from
            our store to your home. We aim to inspire and create a retreat from the urban setting, rooted in the belief
            that plant care is self-care. Our staff is here to provide lived-experience and hands-on plant advice from
            repotting to design, and beyond. We pride ourselves on our selection of beautiful, healthy, and unique
            plants; from small, rare collector plants to large, statement specimens, and everything in between.
          </div>
          <LinkButton to={AppRoutes.ABOUT_ROUTE}>About</LinkButton>
        </div>
      </Container>
    </div>
  );
};
