import arrow from '@assets/arrow.svg';
import { CustomCategory } from '@models/index';
import { AppRoutes } from '@router/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  activeCategory: CustomCategory;
}

export const Breadcrumbs = ({ activeCategory }: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to={AppRoutes.HOME_ROUTE}>Home</Link>
      <img src={arrow} className={styles.breadcrumbsImg} alt="arrow img" />
      <Link to={AppRoutes.CATALOG_ROUTE}>Catalog</Link>
      {activeCategory.slug.map(slug => (
        <React.Fragment key={slug}>
          <img src={arrow} className={styles.breadcrumbsImg} alt="arrow img" />
          <Link className={styles.breadcrumbsLink} to={`${AppRoutes.CATALOG_ROUTE}/${slug}`}>
            {slug}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};
