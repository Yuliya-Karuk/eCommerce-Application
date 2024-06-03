import { SortSettings } from '@models/index';
import classnames from 'classnames';
import { useState } from 'react';
import styles from './Sorting.module.scss';

interface SortProps {
  sortSettings: SortSettings;
  setSortSettings: (data: SortSettings) => void;
}

interface SortOption {
  value: string;
  label: string;
}

const options: SortOption[] = [
  { value: '', label: 'Default' },
  { value: 'price asc', label: 'Price: Low to High' },
  { value: 'price desc', label: 'Price: High to Low' },
  { value: 'name.en-US asc', label: 'Name: A to Z' },
  { value: 'name.en-US desc', label: 'Name: Z to A' },
];

export const Sorting = ({ sortSettings, setSortSettings }: SortProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);

    const newSort = { ...sortSettings };
    newSort.sort = option.value;
    setSortSettings(newSort);

    setIsOpen(false);
  };

  return (
    <div className={styles.sort}>
      <p>SORT BY:</p>
      <div className={styles.selectContainer}>
        <button
          id="sort"
          type="button"
          className={styles.selectHeader}
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="listbox"
          aria-haspopup="listbox"
          tabIndex={0}
          aria-expanded={isOpen}
        >
          {selectedOption.label}
          <span className={classnames(styles.selectSpan, { [styles.open]: isOpen })} />
        </button>
        {isOpen && (
          <ul className={styles.selectList} role="listbox" id="listbox">
            {options.map(option => (
              <li
                key={option.value}
                className={styles.selectItem}
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={selectedOption === option}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
