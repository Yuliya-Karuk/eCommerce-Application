import arrowBlack from '@assets/arrow-black.svg';
import arrowWhite from '@assets/arrow-white.svg';
import { Filters } from '@models/index';
import { AppRoutes } from '@router/routes';
import { generateBreadcrumbsSlugs } from '@utils/utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

const Colors: { [key: string]: string } = {
  white: arrowBlack,
  black: arrowWhite,
};

interface BreadcrumbsProps {
  activeCategorySlug: string[];
  defaultFilter?: Filters;
  setFilters?: (data: Filters) => void;
  backColor?: string;
}

export const Breadcrumbs = ({
  activeCategorySlug,
  setFilters,
  defaultFilter,
  backColor = 'white',
}: BreadcrumbsProps) => {
  const navigate = useNavigate();
  const preparedSlugs = generateBreadcrumbsSlugs(activeCategorySlug.filter(el => el !== ''));

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
      <img src={Colors[backColor]} className={styles.breadcrumbsImg} alt="arrow img" />
      <button
        disabled={Object.entries(preparedSlugs).length === 0}
        type="button"
        onClick={() => handleNavigation(AppRoutes.CATALOG_ROUTE)}
      >
        Catalog
      </button>
      {Object.entries(preparedSlugs).map(([name, slug]) => (
        <React.Fragment key={slug}>
          <img src={Colors[backColor]} className={styles.breadcrumbsImg} alt="arrow img" />
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
