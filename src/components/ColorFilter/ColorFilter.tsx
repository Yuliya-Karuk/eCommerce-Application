/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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

export interface FilterProps {
  colors: string[];
  activeColor: string;
  setActiveColor: (color: string) => void;
}

export const ColorFilter = ({ colors, activeColor, setActiveColor }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorClick = (color: string) => {
    setActiveColor(color);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)}>
        <h3 className={styles.filterTitle}>
          Color: <em>{activeColor}</em>
        </h3>
        <span className={classnames(styles.filterSpan, { [styles.open]: isOpen })} />
      </div>
      {isOpen && (
        <div className={classnames(styles.colorsContainer, { [styles.open]: isOpen })}>
          {colors.map(color => (
            <button
              type="button"
              key={color}
              className={classnames(styles.colorButton, {
                [styles.active]: activeColor === color,
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
