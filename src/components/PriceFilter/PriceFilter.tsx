import { FiltersProps } from '@models/index';
import classnames from 'classnames';
import { useState } from 'react';
import Slider from 'react-slider';
import styles from './PriceFilter.module.scss';

export const PriceFilter = ({ filters, setFilters, name, values }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(Number(values[0]));
  const [maxPrice, setMaxPrice] = useState(Number(values[1]));

  const handleSliderChange = (prices: [number, number]) => {
    const [min, max] = prices;
    setMinPrice(min);
    setMaxPrice(max);
    const newFilters = { ...filters };
    newFilters[name] = [`${min * 100}`, `${max * 100}`];
    setFilters(newFilters);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterHeading} onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0}>
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
