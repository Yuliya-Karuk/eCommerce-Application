import { sdkService } from '@commercetool/sdk.service';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Container } from '@components/Container/Container';
import { AppRoutes } from '@router/routes';
import { CategoryList, simplifyCategories } from '@utils/utils';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NewArrivalsCard } from '../NewArrivalsCard/NewArrivalsCard';
import styles from './NewArrivals.module.scss';

export const NewArrivals: FC = ({ ...props }) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [categories, setCategories] = useState<CategoryList>({});
  const updateProducts = async () => {
    const prods = await sdkService.getProducts();
    prods.sort((a, b) => new Date(a.lastModifiedAt).getTime() - new Date(b.lastModifiedAt).getTime());
    setProducts(prods.slice(0, 4));
  };
  const getCategories = async () => {
    const data = await sdkService.getCategories();
    const preparedData = simplifyCategories(data);
    setCategories(preparedData);
  };

  useEffect(() => {
    updateProducts();
    getCategories();
  }, []);

  return (
    <section className={styles.newarrivals}>
      <Container classname={styles.newarrivals}>
        <div className={styles.newarrivalsBody}>
          <div className={styles.newarrivalsHeader}>
            <h2 className={styles.newarrivalsTitle}>New Arrivals</h2>
            <Link to={AppRoutes.CATALOG_ROUTE} className={styles.newarrivalsShopall}>
              Shop All
            </Link>
          </div>

          <div className={styles.newarrivalsList} {...props}>
            {products.map((product: ProductProjection) => {
              return <NewArrivalsCard key={product.id} product={product} categories={categories} />;
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
