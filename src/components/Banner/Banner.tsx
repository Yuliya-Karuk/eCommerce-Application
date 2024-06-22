import { Container } from '@components/Container/Container';
import { LinkButton } from '@components/LinkButton/LinkButton';
import { AppRoutes } from '@router/routes';
import { FC } from 'react';
import styles from './Banner.module.scss';

export const Banner: FC = () => {
  return (
    <div className={styles.banner}>
      <Container classname={styles.banner}>
        <div className={styles.bannerBody}>
          <h1 className={styles.bannerTitle}>Is There Such a Thing as Too Many Plants?</h1>
          <div className={styles.bannerText}>Discover the latest addition to your growing plant collection</div>
          <LinkButton to={`${AppRoutes.CATALOG_ROUTE}/plants`}>Shop Plants</LinkButton>
        </div>
      </Container>
    </div>
  );
};
