/* eslint-disable jsx-a11y/control-has-associated-label */
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
import { Header } from '@components/index';
import { PriceFilter } from '@components/PriceFilter/PriceFilter';
import { ProductCard } from '@components/ProductCard/ProductCard';
import { Search } from '@components/Search/Search';
import { Sorting } from '@components/Sorting/Sorting';
import { CategoryList, CustomCategory } from '@models/index';
import { prepareBrands, prepareColors, prepareSizes, simplifyCategories } from '@utils/utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './catalog.module.scss';

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

// сделать проверку на активную категорию и слаг
export function Catalog() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryList>({});
  const [activeCategory, setActiveCategory] = useState<CustomCategory>(startCategory);
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState<string>('');
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const location = useLocation();

  useEffect(() => {
    console.log('URL changed to:', location.pathname);
  }, [location]);

  const getTypes = async () => {
    const data: ProductType[] = await sdkService.getProductsTypes();
    // console.log(data);
    setBrands(prepareBrands(data));
    setSizes(prepareSizes(data));
    setColors(prepareColors(data));
    // setCategories(prepareCategories(data));
    // const bal = await sdkService.filterProductsByAttribute();
  };

  const getCategories = async () => {
    const data = await sdkService.getCategories();
    const preparedData = simplifyCategories(data);
    preparedData.default = startCategory;
    setCategories(preparedData);
  };

  const getProducts = async () => {
    let data;
    if (!activeCategory.id) {
      data = await sdkService.getProducts();
    } else {
      console.log(activeCategory.id);
      data = await sdkService.getProductsByCategory(activeCategory.id);
    }
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTypes();
    getCategories();
  }, []);

  // useEffect(() => {
  //   if (Object.keys(categories).length > 0) {
  //     setActiveCategory(categories.all);
  //     setIsLoading(false);
  //   }
  // }, [categories]);

  useEffect(() => {
    getProducts();
  }, [activeCategory]);

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.catalog}>
      <Header />
      <Breadcrumbs activeCategory={activeCategory} />
      <div className={styles.catalogContainer}>
        <div className={styles.filters}>
          <h2 className={styles.filtersHeading}>Filter by</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <PriceFilter />
          <CheckboxFilter values={brands} name="Brands" />
          <ColorFilter colors={colors} activeColor={activeColor} setActiveColor={setActiveColor} />
          <CheckboxFilter values={sizes} name="Sizes" />
          <button type="button" className={styles.filtersButton}>
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
          <Search />
          <Sorting />
          <div className={styles.catalogProducts}>
            <ul className={styles.catalogList}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
