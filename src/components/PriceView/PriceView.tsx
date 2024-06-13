import { Price } from '@commercetools/platform-sdk';
import { convertCentsToDollarsString } from '@utils/utils';
import classNames from 'classnames';
import styles from './PriceView.module.scss';

interface PriceViewProps {
  price: Price;
}

export function PriceView({ price }: PriceViewProps) {
  const fullPrice: string = price && convertCentsToDollarsString(price.value.centAmount);
  const priceWithDiscount =
    price.discounted?.value.centAmount && convertCentsToDollarsString(price.discounted.value.centAmount);
  const hasDiscount = !!price.discounted?.value.centAmount;

  return (
    <>
      <div
        className={classNames(styles.fullPrice, {
          [styles.fullPriceLineThrough]: hasDiscount,
        })}
      >
        {fullPrice}
      </div>
      {hasDiscount && <div className={styles.priceWithDiscount}>{priceWithDiscount}</div>}
    </>
  );
}
