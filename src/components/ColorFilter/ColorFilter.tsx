import { FiltersProps } from '@models/index';
import { ColorsHex } from '@utils/constants';
import classnames from 'classnames';
import { useState } from 'react';
import styles from './ColorFilter.module.scss';

export const ColorFilter = ({ filters, setFilters, values, name }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(filters[name].length > 0);

  const handleColorClick = (color: string) => {
    const newFilters = { ...filters };
    const checked = newFilters[name].includes(color);
    if (!checked) {
      newFilters[name] = [...newFilters[name], color];
    } else {
      newFilters[name] = newFilters[name].filter((el: string) => el !== color);
    }
    setFilters(newFilters);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
        <h3 className={styles.filterTitle}>{name}</h3>
        <span className={classnames(styles.filterSpan, { [styles.open]: isOpen })} />
      </div>
      {isOpen && (
        <div className={classnames(styles.colorsContainer, { [styles.open]: isOpen })}>
          {values.map(color => (
            <button
              type="button"
              key={color}
              className={classnames(styles.colorButton, {
                [styles.active]: filters[name].includes(color),
              })}
              style={{ backgroundColor: color in ColorsHex ? ColorsHex[color] : color }}
              onClick={() => handleColorClick(color)}
              aria-label={`${color} button`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
