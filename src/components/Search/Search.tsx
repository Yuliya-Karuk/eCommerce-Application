/* eslint-disable jsx-a11y/control-has-associated-label */
import { SearchSettings } from '@models/index';
import { searchIdentifier } from '@utils/constants';
import { useState } from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  searchSettings: SearchSettings;
  setSearchSettings: (data: SearchSettings) => void;
}

export const Search = ({ searchSettings, setSearchSettings }: SearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newSearchSettings = { ...searchSettings };
    newSearchSettings[searchIdentifier] = searchValue;
    setSearchSettings(newSearchSettings);
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
