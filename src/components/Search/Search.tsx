/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import styles from './Search.module.scss';

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted search term:', searchValue);
  };

  return (
    <form noValidate method="" className={styles.search} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        required
        type="text"
        placeholder="SEARCH ..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.searchIcon} />
    </form>
  );
};
