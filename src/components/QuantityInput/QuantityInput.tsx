import React from 'react';
import styles from './QuantityInput.module.scss';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  loading?: boolean;
}

const MAX_QUANTITY = 50;
const MIN_QUANTITY = 1;

export const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange, loading }) => {
  const handleIncrement = () => {
    if (value < MAX_QUANTITY) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > MIN_QUANTITY) {
      onChange(value - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!Number.isNaN(newValue) && newValue >= MIN_QUANTITY && newValue <= MAX_QUANTITY) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.quantityInput}>
      <button type="button" onClick={handleDecrement} className={styles.decrementButton} disabled={!!loading}>
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className={styles.quantityInputField}
        min={MIN_QUANTITY}
        max={MAX_QUANTITY}
      />
      <button type="button" onClick={handleIncrement} className={styles.incrementButton} disabled={!!loading}>
        +
      </button>
    </div>
  );
};
