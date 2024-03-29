import { useState, useEffect, useContext } from 'react';
import { DealsContext } from '../../context/DealsContext';

// styles
import styles from './DealsStage.module.css';

// libraries
import { formatNumber } from 'accounting';

// components
import DividerIcon from '../../components/icons/DividerIcon';

export default function DealsStage({ stageName }) {
  const { filteredDeals } = useContext(DealsContext);

  const [dealsNumber, setDealsNumber] = useState(0);
  const [dealsValue, setDealsValue] = useState(0);

  const updatedDeals = filteredDeals
    .filter((deal) => deal.stage === stageName)
    .sort((deal1, deal2) => deal2.amount - deal1.amount);

  useEffect(() => {
    if (updatedDeals) {
      const numberOfDeals = updatedDeals.length;
      setDealsNumber(numberOfDeals);
    }

    if (updatedDeals) {
      const dealsTotalValue = updatedDeals.reduce(
        (acc, deal) => acc + deal.amount,
        0
      );
      setDealsValue(formatNumber(dealsTotalValue));
    }
  }, [updatedDeals]);

  const displayDeals = updatedDeals.map((deal) => {
    return (
      <div
        key={deal.id}
        className={
          deal.stage === 'Won'
            ? styles.cardGood
            : deal.stage === 'Lost'
            ? styles.cardDeclined
            : deal.status === 'In Progress' &&
              (deal.stage !== 'Won' || deal.stage !== 'Lost')
            ? styles.cardInProgress
            : deal.status === 'Good' &&
              (deal.stage !== 'Won' || deal.stage !== 'Lost')
            ? styles.cardGood
            : deal.status === 'Stalled' &&
              (deal.stage !== 'Won' || deal.stage !== 'Lost')
            ? styles.cardDeclined
            : ''
        }
      >
        <div className={styles.cardTop}>
          <div className={styles.dealName}>{deal.name}</div>
          <div className={styles.dealClient}>{deal.client}</div>
          <DividerIcon />
        </div>
        <div className={styles.cardBottom}>
          <div className={styles.dealValue}>${formatNumber(deal.amount)}</div>

          {deal.stage === 'Won' && (
            <div className={styles.success}>{'Success'}</div>
          )}

          {deal.stage === 'Lost' && (
            <div className={styles.declined}>{'Declined'}</div>
          )}

          {deal.status === 'Good' &&
            deal.stage !== 'Won' &&
            deal.stage !== 'Lost' && (
              <div className={styles.success}>{deal.status}</div>
            )}

          {deal.status === 'In Progress' &&
            deal.stage !== 'Won' &&
            deal.stage !== 'Lost' && (
              <div className={styles.inProgress}>{deal.status}</div>
            )}

          {deal.status === 'Stalled' &&
            deal.stage !== 'Won' &&
            deal.stage !== 'Lost' && (
              <div className={styles.declined}>{deal.status}</div>
            )}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <div className={styles.stageInfo}>
          <div className={styles.stageName}>{stageName}</div>
          <div className={styles.quantity}>{dealsNumber}</div>
        </div>
        <div className={styles.total}>
          Total deals <span>${dealsValue}</span>
        </div>
      </div>
      {displayDeals}
    </div>
  );
}
