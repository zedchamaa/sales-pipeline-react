import { useState } from 'react';
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
import Modal from '../../components/Modal';

export default function Deals() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'deals',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.pageContainer}>
      {showModal && (
        <Modal onClick={handleCloseModal}>
          <h1>This is so cool!</h1>
        </Modal>
      )}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div>
        <NavMenu />
      </div>
      <div className={styles.topbar}>
        <Topbar onClick={handleShowModal} />
      </div>
      <div className={styles.mainContent}>
        <h1>Deals Page</h1>
        <div className={styles.container}>
          <div className={styles.content}>
            {error && <p>{error}</p>}
            {documents && <DealsList deals={documents} />}
          </div>
          <div className={styles.sidebar}>
            <DealsForm uid={user.uid} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
