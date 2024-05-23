import heart from '@assets/heart.svg';
import { sdkService } from '@commercetool/sdk.service';
import { Product } from '@commercetools/platform-sdk';
import { formatToDollarAmount, getDollarsFromCents } from '@utils/utils';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './productItem.module.scss';

export function ProductItem() {
  const { slug } = useParams();
  if (!slug) {
    throw new Error("can't find the product key (slug)");
  }

  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(true);

  const getProduct = async () => {
    const data = await sdkService.getProductByKey(slug);
    setProduct(data);
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product.masterData?.current) {
      console.log(product.masterData.current);
      setLoading(false);
    }
  }, [product]);

  if (loading) {
    return <div>it was here somewhere... Wait, please, i will find it....</div>;
  }

  const name = product.masterData.current.name['en-US'];
  const { sku } = product.masterData.current.masterVariant;

  const fullPrice: number = product.masterData.current.masterVariant.prices
    ? getDollarsFromCents(product.masterData.current.masterVariant.prices[0].value.centAmount)
    : 0;

  const hasDiscount = !!product.masterData.current.masterVariant.prices?.[0].discounted?.value.centAmount;

  const priceWithDiscount = product.masterData.current.masterVariant.prices?.[0].discounted?.value.centAmount
    ? getDollarsFromCents(product.masterData.current.masterVariant.prices[0].discounted.value.centAmount)
    : 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.path}>catalog / {name}</div>
      <div className={styles.productOverview}>
        <div className={styles.sliderWrapper}>there will be a slider here</div>
        <section className={styles.productSummary}>
          <h2 className={styles.productSummaryHeader}>{name}</h2>
          {sku ? <div className={styles.sku}>SKU: {sku}</div> : ''}
          <div className={styles.priceLabel}>
            Price:
            <div
              className={classNames(styles.fullPrice, {
                [styles.fullPriceLineThrough]: hasDiscount,
              })}
            >
              {formatToDollarAmount(fullPrice)}
            </div>
            <div className={styles.priceWithDiscount}>
              {priceWithDiscount ? `${formatToDollarAmount(priceWithDiscount)}` : ''}
            </div>
          </div>

          <div className={styles.attributes}>
            {product.masterData.current.masterVariant.attributes?.map(item => (
              <div key={item.name} className={styles.attributesItem}>
                <div className={styles.name}>{item.name}:</div>
                <div className={styles.value}>{item.value}</div>
              </div>
            ))}
          </div>
          <div className={styles.buttonsWrapper}>
            <button type="button" className={styles.addToCartButton}>
              add to cart
            </button>
            <button type="button" className={styles.addToFavoriteButton}>
              <img src={heart} alt="add to favorite" />
            </button>
          </div>
        </section>
      </div>
      <div className={styles.productDescription}>
        <h3 className={styles.descriptionHeader}>Description</h3>
        <p>{product.masterData.current.description?.['en-US']}</p>
      </div>
    </div>
  );
}
