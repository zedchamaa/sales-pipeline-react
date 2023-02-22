import { useState, useEffect, useContext, useRef } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { DealsContext } from '../../context/DealsContext';
import { SearchContext } from '../../context/SearchContext';

// libraries
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
import DealsStage from './DealsStage';
import EllipseIcon from '../../components/icons/EllipseIcon';
import LeftArrowIcon from '../../components/icons/LeftArrowIcon';
import RightArrowIcon from '../../components/icons/RightArrowIcon';

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
  const dealsContainerRef = useRef(null);

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

  // scroll the deals container to the left
  const handleScrollLeft = () => {
    const container = dealsContainerRef.current;
    container.scrollBy({
      left: -500,
      behavior: 'smooth',
    });
  };

  // scroll the deals container to the right
  const handleScrollRight = () => {
    const container = dealsContainerRef.current;
    container.scrollBy({
      left: 500,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            Sales Pipeline (Demo App) by ZED CHAMAA | Dashboard Management
          </title>
          <meta
            name='description'
            content='Display your sales deals on the sales pipeline dashboard.'
          />
          <meta
            name='keywords'
            content='free sales pipeline app, sales pipeline dashboard, view sales deals stages'
          />
        </Helmet>
      </HelmetProvider>
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
                  <div className={styles.dealsInfo}>
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

                  <div className={styles.scrollControl}>
                    <LeftArrowIcon onClick={handleScrollLeft} />
                    <RightArrowIcon onClick={handleScrollRight} />
                  </div>
                </div>
                {error && <p>{error}</p>}
                <div
                  className={styles.dealsContainer}
                  ref={dealsContainerRef}
                >
                  <div>{documents && <DealsStage stageName='Qualified' />}</div>
                  <div>{documents && <DealsStage stageName='Demo' />}</div>
                  <div>{documents && <DealsStage stageName='Proposal' />}</div>
                  <div>
                    {documents && <DealsStage stageName='Negotiations' />}
                  </div>
                  <div>{documents && <DealsStage stageName='Won' />}</div>
                  <div>{documents && <DealsStage stageName='Lost' />}</div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </DealsContext.Provider>
    </>
  );
}
