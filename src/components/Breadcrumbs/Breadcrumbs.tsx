import arrow from '@assets/arrow.svg';
import { Filters } from '@models/index';
import { AppRoutes } from '@router/routes';
import { generateBreadcrumbsSlugs } from '@utils/utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  activeCategorySlug: string[];
  defaultFilter?: Filters;
  setFilters?: (data: Filters) => void;
}

export const Breadcrumbs = ({ activeCategorySlug, setFilters, defaultFilter }: BreadcrumbsProps) => {
  const navigate = useNavigate();
  const preparedSlugs = generateBreadcrumbsSlugs(activeCategorySlug);

  const handleNavigation = (path: string) => {
    if (defaultFilter && setFilters) {
      setFilters(defaultFilter);
    }
    navigate(path);
  };

  return (
    <div className={styles.breadcrumbs}>
      <button type="button" onClick={() => handleNavigation(AppRoutes.HOME_ROUTE)}>
        Home
      </button>
      <img src={arrow} className={styles.breadcrumbsImg} alt="arrow img" />
      <button type="button" onClick={() => handleNavigation(AppRoutes.CATALOG_ROUTE)}>
        Catalog
      </button>
      {Object.entries(preparedSlugs).map(([name, slug]) => (
        <React.Fragment key={slug}>
          <img src={arrow} className={styles.breadcrumbsImg} alt="arrow img" />
          <button
            className={styles.breadcrumbsLink}
            type="button"
            onClick={() => handleNavigation(`${AppRoutes.CATALOG_ROUTE}/${slug}`)}
          >
            {name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};
