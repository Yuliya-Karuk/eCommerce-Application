/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-lines-per-function */
import catalogAll from '@assets/catalog-all.webp';
import catalogCollections from '@assets/catalog-collections.webp';
import catalogPlants from '@assets/catalog-plants.webp';
import catalogPots from '@assets/catalog-pots.webp';
import { sdkService } from '@commercetool/sdk.service';
import { ProductProjection, ProductType } from '@commercetools/platform-sdk';
import { Breadcrumbs } from '@components/Breadcrumbs/Breadcrumbs';
import { CategoryFilter } from '@components/CategoryFilter/CategoryFilter';
import { CheckboxFilter } from '@components/ChekboxFilter/CheckboxFilter';
import { ColorFilter } from '@components/ColorFilter/ColorFilter';
import { PriceFilter } from '@components/PriceFilter/PriceFilter';
import { ProductCard } from '@components/ProductCard/ProductCard';
import { Search } from '@components/Search/Search';
import { Sorting } from '@components/Sorting/Sorting';
import { Container, Header } from '@components/index';
import { CategoryList, CustomCategory, Filters } from '@models/index';
import { AppRoutes } from '@router/routes';
import {
  findCategoryBySlug,
  prepareBrands,
  prepareColors,
  prepareFilters,
  prepareQuery,
  prepareSizes,
  simplifyCategories,
} from '@utils/utils';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './catalog.module.scss';

const defaultPriceBorder = ['5.99', '100.00'];

const CatalogImages: { [key: string]: string } = {
  'All Products': catalogAll,
  Plants: catalogPlants,
  Pots: catalogPots,
  Collections: catalogCollections,
};

const startCategory = {
  name: 'All Products',
  id: '',
  slug: [''],
  children: {},
  parent: '',
};

const defaultFilter: Filters = {
  brands: [],
  color: [],
  sizes: [],
  price: [],
};

export function Catalog() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterShown, setIsFilterShown] = useState(false);

  const [categories, setCategories] = useState<CategoryList>({});
  const [activeCategory, setActiveCategory] = useState<CustomCategory>(startCategory);
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [filters, setFilters] = useState<Filters>(prepareQuery(queryParams, defaultFilter));

  const getTypes = async () => {
    const data: ProductType[] = await sdkService.getProductsTypes();
    setBrands(prepareBrands(data));
    setSizes(prepareSizes(data));
    setColors(prepareColors(data));
  };

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

    navigate({ search: queryParams.toString() });
  };

  const handleClearFilters = () => {
    setFilters(defaultFilter);
    navigate(`${AppRoutes.CATALOG_ROUTE}/${activeCategory.slug}`);
  };

  useEffect(() => {
    if (isFilterShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFilterShown]);

  useEffect(() => {
    getTypes();
    getCategories();
    // getProducts();
  }, []);

  useEffect(() => {
    if (Object.keys(categories).length !== 0) {
      const active = findCategoryBySlug(categories, location.pathname);
      setActiveCategory(active);
    }
  }, [categories, location]);

  useEffect(() => {
    getProducts();
    handleFilterUpdate();
  }, [activeCategory, filters]);

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
          <div className={classnames(styles.filters, { [styles.open]: isFilterShown })}>
            <h2 className={styles.filtersHeading}>Browse by</h2>
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <h2 className={styles.filtersHeading}>Filter by</h2>
            <PriceFilter filters={filters} setFilters={setFilters} values={defaultPriceBorder} name="price" />
            <CheckboxFilter filters={filters} setFilters={setFilters} values={brands} name="brands" />
            <ColorFilter filters={filters} setFilters={setFilters} values={colors} name="color" />
            <CheckboxFilter filters={filters} setFilters={setFilters} values={sizes} name="sizes" />
            <button type="button" className={styles.filtersButton} onClick={handleClearFilters}>
              Clear all
            </button>
          </div>
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
