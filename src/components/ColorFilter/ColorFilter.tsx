/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FiltersProps } from '@models/index';
import classnames from 'classnames';
import { useState } from 'react';
import styles from './ColorFilter.module.scss';

const ColorsHex: { [key: string]: string } = {
  Bronze: '#845b32',
  Brown: '#492201',
  Burgundy: '#590016',
  Green: '#464e3c',
  Gray: '#808080',
  Blue: '#697f8b',
};

export const ColorFilter = ({ filters, setFilters, values, name }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)}>
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
            />
          ))}
        </div>
      )}
    </div>
  );
};
