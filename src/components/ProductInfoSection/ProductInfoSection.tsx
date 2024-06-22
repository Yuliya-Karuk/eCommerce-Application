import { useState } from 'react';
import styles from './ProductInfoSection.module.scss';

interface ProductInfoSectionProps {
  productInfoText: string;
}

export function ProductInfoSection({ productInfoText }: ProductInfoSectionProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('productInfo');

  const toggleSection = (section: string) => {
    setExpandedSection(prevSection => (prevSection === section ? null : section));
  };

  return (
    <div className={styles.productInfoSection}>
      <div className={styles.section}>
        <button
          type="button"
          className={styles.title}
          onClick={() => toggleSection('productInfo')}
          aria-expanded={expandedSection === 'productInfo'}
        >
          Product Info
          <span className={styles.icon}>{expandedSection === 'productInfo' ? '-' : '+'}</span>
        </button>
        <div className={styles.content} data-expanded={expandedSection === 'productInfo'}>
          <p className={styles.text}>{productInfoText}</p>
        </div>
      </div>
      <div className={styles.section}>
        <button
          type="button"
          className={styles.title}
          onClick={() => toggleSection('returnPolicy')}
          aria-expanded={expandedSection === 'returnPolicy'}
        >
          Return & Refund Policy
          <span className={styles.icon}>{expandedSection === 'returnPolicy' ? '-' : '+'}</span>
        </button>
        <div className={styles.content} data-expanded={expandedSection === 'returnPolicy'}>
          <p className={styles.text}>
            We hope you love your purchase, but if you are not completely satisfied, you can return the product to us
            within 30 days for a full refund. The item must be in its original condition and packaging.
          </p>
        </div>
      </div>
      <div className={styles.section}>
        <button
          type="button"
          className={styles.title}
          onClick={() => toggleSection('shippingInfo')}
          aria-expanded={expandedSection === 'shippingInfo'}
        >
          Shipping Info
          <span className={styles.icon}>{expandedSection === 'shippingInfo' ? '-' : '+'}</span>
        </button>
        <div className={styles.content} data-expanded={expandedSection === 'shippingInfo'}>
          <p className={styles.text}>
            We offer free standard shipping on all orders. Expedited shipping is available at an additional cost. Orders
            are processed within 1-2 business days and delivery typically takes 3-5 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
