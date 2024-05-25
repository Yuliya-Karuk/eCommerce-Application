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
import { prepareBrands, prepareCategories, prepareColors, prepareSizes } from '@utils/utils';
import { useEffect, useState } from 'react';
import styles from './catalog.module.scss';

const CatalogImages: { [key: string]: string } = {
  'All Products': catalogAll,
  Plants: catalogPlants,
  Pots: catalogPots,
  Collections: catalogCollections,
};

export function Catalog() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryList>({});
  const [activeCategory, setActiveCategory] = useState<CustomCategory>({
    name: '',
    id: '',
  });
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState<string>('');
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const getTypes = async () => {
    const data: ProductType[] = await sdkService.getProductsTypes();
    console.log(data);
    setBrands(prepareBrands(data));
    setSizes(prepareSizes(data));
    setColors(prepareColors(data));
    setCategories(prepareCategories(data));
    const bal = await sdkService.filterProductsByAttribute();
    console.log(bal);
  };

  const getProducts = async () => {
    const data = await sdkService.getProductsByType(activeCategory.id);
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTypes();
  }, []);

  useEffect(() => {
    if (Object.keys(categories).length > 0) {
      setActiveCategory(categories.all);
      setIsLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    if (activeCategory.name !== '' && activeCategory.id !== '') {
      getProducts();
    }
  }, [activeCategory]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.catalog}>
      <Header />
      <Breadcrumbs activeCategory={activeCategory.name} />
      <div className={styles.catalogContainer}>
        <div className={styles.filters}>
          <h2 className={styles.filtersHeading}>Filter by</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory.name}
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
            <img className={styles.catalogImg} src={CatalogImages[activeCategory.name] as string} alt="catalog img" />
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
