import { ProductProjection } from '@commercetools/platform-sdk';
import { AppRoutes } from '@router/routes';
import { CategoryList, convertCentsToDollarsString, prepareProductSlugs } from '@utils/utils';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewArrivalsCard.module.scss';

interface NewArrivalsCardProps {
  product: ProductProjection;
  categories: CategoryList;
}

export const NewArrivalsCard: FC<NewArrivalsCardProps> = ({ product, categories, ...props }) => {
  const [isImgHover, setIsImgHover] = useState(false);
  const slugs = prepareProductSlugs(categories, product.categories).join('/');

  return (
    <article className={styles.newarrivalsItem} id={product.id} {...props}>
      <div
        className={styles.newarrivalsCardImage}
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

      <div className={styles.newarrivalsCardInfo}>
        <p className={styles.newarrivalsCardTitle}>{product.name['en-US']}</p>
        <p className={styles.newarrivalsCardCoast}>
          {(product.masterVariant.prices &&
            convertCentsToDollarsString(product.masterVariant.prices[0].value.centAmount)) ||
            'Not available'}
        </p>
      </div>

      <Link
        to={product.key ? `${AppRoutes.PRODUCTS_ROUTE}/${slugs}/${product.key}` : '/'}
        className={styles.newarrivalsCardButton}
      >
        View details
      </Link>
    </article>
  );
};
