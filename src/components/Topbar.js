// styles
import styles from './Topbar.module.css';

// pages & components
import SearchDeals from './SearchDeals';
import PlusIcon from '../components/icons/PlusIcon';

export default function Topbar() {
  return (
    <div className={styles.container}>
      <SearchDeals />
      <div className={styles.buttonContainer}>
        <PlusIcon />
        <button>New Deals</button>
      </div>
    </div>
  );
}
