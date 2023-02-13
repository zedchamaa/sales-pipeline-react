import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useEffect, useState } from 'react';

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
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'deals',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );
  const [dealsNumber, setDealsNumber] = useState(0);
  const [dealsValue, setDealsValue] = useState(0);

  useEffect(() => {
    if (documents) {
      const numberOfDeals = documents.length;
      setDealsNumber(numberOfDeals);
    }

    if (documents) {
      const dealsTotalValue = documents.reduce(
        (acc, deal) => acc + deal.amount,
        0
      );
      setDealsValue(dealsTotalValue);
    }
  }, [documents]);

  return (
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
      <div className={styles.mainContent}>
        <div>
          <div className={styles.pageTitle}>Deals</div>
          <div className={styles.dealsSummary}>
            <div>{dealsNumber} Deals</div>
            <div>
              <EllipseIcon />
            </div>
            <div> ${formatNumber(dealsValue)}</div>
          </div>
          {error && <p>{error}</p>}
          {documents && <DealsList deals={documents} />}
        </div>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
