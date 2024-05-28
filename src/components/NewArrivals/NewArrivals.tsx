import { sdkService } from '@commercetool/sdk.service';
import { Product } from '@commercetools/platform-sdk';
import { Container } from '@components/Container/Container';
import { AppRoutes } from '@router/routes';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NewArrivalsCard } from '../NewArrivalsCard/NewArrivalsCard';
import styles from './NewArrivals.module.scss';

export const NewArrivals: FC = ({ ...props }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const updateProducts = async () => {
    const prods = await sdkService.getProducts();
    prods.sort((a, b) => new Date(a.lastModifiedAt).getTime() - new Date(b.lastModifiedAt).getTime());
    setProducts(prods.slice(0, 4));
  };

  useEffect(() => {
    updateProducts();
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
            {products.map((product: Product) => {
              return <NewArrivalsCard key={product.id} product={product} />;
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
