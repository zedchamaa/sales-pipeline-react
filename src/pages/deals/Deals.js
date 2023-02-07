import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// styles
import styles from './Deals.module.css';

// pages & components
import DealsForm from './DealsForm';
import DealsList from './DealsList';
import Navbar from '../../components/Navbar';

export default function Deals() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'deals',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.content}>
          {error && <p>{error}</p>}
          {documents && <DealsList deals={documents} />}
        </div>
        <div className={styles.sidebar}>
          <DealsForm uid={user.uid} />
        </div>
      </div>
    </>
  );
}
