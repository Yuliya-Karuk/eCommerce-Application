import arrow from '@assets/arrow.svg';
import { AppRoutes } from '@router/routes';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  activeCategory: string;
}

export const Breadcrumbs = ({ activeCategory }: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to={AppRoutes.HOME_ROUTE}>Home</Link>
      <img src={arrow} className={styles.breadcrumbsImg} alt="arrow img" />
      <p>{activeCategory}</p>
    </div>
  );
};
