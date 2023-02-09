import { useState } from 'react';
// styles
import styles from './SearchDeals.module.css';

// pages & components
import SearchIcon from '../components/icons/SearchIcon';

export default function SearchDeals() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

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
