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

type SizeKey = 'S' | 'M' | 'L';

const sizeDescriptions: Record<SizeKey, string> = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
};

const ColorsHex: { [key: string]: string } = {
  Bronze: '#845b32',
  Brown: '#492201',
  Burgundy: '#590016',
  Green: '#464e3c',
  Gray: '#808080',
  Blue: '#697f8b',
};

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
                    {sizeDescriptions[s as SizeKey]}
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
                  // eslint-disable-next-line jsx-a11y/control-has-associated-label
                  <button
                    type="button"
                    key={c}
                    className={classNames(styles.colorButton, {
                      [styles.active]: c === color,
                    })}
                    style={{ backgroundColor: c in ColorsHex ? ColorsHex[c] : c }}
                    onClick={() => handleColorClick(index)}
                  />
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
    </div>
  );
}
