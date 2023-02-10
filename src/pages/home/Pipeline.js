import { useState } from 'react';

// styles
import styles from './Pipeline.module.css';

// pages & components
import NavMenu from '../../components/NavMenu';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';

export default function Pipeline() {
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
        <h1>Pipeline Page</h1>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
