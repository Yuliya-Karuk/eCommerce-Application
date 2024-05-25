/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classnames from 'classnames';
import { useState } from 'react';
import styles from './Sorting.module.scss';

interface SortOption {
  value: string;
  label: string;
}

const options: SortOption[] = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'alpha-asc', label: 'Name: A to Z' },
  { value: 'alpha-desc', label: 'Name: Z to A' },
];

export const Sorting = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log('Selected sort option:', option.value);
  };

  return (
    <div className={styles.sort}>
      <label htmlFor="sort">SORT BY:</label>
      <div className={styles.selectContainer}>
        <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
          {selectedOption.label}
          <span className={classnames(styles.selectSpan, { [styles.open]: isOpen })} />
        </div>
        {isOpen && (
          <ul className={styles.selectList}>
            {options.map(option => (
              <li key={option.value} className={styles.selectItem} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
