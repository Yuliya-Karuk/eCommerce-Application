import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../router/routes';
import { Container } from '../Container/Container';
import styles from './_Banner.module.scss';

export const Banner: FC = () => {
  return (
    <div className={styles.banner}>
      <Container classname={styles.banner}>
        <div className={styles.banner__body}>
          <h1 className={styles.banner__title}>Is There Such a Thing as Too Many Plants?</h1>
          <div className={styles.banner__text}>Discover the latest addition to your growing plant collection</div>
          <Link to={Routes.PRODUCT_PLANTS} className={styles.banner__link}>
            Shop Plants
          </Link>
        </div>
      </Container>
    </div>
  );
};
