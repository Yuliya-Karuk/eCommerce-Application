/* eslint-disable max-lines-per-function */
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
import { Pagination } from '@components/Pagination/Pagination';
import { ProductCard } from '@components/ProductCard/ProductCard';
import { Search } from '@components/Search/Search';
import { Sorting } from '@components/Sorting/Sorting';
import { useToast } from '@contexts/toastProvider';
import { CategoryList, CustomCategory, Filters } from '@models/index';
import { defaultFilter, defaultSearch, defaultSort, NothingFoundByFiltering, startCategory } from '@utils/constants';
import { findCategoryBySlug, isNotNullable, prepareQuery, prepareQueryParams, simplifyCategories } from '@utils/utils';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './catalog.module.scss';

const productPerPage = 5;

const CatalogImages: { [key: string]: string } = {
  'All Products': catalogAll,
  Plants: catalogPlants,
  Pots: catalogPots,
  Collections: catalogCollections,
};

export function Catalog() {
  const [isFilterShown, setIsFilterShown] = useState(false);
  const { customToast, errorNotify } = useToast();

  const [categories, setCategories] = useState<CategoryList>({});
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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const checkRoute = (urlSlugs: (string | undefined)[], data: CategoryList) => {
    const urlSlug = urlSlugs.filter(el => el !== undefined).join('/');
    const isExists = Object.values(data).filter(el => el.slug.join('/') === urlSlug);
    if (isExists.length === 0) {
      navigate('/404');
    }
    setLoading(false);
  };

  const getCategories = async () => {
    try {
      const data = await sdkService.getCategories();
      const preparedData = simplifyCategories(data);
      preparedData.default = startCategory;

      checkRoute([category, subcategory, slug], preparedData);

      setCategories(preparedData);
    } catch (e) {
      errorNotify((e as Error).message);
    }
  };

  const getProducts = async () => {
    const filterParams = prepareQueryParams(filters, activeCategory.id, searchSettings, sortSettings);

    try {
      const offset = (currentPage - 1) * productPerPage;
      const data = await sdkService.filterProductsByAttribute(filterParams, productPerPage, offset);

      setProducts(data.results);
      setTotalPages(Math.ceil(isNotNullable(data.total) / productPerPage));

      if (data.results.length === 0) {
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
  }, [activeCategory, filters, searchSettings, sortSettings, currentPage]);

  useEffect(() => {
    if (Object.keys(categories).length !== 0) {
      const active = findCategoryBySlug(categories, location.pathname);
      setActiveCategory(active);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, location]);

  useEffect(() => {
    getCategories();
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
            categories={categories}
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
                {Object.values(categories).length > 0 &&
                  products.map(product => <ProductCard categories={categories} key={product.id} product={product} />)}
              </ul>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </Container>
      <Footer />
      {customToast({ position: 'top-center', autoClose: 2000 })}
    </div>
  );
}
