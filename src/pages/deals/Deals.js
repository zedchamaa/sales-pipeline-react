import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// styles
import styles from './Deals.module.css';

// pages & components
import DealsForm from './DealsForm';
import DealsList from './DealsList';
import NavMenu from '../../components/NavMenu';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';

export default function Deals() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'deals',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  return (
    <div className={styles['page-container']}>
      <div className={styles['sidebar']}>
        <Sidebar />
      </div>
      <div>
        <NavMenu />
      </div>
      <div className={styles['topbar']}>
        <Topbar />
      </div>

      <div className={styles['main-content']}>
        <h1>Deals Page</h1>
        {/* <div className={styles.container}>
        <div className={styles.content}>
          {error && <p>{error}</p>}
          {documents && <DealsList deals={documents} />}
        </div>
        <div className={styles.sidebar}>
          <DealsForm uid={user.uid} />
        </div>
      </div> */}
      </div>
      <div className={styles['footer']}>
        <Footer />
      </div>
    </div>
  );
}
