/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CategoryList, CustomCategory } from '@models/index';
import { prepareCategoryTree } from '@utils/utils';
import classnames from 'classnames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CategoryFilter.module.scss';

interface FiltersProps {
  categories: CategoryList;
  activeCategory: CustomCategory;
  setActiveCategory: (category: CustomCategory) => void;
}

export const CategoryFilter = ({ categories, activeCategory, setActiveCategory }: FiltersProps) => {
  const preparedCategories = prepareCategoryTree(categories);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, categoryName: string) => {
    event.stopPropagation();
    setActiveCategory(categories[categoryName]);
    navigate(`/catalog/${categories[categoryName].slug.join('/')}`);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)}>
        <h3 className={styles.filterTitle}>Category</h3>
        <span className={classnames(styles.filterSpan, { [styles.open]: isOpen })} />
      </div>
      <ul className={classnames(styles.categoryFilters, { [styles.open]: isOpen })}>
        {Object.entries(preparedCategories).map(([id, category]) => (
          <React.Fragment key={id}>
            <li
              className={classnames(styles.categoryFilter, {
                [styles.active]: activeCategory.name === category.name,
              })}
              onClick={e => handleCategoryClick(e, id)}
            >
              {category.name}
            </li>
            {category.children &&
              Object.entries(category.children).map(([id2, category2]) => (
                <li
                  className={classnames(styles.categoryFilter, {
                    [styles.active]: activeCategory.name === category2.name,
                    [styles.childCategory]: true, // Adding a class for child categories
                  })}
                  key={category2.id}
                  onClick={e => handleCategoryClick(e, id2)}
                >
                  {category2.name}
                </li>
              ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
