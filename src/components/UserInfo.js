import { useAuthContext } from '../hooks/useAuthContext';

// styles
import styles from './UserInfo.module.css';

// pages & components
import AvatarIcon from '../components/icons/AvatarIcon';
import SignoutIcon from './icons/SignoutIcon';

export default function UserInfo({ onClick }) {
  const { user } = useAuthContext();

  return (
    <div className={styles.container}>
      <AvatarIcon />
      {user.displayName}
      <SignoutIcon onClick={onClick} />
    </div>
  );
}
