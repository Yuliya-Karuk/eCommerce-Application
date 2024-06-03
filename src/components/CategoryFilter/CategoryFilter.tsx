import { CategoryList, CustomCategory, Filters } from '@models/index';
import { defaultFilter } from '@utils/constants';
import { prepareCategoryTree } from '@utils/utils';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CategoryFilter.module.scss';

interface FiltersProps {
  categories: CategoryList;
  activeCategory: CustomCategory;
  setActiveCategory: (category: CustomCategory) => void;
  setFilters: (data: Filters) => void;
}

export const CategoryFilter = ({ categories, activeCategory, setActiveCategory, setFilters }: FiltersProps) => {
  const preparedCategories = prepareCategoryTree(categories);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleCategoryClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, categoryName: string) => {
    event.stopPropagation();
    setFilters(defaultFilter);
    setActiveCategory(categories[categoryName]);
    navigate(`/catalog/${categories[categoryName].slug.join('/')}`);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        <h3 className={styles.filterTitle}>Category</h3>
        <span className={classnames(styles.filterSpan, { [styles.open]: isOpen })} />
      </div>
      <ul className={classnames(styles.categoryFilters, { [styles.open]: isOpen })} role="listbox" id="listbox">
        {Object.entries(preparedCategories).map(([id, category]) => (
          <React.Fragment key={id}>
            <li
              role="option"
              aria-selected={activeCategory.name === category.name}
              className={classnames(styles.categoryFilter, {
                [styles.active]: activeCategory.name === category.name,
              })}
              onClick={e => handleCategoryClick(e, id)}
            >
              {category.name}
            </li>
            {category.children &&
              Object.entries(category.children).map(([subId, subCategory]) => (
                <li
                  role="option"
                  aria-selected={activeCategory.name === subCategory.name}
                  className={classnames(styles.categoryFilter, styles.childCategory, {
                    [styles.active]: activeCategory.name === subCategory.name,
                  })}
                  key={subCategory.id}
                  onClick={e => handleCategoryClick(e, subId)}
                >
                  {subCategory.name}
                </li>
              ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
