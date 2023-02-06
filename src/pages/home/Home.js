import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// styles
import styles from './Home.module.css';

// components
import DealsForm from './DealsForm';
import DealsList from './DealsList';

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'deals',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <DealsList deals={documents} />}
      </div>
      <div className={styles.sidebar}>
        <DealsForm uid={user.uid} />
      </div>
    </div>
  );
}
