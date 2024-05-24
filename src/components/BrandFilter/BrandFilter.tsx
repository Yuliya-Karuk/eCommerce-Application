import styles from './BrandFilter.module.scss';

interface FiltersProps {
  brands: string[];
}

export const BrandFilter = ({ brands }: FiltersProps) => {
  return (
    <ul className={styles.brandFilters}>
      {brands.map(brand => (
        <li key={brand}>
          <input className={styles.brandFilterInput} id={brand} type="checkbox" value={brand} />
          <label htmlFor={brand} className={styles.brandFilterLabel}>
            {brand}
          </label>
        </li>
      ))}
    </ul>
  );
};
