import { LineItem } from '@commercetools/platform-sdk';
import { PriceView } from '@components/PriceView/PriceView';
import { QuantityInput } from '@components/QuantityInput/QuantityInput';
import React, { useState } from 'react';
import styles from './CartProductCard.module.scss';

interface CartProductCardProps {
  product: LineItem;
}

export const CartProductCard: React.FC<CartProductCardProps> = ({ product }) => {
  const imageUrl = product.variant.images?.[0]?.url;

  const [quantity, setQuantity] = useState(product.quantity);

  function handleDeleteBtn(): void {
    const item = {
      id: product.id,
    };
    console.log(item);
  }

  return (
    <div className={styles.cartProductCard}>
      {imageUrl ? <img src={imageUrl} alt={product.name['en-US']} className={styles.image} /> : ''}
      <div className={styles.details}>
        <div className={styles.nameWrapper}>
          <h3 className={styles.name}>{product.name['en-US']}</h3>
        </div>
        <div className={styles.quantitySelector}>
          <QuantityInput value={quantity} onChange={setQuantity} />
        </div>
        <div className={styles.priceWrapper}>
          <PriceView price={product.price} />
          <button type="button" className={styles.removeButton} onClick={handleDeleteBtn}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};
