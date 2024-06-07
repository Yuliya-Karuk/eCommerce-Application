import { useState } from 'react';
import styles from './promoCodeView.module.scss';

export function PromoCodeView() {
  const [promoCode, setPromoCode] = useState<string>('');

  const handleApplyPromoCode = () => {
    console.log('Applying promo code:', promoCode);
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
