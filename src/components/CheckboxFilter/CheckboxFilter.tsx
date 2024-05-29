import { FiltersProps } from '@models/index';
import classnames from 'classnames';
import { ChangeEvent, useState } from 'react';
import styles from './CheckboxFilter.module.scss';

export const CheckboxFilter = ({ filters, setFilters, values, name }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    const newFilters = { ...filters };
    if (checked) {
      newFilters[name] = [...newFilters[name], value];
    } else {
      newFilters[name] = newFilters[name].filter((selectedValue: string) => selectedValue !== value);
    }

    setFilters(newFilters);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        <h3 className={styles.filterTitle}>{name}</h3>
        <span className={classnames(styles.filterSpan, { [styles.open]: isOpen })} />
      </div>
      <ul className={classnames(styles.filtersList, { [styles.open]: isOpen })}>
        {values.map(option => (
          <li key={option}>
            <input
              className={styles.filterInput}
              id={option}
              type="checkbox"
              value={option}
              checked={filters[name].includes(option) || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={option} className={styles.filterLabel}>
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
