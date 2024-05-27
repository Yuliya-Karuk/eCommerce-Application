/* eslint-disable jsx-a11y/no-static-element-interactions */
import classnames from 'classnames';
import { useState } from 'react';
import Slider from 'react-slider';
import styles from './PriceFilter.module.scss';

export const PriceFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(5.99);
  const [maxPrice, setMaxPrice] = useState(100.0);

  const handleSliderChange = (values: [number, number]) => {
    const [min, max] = values;
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)}>
        <h3 className={styles.filterTitle}>Price</h3>
        <span className={classnames(styles.filterSpan, { [styles.open]: isOpen })} />
      </div>
      <div className={classnames(styles.sliderContainer, { [styles.open]: isOpen })}>
        <Slider
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={styles.track}
          value={[minPrice, maxPrice]}
          min={5.99}
          max={100.0}
          step={0.01}
          onChange={handleSliderChange}
        />
        <div className={styles.priceLabels}>
          <span>p.{minPrice.toFixed(2)}</span>
          <span>p.{maxPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
