import { sdkService } from '@commercetool/sdk.service';
import { CartChangeLineItemQuantityAction, CartRemoveLineItemAction, LineItem } from '@commercetools/platform-sdk';
import { PriceView } from '@components/PriceView/PriceView';
import { QuantityInput } from '@components/QuantityInput/QuantityInput';
import { useCart } from '@contexts/cartProvider';
import { useToast } from '@contexts/toastProvider';
import { SizeKey, sizeDescriptions } from '@utils/constants';
import { convertProductAttributesArrayToObject } from '@utils/utils';
import { useEffect, useState } from 'react';
import styles from './CartProductCard.module.scss';

interface CartProductCardProps {
  product: LineItem;
  loading: boolean;
  setLoading: (data: boolean) => void;
}

export function CartProductCard({ product, loading, setLoading }: CartProductCardProps) {
  const imageUrl = product.variant.images?.[0]?.url;

  const [quantity, setQuantity] = useState(product.quantity);
  const { cart, setCart } = useCart();
  const { errorNotify } = useToast();

  async function handleDeleteBtn() {
    try {
      const action: CartRemoveLineItemAction = {
        action: 'removeLineItem',
        lineItemId: product.id,
      };

      const data = await sdkService.updateCart(cart.id, cart.version, [action]);
      setCart(data);
    } catch (e) {
      errorNotify((e as Error).message);
    }
  }

  useEffect(() => {
    const handleUpdateProductQuantity = async () => {
      setLoading(true);

      try {
        const action: CartChangeLineItemQuantityAction = {
          action: 'changeLineItemQuantity',
          lineItemId: product.id,
          quantity,
        };

        const data = await sdkService.updateCart(cart.id, cart.version, [action]);
        setCart(data);
      } catch (e) {
        errorNotify((e as Error).message);
      }

      setLoading(false);
    };

    if (quantity !== product.quantity) {
      handleUpdateProductQuantity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const attributes = convertProductAttributesArrayToObject(product.variant.attributes);

  return (
    <div className={styles.cartProductCard}>
      {imageUrl ? <img src={imageUrl} alt={product.name['en-US']} className={styles.image} /> : ''}
      <div className={styles.details}>
        <div className={styles.nameWrapper}>
          <h3 className={styles.name}>{product.name['en-US']}</h3>
          <div className={styles.sku}>{product.variant.sku}</div>
          {attributes.size && <div className={styles.size}>Size: {sizeDescriptions[attributes.size as SizeKey]}</div>}
          {attributes.color && <div className={styles.color}>Color: {attributes.color} </div>}
        </div>
        <div className={styles.priceQuantityWrapper}>
          <div className={styles.quantitySelector}>
            <QuantityInput value={quantity} onChange={setQuantity} loading={loading} />
          </div>
          <div className={styles.priceWrapper}>
            <PriceView price={product.price} />
          </div>
        </div>
        <button type="button" className={styles.removeButton} onClick={handleDeleteBtn} disabled={loading}>
          &times;
        </button>
      </div>
    </div>
  );
}
