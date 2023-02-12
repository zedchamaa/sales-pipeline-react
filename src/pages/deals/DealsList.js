import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './DealsList.module.css';

// libraries
import { formatNumber } from 'accounting';

// components
import TrashcanIcon from '../../components/icons/TrashcanIcon';
import EditIcon from '../../components/icons/EditIcon';

export default function DealsList({ deals }) {
  const { deleteDocument } = useFirestore('deals');

  return deals.map((deal) => (
    <div className={styles.container}>
      <div
        className={styles.card}
        key={deal.id}
      >
        <div className={styles.cardTop}>
          <div className={styles.titles}>
            <div className={styles.dealName}>{deal.name}</div>
            <div className={styles.clientName}>{deal.client}</div>
          </div>
          <div className={styles.icons}>
            <div>
              <TrashcanIcon onClick={() => deleteDocument(deal.id)} />
            </div>
            <div>
              <EditIcon />
            </div>
          </div>
        </div>
        <div className={styles.cardBottom}>
          <div className={styles.content}>
            <div className={styles.colOne}>
              <span className={styles.dealInfo}>Deal Value</span>
            </div>
            <div className={styles.colTwo}>
              <span className={styles.dealValue}>
                {formatNumber(deal.amount)}
              </span>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.colOne}>
              <span className={styles.dealInfo}>Deal Status</span>
            </div>
            <div className={styles.colTwo}>
              <div
                className={
                  (deal.status === 'In Progress' ? styles.inProgress : '') ||
                  (deal.status === 'Very Good' ? styles.veryGood : '') ||
                  (deal.status === 'Stalled' ? styles.stalled : '')
                }
              >
                {deal.status}
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.colOne}>
              <span className={styles.dealInfo}>Deal Stage</span>
            </div>
            <div className={styles.colTwo}>
              <span className={styles.dealStage}>{deal.stage}</span>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.colOne}>
              <span className={styles.dealInfo}>Date Created</span>
            </div>
            <div className={styles.colTwo}>
              <span className={styles.dealCreatedDate}>{deal.created}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}
