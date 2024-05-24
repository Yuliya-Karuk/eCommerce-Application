/* eslint-disable jsx-a11y/no-static-element-interactions */
import classnames from 'classnames';
import { useState } from 'react';
import styles from './CheckboxFilter.module.scss';

interface FiltersProps {
  values: string[];
  name: string;
}

export const CheckboxFilter = ({ values, name }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)}>
        <h3 className={styles.filterTitle}>{name}</h3>
        <span className={classnames(styles.filterSpan, { [styles.open]: isOpen })} />
      </div>
      <ul className={classnames(styles.filtersList, { [styles.open]: isOpen })}>
        {values.map(value => (
          <li key={value}>
            <input className={styles.filterInput} id={value} type="checkbox" value={value} />
            <label htmlFor={value} className={styles.filterLabel}>
              {value}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
