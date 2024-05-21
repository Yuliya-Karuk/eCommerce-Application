/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ProductType } from '@commercetools/platform-sdk';
import classnames from 'classnames';
import styles from './Filters.module.scss';

interface FiltersProps {
  types: ProductType[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const Filters = ({ types, activeCategory, setActiveCategory }: FiltersProps) => {
  const defaultCategory = 'All Products';

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.filtersTitle}>Browse by</h2>
      <ul className={styles.categoryFilters}>
        <li
          className={classnames(styles.categoryFilter, {
            [styles.active]: activeCategory === defaultCategory,
          })}
          onClick={() => handleCategoryClick(defaultCategory)}
        >
          {defaultCategory}
        </li>
        {types.map((category: ProductType) => (
          <li
            className={classnames(styles.categoryFilter, {
              [styles.active]: activeCategory === category.name,
            })}
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
