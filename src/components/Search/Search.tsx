/* eslint-disable jsx-a11y/control-has-associated-label */
import { sdkService } from '@commercetool/sdk.service';
import { useState } from 'react';
import styles from './Search.module.scss';

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await sdkService.searchByString(searchValue);
    console.log('Submitted search term:', searchValue);
    console.log(data);
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
