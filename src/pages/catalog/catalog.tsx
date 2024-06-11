import catalogAll from '@assets/catalog-all.webp';
import catalogCollections from '@assets/catalog-collections.webp';
import catalogPlants from '@assets/catalog-plants.webp';
import catalogPots from '@assets/catalog-pots.webp';
import { sdkService } from '@commercetool/sdk.service';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Breadcrumbs } from '@components/Breadcrumbs/Breadcrumbs';
import { Container } from '@components/Container/Container';
import { FiltersComponent } from '@components/Filters/Filters';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import { Loader } from '@components/Loader/Loader';
import { ProductCard } from '@components/ProductCard/ProductCard';
import { Search } from '@components/Search/Search';
import { Sorting } from '@components/Sorting/Sorting';
import { useCategories } from '@contexts/categoryProvider';
import { useToast } from '@contexts/toastProvider';
import { CustomCategory, Filters } from '@models/index';
import { defaultFilter, defaultSearch, defaultSort, NothingFoundByFiltering, startCategory } from '@utils/constants';
import { findCategoryBySlug, prepareQuery, prepareQueryParams } from '@utils/utils';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './catalog.module.scss';

const CatalogImages: { [key: string]: string } = {
  'All Products': catalogAll,
  Plants: catalogPlants,
  Pots: catalogPots,
  Collections: catalogCollections,
};

export function Catalog() {
  const [isFilterShown, setIsFilterShown] = useState(false);
  const { customToast, errorNotify } = useToast();

  const { catalogCategories, checkCatalogRoute } = useCategories();
  const [activeCategory, setActiveCategory] = useState<CustomCategory>(startCategory);
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category, subcategory, slug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<Filters>(prepareQuery(searchParams, defaultFilter));
  const [searchSettings, setSearchSettings] = useState(defaultSearch);
  const [sortSettings, setSortSettings] = useState(defaultSort);

  const getProducts = async () => {
    const filterParams = prepareQueryParams(filters, activeCategory.id, searchSettings, sortSettings);

    try {
      const data = await sdkService.filterProductsByAttribute(filterParams);
      setProducts(data);
      if (data.length === 0) {
        errorNotify(NothingFoundByFiltering);
      }
    } catch (e) {
      errorNotify((e as Error).message);
    }
  };

  const handleFilterUpdate = () => {
    const params = new URLSearchParams(searchParams);
    Object.keys(filters).forEach(key => {
      if (filters[key].length > 0) {
        params.set(key, filters[key].join(','));
      } else {
        params.delete(key);
      }
    });

    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params);
    }
  };

  useEffect(() => {
    getProducts();
    handleFilterUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, filters, searchSettings, sortSettings]);

  useEffect(() => {
    if (Object.keys(catalogCategories).length !== 0) {
      if (!checkCatalogRoute([category, subcategory, slug])) {
        navigate('/404');
      }
      setLoading(false);

      const active = findCategoryBySlug(catalogCategories, location.pathname);
      setActiveCategory(active);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogCategories, location]);

  useEffect(() => {
    handleFilterUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newFilters = prepareQuery(searchParams, defaultFilter);
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(prepareQuery(searchParams, defaultFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.catalog}>
      {isFilterShown && (
        <div
          className={styles.overlay}
          onClick={() => setIsFilterShown(!isFilterShown)}
          role="button"
          tabIndex={0}
          aria-label="overlay"
        />
      )}
      <Header />
      <Container classname={styles.catalog}>
        <Breadcrumbs
          activeCategorySlug={activeCategory.slug}
          setFilters={setFilters}
          defaultFilter={defaultFilter}
          backColor="black"
        />
        <div className={styles.catalogContainer}>
          <FiltersComponent
            categories={catalogCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isFilterShown={isFilterShown}
            filters={filters}
            setFilters={setFilters}
            errorNotify={errorNotify}
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
            <Search searchSettings={searchSettings} setSearchSettings={setSearchSettings} />
            <Sorting sortSettings={sortSettings} setSortSettings={setSortSettings} />
            <div className={styles.catalogProducts}>
              <ul className={styles.catalogList}>
                {Object.values(catalogCategories).length > 0 &&
                  products.map(product => (
                    <ProductCard categories={catalogCategories} key={product.id} product={product} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </div>
  );
}
