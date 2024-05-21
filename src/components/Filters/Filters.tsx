/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { sdkService } from '@commercetool/sdk.service';
import { ProductType } from '@commercetools/platform-sdk';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Filters.module.scss';

export function Filters() {
  const defaultCategory = 'All Products';
  const [types, setTypes] = useState<ProductType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);

  const getTypes = async () => {
    const data: ProductType[] = await sdkService.getProductsTypes();
    setTypes(data);
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  useEffect(() => {
    getTypes();
  }, []);

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
}
