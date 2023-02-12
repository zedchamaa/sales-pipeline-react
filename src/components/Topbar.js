import { useLogout } from '../hooks/useLogout';
import { ModalContext } from '../context/ModalContext';

// styles
import styles from './Topbar.module.css';

// pages & components
import SearchDeals from './SearchDeals';
import PlusIcon from '../components/icons/PlusIcon';
import UserInfo from './UserInfo';
import { useContext } from 'react';

export default function Topbar({ onClick }) {
  const { logout } = useLogout();

  const { handleShowModal } = useContext(ModalContext);

  const handleSignout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <SearchDeals />
      <div className={styles.buttonContainer}>
        <PlusIcon />
        <button onClick={handleShowModal}>New Deals</button>
      </div>
      <UserInfo onClick={handleSignout} />
    </div>
  );
}
