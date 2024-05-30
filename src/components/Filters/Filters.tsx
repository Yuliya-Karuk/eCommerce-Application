import { sdkService } from '@commercetool/sdk.service';
import { ProductType } from '@commercetools/platform-sdk';
import { CategoryFilter } from '@components/CategoryFilter/CategoryFilter';
import { CheckboxFilter } from '@components/CheckboxFilter/CheckboxFilter';
import { ColorFilter } from '@components/ColorFilter/ColorFilter';
import { PriceFilter } from '@components/PriceFilter/PriceFilter';
import { CategoryList, CustomCategory, Filters } from '@models/index';
import { AppRoutes } from '@router/routes';
import { defaultFilter, defaultPriceBorder } from '@utils/constants';
import { prepareBrands, prepareColors, prepareSizes } from '@utils/utils';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Filters.module.scss';

interface FiltersProps {
  categories: CategoryList;
  activeCategory: CustomCategory;
  setActiveCategory: (category: CustomCategory) => void;
  isFilterShown: boolean;
  filters: Filters;
  setFilters: (data: Filters) => void;
  errorNotify: (data: string) => void;
}

export const FiltersComponent = ({
  categories,
  activeCategory,
  setActiveCategory,
  isFilterShown,
  filters,
  setFilters,
  errorNotify,
}: FiltersProps) => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const getTypes = async () => {
    try {
      const data: ProductType[] = await sdkService.getProductsTypes();
      setBrands(prepareBrands(data));
      setSizes(prepareSizes(data));
      setColors(prepareColors(data));
    } catch (e) {
      errorNotify((e as Error).message);
    }
  };

  const handleClearFilters = () => {
    setFilters(defaultFilter);
    navigate(`${AppRoutes.CATALOG_ROUTE}/${activeCategory.slug}`, { replace: true });
  };

  useEffect(() => {
    getTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFilterShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFilterShown]);

  return (
    <div className={classnames(styles.filters, { [styles.open]: isFilterShown })}>
      <h2 className={styles.filtersHeading}>Browse by</h2>
      <CategoryFilter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <h2 className={styles.filtersHeading}>Filter by</h2>
      <PriceFilter filters={filters} setFilters={setFilters} values={defaultPriceBorder} name="price" />
      <CheckboxFilter filters={filters} setFilters={setFilters} values={brands} name="brands" />
      <ColorFilter filters={filters} setFilters={setFilters} values={colors} name="color" />
      <CheckboxFilter filters={filters} setFilters={setFilters} values={sizes} name="sizes" />
      <button type="button" className={styles.filtersButton} onClick={handleClearFilters}>
        Clear all
      </button>
    </div>
  );
};
