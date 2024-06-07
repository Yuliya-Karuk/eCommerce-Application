import { sdkService } from '@commercetool/sdk.service';
import { MyCartAddDiscountCodeAction } from '@commercetools/platform-sdk';
import { useCart } from '@contexts/cartProvider';
import { useToast } from '@contexts/toastProvider';
import { useState } from 'react';
import styles from './promoCodeView.module.scss';

export function PromoCodeView() {
  const { cart, setCart, promoCodeName, setPromoCodeName } = useCart();
  const [promoCode, setPromoCode] = useState<string>(promoCodeName);
  const { errorNotify } = useToast();

  const handleApplyPromoCode = async () => {
    const action: MyCartAddDiscountCodeAction = {
      action: 'addDiscountCode',
      code: promoCode,
    };

    try {
      const data = await sdkService.updateCart(cart.id, cart.version, [action]);
      setCart(data);
      setPromoCodeName(promoCode);
    } catch (e) {
      setPromoCodeName('');
      errorNotify((e as Error).message);
    }
  };

  return (
    <div className={styles.promoCodeView}>
      <input
        type="text"
        value={promoCode}
        onChange={e => setPromoCode(e.target.value)}
        placeholder="Enter promo code"
        className={styles.promoCodeInput}
        disabled={!!promoCodeName}
      />
      <button
        type="button"
        onClick={handleApplyPromoCode}
        className={styles.promoCodeButton}
        disabled={!!promoCodeName}
      >
        {promoCodeName ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
}
