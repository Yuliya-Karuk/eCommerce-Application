import { Product, ProductVariant } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import styles from './ProductAttributesView.module.scss';

export interface ProductAttributes {
  details: string;
  size?: string;
  brand?: string;
  color?: string;
}

export interface ProductAttributesViewProps {
  activeAttributes: ProductAttributes;
  allAttributes: ProductAttributes[];
  setActiveVariant: React.Dispatch<React.SetStateAction<ProductVariant>>;
  product: Product;
}

interface SizeOption {
  size: string;
  index: number;
}

interface ColorOption {
  color: string;
  index: number;
}

export default function ProductAttributesView({
  activeAttributes: { size, brand, color },
  allAttributes,
  setActiveVariant,
  product,
}: ProductAttributesViewProps) {
  const sizes: SizeOption[] = [];
  const colors: ColorOption[] = [];

  if (allAttributes.length > 1) {
    allAttributes.forEach((attr, index) => {
      if (attr.size) {
        sizes.push({ size: attr.size, index });
      }
      if (attr.color) {
        colors.push({ color: attr.color, index });
      }
    });
  }

  const handleSizeClick = (index: number) => {
    if (index > 0) {
      setActiveVariant(product.masterData.current.variants[index - 1]);
    } else {
      setActiveVariant(product.masterData.current.masterVariant);
    }
  };

  const handleColorClick = (index: number) => {
    if (index > 0) {
      setActiveVariant(product.masterData.current.variants[index - 1]);
    } else {
      setActiveVariant(product.masterData.current.masterVariant);
    }
  };

  return (
    <div className={styles.attributes}>
      {size && (
        <div>
          <div className={styles.title}>Size:</div>
          <div className={styles.options}>
            {sizes.length > 0 && (
              <div className={styles.optionsVariants}>
                {sizes.map(({ size: s, index }) => (
                  <button
                    key={index}
                    className={classNames({
                      [styles.active]: s === size,
                    })}
                    onClick={() => handleSizeClick(index)}
                    type="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSizeClick(index);
                      }
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {color && (
        <div>
          <div className={styles.title}>Color:</div>
          <div className={styles.colorOptions}>
            {colors.length > 0 && (
              <div className={styles.optionsVariants}>
                {colors.map(({ color: c, index }) => (
                  <button
                    key={index}
                    className={classNames({
                      [styles.active]: c === color,
                    })}
                    onClick={() => handleColorClick(index)}
                    type="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleColorClick(index);
                      }
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {brand && (
        <div>
          <div className={styles.title}>Brand:</div>
          <div className={styles.descriptionText}>{brand}</div>
        </div>
      )}

      {/* <div>
        <div className={styles.title}>Description:</div>
        <div className={styles.descriptionText}>{details}</div>
      </div> */}
    </div>
  );
}
