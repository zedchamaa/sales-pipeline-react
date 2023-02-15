import { useState, useEffect, useContext } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { DealsContext } from '../../context/DealsContext';
import { SearchContext } from '../../context/SearchContext';

// styles
import styles from './Pipeline.module.css';

// libraries
import { formatNumber } from 'accounting';

// pages & components
import DealsForm from '../../components/DealsForm';
import NavMenu from '../../components/NavMenu';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import EllipseIcon from '../../components/icons/EllipseIcon';

export default function Pipeline() {
  let filteredDeals;
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const { searchTerm } = useContext(SearchContext);
  const { documents, error } = useCollection(
    'deals',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );
  const [dealsNumber, setDealsNumber] = useState(0);
  const [dealsValue, setDealsValue] = useState(0);

  // filter the deals based on user search input
  if (documents) {
    filteredDeals = documents.filter(
      (deal) =>
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.amount.toString().includes(searchTerm) ||
        deal.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.created.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // filter the number of deals and value based on user search input
  useEffect(() => {
    if (filteredDeals) {
      const numberOfDeals = filteredDeals.length;
      setDealsNumber(numberOfDeals);
    }

    if (filteredDeals) {
      const dealsTotalValue = filteredDeals.reduce(
        (acc, deal) => acc + deal.amount,
        0
      );
      setDealsValue(dealsTotalValue);
    }
  }, [filteredDeals]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <DealsContext.Provider value={{ filteredDeals }}>
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

        {documents && (
          <div className={styles.mainContent}>
            <div>
              <div className={styles.pageTitle}>Pipeline</div>
              <div className={styles.dealsSummary}>
                {dealsNumber === 1 ? (
                  <div>{dealsNumber} Deal</div>
                ) : (
                  <div>{dealsNumber} Deals</div>
                )}
                <div>
                  <EllipseIcon />
                </div>
                <div>${formatNumber(dealsValue)}</div>
              </div>
              {error && <p>{error}</p>}
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </DealsContext.Provider>
  );
}
