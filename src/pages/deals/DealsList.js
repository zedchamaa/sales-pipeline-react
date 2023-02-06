import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './Deals.module.css';

export default function DealsList({ deals }) {
  const { deleteDocument } = useFirestore('deals');

  return (
    <ul className={styles.deals}>
      {deals.map((deal) => (
        <li key={deal.id}>
          <p className={styles.name}>{deal.name}</p>
          <p className={styles.name}>{deal.client}</p>
          <p className={styles.amount}>{deal.amount}</p>
          <p className={styles.amount}>{deal.stage}</p>
          <p className={styles.amount}>{deal.status}</p>
          <p className={styles.amount}>{deal.created}</p>
          <button onClick={() => deleteDocument(deal.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
