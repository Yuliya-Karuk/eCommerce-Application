import template from '@assets/template.png';
import { ProductProjection } from '@commercetools/platform-sdk';
import { CategoryList } from '@models/index';
import { AppRoutes } from '@router/routes';
import { convertCentsToDollarsString, isNotNullable, prepareProductSlugs } from '@utils/utils';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductProjection;
  categories: CategoryList;
}

export const ProductCard = ({ categories, product }: ProductCardProps) => {
  let priceDiscounted;
  const slugs = prepareProductSlugs(categories, product.categories).join('/');
  const productName = product.name['en-US'];
  const productDesc = isNotNullable(product.description)['en-US'];
  const productImg = isNotNullable(product.masterVariant.images)[0].url;
  const pricesArr = isNotNullable(product.masterVariant.prices);
  const price = convertCentsToDollarsString(pricesArr[0].value.centAmount);
  const isDiscounted = Boolean(pricesArr[0].discounted);
  if (isDiscounted) {
    priceDiscounted = convertCentsToDollarsString(isNotNullable(pricesArr[0].discounted).value.centAmount);
  }

  return (
    <div className={styles.productCard}>
      <Link to={`${AppRoutes.PRODUCTS_ROUTE}/${slugs}/${product.key}`} className={styles.productCardImgContainer}>
        <img className={styles.productCardImg} src={productImg || template} alt="catalog img" />
        <p className={styles.productCardDescription}>{productDesc}</p>
      </Link>
      <Link to={`${AppRoutes.PRODUCTS_ROUTE}/${slugs}/${product.key}`} className={styles.productCardTitle}>
        {productName}
      </Link>
      <div className={styles.productCardPrices}>
        <span>Price: </span>
        <div className={classnames(styles.productCardPrice, { [styles.crossed]: pricesArr[0].discounted })}>
          {price}
        </div>
        {isDiscounted && <div className={styles.productCardPriceDiscount}>{priceDiscounted}</div>}
      </div>
      <button type="button" className={styles.productCardButton}>
        Add to Cart
      </button>
    </div>
  );
};
