import React from 'react';
import styles from './QuantityInput.module.scss';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ value, onChange }) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(newValue) && newValue > 0) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.quantityInput}>
      <button type="button" onClick={handleDecrement} className={styles.decrementButton}>
        -
      </button>
      <input type="number" value={value} onChange={handleChange} className={styles.quantityInputField} min="1" />
      <button type="button" onClick={handleIncrement} className={styles.incrementButton}>
        +
      </button>
    </div>
  );
};

export default QuantityInput;
