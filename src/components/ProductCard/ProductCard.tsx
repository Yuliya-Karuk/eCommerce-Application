import { ProductProjection } from '@commercetools/platform-sdk';
import { AppRoutes } from '@router/routes';
import { getDollarsFromCents, isNotNullable } from '@utils/utils';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductProjection;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const productName = product.name['en-US'];
  const pricesArr = isNotNullable(product.masterVariant.prices);

  return (
    <div className={styles.productCard}>
      <Link
        to={product.key ? `${AppRoutes.PRODUCT_ROUTE}/${product.key}` : AppRoutes.HOME_ROUTE}
        className={styles.productCardImgContainer}
      >
        <img
          className={styles.productCardImg}
          src={isNotNullable(product.masterVariant.images)[0].url}
          alt="catalog img"
        />
      </Link>
      <Link
        to={product.key ? `${AppRoutes.PRODUCT_ROUTE}/${product.key}` : AppRoutes.HOME_ROUTE}
        className={styles.productCardTitle}
      >
        {productName}
      </Link>
      <div className={styles.productCardPrices}>
        <span>Price: </span>
        <div className={classnames(styles.productCardPrice, { [styles.crossed]: pricesArr[0].discounted })}>
          {getDollarsFromCents(pricesArr[0].value.centAmount)} &#36;
        </div>
        {pricesArr[0].discounted && (
          <div className={styles.productCardPriceDiscount}>
            {getDollarsFromCents(pricesArr[0].discounted.value.centAmount)} &#36;
          </div>
        )}
      </div>
      <button type="button" className={styles.productCardButton}>
        <span className={styles.userMenuText}>Add to Cart</span>
      </button>
    </div>
  );
};
