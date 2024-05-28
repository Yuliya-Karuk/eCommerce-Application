import { ProductProjection } from '@commercetools/platform-sdk';
import { AppRoutes } from '@router/routes';
import { CategoryList, convertCentsToDollarsString, prepareProductSlugs } from '@utils/utils';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewArrivalsCard.module.scss';

interface NewArrivalsCardProps {
  product: ProductProjection;
  categories: CategoryList;
  id?: string;
}

export const NewArrivalsCard: FC<NewArrivalsCardProps> = ({ product, categories, id, ...props }) => {
  const [isImgHover, setIsImgHover] = useState(false);
  const slugs = prepareProductSlugs(categories, product.categories).join('/');

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
            (product.masterVariant.images && product.masterVariant.images[isImgHover ? 1 : 0].url) ||
            'images/New Arrivals/template.png'
          }
          alt={product.name['en-US']}
        />
      </div>

      <div className={styles.newarrivalsCardinfo}>
        <p className={styles.newarrivalsCardtitle}>{product.name['en-US']}</p>
        <p className={styles.newarrivalsCardcoast}>
          {(product.masterVariant.prices &&
            convertCentsToDollarsString(product.masterVariant.prices[0].value.centAmount)) ||
            'Not available'}
        </p>
      </div>

      <Link
        to={product.key ? `${AppRoutes.PRODUCTS_ROUTE}/${slugs}/${product.key}` : '/'}
        className={styles.newarrivalsCardbutton}
      >
        Read more
      </Link>
    </article>
  );
};
