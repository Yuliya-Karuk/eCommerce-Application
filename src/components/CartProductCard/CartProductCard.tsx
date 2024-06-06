import { sdkService } from '@commercetool/sdk.service';
import { CartChangeLineItemQuantityAction, CartRemoveLineItemAction, LineItem } from '@commercetools/platform-sdk';
import { PriceView } from '@components/PriceView/PriceView';
import { QuantityInput } from '@components/QuantityInput/QuantityInput';
import { useCart } from '@contexts/cartProvider';
import { useEffect, useState } from 'react';
import styles from './CartProductCard.module.scss';

interface CartProductCardProps {
  product: LineItem;
}

export function CartProductCard({ product }: CartProductCardProps) {
  const imageUrl = product.variant.images?.[0]?.url;

  const [quantity, setQuantity] = useState(product.quantity);
  const { cart, setCart } = useCart();

  async function handleDeleteBtn() {
    const action: CartRemoveLineItemAction = {
      action: 'removeLineItem',
      lineItemId: product.id,
    };

    const data = await sdkService.updateCart(cart.id, cart.version, action);
    setCart(data);
  }

  useEffect(() => {
    const handleUpdateProductQuantity = async () => {
      const action: CartChangeLineItemQuantityAction = {
        action: 'changeLineItemQuantity',
        lineItemId: product.id,
        quantity,
      };

      const data = await sdkService.updateCart(cart.id, cart.version, action);
      setCart(data);
    };

    handleUpdateProductQuantity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

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
}
