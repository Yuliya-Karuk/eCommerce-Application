/* eslint-disable jsx-a11y/no-static-element-interactions */
import catalogAll from '@assets/catalog-all.webp';
import catalogCollections from '@assets/catalog-collections.webp';
import catalogPlants from '@assets/catalog-plants.webp';
import catalogPots from '@assets/catalog-pots.webp';
import { sdkService } from '@commercetool/sdk.service';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Breadcrumbs } from '@components/Breadcrumbs/Breadcrumbs';
import { FiltersComponent } from '@components/Filters/Filters';
import { Container, Header } from '@components/index';
import { ProductCard } from '@components/ProductCard/ProductCard';
import { Search } from '@components/Search/Search';
import { Sorting } from '@components/Sorting/Sorting';
import { CategoryList, CustomCategory, Filters } from '@models/index';
import { defaultFilter, startCategory } from '@utils/constants';
import { prepareFilters, prepareQuery, simplifyCategories } from '@utils/utils';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './catalog.module.scss';

// const defaultPriceBorder = ['5.99', '100.00'];

const CatalogImages: { [key: string]: string } = {
  'All Products': catalogAll,
  Plants: catalogPlants,
  Pots: catalogPots,
  Collections: catalogCollections,
};

export function Catalog() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterShown, setIsFilterShown] = useState(false);

  const [categories, setCategories] = useState<CategoryList>({});
  const [activeCategory, setActiveCategory] = useState<CustomCategory>(startCategory);
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [filters, setFilters] = useState<Filters>(prepareQuery(queryParams, defaultFilter));

  const getCategories = async () => {
    const data = await sdkService.getCategories();
    const preparedData = simplifyCategories(data);
    preparedData.default = startCategory;
    setCategories(preparedData);
  };

  const getProducts = async () => {
    const preparedFilters = prepareFilters(filters, activeCategory.id);

    const data = await sdkService.filterProductsByAttribute(preparedFilters);

    setProducts(data);
    setIsLoading(false);
  };

  const handleFilterUpdate = () => {
    Object.keys(filters).forEach(key => {
      if (filters[key].length > 0) {
        queryParams.set(key, filters[key].join(','));
      } else {
        queryParams.delete(key);
      }
    });

    navigate({ search: queryParams.toString() }, { replace: true });
  };

  useEffect(() => {
    getProducts();
    handleFilterUpdate();
  }, [activeCategory, filters]);

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.catalog}>
      {isFilterShown && <div className={styles.overlay} onClick={() => setIsFilterShown(!isFilterShown)} />}
      <Header />
      <Container classname={styles.catalog}>
        <Breadcrumbs activeCategorySlug={activeCategory.slug} setFilters={setFilters} defaultFilter={defaultFilter} />
        <div className={styles.catalogContainer}>
          <FiltersComponent
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isFilterShown={isFilterShown}
            filters={filters}
            setFilters={setFilters}
          />
          <div className={styles.catalogContent}>
            <div className={styles.catalogImgContainer}>
              <img
                className={styles.catalogImg}
                src={CatalogImages[activeCategory.name] || CatalogImages.Plants}
                alt="catalog img"
              />
            </div>
            <h2>{activeCategory.name}</h2>
            <button className={styles.buttonFilters} type="button" onClick={() => setIsFilterShown(!isFilterShown)}>
              Filters
            </button>
            <Search />
            <Sorting />
            <div className={styles.catalogProducts}>
              <ul className={styles.catalogList}>
                {products.map(product => (
                  <ProductCard categories={categories} key={product.id} product={product} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
