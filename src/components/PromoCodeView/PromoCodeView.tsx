import { sdkService } from '@commercetool/sdk.service';
import { MyCartAddDiscountCodeAction, MyCartRemoveDiscountCodeAction } from '@commercetools/platform-sdk';
import { useCart } from '@contexts/cartProvider';
import { useToast } from '@contexts/toastProvider';
import { useState } from 'react';
import styles from './promoCodeView.module.scss';

export function PromoCodeView() {
  const { cart, setCart, promoCodeName, setPromoCodeName } = useCart();
  const [promoCode, setPromoCode] = useState<string>(promoCodeName);
  const { errorNotify } = useToast();

  const updatePromoCode = async (action: MyCartRemoveDiscountCodeAction | MyCartAddDiscountCodeAction) => {
    try {
      const data = await sdkService.updateCart(cart.id, cart.version, [action]);
      setCart(data);
      setPromoCodeName(action.action === 'removeDiscountCode' ? '' : promoCode);
      setPromoCode(action.action === 'removeDiscountCode' ? '' : promoCode);
    } catch (e) {
      setPromoCode(promoCodeName);
      errorNotify((e as Error).message);
    }
  };

  const handleApplyPromoCode = async () => {
    if (promoCodeName === '') {
      const action: MyCartAddDiscountCodeAction = {
        action: 'addDiscountCode',
        code: promoCode,
      };

      updatePromoCode(action);
    } else {
      const action: MyCartRemoveDiscountCodeAction = {
        action: 'removeDiscountCode',
        discountCode: {
          typeId: 'discount-code',
          id: cart.discountCodes[0].discountCode.id,
        },
      };

      updatePromoCode(action);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyPromoCode();
    }
  };

  return (
    <div className={styles.promoCodeView}>
      <input
        type="text"
        value={promoCode}
        onChange={e => setPromoCode(e.target.value)}
        placeholder="Enter promo code"
        onKeyUp={handleKeyPress}
        className={styles.promoCodeInput}
        disabled={promoCodeName === promoCode && promoCodeName !== ''}
      />
      <button
        type="button"
        onClick={handleApplyPromoCode}
        className={styles.promoCodeButton}
        disabled={promoCode === ''}
      >
        {promoCodeName !== promoCode || promoCodeName === '' ? 'Apply' : 'Remove'}
      </button>
    </div>
  );
}
