import { Product } from '@commercetools/platform-sdk';
import { AppRoutes } from '@router/routes';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertCentsToDollarsString } from '../../utils/utils';
import styles from './_NewArrivalsCard.module.scss';

interface NewArrivalsCardProps {
  product: Product;
  id?: string;
}

export const NewArrivalsCard: FC<NewArrivalsCardProps> = ({ product, id, ...props }) => {
  const [isImgHover, setIsImgHover] = useState(false);

  return (
    <article className={styles.newarrivalsItem} id={product.id} {...props}>
      <div
        className={styles.newarrivalsCardimage}
        onMouseEnter={() => {
          setIsImgHover(true);
        }}
        onMouseLeave={() => {
          setIsImgHover(false);
        }}
      >
        <img
          src={
            (product.masterData.current.masterVariant.images &&
              product.masterData.current.masterVariant.images[isImgHover ? 1 : 0].url) ||
            'New Arrivals/template.png'
          }
          alt={product.masterData.current.name['en-US']}
        />
      </div>

      <div className={styles.newarrivalsCardinfo}>
        <p className={styles.newarrivalsCardtitle}>{product.masterData.current.name['en-US']}</p>
        <p className={styles.newarrivalsCardcoast}>
          {(product.masterData.current.masterVariant.prices &&
            convertCentsToDollarsString(product.masterData.current.masterVariant.prices[0].value.centAmount)) ||
            'Not available'}
        </p>
      </div>

      <Link
        to={
          product.masterData.current.slug['en-US']
            ? `${AppRoutes.PRODUCT_ROUTE}/${product.masterData.current.slug['en-US']}`
            : '/'
        }
        className={styles.newarrivalsCardbutton}
      >
        Read more
      </Link>
    </article>
  );
};
