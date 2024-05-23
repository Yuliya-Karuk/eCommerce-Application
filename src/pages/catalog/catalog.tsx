import catalogAll from '@assets/catalog-all.webp';
import catalogCollections from '@assets/catalog-collections.webp';
import catalogPlants from '@assets/catalog-plants.webp';
import catalogPots from '@assets/catalog-pots.webp';
import { sdkService } from '@commercetool/sdk.service';
import { ProductProjection, ProductType } from '@commercetools/platform-sdk';
import { Breadcrumbs } from '@components/Breadcrumbs/Breadcrumbs';
import { Filters } from '@components/Filters/Filters';
import { Header } from '@components/index';
import { ProductCard } from '@components/ProductCard/ProductCard';
import { isNotNullable } from '@utils/utils';
import { useEffect, useState } from 'react';
import styles from './catalog.module.scss';

const CatalogImages: { [key: string]: string } = {
  'All Products': catalogAll,
  Plants: catalogPlants,
  Pots: catalogPots,
  Collections: catalogCollections,
};

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState<string>('All Products');
  const [types, setTypes] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const getTypes = async () => {
    const data: ProductType[] = await sdkService.getProductsTypes();
    setTypes(data);
  };

  const getProducts = async () => {
    let data;
    if (activeCategory === 'All Products') {
      data = await sdkService.getProducts();
    } else {
      const typeId = isNotNullable(types.find(oneType => oneType.name === activeCategory)).id;
      data = await sdkService.getProductsByType(typeId);
    }
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    getTypes();
  }, []);

  useEffect(() => {
    getProducts();
  }, [activeCategory]);

  return (
    <div className={styles.catalog}>
      <Header />
      <Breadcrumbs activeCategory={activeCategory} />
      <div className={styles.catalogContainer}>
        <Filters types={types} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <div className={styles.catalogContent}>
          <div className={styles.catalogImgContainer}>
            <img className={styles.catalogImg} src={CatalogImages[activeCategory] as string} alt="catalog img" />
          </div>
          <h2>{activeCategory}</h2>
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
