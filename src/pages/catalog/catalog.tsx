import catalogAll from '@assets/catalog-all.webp';
import catalogCollections from '@assets/catalog-collections.webp';
import catalogPlants from '@assets/catalog-plants.webp';
import catalogPots from '@assets/catalog-pots.webp';
import { sdkService } from '@commercetool/sdk.service';
import { ProductProjection, ProductType } from '@commercetools/platform-sdk';
import { BrandFilter } from '@components/BrandFilter/BrandFilter';
import { Breadcrumbs } from '@components/Breadcrumbs/Breadcrumbs';
import { CategoryFilter } from '@components/CategoryFilter/CategoryFilter';
import { Header } from '@components/index';
import { ProductCard } from '@components/ProductCard/ProductCard';
import { CategoryList, CustomCategory } from '@models/index';
import { prepareBrands, prepareCategories } from '@utils/utils';
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
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const getTypes = async () => {
    const data: ProductType[] = await sdkService.getProductsTypes();
    setBrands(prepareBrands(data));
    setCategories(prepareCategories(data));
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
          <h2 className={styles.filtersTitle}>Browse by</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory.name}
            setActiveCategory={setActiveCategory}
          />
          <h2 className={styles.filtersTitle}>Filter by</h2>
          <BrandFilter brands={brands} />
        </div>
        <div className={styles.catalogContent}>
          <div className={styles.catalogImgContainer}>
            <img className={styles.catalogImg} src={CatalogImages[activeCategory.name] as string} alt="catalog img" />
          </div>
          <h2>{activeCategory.name}</h2>
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
