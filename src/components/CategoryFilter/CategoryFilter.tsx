/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CategoryList, CustomCategory } from '@models/index';
import classnames from 'classnames';
import { useState } from 'react';
import styles from './CategoryFilter.module.scss';

interface FiltersProps {
  categories: CategoryList;
  activeCategory: string;
  setActiveCategory: (category: CustomCategory) => void;
}

export const CategoryFilter = ({ categories, activeCategory, setActiveCategory }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categories[categoryName]);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)}>
        <h3 className={styles.filterTitle}>Category</h3>
        <span className={classnames(styles.filterSpan, { [styles.open]: isOpen })} />
      </div>
      <ul className={classnames(styles.categoryFilters, { [styles.open]: isOpen })}>
        {Object.entries(categories).map(([key, category]) => (
          <li
            className={classnames(styles.categoryFilter, {
              [styles.active]: activeCategory === category.name,
            })}
            key={category.id}
            onClick={() => handleCategoryClick(key)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
