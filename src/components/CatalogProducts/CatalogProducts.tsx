import { ProductProjection } from '@commercetools/platform-sdk';
import { MySkeleton } from '@components/MySkeleton/MySkeleton';
import { ProductCard } from '@components/ProductCard/ProductCard';
import { CategoryList } from '@models/index';
import { productPerPage } from '@utils/constants';
import styles from './CatalogProducts.module.scss';

interface CatalogProductsProps {
  loading: boolean;
  products: ProductProjection[];
  catalogCategories: CategoryList;
}

export const CatalogProducts = (catalogProductsProps: CatalogProductsProps) => {
  const { loading, products, catalogCategories } = catalogProductsProps;
  return (
    <div className={styles.catalogProducts}>
      <ul className={styles.catalogList}>
        {loading &&
          Array.from({ length: productPerPage }, (_, i) => i).map(el => (
            <div key={el} className={styles.skeletonContainer}>
              <MySkeleton />
            </div>
          ))}
        {!loading &&
          Object.values(catalogCategories).length > 0 &&
          products.map(product => <ProductCard categories={catalogCategories} key={product.id} product={product} />)}
      </ul>
      {products.length === 0 && (
        <div className={styles.emptyCart}>
          <p>Sorry, but no results were found for the filters you specified.</p>
          <p>Please try to set other filters.</p>
        </div>
      )}
    </div>
  );
};
