import { sdkService } from '@commercetool/sdk.service';
import { Product } from '@commercetools/platform-sdk';
import { AppRoutes } from '@router/routes';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../Container/Container';
import { NewArrivalsCard } from '../NewArrivalsCard/NewArrivalsCard';
import styles from './NewArrivals.module.scss';

interface NewArrivalsProps {
  id?: string;
}

export const NewArrivals: FC<NewArrivalsProps> = ({ id, ...props }) => {
  const navigate = useNavigate();
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
            <button
              type="button"
              className={styles.newarrivalsShopall}
              onClick={() => {
                navigate(AppRoutes.CATALOG_ROUTE);
              }}
            >
              Shop All
            </button>
          </div>

          <div className={styles.newarrivalsList} {...props}>
            {products.map((product: Product) => {
              return <NewArrivalsCard key={product.key} product={product} />;
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
