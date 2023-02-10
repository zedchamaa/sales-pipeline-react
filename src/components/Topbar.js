import { useLogout } from '../hooks/useLogout';

// styles
import styles from './Topbar.module.css';

// pages & components
import SearchDeals from './SearchDeals';
import PlusIcon from '../components/icons/PlusIcon';
import UserInfo from './UserInfo';

export default function Topbar({ onClick }) {
  const { logout } = useLogout();

  const handleSignout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <SearchDeals />
      <div className={styles.buttonContainer}>
        <PlusIcon />
        <button onClick={onClick}>New Deals</button>
      </div>
      <UserInfo onClick={handleSignout} />
    </div>
  );
}
