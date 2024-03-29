import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useEffect, useState, useContext } from 'react';
import { DealsContext } from '../../context/DealsContext';
import { SearchContext } from '../../context/SearchContext';

// libraries
import { Helmet, HelmetProvider } from 'react-helmet-async';

// styles
import styles from './Deals.module.css';

// libraries
import { formatNumber } from 'accounting';

// pages & components
import DealsList from './DealsList';
import NavMenu from '../../components/NavMenu';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import EllipseIcon from '../../components/icons/EllipseIcon';

export default function Deals() {
  let filteredDeals;
  const { user } = useAuthContext();
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

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            Sales Pipeline (Demo App) by ZED CHAMAA | Deals Management
          </title>
          <meta
            name='description'
            content='Manage and update your sales deals easily and quickly.'
          />
          <meta
            name='keywords'
            content='manage sales deals, free sales pipeline app, free sales management app'
          />
        </Helmet>
      </HelmetProvider>
      <DealsContext.Provider value={{ filteredDeals }}>
        <div className={styles.pageContainer}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <div>
            <NavMenu />
          </div>
          <div className={styles.topbar}>
            <Topbar />
          </div>
          {documents && (
            <div className={styles.mainContent}>
              <div>
                <div className={styles.pageTitle}>Deals</div>
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
                {documents && <DealsList />}
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
