import { sdkService } from '@commercetool/sdk.service';
import { MyCartAddDiscountCodeAction } from '@commercetools/platform-sdk';
import { useCart } from '@contexts/cartProvider';
import { useState } from 'react';
import styles from './promoCodeView.module.scss';

export function PromoCodeView() {
  const [promoCode, setPromoCode] = useState<string>('');
  const { cart, setCart } = useCart();

  const handleApplyPromoCode = async () => {
    const action: MyCartAddDiscountCodeAction = {
      action: 'addDiscountCode',
      code: promoCode,
    };

    const data = await sdkService.updateCart(cart.id, cart.version, action);
    console.log(data);
    setCart(data);
  };

  return (
    <div className={styles.promoCodeView}>
      <input
        type="text"
        value={promoCode}
        onChange={e => setPromoCode(e.target.value)}
        placeholder="Enter promo code"
        className={styles.promoCodeInput}
      />
      <button type="button" onClick={handleApplyPromoCode} className={styles.promoCodeButton}>
        Apply
      </button>
    </div>
  );
}
