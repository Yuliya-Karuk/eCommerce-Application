/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { CategoryList, CustomCategory } from '@models/index';
import classnames from 'classnames';
import styles from './CategoryFilter.module.scss';

interface FiltersProps {
  categories: CategoryList;
  activeCategory: string;
  setActiveCategory: (category: CustomCategory) => void;
}

export const CategoryFilter = ({ categories, activeCategory, setActiveCategory }: FiltersProps) => {
  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categories[categoryName]);
  };

  return (
    <ul className={styles.categoryFilters}>
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
  );
};
