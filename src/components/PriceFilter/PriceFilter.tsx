import { Filters, FiltersProps } from '@models/index';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import Slider from 'react-slider';
import { useDebouncedCallback } from 'use-debounce';
import styles from './PriceFilter.module.scss';

const formatPriceToString = (price: number, degree: number): string => {
  return price.toFixed(degree);
};

const formatPriceToNumber = (price: string | undefined): number | undefined => {
  if (price) {
    return Number(price) / 100;
  }
  return undefined;
};

export const PriceFilter = ({ filters, setFilters, name, values }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(formatPriceToNumber(filters[name][0]) || Number(values[0]));
  const [maxPrice, setMaxPrice] = useState(formatPriceToNumber(filters[name][1]) || Number(values[1]));

  const debouncedSetFilters = useDebouncedCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, 500);

  const handleSliderChange = (prices: [number, number]) => {
    const [min, max] = prices;
    setMinPrice(min);
    setMaxPrice(max);
    const newFilters = { ...filters };
    newFilters[name] = [`${formatPriceToString(min * 100, 0)}`, `${formatPriceToString(max * 100, 0)}`];
    debouncedSetFilters(newFilters);
  };

  useEffect(() => {
    setMinPrice(formatPriceToNumber(filters[name][0]) || Number(values[0]));
    setMaxPrice(formatPriceToNumber(filters[name][1]) || Number(values[1]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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
          <span>p.{formatPriceToString(minPrice, 2)}</span>
          <span>p.{formatPriceToString(maxPrice, 2)}</span>
        </div>
      </div>
    </div>
  );
};
