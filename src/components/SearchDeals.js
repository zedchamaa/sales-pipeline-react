import { SearchContext } from '../context/SearchContext';
import { useContext } from 'react';

// styles
import styles from './SearchDeals.module.css';

// pages & components
import SearchIcon from '../components/icons/SearchIcon';

export default function SearchDeals() {
  const { handleChangeSearchTerm } = useContext(SearchContext);

  return (
    <div className={styles.container}>
      <SearchIcon />
      <input
        type='text'
        placeholder='Search deals'
        onChange={handleChangeSearchTerm}
      />
    </div>
  );
}
