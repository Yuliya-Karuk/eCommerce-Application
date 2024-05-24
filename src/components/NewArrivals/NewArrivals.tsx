import { AppRoutes } from '@router/routes';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../Container/Container';
import { NewArrivalsCard, NewArrivalsCardType } from '../NewArrivalsCard/NewArrivalsCard';
import styles from './NewArrivals.module.scss';

interface NewArrivalsProps {
  id?: string;
}

const cards = [
  {
    title: 'Ficus lyrata',
    coast: 'p.35,99',
    path: '/public/New Arrivals/Arrivals-1-1.png',
  },
  {
    title: 'Rusty Flowerpot',
    coast: 'p.20,99',
    path: '/public/New Arrivals/Arrivals-2-1.png',
  },
  {
    title: 'Cactus',
    coast: 'p.19,99',
    path: '/public/New Arrivals/Arrivals-3-1.png',
  },
  {
    title: 'Wooden Basket',
    coast: 'p.28,99',
    path: '/public/New Arrivals/Arrivals-4-1.png',
  },
];

export const NewArrivals: FC<NewArrivalsProps> = ({ id, ...props }) => {
  const navigate = useNavigate();
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
            {/* <a className={styles.newarrivalsShopall} href="!#">
              Shop All
            </a> */}
          </div>

          <div className={styles.newarrivalsList} {...props}>
            {cards.map((card: NewArrivalsCardType, idx: number) => {
              return <NewArrivalsCard key={card.path} card={card} id={`product-${idx + 1}`} />;
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
