import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../router/routes';
import { Container } from '../Container/Container';
import styles from './Banner.module.scss';

export const Banner: FC = () => {
  return (
    <div className={styles.banner}>
      <Container classname={styles.banner}>
        <div className={styles.bannerBody}>
          <h1 className={styles.bannerTitle}>Is There Such a Thing as Too Many Plants?</h1>
          <div className={styles.bannerText}>Discover the latest addition to your growing plant collection</div>
          <Link to={Routes.CATALOG_ROUTE} className={styles.bannerLink}>
            Shop Plants
          </Link>
        </div>
      </Container>
    </div>
  );
};
