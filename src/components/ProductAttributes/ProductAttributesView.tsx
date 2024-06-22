import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { ColorsHex, SizeKey, sizeDescriptions } from '@utils/constants';
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
  product: ProductProjection;
  isCatalog: boolean;
}

interface SizeOption {
  size: string;
  index: number;
}

interface ColorOption {
  color: string;
  index: number;
}

export function ProductAttributesView({
  activeAttributes: { size, brand, color },
  allAttributes,
  setActiveVariant,
  product,
  isCatalog,
}: ProductAttributesViewProps) {
  const sizes: SizeOption[] = [];
  const colors: ColorOption[] = [];

  if (allAttributes.length >= 1) {
    allAttributes.forEach((attr, index) => {
      if (attr.size) {
        sizes.push({ size: attr.size, index });
      }
      if (attr.color) {
        colors.push({ color: attr.color, index });
      }
    });
  }

  const handleSizeOrColorClick = (index: number) => {
    if (index > 0) {
      setActiveVariant(product.variants[index - 1]);
    } else {
      setActiveVariant(product.masterVariant);
    }
  };

  return (
    <div className={classNames(styles.attributes, { [styles.attributesCatalog]: isCatalog })}>
      {size && (
        <div className={classNames(null, { [styles.variantBlock]: isCatalog })}>
          <div className={styles.title}>Size:</div>
          <div className={styles.options}>
            {sizes.length > 0 && (
              <div className={styles.optionsVariants}>
                {sizes.map(({ size: s, index }) => (
                  <button
                    key={s}
                    className={classNames({
                      [styles.active]: s === size,
                    })}
                    onClick={() => handleSizeOrColorClick(index)}
                    type="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSizeOrColorClick(index);
                      }
                    }}
                  >
                    {sizeDescriptions[s as SizeKey]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {color && (
        <div className={classNames(null, { [styles.variantBlock]: isCatalog })}>
          <div className={styles.title}>Color:</div>
          <div className={styles.colorOptions}>
            {colors.length > 0 && (
              <div className={styles.optionsVariants}>
                {colors.map(({ color: c, index }) => (
                  <button
                    type="button"
                    key={c}
                    aria-label="color button"
                    tabIndex={0}
                    className={classNames(styles.colorButton, {
                      [styles.active]: c === color,
                    })}
                    style={{ backgroundColor: c in ColorsHex ? ColorsHex[c] : c }}
                    onClick={() => handleSizeOrColorClick(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {brand && (
        <div className={classNames(null, { [styles.brandBlock]: isCatalog })}>
          <div className={styles.title}>Brand:</div>
          <div className={styles.descriptionText}>{brand}</div>
        </div>
      )}
    </div>
  );
}
