import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import styles from './Pipeline.module.css';

// pages & components
import DealsForm from '../../components/DealsForm';
import NavMenu from '../../components/NavMenu';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';

export default function Pipeline() {
  const { user } = useAuthContext();
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
        <Modal
          onClick={handleCloseModal}
          title={'Add New Deal'}
        >
          <DealsForm uid={user.uid} />
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
        <h1>Pipeline Page</h1>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
