import { AppRoutes } from '@router/routes';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './_NewArrivalsCard.module.scss';

export type NewArrivalsCardType = {
  title: string;
  coast: string;
  path: string;
};

interface NewArrivalsCardProps {
  card: NewArrivalsCardType;
  id?: string;
}

export const NewArrivalsCard: FC<NewArrivalsCardProps> = ({ card, id, ...props }) => {
  const navigate = useNavigate();

  return (
    <article className={styles.newarrivalsItem} id={id} {...props}>
      <div className={styles.newarrivalsCardimage}>
        <img src={card.path} alt="" />
      </div>

      <div className={styles.newarrivalsCardinfo}>
        <p className={styles.newarrivalsCardtitle}>{card.title}</p>
        <p className={styles.newarrivalsCardcoast}>{card.coast}</p>
      </div>

      <button
        className={styles.newarrivalsCardbutton}
        type="button"
        onClick={() => {
          navigate(`${AppRoutes.PRODUCT_ROUTE}/${id}`);
        }}
      >
        Add to Cart
      </button>
    </article>
  );
};
